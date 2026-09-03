function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
const observer = new IntersectionObserver((entries) =>{
  entries.forEach((entry)=>{
    if (entry.isIntersecting){
      entry.target.classList.add('show');
    }
    else{
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// load projects
document.addEventListener("DOMContentLoaded", () => {
  // Select the parent container where all projects will be added
  const parentContainer = document.getElementById("proyects");

  // Loop through projectData and dynamically create elements for each project
  projectData.forEach((project, index) => {
    // Create the main container for the project
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("details-container", "color-container");

    // Create article container with an image
    const articleContainer = document.createElement("div");
    articleContainer.classList.add("article-container");

    const imgElement = document.createElement("img");
    imgElement.src = project.imgSrc;
    imgElement.alt = project.imgAlt;
    imgElement.classList.add("project-img");
    articleContainer.appendChild(imgElement);

    // Create project title
    const titleElement = document.createElement("h2");
    titleElement.textContent = project.title;
    titleElement.classList.add("experience-sub-title", "project-title");

    // Create button container with a button
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    const btnElement = document.createElement("button");
    btnElement.classList.add("btn", "btn-color-2", "project-btn");
    btnElement.textContent = "Official Page";
    
    // Add the onclick to the button to prevent event propagation
    btnElement.onclick = (event) => {
      event.stopPropagation(); // Prevent click from bubbling up to the projectContainer
      location.href = project.liveDemoLink;
    };
    btnContainer.appendChild(btnElement);

    // Append all child elements to the project container
    projectContainer.appendChild(articleContainer);
    projectContainer.appendChild(titleElement);
    projectContainer.appendChild(btnContainer);

    // Add a click event listener to the entire project container
    projectContainer.onclick = () => {
      // Redirect to project.html and pass the index as a URL parameter
      window.location.href = `project.html?id=${index}`;
    };

    // Append the project container to the parent container
    parentContainer.appendChild(projectContainer);
  });
});
