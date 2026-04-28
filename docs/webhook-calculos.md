# Webhook de calculos

El webhook permite que ohmIA resuelva operaciones simples cuando el usuario da valores con unidades.

## Calculos soportados

Ley de Ohm:

```text
I = V / R
V = I * R
R = V / I
```

Potencia:

```text
P = V * I
P = I^2 * R
P = V^2 / R
I = P / V
V = P / I
```

## Frases que debe reconocer

```text
tengo 12 V y 4 ohmios
calcula corriente con 9 voltios y 3 ohmios
tengo corriente de 2 A y resistencia de 5 ohmios
calcula potencia con 12 V y 2 A
potencia con 3 A y 4 ohmios
```

## Flujo con Dialogflow

1. Telegram envia el mensaje a Dialogflow.
2. Dialogflow detecta el intent.
3. Si el intent tiene webhook activo, Dialogflow envia un `POST /webhook`.
4. El webhook responde con `fulfillmentText`.
5. Dialogflow devuelve esa respuesta a Telegram.

## Despliegue

Dialogflow exige una URL publica con HTTPS. Para produccion se recomienda:

- Google Cloud Run
- Firebase Functions
- Render
- Railway

Durante desarrollo local se puede probar el servidor con `npm test` y con solicitudes HTTP locales.

## URL que se pega en Dialogflow

Cuando el servicio este desplegado, Dialogflow debe apuntar a:

```text
https://TU_DOMINIO_PUBLICO/webhook
```

Antes de pegarla, se puede probar:

```text
https://TU_DOMINIO_PUBLICO/health
```

Debe responder con un JSON similar a:

```json
{"ok":true,"service":"ohmia-webhook"}
```
