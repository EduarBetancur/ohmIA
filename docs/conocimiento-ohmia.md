# Base de conocimiento ohmIA

Esta base resume los conceptos que el chatbot debe explicar. Fue curada a partir de los PDFs y presentaciones incluidos en el repositorio.

## Tono del chatbot

ohmIA debe responder como un tutor breve, claro y paciente:

- Primero da la idea central.
- Luego muestra la formula o regla.
- Si el usuario da datos numericos, propone el despeje.
- Si falta informacion, pide exactamente el dato faltante.
- Usa unidades: voltios `V`, amperios `A`, ohmios `ohm` o `Ω`, watts `W`.

## Ley de Ohm

La ley de Ohm relaciona voltaje, corriente y resistencia:

```text
V = I * R
I = V / R
R = V / I
```

Donde:

- `V` es el voltaje o tension, medido en voltios.
- `I` es la corriente, medida en amperios.
- `R` es la resistencia, medida en ohmios.

Respuesta corta sugerida:

> La ley de Ohm dice que el voltaje en una resistencia es proporcional a la corriente que la atraviesa. Su formula es V = I * R.

## Potencia electrica

La potencia absorbida o entregada por un elemento se calcula con:

```text
P = V * I
P = I^2 * R
P = V^2 / R
```

Estas formulas son utiles cuando el usuario pregunta por consumo, calor disipado o potencia en resistencias.

## Ley de corrientes de Kirchhoff, LCK o KCL

La LCK dice que en un nodo la suma algebraica de corrientes es cero. En forma practica:

```text
corrientes que entran = corrientes que salen
```

Ejemplo de respuesta:

> En un nodo no se acumula carga. Por eso, si entran 5 A y salen 2 A por una rama, deben salir 3 A por la otra.

Pasos recomendados:

1. Identificar el nodo que se analizara.
2. Marcar corrientes que entran y salen.
3. Escribir: entradas = salidas.
4. Sustituir valores y despejar la incognita.
5. Revisar que el signo obtenido tenga sentido con el sentido elegido.

## Ley de voltajes de Kirchhoff, LKV, LTK o KVL

La LKV dice que la suma algebraica de voltajes en cualquier lazo cerrado es cero:

```text
ΣV = 0
```

En palabras:

> Al recorrer una malla, las subidas de tension y las caidas de tension se compensan.

Pasos recomendados:

1. Elegir una malla o lazo cerrado.
2. Definir un sentido de recorrido.
3. Asignar signos a fuentes y caidas de voltaje.
4. Escribir la ecuacion de voltajes.
5. Usar ley de Ohm si aparecen resistencias: `V_R = I * R`.
6. Despejar la incognita.

## Resistencias en serie

En serie, todos los elementos tienen la misma corriente.

```text
Req = R1 + R2 + ... + Rn
```

Divisor de voltaje:

```text
Vi = (Ri / Req) * Vtotal
```

## Resistencias en paralelo

En paralelo, todos los elementos tienen el mismo voltaje.

```text
1 / Req = 1 / R1 + 1 / R2 + ... + 1 / Rn
```

Para dos resistencias:

```text
Req = (R1 * R2) / (R1 + R2)
```

Divisor de corriente con dos ramas:

```text
I1 = (R2 / (R1 + R2)) * Itotal
I2 = (R1 / (R1 + R2)) * Itotal
```

## Divisor de voltaje

Cuando varias resistencias estan en serie, el voltaje total se reparte proporcionalmente a cada resistencia:

```text
Vi = (Ri / Req) * Vtotal
```

Ejemplo:

```text
Vtotal = 12 V
R1 = 2 ohm
R2 = 4 ohm
Req = 6 ohm
V1 = (2 / 6) * 12 = 4 V
V2 = (4 / 6) * 12 = 8 V
```

## Ejercicios que puede proponer ohmIA

ohmIA puede proponer ejercicios cortos y pedir al estudiante que responda para revisar el procedimiento:

- Ley de Ohm.
- Potencia electrica.
- Resistencias en serie.
- Resistencias en paralelo.
- LCK y LKV.

## Videos recomendados

Cuando el usuario pida videos, ohmIA debe recomendar recursos en espanol, priorizando canales educativos claros. La lista inicial esta en `data/videos-recomendados.json`.

## Conceptos de topologia

- Rama: elemento de dos terminales dentro de un circuito.
- Nodo: punto donde se conectan dos o mas ramas.
- Lazo: trayectoria cerrada dentro del circuito.
- Malla: lazo que no contiene otros lazos en su interior.
- Tierra o referencia: nodo elegido como voltaje cero.

## Ejemplos cotidianos

### Luces de un carro al arrancar

Cuando el motor de arranque demanda una corriente grande, la resistencia interna de la bateria y de conexiones produce una caida de voltaje. Por eso los faros pueden atenuarse temporalmente.

Modelo conceptual:

```text
VL = Vbatt - (Iluces + Iarranque) * Rbatt
```

Si `Rbatt` aumenta por corrosion o conexiones flojas, la caida de voltaje es mayor.

### Transmision electrica

Para transportar mucha potencia conviene usar alto voltaje y baja corriente, porque las perdidas en linea dependen de:

```text
Pperdida = I^2 * Rlinea
```

Menor corriente significa menores perdidas.

## Respuestas ante datos incompletos

Si el usuario pide calcular corriente:

> Para calcular la corriente con ley de Ohm necesito voltaje y resistencia. Por ejemplo: I = V / R.

Si pide calcular resistencia:

> Para calcular resistencia necesito voltaje y corriente. Se despeja como R = V / I.

Si pide calcular voltaje:

> Para calcular voltaje necesito corriente y resistencia. Se usa V = I * R.

## Limites del bot

ohmIA no debe inventar valores de circuitos que no fueron dados. Si el usuario describe una imagen o circuito incompleto, debe pedir el dato faltante o la conexion exacta.
