const DECIMAL_NUMBER = String.raw`[-+]?\d+(?:[.,]\d+)?`;
const OHM = "ohm";

const VIDEOS = [
  {
    topic: "ohm",
    title: "Ley de OHM [Explicacion FACIL] - Seletube",
    url: "https://www.youtube.com/watch?v=wHQrMuJAjak",
  },
  {
    topic: "kirchhoff",
    title: "Ley de corriente de Kirchhoff - Khan Academy en Espanol",
    url: "https://www.youtube.com/watch?v=CHPkjpSdQu4",
  },
  {
    topic: "serie",
    title: "Resistores en serie - Khan Academy en Espanol",
    url: "https://es.khanacademy.org/science/3-secundaria-cyt/x2972e7ae3b16ef5b%3Acampo-electrico-magnetico-y-corriente/x2972e7ae3b16ef5b%3Aley-de-ohm/v/ee-series-resistors",
  },
  {
    topic: "paralelo",
    title: "Resistores en paralelo - Khan Academy en Espanol",
    url: "https://es.khanacademy.org/science/physics/circuits-topic/circuits-resistance/v/circuits-part-3",
  },
  {
    topic: "general",
    title: "Unidad de circuitos - Khan Academy en Espanol",
    url: "https://es.khanacademy.org/science/physics/circuits-topic",
  },
];

const EXERCISES = {
  ohm: [
    "Ejercicio: Una resistencia de 6 ohm esta conectada a una fuente de 18 V. Calcula la corriente. Pista: usa I = V / R.",
    "Ejercicio: Por una resistencia circulan 0,5 A y la resistencia vale 20 ohm. Calcula el voltaje. Pista: usa V = I * R.",
    "Ejercicio: Un resistor tiene 24 V y conduce 3 A. Calcula su resistencia. Pista: usa R = V / I.",
  ],
  power: [
    "Ejercicio: Un resistor tiene 12 V y 2 A. Calcula la potencia. Pista: usa P = V * I.",
    "Ejercicio: Una resistencia de 8 ohm conduce 3 A. Calcula la potencia disipada. Pista: usa P = I^2 * R.",
    "Ejercicio: Un resistor de 5 ohm tiene 10 V. Calcula la potencia. Pista: usa P = V^2 / R.",
  ],
  series: [
    "Ejercicio: Tres resistencias de 4 ohm, 6 ohm y 10 ohm estan en serie. Calcula la resistencia equivalente.",
    "Ejercicio: Dos resistencias de 5 ohm y 15 ohm estan en serie con una fuente de 20 V. Calcula la corriente total.",
  ],
  parallel: [
    "Ejercicio: Dos resistencias de 10 ohm y 20 ohm estan en paralelo. Calcula la resistencia equivalente.",
    "Ejercicio: Dos resistencias de 6 ohm y 3 ohm estan en paralelo con 12 V. Calcula la corriente total.",
  ],
  kirchhoff: [
    "Ejercicio LCK: A un nodo entran 8 A y 3 A. Por una rama salen 4 A. Calcula la corriente que sale por la otra rama.",
    "Ejercicio LKV: En una malla hay una fuente de 12 V y dos caidas: 5 V y Vx. Calcula Vx.",
  ],
};

function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u03a9\u2126]/g, "ohm");
}

function toNumber(value) {
  return Number(String(value).replace(",", "."));
}

function round(value) {
  const rounded = Number.parseFloat(value.toFixed(6));
  return Object.is(rounded, -0) ? 0 : rounded;
}

