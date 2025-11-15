// IT教师指南 - 主要JavaScript功能
// 包含学习进度跟踪、基于Lunr.js的全文搜索等功能

(function() {
    'use strict';
    
    // 全局变量
    let searchIndex = null;
    let progressData = {
        completed: [],
        total: 21
    };
    
    // 初始化函数
    function init() {
        initProgressTracking();
        initSearchIndex();
        initSearch();
        initMobileMenu();
        initScrollProgress();
        initBackToTop();
        initSmoothScroll();
        initKeyboardNavigation();
        loadProgressFromStorage();
        updateProgressDisplay();
    }
    
    // ===== 学习进度跟踪功能 =====
    
    function initProgressTracking() {
        const checkboxes = document.querySelectorAll('.chapter-checkbox');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const chapterId = this.id;
                const isCompleted = this.checked;
                const chapterItem = this.closest('.chapter-item');
                
                if (isCompleted) {
                    if (!progressData.completed.includes(chapterId)) {
                        progressData.completed.push(chapterId);
                    }
                    chapterItem.classList.add('completed');
                } else {
                    progressData.completed = progressData.completed.filter(id => id !== chapterId);
                    chapterItem.classList.remove('completed');
                }
                
                saveProgressToStorage();
                updateProgressDisplay();
            });
        });
    }
    
    function updateProgressDisplay() {
        const completedCount = progressData.completed.length;
        const totalCount = progressData.total;
        const percentage = Math.round((completedCount / totalCount) * 100);
        
        // 更新数字显示
        const completedElement = document.getElementById('completed-count');
        const totalElement = document.getElementById('total-count');
        const percentageElement = document.getElementById('progress-percentage');
        const progressFill = document.getElementById('progress-fill');
        
        if (completedElement) completedElement.textContent = completedCount;
        if (totalElement) totalElement.textContent = totalCount;
        if (percentageElement) percentageElement.textContent = percentage + '%';
        if (progressFill) progressFill.style.width = percentage + '%';
    }
    
    function saveProgressToStorage() {
        try {
            localStorage.setItem('itTeacherGuideProgress', JSON.stringify(progressData));
        } catch (e) {
            console.warn('无法保存学习进度到本地存储:', e);
        }
    }
    
    function loadProgressFromStorage() {
        try {
            const saved = localStorage.getItem('itTeacherGuideProgress');
            if (saved) {
                const savedData = JSON.parse(saved);
                progressData.completed = savedData.completed || [];
                
                // 恢复复选框状态
                progressData.completed.forEach(chapterId => {
                    const checkbox = document.getElementById(chapterId);
                    const chapterItem = checkbox ? checkbox.closest('.chapter-item') : null;
                    
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                    if (chapterItem) {
                        chapterItem.classList.add('completed');
                    }
                });
            }
        } catch (e) {
            console.warn('无法从本地存储加载学习进度:', e);
        }
    }
    
    // ===== 搜索索引初始化 =====
    
    function initSearchIndex() {
        if (typeof lunr === 'undefined' || !window.searchData) {
            console.warn('Lunr.js 或搜索数据未加载');
            return;
        }
        
        try {
            // 创建 Lunr 搜索索引，支持中文
            searchIndex = lunr(function() {
                // 配置中文支持
                this.use(lunr.zh);
                
                // 定义字段
                this.ref('id');
                this.field('title', { boost: 10 });
                this.field('content', { boost: 5 });
                this.field('category', { boost: 3 });
                this.field('keywords', { boost: 8 });
                
                // 添加文档到索引
                window.searchData.forEach(function(doc) {
                    this.add(doc);
                }, this);
            });
            
            console.log('搜索索引初始化成功');
        } catch (error) {
            console.error('搜索索引初始化失败:', error);
        }
    }
    
    // ===== 知识点搜索功能 =====
    
    function initSearch() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const searchResults = document.getElementById('search-results');
        
        if (!searchInput || !searchResults) return;
        
        // 搜索输入事件
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                hideSearchResults();
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
        
        // 搜索按钮点击事件
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                const query = searchInput.value.trim();
                if (query.length >= 2) {
                    performSearch(query);
                }
            });
        }
        
        // 点击外部隐藏搜索结果
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-box')) {
                hideSearchResults();
            }
        });
        
        // 键盘导航
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideSearchResults();
            }
        });
    }
    
    function performSearch(query) {
        if (!searchIndex || !window.searchData) {
            console.warn('搜索索引未初始化');
            return;
        }
        
        try {
            // 使用 Lunr.js 进行搜索
            const results = searchIndex.search(query);
            
            // 获取搜索结果的详细信息
            const searchResults = results.map(result => {
                const doc = window.searchData.find(item => item.id === result.ref);
                return {
                    ...doc,
                    score: result.score,
                    excerpt: generateExcerpt(doc.content, query)
                };
            }).slice(0, 8); // 限制显示前8个结果
            
            displaySearchResults(searchResults, query);
        } catch (error) {
            console.error('搜索执行失败:', error);
        }
    }
    
    function generateExcerpt(content, query) {
        if (!content || !query) return '';
        
        const words = query.toLowerCase().split(/\s+/);
        const contentLower = content.toLowerCase();
        
        // 查找第一个匹配的关键词位置
        let matchIndex = -1;
        for (const word of words) {
            const index = contentLower.indexOf(word);
            if (index !== -1) {
                matchIndex = index;
                break;
            }
        }
        
        if (matchIndex === -1) {
            return content.substring(0, 120) + '...';
        }
        
        // 提取匹配位置前后的文本
        const start = Math.max(0, matchIndex - 60);
        const end = Math.min(content.length, matchIndex + 120);
        let excerpt = content.substring(start, end);
        
        if (start > 0) excerpt = '...' + excerpt;
        if (end < content.length) excerpt = excerpt + '...';
        
        return excerpt;
    }
    
    function highlightText(text, query) {
        if (!text || !query) return text;
        
        const words = query.split(/\s+/).filter(word => word.length > 0);
        let highlightedText = text;
        
        words.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });
        
        return highlightedText;
    }
    
    function displaySearchResults(results, query) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">未找到相关结果</div>';
            showSearchResults();
            return;
        }
        
        const html = results.map(result => `
            <div class="search-result-item" onclick="window.location.href='${result.url}'">
                <div class="search-result-title">${highlightText(result.title, query)}</div>
                <div class="search-result-category">${result.category}</div>
                <div class="search-result-excerpt">${highlightText(result.excerpt, query)}</div>
            </div>
        `).join('');
        
        searchResults.innerHTML = html;
        showSearchResults();
    }
    
    function showSearchResults() {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.style.display = 'block';
        }
    }
    
    function hideSearchResults() {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }
    
    // ===== 响应式导航菜单功能 =====
    
    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (!mobileMenuToggle || !navMenu) return;
        
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 防止背景滚动
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 点击菜单项后关闭菜单
        const navItems = navMenu.querySelectorAll('.nav-item a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // 点击外部关闭菜单
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-container')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===== 滚动进度指示器 =====
    
    function initScrollProgress() {
        const scrollProgress = document.getElementById('scroll-progress');
        if (!scrollProgress) return;
        
        const updateScrollProgress = throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            
            scrollProgress.style.width = Math.min(progress, 100) + '%';
        }, 10);
        
        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress(); // 初始化
    }
    
    // ===== 回到顶部按钮 =====
    
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
        const toggleBackToTop = throttle(function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 100);
        
        window.addEventListener('scroll', toggleBackToTop);
        
        backToTopBtn.addEventListener('click', function() {
            smoothScrollTo(0, 800);
        });
    }
    
    // ===== 平滑滚动功能 =====
    
    function initSmoothScroll() {
        // 为所有锚点链接添加平滑滚动
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const targetPosition = target.offsetTop - 80; // 考虑固定导航栏高度
                    smoothScrollTo(targetPosition, 800);
                }
            });
        });
    }
    
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    // ===== 键盘导航支持 =====
    
    function initKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K 打开搜索
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // ESC 关闭搜索结果和移动菜单
            if (e.key === 'Escape') {
                hideSearchResults();
                const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                const navMenu = document.getElementById('nav-menu');
                if (mobileMenuToggle && navMenu) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
            
            // 空格键回到顶部（当焦点不在输入框时）
            if (e.key === ' ' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                if (e.shiftKey) {
                    e.preventDefault();
                    smoothScrollTo(0, 800);
                }
            }
        });
        
        // 改善焦点可见性
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    // ===== 工具函数 =====
    
    // 节流函数
    function throttle(func, limit) {
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
    }
    
    // 防抖函数
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // 检测用户偏好的动画设置
    function respectsReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    // ===== 页面加载完成后初始化 =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
