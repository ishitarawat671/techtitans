document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for event schedules
    function openTab(tabName) {
        // Hide all tab contents
        const tabContents = document.getElementsByClassName('tab-content');
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        // Remove active class from all tab buttons
        const tabButtons = document.getElementsByClassName('tab-btn');
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }

        // Show the selected tab content and mark button as active
        document.getElementById(tabName).classList.add('active');
        event.currentTarget.classList.add('active');
    }

    // Attach tab click events
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.textContent.toLowerCase().replace(' ', '-');
            openTab(tabName);
        });
    });

    // Event filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            eventCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardType = card.querySelector('.event-type').classList.contains('inter-college') ? 'inter' : 'intra';
                    card.style.display = cardType === filterValue ? 'block' : 'none';
                }
                
                // Add animation when showing cards
                if (card.style.display === 'block') {
                    card.style.animation = 'fadeInUp 0.5s ease';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 500);
                }
            });
        });
    });

    // Registration form handling
    const registrationForm = document.querySelector('#registration form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Here you would typically send data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Registration successful! Confirmation sent to ${data.email}</p>
            `;
            this.parentNode.insertBefore(successMsg, this);
            this.style.display = 'none';
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                this.style.display = 'block';
                successMsg.remove();
            }, 3000);
        });
    }

    // Live updates simulation
    const updatesFeed = document.querySelector('.updates-feed');
    if (updatesFeed) {
        const updates = [
            {
                time: '11:30 AM',
                title: 'Tech Symposium - Results Announcement',
                content: 'The winners of the hackathon competition will be announced in the main auditorium at 12:00 PM.'
            },
            {
                time: '10:45 AM',
                title: 'Cultural Fest - Performance Change',
                content: 'The dance performance scheduled for 11:30 AM has been moved to 2:00 PM.'
            },
            {
                time: '09:15 AM',
                title: 'Sports Festival - New Record',
                content: 'A new college record has been set in the 100m dash!'
            }
        ];

        // Function to add new update
        function addUpdate(update) {
            const updateElement = document.createElement('div');
            updateElement.className = 'update';
            updateElement.innerHTML = `
                <div class="update-time">${update.time}</div>
                <div class="update-content">
                    <h4>${update.title}</h4>
                    <p>${update.content}</p>
                </div>
            `;
            updatesFeed.insertBefore(updateElement, updatesFeed.firstChild);
            
            // Add animation
            updateElement.style.animation = 'fadeIn 0.5s ease';
            setTimeout(() => {
                updateElement.style.animation = '';
            }, 500);
        }

        // Add initial updates
        updates.forEach(update => addUpdate(update));
        
        // Simulate live updates every 30 seconds
        setInterval(() => {
            const now = new Date();
            const hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
            
            const newUpdate = {
                time: `${hours}:${minutes} ${ampm}`,
                title: 'Live Update',
                content: 'This is a simulated live update showing real-time event information.'
            };
            
            addUpdate(newUpdate);
            
            // Limit to 5 updates visible at a time
            if (updatesFeed.children.length > 5) {
                updatesFeed.removeChild(updatesFeed.lastChild);
            }
        }, 30000);
    }

    // 3D hover effects for cards
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 20;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 20;
            this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset when mouse leaves
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg) rotateX(0deg)';
            this.style.transition = 'all 0.5s ease';
            setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.event-card, .update, .registration-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.event-card, .update, .registration-form');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Mobile menu toggle (for responsive design)
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
        this.innerHTML = document.querySelector('nav').classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
});
