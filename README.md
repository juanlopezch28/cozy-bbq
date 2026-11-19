# Cozy BBQ — web del evento

Web del evento solidario **Cozy BBQ** (6 December 2026, 12:30–14:30, BBQ veld Kralingse Bos, Rotterdam), a beneficio de 3FM Serious Request.
React + TypeScript + Vite, sin frameworks de UI. Todo el contenido público está en inglés.

Rutas: `/` · `/cause` · `/menu` · `/faq` · `/privacy` (auxiliar, enlazada desde el footer).

---

## 1. Instalar y ejecutar

Requiere Node 18+ (Netlify usa Node 20).

```bash
npm install
npm run dev          # http://localhost:5173
```

## 2. Versión de producción

```bash
npm run build        # comprueba tipos, compila en dist/ y pre-renderiza los metadatos de cada ruta
npm run preview      # sirve dist/ en http://localhost:4173
```

`scripts/prerender-meta.mjs` genera `dist/cause/index.html`, `dist/menu/index.html`, etc., con título, descripción y Open Graph propios. Así WhatsApp y las redes sociales muestran la vista previa correcta, aunque no ejecuten JavaScript. Las URL absolutas de `og:image`/`og:url` usan la variable `URL` que Netlify define automáticamente. En local puedes usar `SITE_URL=https://tu-dominio npm run build`.

## 3. Desplegar en Netlify

1. Sube el proyecto a un repositorio de GitHub/GitLab y créalo en Netlify con **Add new site → Import an existing project**.
2. `netlify.toml` ya define el comando (`npm run build`), la carpeta (`dist`), Node 20 y el fallback SPA (`/* → /index.html 200`). La navegación directa y la recarga funcionan en todas las rutas.
3. Añade las variables de entorno de la sección 5 en **Site configuration → Environment variables** y vuelve a desplegar.

Alternativa sin repositorio: `npm run build` y arrastra la carpeta `dist/` a app.netlify.com/drop. En ese caso, las variables de entorno deben estar en `src/config/site.ts` o en un `.env` antes de compilar.

## 4. Dónde cambiar cada cosa

| Qué | Archivo |
| --- | --- |
| Fecha, horario, lugar, enlaces, GA4, recaudación, imágenes, logo | `src/config/site.ts` |
| Combos, precios, bebidas, ingredientes, alérgenos | `src/content/menu.ts` |
| Preguntas frecuentes (y respuestas pendientes) | `src/content/faq.ts` |
| Título y descripción SEO/compartir de cada página | `src/content/pages.json` |
| Textos de cada página | `src/pages/*.tsx` |
| Colores, tipografías, espaciado | `src/styles/tokens.css` |
| Foto del hero | `public/images/` + `images.hero` en `site.ts` |
| Imagen para compartir (1200×630) | `public/images/og-image.jpg` |
| Logo | `public/brand/` + `images.logoSrc` en `site.ts` |
| Ilustraciones | `src/components/illustrations/Illustrations.tsx` |

**Foto del hero.** El original (1536×1024) se exportó a WebP en 640/1024/1536 px, más un JPG de respaldo. Para cambiarla, genera los mismos tamaños con los mismos nombres o actualiza `images.hero.srcSet`. El archivo recibido no tenía créditos visibles ni en los metadatos. Si el autor requiere atribución, escríbela en `images.hero.credit` y se mostrará sobre la foto.

**Logo e ilustraciones.** No se adjuntaron el logo de Cozy BBQ ni ilustraciones propias. Por eso hay un logotipo provisional (llama + "COZY BBQ") y unas ilustraciones SVG de marcador de posición (hamburguesa, perrito, vaso, brindis, hucha, árbol, llama, pinzas…) con el mismo estilo: trazo negro grueso y naranjas de marca. Para usar vuestro logo, pon el archivo en `public/brand/` e indica su ruta en `images.logoSrc`. Para las ilustraciones, sustituye el componente por un `<img>`.

**Alimentos.** En `menu.ts`, rellena `items` y cambia `confirmed` a `true`. Mientras siga en `false`, no se publica nada.

**FAQs pendientes.** Las preguntas con `answer: null` (reserva anticipada, vegetariano, alérgenos, lluvia, reembolsos) no se muestran. Escribe la respuesta confirmada y aparecerán.

**Recaudación verificada.** En `site.ts`, rellena `fundraising.raisedVerified` (cantidad neta real) y `raisedUpdatedAt` (`'2026-12-10'`). Solo con ambos valores aparece la barra de progreso. La web nunca calcula la donación a partir de las ventas.

