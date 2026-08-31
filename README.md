# Qbits Global — Landing Page

Sitio web corporativo de [Qbits Global](https://qbitsglobal.com). Landing page estática,
rápida y pulida que presenta los servicios, la misión y el equipo de la empresa.

## Stack

- [Vite](https://vitejs.dev) — bundler y servidor de desarrollo
- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) v4 — estilos utilitarios y tokens de diseño
- [Base UI](https://base-ui.com) — primitivas de accesibilidad (componentes shadcn)
- [sonner](https://sonner.emilkowal.ski) — notificaciones (toast)
- [Oxlint](https://oxc.rs) — linter

## Estructura

```
public/images/          Fotografías y activos estáticos
src/                    Código fuente
  components/           Secciones y componentes de la landing
    ui/                 Primitivas de UI (shadcn)
  lib/                  Utilidades
  config.ts             Constantes públicas (site key de Turnstile)
  App.tsx               Composición de las secciones
  main.tsx              Punto de entrada
  index.css             Tokens de diseño y estilos globales
```

## Requisitos previos

- Node.js 20 o superior
- npm 10 o superior

## Puesta en marcha

```bash
npm install
npm run dev
```

## Scripts

| Comando            | Descripción                                    |
| ------------------ | ---------------------------------------------- |
| `npm run dev`      | Inicia el servidor de desarrollo con HMR       |
| `npm run dev:worker`| Levanta las Functions de Pages localmente      |
| `npm run build`    | Verifica que no haya claves sensibles, compila y genera dist
| `npm run preview`  | Previsualiza la build de producción            |
| `npm run lint`     | Ejecuta el linter de Oxlint                    |
| `npm run deploy`   | Compila y publica en Cloudflare Pages          |

## Configuración

El formulario de contacto usa [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile)
y [Web3Forms](https://web3forms.com). La site key de Turnstile está en `src/config.ts`
(es pública por diseño; el navegador la necesita para renderizar el widget).

El script `verify-env` integrado en `npm run build` detecta si hay una
`VITE_WEB3FORMS_ACCESS_KEY` en el entorno y aborta si la encuentra (esa clave
nunca debe ir en el bundle del cliente).

### Secretos (Worker de Cloudflare)

La Web3Forms access key y la Turnstile secret key **nunca** viajan en el bundle del
cliente. Se guardan como secretos del Worker de Cloudflare Pages
(proyecto `qbits-global-landing-page`):

```bash
npx wrangler pages secret put WEB3FORMS_ACCESS_KEY
npx wrangler pages secret put TURNSTILE_SECRET_KEY
```

### Funciones de Cloudflare Pages

La ruta `functions/api/contact.js` implementa una [Pages Function](https://developers.cloudflare.com/pages/functions/)
que valida el token de Turnstile con la *secret key* en el servidor y reenvía el envío a
Web3Forms. En desarrollo, `npm run dev:worker` expone las funciones en `http://localhost:8788`
y Vite redirige `/api` a esa dirección (ver `vite.config.ts`).

### Despliegue

```bash
npm run deploy
```

Publica `dist/` (con las Functions incluidas) en Cloudflare Pages. Antes del primer
despliegue, autentícate con `npx wrangler login`.

### Requisitos en los paneles externos

- **Cloudflare Turnstile**: la site key (en `src/config.ts`) debe tener permitido el dominio
  `qbitsglobal.com`. La secret key se configura como secreto del Worker.
- **Web3Forms**: la access key se configura como secreto del Worker.

Referencias: [Web3Forms](https://web3forms.com) · [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile)

## Licencia

Este proyecto es **software propietario** de uso exclusivo de Qbits Global. Está publicado
bajo la licencia propietaria descrita en el archivo [`LICENSE`](./LICENSE). No se permite
su uso, copia, distribución o modificación sin autorización expresa por escrito de
Qbits Global.

---

Copyright © 2026 **Qbits Global**. Todos los derechos reservados.
