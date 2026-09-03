document.addEventListener("DOMContentLoaded", () => {
    // Get the project ID from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get("id"), 10); // Convert "id" parameter to a number
  
    // Check if the projectId is valid
    if (!isNaN(projectId) && projectId >= 0 && projectId < projectData.length) {
      const project = projectData[projectId];
  
      // Select elements in project.html
      const titleElement = document.querySelector(".title");
      const imgElement = document.querySelector(".project-img");
      const descriptionElement = document.querySelector(".article-description");
      const liveDemoButton = document.querySelector(".btn");
  
      // Populate content with the selected project data
      titleElement.textContent = project.title;
      imgElement.src = project.imgSrc;
      imgElement.alt = project.imgAlt;
      descriptionElement.textContent = project.description;
      liveDemoButton.setAttribute("onclick", `location.href='${project.liveDemoLink}'`);
    } else {
      // If projectId is invalid, display an error message
      const articleSection = document.getElementById("article");
      articleSection.innerHTML = "<p>Project not found. Please provide a valid ID in the URL.</p>";
    }
  });
  