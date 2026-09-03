// ============================================
// EXPERIENCE DATA
// ============================================
const experienceData = [
  {
    title: {
      en: "Unity Developer | Netcode & Game Design Specialist",
      es: "Desarrollador Unity | Especialista en Netcode y Diseño de Juegos"
    },
    company: "GGTech Entertainment",
    description: {
      en: "Developed multiplayer gameplay systems and optimized network features using Unity Netcode. Contributed to gameplay design, prototyping, and technical documentation.",
      es: "Desarrollé sistemas multijugador y optimicé funcionalidades de red usando Unity Netcode. Contribuí al diseño de gameplay, prototipado y documentación técnica."
    },
    skills: ["Unity", "Netcode", "Design", "Git / Asana", "QA / TDD"]
  },
  {
    title: {
      en: "Programming Instructor",
      es: "Profesor de Programación"
    },
    company: "Coding Giants",
    description: {
      en: "Taught programming and game development to students of different ages, focusing on creativity, logic, and teamwork through Unity, C#, and Scratch-based projects.",
      es: "Enseñé programación y desarrollo de videojuegos a estudiantes de distintas edades, fomentando la creatividad, la lógica y el trabajo en equipo mediante proyectos con Unity, C# y Scratch."
    },
    skills: ["Unity", "C#", "Scratch", "Design", "Teaching"]
  },
  {
    title: {
      en: "Web Developer",
      es: "Desarrollador Web"
    },
    company: "Juanita.es",
    description: {
      en: "Designed and implemented responsive interfaces using modern web technologies. Collaborated with backend developers to deliver smooth and accessible user experiences.",
      es: "Diseñé e implementé interfaces responsivas utilizando tecnologías web modernas. Colaboré con desarrolladores backend para ofrecer experiencias de usuario fluidas y accesibles."
    },
    skills: ["HTML", "CSS", "JavaScript", "Web Design", "eCommerce", "Prestashop"]
  },  
  {
    title: {
      en: "Graphic Software Engineer",
      es: "Ingeniero de Software Gráfico"
    },
    company: "Icy Beak Studios",
    description: {
      en: "Worked on the technical side of game development with a focus on rendering, engine architecture, and tools. Built graphics pipelines in OpenGL and supported art and design teams through custom tech solutions.",
      es: "Trabajé en el apartado técnico del desarrollo de videojuegos, centrado en renderizado, arquitectura de motor y herramientas. Construí pipelines gráficos en OpenGL y apoyé a los equipos de arte y diseño con soluciones técnicas personalizadas."
    },
    skills: ["OpenGL", "Unreal", "Unity", "Tech Art", "Git / Asana"]
  }
];


