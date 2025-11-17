// ===== Search Functionality with Lunr.js =====

(function() {
    'use strict';

    class SearchManager {
        constructor() {
            this.searchModal = document.getElementById('search-modal');
            this.searchInput = document.getElementById('search-input');
            this.searchResults = document.getElementById('search-results');
            this.searchResultsList = document.getElementById('search-results-list');
            this.searchLoading = document.getElementById('search-loading');
            this.searchEmpty = document.getElementById('search-empty');
            this.searchNoResults = document.getElementById('search-no-results');
            this.searchToggles = document.querySelectorAll('[data-search-toggle]');
            this.searchCloses = document.querySelectorAll('[data-search-close]');
            this.filterButtons = document.querySelectorAll('.filter-btn');
            this.suggestionTags = document.querySelectorAll('.suggestion-tag');
            
            this.searchData = [];
            this.searchIndex = null;
            this.currentFilter = 'all';
            this.selectedIndex = -1;
            this.searchTimeout = null;
            this.isLoading = false;
            
            this.init();
        }

        async init() {
            await this.loadSearchData();
            this.buildSearchIndex();
            this.bindEvents();
        }

        async loadSearchData() {
            try {
                this.isLoading = true;
                
                // 尝试加载生成的搜索数据，考虑baseurl
                let searchUrl;
                if (window.location.pathname.includes('/IT-Teacher-Guide/')) {
                    // GitHub Pages 部署
                    searchUrl = window.location.origin + '/IT-Teacher-Guide/search.json';
                } else {
                    // 本地开发
                    searchUrl = window.location.origin + '/search.json';
                }
                
                const response = await fetch(searchUrl);
                if (response.ok) {
                    this.searchData = await response.json();
                    console.log(`Loaded ${this.searchData.length} search items`);
                } else {
                    // 如果没有生成的数据，使用fallback数据
                    console.warn('Search data not found, using fallback data');
                    this.searchData = this.getFallbackSearchData();
                }
            } catch (error) {
                console.error('Failed to load search data:', error);
                this.searchData = this.getFallbackSearchData();
            } finally {
                this.isLoading = false;
            }
        }

        getFallbackSearchData() {
            // Fallback search data based on project structure
            return [
                {
                    id: '/docs/python/01-basics.html',
                    title: 'Python基础入门',
                    url: '/docs/python/01-basics.html',
                    category: 'python',
                    section: 'Python教程',
                    excerpt: '学习Python基础语法、变量、运算符和基本数据类型',
                    content: 'Python 基础语法 变量 运算符 数据类型 环境搭建 print input 注释 缩进',
                    tags: 'python 基础 语法 变量'
                },
                {
                    id: '/docs/python/02-data-types.html',
                    title: 'Python数据类型',
                    url: '/docs/python/02-data-types.html',
                    category: 'python',
                    section: 'Python教程',
                    excerpt: '深入了解Python的数字、字符串、列表、字典、集合等数据类型',
                    content: '数字 字符串 列表 字典 集合 元组 数据类型转换 int float str list dict set tuple',
                    tags: 'python 数据类型 列表 字典'
                },
                {
                    id: '/docs/python/03-control-flow.html',
                    title: 'Python控制流',
                    url: '/docs/python/03-control-flow.html',
                    category: 'python',
                    section: 'Python教程',
                    excerpt: '掌握Python的条件语句、循环语句和逻辑运算',
                    content: '条件语句 循环 逻辑运算 if else elif for while break continue',
                    tags: 'python 控制流 循环 条件'
                },
                {
                    id: '/docs/python/04-functions.html',
                    title: 'Python函数',
                    url: '/docs/python/04-functions.html',
                    category: 'python',
                    section: 'Python教程',
                    excerpt: '学习Python函数定义、参数传递、Lambda表达式和递归',
                    content: '函数定义 参数传递 Lambda 递归 def return 局部变量 全局变量',
                    tags: 'python 函数 lambda 递归'
                },
                {
                    id: '/docs/python/05-oop.html',
                    title: 'Python面向对象',
                    url: '/docs/python/05-oop.html',
                    category: 'python',
                    section: 'Python教程',
                    excerpt: '理解Python的类、对象、继承、多态和特殊方法',
                    content: '类 对象 继承 多态 特殊方法 class init self super',
                    tags: 'python 面向对象 类 继承'
                },
                {
                    id: '/docs/python/06-common-modules.html',
                    title: 'Python常用模块',
                    url: '/docs/python/06-common-modules.html',
                    category: 'python',
                    section: 'Python教程',
                    excerpt: '掌握Python常用模块：文件操作、JSON处理、正则表达式、时间处理',
                    content: '文件操作 JSON 正则表达式 时间 import os json re datetime',
                    tags: 'python 模块 文件 json'
                },
                {
                    id: '/docs/cpp/01-basics.html',
                    title: 'C++基础入门',
                    url: '/docs/cpp/01-basics.html',
                    category: 'cpp',
                    section: 'C++教程',
                    excerpt: '学习C++编译过程、命名空间、输入输出基础知识',
                    content: 'C++ 编译 命名空间 输入输出 iostream cout cin namespace using',
                    tags: 'cpp 基础 编译 命名空间'
                },
                {
                    id: '/docs/cpp/02-data-types.html',
                    title: 'C++数据类型',
                    url: '/docs/cpp/02-data-types.html',
                    category: 'cpp',
                    section: 'C++教程',
                    excerpt: '深入理解C++的指针、引用、数组和动态内存管理',
                    content: '指针 引用 数组 动态内存 int float double char bool pointer reference new delete',
                    tags: 'cpp 数据类型 指针 引用'
                },
                {
                    id: '/docs/cpp/03-control-flow.html',
                    title: 'C++控制流',
                    url: '/docs/cpp/03-control-flow.html',
                    category: 'cpp',
                    section: 'C++教程',
                    excerpt: '掌握C++的条件语句、循环语句和位运算',
                    content: '条件语句 循环 位运算 if else switch for while do-while',
                    tags: 'cpp 控制流 循环 位运算'
                },
                {
                    id: '/docs/algorithm/sorting.html',
                    title: '排序算法',
                    url: '/docs/algorithm/sorting.html',
                    category: 'algorithm',
                    section: '算法专题',
                    excerpt: '掌握冒泡排序、选择排序、插入排序、快速排序等经典算法',
                    content: '冒泡排序 选择排序 插入排序 快速排序 归并排序 堆排序 时间复杂度 空间复杂度',
                    tags: '算法 排序 复杂度 快排'
                },
                {
                    id: '/docs/algorithm/searching.html',
                    title: '搜索算法',
                    url: '/docs/algorithm/searching.html',
                    category: 'algorithm',
                    section: '算法专题',
                    excerpt: '学习线性搜索、二分搜索、跳跃搜索等搜索算法',
                    content: '线性搜索 二分搜索 跳跃搜索 指数搜索 哈希搜索 binary search',
                    tags: '算法 搜索 二分 哈希'
                },
                {
                    id: '/docs/data-structure/linear.html',
                    title: '线性数据结构',
                    url: '/docs/data-structure/linear.html',
                    category: 'data-structure',
                    section: '数据结构',
                    excerpt: '学习数组、链表、栈、队列等线性数据结构',
                    content: '数组 链表 栈 队列 线性表 顺序存储 链式存储 array linked-list stack queue',
                    tags: '数据结构 数组 链表 栈'
                },
                {
                    id: '/docs/data-structure/tree.html',
                    title: '树结构',
                    url: '/docs/data-structure/tree.html',
                    category: 'data-structure',
                    section: '数据结构',
                    excerpt: '理解二叉树、二叉搜索树、AVL树、红黑树等树结构',
                    content: '二叉树 二叉搜索树 AVL树 红黑树 树的遍历 binary tree BST',
                    tags: '数据结构 树 二叉树 遍历'
                }
            ];
        }

        buildSearchIndex() {
            if (!window.lunr || this.searchData.length === 0) {
                console.warn('Lunr.js not loaded or no search data available');
                return;
            }

            try {
                // 配置lunr索引（不使用中文语言包，避免加载错误）
                const searchData = this.searchData;
                this.searchIndex = lunr(function() {
                    // 配置字段和权重
                    this.field('title', { boost: 10 });
                    this.field('content', { boost: 1 });
                    this.field('excerpt', { boost: 5 });
                    this.field('tags', { boost: 8 });
                    this.field('category', { boost: 3 });
                    
                    // 设置文档引用字段
                    this.ref('id');
                    
                    // 添加文档到索引
                    searchData.forEach(doc => {
                        this.add(doc);
                    });
                });
                
                console.log('Search index built successfully');
            } catch (error) {
                console.error('Failed to build search index:', error);
                this.searchIndex = null;
            }
        }

        bindEvents() {
            // Open search
            this.searchToggles.forEach(toggle => {
                toggle.addEventListener('click', () => this.openSearch());
            });

            // Close search
            this.searchCloses.forEach(close => {
                close.addEventListener('click', () => this.closeSearch());
            });

            // Search input
            if (this.searchInput) {
                this.searchInput.addEventListener('input', (e) => {
                    this.handleSearchInput(e.target.value);
                });

                this.searchInput.addEventListener('keydown', (e) => {
                    this.handleKeyNavigation(e);
                });
            }

            // Filter buttons
            this.filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.setFilter(button.dataset.filter);
                });
            });

            // Suggestion tags
            this.suggestionTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    this.searchInput.value = tag.dataset.suggestion;
                    this.handleSearchInput(tag.dataset.suggestion);
                });
            });

            // Close on overlay click
            if (this.searchModal) {
                this.searchModal.addEventListener('click', (e) => {
                    if (e.target === this.searchModal || e.target.hasAttribute('data-search-close')) {
                        this.closeSearch();
                    }
                });
            }

            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    this.openSearch();
                }
            });
        }

        openSearch() {
            if (this.searchModal) {
                this.searchModal.style.display = 'flex';
                this.searchModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                
                // Focus search input
                setTimeout(() => {
                    if (this.searchInput) {
                        this.searchInput.focus();
                    }
                }, 100);
            }
        }

        closeSearch() {
            if (this.searchModal) {
                this.searchModal.style.display = 'none';
                this.searchModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                this.selectedIndex = -1;
                this.clearResults();
            }
        }

        handleSearchInput(query) {
            clearTimeout(this.searchTimeout);
            
            if (!query.trim()) {
                this.showEmptyState();
                return;
            }

            this.showLoading();
            
            this.searchTimeout = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        }

        performSearch(query) {
            if (!this.searchIndex) {
                // Fallback to simple search if lunr index is not available
                const results = this.searchData.filter(item => {
                    // Filter by category
                    if (this.currentFilter !== 'all' && item.category !== this.currentFilter) {
                        return false;
                    }

                    // Search in title, content, and excerpt
                    const searchText = `${item.title} ${item.content} ${item.excerpt}`.toLowerCase();
                    const queryLower = query.toLowerCase();
                    
                    return searchText.includes(queryLower);
                });

                this.displayResults(results, query);
                return;
            }

            try {
                // Use lunr.js for advanced search
                let searchResults = this.searchIndex.search(query);
                
                // Apply category filter
                if (this.currentFilter !== 'all') {
                    searchResults = searchResults.filter(result => {
                        const doc = this.searchData.find(item => item.id === result.ref);
                        return doc && doc.category === this.currentFilter;
                    });
                }

                // Convert lunr results to our format
                const results = searchResults.map(result => {
                    const doc = this.searchData.find(item => item.id === result.ref);
                    return {
                        ...doc,
                        score: result.score,
                        matches: result.matchData
                    };
                });

                this.displayResults(results, query);
            } catch (error) {
                console.error('Search error:', error);
                // Fallback to empty results
                this.displayResults([], query);
            }
        }

        displayResults(results, query) {
            this.hideLoading();
            
            if (results.length === 0) {
                this.showNoResults();
                return;
            }

            this.showResults();
            this.renderResults(results, query);
        }

        renderResults(results, query) {
            const template = document.getElementById('search-result-template');
            this.searchResultsList.innerHTML = '';

            results.forEach((result, index) => {
                const resultElement = template.content.cloneNode(true);
                
                const link = resultElement.querySelector('.search-result-link');
                const title = resultElement.querySelector('.search-result-title');
                const category = resultElement.querySelector('.search-result-category');
                const excerpt = resultElement.querySelector('.search-result-excerpt');
                const section = resultElement.querySelector('.search-result-section');
                const matchCount = resultElement.querySelector('.search-result-match-count');

                // 修复URL路径
                let resultUrl = result.url;
                if (window.location.pathname.includes('/IT-Teacher-Guide/')) {
                    // GitHub Pages 部署
                    if (!resultUrl.startsWith('/IT-Teacher-Guide/')) {
                        resultUrl = '/IT-Teacher-Guide' + resultUrl;
                    }
                } else {
                    // 本地开发
                    if (resultUrl.startsWith('/IT-Teacher-Guide/')) {
                        resultUrl = resultUrl.replace('/IT-Teacher-Guide', '');
                    }
                }
                link.href = resultUrl;
                link.textContent = result.title;
                category.textContent = this.getCategoryLabel(result.category);
                excerpt.innerHTML = this.highlightQuery(result.excerpt, query);
                section.textContent = result.section;
                
                // Count matches
                const matches = this.countMatches(result, query);
                matchCount.textContent = `${matches} 个匹配`;

                // Add click handler
                const resultItem = resultElement.querySelector('.search-result-item');
                resultItem.addEventListener('click', () => {
                    // 修复URL路径
                    let resultUrl = result.url;
                    if (window.location.pathname.includes('/IT-Teacher-Guide/')) {
                        // GitHub Pages 部署
                        if (!resultUrl.startsWith('/IT-Teacher-Guide/')) {
                            resultUrl = '/IT-Teacher-Guide' + resultUrl;
                        }
                    } else {
                        // 本地开发
                        if (resultUrl.startsWith('/IT-Teacher-Guide/')) {
                            resultUrl = resultUrl.replace('/IT-Teacher-Guide', '');
                        }
                    }
                    window.location.href = resultUrl;
                });

                resultItem.addEventListener('mouseenter', () => {
                    this.selectedIndex = index;
                    this.updateSelection();
                });

                this.searchResultsList.appendChild(resultElement);
            });

            this.selectedIndex = -1;
        }

        highlightQuery(text, query) {
            if (!query) return text;
            
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }

        countMatches(item, query) {
            if (item.matches) {
                // Use lunr match data if available
                let totalMatches = 0;
                Object.values(item.matches).forEach(fieldMatches => {
                    Object.keys(fieldMatches).forEach(term => {
                        totalMatches += fieldMatches[term].length;
                    });
                });
                return totalMatches > 0 ? totalMatches : 1;
            }
            
            // Fallback to simple counting
            const searchText = `${item.title || ''} ${item.content || ''} ${item.excerpt || ''}`.toLowerCase();
            const queryLower = query.toLowerCase();
            
            if (!searchText || !queryLower) return 0;
            
            const matches = (searchText.match(new RegExp(queryLower, 'g')) || []).length;
            return matches > 0 ? matches : 1;
        }

        getCategoryLabel(category) {
            const labels = {
                'python': 'Python',
                'cpp': 'C++',
                'algorithm': '算法',
                'data-structure': '数据结构'
            };
            return labels[category] || category;
        }

        setFilter(filter) {
            this.currentFilter = filter;
            
            // Update filter buttons
            this.filterButtons.forEach(button => {
                button.classList.toggle('active', button.dataset.filter === filter);
            });

            // Re-search with current query
            if (this.searchInput && this.searchInput.value.trim()) {
                this.performSearch(this.searchInput.value);
            }
        }

        handleKeyNavigation(e) {
            const results = this.searchResultsList.querySelectorAll('.search-result-item');
            
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.selectedIndex = Math.min(this.selectedIndex + 1, results.length - 1);
                    this.updateSelection();
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
                    this.updateSelection();
                    break;
                    
                case 'Enter':
                    e.preventDefault();
                    if (this.selectedIndex >= 0 && results[this.selectedIndex]) {
                        const link = results[this.selectedIndex].querySelector('.search-result-link');
                        if (link) {
                            window.location.href = link.href;
                        }
                    }
                    break;
                    
                case 'Escape':
                    this.closeSearch();
                    break;
            }
        }

        updateSelection() {
            const results = this.searchResultsList.querySelectorAll('.search-result-item');
            
            results.forEach((result, index) => {
                result.classList.toggle('selected', index === this.selectedIndex);
            });

            // Scroll selected item into view
            if (this.selectedIndex >= 0 && results[this.selectedIndex]) {
                results[this.selectedIndex].scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth'
                });
            }
        }

        showLoading() {
            this.searchLoading.style.display = 'flex';
            this.searchEmpty.style.display = 'none';
            this.searchNoResults.style.display = 'none';
            this.searchResultsList.style.display = 'none';
        }

        hideLoading() {
            this.searchLoading.style.display = 'none';
        }

        showEmptyState() {
            this.searchEmpty.style.display = 'block';
            this.searchLoading.style.display = 'none';
            this.searchNoResults.style.display = 'none';
            this.searchResultsList.style.display = 'none';
        }

        showNoResults() {
            this.searchNoResults.style.display = 'block';
            this.searchEmpty.style.display = 'none';
            this.searchLoading.style.display = 'none';
            this.searchResultsList.style.display = 'none';
        }

        showResults() {
            this.searchResultsList.style.display = 'block';
            this.searchEmpty.style.display = 'none';
            this.searchLoading.style.display = 'none';
            this.searchNoResults.style.display = 'none';
        }

        clearResults() {
            this.searchResultsList.innerHTML = '';
            this.showEmptyState();
        }
    }

    // Initialize search when app is ready
    document.addEventListener('appInitialized', () => {
        window.searchManager = new SearchManager();
    });

})();