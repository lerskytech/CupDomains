/* World Cup 2026 Domain Portfolio - Main JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav ul');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }
    
    // Automatically load city-specific images or use placeholders
    initializeDomainImages();
    
    // Domain Search & Filter Functionality
    const searchInput = document.getElementById('domain-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const domainCards = document.querySelectorAll('.domain-card');
    
    // Track current filter and search state
    let currentFilter = 'all';
    let currentSearchTerm = '';
    
    // Function to update domain visibility based on current filter and search
    function updateDomainVisibility() {
        if (!domainCards) return;
        
        domainCards.forEach(card => {
            const domainName = card.getAttribute('data-domain').toLowerCase();
            const domainRegion = card.getAttribute('data-region').toLowerCase();
            
            // Check if card matches search term
            const matchesSearch = currentSearchTerm === '' || 
                domainName.includes(currentSearchTerm) || 
                domainRegion.includes(currentSearchTerm);
                
            // Check if card matches current filter
            const matchesFilter = currentFilter === 'all' || domainRegion === currentFilter;
            
            // Show card only if it matches both search and filter
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Set up search input handler
    if (searchInput) {
        // Clear any existing event listeners
        const newSearchInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearchInput, searchInput);
        
        // Add new event listener
        newSearchInput.addEventListener('input', function() {
            currentSearchTerm = this.value.toLowerCase();
            updateDomainVisibility();
        });
    }
    
    // Set up filter buttons
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            // Clear any existing event listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add new event listener
            newButton.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                currentFilter = filterValue;
                
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update domain visibility with current search term and new filter
                updateDomainVisibility();
            });
        });
    }
    
    // Also set up filter links in the footer
    const filterLinks = document.querySelectorAll('.filter-link');
    if (filterLinks.length > 0) {
        filterLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const filterValue = this.getAttribute('data-filter');
                currentFilter = filterValue;
                
                // Update active button in the main filter area
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    if (btn.getAttribute('data-filter') === filterValue) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                
                // Scroll to domain section
                const domainSection = document.querySelector('.domain-grid');
                if (domainSection) {
                    window.scrollTo({
                        top: domainSection.offsetTop - 150,
                        behavior: 'smooth'
                    });
                }
                
                // Update domain visibility
                updateDomainVisibility();
            });
        });
    }
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const companyInput = document.getElementById('company');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                highlightError(nameInput);
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (companyInput.value.trim() === '') {
                highlightError(companyInput);
                isValid = false;
            } else {
                removeError(companyInput);
            }
            
            if (messageInput.value.trim() === '') {
                highlightError(messageInput);
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real implementation, this would send the form data to a server
                // For now, we'll just show a success message
                const formContent = contactForm.innerHTML;
                contactForm.innerHTML = '<div class="success-message"><h3>Thank You!</h3><p>Your message has been sent successfully. Our team will contact you shortly.</p></div>';
                
                // Reset the form after 5 seconds (for demo purposes)
                setTimeout(() => {
                    contactForm.innerHTML = formContent;
                }, 5000);
            }
        });
    }
    
    function highlightError(input) {
        input.classList.add('error');
        input.parentElement.classList.add('has-error');
    }
    
    function removeError(input) {
        input.classList.remove('error');
        input.parentElement.classList.remove('has-error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    }
    
    // Run on load
    checkInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkInView);

    // Function to check if an image exists at a given URL
    async function imageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    // Function to initialize domain images based on available files
    async function initializeDomainImages() {
        const domainCards = document.querySelectorAll('.domain-card');
        
        for (const card of domainCards) {
            const domainName = card.getAttribute('data-domain');
            if (!domainName) continue;
            
            // Extract the domain name without the extension
            let cityName = domainName.replace('cup2026.com', '');
            
            // Format the city name for the image filename
            // Convert "miamicup" to "MiamiCup"
            cityName = cityName.replace(/^(.)(.*)$/, (match, first, rest) => {
                return first.toUpperCase() + rest;
            });
            
            // Special case for New York City and Los Angeles
            if (cityName.toLowerCase() === 'nyc') {
                cityName = 'NYCup';
            } else if (cityName.toLowerCase() === 'la') {
                cityName = 'LACup';
            } else {
                cityName = cityName + 'Cup';
            }
            
            // Use the standard path format
            const imageUrl = `assets/${cityName}.png`;
            const exists = await imageExists(imageUrl);
            
            // If the image exists, replace placeholder with actual image
            const placeholder = card.querySelector('.city-icon-placeholder');
            if (exists && placeholder) {
                placeholder.remove();
                
                // Extract city name from the domain for alt text
                let cityAlt = domainName.replace('cup2026.com', '').replace('futbol', '');
                // Format city name for alt text (capitalize first letter)
                cityAlt = cityAlt.replace(/^(.)(.*)$/, (match, first, rest) => {
                    return first.toUpperCase() + rest;
                });
                
                // Create and insert the image
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `${cityAlt} World Cup 2026 Icon`;
                img.className = 'city-icon';
                
                // Insert the image before the domain content
                card.insertBefore(img, card.querySelector('.domain-content'));
            }
        }
    }
});
