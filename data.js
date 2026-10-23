// Datos del prototipo OKA-Fi. Fuente: Figma "Sprint 30" · página Oka-Fi (flujos 1 a 9).
// Coordenadas de zonas táctiles en px sobre pantalla de 360 de ancho (iguales al prototipo de Figma).

const SCREENS = {
  wifi:        { img: "img/wifi.png",        h: 784 },
  form_empty:  { img: "img/form_empty.png",  h: 785 },
  form_full:   { img: "img/form_full.png",   h: 785 },
  connecting:  { img: "img/connecting.png",  h: 785 },
  offers_both: { img: "img/offers_both.png", h: 964 },
  offers_bnpl: { img: "img/offers_bnpl.png", h: 850 },
  offers_ld:   { img: "img/offers_ld.png",   h: 850 },
  no_offer:    { img: "img/no_offer.png",    h: 785 },
  err_dni:     { img: "img/err_dni.png",     h: 785 },
  err_cel:     { img: "img/err_cel.png",     h: 785 },
  err_mail:    { img: "img/err_mail.png",    h: 785 },
  no_consent:  { img: "img/no_consent.png",  h: 785 },
  fail_query:  { img: "img/fail_query.png",  h: 785 },
  fail_conn:   { img: "img/fail_conn.png",   h: 785 },
  device_dni:  { img: "img/device_dni.png",  h: 785 },
  timeout:     { img: "img/timeout.png",     h: 785 }
};

// Zona táctil por pantalla: [x, y, ancho, alto]. "auto" = avanza solo tras 2 s.
const HOTSPOTS = {
  wifi:       { zone: [47, 545, 287, 39] },
  form_empty: { zone: [16, 314, 329, 426] },
  form_full:  { zone: [16, 684, 329, 56] },
  connecting: { auto: 2000 },
  err_dni:    { zone: [16, 314, 329, 452] },
  err_cel:    { zone: [16, 314, 329, 452] },
  err_mail:   { zone: [16, 314, 329, 452] },
  no_consent: { zone: [16, 314, 329, 426] },
  fail_query: { zone: [48, 530, 264, 48] },
  fail_conn:  { zone: [48, 530, 264, 48] },
  timeout:    { zone: [48, 508, 264, 48] }
};

const KEYC = "Red de invitados aislada de la intranet de Hiraoka; tiempo máximo de conexión estimado de 1 hora.";
const HOW = { h: "Cómo se llega", lines: [
  "El usuario elige la red OKA-Fi y se abre el portal cautivo.",
  "Completa DNI, celular y correo, y marca la autorización de datos personales.",
  "Al tocar Conectarme se da acceso a internet y se consulta la oferta en el motor de riesgo."
] };
const VER_OFERTA = { h: "Por validar", lines: ["Destino del botón Ver oferta y en qué momento se revela el monto."] };

