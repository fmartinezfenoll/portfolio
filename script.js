// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
// ============================================
// IDIOMA
// ============================================
function downloadCV() {
  const lang = localStorage.getItem("lang") || "en";
  const file = `assets/Francisco-Martinez-Fenoll-CV${lang === "es" ? "-ESP" : ""}.pdf`;
  window.open(file);
}
function detectUserLanguage() {
  const browserLang = navigator.language || navigator.languages[0];

  if (browserLang.startsWith("es")) {
    return "es";
  } else {
    return "en";
  }
}
function toggleLanguage() {
  const currentLang = localStorage.getItem("lang") || "en";
  const newLang = currentLang === "en" ? "es" : "en";

  setLanguage(newLang);
  updateLangToggle(newLang);
}

function updateLangToggle(lang) {
  const toggles = document.querySelectorAll(".lang-toggle");

  toggles.forEach(toggle => {
    if (lang === "en") {
      toggle.textContent = "ESPAÑOL";
    } else {
      toggle.textContent = "ENGLISH";
    }
  });
}
function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.getAttribute("data-i18n").split(".");
    let value = translations[lang];

    keys.forEach(k => value = value[k]);

    if (value) el.innerHTML = value;
  });

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  // re-render dinámico
  renderExperience();
  renderGameProjects();
  renderWebProjects();

  // El re-render sustituye las tarjetas por nodos nuevos, así que las
  // animaciones que apuntaban a las anteriores hay que rehacerlas.
  if (typeof construirAnimaciones === "function") construirAnimaciones();
}


// ============================================
// SCROLL ANIMATIONS (GSAP + ScrollTrigger)
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Todo el movimiento se declara dentro de matchMedia: cuando el usuario pide
// prefers-reduced-motion, GSAP revierte solo lo que se creó en esa rama, así
// que basta con dejar el contenido visible sin animarlo.
const mm = gsap.matchMedia();

// Las tarjetas de proyecto se repintan al cambiar de idioma, así que las
// animaciones se crean después de cada render y hay que poder rehacerlas.
let animacionesContenido = [];

function limpiarAnimacionesContenido() {
  animacionesContenido.forEach((a) => a.kill());
  animacionesContenido = [];
}

// Entrada de las secciones. Se usa autoAlpha en vez de opacity para que un
// elemento a 0 no siga capturando clics.
function animarSecciones(conMovimiento) {
  const secciones = gsap.utils.toArray('.hidden');

  if (!conMovimiento) {
    gsap.set(secciones, { autoAlpha: 1, x: 0 });
    return;
  }

  secciones.forEach((seccion) => {
    animacionesContenido.push(
      gsap.fromTo(
        seccion,
        { autoAlpha: 0, x: -60 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: seccion, start: 'top 85%', once: true },
        }
      )
    );
  });
}

// Las tarjetas entran en tandas: ScrollTrigger.batch agrupa las que aparecen
// juntas y las anima con un stagger, en lugar de una animación por tarjeta.
function animarTarjetas(conMovimiento) {
  const tarjetas = gsap.utils.toArray(
    '#web-proyects .details-container, #game-proyects .details-container, #experience .details-container'
  );
  if (!tarjetas.length) return;

  if (!conMovimiento) {
    gsap.set(tarjetas, { autoAlpha: 1, y: 0 });
    return;
  }

  gsap.set(tarjetas, { autoAlpha: 0, y: 48 });

  const lotes = ScrollTrigger.batch(tarjetas, {
    start: 'top 88%',
    once: true,
    batchMax: 3,
    interval: 0.12,
    onEnter: (grupo) =>
      gsap.to(grupo, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        overwrite: true,
      }),
  });

  animacionesContenido.push(...lotes);
}

