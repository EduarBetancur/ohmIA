const DECIMAL_NUMBER = String.raw`[-+]?\d+(?:[.,]\d+)?`;

const UNIT_PATTERNS = {
  voltage: [
    String.raw`\b(?:v|volt(?:io|ios)?|volts?)\b`,
  ],
  current: [
    String.raw`\b(?:a|amp(?:ere|eres)?|amperio|amperios|amps?)\b`,
  ],
  resistance: [
    String.raw`\b(?:ohm|ohms|ohmio|ohmios|omega|Ω)\b`,
  ],
  power: [
    String.raw`\b(?:w|watt|watts?|vatio|vatios)\b`,
  ],
};

function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Ω/g, "Ω");
}

function toNumber(value) {
  return Number(String(value).replace(",", "."));
}

function findValues(text) {
  const normalized = normalizeText(text);
  const values = {};

  for (const [kind, units] of Object.entries(UNIT_PATTERNS)) {
    for (const unit of units) {
      const afterNumber = new RegExp(`(${DECIMAL_NUMBER})\\s*${unit}`, "i");
      const beforeNumber = new RegExp(`${unit}\\s*(?:=|de|es|:)?\\s*(${DECIMAL_NUMBER})`, "i");
      const match = normalized.match(afterNumber) || normalized.match(beforeNumber);

      if (match) {
        values[kind] = toNumber(match[1]);
        break;
      }
    }
  }

  return values;
}

function round(value) {
  const rounded = Number.parseFloat(value.toFixed(6));
  return Object.is(rounded, -0) ? 0 : rounded;
}

function formatNumber(value) {
  return String(round(value)).replace(".", ",");
}

function formatKnown(values) {
  const parts = [];

  if (typeof values.voltage === "number") parts.push(`${formatNumber(values.voltage)} V`);
  if (typeof values.current === "number") parts.push(`${formatNumber(values.current)} A`);
  if (typeof values.resistance === "number") parts.push(`${formatNumber(values.resistance)} Ω`);
  if (typeof values.power === "number") parts.push(`${formatNumber(values.power)} W`);

  return parts.join(" y ");
}

function calculateOhm(values) {
  const { voltage, current, resistance } = values;

  if (typeof voltage === "number" && typeof resistance === "number") {
    if (resistance === 0) {
      return "La resistencia no puede ser 0 Ω para calcular I = V / R; eso seria un cortocircuito ideal.";
    }

    const result = voltage / resistance;
    return `Con ${formatKnown({ voltage, resistance })}, aplicamos I = V / R. Entonces I = ${formatNumber(voltage)} / ${formatNumber(resistance)} = ${formatNumber(result)} A.`;
  }

  if (typeof current === "number" && typeof resistance === "number") {
    const result = current * resistance;
    return `Con ${formatKnown({ current, resistance })}, aplicamos V = I * R. Entonces V = ${formatNumber(current)} * ${formatNumber(resistance)} = ${formatNumber(result)} V.`;
  }

  if (typeof voltage === "number" && typeof current === "number") {
    if (current === 0) {
      return "La corriente no puede ser 0 A para calcular R = V / I con un voltaje distinto de cero.";
    }

    const result = voltage / current;
    return `Con ${formatKnown({ voltage, current })}, aplicamos R = V / I. Entonces R = ${formatNumber(voltage)} / ${formatNumber(current)} = ${formatNumber(result)} Ω.`;
  }

  return "Para calcular con ley de Ohm necesito dos datos con unidades: voltaje en V, corriente en A o resistencia en Ω. Ejemplo: tengo 12 V y 4 ohmios.";
}

function calculatePower(values) {
  const { voltage, current, resistance, power } = values;

  if (typeof power === "number" && typeof voltage === "number") {
    if (voltage === 0) {
      return "El voltaje no puede ser 0 V para calcular I = P / V.";
    }

    const result = power / voltage;
    return `Con ${formatKnown({ power, voltage })}, aplicamos I = P / V. Entonces I = ${formatNumber(power)} / ${formatNumber(voltage)} = ${formatNumber(result)} A.`;
  }

  if (typeof power === "number" && typeof current === "number") {
    if (current === 0) {
      return "La corriente no puede ser 0 A para calcular V = P / I.";
    }

    const result = power / current;
    return `Con ${formatKnown({ power, current })}, aplicamos V = P / I. Entonces V = ${formatNumber(power)} / ${formatNumber(current)} = ${formatNumber(result)} V.`;
  }

  if (typeof voltage === "number" && typeof current === "number") {
    const result = voltage * current;
    return `Con ${formatKnown({ voltage, current })}, aplicamos P = V * I. Entonces P = ${formatNumber(voltage)} * ${formatNumber(current)} = ${formatNumber(result)} W.`;
  }

  if (typeof current === "number" && typeof resistance === "number") {
    const result = current ** 2 * resistance;
    return `Con ${formatKnown({ current, resistance })}, aplicamos P = I^2 * R. Entonces P = ${formatNumber(current)}^2 * ${formatNumber(resistance)} = ${formatNumber(result)} W.`;
  }

  if (typeof voltage === "number" && typeof resistance === "number") {
    if (resistance === 0) {
      return "La resistencia no puede ser 0 Ω para calcular P = V^2 / R.";
    }

    const result = voltage ** 2 / resistance;
    return `Con ${formatKnown({ voltage, resistance })}, aplicamos P = V^2 / R. Entonces P = ${formatNumber(voltage)}^2 / ${formatNumber(resistance)} = ${formatNumber(result)} W.`;
  }

  return "Para calcular potencia necesito dos datos compatibles: V e I, I y R, o V y R. Ejemplo: potencia con 12 V y 2 A.";
}

function detectCalculationType(text, action = "") {
  const normalized = normalizeText(`${action} ${text}`);

  if (normalized.includes("potencia") || normalized.includes("watt") || normalized.includes("vatio") || normalized.includes("ohmia.potencia")) {
    return "power";
  }

  return "ohm";
}

function buildResponse(queryText, action = "") {
  const values = findValues(queryText);
  const type = detectCalculationType(queryText, action);

  return type === "power" ? calculatePower(values) : calculateOhm(values);
}

module.exports = {
  buildResponse,
  calculateOhm,
  calculatePower,
  findValues,
};