## 5. Variables de entorno (o valores en `site.ts`)

| Variable | Ejemplo | Sin valor… |
| --- | --- | --- |
| `VITE_WEEZTIX_SHOP_URL` | `https://shop.weeztix.com/<id>/tickets` | Botones "Tickets coming soon" deshabilitados |
| `VITE_DONATION_URL` | URL de vuestra acción en 3FM | Se muestra "Learn about the cause" (página oficial) |
| `VITE_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Analítica totalmente inactiva |
| `VITE_INSTAGRAM_URL` | `https://www.instagram.com/...` | Sin enlace en el footer |
| `VITE_WHATSAPP_NUMBER` | `31612345678` (solo dígitos) | Sin enlaces de WhatsApp |

Las variables tienen prioridad sobre `site.ts`. Ver `.env.example`.

## 6. Conectar la tienda de Weeztix

1. Crea la tienda en Weeztix con dos tipos de entrada: **The Burger Combo (€5.99)** y **The Hot Dog Combo (€4.99)**. Cada entrada equivale a un combo y una plaza; las cantidades y la compra de varias plazas se gestionan en la tienda.
2. **Precio final:** para que el comprador pague exactamente €5.99 / €4.99, configura en Weeztix que las comisiones de servicio/transacción las asume el organizador (no se suman al cliente), o ajusta el precio base para que el total del checkout coincida. Compruébalo con una compra de prueba.
3. Pega la URL pública de la tienda en `VITE_WEEZTIX_SHOP_URL`.
4. Opcional: si Weeztix ofrece un enlace **verificado** que preselecciona un tipo de entrada, ponlo en `shopUrl` del combo en `menu.ts`. Si no, ambos botones abren la tienda general.

La web no simula carritos, pagos ni confirmaciones: todo ocurre en Weeztix.

## 7. Página de donación

Cuando exista la página de vuestra acción en la plataforma de 3FM Serious Request, pon su URL en `VITE_DONATION_URL`. Al hacerlo:
- en `/cause` aparece el botón **"Donate to the cause"** (evento `donate_click`);
- la FAQ "Can I donate without attending?" enlaza a esa página.

## 8. Consentimiento y GA4

**Comportamiento (Basic Consent Mode)** — `src/lib/consent.ts`, `src/lib/analytics.ts`, `src/components/CookieConsent.tsx`:
- Antes de aceptar no se carga `gtag.js` ni se hace ninguna petición a Google.
- "Accept analytics" y "Reject analytics" tienen el mismo estilo y peso. "Settings" abre el panel, con la analítica desactivada por defecto.
- La elección se guarda en `localStorage` (`cozybbq_consent`) y se vuelve a preguntar a los 12 meses o al subir `consentVersion`.
- **Cookie settings** (footer y `/privacy`) permite revisar o retirar el consentimiento. Al retirarlo: `consent update → denied`, `ga-disable-<ID> = true` y se borran las cookies `_ga`, `_ga_*`, `_gid` y `_gat*` del dominio.
- Sin Meta Pixel ni otros rastreadores. No se envían datos personales a GA4.
- **El consentimiento de esta web no controla la tienda de Weeztix**, que tiene su propio banner y configuración. Revísala por separado.

**Eventos implementados** (solo con consentimiento):

| Evento | Cuándo | Parámetros |
| --- | --- | --- |
| `page_view` | Una vez por navegación efectiva (clave de ruta; sin duplicados por re-render ni por re-aceptar) | `page_location`, `page_path`, `page_title` |
| `view_item_list` | Al ver los combos (una vez por visita a la página) | `item_list_id` (`home_menu_preview` / `menu_combos`), `items[]` con `item_id` `burger_drink_combo` / `hotdog_drink_combo` |
| `ticket_shop_click` | Clic hacia Weeztix | `combo_id`, `source_page`, `link_url` |
| `donate_click` | Clic en "Donate to the cause" | `source_page`, `link_location` |
| `whatsapp_click` | Clic en WhatsApp | `source_page`, `link_location` |

`add_to_cart`, `begin_checkout` y `purchase` **no se envían desde esta web**: solo pueden venir de la tienda.