// Parallax suave de las capturas de proyecto: se mueven algo menos que el
// scroll, así que la tarjeta gana profundidad.
function animarParallax(conMovimiento) {
  const imagenes = gsap.utils.toArray('.project-img');
  if (!imagenes.length) return;

  if (!conMovimiento) {
    gsap.set(imagenes, { y: 0, scale: 1 });
    return;
  }

  imagenes.forEach((img) => {
    animacionesContenido.push(
      gsap.fromTo(
        img,
        { y: 26 },
        {
          y: -26,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.details-container') || img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    );
  });
}

// Hover de las tarjetas: se elevan y la captura hace un zoom más lento que el
// movimiento de la tarjeta, para que el conjunto no se sienta rígido.
function activarHoverTarjetas(conMovimiento) {
  if (!conMovimiento) return;

  gsap.utils
    .toArray('#web-proyects .details-container, #game-proyects .details-container')
    .forEach((tarjeta) => {
      const img = tarjeta.querySelector('.project-img');
      const titulo = tarjeta.querySelector('.project-title');

      // Una sola timeline pausada por tarjeta, en lugar de crear tweens en cada
      // mouseenter: al invertirla, la salida deshace exactamente la entrada.
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

      tl.to(tarjeta, { y: -8, duration: 0.4 }, 0);
      if (img) tl.to(img, { scale: 1.06, duration: 0.65, ease: 'power2.out' }, 0);
      if (titulo) tl.to(titulo, { x: 4, duration: 0.4 }, 0);

      tarjeta.addEventListener('mouseenter', () => tl.play());
      tarjeta.addEventListener('mouseleave', () => tl.reverse());
      // El foco por teclado recibe el mismo tratamiento que el ratón.
      tarjeta.addEventListener('focusin', () => tl.play());
      tarjeta.addEventListener('focusout', () => tl.reverse());
    });
}

// Los iconos sociales y la flecha los animó antes GSAP en la entrada, así que
// su transform inline gana sobre cualquier :hover del CSS. Se animan aquí.
function activarHoverIconos(conMovimiento) {
  if (!conMovimiento) return;

  gsap.utils.toArray('#socials-container .icon').forEach((icono) => {
    const tl = gsap
      .timeline({ paused: true })
      .to(icono, { y: -5, scale: 1.12, duration: 0.35, ease: 'back.out(2.5)' });

    icono.addEventListener('mouseenter', () => tl.play());
    icono.addEventListener('mouseleave', () => tl.reverse());
  });
}

// Iconos de "Sobre mí" y "Experiencia": entran con un pequeño rebote cuando la
// tarjeta aparece, en lugar de aparecer de golpe con el resto del bloque.
function animarIconos(conMovimiento) {
  const iconos = gsap.utils.toArray('#about .details-container .icon');
  if (!iconos.length) return;

  if (!conMovimiento) {
    gsap.set(iconos, { autoAlpha: 1, scale: 1 });
    return;
  }

  animacionesContenido.push(
    gsap.fromTo(
      iconos,
      { autoAlpha: 0, scale: 0.5 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '#about', start: 'top 78%', once: true },
      }
    )
  );
}

// Experiencia: el monograma entra con un rebote y los chips de skills en
// cascada, para que la tarjeta se lea por partes en lugar de aparecer entera.
function animarExperiencia(conMovimiento) {
  const tarjetas = gsap.utils.toArray('#experience .experience-card');
  if (!tarjetas.length) return;

  if (!conMovimiento) {
    gsap.set('#experience .company-logo, #experience .skill-chip', {
      autoAlpha: 1,
      scale: 1,
      y: 0,
    });
    return;
  }

  tarjetas.forEach((tarjeta) => {
    const logo = tarjeta.querySelector('.company-logo');
    const chips = tarjeta.querySelectorAll('.skill-chip');

    const tl = gsap.timeline({
      scrollTrigger: { trigger: tarjeta, start: 'top 82%', once: true },
      // El hover se engancha al acabar la entrada: si se enganchara antes, su
      // timeline partiría del estado inicial (logo a scale 0.4) en vez del
      // final, y al invertirla el monograma se encogería.
      onComplete: () => activarHoverExperiencia(tarjeta),
    });

    if (logo) {
      tl.fromTo(
        logo,
        { autoAlpha: 0, scale: 0.4, rotate: -25 },
        { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(2.2)' }
      );
    }

    if (chips.length) {
      tl.fromTo(
        chips,
        { autoAlpha: 0, y: 12, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          // Sin clearProps el scale inline se queda puesto y pelea con el
          // transform del hover.
          clearProps: 'scale',
        },
        logo ? '-=0.3' : 0
      );
    }

    animacionesContenido.push(tl);
  });
}

// Hover de una tarjeta de experiencia. Va en GSAP y no en CSS porque la
// animación de entrada deja un transform inline en la tarjeta y en el
// monograma, y ese inline gana sobre cualquier :hover de la hoja de estilos.
function activarHoverExperiencia(tarjeta) {
  const logo = tarjeta.querySelector('.company-logo');

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
  tl.to(tarjeta, { y: -4, duration: 0.35 }, 0);
  if (logo) {
    tl.to(logo, { scale: 1.06, rotate: -3, duration: 0.4 }, 0);
  }

  tarjeta.addEventListener('mouseenter', () => tl.play());
  tarjeta.addEventListener('mouseleave', () => tl.reverse());
  tarjeta.addEventListener('focusin', () => tl.play());
  tarjeta.addEventListener('focusout', () => tl.reverse());

  animacionesContenido.push(tl);
}

// Entrada de la cabecera al cargar: retrato, textos y botones escalonados.
function animarPortada(conMovimiento) {
  // project.html no tiene portada.
  if (!conMovimiento || !document.getElementById('profile')) return;

  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .fromTo('#profile .section__pic-container',
      { autoAlpha: 0, scale: 0.9 },
      { autoAlpha: 1, scale: 1, duration: 0.9 })
    .fromTo('#profile .section__text__p1',
      { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.55')
    .fromTo('#profile .title',
      { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.35')
    .fromTo('#profile .section__text__p2',
      { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.45')
    .fromTo('#profile .btn',
      { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 }, '-=0.3')
    .fromTo('#socials-container .icon',
      { autoAlpha: 0, y: 12 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.07,
        // El hover se engancha al acabar la entrada, para que su timeline
        // parta del estado final y no del que dejó la animación de entrada.
        onComplete: () => activarHoverIconos(true),
      },
      '-=0.25');
}

// Se llama al arrancar y cada vez que se repintan los proyectos.
function construirAnimaciones() {
  limpiarAnimacionesContenido();

  mm.add(
    { conMovimiento: '(prefers-reduced-motion: no-preference)' },
    (contexto) => {
      const { conMovimiento } = contexto.conditions;

      animarSecciones(conMovimiento);
      animarTarjetas(conMovimiento);
      animarParallax(conMovimiento);
      animarIconos(conMovimiento);
      animarExperiencia(conMovimiento);
      activarHoverTarjetas(conMovimiento);
    }
  );

  // Las capturas de proyecto cambian la altura de la página al cargarse, así
  // que hay que recalcular las posiciones de los triggers.
  ScrollTrigger.refresh();
}

// ============================================
// RENDER EXPERIENCE SECTION
// ============================================
function renderExperience() {
  const experienceSection = document.getElementById('experience');
  if (!experienceSection) return;

  const aboutContainers = experienceSection.querySelector('.about-containers');
  if (!aboutContainers) return;

  aboutContainers.innerHTML = '';

  const lang = localStorage.getItem("lang") || "en";

  experienceData.forEach(experience => {
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'details-container experience-card';
    if (experience.current) detailsContainer.classList.add('is-current');

    // CABECERA: monograma de la empresa junto al puesto y las fechas, para que
    // de un vistazo se distinga dónde y cuándo antes de leer la descripción.
    const header = document.createElement('div');
    header.className = 'experience-header';

    const logo = typeof logoDeEmpresa === 'function' ? logoDeEmpresa(experience.logo) : null;
    if (logo) header.appendChild(logo);

    const headerText = document.createElement('div');
    headerText.className = 'experience-heading';

    const title = document.createElement('h2');
    title.className = 'experience-sub-title';
    title.textContent = experience.title[lang];
    headerText.appendChild(title);

    const meta = document.createElement('div');
    meta.className = 'experience-meta';

    const company = document.createElement('span');
    company.className = 'company';
    company.textContent = experience.company;
    meta.appendChild(company);

    if (experience.period) {
      const period = document.createElement('span');
      period.className = 'experience-period';
      period.textContent = experience.period[lang];
      // El punto del puesto actual va dentro del periodo, donde se lee la fecha.
      if (experience.current) period.classList.add('is-current');
      meta.appendChild(period);
    }

    headerText.appendChild(meta);
    header.appendChild(headerText);
    detailsContainer.appendChild(header);

    // DESCRIPTION
    if (experience.description) {
      const desc = document.createElement('p');
      desc.className = 'experience-description';
      desc.textContent = experience.description[lang];
      detailsContainer.appendChild(desc);
    }

    // SKILLS: cada una con su propio icono (estilos en .skill-list).
    const articleContainer = document.createElement('div');
    articleContainer.className = 'skill-list';

    experience.skills.forEach(skill => {
      const chip = document.createElement('span');
      chip.className = 'skill-chip';
      // iconoDeSkill devuelve SVG construido por nosotros a partir de una tabla
      // fija, no de datos externos, así que no hay entrada de usuario aquí.
      chip.innerHTML =
        typeof iconoDeSkill === 'function' ? iconoDeSkill(skill) : '';
      chip.appendChild(document.createTextNode(skill));
      articleContainer.appendChild(chip);
    });

    detailsContainer.appendChild(articleContainer);
    aboutContainers.appendChild(detailsContainer);
  });
}

// ============================================
// RENDER PROJECTS (GENERIC FUNCTION)
// ============================================
function renderProjectsToContainer(projectsArray, containerId, categoryPrefix) {
  const projectsContainer = document.getElementById(containerId);
  if (!projectsContainer) return;

  projectsContainer.innerHTML = '';

  const lang = localStorage.getItem("lang") || "en";

  projectsArray.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'details-container color-container';
    projectCard.style.cursor = 'pointer';

    // IMAGE
    const imgContainer = document.createElement('div');
    imgContainer.className = 'article-container';

    const img = document.createElement('img');
    img.src = project.imgSrc;
    img.alt = project.imgAlt;
    img.className = 'project-img';

    imgContainer.appendChild(img);

    // TITLE
    const title = document.createElement('h2');
    title.className = 'experience-sub-title project-title';
    title.textContent = project.title[lang];

    // DESCRIPTION (opcional)
    const desc = document.createElement('p');
    desc.className = 'project-description';
    desc.textContent = project.description[lang];

    // TAGS (estilos en .tag-list / .tag, en style.css)
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tag-list';

    if (project.tags && project.tags.length > 0) {
      project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
      });
    }

    // BUTTON
    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';

    const btn = document.createElement('button');
    btn.className = 'btn btn-color-2 project-btn';
    btn.textContent = lang === "en" ? "Official Page" : "Página Oficial";
    btn.onclick = (e) => {
      e.stopPropagation();
      location.href = project.liveDemoLink;
    };

    btnContainer.appendChild(btn);

    // BUILD CARD
    projectCard.appendChild(imgContainer);
    projectCard.appendChild(title);
    projectCard.appendChild(desc);
    projectCard.appendChild(tagsContainer);
    projectCard.appendChild(btnContainer);

    // CLICK CARD
    projectCard.onclick = () => {
      window.location.href = `project.html?category=${categoryPrefix}&id=${index}`;
    };

    projectsContainer.appendChild(projectCard);
  });
}

// ============================================
// RENDER GAME PROJECTS
// ============================================
function renderGameProjects() {
  renderProjectsToContainer(gameProjectData, 'game-proyects', 'game');
}

// ============================================
// RENDER WEB PROJECTS
// ============================================
function renderWebProjects() {
  renderProjectsToContainer(webProjectData, 'web-proyects', 'web');
}

// ============================================
// RENDER PROJECT DETAIL PAGE
// ============================================
function renderProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const projectId = parseInt(urlParams.get("id"), 10);

  let project = null;
  
  // Determine which array to use based on category
  if (category === 'game' && !isNaN(projectId) && projectId >= 0 && projectId < gameProjectData.length) {
    project = gameProjectData[projectId];
  } else if (category === 'web' && !isNaN(projectId) && projectId >= 0 && projectId < webProjectData.length) {
    project = webProjectData[projectId];
  }

if (project) {

  const lang = localStorage.getItem("lang") || "en";

  const titleElement = document.querySelector(".title");
  const imgElement = document.querySelector(".project-img");
  const descriptionElement = document.querySelector(".article-description");
  const liveDemoButton = document.querySelector(".btn");

  if (titleElement) {
    titleElement.textContent = project.title[lang];
  }

  if (imgElement) {
    imgElement.src = project.imgSrc;
    imgElement.alt = project.imgAlt;
  }

  if (descriptionElement) {
    descriptionElement.textContent = project.description[lang];
  }

  if (liveDemoButton) {
    liveDemoButton.setAttribute(
      "onclick",
      `location.href='${project.liveDemoLink}'`
    );
  }
}
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // setLanguage() ya repinta experiencia y proyectos, y al terminar llama a
  // construirAnimaciones(), así que este es el único punto de entrada.
  const idioma = localStorage.getItem("lang") || detectUserLanguage();
  setLanguage(idioma);
  updateLangToggle(idioma);

  if (document.getElementById('article')) {
    renderProjectDetail();
  }

  animarPortada(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Las capturas cambian la altura de la página al terminar de cargarse.
  window.addEventListener('load', () => ScrollTrigger.refresh());
});