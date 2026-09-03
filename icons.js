// ============================================
// ICONOS SVG INLINE
// ============================================
// Van como SVG inline y no como <img> por dos motivos: heredan el color del
// texto vía currentColor (así siguen la paleta sin duplicar archivos por tono)
// y no añaden peticiones de red.
//
// Todos son formas geométricas dibujadas a mano sobre un lienzo de 24x24, no
// los logotipos oficiales de las marcas: son marcas registradas y no quiero
// incrustar material con copyright en el portfolio. La idea es que cada
// tecnología tenga una silueta reconocible y distinta de las demás.

// --- Iconos de tecnología, uno por skill ---------------------------------
const SKILL_ICONS = {
  // Órbitas cruzadas alrededor de un núcleo: la figura habitual para React.
  react: '<ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/>',

  // Nube con una flecha hacia arriba: servicios cloud.
  cloud: '<path d="M6.5 18.5A4 4 0 0 1 6 10.6a5.5 5.5 0 0 1 10.6-1.5A3.7 3.7 0 0 1 19 18.5z"/><path d="M12 16v-4.5"/><path d="M10 13l2-2 2 2"/>',

  // Cuatro planos escalonados: la silueta angular de Azure.
  azure: '<path d="M9 3.5L3 17h4.5L12 6.5z"/><path d="M13 8l-3.5 8.5L21 19l-4-11z"/>',

  // Nodos conectados a un núcleo: un agente que coordina herramientas.
  ai: '<rect x="7.5" y="7.5" width="9" height="9" rx="2"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><path d="M12 7.5V4M12 20v-3.5M7.5 12H4M20 12h-3.5"/><circle cx="12" cy="3" r="1.2"/><circle cx="12" cy="21" r="1.2"/><circle cx="3" cy="12" r="1.2"/><circle cx="21" cy="12" r="1.2"/>',

  // Engranaje con flecha circular: un proceso que se repite solo.
  automation: '<circle cx="12" cy="12" r="3.2"/><path d="M12 4.2V2M12 22v-2.2M4.2 12H2M22 12h-2.2M6.5 6.5L5 5M19 19l-1.5-1.5M17.5 6.5L19 5M5 19l1.5-1.5"/>',

  // Rama de commits: el grafo de Git.
  git: '<circle cx="6" cy="6" r="2.3"/><circle cx="6" cy="18" r="2.3"/><circle cx="18" cy="12" r="2.3"/><path d="M6 8.3v7.4"/><path d="M15.7 12H12a6 6 0 0 1-6-6"/>',

  // Cubo isométrico: motores 3D (Unity, Unreal).
  cube: '<path d="M12 2.6l8.5 4.7v9.4L12 21.4 3.5 16.7V7.3z"/><path d="M3.7 7.2L12 12l8.3-4.8"/><path d="M12 12v9.3"/>',

  // Mando de videojuego: game design y gameplay.
  gamepad: '<rect x="2.5" y="7.5" width="19" height="9.5" rx="4.5"/><path d="M7 10.8v3M5.5 12.3h3"/><circle cx="16.2" cy="11.4" r="1" fill="currentColor" stroke="none"/><circle cx="18.4" cy="13.6" r="1" fill="currentColor" stroke="none"/>',

  // Nodos enlazados: red y multijugador.
  network: '<circle cx="12" cy="4.5" r="2.2"/><circle cx="4.8" cy="18" r="2.2"/><circle cx="19.2" cy="18" r="2.2"/><path d="M10.6 6.4L6.2 15.9M13.4 6.4l4.4 9.5M7 18h10"/>',

  // Etiquetas HTML.
  html: '<path d="M8.5 8.5L5 12l3.5 3.5"/><path d="M15.5 8.5L19 12l-3.5 3.5"/><path d="M13.5 6l-3 12"/>',

  // Pincel: CSS y todo lo visual.
  brush: '<path d="M4 16.5c2.2 0 2.6-1.4 4-2.8"/><path d="M9.2 18.8c-1.5 1.5-4 1.6-5.6 1.3-.3-1.6-.2-4.1 1.3-5.6a3 3 0 0 1 4.3 4.3z"/><path d="M8.4 14.6L18 5a2.1 2.1 0 0 1 3 3l-9.6 9.6"/>',

  // Llaves de bloque: JavaScript y lenguajes en general.
  code: '<path d="M9 4.5C6.5 4.5 7.5 11 4.5 11c3 0 2 6.5 4.5 6.5"/><path d="M15 4.5c2.5 0 1.5 6.5 4.5 6.5-3 0-2 6.5-4.5 6.5"/>',

  // Almohadilla de C#.
  csharp: '<path d="M9.5 4.5L7 19M15.5 4.5L13 19"/><path d="M4.8 9h14M4 15h14"/>',

  // "++" junto a un bloque: C++.
  cpp: '<path d="M14.5 7.5A5 5 0 1 0 14.5 16.5"/><path d="M17.5 9.8v4.4M15.3 12h4.4"/>',

  // Piezas encajadas: Scratch y la programación por bloques.
  blocks: '<rect x="3.5" y="4.5" width="11" height="5.5" rx="1.5"/><rect x="6.5" y="14" width="11" height="5.5" rx="1.5"/><path d="M9 10v4"/>',

  // Triángulo dentro de un marco: el pipeline de OpenGL.
  render: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M7.5 15.5l3.5-5 2.5 3.2 1.8-2.2 3.2 4z"/>',

  // Birrete: docencia.
  teaching: '<path d="M12 4L2.5 8.6 12 13.2l9.5-4.6z"/><path d="M6.5 10.8v4.6c0 1.6 2.5 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-4.6"/><path d="M20.5 9.3v4.5"/>',

  // Marca de verificación en círculo: QA y tests.
  qa: '<circle cx="12" cy="12" r="8.5"/><path d="M8.3 12.2l2.6 2.6 5-5.2"/>',

  // Carrito: eCommerce.
  cart: '<circle cx="9.5" cy="19" r="1.4"/><circle cx="17.5" cy="19" r="1.4"/><path d="M2.5 3.5h2.6l2.3 11.1h11.1l1.8-8H6.2"/>',

  // Regla y escuadra: diseño.
  design: '<path d="M3.5 15.5L15.5 3.5l5 5-12 12H3.5z"/><path d="M12 7l5 5"/>',

  // Rectángulos anidados: interfaces responsive.
  responsive: '<rect x="2.5" y="4.5" width="13" height="10" rx="1.6"/><rect x="16" y="9.5" width="5.5" height="10" rx="1.6"/><path d="M6 18h5"/>',

  // Icono por defecto cuando la skill no tiene uno propio.
  default: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.2l2.4 2.4 4.6-4.8"/>',
};

