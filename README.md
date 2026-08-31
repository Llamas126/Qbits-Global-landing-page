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
  worker.ts             Cloudflare Worker (endpoint /api/contact)
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
| `npm run dev:worker`| Levanta el Worker + assets localmente          |
| `npm run build`    | Verifica que no haya claves sensibles, compila y genera dist |
| `npm run preview`  | Previsualiza la build de producción            |
| `npm run lint`     | Ejecuta el linter de Oxlint                    |
| `npm run deploy`   | Compila y publica en Cloudflare Workers        |

## Configuración

El formulario de contacto usa [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile)
y [Web3Forms](https://web3forms.com).

### Claves públicas (código)

La site key de Turnstile y la access key de Web3Forms son **públicas por diseño** y viven
en `src/config.ts` (no son secretos; el navegador las necesita).

El script `verify-env` integrado en `npm run build` solo aborta si detecta una secret key
de Turnstile en el entorno (`.env` o variables), que nunca debe ir al bundle.

### Secreto del Worker de Cloudflare

La Turnstile secret key **nunca** viaja en el bundle del cliente. Se guarda como secreto
del Worker de Cloudflare (proyecto `qbits-global`):

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY --name qbits-global
```

### Arquitectura de envío

1. El navegador envía el token de Turnstile a `POST /api/contact`; el Worker lo valida
   contra Turnstile con la *secret key* (server-side), nunca expuesta.
2. Si es válido, el navegador envía el formulario **directamente** a
   `https://api.web3forms.com/submit` (client-side, como exige Web3Forms) con el antispam
   `botcheck` oculto.

### Worker + Workers Assets

`src/worker.ts` es el [Cloudflare Worker](https://developers.cloudflare.com/workers/)
que valida Turnstile en `POST /api/contact` y sirve los estáticos de `dist/` vía
[Workers Assets](https://developers.cloudflare.com/workers/static-assets/).

En desarrollo, `npm run dev:worker` levanta el Worker + assets localmente.

### Despliegue

```bash
npm run deploy
```

Compila el frontend (`dist/`) y publica el Worker + assets estáticos en Cloudflare Workers.
Antes del primer despliegue, autentícate con `npx wrangler login`.

### Requisitos en los paneles externos

- **Cloudflare Turnstile**: la site key (en `src/config.ts`) debe tener permitido el dominio
  `qbitsglobal.com`. La secret key se configura como secreto del Worker.
- **Web3Forms**: la access key pública vive en `src/config.ts`.

Referencias: [Web3Forms](https://web3forms.com) · [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile)

## Licencia

Este proyecto es **software propietario** de uso exclusivo de Qbits Global. Está publicado
bajo la licencia propietaria descrita en el archivo [`LICENSE`](./LICENSE). No se permite
su uso, copia, distribución o modificación sin autorización expresa por escrito de
Qbits Global.

---

Copyright © 2026 **Qbits Global**. Todos los derechos reservados.
