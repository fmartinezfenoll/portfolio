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

  // Clear existing content
  aboutContainers.innerHTML = '';

  // Generate HTML for each experience
  experienceData.forEach(experience => {
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'details-container';

    // ✅ Create title (on top)
    const title = document.createElement('h2');
    title.className = 'experience-sub-title';
    title.textContent = experience.title;
    detailsContainer.appendChild(title);

    // ✅ Create company (below title)
    const company = document.createElement('h3');
    company.className = 'company';
    company.textContent = experience.company;
    detailsContainer.appendChild(company);

    // ✅ Description (optional)
    if (experience.description) {
      const desc = document.createElement('p');
      desc.className = 'experience-description';
      desc.textContent = experience.description;
      detailsContainer.appendChild(desc);
    }

    // ✅ Create skills container
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

    // ✅ Append skills at the end
    detailsContainer.appendChild(articleContainer);

    // ✅ Add full card to the page
    aboutContainers.appendChild(detailsContainer);
  });
}


// ============================================
// RENDER PROJECTS SECTION
// ============================================
function renderProjects() {
  const projectsContainer = document.getElementById('proyects');
  if (!projectsContainer) return;

  // Clear existing content
  projectsContainer.innerHTML = '';

  // Generate HTML for each project
  projectData.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'details-container color-container';
    projectCard.style.cursor = 'pointer';

    // Project image container
    const imgContainer = document.createElement('div');
    imgContainer.className = 'article-container';

    const img = document.createElement('img');
    img.src = project.imgSrc;
    img.alt = project.imgAlt;
    img.className = 'project-img';

    imgContainer.appendChild(img);

    // Project title
    const title = document.createElement('h2');
    title.className = 'experience-sub-title project-title';
    title.textContent = project.title;

    // Tags container (if project has tags)
    if (project.tags && project.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.style.display = 'flex';
      tagsContainer.style.flexWrap = 'wrap';
      tagsContainer.style.gap = '0.5rem';
      tagsContainer.style.justifyContent = 'center';
      tagsContainer.style.marginBottom = '1rem';

      // Create tag elements
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

    // Buttons container
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

    // Add click handler to entire card
    projectCard.onclick = () => {
      window.location.href = `project.html?id=${index}`;
    };

    projectsContainer.appendChild(projectCard);
  });
}

// ============================================
// RENDER PROJECT DETAIL PAGE
// ============================================
function renderProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = parseInt(urlParams.get("id"), 10);

  if (!isNaN(projectId) && projectId >= 0 && projectId < projectData.length) {
    const project = projectData[projectId];

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

    // Add tags to detail page if there's a container for them
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
      articleSection.innerHTML = "<p>Project not found. Please provide a valid ID in the URL.</p>";
    }
  }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Render experience section if it exists
  if (document.getElementById('experience')) {
    renderExperience();
  }

  // Render projects section if it exists
  if (document.getElementById('proyects')) {
    renderProjects();
  }

  // Render project detail page if it exists
  if (document.getElementById('article')) {
    renderProjectDetail();
  }
});