// Cada skill del CV apunta a uno de los iconos de arriba. La clave se compara
// en minúsculas, así que "Git / Asana" entra tal cual.
const SKILL_ICON_MAP = {
  react: 'react',
  azure: 'azure',
  'google cloud': 'cloud',
  'ai agents': 'ai',
  automation: 'automation',
  git: 'git',
  'git / asana': 'git',
  unity: 'cube',
  unreal: 'cube',
  netcode: 'network',
  'multiplayer online': 'network',
  design: 'design',
  'game design': 'design',
  'web design': 'design',
  'tech art': 'render',
  opengl: 'render',
  'qa / tdd': 'qa',
  qa: 'qa',
  html: 'html',
  css: 'brush',
  javascript: 'code',
  'c#': 'csharp',
  'c++': 'cpp',
  scratch: 'blocks',
  teaching: 'teaching',
  ecommerce: 'cart',
  prestashop: 'cart',
  responsive: 'responsive',
};

// --- Marcas de empresa ----------------------------------------------------
// Monogramas propios, no los logotipos registrados de cada compañía. Se
// dibujan como texto dentro del SVG para que escalen con la tarjeta.
const COMPANY_LOGOS = {
  ntt: { initials: 'N', tint: '#1668c4' },
  ggtech: { initials: 'GG', tint: '#7a3fd1' },
  'coding-giants': { initials: 'CG', tint: '#1b7d52' },
  juanita: { initials: 'J', tint: '#c2451f' },
  'icy-beak': { initials: 'IB', tint: '#1d6f8f' },
};

/**
 * Devuelve el <svg> de una skill como cadena de HTML.
 * El SVG es decorativo: el nombre de la skill ya va en texto al lado, así que
 * se oculta a los lectores de pantalla para no leerlo dos veces.
 */
function iconoDeSkill(nombreSkill) {
  const clave = SKILL_ICON_MAP[nombreSkill.toLowerCase().trim()] || 'default';
  const trazos = SKILL_ICONS[clave] || SKILL_ICONS.default;

  return (
    '<svg class="skill-icon" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    trazos +
    '</svg>'
  );
}

/**
 * Monograma de la empresa. Devuelve null si no hay ninguno definido, para que
 * quien lo llame decida si dibuja un hueco o se lo salta.
 */
function logoDeEmpresa(clave) {
  const marca = COMPANY_LOGOS[clave];
  if (!marca) return null;

  const elemento = document.createElement('div');
  elemento.className = 'company-logo';
  elemento.style.setProperty('--tinte-marca', marca.tint);
  elemento.setAttribute('aria-hidden', 'true');
  elemento.textContent = marca.initials;

  return elemento;
}
