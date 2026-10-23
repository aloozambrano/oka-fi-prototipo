# Portal OKA-Fi · Prototipo web

Web estática (HTML/CSS/JS, sin build) con los 9 flujos del portal cautivo OKA-Fi.
Fuente de diseño: Figma "Sprint 30" · página Oka-Fi. Las pantallas son exportaciones a 2x de Figma
(360 px de ancho) y las zonas táctiles replican las interacciones del prototipo de Figma.

## Estructura
- `index.html`: lista de los 9 flujos.
- `flujo.html?f=<1-9>`: visor del flujo. Con `&modo=prueba` oculta hoja resumen y etiquetas (para pruebas con usuarios).
- `data.js`: pantallas, zonas táctiles, flujos y textos de las hojas resumen.
- `img/`: pantallas exportadas de Figma.

## Probar en local
Desde esta carpeta: `python3 -m http.server 8080` y abrir http://localhost:8080

## Desplegar en Vercel
1. Instalar Node.js (si no está): `brew install node`
2. Instalar la CLI: `npm i -g vercel`
3. Iniciar sesión: `vercel login`
4. Desde esta carpeta, primer despliegue de prueba: `vercel`
   (responder: proyecto nuevo, nombre `oka-fi-prototipo`, sin framework, directorio raíz `./`).
5. Para la URL final: `vercel --prod`
6. Si quien abre el link ve una pantalla de login de Vercel, desactivar la protección:
   Proyecto → Settings → Deployment Protection → Vercel Authentication → Disabled.

## Actualizar tras cambios en Figma
Volver a exportar las pantallas afectadas a `img/` (mismo nombre de archivo, escala 2x) y, si cambian
botones o pasos, ajustar `data.js`. Luego `vercel --prod`.

_Doc hecho con Claude Code 🤖_
