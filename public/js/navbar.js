// navbar.js

const navbarHTML = `
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="logo">Harsh Mohod</a>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="aboutme.html">About</a></li>
        <li><a href="resume.html">Resume</a></li>
        <li><a href="education.html">Education</a></li>
        <li><a href="skill.html">Skills</a></li>
        <li><a href="project.html">Projects</a></li>
        <li><a href="certificate.html">Certificates</a></li>
        <li><a href="photos.html">Photos</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="https://github.com/YOUR_GITHUB" target="_blank">GitHub</a></li>
      </ul>
    </div>
  </nav>
`;

document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");
  if (navbarContainer) {
    navbarContainer.innerHTML = navbarHTML;
  }
});