// ============================================
// PROJECT DATA
// ============================================
const gameProjectData  = [
  {
    title: {
      en: "Crimanimals (Steam Release)",
      es: "Crimanimals (Lanzamiento en Steam)"
    },
    imgSrc: "assets/crimanimals.png",
    imgAlt: "Crimanimals",
    description: {
      en: "Step into the fur of these rookie thieves on a mission to pull off the ultimate heist: steal the Golden Can of Tuna! Crimanimals is a roguelike escape adventure filled with traps, puzzles, and physics-driven chaos. As you explore the luxurious but treacherous casino rooms, any object can become a threat: solve the puzzles and move forward, or fail and start all over again. No progress, no mercy… just laughs, gadgets, and the sweet taste of glorious tuna at the end. Choose your criminal animal, experiment with interactive physics puzzles, and enjoy both solo and cooperative modes. Every failed attempt resets the heist but brings new chaos and laughs. Will you outsmart the casino and claim the Golden Can of Tuna?",
      es: "Ponte en la piel de estos ladrones novatos en una misión para llevar a cabo el golpe definitivo: robar la Lata Dorada de Atún. Crimanimals es una aventura roguelike de escape llena de trampas, puzzles y caos basado en físicas. Mientras exploras las lujosas pero peligrosas salas del casino, cualquier objeto puede convertirse en una amenaza: resuelve los acertijos y avanza, o falla y empieza de nuevo. Sin progreso, sin piedad… solo risas, gadgets y el dulce sabor del atún al final. Elige tu animal criminal, experimenta con puzzles interactivos y disfruta tanto en solitario como en cooperativo. Cada intento fallido reinicia el golpe, pero añade más caos y diversión. ¿Lograrás superar al casino y conseguir la Lata Dorada de Atún?"
    },
    liveDemoLink: "https://store.steampowered.com/app/4004930/Crimanimals/",
    tags: ["Unity", "Multiplayer Online", "Puzzle", "Roguelike", "Steam", "QA"]
  },
  {
    title: {
      en: "Bubble Buddies (1st Prize - Global Game Jam 2025)",
      es: "Bubble Buddies (1er Premio - Global Game Jam 2025)"
    },
    imgSrc: "assets/bubble buddies.png",
    imgAlt: "Bubble buddies",
    description: {
      en: "Created with my team Icy Beak Studios during Global Game Jam 2025 (MultitecUA), where we won 1st prize. We developed a full game in just 48 hours featuring microphone-based movement and dynamic music tied to gameplay. Includes playful bubble physics and a metaphor for social bubbles. All assets were created by the team.",
      es: "Creado junto a mi equipo Icy Beak Studios durante la Global Game Jam 2025 (MultitecUA), donde ganamos el 1er premio. Desarrollamos un videojuego completo en solo 48 horas con movimiento basado en micrófono y música dinámica ligada al gameplay. Incluye físicas de burbujas y una metáfora sobre las burbujas sociales. Todos los assets fueron creados por el equipo."
    },
    liveDemoLink: "https://jsala.itch.io/bubblebuddies",
    tags: ["Unity", "C#", "Game Design", "Game Jam"]
  },
  {
    title: {
      en: "Donut Panic!",
      es: "Donut Panic!"
    },
    imgSrc: "assets/donut panic.png",
    imgAlt: "Donut Panic!",
    description: {
      en: "Game developed from scratch in C++ using OpenGL, AI with behavior trees, and ECS architecture. Created with my team Icy Beak Studios. Donut Panic! is a run-and-gun shooter with a retro 90s aesthetic and absurd humor. The objective is to rescue donuts instead of just eliminating enemies. Players fight through first-person levels saving donuts before they are eaten. If all donuts are lost, the level fails. Story: Aliens have invaded Earth and are stealing all donuts. The hero, Donutello Crema (Donut Guy), sets out to recover them in this action-packed adventure.",
      es: "Juego desarrollado desde cero en C++ con OpenGL, IA mediante árboles de comportamiento y arquitectura ECS. Creado junto a mi equipo Icy Beak Studios. Donut Panic! es un shooter run-and-gun con estética retro de los 90 y humor absurdo. El objetivo es rescatar donuts en lugar de solo eliminar enemigos. El jugador avanza en niveles en primera persona salvando donuts antes de que sean devorados. Si se pierden todos, se falla el nivel. Historia: los aliens han invadido la Tierra y están robando todos los donuts. El héroe, Donutello Crema (Donut Guy), luchará por recuperarlos."
    },
    liveDemoLink: "https://eps.ua.es/es/ingenieria-multimedia/videojuegos/webs-grupos/curso-2024-25/grupo-icy-beak-studios-videojuego-donut-panic.html",
    tags: ["C++", "OpenGL", "AI", "ECS"]
  },
  {
    title: {
      en: "Assembly Armada",
      es: "Assembly Armada"
    },
    imgSrc: "assets/assembly armada.png",
    imgAlt: "Assembly Armada",
    description: {
      en: "A space shooter developed in assembly for the Game Boy during GB Retro Dev Game Jam 2024. Built completely from scratch, this project demonstrates low-level programming skills and working within real hardware limitations. Fight enemies and relive classic 8-bit gameplay.",
      es: "Shooter espacial desarrollado en lenguaje ensamblador para Game Boy durante la GB Retro Dev Game Jam 2024. Creado completamente desde cero, demuestra habilidades de programación a bajo nivel y trabajo con limitaciones reales de hardware. Lucha contra enemigos y revive la experiencia clásica de los 8 bits."
    },
    liveDemoLink: "https://itch.io/jam/gbretrodev24/rate/3055980",
    tags: ["Assembly", "Game Boy", "Retro", "Game Jam"]
  }
];

