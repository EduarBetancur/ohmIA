# Plan del proyecto ohmIA

## Fase 1: Base del repositorio

- Organizar recursos originales.
- Crear base de conocimiento.
- Crear FAQ de entrenamiento.
- Crear intents iniciales para Dialogflow ES.

## Fase 2: Agente Dialogflow

- Crear agente `ohmIA`.
- Cargar intents.
- Entrenar y probar desde la consola.
- Ajustar frases de entrenamiento con preguntas reales de estudiantes.

## Fase 3: Telegram

- Crear bot con BotFather.
- Conectar token en integraciones de Dialogflow.
- Probar conversacion desde Telegram.

## Fase 4: Calculos

- Agregar webhook para resolver:
  - `V = I * R`
  - `I = V / R`
  - `R = V / I`
  - `P = V * I`
  - `P = I^2 * R`
  - `P = V^2 / R`

## Fase 5: Recursos visuales

- Agregar imagenes de:
  - resistor y convencion pasiva
  - nodo para LCK
  - lazo para LKV
  - resistencias en serie
  - resistencias en paralelo

## Criterio de exito

El bot debe poder responder correctamente, en Telegram, al menos 20 preguntas de prueba sobre ley de Ohm, LCK, LKV, potencia y asociaciones de resistencias.
