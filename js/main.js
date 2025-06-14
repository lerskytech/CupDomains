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
    
    // Domain Search & Filter Functionality
    const searchInput = document.getElementById('domain-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const domainCards = document.querySelectorAll('.domain-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            domainCards.forEach(card => {
                const domainName = card.getAttribute('data-domain').toLowerCase();
                const domainRegion = card.getAttribute('data-region').toLowerCase();
                
                if (domainName.includes(searchTerm) || domainRegion.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter domains
                if (filterValue === 'all') {
                    domainCards.forEach(card => {
                        card.style.display = 'block';
                    });
                } else {
                    domainCards.forEach(card => {
                        if (card.getAttribute('data-region') === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    // Set up footer filter links to work the same way
    const filterLinks = document.querySelectorAll('.filter-link');
    if (filterLinks.length > 0) {
        filterLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const filterValue = this.getAttribute('data-filter');
                
                // Find and click the corresponding filter button
                const correspondingButton = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
                if (correspondingButton) {
                    correspondingButton.click();
                }
                
                // Scroll to domain section
                const domainSection = document.querySelector('.domain-grid');
                if (domainSection) {
                    window.scrollTo({
                        top: domainSection.offsetTop - 150,
                        behavior: 'smooth'
                    });
                }
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
});
