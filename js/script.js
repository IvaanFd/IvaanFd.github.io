// Function to toggle the hamburger menu
function toggleMenu() {
  const navMenu = document.getElementById('nav-menu'); // Select the menu by ID
  if (navMenu) {
    navMenu.classList.toggle('open'); // Toggle the 'open' class to show/hide
  } else {
    console.error("Element with ID 'nav-menu' not found"); // Error if the menu is not found
  }
}

// Function to close the menu when clicking on a link
function closeMenu() {
  const navMenu = document.getElementById('nav-menu');
  if (navMenu && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open'); // Remove the 'open' class
    console.log("Menu closed when clicking on a link");
  }
  else {
    console.error("Element with ID 'nav-menu' not found"); // Error if the menu is not found
  }
}

// Ensure the DOM is ready before adding events
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.querySelector('.hamburger-menu');
  const menuLinks = document.querySelectorAll('.nav-container a'); // Select all menu links
  const certFilterButtons = document.querySelectorAll('.certs-filters button'); // Buttons to filter certificates

  if (hamburgerButton) {
    hamburgerButton.addEventListener('click', toggleMenu); // Event to toggle the menu
    console.log("Hamburger button ready");
  }

  // Add an event to each link to close the menu when clicking
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu(); // Close the menu
      const section = link.getAttribute('onclick').match(/'([^']+)'/)[1]; // Get the section name
      loadSection(section); // Load the corresponding section
    });
  });

  // Add an event to each certificate filter button
  certFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('onclick').match(/'([^']+)'/)[1]; // Get the category
      filterCerts(category); // Filter the certificates
    });
  });

  // Load the initial section (e.g., Home)
  console.log("Loading the initial section");
  loadSection('home');
});

// Function to dynamically load sections
function loadSection(section) {
  fetch(`sections/${section}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`The section could not be loaded: ${section}`);
      }
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('content').innerHTML = `<p>Error loading section.</p>`;
    });
}

// Function to filter certificates (same as before)
function filterCerts(category) {
  const certs = document.querySelectorAll('.cert');
  certs.forEach(cert => {
    if (category === 'all') {
      cert.style.display = 'inline-block';
    } else {
      cert.style.display = cert.classList.contains(category) ? 'inline-block' : 'none';
    }
  });
}

// Load the initial section (e.g., Home)
window.onload = function () {
  loadSection('home');
};