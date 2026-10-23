/**
 * Athish's Portfolio - Interactive Features & Logic
 * Vanilla JavaScript (ES6+)
 */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. Theme Toggle (Dark / Light Mode)
    // -------------------------------------------------------------
    const themeToggleBtn = document.getElementById("themeToggle");
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem("portfolio-theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
        htmlElement.setAttribute("data-theme", savedTheme);
    } else if (systemPrefersDark) {
        htmlElement.setAttribute("data-theme", "dark");
    } else {
        htmlElement.setAttribute("data-theme", "light");
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-theme") || "light";
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            htmlElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("portfolio-theme", newTheme);
            
            showToast(newTheme === "dark" ? "🌙 Switched to Dark mode" : "☀️ Switched to Light mode");
        });
    }

    // -------------------------------------------------------------
    // 2. Mobile Navigation Menu Toggle & Accessibility
    // -------------------------------------------------------------
    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");

    function toggleMenu(isOpen) {
        const open = typeof isOpen === "boolean" ? isOpen : !nav.classList.contains("open");
        nav.classList.toggle("open", open);
        menuBtn.classList.toggle("open", open);
        menuBtn.setAttribute("aria-expanded", open.toString());
        document.body.style.overflow = open && window.innerWidth <= 768 ? "hidden" : "";
    }

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => toggleMenu());

        // Close menu when a navigation link is clicked
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (nav.classList.contains("open")) {
                    toggleMenu(false);
                }
            });
        });

        // Close menu on click outside
        document.addEventListener("click", (e) => {
            if (nav.classList.contains("open")) {
                if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
                    toggleMenu(false);
                }
            }
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && nav.classList.contains("open")) {
                toggleMenu(false);
            }
        });
    }

    // -------------------------------------------------------------
    // 3. Scroll Progress Bar & Header Shadow & Back to Top
    // -------------------------------------------------------------
    const header = document.getElementById("header");
    const scrollProgressBar = document.getElementById("scrollProgress");
    const backToTopBtn = document.getElementById("backToTop");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Progress bar width
        if (scrollProgressBar && totalHeight > 0) {
            const scrollPercentage = (currentScrollY / totalHeight) * 100;
            scrollProgressBar.style.width = `${scrollPercentage}%`;
        }

        // Header style on scroll
        if (header) {
            if (currentScrollY > 20) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (currentScrollY > 400) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }

        // Active link scrollspy
        let currentSectionId = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // -------------------------------------------------------------
    // 4. Hero Section Typewriter Effect
    // -------------------------------------------------------------
    const typewriterElement = document.getElementById("typewriter");
    const phrases = [
        "digital experiences.",
        "interactive web apps.",
        "clean UI interfaces.",
        "responsive websites."
    ];

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = true;
    let typingSpeed = 100;

    function handleTypewriter() {
        if (!typewriterElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause before deleting
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Small pause before typing next
        }

        setTimeout(handleTypewriter, typingSpeed);
    }

    // Start typewriter after a short initial delay
    setTimeout(handleTypewriter, 1000);

    // -------------------------------------------------------------
    // 5. Hero Art 3D Mouse Tilt Parallax Effect
    // -------------------------------------------------------------
    const heroArtContainer = document.getElementById("heroArtContainer");
    const heroArt = document.getElementById("heroArt");

    if (heroArtContainer && heroArt && window.matchMedia("(hover: hover)").matches) {
        heroArtContainer.addEventListener("mousemove", (e) => {
            const rect = heroArtContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = -(y / rect.height) * 20;
            const rotateY = (x / rect.width) * 20;

            heroArt.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        heroArtContainer.addEventListener("mouseleave", () => {
            heroArt.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        });
    }

    // -------------------------------------------------------------
    // 6. Interactive Code Card Snippets
    // -------------------------------------------------------------
    const codeCard = document.getElementById("codeCard");
    const codeText = document.getElementById("interactiveCodeText");

    const codeSnippets = [
        `<span class="c-keyword">const</span> <span class="c-var">athish</span> = {
  <span class="c-prop">role</span>: <span class="c-str">'CS Undergrad'</span>,
  <span class="c-prop">loves</span>: [<span class="c-str">'Web Dev'</span>, <span class="c-str">'UI/UX'</span>],
  <span class="c-prop">status</span>: <span class="c-str">'Ready to build ✨'</span>
};`,
        `<span class="c-keyword">function</span> <span class="c-var">craftCode</span>() {
  <span class="c-keyword">const</span> <span class="c-var">curiosity</span> = <span class="c-str">'100%'</span>;
  <span class="c-keyword">return</span> <span class="c-str">'Transforming ideas into web reality 🚀'</span>;
}`,
        `<span class="c-keyword">const</span> <span class="c-var">toolkit</span> = [
  <span class="c-str">'HTML5'</span>,
  <span class="c-str">'CSS3'</span>,
  <span class="c-str">'JavaScript'</span>,
  <span class="c-str">'Git'</span>
];
<span class="c-comment">// Always learning & expanding!</span>`
    ];

    let currentSnippetIdx = 0;

    if (codeCard && codeText) {
        codeCard.addEventListener("click", () => {
            currentSnippetIdx = (currentSnippetIdx + 1) % codeSnippets.length;
            codeText.innerHTML = codeSnippets[currentSnippetIdx];
            showToast("✨ Code snippet updated!");
        });

        // Green button easter egg
        const greenDot = codeCard.querySelector(".dot-green");
        if (greenDot) {
            greenDot.addEventListener("click", (e) => {
                e.stopPropagation();
                showToast("⚡ Code compiled successfully with 0 errors!");
            });
        }
    }

    // -------------------------------------------------------------
    // 7. Project Filtering Logic
    // -------------------------------------------------------------
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(15px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 8. Project Details Modal Data & Controller
    // -------------------------------------------------------------
    const projectModal = document.getElementById("projectModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalBody = document.getElementById("modalBody");
    const detailButtons = document.querySelectorAll(".view-details-btn");

    const projectData = {
        recipe: {
            icon: "🍝",
            title: "Recipe Finder",
            category: "Web Application",
            description: "A responsive culinary web application created to simplify cooking at home. Users can search through thousands of dishes by ingredient, filter dietary preferences, and view step-by-step preparation instructions.",
            features: [
                "Real-time instant search with dynamic recipe card rendering",
                "Detailed breakdown of ingredients, cooking duration, and nutritional values",
                "Fully mobile-friendly responsive layout built with Flexbox & CSS Grid",
                "Local storage integration to bookmark favorite recipes for offline reference"
            ],
            tech: ["HTML5", "CSS3", "JavaScript ES6", "REST API integration"]
        },
        planner: {
            icon: "📚",
            title: "Study Planner & Task Tracker",
            category: "Productivity Tool",
            description: "A student-centric productivity web application designed to help organize courses, assignments, and study routines. Features goal setting and visual task milestones to keep learning consistent and rewarding.",
            features: [
                "Interactive Kanban-style task boards (To-Do, In Progress, Completed)",
                "Daily study goal tracker with animated visual progress indicators",
                "Custom Pomodoro timer to manage focus intervals",
                "Persistent browser state via localStorage to retain all study plans"
            ],
            tech: ["HTML5", "Modern CSS", "JavaScript DOM Manipulation", "Local Storage"]
        },
        travel: {
            icon: "🌍",
            title: "Travel Journal & Explorer",
            category: "Storytelling & Design",
            description: "A clean visual journal concept built to document travel experiences, bucket-list destinations, and curated photography. Focuses on graceful typography, fluid transitions, and engaging layout aesthetics.",
            features: [
                "Aesthetic masonry-style photo gallery with modal view expansions",
                "Interactive travel itinerary cards with date and location badges",
                "Clean responsive typography optimized for readability across devices",
                "Pure CSS interactive hover animations and smooth page scrolls"
            ],
            tech: ["HTML5", "CSS3 Transitions", "Responsive Layouts", "UI/UX Prototyping"]
        }
    };

    function openProjectModal(projectId) {
        const data = projectData[projectId];
        if (!data || !modalBody || !projectModal) return;

        modalBody.innerHTML = `
            <div class="modal-hero-icon">${data.icon}</div>
            <p class="eyebrow">${data.category}</p>
            <h2 class="modal-title" id="modalTitle">${data.title}</h2>
            <p class="modal-desc">${data.description}</p>
            
            <h3 class="modal-features-title">Key Highlights:</h3>
            <ul class="modal-features-list">
                ${data.features.map(f => `<li>${f}</li>`).join("")}
            </ul>

            <h3 class="modal-features-title">Technologies Used:</h3>
            <div class="project-tech-pills" style="margin-bottom: 24px;">
                ${data.tech.map(t => `<span>${t}</span>`).join("")}
            </div>

            <div class="modal-actions">
                <a href="#contact" class="primary-btn" id="modalDiscussBtn">
                    <span>Discuss This Project</span>
                    <span>↗</span>
                </a>
                <button class="secondary-btn" id="modalCloseActionBtn">
                    <span>Close Preview</span>
                </button>
            </div>
        `;

        projectModal.classList.add("open");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        // Hook inner close & discuss buttons
        const closeBtnInner = document.getElementById("modalCloseActionBtn");
        const discussBtnInner = document.getElementById("modalDiscussBtn");

        if (closeBtnInner) {
            closeBtnInner.addEventListener("click", closeProjectModal);
        }
        if (discussBtnInner) {
            discussBtnInner.addEventListener("click", closeProjectModal);
        }
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove("open");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    detailButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute("data-project");
            openProjectModal(projectId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && projectModal.classList.contains("open")) {
                closeProjectModal();
            }
        });
    }

    // -------------------------------------------------------------
    // 9. Scroll Reveal Animations & Skill Bars
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll(".reveal");
    const skillBars = document.querySelectorAll(".skill-bar-fill");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");

                        // If element contains skill bars, animate them
                        const bar = entry.target.querySelector(".skill-bar-fill");
                        if (bar) {
                            bar.classList.add("animated");
                        }

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach((el) => el.classList.add("active"));
        skillBars.forEach((bar) => bar.classList.add("animated"));
    }

    // -------------------------------------------------------------
    // 10. Copy to Clipboard Functionality
    // -------------------------------------------------------------
    const emailToCopy = "athish2008@gmail.com";
    const copyBtns = [
        document.getElementById("copyEmailBtn"),
        document.getElementById("quickCopyEmailBtn")
    ];

    copyBtns.forEach((btn) => {
        if (btn) {
            btn.addEventListener("click", () => {
                navigator.clipboard.writeText(emailToCopy)
                    .then(() => {
                        showToast("📋 Email copied to clipboard!");
                    })
                    .catch(() => {
                        const tempInput = document.createElement("input");
                        tempInput.value = emailToCopy;
                        document.body.appendChild(tempInput);
                        tempInput.select();
                        document.execCommand("copy");
                        document.body.removeChild(tempInput);
                        showToast("📋 Email copied to clipboard!");
                    });
            });
        }
    });

    // -------------------------------------------------------------
    // 11. Interactive Contact Form with Validation
    // -------------------------------------------------------------
    const contactForm = document.getElementById("contactForm");
    const senderName = document.getElementById("senderName");
    const senderEmail = document.getElementById("senderEmail");
    const senderMessage = document.getElementById("senderMessage");
    const charCount = document.getElementById("charCount");
    const submitBtn = document.getElementById("submitFormBtn");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // Real-time character count
    if (senderMessage && charCount) {
        senderMessage.addEventListener("input", () => {
            const currentLen = senderMessage.value.length;
            charCount.textContent = `${currentLen}/300`;
            if (currentLen >= 280) {
                charCount.style.color = "var(--coral)";
            } else {
                charCount.style.color = "var(--text-subtle)";
            }
        });
    }

    // Email regex validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let isValid = true;

            // Reset errors
            if (nameError) nameError.textContent = "";
            if (emailError) emailError.textContent = "";
            if (messageError) messageError.textContent = "";

            // Validate Name
            if (!senderName.value.trim()) {
                if (nameError) nameError.textContent = "Please provide your name.";
                isValid = false;
            }

            // Validate Email
            if (!senderEmail.value.trim()) {
                if (emailError) emailError.textContent = "Please provide your email address.";
                isValid = false;
            } else if (!isValidEmail(senderEmail.value.trim())) {
                if (emailError) emailError.textContent = "Please provide a valid email address.";
                isValid = false;
            }

            // Validate Message
            if (!senderMessage.value.trim()) {
                if (messageError) messageError.textContent = "Please write a message.";
                isValid = false;
            } else if (senderMessage.value.trim().length < 10) {
                if (messageError) messageError.textContent = "Message should be at least 10 characters.";
                isValid = false;
            }

            if (!isValid) return;

            // Simulate form submission animation
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.classList.remove("loading");
                submitBtn.disabled = false;

                // Create mailto fallback link and notify
                const mailSubject = encodeURIComponent(`Message from ${senderName.value.trim()} via Portfolio`);
                const mailBody = encodeURIComponent(
                    `Name: ${senderName.value.trim()}\nEmail: ${senderEmail.value.trim()}\n\nMessage:\n${senderMessage.value.trim()}`
                );
                
                showToast("✨ Preparing your email client...");
                
                // Open default email client with populated text
                window.location.href = `mailto:${emailToCopy}?subject=${mailSubject}&body=${mailBody}`;

                contactForm.reset();
                if (charCount) charCount.textContent = "0/300";
            }, 700);
        });
    }

    // -------------------------------------------------------------
    // 12. Dynamic Toast Notification Helper
    // -------------------------------------------------------------
    let toastTimeout;
    function showToast(message, icon = "✨") {
        const toast = document.getElementById("toast");
        const toastMsg = document.getElementById("toastMsg");
        const toastIcon = document.getElementById("toastIcon");

        if (!toast || !toastMsg) return;

        toastMsg.textContent = message;
        if (toastIcon) toastIcon.textContent = icon;

        toast.classList.add("show");

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3200);
    }

    // -------------------------------------------------------------
    // 13. Dynamic Current Year in Footer
    // -------------------------------------------------------------
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});