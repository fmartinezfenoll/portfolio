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
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// ============================================
// RENDER EXPERIENCE SECTION
// ============================================
function renderExperience() {
  const experienceSection = document.getElementById('experience');
  if (!experienceSection) return;

  const aboutContainers = experienceSection.querySelector('.about-containers');
  if (!aboutContainers) return;

  aboutContainers.innerHTML = '';

  experienceData.forEach(experience => {
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'details-container';

    const title = document.createElement('h2');
    title.className = 'experience-sub-title';
    title.textContent = experience.title;
    detailsContainer.appendChild(title);

    const company = document.createElement('h3');
    company.className = 'company';
    company.textContent = experience.company;
    detailsContainer.appendChild(company);

    if (experience.description) {
      const desc = document.createElement('p');
      desc.className = 'experience-description';
      desc.textContent = experience.description;
      detailsContainer.appendChild(desc);
    }

    const articleContainer = document.createElement('div');
    articleContainer.className = 'article-container';
    articleContainer.style.justifyContent = 'center';

    experience.skills.forEach(skill => {
      const article = document.createElement('article');
      article.style.justifyContent = 'flex-start';
      article.style.width = '10rem';
      
      const img = document.createElement('img');
      img.src = 'assets/checkmark.png';
      img.alt = 'Experience icon';
      img.className = 'icon';

      const div = document.createElement('div');
      const skillName = document.createElement('h3');
      skillName.textContent = skill;
      div.appendChild(skillName);

      article.appendChild(img);
      article.appendChild(div);
      articleContainer.appendChild(article);
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

  projectsArray.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'details-container color-container';
    projectCard.style.cursor = 'pointer';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'article-container';

    const img = document.createElement('img');
    img.src = project.imgSrc;
    img.alt = project.imgAlt;
    img.className = 'project-img';

    imgContainer.appendChild(img);

    const title = document.createElement('h2');
    title.className = 'experience-sub-title project-title';
    title.textContent = project.title;

    if (project.tags && project.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.style.display = 'flex';
      tagsContainer.style.flexWrap = 'wrap';
      tagsContainer.style.gap = '0.5rem';
      tagsContainer.style.justifyContent = 'center';
      tagsContainer.style.marginBottom = '1rem';

      project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tag;
        tagElement.style.padding = '0.3rem 0.8rem';
        tagElement.style.backgroundColor = '#f0f0f0';
        tagElement.style.border = '1px solid rgb(163, 163, 163)';
        tagElement.style.borderRadius = '1rem';
        tagElement.style.fontSize = '0.9rem';
        tagElement.style.color = 'rgb(85, 85, 85)';
        tagElement.style.fontWeight = '500';
        tagsContainer.appendChild(tagElement);
      });

      projectCard.appendChild(imgContainer);
      projectCard.appendChild(title);
      projectCard.appendChild(tagsContainer);
    } else {
      projectCard.appendChild(imgContainer);
      projectCard.appendChild(title);
    }

    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';

    const btn = document.createElement('button');
    btn.className = 'btn btn-color-2 project-btn';
    btn.textContent = 'Official Page';
    btn.onclick = (e) => {
      e.stopPropagation();
      location.href = project.liveDemoLink;
    };

    btnContainer.appendChild(btn);
    projectCard.appendChild(btnContainer);

    // Add click handler with category prefix
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
    const titleElement = document.querySelector(".title");
    const imgElement = document.querySelector(".project-img");
    const descriptionElement = document.querySelector(".article-description");
    const liveDemoButton = document.querySelector(".btn");

    if (titleElement) titleElement.textContent = project.title;
    if (imgElement) {
      imgElement.src = project.imgSrc;
      imgElement.alt = project.imgAlt;
    }
    if (descriptionElement) descriptionElement.textContent = project.description;
    if (liveDemoButton) {
      liveDemoButton.setAttribute("onclick", `location.href='${project.liveDemoLink}'`);
    }

    const tagsContainer = document.querySelector(".project-tags");
    if (tagsContainer && project.tags) {
      tagsContainer.innerHTML = '';
      tagsContainer.style.display = 'flex';
      tagsContainer.style.flexWrap = 'wrap';
      tagsContainer.style.gap = '0.5rem';
      tagsContainer.style.justifyContent = 'center';
      tagsContainer.style.marginTop = '1rem';
      
      project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tag;
        tagElement.style.padding = '0.3rem 0.8rem';
        tagElement.style.backgroundColor = '#f0f0f0';
        tagElement.style.border = '1px solid rgb(163, 163, 163)';
        tagElement.style.borderRadius = '1rem';
        tagElement.style.fontSize = '0.9rem';
        tagElement.style.color = 'rgb(85, 85, 85)';
        tagElement.style.fontWeight = '500';
        tagsContainer.appendChild(tagElement);
      });
    }
  } else {
    const articleSection = document.getElementById("article");
    if (articleSection) {
      articleSection.innerHTML = "<p>Project not found. Please provide a valid category and ID in the URL.</p>";
    }
  }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('experience')) {
    renderExperience();
  }

  if (document.getElementById('game-proyects')) {
    renderGameProjects();
  }

  if (document.getElementById('web-proyects')) {
    renderWebProjects();
  }

  if (document.getElementById('article')) {
    renderProjectDetail();
  }
});