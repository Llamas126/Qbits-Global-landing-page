# Guía de contribución

Gracias por tu interés en colaborar con el sitio web de **Qbits Global**.

> **Nota importante:** este repositorio aloja software **propietario** de uso exclusivo de
> Qbits Global. La contribución está limitada al equipo autorizado por la empresa. Cualquier
> uso o divulgación no autorizada del código queda prohibida conforme al archivo
> [`LICENSE`](./LICENSE).

## Registro de incidencias

- Antes de abrir una incidencia, comprueba que no exista una ya abierta sobre el mismo tema.
- Describe el problema con claridad: pasos para reproducirlo, comportamiento esperado y
  comportamiento observado.
- Indica el entorno (navegador, versión, sistema operativo) cuando sea relevante.

## Flujo de trabajo

1. Crea una rama a partir de `main` con un nombre descriptivo
   (ej.: `fix/hero-titulo`, `feat/seccion-equipo`).
2. Realiza los cambios siguiendo los estándares del proyecto.
3. Verifica que todo pasa correctamente (ver más abajo).
4. Abre un pull request contra `main` describiendo los cambios y su motivo.

## Estándares de código

- El proyecto usa **TypeScript** en modo estricto. Respeta los tipos existentes y añade los
  necesarios para los nuevos cambios.
- Los componentes se escriben en `src/components` siguiendo el estilo de los existentes.
- Usa los tokens y utilidades de diseño ya definidos; no introduzcas estilos ad hoc ni
  colores hardcodeados.
- No añadas dependencias nuevas sin justificarlo en el pull request.

## Comprobaciones previas al pull request

Ejecuta estas comprobaciones y asegúrate de que terminan sin errores:

```bash
npm run lint
npm run build
```

## Mensajes de commit

Usa [Conventional Commits](https://www.conventionalcommits.org) con prefijos como
`build:`, `chore:`, `feat:`, `fix:` o `ui:`, y un mensaje claro y conciso.
