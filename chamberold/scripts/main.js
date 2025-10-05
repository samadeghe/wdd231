// Function to handle the responsive navigation menu toggle
function navToggle() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('show');
}

// Function to set the dynamic dates in the footer
function setDates() {
    // Set current year
    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Set last modification date
    const lastModSpan = document.getElementById('last-modification');
    if (lastModSpan) {
        // Use document.lastModified to get the last modification time of the current document
        lastModSpan.textContent = document.lastModified;
    }

    // Add event listener for the mobile menu button
    const menuButton = document.querySelector('.menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', navToggle);
    }
}

// Execute function when the page loads
window.onload = setDates;