**Configurar GA4:**
1. Crea una propiedad GA4 y un flujo web y copia el ID `G-…` en `VITE_GA4_MEASUREMENT_ID`.
2. En *Data streams → Enhanced measurement*, **desactiva "Page changes based on browser history events"**. La web envía los `page_view` manualmente y, si no, se duplicarían.
3. Registra como dimensiones personalizadas `combo_id`, `source_page` y `link_location` si quieres verlas en informes.
4. Añade el dominio de la tienda en *Configure tag settings → Configure your domains* (medición entre dominios) y marca el dominio de Weeztix en *List unwanted referrals*.

**Comprobar el consentimiento:** abre DevTools → Network y filtra por `google`. Antes de aceptar, y después de rechazar, no debe haber ninguna petición. Tras aceptar, aparece `gtag/js` y peticiones `collect`. Añade `?ga_debug=1` a la URL para ver los eventos en *GA4 → DebugView*.

**UTM** (atribución). La campaña de la URL de entrada se conserva en memoria, sin almacenarla, hasta que el visitante acepta. Convención:

| Origen | Parámetros |
| --- | --- |
| Instagram orgánico (bio) | `utm_source=instagram&utm_medium=social&utm_campaign=cozy_bbq_2026&utm_content=bio` |
| Instagram stories | `…&utm_content=story` |
| Campañas de Meta | `utm_source=meta&utm_medium=paid_social&utm_campaign=cozy_bbq_2026&utm_content=<anuncio>` |
| Asociaciones | `utm_source=<socio>&utm_medium=partner&utm_campaign=cozy_bbq_2026` |

Helpers en `src/lib/links.ts` (`utmPresets`, `withUtm`).

**Medición de compras en Weeztix (pendiente, ver la guía de GTM de Weeztix):**
1. Conectar GTM/GA4 en la tienda de Weeztix con el **mismo ID de medición** (misma propiedad) si se quiere un único embudo.
2. Activar la medición entre dominios (dominio de la web + dominio de la tienda).
3. Configurar el consentimiento en la propia tienda (banner/Consent Mode de Weeztix).
4. Validar en DebugView que `add_to_cart`, `begin_checkout` y `purchase` llegan solo en acciones reales, y que `purchase` incluye `transaction_id` único, `value`, `currency: "EUR"` e `items` con cantidades.
5. Hacer una compra de prueba y comprobar que no hay duplicados.

Esta integración **no está terminada** hasta verificarla con la configuración real del proveedor.

## 9. Estado

**Terminado**
- Cuatro páginas + privacidad + 404, con navegación accesible (skip link, foco visible, menú móvil con Esc) y rutas que funcionan al acceder directamente y al recargar.
- Diseño responsive (comprobado a 320, 390, 820 y 1440 px sin scroll horizontal) y animaciones que respetan `prefers-reduced-motion`.
- Hero con la foto optimizada (WebP responsive + precarga), botón "Get directions" (Google Maps con la dirección real) y "Add to calendar" (.ics con 12:30–14:30 Europe/Amsterdam).
- Tarjetas de combos, estado "Tickets coming soon" y botones listos para Weeztix.
- Página de la causa con objetivo de €200, progreso solo con datos verificados y donación configurable.
- FAQs accesibles con las respuestas pendientes ocultas.
- Banner y panel de consentimiento, GA4 condicionado y eventos sin duplicados (probado con un ID de prueba y peticiones interceptadas: 0 peticiones antes de aceptar o tras rechazar, y ninguna compra ficticia).
- Metadatos por página, Open Graph/Twitter, datos estructurados `Event`, favicon e imagen para compartir.
- Fuentes servidas localmente (Anton + Inter, vía `@fontsource`).

**Pendiente (datos o conexiones externas)**
- URL de la tienda de Weeztix, configuración de comisiones y compra de prueba.
- URL de vuestra acción en 3FM (donación).
- ID de GA4 y medición de compras en Weeztix (sección 8).
- Instagram y número de WhatsApp.
- Bebidas, ingredientes, alérgenos y opciones vegetarianas.
- Respuestas a las FAQs pendientes (reserva anticipada, lluvia, reembolsos…).
- Importe recaudado verificado (después del evento).
- Logo e ilustraciones definitivos, si los hay. Créditos de la foto, si el autor los requiere.
- Contacto/responsable para la página de privacidad, si queréis incluirlo.
- Revisar el texto de la causa con la fuente oficial (npo3fm.nl/kominactie). Durante el desarrollo no se pudo acceder a esa página ni a las webs de referencia por las restricciones de red del entorno, así que el texto se basa en la información del brief.