const FLOWS = [
  { id: 1, tag: "Oferta", title: "Con oferta BNPL + LD",
    desc: "El cliente ve Crédito Oka y Efectivo Oka preaprobados, sin monto.",
    steps: [
      { k: "wifi", cap: "Usuario elige la red OKA-Fi" }, { k: "form_empty", cap: "Formulario vacío" },
      { k: "form_full", cap: "Formulario completo" }, { k: "connecting", cap: "Conectando" },
      { k: "offers_both", cap: "Con oferta Crédito Oka + Efectivo Oka" } ],
    sheet: [
      { h: "Cuándo ocurre", lines: ["El DNI tiene oferta preaprobada de Crédito Oka (BNPL) y de Efectivo Oka (LD)."] }, HOW,
      { h: "Qué ve el usuario", lines: ["Pantalla ¡LISTO! con la conexión confirmada y dos tarjetas: Crédito Oka y Efectivo Oka.", "Cada tarjeta tiene el botón Ver oferta."] },
      { h: "Puntos clave", lines: ["No se muestra el monto en esta etapa: la tarjeta solo indica que existe una oferta preaprobada.", "El Wi-Fi ya está activo cuando aparecen las ofertas.", KEYC] }, VER_OFERTA ] },
  { id: 2, tag: "Oferta", title: "Solo oferta BNPL (Crédito Oka)",
    desc: "El cliente solo califica para Crédito Oka, para comprar en Hiraoka.",
    steps: [
      { k: "wifi", cap: "Usuario elige la red OKA-Fi" }, { k: "form_empty", cap: "Formulario vacío" },
      { k: "form_full", cap: "Formulario completo" }, { k: "connecting", cap: "Conectando" },
      { k: "offers_bnpl", cap: "Con oferta solo Crédito Oka" } ],
    sheet: [
      { h: "Cuándo ocurre", lines: ["El DNI solo tiene oferta preaprobada de Crédito Oka (compras en Hiraoka)."] }, HOW,
      { h: "Qué ve el usuario", lines: ["Pantalla ¡LISTO! con una sola tarjeta: Crédito Oka, para comprar en Hiraoka.", "No aparece ninguna mención a Efectivo Oka."] },
      { h: "Puntos clave", lines: ["La tarjeta no muestra monto, solo la existencia de la oferta.", "Al ser la única oferta, la tarjeta usa la jerarquía principal (más grande).", KEYC] }, VER_OFERTA ] },
  { id: 3, tag: "Oferta", title: "Solo oferta LD (Efectivo Oka)",
    desc: "El cliente solo califica para Efectivo Oka.",
    steps: [
      { k: "wifi", cap: "Usuario elige la red OKA-Fi" }, { k: "form_empty", cap: "Formulario vacío" },
      { k: "form_full", cap: "Formulario completo" }, { k: "connecting", cap: "Conectando" },
      { k: "offers_ld", cap: "Con oferta solo Efectivo Oka" } ],
    sheet: [
      { h: "Cuándo ocurre", lines: ["El DNI solo tiene oferta preaprobada de Efectivo Oka."] }, HOW,
      { h: "Qué ve el usuario", lines: ["Pantalla ¡LISTO! con una sola tarjeta: Efectivo Oka.", "No aparece ninguna mención a Crédito Oka."] },
      { h: "Puntos clave", lines: ["La tarjeta no muestra monto, solo la existencia de la oferta.", KEYC] }, VER_OFERTA ] },
  { id: 4, tag: "Oferta", title: "Sin oferta",
    desc: "El cliente se conecta, pero no tiene oferta preaprobada: se deriva a un asesor.",
    steps: [
      { k: "wifi", cap: "Usuario elige la red OKA-Fi" }, { k: "form_empty", cap: "Formulario vacío" },
      { k: "form_full", cap: "Formulario completo" }, { k: "connecting", cap: "Conectando" },
      { k: "no_offer", cap: "Sin oferta" } ],
    sheet: [
      { h: "Cuándo ocurre", lines: ["El DNI no tiene oferta preaprobada de ningún producto (ni BNPL ni LD)."] }, HOW,
      { h: "Qué ve el usuario", lines: ["Pantalla ¡LISTO! con la conexión confirmada y un bloque que indica que por ahora no hay oferta preaprobada.", "Invitación a acercarse a un asesor Oka en tienda, con el botón Conoce Oka.", "Nota: Sigue disfrutando tu Wi-Fi gratis en tienda."] },
      { h: "Puntos clave", lines: ["Tener o no oferta no condiciona el acceso al Wi-Fi.", "El mensaje no explica el motivo de la decisión de riesgo.", KEYC] },
      { h: "Por validar", lines: ["Destino del botón Conoce Oka."] } ] },
  { id: 5, tag: "Error", title: "Errores al ingresar datos",
    desc: "DNI, celular y correo inválidos, y falta de autorización de datos.",
    steps: [
      { k: "wifi", cap: "Usuario elige la red OKA-Fi" }, { k: "form_empty", cap: "Formulario vacío" },
      { k: "err_dni", cap: "Error de DNI" }, { k: "err_cel", cap: "Error de celular" },
      { k: "err_mail", cap: "Error de correo" }, { k: "no_consent", cap: "Sin autorización" },
      { k: "form_full", cap: "Datos corregidos" }, { k: "connecting", cap: "Conectando" } ],
    sheet: [
      { h: "Cuándo ocurre", lines: ["El usuario deja datos incompletos o inválidos en el formulario del portal."] },
      { h: "Qué ve el usuario", lines: ["El campo con error se marca en rojo y muestra el mensaje debajo.", "Conectarme permanece deshabilitado mientras haya errores o falte la autorización de datos personales.", "Al corregir, el botón se habilita y se continúa a Conectando."] },
      { h: "Mensajes", lines: ["DNI: Ingresa un DNI válido de 8 dígitos (ya existente en el diseño).", "Propuesta de copy: Ingresa un celular válido de 9 dígitos.", "Propuesta de copy: Ingresa un correo electrónico válido."] },
      { h: "Puntos clave", lines: ["Los datos escritos se conservan al mostrar el error.", "En el prototipo, tocar el formulario avanza al siguiente estado de error."] },
      { h: "Por validar", lines: ["Reglas exactas de validación de celular y correo (formato, prefijo) y si se validan en el cliente o en el servidor."] } ] },
  { id: 6, tag: "Falla", title: "Falla al consultar las ofertas",
    desc: "La conexión funciona, pero el servicio de ofertas no responde. El cliente reintenta.",
    steps: [
      { k: "wifi", cap: "Usuario elige la red OKA-Fi" }, { k: "form_empty", cap: "Formulario vacío" },
      { k: "form_full", cap: "Formulario completo" }, { k: "connecting", cap: "Conectando" },
      { k: "fail_query", cap: "Conectado, falla la consulta" }, { k: "connecting", cap: "Reintentando" },
      { k: "offers_both", cap: "Reintento exitoso" } ],
    sheet: [
      { h: "Cuándo ocurre", lines: ["La conexión a internet se concreta, pero la consulta de la oferta falla (error del servicio o tiempo de espera agotado)."] },
      { h: "Qué ve el usuario", lines: ["Pantalla ¡LISTO! con la conexión confirmada y un bloque: No pudimos consultar tu oferta.", "Botón Reintentar y la nota Sigue disfrutando tu Wi-Fi gratis en tienda."] },
      { h: "Puntos clave", lines: ["El acceso al Wi-Fi no depende de la consulta: el usuario no queda bloqueado.", "Reintentar vuelve a Conectando; en el prototipo el reintento tiene éxito y se muestran las ofertas.", "Las ofertas, cuando aparecen, no muestran monto."] },
      { h: "Por validar", lines: ["Número máximo de reintentos y qué se muestra si el reintento también falla.", "Tiempo de espera antes de mostrar el error."] } ] },
  { id: 7, tag: "Falla", title: "Falla de conexión al conectar",
    desc: "No se logra dar acceso a internet. El cliente conserva sus datos y reintenta.",
    steps: [
      { k: "wifi", cap: "Usuario elige la red OKA-Fi" }, { k: "form_empty", cap: "Formulario vacío" },
      { k: "form_full", cap: "Formulario completo" }, { k: "connecting", cap: "Conectando" },
      { k: "fail_conn", cap: "Falla de conexión" }, { k: "form_full", cap: "Formulario con datos conservados" } ],
    sheet: [
      { h: "Cuándo ocurre", lines: ["Falla técnica o de red al enviar los datos o al dar acceso a internet desde el portal: el acceso no llega a concederse."] },
      { h: "Qué ve el usuario", lines: ["Pantalla No pudimos conectarte con ícono de sin conexión, mensaje claro y botón Reintentar.", "No aparece ¡LISTO! porque el usuario aún no tiene internet."] },
      { h: "Puntos clave", lines: ["Propuesta de diseño: los datos ingresados se conservan y Reintentar regresa al formulario completo.", "Se orienta al usuario a un asesor Oka en tienda si el problema continúa."] },
      { h: "Por validar", lines: ["Causas que cubre este estado (portal cautivo, Access Point, API de consentimiento, motor de riesgo).", "Copy final del mensaje."] } ] },
  { id: 8, tag: "Seguridad", title: "Dispositivo que ya consultó otro DNI",
    desc: "El mismo celular intenta consultar otro DNI: no se muestra oferta y se deriva a un asesor.",
    steps: [
      { k: "wifi", cap: "Usuario elige la red OKA-Fi" }, { k: "form_empty", cap: "Formulario vacío" },
      { k: "form_full", cap: "Formulario completo" }, { k: "connecting", cap: "Conectando" },
      { k: "device_dni", cap: "Dispositivo ya usado con otro DNI" } ],
    sheet: [
      { h: "Cuándo ocurre", lines: ["El back-end registra la dirección MAC del dispositivo; si ese mismo celular intenta consultar otro DNI, se bloquea la consulta."] },
      { h: "Qué ve el usuario", lines: ["Pantalla No pudimos validarte con un motivo genérico y la invitación a acercarse a un asesor Oka.", "No se muestra ninguna oferta."] },
      { h: "Puntos clave", lines: ["La regla busca evitar que un mismo celular consulte múltiples DNI.", "El mensaje no revela datos del otro DNI ni detalle de la decisión."] },
      { h: "Por validar", lines: ["Límite exacto de DNI por dispositivo.", "Si en este caso igual se concede acceso a internet.", "Copy final del mensaje."] } ] },
  { id: 9, tag: "Sesión", title: "Tiempo máximo de conexión agotado",
    desc: "Se cumple el límite de la red de invitados y el cliente debe volver a conectarse.",
    steps: [
      { k: "wifi", cap: "Usuario elige la red OKA-Fi" }, { k: "form_empty", cap: "Formulario vacío" },
      { k: "form_full", cap: "Formulario completo" }, { k: "connecting", cap: "Conectando" },
      { k: "offers_both", cap: "Usuario conectado · toca para simular ~1 h", tapAnywhere: true },
      { k: "timeout", cap: "Tiempo agotado" }, { k: "form_empty", cap: "Vuelve al portal" } ],
    sheet: [
      { h: "Cuándo ocurre", lines: ["Se cumple el tiempo máximo de conexión de la red de invitados (estimado de 1 hora)."] },
      { h: "Qué ve el usuario", lines: ["Pantalla Tu conexión terminó con el botón Volver a conectarme, que lleva de nuevo al formulario del portal."] },
      { h: "Puntos clave", lines: ["La red de invitados está aislada de la intranet de Hiraoka y tiene restricción de ancho de banda por dispositivo.", "El tiempo máximo es una restricción de seguridad de red, no de la oferta."] },
      { h: "Por validar", lines: ["Tiempo exacto de conexión.", "Si al reconectarse se piden los datos de nuevo o se reconoce el dispositivo."] } ] }
];