function formatNumber(value) {
  return String(round(value)).replace(".", ",");
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function findValues(text) {
  const normalized = normalizeText(text);
  const values = {};

  const unitPatterns = {
    voltage: String.raw`\b(?:v|volt(?:io|ios)?|volts?)\b`,
    current: String.raw`\b(?:a|amp(?:ere|eres)?|amperio|amperios|amps?)\b`,
    resistance: String.raw`\b(?:ohm|ohms|ohmio|ohmios|omega)\b`,
    power: String.raw`\b(?:w|watt|watts?|vatio|vatios)\b`,
  };

  for (const [kind, unit] of Object.entries(unitPatterns)) {
    const afterNumber = new RegExp(`(${DECIMAL_NUMBER})\\s*${unit}`, "i");
    const beforeNumber = new RegExp(`${unit}\\s*(?:=|de|es|:)?\\s*(${DECIMAL_NUMBER})`, "i");
    const match = normalized.match(afterNumber) || normalized.match(beforeNumber);

    if (match) {
      values[kind] = toNumber(match[1]);
    }
  }

  return values;
}

function findResistanceValues(text) {
  const normalized = normalizeText(text);
  const matches = normalized.matchAll(new RegExp(`(${DECIMAL_NUMBER})\\s*(?:ohm|ohms|ohmio|ohmios|omega)\\b`, "gi"));
  return [...matches].map((match) => toNumber(match[1]));
}

function findCurrentValues(text) {
  const normalized = normalizeText(text);
  const matches = normalized.matchAll(new RegExp(`(${DECIMAL_NUMBER})\\s*(?:a|amp(?:ere|eres)?|amperio|amperios|amps?)\\b`, "gi"));
  return [...matches].map((match) => toNumber(match[1]));
}

function findVoltageValues(text) {
  const normalized = normalizeText(text);
  const matches = normalized.matchAll(new RegExp(`(${DECIMAL_NUMBER})\\s*(?:v|volt(?:io|ios)?|volts?)\\b`, "gi"));
  return [...matches].map((match) => toNumber(match[1]));
}

function formatKnown(values) {
  const parts = [];

  if (typeof values.voltage === "number") parts.push(`${formatNumber(values.voltage)} V`);
  if (typeof values.current === "number") parts.push(`${formatNumber(values.current)} A`);
  if (typeof values.resistance === "number") parts.push(`${formatNumber(values.resistance)} ${OHM}`);
  if (typeof values.power === "number") parts.push(`${formatNumber(values.power)} W`);

  return parts.join(" y ");
}

function calculateOhm(values) {
  const { voltage, current, resistance } = values;

  if (typeof voltage === "number" && typeof resistance === "number") {
    if (resistance === 0) {
      return `La resistencia no puede ser 0 ${OHM} para calcular I = V / R; eso seria un cortocircuito ideal.`;
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
    return `Con ${formatKnown({ voltage, current })}, aplicamos R = V / I. Entonces R = ${formatNumber(voltage)} / ${formatNumber(current)} = ${formatNumber(result)} ${OHM}.`;
  }

  return `Para calcular con ley de Ohm necesito dos datos con unidades: voltaje en V, corriente en A o resistencia en ${OHM}. Ejemplo: tengo 12 V y 4 ohmios.`;
}

function calculatePower(values) {
  const { voltage, current, resistance, power } = values;

  if (typeof power === "number" && typeof voltage === "number") {
    if (voltage === 0) return "El voltaje no puede ser 0 V para calcular I = P / V.";
    const result = power / voltage;
    return `Con ${formatKnown({ power, voltage })}, aplicamos I = P / V. Entonces I = ${formatNumber(power)} / ${formatNumber(voltage)} = ${formatNumber(result)} A.`;
  }

  if (typeof power === "number" && typeof current === "number") {
    if (current === 0) return "La corriente no puede ser 0 A para calcular V = P / I.";
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
    if (resistance === 0) return `La resistencia no puede ser 0 ${OHM} para calcular P = V^2 / R.`;
    const result = voltage ** 2 / resistance;
    return `Con ${formatKnown({ voltage, resistance })}, aplicamos P = V^2 / R. Entonces P = ${formatNumber(voltage)}^2 / ${formatNumber(resistance)} = ${formatNumber(result)} W.`;
  }

  return "Para calcular potencia necesito dos datos compatibles: V e I, I y R, o V y R. Ejemplo: potencia con 12 V y 2 A.";
}

function calculateEquivalentResistance(queryText) {
  const normalized = normalizeText(queryText);
  const resistances = findResistanceValues(queryText);

  if (resistances.length < 2) {
    return "Para calcular resistencia equivalente necesito al menos dos resistencias con unidades. Ejemplo: 10 ohm y 20 ohm en paralelo.";
  }

  if (includesAny(normalized, ["paralelo", "paralelas", "parallel"])) {
    if (resistances.some((value) => value === 0)) {
      return `En paralelo, una rama de 0 ${OHM} haria que la resistencia equivalente ideal sea 0 ${OHM}.`;
    }

    const inverseSum = resistances.reduce((sum, value) => sum + 1 / value, 0);
    const equivalent = 1 / inverseSum;
    return `En paralelo se usa 1/Req = suma de 1/Ri. Con ${resistances.map((value) => `${formatNumber(value)} ${OHM}`).join(", ")}, Req = ${formatNumber(equivalent)} ${OHM}.`;
  }

  const equivalent = resistances.reduce((sum, value) => sum + value, 0);
  return `En serie las resistencias se suman. Con ${resistances.map((value) => `${formatNumber(value)} ${OHM}`).join(", ")}, Req = ${formatNumber(equivalent)} ${OHM}.`;
}

function calculateVoltageDivider(queryText) {
  const voltage = findVoltageValues(queryText)[0];
  const resistances = findResistanceValues(queryText);

  if (typeof voltage !== "number" || resistances.length < 2) {
    return "Para divisor de voltaje necesito una fuente en V y al menos dos resistencias en serie. Ejemplo: divisor de voltaje con 12 V, 2 ohm y 4 ohm.";
  }

  const total = resistances.reduce((sum, value) => sum + value, 0);
  if (total === 0) return "La suma de resistencias no puede ser 0 para aplicar divisor de voltaje.";

  const drops = resistances.map((resistance, index) => {
    const drop = (resistance / total) * voltage;
    return `V${index + 1} = ${formatNumber(drop)} V`;
  });

  return `Divisor de voltaje: Vi = (Ri / Req) * Vtotal. Req = ${formatNumber(total)} ${OHM}. Resultado: ${drops.join(", ")}.`;
}

function calculateKcl(queryText) {
  const normalized = normalizeText(queryText);
  const currents = findCurrentValues(queryText);

  if (currents.length < 2) {
    return "Para aplicar LCK con datos, dime las corrientes que entran y salen. Ejemplo: entran 8 A y 3 A, sale 4 A.";
  }

  const entering = [];
  const leaving = [];
  const currentPattern = new RegExp(`(?:entran?|ingresan?)\\s*(${DECIMAL_NUMBER})\\s*(?:a|amp(?:ere|eres)?|amperio|amperios)|(?:salen?)\\s*(${DECIMAL_NUMBER})\\s*(?:a|amp(?:ere|eres)?|amperio|amperios)`, "gi");
  let match;

  while ((match = currentPattern.exec(normalized)) !== null) {
    if (match[1]) entering.push(toNumber(match[1]));
    if (match[2]) leaving.push(toNumber(match[2]));
  }

  if (!entering.length || !leaving.length) {
    return "LCK dice que corrientes que entran = corrientes que salen. Si me dices cuales entran y cuales salen, calculo la faltante.";
  }

  const inSum = entering.reduce((sum, value) => sum + value, 0);
  const outSum = leaving.reduce((sum, value) => sum + value, 0);
  const missing = inSum - outSum;

  if (missing >= 0) {
    return `Por LCK, entradas = salidas. Entran ${formatNumber(inSum)} A y ya salen ${formatNumber(outSum)} A, entonces falta una corriente saliendo de ${formatNumber(missing)} A.`;
  }

  return `Por LCK, entradas = salidas. Salen ${formatNumber(outSum)} A y entran ${formatNumber(inSum)} A, entonces falta una corriente entrando de ${formatNumber(Math.abs(missing))} A.`;
}

function proposeExercise(queryText) {
  const normalized = normalizeText(queryText);
  let topic = "ohm";

  if (includesAny(normalized, ["potencia", "watt", "vatio"])) topic = "power";
  if (includesAny(normalized, ["serie"])) topic = "series";
  if (includesAny(normalized, ["paralelo"])) topic = "parallel";
  if (includesAny(normalized, ["kirchhoff", "lck", "lkv", "nodo", "malla"])) topic = "kirchhoff";

  const list = EXERCISES[topic];
  const index = Math.abs(normalized.length + new Date().getMinutes()) % list.length;
  return `${list[index]} Cuando tengas tu respuesta, escribemela y revisamos el procedimiento.`;
}

function recommendVideos(queryText) {
  const normalized = normalizeText(queryText);
  let topic = "general";

  if (includesAny(normalized, ["ohm"])) topic = "ohm";
  if (includesAny(normalized, ["kirchhoff", "lck", "lkv"])) topic = "kirchhoff";
  if (includesAny(normalized, ["serie"])) topic = "serie";
  if (includesAny(normalized, ["paralelo"])) topic = "paralelo";

  const selected = VIDEOS.filter((video) => video.topic === topic || video.topic === "general").slice(0, 3);
  return `Te recomiendo estos recursos en espanol:\n${selected.map((video) => `- ${video.title}: ${video.url}`).join("\n")}`;
}

function explainImage(queryText) {
  const normalized = normalizeText(queryText);

  if (includesAny(normalized, ["lck", "nodo", "corriente"])) {
    return "Para LCK usa el diagrama assets/nodo-lck.svg: muestra corrientes que entran y salen de un nodo. La regla es entradas = salidas.";
  }

  if (includesAny(normalized, ["lkv", "malla", "voltaje"])) {
    return "Para LKV usa el diagrama assets/malla-lkv.svg: recorre una malla cerrada y suma subidas y caidas de voltaje hasta obtener cero.";
  }

  if (includesAny(normalized, ["paralelo"])) {
    return "Para paralelo usa assets/resistencias-paralelo.svg: todas las ramas comparten el mismo voltaje y la corriente se divide.";
  }

  if (includesAny(normalized, ["serie"])) {
    return "Para serie usa assets/resistencias-serie.svg: la misma corriente pasa por todos los elementos y las resistencias se suman.";
  }

  return "Tengo diagramas de apoyo en assets/: ley-ohm.svg, nodo-lck.svg, malla-lkv.svg, resistencias-serie.svg y resistencias-paralelo.svg.";
}

function detectCalculationType(text, action = "") {
  const normalized = normalizeText(`${action} ${text}`);

  if (includesAny(normalized, ["video", "youtube", "recomienda"])) return "videos";
  if (includesAny(normalized, ["ejercicio", "practica", "problema"])) return "exercise";
  if (includesAny(normalized, ["imagen", "diagrama", "grafico"])) return "image";
  if (includesAny(normalized, ["divisor de voltaje", "dividir voltaje"])) return "voltage_divider";
  if (includesAny(normalized, ["lck", "ley de corrientes", "ley de nodos"])) return "kcl";
  if (includesAny(normalized, ["equivalente", "serie", "paralelo"])) return "equivalent";
  if (includesAny(normalized, ["potencia", "watt", "vatio", "ohmia.potencia"])) return "power";

  return "ohm";
}

function buildResponse(queryText, action = "") {
  const values = findValues(queryText);
  const type = detectCalculationType(queryText, action);

  if (type === "videos") return recommendVideos(queryText);
  if (type === "exercise") return proposeExercise(queryText);
  if (type === "image") return explainImage(queryText);
  if (type === "voltage_divider") return calculateVoltageDivider(queryText);
  if (type === "kcl") return calculateKcl(queryText);
  if (type === "equivalent") return calculateEquivalentResistance(queryText);
  if (type === "power") return calculatePower(values);

  return calculateOhm(values);
}

module.exports = {
  buildResponse,
  calculateEquivalentResistance,
  calculateOhm,
  calculatePower,
  calculateVoltageDivider,
  findResistanceValues,
  findValues,
};
