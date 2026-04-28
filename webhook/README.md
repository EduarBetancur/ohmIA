# Webhook ohmIA

Webhook local para que Dialogflow ES pueda responder calculos de ley de Ohm y potencia electrica.

## Requisitos

- Node.js 18 o superior.
- No requiere instalar paquetes externos.

## Ejecutar pruebas

```bash
npm test
```

## Ejecutar servidor local

```bash
npm start
```

El servidor queda en:

```text
http://localhost:8080
```

Endpoints:

- `GET /health`
- `POST /webhook`

## Ejemplo de solicitud Dialogflow

```json
{
  "queryResult": {
    "queryText": "tengo 12 V y 4 ohmios",
    "action": "ohmia.calculo_ohm"
  }
}
```

Respuesta:

```json
{
  "fulfillmentText": "Con 12 V y 4 Ω, aplicamos I = V / R. Entonces I = 12 / 4 = 3 A.",
  "fulfillmentMessages": [
    {
      "text": {
        "text": [
          "Con 12 V y 4 Ω, aplicamos I = V / R. Entonces I = 12 / 4 = 3 A."
        ]
      }
    }
  ]
}
```

## Conectar en Dialogflow ES

1. Ir a `Fulfillment`.
2. Activar `Webhook`.
3. Pegar la URL HTTPS publica del servicio desplegado.
4. Guardar.
5. En los intents de calculo, activar `Enable webhook call for this intent`.

Para pruebas reales con Dialogflow no sirve `localhost`; Dialogflow necesita una URL publica HTTPS.

## Desplegar con Docker

El directorio incluye un `Dockerfile` listo para Cloud Run, Render, Railway u otro servicio que acepte contenedores.

```bash
docker build -t ohmia-webhook .
docker run -p 8080:8080 ohmia-webhook
```
