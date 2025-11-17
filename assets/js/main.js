// ===== Main JavaScript File =====

(function() {
    'use strict';

    // ===== DOM Elements =====
    const body = document.body;
    const header = document.querySelector('.site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavigation = document.querySelector('.mobile-navigation');
    const themeToggles = document.querySelectorAll('[data-theme-toggle]');
    const backToTopButton = document.getElementById('back-to-top');
    const readingProgressBar = document.getElementById('reading-progress-bar');

    // ===== Theme Management =====
    class ThemeManager {
        constructor() {
            this.currentTheme = localStorage.getItem('theme') || 'light';
            this.init();
        }

        init() {
            this.applyTheme(this.currentTheme);
            this.bindEvents();
        }

        bindEvents() {
            themeToggles.forEach(toggle => {
                toggle.addEventListener('click', () => this.toggleTheme());
            });
        }

        toggleTheme() {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
        }

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            
            // Update theme toggle icons
            themeToggles.forEach(toggle => {
                const moonIcon = toggle.querySelector('.fa-moon');
                const sunIcon = toggle.querySelector('.fa-sun');
                
                if (theme === 'dark') {
                    if (moonIcon) moonIcon.style.display = 'none';
                    if (sunIcon) sunIcon.style.display = 'block';
                } else {
                    if (moonIcon) moonIcon.style.display = 'block';
                    if (sunIcon) sunIcon.style.display = 'none';
                }
            });
        }
    }

    // ===== Mobile Menu Management =====
    class MobileMenuManager {
        constructor() {
            this.isOpen = false;
            this.init();
        }

        init() {
            if (mobileMenuToggle && mobileNavigation) {
                this.bindEvents();
            }
        }

        bindEvents() {
            mobileMenuToggle.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isOpen && !header.contains(e.target)) {
                    this.closeMenu();
                }
            });

            // Handle submenu toggles
            const mobileNavItems = document.querySelectorAll('.mobile-nav-item.has-children');
            mobileNavItems.forEach(item => {
                const link = item.querySelector('.mobile-nav-link');
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleSubmenu(item);
                });
            });

            // Close menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && this.isOpen) {
                    this.closeMenu();
                }
            });
        }

        toggleMenu() {
            if (this.isOpen) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        }

        openMenu() {
            this.isOpen = true;
            mobileMenuToggle.classList.add('active');
            mobileNavigation.classList.add('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            body.style.overflow = 'hidden';
        }

        closeMenu() {
            this.isOpen = false;
            mobileMenuToggle.classList.remove('active');
            mobileNavigation.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }

        toggleSubmenu(item) {
            const isExpanded = item.classList.contains('expanded');
            
            // Close all other submenus
            document.querySelectorAll('.mobile-nav-item.expanded').forEach(expandedItem => {
                if (expandedItem !== item) {
                    expandedItem.classList.remove('expanded');
                }
            });

            // Toggle current submenu
            item.classList.toggle('expanded', !isExpanded);
        }
    }

    // ===== Scroll Management =====
    class ScrollManager {
        constructor() {
            this.lastScrollTop = 0;
            this.init();
        }

        init() {
            this.bindEvents();
            this.updateReadingProgress();
            this.updateBackToTopButton();
        }

        bindEvents() {
            window.addEventListener('scroll', () => {
                this.handleScroll();
            });

            if (backToTopButton) {
                backToTopButton.addEventListener('click', () => {
                    this.scrollToTop();
                });
            }
        }

        handleScroll() {
            this.updateReadingProgress();
            this.updateBackToTopButton();
            this.updateHeaderVisibility();
        }

        updateReadingProgress() {
            if (!readingProgressBar) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / scrollHeight) * 100;

            readingProgressBar.style.width = `${Math.min(progress, 100)}%`;
        }

        updateBackToTopButton() {
            if (!backToTopButton) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }

        updateHeaderVisibility() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > this.lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else {
                // Scrolling up
                header.classList.remove('header-hidden');
            }
            
            this.lastScrollTop = scrollTop;
        }

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // ===== Table of Contents Generator =====
    class TOCGenerator {
        constructor() {
            this.tocContainer = document.getElementById('toc');
            this.tocToggle = document.querySelector('.toc-toggle');
            this.init();
        }

        init() {
            if (this.tocContainer) {
                this.generateTOC();
                this.bindEvents();
            }
        }

        bindEvents() {
            if (this.tocToggle) {
                this.tocToggle.addEventListener('click', () => {
                    this.toggleTOC();
                });
            }

            // Smooth scroll for TOC links
            this.tocContainer.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    e.preventDefault();
                    const targetId = e.target.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        }

        generateTOC() {
            const headings = document.querySelectorAll('.guide-content h2, .guide-content h3, .guide-content h4');
            
            if (headings.length === 0) {
                this.tocContainer.parentElement.style.display = 'none';
                return;
            }

            const tocList = document.createElement('ul');
            tocList.className = 'toc-list';

            headings.forEach((heading, index) => {
                // Generate ID if not exists
                if (!heading.id) {
                    heading.id = `heading-${index}`;
                }

                const listItem = document.createElement('li');
                listItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;

                const link = document.createElement('a');
                link.href = `#${heading.id}`;
                link.textContent = heading.textContent;
                link.className = 'toc-link';

                listItem.appendChild(link);
                tocList.appendChild(listItem);
            });

            this.tocContainer.appendChild(tocList);
        }

        toggleTOC() {
            const tocContent = this.tocContainer.querySelector('.toc-list');
            const isVisible = tocContent.style.display !== 'none';
            
            tocContent.style.display = isVisible ? 'none' : 'block';
            this.tocToggle.classList.toggle('collapsed', isVisible);
            
            const icon = this.tocToggle.querySelector('i');
            if (icon) {
                icon.className = isVisible ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
            }
        }
    }

    // ===== Keyboard Navigation =====
    class KeyboardNavigation {
        constructor() {
            this.init();
        }

        init() {
            document.addEventListener('keydown', (e) => {
                this.handleKeydown(e);
            });
        }

        handleKeydown(e) {
            // ESC key - close modals/menus
            if (e.key === 'Escape') {
                // Close search modal
                const searchModal = document.getElementById('search-modal');
                if (searchModal && !searchModal.hasAttribute('aria-hidden')) {
                    window.searchManager?.closeSearch();
                }

                // Close mobile menu
                if (window.mobileMenuManager?.isOpen) {
                    window.mobileMenuManager.closeMenu();
                }
            }

            // Ctrl/Cmd + K - open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                window.searchManager?.openSearch();
            }
        }
    }

    // ===== Utility Functions =====
    const utils = {
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        formatDate(date) {
            return new Intl.DateTimeFormat('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        },

        copyToClipboard(text) {
            if (navigator.clipboard && window.isSecureContext) {
                return navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                return new Promise((resolve, reject) => {
                    if (document.execCommand('copy')) {
                        textArea.remove();
                        resolve();
                    } else {
                        textArea.remove();
                        reject();
                    }
                });
            }
        }
    };

    // ===== Initialize Application =====
    function initApp() {
        // Initialize managers
        window.themeManager = new ThemeManager();
        window.mobileMenuManager = new MobileMenuManager();
        window.scrollManager = new ScrollManager();
        window.tocGenerator = new TOCGenerator();
        window.keyboardNavigation = new KeyboardNavigation();

        // Make utils globally available
        window.utils = utils;

        // Trigger custom event for other scripts
        document.dispatchEvent(new CustomEvent('appInitialized'));
    }

    // ===== DOM Ready =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

})();