// Initialize AOS
        AOS.init({
            duration: 800,
            once: true
        });

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const icon = themeToggle.querySelector('i');

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });

        // Typing Animation
        const typingText = document.getElementById('typingText');
        const roles = ['Full Stack Developer','Mobile App Developer','Problem Solver', 'Innovator', 'UI-Focused Engineer'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            const typingSpeed = isDeleting ? 100 : 150;
            setTimeout(typeWriter, typingSpeed);
        }

        typeWriter();

        // Hero spotlight and image parallax
        const heroSection = document.getElementById('hero');
        const heroImageContainer = document.getElementById('heroImageContainer');

        if (heroSection) {
            heroSection.addEventListener('mousemove', event => {
                const rect = heroSection.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                heroSection.style.setProperty('--spotlight-x', `${x}%`);
                heroSection.style.setProperty('--spotlight-y', `${y}%`);
            });
        }

        if (heroImageContainer) {
            heroImageContainer.addEventListener('mousemove', event => {
                if (window.innerWidth < 992) return;
                const rect = heroImageContainer.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 9;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * -9;
                heroImageContainer.style.transform = `translateY(-10px) rotateX(${y}deg) rotateY(${x}deg)`;
            });

            heroImageContainer.addEventListener('mouseleave', () => {
                heroImageContainer.style.transform = '';
            });
        }

        // About section typing, counters, and subtle image parallax
        const aboutTypingText = document.getElementById('aboutTypingText');
        const aboutLines = [
            'I build scalable web and mobile applications',
            'I turn ideas into clean digital products',
            'I design practical solutions with thoughtful code'
        ];
        let aboutLineIndex = 0;
        let aboutCharIndex = 0;
        let aboutDeleting = false;

        function typeAboutLine() {
            if (!aboutTypingText) return;

            const currentLine = aboutLines[aboutLineIndex];
            aboutTypingText.textContent = aboutDeleting
                ? currentLine.substring(0, aboutCharIndex - 1)
                : currentLine.substring(0, aboutCharIndex + 1);

            aboutCharIndex += aboutDeleting ? -1 : 1;

            if (!aboutDeleting && aboutCharIndex === currentLine.length) {
                setTimeout(() => aboutDeleting = true, 1800);
            } else if (aboutDeleting && aboutCharIndex === 0) {
                aboutDeleting = false;
                aboutLineIndex = (aboutLineIndex + 1) % aboutLines.length;
            }

            setTimeout(typeAboutLine, aboutDeleting ? 55 : 95);
        }

        typeAboutLine();

        function animateAboutCounter(element) {
            const target = Number(element.dataset.target || 0);
            const duration = 1000;
            const start = performance.now();

            function frame(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                element.textContent = Math.round(target * eased);
                if (progress < 1) requestAnimationFrame(frame);
            }

            requestAnimationFrame(frame);
        }

        const aboutCounterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                animateAboutCounter(entry.target);
                aboutCounterObserver.unobserve(entry.target);
            });
        }, { threshold: 0.65 });

        document.querySelectorAll('.about-counter').forEach(counter => aboutCounterObserver.observe(counter));

        const aboutImageWrap = document.getElementById('aboutImageWrap');
        if (aboutImageWrap) {
            aboutImageWrap.addEventListener('mousemove', event => {
                if (window.innerWidth < 992) return;
                const rect = aboutImageWrap.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
                aboutImageWrap.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
            });

            aboutImageWrap.addEventListener('mouseleave', () => {
                aboutImageWrap.style.transform = '';
            });
        }

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                    return;
                }
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active Navigation on Scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActiveNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);

        // Projects data and premium grid rendering
        function createProjectImage(title, subtitle, colors) {
            const [start, end, accent] = colors;
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560">
                    <defs>
                        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0%" stop-color="${start}"/>
                            <stop offset="100%" stop-color="${end}"/>
                        </linearGradient>
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#020617" flood-opacity="0.28"/>
                        </filter>
                    </defs>
                    <rect width="900" height="560" rx="34" fill="url(#bg)"/>
                    <circle cx="760" cy="72" r="124" fill="${accent}" opacity="0.22"/>
                    <circle cx="88" cy="482" r="150" fill="#ffffff" opacity="0.1"/>
                    <rect x="96" y="92" width="708" height="376" rx="26" fill="#0f172a" opacity="0.72" filter="url(#shadow)"/>
                    <rect x="132" y="134" width="250" height="20" rx="10" fill="#ffffff" opacity="0.42"/>
                    <rect x="132" y="182" width="636" height="156" rx="22" fill="#ffffff" opacity="0.1"/>
                    <rect x="164" y="220" width="156" height="80" rx="18" fill="${accent}" opacity="0.92"/>
                    <rect x="344" y="220" width="156" height="80" rx="18" fill="#ffffff" opacity="0.18"/>
                    <rect x="524" y="220" width="156" height="80" rx="18" fill="#ffffff" opacity="0.14"/>
                    <rect x="132" y="372" width="180" height="22" rx="11" fill="#ffffff" opacity="0.5"/>
                    <rect x="336" y="372" width="132" height="22" rx="11" fill="#ffffff" opacity="0.24"/>
                    <text x="132" y="440" fill="#ffffff" font-family="Poppins, Arial, sans-serif" font-size="38" font-weight="700">${title}</text>
                    <text x="132" y="486" fill="#e2e8f0" font-family="Poppins, Arial, sans-serif" font-size="22" font-weight="500">${subtitle}</text>
                </svg>
            `;
            return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
        }

        const projects = [
            {
                id: 1,
                title: 'CommerceOS',
                category: 'web',
                badge: 'Top',
                description: 'A conversion-focused storefront with payments, inventory, and admin analytics.',
                fullDescription: 'CommerceOS is a complete e-commerce experience designed around fast browsing, secure checkout, and a clean dashboard for product, order, and inventory management.',
                features: ['Product catalog with smart filtering', 'Stripe-ready checkout flow', 'Admin analytics and order tracking', 'Responsive shopping experience'],
                tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                image: createProjectImage('CommerceOS', 'React + Node storefront', ['#6366f1', '#111827', '#f59e0b']),
                gallery: [
                    createProjectImage('Storefront', 'Premium shopping UI', ['#6366f1', '#0f172a', '#f59e0b']),
                    createProjectImage('Dashboard', 'Orders and inventory', ['#8b5cf6', '#1e293b', '#10b981'])
                ],
                github: 'https://github.com/',
                demo: 'https://example.com/'
            },
            {
                id: 2,
                title: 'FlowBoard',
                category: 'web',
                badge: 'New',
                description: 'A collaborative task board with realtime updates, teams, and work tracking.',
                fullDescription: 'FlowBoard helps teams plan and ship work with realtime task movement, status visibility, comments, and lightweight reporting.',
                features: ['Realtime kanban updates', 'Team spaces and comments', 'Progress summaries', 'Role-aware project access'],
                tech: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
                image: createProjectImage('FlowBoard', 'Realtime collaboration', ['#8b5cf6', '#172554', '#22c55e']),
                gallery: [
                    createProjectImage('Boards', 'Drag and drop workflow', ['#8b5cf6', '#172554', '#22c55e']),
                    createProjectImage('Teams', 'Realtime project room', ['#3b82f6', '#0f172a', '#f59e0b'])
                ],
                github: 'https://github.com/',
                demo: 'https://example.com/'
            },
            {
                id: 3,
                title: 'PulseFit',
                category: 'mobile',
                badge: 'Popular',
                description: 'A mobile fitness companion for workouts, habits, goals, and progress charts.',
                fullDescription: 'PulseFit turns workout tracking into a clean mobile habit loop with guided sessions, history, goal progress, and Firebase-backed sync.',
                features: ['Workout and habit tracking', 'Goal progress charts', 'Cloud sync and auth', 'Mobile-first interaction patterns'],
                tech: ['React Native', 'Firebase', 'Redux'],
                image: createProjectImage('PulseFit', 'Mobile fitness tracker', ['#f59e0b', '#7c2d12', '#22c55e']),
                gallery: [
                    createProjectImage('Workout', 'Session tracking', ['#f59e0b', '#7c2d12', '#22c55e']),
                    createProjectImage('Progress', 'Charts and goals', ['#ec4899', '#581c87', '#facc15'])
                ],
                github: 'https://github.com/',
                demo: 'https://example.com/'
            },
            {
                id: 4,
                title: 'GatewayX',
                category: 'backend',
                badge: 'Backend',
                description: 'A scalable API gateway for routing, caching, rate limits, and service health.',
                fullDescription: 'GatewayX provides a production-minded entry point for microservices with request routing, Redis caching, rate limiting, and containerized deployment support.',
                features: ['Service routing and health checks', 'Redis caching layer', 'Rate limit protection', 'Docker and Kubernetes deployment'],
                tech: ['Node.js', 'Docker', 'Kubernetes', 'Redis'],
                image: createProjectImage('GatewayX', 'Microservice gateway', ['#10b981', '#064e3b', '#60a5fa']),
                gallery: [
                    createProjectImage('Gateway', 'Routing and caching', ['#10b981', '#064e3b', '#60a5fa']),
                    createProjectImage('Services', 'Container deployment', ['#0ea5e9', '#164e63', '#a78bfa'])
                ],
                github: 'https://github.com/',
                demo: 'https://example.com/'
            },
            {
                id: 5,
                title: 'Portfolio Pro',
                category: 'web',
                badge: 'Featured',
                description: 'A responsive portfolio system with theme toggle, animation, and case studies.',
                fullDescription: 'Portfolio Pro is a polished personal site structure built to present skills, projects, experience, and contact flows with strong visual hierarchy.',
                features: ['Animated sections and smooth scrolling', 'Dark and light mode', 'Responsive Bootstrap layout', 'Project modal case studies'],
                tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
                image: createProjectImage('Portfolio Pro', 'Animated developer profile', ['#ec4899', '#4c1d95', '#f59e0b']),
                gallery: [
                    createProjectImage('Hero', 'Professional landing view', ['#ec4899', '#4c1d95', '#f59e0b']),
                    createProjectImage('Case Study', 'Project presentation', ['#6366f1', '#0f172a', '#22c55e'])
                ],
                github: 'https://github.com/',
                demo: 'https://example.com/'
            },
            {
                id: 6,
                title: 'WeatherLens',
                category: 'web',
                badge: 'Live',
                description: 'A weather intelligence dashboard with forecasts, charts, and saved locations.',
                fullDescription: 'WeatherLens combines forecast APIs with data visualization to make current conditions and weather trends easy to scan.',
                features: ['Location-based forecasts', 'Interactive D3 charts', 'Saved city comparison', 'Responsive weather cards'],
                tech: ['React', 'D3.js', 'OpenWeather API'],
                image: createProjectImage('WeatherLens', 'Forecast dashboard', ['#3b82f6', '#0c4a6e', '#facc15']),
                gallery: [
                    createProjectImage('Forecast', 'City weather cards', ['#3b82f6', '#0c4a6e', '#facc15']),
                    createProjectImage('Trends', 'D3 weather charts', ['#06b6d4', '#164e63', '#f97316'])
                ],
                github: 'https://github.com/',
                demo: 'https://example.com/'
            },
            {
                id: 7,
                title: 'Clinic API',
                category: 'backend',
                badge: 'Secure',
                description: 'A healthcare scheduling API with auth, appointments, and audit-friendly data.',
                fullDescription: 'Clinic API focuses on secure backend patterns for appointments, user roles, patient records, and operational scheduling.',
                features: ['JWT authentication', 'Appointment scheduling', 'Role-based access control', 'Clean REST API contracts'],
                tech: ['Django', 'DRF', 'PostgreSQL', 'JWT'],
                image: createProjectImage('Clinic API', 'Secure appointment backend', ['#14b8a6', '#134e4a', '#f97316']),
                gallery: [
                    createProjectImage('Appointments', 'Scheduling endpoints', ['#14b8a6', '#134e4a', '#f97316']),
                    createProjectImage('Access', 'Roles and permissions', ['#64748b', '#111827', '#22c55e'])
                ],
                github: 'https://github.com/',
                demo: 'https://example.com/'
            },
            {
                id: 8,
                title: 'RideMate',
                category: 'mobile',
                badge: 'Mobile',
                description: 'A ride booking prototype with live trip states and clean mobile screens.',
                fullDescription: 'RideMate demonstrates a polished mobile booking flow, from destination search to trip confirmation and driver status updates.',
                features: ['Destination search flow', 'Trip status screens', 'Driver and rider views', 'Mobile UI component system'],
                tech: ['Flutter', 'Firebase', 'Maps API'],
                image: createProjectImage('RideMate', 'Flutter ride booking', ['#0ea5e9', '#082f49', '#a78bfa']),
                gallery: [
                    createProjectImage('Booking', 'Trip request flow', ['#0ea5e9', '#082f49', '#a78bfa']),
                    createProjectImage('Live Trip', 'Status and maps', ['#2563eb', '#172554', '#22c55e'])
                ],
                github: 'https://github.com/',
                demo: 'https://example.com/'
            }
        ];

        // Render Projects
        function renderProjects(filter = 'all') {
            const projectsGrid = document.getElementById('projectsGrid');
            projectsGrid.innerHTML = '';

            const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

            if (!filteredProjects.length) {
                projectsGrid.innerHTML = '<div class="col-12"><div class="project-empty">No projects found for this category.</div></div>';
                return;
            }

            filteredProjects.forEach((project, index) => {
                const projectCard = `
                    <div class="col-lg-4 col-md-6 project-card-wrap" data-aos="zoom-in" data-aos-delay="${index * 90}">
                        <article class="project-card h-100" tabindex="0">
                            <div class="project-media">
                                <span class="project-badge">${project.badge}</span>
                                <img src="${project.image}" class="card-img-top" alt="${project.title} project preview" loading="lazy">
                                <div class="project-overlay">
                                    <button class="btn btn-light project-link" type="button" onclick="event.stopPropagation(); openProjectModal(${project.id})">
                                        <i class="fas fa-expand-alt me-1"></i>Details
                                    </button>
                                    <a href="${project.demo}" class="btn btn-custom project-link" target="_blank" onclick="event.stopPropagation();">
                                        <i class="fas fa-arrow-up-right-from-square me-1"></i>Live Demo
                                    </a>
                                </div>
                            </div>
                            <div class="project-body d-flex flex-column">
                                <div class="d-flex justify-content-between align-items-start gap-3 mb-2">
                                    <h5 class="card-title mb-0">${project.title}</h5>
                                    <button class="btn btn-sm btn-outline-primary rounded-circle flex-shrink-0" type="button" aria-label="Open ${project.title} details" onclick="openProjectModal(${project.id})">
                                        <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                                <p class="card-text flex-grow-1 mb-3">${project.description}</p>
                                <div class="project-tech mb-4">
                                    ${project.tech.map(tech => `<span class="badge">${tech}</span>`).join('')}
                                </div>
                                <div class="d-flex flex-wrap gap-2 mt-auto">
                                    <a href="${project.demo}" class="btn btn-custom project-link" target="_blank">
                                        <i class="fas fa-play me-1"></i>Live Demo
                                    </a>
                                    <a href="${project.github}" class="btn btn-outline-secondary project-link" target="_blank">
                                        <i class="fab fa-github me-1"></i>GitHub
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                `;
                projectsGrid.innerHTML += projectCard;
            });

            AOS.refreshHard();
            attachProjectTilt();
        }

        let activeProjectFilter = 'all';

        // Project Filtering
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeProjectFilter = btn.dataset.filter;
                const projectsGrid = document.getElementById('projectsGrid');
                projectsGrid.classList.add('is-filtering');
                setTimeout(() => {
                    renderProjects(activeProjectFilter);
                    projectsGrid.classList.remove('is-filtering');
                }, 220);
            });
        });

        // Open Project Modal
        function openProjectModal(projectId) {
            const project = projects.find(p => p.id === projectId);
            if (!project) return;

            document.getElementById('projectModalTitle').textContent = project.title;
            document.getElementById('projectModalBody').innerHTML = `
                <div class="row g-4">
                    <div class="col-lg-7">
                        <div id="projectModalCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                ${project.gallery.map((image, index) => `
                                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                        <img src="${image}" class="d-block w-100 project-modal-image" alt="${project.title} screenshot ${index + 1}">
                                    </div>
                                `).join('')}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#projectModalCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#projectModalCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <span class="project-badge position-static d-inline-flex mb-3">${project.badge}</span>
                        <p class="lead">${project.fullDescription}</p>
                        <h6 class="fw-bold mt-4">Key Features</h6>
                        <ul class="ps-3">
                            ${project.features.map(feature => `<li class="mb-2">${feature}</li>`).join('')}
                        </ul>
                        <h6 class="fw-bold mt-4">Tech Stack</h6>
                        <div class="project-tech mb-4">
                            ${project.tech.map(tech => `<span class="badge">${tech}</span>`).join('')}
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                            <a href="${project.demo}" class="btn btn-custom" target="_blank">
                                <i class="fas fa-arrow-up-right-from-square me-1"></i>Live Demo
                            </a>
                            <a href="${project.github}" class="btn btn-outline-secondary" target="_blank">
                                <i class="fab fa-github me-1"></i>GitHub
                            </a>
                        </div>
                    </div>
                </div>
            `;

            const modal = new bootstrap.Modal(document.getElementById('projectModal'));
            modal.show();
        }

        function renderProjectSkeletons() {
            const projectsGrid = document.getElementById('projectsGrid');
            projectsGrid.innerHTML = Array.from({ length: 6 }, () => `
                <div class="col-lg-4 col-md-6">
                    <div class="project-skeleton"></div>
                </div>
            `).join('');
        }

        function attachProjectTilt() {
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('mousemove', event => {
                    if (window.innerWidth < 992) return;
                    const rect = card.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    const rotateX = ((y / rect.height) - 0.5) * -5;
                    const rotateY = ((x / rect.width) - 0.5) * 5;
                    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });
        }

        // Contact form validation, draft saving, and AJAX submission
        const contactForm = document.getElementById('contactForm');
        const contactSubmit = document.getElementById('contactSubmit');
        const contactStatus = document.getElementById('formMessage');
        const contactDraftKey = 'portfolioContactDraft';
        const contactFields = ['name', 'email', 'subject', 'message'];

        function sanitizeInput(value) {
            return value.trim().replace(/[<>]/g, '');
        }

        function getContactData() {
            return contactFields.reduce((data, field) => {
                data[field] = sanitizeInput(document.getElementById(field).value);
                return data;
            }, {});
        }

        function setFieldError(field, message = '') {
            const error = document.getElementById(`${field}Error`);
            const input = document.getElementById(field);
            error.textContent = message;
            input.classList.toggle('is-invalid', Boolean(message));
        }

        function validateContactField(field, value) {
            if (!value) return 'This field is required.';
            if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return 'Please enter a valid email address.';
            }
            if (field === 'message' && value.length < 12) {
                return 'Please write at least 12 characters.';
            }
            return '';
        }

        function validateContactForm() {
            const data = getContactData();
            let isValid = true;

            contactFields.forEach(field => {
                const error = validateContactField(field, data[field]);
                setFieldError(field, error);
                if (error) isValid = false;
            });

            return { isValid, data };
        }

        function showContactStatus(type, message) {
            const icon = type === 'success'
                ? '<span class="success-check"><i class="fas fa-check"></i></span>'
                : '<span class="contact-icon" style="width: 32px; height: 32px; border-radius: 50%;"><i class="fas fa-triangle-exclamation"></i></span>';

            contactStatus.className = `contact-status show align-items-center gap-3 mt-3 ${type}`;
            contactStatus.innerHTML = `${icon}<span>${message}</span>`;
            contactStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function setContactLoading(isLoading) {
            contactSubmit.disabled = isLoading;
            contactSubmit.querySelector('.submit-label').classList.toggle('d-none', isLoading);
            contactSubmit.querySelector('.submit-loading').classList.toggle('d-none', !isLoading);
        }

        function saveContactDraft() {
            localStorage.setItem(contactDraftKey, JSON.stringify(getContactData()));
        }

        function restoreContactDraft() {
            const savedDraft = localStorage.getItem(contactDraftKey);
            if (!savedDraft) return;

            try {
                const draft = JSON.parse(savedDraft);
                contactFields.forEach(field => {
                    if (draft[field]) document.getElementById(field).value = draft[field];
                });
            } catch (error) {
                localStorage.removeItem(contactDraftKey);
            }
        }

        if (contactForm) {
            restoreContactDraft();

            contactFields.forEach(field => {
                const input = document.getElementById(field);
                input.addEventListener('input', () => {
                    const value = sanitizeInput(input.value);
                    setFieldError(field, validateContactField(field, value));
                    saveContactDraft();
                });
            });

            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();

                const { isValid, data } = validateContactForm();
                if (!isValid) {
                    showContactStatus('error', 'Please fix the highlighted fields before sending.');
                    return;
                }

                setContactLoading(true);
                contactStatus.className = 'contact-status align-items-center gap-3 mt-3';
                contactStatus.innerHTML = '';

                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...data,
                            source: 'portfolio-contact-form'
                        })
                    });

                    if (!response.ok) throw new Error('Message request failed.');

                    showContactStatus('success', 'Message sent successfully. Thank you for reaching out!');
                    contactForm.reset();
                    localStorage.removeItem(contactDraftKey);
                    contactFields.forEach(field => setFieldError(field));
                } catch (error) {
                    showContactStatus('error', 'Something went wrong while sending. Please try again in a moment.');
                } finally {
                    setContactLoading(false);
                }
            });
        }

        // GitHub Repositories (Optional)
        function loadGitHubRepos() {
            // Replace 'yourusername' with actual GitHub username
            fetch('https://api.github.com/users/yohannes-garomsa/repos?sort=updated&per_page=6')
                .then(response => response.json())
                .then(data => {
                    // Process and display repos
                    console.log('GitHub repos loaded:', data);
                })
                .catch(error => console.error('Error loading GitHub repos:', error));
        }

        // Initialize
        renderProjectSkeletons();
        setTimeout(() => renderProjects(activeProjectFilter), 450);
        // loadGitHubRepos(); // Uncomment to load GitHub repos

        // Premium skills section
        const skillCategories = [
            {
                id: 'frontend',
                title: 'Frontend',
                icon: 'fa-laptop-code',
                summary: 'Interfaces, state, animation, and responsive layouts.',
                skills: [
                    { name: 'React', level: 90, icon: 'fab fa-react', detail: 'Component architecture, hooks, state, and UI systems.', top: true },
                    { name: 'JavaScript', level: 92, icon: 'fab fa-js', detail: 'Modern ES features, DOM, APIs, and interaction logic.', top: true },
                    { name: 'Bootstrap', level: 88, icon: 'fab fa-bootstrap', detail: 'Fast responsive layouts and polished UI composition.' },
                    { name: 'HTML/CSS', level: 95, icon: 'fab fa-html5', detail: 'Semantic markup, responsive CSS, animations, and accessibility.', top: true }
                ]
            },
            {
                id: 'backend',
                title: 'Backend',
                icon: 'fa-server',
                summary: 'APIs, databases, authentication, and service logic.',
                skills: [
                    { name: 'Node.js', level: 88, icon: 'fab fa-node-js', detail: 'REST APIs, Express services, auth, and integrations.', top: true },
                    { name: 'Python', level: 84, icon: 'fab fa-python', detail: 'Backend scripting, data handling, and web services.' },
                    { name: 'Django', level: 82, icon: 'fas fa-leaf', detail: 'Django apps, models, views, auth, and admin workflows.' },
                    { name: 'PostgreSQL', level: 80, icon: 'fas fa-database', detail: 'Schema design, queries, relational modeling, and indexing.' }
                ]
            },
            {
                id: 'mobile',
                title: 'Mobile',
                icon: 'fa-mobile-screen-button',
                summary: 'Mobile-first experiences and cross-platform app flows.',
                skills: [
                    { name: 'Flutter', level: 78, icon: 'fas fa-mobile-screen', detail: 'Cross-platform UI, widgets, navigation, and Firebase flows.' },
                    { name: 'React Native', level: 76, icon: 'fab fa-react', detail: 'Reusable mobile components and app state patterns.' },
                    { name: 'Firebase', level: 82, icon: 'fas fa-fire', detail: 'Auth, realtime data, hosting, and cloud-backed prototypes.' },
                    { name: 'Responsive UI', level: 90, icon: 'fas fa-tablet-screen-button', detail: 'Mobile-friendly layouts, touch targets, and adaptive grids.', top: true }
                ]
            },
            {
                id: 'tools',
                title: 'Tools / Technologies',
                icon: 'fa-screwdriver-wrench',
                summary: 'Delivery, deployment, collaboration, and development workflow.',
                skills: [
                    { name: 'Git', level: 92, icon: 'fab fa-git-alt', detail: 'Branching, collaboration, pull requests, and version control.', top: true },
                    { name: 'Docker', level: 75, icon: 'fab fa-docker', detail: 'Containerized services and repeatable local environments.' },
                    { name: 'AWS', level: 70, icon: 'fab fa-aws', detail: 'Cloud deployment fundamentals, storage, and hosting.' },
                    { name: 'REST APIs', level: 86, icon: 'fas fa-plug', detail: 'API contracts, integration, and request lifecycle design.' }
                ]
            }
        ];

        let activeSkillFilter = 'all';
        const skillsSection = document.querySelector('.skills-section');
        const skillsGrid = document.getElementById('skillsGrid');

        function renderSkills() {
            const visibleCategories = activeSkillFilter === 'all'
                ? skillCategories
                : skillCategories.filter(category => category.id === activeSkillFilter);

            skillsGrid.innerHTML = visibleCategories.map((category, categoryIndex) => `
                <div class="col-lg-3 col-md-6" data-skill-category="${category.id}">
                    <article class="skill-category-card" data-delay="${categoryIndex * 120}">
                        <div class="d-flex align-items-center gap-3 mb-4">
                            <div class="skill-category-icon">
                                <i class="fas ${category.icon}"></i>
                            </div>
                            <div>
                                <h3 class="h5 mb-1">${category.title}</h3>
                                <p class="small text-muted mb-0">${category.summary}</p>
                            </div>
                        </div>

                        <div class="skill-progress-view">
                            <div class="skill-circle-grid mb-4">
                                ${category.skills.slice(0, 2).map(skill => `
                                    <div class="skill-circle ${skill.top ? 'top-skill' : ''}" data-bs-toggle="tooltip" data-bs-title="${skill.detail}">
                                        <div class="skill-ring" data-level="${skill.level}">
                                            <div class="skill-ring-content">
                                                <i class="${skill.icon} d-block mb-1"></i>
                                                <span class="skill-ring-number">0</span>%
                                            </div>
                                        </div>
                                        <small class="fw-bold">${skill.name}</small>
                                    </div>
                                `).join('')}
                            </div>

                            ${category.skills.map(skill => `
                                <div class="skill-row" data-bs-toggle="tooltip" data-bs-title="${skill.detail}">
                                    <div class="d-flex justify-content-between align-items-center gap-3 mb-2">
                                        <div class="d-flex align-items-center gap-2">
                                            <span class="skill-icon ${skill.top ? 'top-skill' : ''}"><i class="${skill.icon}"></i></span>
                                            <span class="fw-semibold">${skill.name}</span>
                                        </div>
                                        <span class="fw-bold skill-level-label">0%</span>
                                    </div>
                                    <div class="skill-meter">
                                        <div class="skill-meter-fill" data-level="${skill.level}"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="skill-tag-cloud">
                            ${category.skills.map(skill => `
                                <span class="skill-tag ${skill.top ? 'top-skill' : ''}" data-bs-toggle="tooltip" data-bs-title="${skill.detail}">
                                    <i class="${skill.icon}"></i>${skill.name}
                                </span>
                            `).join('')}
                        </div>
                    </article>
                </div>
            `).join('');

            initializeSkillTooltips();
            observeSkillCards();
        }

        function initializeSkillTooltips() {
            document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(element => {
                bootstrap.Tooltip.getOrCreateInstance(element);
            });
        }

        function animateNumber(element, target, suffix = '') {
            const duration = 950;
            const start = performance.now();

            function frame(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                element.textContent = `${Math.round(target * eased)}${suffix}`;
                if (progress < 1) requestAnimationFrame(frame);
            }

            requestAnimationFrame(frame);
        }

        const skillCardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const card = entry.target;
                const delay = Number(card.dataset.delay || 0);

                setTimeout(() => {
                    card.classList.add('is-visible');

                    card.querySelectorAll('.skill-meter-fill').forEach(fill => {
                        const level = Number(fill.dataset.level || 0);
                        fill.style.width = `${level}%`;
                        const label = fill.closest('.skill-row').querySelector('.skill-level-label');
                        animateNumber(label, level, '%');
                    });

                    card.querySelectorAll('.skill-ring').forEach(ring => {
                        const level = Number(ring.dataset.level || 0);
                        ring.style.setProperty('--value', `${level * 3.6}deg`);
                        animateNumber(ring.querySelector('.skill-ring-number'), level);
                    });
                }, delay);

                skillCardObserver.unobserve(card);
            });
        }, {
            threshold: 0.25,
            rootMargin: '0px 0px -8% 0px'
        });

        function observeSkillCards() {
            document.querySelectorAll('.skill-category-card').forEach(card => skillCardObserver.observe(card));
            AOS.refreshHard();
        }

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                animateNumber(entry.target, Number(entry.target.dataset.target || 0));
                counterObserver.unobserve(entry.target);
            });
        }, { threshold: 0.7 });

        document.querySelectorAll('.skill-counter').forEach(counter => counterObserver.observe(counter));

        const savedSkillView = localStorage.getItem('skillView') || 'progress';
        if (savedSkillView === 'tags') {
            skillsSection.classList.add('tag-view');
            document.querySelectorAll('.skill-toggle-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.skillView === 'tags'));
        }

        document.querySelectorAll('.skill-toggle-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.skill-toggle-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const isTagView = button.dataset.skillView === 'tags';
                skillsSection.classList.toggle('tag-view', isTagView);
                localStorage.setItem('skillView', button.dataset.skillView);
            });
        });

        document.querySelectorAll('.skill-filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.skill-filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                activeSkillFilter = button.dataset.skillFilter;
                skillsGrid.style.opacity = '0';
                skillsGrid.style.transform = 'translateY(12px)';
                setTimeout(() => {
                    renderSkills();
                    skillsGrid.style.opacity = '1';
                    skillsGrid.style.transform = 'translateY(0)';
                }, 180);
            });
        });

        renderSkills();

        // Experience timeline reveal, stagger, progress line, and details modal
        const timeline = document.getElementById('experienceTimeline');
        const timelineProgress = document.getElementById('timelineProgress');
        const timelineItems = document.querySelectorAll('.timeline-item');

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = Number(entry.target.dataset.delay || 0);
                    setTimeout(() => entry.target.classList.add('is-visible'), delay);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.22,
            rootMargin: '0px 0px -8% 0px'
        });

        timelineItems.forEach(item => timelineObserver.observe(item));

        function updateTimelineProgress() {
            if (!timeline || !timelineProgress) return;

            const rect = timeline.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const scrollableDistance = rect.height + viewportHeight * 0.7;
            const visibleProgress = viewportHeight * 0.78 - rect.top;
            const progress = Math.min(Math.max(visibleProgress / scrollableDistance, 0), 1);

            timelineProgress.style.height = `${progress * rect.height}px`;
        }

        window.addEventListener('scroll', updateTimelineProgress, { passive: true });
        window.addEventListener('resize', updateTimelineProgress);
        updateTimelineProgress();

        const experienceModal = document.getElementById('experienceModal');
        if (experienceModal) {
            experienceModal.addEventListener('show.bs.modal', event => {
                const trigger = event.relatedTarget;
                if (!trigger) return;

                const iconName = trigger.dataset.icon || 'fa-code';
                document.getElementById('experienceModalTitle').textContent = trigger.dataset.role || 'Experience';
                document.getElementById('experienceModalCompany').textContent = trigger.dataset.company || '';
                document.getElementById('experienceModalDuration').innerHTML = `<i class="far fa-calendar-alt"></i> ${trigger.dataset.duration || ''}`;
                document.getElementById('experienceModalDetails').textContent = trigger.dataset.details || '';
                document.getElementById('experienceModalIcon').className = `fas ${iconName}`;
            });
        }
