// Function to toggle the hamburger menu
function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  const hamburgerButton = document.querySelector('.hamburger-menu');
  if (navMenu) {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerButton?.setAttribute('aria-expanded', String(isOpen));
  }
}

// Function to close the menu when clicking on a link
function closeMenu() {
  const navMenu = document.getElementById('nav-menu');
  navMenu?.classList.remove('open');
  document.querySelector('.hamburger-menu')?.setAttribute('aria-expanded', 'false');
}

// Ensure the DOM is ready before adding events
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.querySelector('.hamburger-menu');
  const menuLinks = document.querySelectorAll('.nav-container a');

  if (hamburgerButton) {
    hamburgerButton.addEventListener('click', toggleMenu);
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      closeMenu();
      loadSection(link.dataset.section);
    });
  });

  loadSection(window.location.hash.slice(1) || 'home');
});

// Function to dynamically load sections
function loadSection(section) {
  const content = document.getElementById('content');
  const topLevelSection = section.split('/')[0];

  content.classList.add('is-loading');
  fetch(`sections/${section}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`The section could not be loaded: ${section}`);
      }
      return response.text();
    })
    .then(html => {
      content.innerHTML = html;
      content.classList.remove('is-loading');
      window.location.hash = section;
      document.querySelectorAll('.nav-container a').forEach(link => {
        const isActive = link.dataset.section === topLevelSection;
        link.classList.toggle('active-nav', isActive);
        link.toggleAttribute('aria-current', isActive);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(error => {
      console.error(error);
      content.classList.remove('is-loading');
      content.innerHTML = '<p class="load-error">This section could not be loaded. Please try again.</p>';
    });
}

// Function to filter certificates
function filterCerts(category) {
  const certs = document.querySelectorAll('.certs-gallery .cert');
  certs.forEach(cert => {
    cert.style.display = (category === 'all' || cert.classList.contains(category)) ? '' : 'none';
  });

  // Update active state on filter buttons
  document.querySelectorAll('.certs-filters button').forEach(btn => {
    const btnCategory = (btn.getAttribute('onclick') || '').match(/'([^']+)'/);
    btn.classList.toggle('active', btnCategory && btnCategory[1] === category);
  });
}

