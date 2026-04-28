# ohmIA

Chatbot educativo sobre la ley de Ohm y las leyes de Kirchhoff de corriente y voltaje, pensado para publicarse en Telegram usando Dialogflow de Google.

## Objetivo

ohmIA ayuda a estudiantes de circuitos electricos a:

- Entender la ley de Ohm: `V = I * R`.
- Aplicar la ley de corrientes de Kirchhoff: corrientes que entran a un nodo igual a corrientes que salen.
- Aplicar la ley de voltajes de Kirchhoff: la suma algebraica de voltajes en un lazo cerrado es cero.
- Resolver dudas frecuentes sobre resistencias en serie, paralelo, potencia electrica y pasos de analisis.
- Calcular resistencia equivalente, divisores de voltaje y casos simples de LCK con datos del usuario.
- Proponer ejercicios de practica por tema.
- Recomendar videos en espanol para reforzar conceptos.
- Recomendar recursos del repositorio para repaso y practica.

## Estructura

```text
ohmIA/
├── assets/                         # Imagenes y recursos visuales del bot
├── data/
│   ├── faq.csv                     # Preguntas frecuentes para entrenamiento
│   └── videos-recomendados.json    # Videos sugeridos en espanol
├── dialogflow-es/
│   ├── agent.json                  # Metadatos base del agente Dialogflow ES
│   ├── package.json                # Metadatos del paquete exportable
│   └── intents/                    # Intents iniciales en formato Dialogflow ES
├── docs/
│   ├── conocimiento-ohmia.md       # Base de conocimiento curada desde el material
│   ├── dialogflow-telegram.md      # Guia de configuracion Dialogflow + Telegram
│   ├── github-pages.md             # Publicacion de imagenes con GitHub Pages
│   ├── recursos-visuales-y-videos.md
│   ├── webhook-calculos.md         # Guia del webhook de calculos
│   └── plan-proyecto.md            # Ruta de trabajo sugerida
├── webhook/                        # Servidor Node.js para calculos dinamicos
├── index.html                      # Galeria publica para GitHub Pages
└── materiales originales           # PDFs y presentaciones fuente
```

## Material fuente

El repositorio contiene material de clase y referencia:

- `CIRCUITOS RESISTIVOS.pptx`
- `APLICACIONES LEYES DE KIRCHOFF.pptx`
- `ELEMENTOS BÁSICOS DE LOS CIRCUITOS1.pdf`
- `formulas circuitos 1.pdf`
- `ohm kirchoff irwin.pdf`
- `ohm kirchoffsadico.pdf`

La version actual del bot toma de estos recursos definiciones, formulas, pasos de solucion y ejemplos de aplicacion.

## Puesta en marcha en Dialogflow ES

1. Crear un proyecto en Google Cloud.
2. Abrir Dialogflow ES y crear un agente llamado `ohmIA`.
3. Idioma predeterminado: `Spanish - es`.
4. Zona horaria sugerida: `America/Bogota`.
5. Importar o recrear los intents ubicados en `dialogflow-es/intents/`.
6. Activar integracion con Telegram usando el token entregado por BotFather.
7. Activar el webhook en `Fulfillment` con la URL publica terminada en `/webhook`.
8. Probar preguntas como:
   - "Que es la ley de Ohm?"
   - "Como aplico LCK?"
   - "Si tengo 12 V y 4 ohmios, cual es la corriente?"
   - "Explicame la ley de voltajes de Kirchhoff"
   - "Resistencia equivalente en paralelo de 10 ohm y 20 ohm"
   - "Dame un ejercicio de potencia"
   - "Recomiendame videos de Kirchhoff"

La guia detallada esta en `docs/dialogflow-telegram.md`.

## Estado

El webhook calcula ley de Ohm, potencia, resistencia equivalente, divisor de voltaje, LCK simple, ejercicios y recomendaciones de videos sin dependencias externas. Ver `webhook/README.md`.

Las imagenes pueden publicarse con GitHub Pages. Ver `docs/github-pages.md`.
