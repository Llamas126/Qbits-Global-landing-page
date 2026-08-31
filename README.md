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
| `npm run build`    | Verifica el entorno, compila y genera dist     |
| `npm run preview`  | Previsualiza la build de producción            |
| `npm run lint`     | Ejecuta el linter de Oxlint                    |
| `npm run deploy`   | Compila y publica en Cloudflare Pages          |

## Configuración

El formulario de contacto usa [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile)
y [Web3Forms](https://web3forms.com). Las claves nunca se versionan.

### Variables públicas (cliente)

Crea un archivo `.env` en la raíz (no se versiona). Solo hay una variable pública,
necesaria para que el widget de Turnstile se renderice:

```
VITE_TURNSTILE_SITE_KEY=tu_site_key_de_cloudflare_turnstile
```

El script `verify-env` integrado en `npm run build` falla si esta variable falta o si
detecta una `VITE_WEB3FORMS_ACCESS_KEY` (ya no se usa en el cliente).

> El build de **Cloudflare Pages clona el repo, así que `.env` no viaja a CI**. Para que el
> despliegue compile, declara la variable en el dashboard:
> **Settings → Environment variables (Production)** →
> `VITE_TURNSTILE_SITE_KEY` con el valor de tu site key.

### Secretos (Worker de Cloudflare)

Web3Forms elimina el `VITE_WEB3FORMS_ACCESS_KEY`, la Web3Forms access key y la Turnstile
secret key **nunca** viajan en el bundle del cliente. Se guardan como secretos del Worker
de Cloudflare Pages (proyecto `qbits-global-landing-page`):

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

- **Cloudflare Turnstile**: la site key debe permitir el dominio `qbitsglobal.com`;
  guarda la secret key en el Worker (paso anterior).
- **Web3Forms**: verifica que la access key sea la que se configura como secreto.

Referencias: [Web3Forms](https://web3forms.com) · [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile)

## Licencia

Este proyecto es **software propietario** de uso exclusivo de Qbits Global. Está publicado
bajo la licencia propietaria descrita en el archivo [`LICENSE`](./LICENSE). No se permite
su uso, copia, distribución o modificación sin autorización expresa por escrito de
Qbits Global.

---

Copyright © 2026 **Qbits Global**. Todos los derechos reservados.
