const assert = require("node:assert/strict");
const { buildResponse, findValues } = require("./calculator");

const values = findValues("tengo 12 V y 4 ohmios");
assert.deepEqual(values, { voltage: 12, resistance: 4 });

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
  /8 Ω/
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

console.log("Pruebas del calculador ohmIA completadas correctamente.");
