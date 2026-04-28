# Guia Dialogflow ES + Telegram

## 1. Crear el bot en Telegram

1. Abrir Telegram y buscar `@BotFather`.
2. Enviar `/newbot`.
3. Elegir nombre visible: `ohmIA`.
4. Elegir usuario terminado en `bot`, por ejemplo `ohmIA_tutor_bot`.
5. Guardar el token. No subirlo al repositorio.

## 2. Crear el agente en Dialogflow ES

1. Entrar a Dialogflow ES con la cuenta de Google.
2. Crear un agente:
   - Nombre: `ohmIA`
   - Idioma: Spanish `es`
   - Zona horaria: `America/Bogota`
3. Crear o importar intents desde `dialogflow-es/intents/`.
4. Entrenar el agente despues de cada bloque de cambios.

## 3. Intents iniciales

Los intents incluidos cubren:

- bienvenida
- ley de Ohm
- calculos con ley de Ohm
- ley de corrientes de Kirchhoff
- ley de voltajes de Kirchhoff
- resistencias en serie y paralelo
- potencia electrica
- ejercicios y pasos de solucion
- recursos del repositorio
- fallback

## 4. Activar Telegram en Dialogflow

1. En Dialogflow ES ir a `Integrations`.
2. Elegir `Telegram`.
3. Pegar el token entregado por BotFather.
4. Activar la integracion.
5. Probar el bot desde Telegram.

## 5. Frases de prueba

```text
Hola
Que es la ley de Ohm?
Como calculo la corriente?
Tengo 12 V y 4 ohmios
Explica la LCK
Explica la LKV
Que pasa con resistencias en serie?
Que pasa con resistencias en paralelo?
Como calculo potencia?
Que material puedo revisar?
```

## 6. Recomendaciones de seguridad

- No guardar tokens en Git.
- Usar variables de entorno si luego se agrega webhook.
- Si se publica un webhook, usar HTTPS.
- Revisar periodicamente conversaciones reales para mejorar intents.

## 7. Mejoras siguientes

- Agregar entidades para unidades: voltios, amperios, ohmios, watts.
- Crear un webhook que resuelva operaciones numericas automaticamente.
- Agregar imagenes de circuitos simples en `assets/`.
- Crear tarjetas o respuestas enriquecidas para Telegram.
