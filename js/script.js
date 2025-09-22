document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    
    // Function to open mobile menu
    function openMobileMenu() {
        navLinks.classList.add('active');
        if (closeMenuBtn) {
            closeMenuBtn.style.display = 'block';
        }
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        if (closeMenuBtn) {
            closeMenuBtn.style.display = 'none';
        }
        
        // Close any open dropdowns when closing the menu
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }

    // Dropdown Menu - Desktop and Mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        
        if (dropbtn) {
            dropbtn.addEventListener('click', function(e) {
                // Handle dropdown differently based on screen size
                if (window.innerWidth > 768) {
                    // Desktop behavior - let the hover effect work
                    return;
                } else {
                    // Mobile behavior - prevent default and toggle dropdown
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when clicking on a link (except dropdown toggles)
    const mobileNavLinks = document.querySelectorAll('.nav-links a');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close menu if it's a dropdown toggle
            if (!link.classList.contains('dropbtn')) {
                closeMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            !closeMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    function showSlide(index) {
        if (heroSlides.length === 0) return;
        
        heroSlides.forEach(slide => slide.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        heroSlides[index].classList.add('active');
        sliderDots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        if (heroSlides.length === 0) return;
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    // Auto-advance slider
    if (heroSlides.length > 0) {
        setInterval(nextSlide, 5000);

        // Slider dot navigation
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
    }

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Reset pagination to first page when filtering
            if (document.getElementById('portfolioGrid')) {
                setupPortfolioPagination(1);
            }
        });
    });

    // Portfolio Pagination
    function setupPortfolioPagination(page = 1) {
        const portfolioGrid = document.getElementById('portfolioGrid');
        const portfolioPagination = document.getElementById('portfolioPagination');
        
        if (!portfolioGrid || !portfolioPagination) return;
        
        const items = Array.from(portfolioGrid.querySelectorAll('.portfolio-item'));
        const itemsPerPage = 6;
        const totalPages = Math.ceil(items.length / itemsPerPage);
        
        // Hide all items
        items.forEach(item => {
            item.style.display = 'none';
        });
        
        // Show items for current page
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        for (let i = start; i < end && i < items.length; i++) {
            items[i].style.display = 'block';
        }
        
        // Update pagination buttons
        let paginationHTML = '';
        
        // Previous button
        if (page > 1) {
            paginationHTML += `<a href="#" class="page-link" data-page="${page - 1}"><i class="fas fa-chevron-left"></i></a>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === page ? 'active' : '';
            paginationHTML += `<a href="#" class="page-link ${activeClass}" data-page="${i}">${i}</a>`;
        }
        
        // Next button
        if (page < totalPages) {
            paginationHTML += `<a href="#" class="page-link next" data-page="${page + 1}"><i class="fas fa-chevron-right"></i></a>`;
        }
        
        portfolioPagination.innerHTML = paginationHTML;
        
        // Add event listeners to pagination buttons
        const pageLinks = portfolioPagination.querySelectorAll('.page-link');
        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageNum = parseInt(link.getAttribute('data-page'));
                setupPortfolioPagination(pageNum);
            });
        });
    }
    
    // Initialize portfolio pagination
    if (document.getElementById('portfolioGrid')) {
        setupPortfolioPagination(1);
    }

    // Testimonials Pagination
    function setupTestimonialsPagination(page = 1) {
        const testimonialsGrid = document.getElementById('testimonialsGrid');
        const testimonialsPagination = document.getElementById('testimonialsPagination');
        
        if (!testimonialsGrid || !testimonialsPagination) return;
        
        const items = Array.from(testimonialsGrid.querySelectorAll('.testimonial-card'));
        const itemsPerPage = 3;
        const totalPages = Math.ceil(items.length / itemsPerPage);
        
        // Hide all items
        items.forEach(item => {
            item.style.display = 'none';
        });
        
        // Show items for current page
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        for (let i = start; i < end && i < items.length; i++) {
            items[i].style.display = 'block';
        }
        
        // Update pagination buttons
        let paginationHTML = '';
        
        // Previous button
        if (page > 1) {
            paginationHTML += `<a href="#" class="page-link" data-page="${page - 1}"><i class="fas fa-chevron-left"></i></a>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === page ? 'active' : '';
            paginationHTML += `<a href="#" class="page-link ${activeClass}" data-page="${i}">${i}</a>`;
        }
        
        // Next button
        if (page < totalPages) {
            paginationHTML += `<a href="#" class="page-link next" data-page="${page + 1}"><i class="fas fa-chevron-right"></i></a>`;
        }
        
        testimonialsPagination.innerHTML = paginationHTML;
        
        // Add event listeners to pagination buttons
        const pageLinks = testimonialsPagination.querySelectorAll('.page-link');
        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageNum = parseInt(link.getAttribute('data-page'));
                setupTestimonialsPagination(pageNum);
            });
        });
    }
    
    // Initialize testimonials pagination
    if (document.getElementById('testimonialsGrid')) {
        setupTestimonialsPagination(1);
    }

    // Testimonials Slider (for home page)
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        if (testimonials.length === 0) return;
        
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }

    if (testimonials.length > 0) {
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }

        // Auto-advance testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // Contact Form Submission via WhatsApp
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service') ? document.getElementById('service').value : '';
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `Hello Ayodecor,%0A%0A` +
                `Name: ${name}%0A` +
                `Email: ${email}%0A` +
                `Phone: ${phone}%0A` +
                `Service: ${service}%0A%0A` +
                `Message: ${message}`;
            
            // Open WhatsApp with pre-filled message
            const whatsappURL = `https://wa.me/233241539965?text=${whatsappMessage}`;
            window.open(whatsappURL, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.padding = '15px';
            successMessage.style.marginTop = '20px';
            successMessage.style.backgroundColor = '#d4edda';
            successMessage.style.color = '#155724';
            successMessage.style.borderRadius = '4px';
            successMessage.style.textAlign = 'center';
            successMessage.textContent = 'Redirecting to WhatsApp...';
            
            // Add success message to form
            contactForm.appendChild(successMessage);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '20px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });
});