// ============================================
// WEB PROJECTS
// ============================================
const webProjectData = [
  {
    title: {
      en: "Web Developer - Juanita.es",
      es: "Desarrollador Web - Juanita.es"
    },
    imgSrc: "assets/juanita.png",
    imgAlt: "Juanita workwear e-commerce website",
    description: {
      en: "Designed and developed a responsive e-commerce website for a workwear clothing store (Juanita.es). Built modern, accessible user interfaces and collaborated with backend developers to ensure a smooth shopping experience across devices.",
      es: "Diseñé y desarrollé una web e-commerce responsive para una tienda de ropa laboral (Juanita.es). Construí interfaces modernas y accesibles y colaboré con backend para garantizar una experiencia fluida en todos los dispositivos."
    },
    liveDemoLink: "https://juanita.es",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "E-commerce", "Frontend", "UX/UI"]
  },
  {
    title: {
      en: "Portfolio Website",
      es: "Portfolio Web"
    },
    imgSrc: "assets/web-project-1.png",
    imgAlt: "Portfolio Website",
    description: {
      en: "A modern and responsive portfolio website built with HTML, CSS, and JavaScript. Features smooth animations, a responsive design, and dynamic content loading.",
      es: "Portfolio moderno y responsive desarrollado con HTML, CSS y JavaScript. Incluye animaciones suaves, diseño adaptable y carga dinámica de contenido."
    },
    liveDemoLink: "#",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"]
  },
  {
    title: {
      en: "Multiplayer Online Pong",
      es: "Pong Multijugador Online"
    },
    imgSrc: "assets/project-1.png",
    imgAlt: "Multiplayer online pong",
    description: {
      en: "A multiplayer online Pong game built with HTML, CSS, and JavaScript.",
      es: "Videojuego tipo Pong multijugador online desarrollado con HTML, CSS y JavaScript."
    },
    liveDemoLink: "https://docs.google.com/document/d/1n7xl82x_yLRNmv_p4AzOzH6f-xm9OidEkv-_yU-kQ-8/edit?usp=sharing",
    tags: ["HTML", "CSS", "JavaScript", "Multiplayer Online"]
  },
  {
    title: {
      en: "ToDo App (MEAN Stack)",
      es: "App de Tareas (MEAN Stack)"
    },
    imgSrc: "assets/todo-app.png",
    imgAlt: "ToDo App Angular MEAN",
    description: {
      en: "Task management web application built with Angular 17 and a RESTful API using the MEAN stack (MongoDB, Express, Angular, Node.js). Supports full CRUD operations and real-time updates during development.",
      es: "Aplicación web de gestión de tareas desarrollada con Angular 17 y una API REST usando el stack MEAN (MongoDB, Express, Angular, Node.js). Soporta operaciones CRUD completas y actualizaciones en tiempo real durante el desarrollo."
    },
    liveDemoLink: "https://docs.google.com/document/d/1jVhGG4lFFmRiKjp4BEh_vbC1nMDNklpaD5OUzEvCcps/edit?usp=sharing",
    tags: ["Angular", "MongoDB", "Express", "Node.js", "MEAN", "CRUD", "REST API"]
  },
  {
    title: {
      en: "WS Auth (Node.js + JWT + Bcrypt)",
      es: "Servicio Auth (Node.js + JWT + Bcrypt)"
    },
    imgSrc: "assets/ws-auth.png",
    imgAlt: "Web Service Authentication Node JWT",
    description: {
      en: "Authentication web service built with Node.js implementing secure password hashing with bcrypt and token-based authentication using JWT. Includes helpers for password encryption/comparison and token creation/validation with expiration handling, along with testing scripts.",
      es: "Servicio de autenticación desarrollado con Node.js que implementa hash seguro de contraseñas con bcrypt y autenticación basada en tokens JWT. Incluye utilidades para cifrado/comparación de contraseñas y gestión de tokens con expiración, junto con scripts de prueba."
    },
    liveDemoLink: "https://docs.google.com/document/d/1ugzvSc7HAbHavE2CEQ2uVf1uGzSm2ffzLW6g4FkLLPk/edit?usp=sharing",
    tags: ["Node.js", "JWT", "Bcrypt", "Authentication", "REST API", "Security", "MEAN"]
  }
];

// Mantener compatibilidad con código existente
const projectData = [...gameProjectData, ...webProjectData];