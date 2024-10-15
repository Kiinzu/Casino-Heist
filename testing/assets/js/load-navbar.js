// Load the navbar from an external HTML file
fetch('../templates/navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;

    // After loading the navbar, check which page is currently active
    const currentPage = window.location.pathname; // Get the current page path

    // Set the active class based on the current page
    if (currentPage.includes('home.html')) {
      document.getElementById('link1').classList.add('active');
    } else if (currentPage.includes('challenge.html')) {
      document.getElementById('link2').classList.add('active');
    } else if (currentPage.includes('walkthrough.html')) {
      document.getElementById('link3').classList.add('active');
    } else if (currentPage.includes('settings.html')) {
      document.getElementById('link4').classList.add('active');
    }
  })
  .catch(error => console.error('Error loading the navbar:', error));
