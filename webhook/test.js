const assert = require("node:assert/strict");
const {
  buildResponse,
  findResistanceValues,
  findValues,
} = require("./calculator");

const values = findValues("tengo 12 V y 4 ohmios");
assert.deepEqual(values, { voltage: 12, resistance: 4 });

assert.deepEqual(findResistanceValues("10 ohm, 20 ohm y 30 ohm"), [10, 20, 30]);

assert.match(
  buildResponse("tengo 12 V y 4 ohmios", "ohmia.calculo_ohm"),
  /3 A/
);

assert.match(
  buildResponse("tengo corriente de 2 A y resistencia de 5 ohmios", "ohmia.calculo_ohm"),
  /10 V/
);

assert.match(
  buildResponse("tengo 24 V y 3 A", "ohmia.calculo_ohm"),
  /8 ohm/
);

assert.match(
  buildResponse("calcula potencia con 12 V y 2 A", "ohmia.potencia"),
  /24 W/
);

assert.match(
  buildResponse("potencia con 3 A y 4 ohmios", "ohmia.potencia"),
  /36 W/
);

assert.match(
  buildResponse("potencia con 10 V y 5 ohmios", "ohmia.potencia"),
  /20 W/
);

assert.match(
  buildResponse("resistencia equivalente en serie de 4 ohm y 6 ohm", "ohmia.serie_paralelo"),
  /10 ohm/
);

assert.match(
  buildResponse("resistencia equivalente en paralelo de 10 ohm y 20 ohm", "ohmia.serie_paralelo"),
  /6,666667 ohm/
);

assert.match(
  buildResponse("divisor de voltaje con 12 V, 2 ohm y 4 ohm", "ohmia.divisor_voltaje"),
  /V1 = 4 V, V2 = 8 V/
);

assert.match(
  buildResponse("lck: entran 8 A y salen 3 A", "ohmia.lck"),
  /5 A/
);

assert.match(
  buildResponse("recomienda videos de kirchhoff", "ohmia.videos"),
  /Khan Academy/
);

assert.match(
  buildResponse("dame un ejercicio de potencia", "ohmia.ejercicios"),
  /Ejercicio/
);

console.log("Pruebas del calculador ohmIA completadas correctamente.");
