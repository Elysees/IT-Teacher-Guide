// IT教师指南 - 主要JavaScript功能
// 包含学习进度跟踪、知识点搜索等功能

(function() {
    'use strict';
    
    // 全局变量
    let searchData = [];
    let progressData = {
        completed: [],
        total: 21
    };
    
    // 初始化函数
    function init() {
        initProgressTracking();
        initSearch();
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
    
    // ===== 知识点搜索功能 =====
    
    function initSearch() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const searchResults = document.getElementById('search-results');
        
        if (!searchInput || !searchResults) return;
        
        // 准备搜索数据
        prepareSearchData();
        
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
    
    function prepareSearchData() {
        // 搜索数据结构
        searchData = [
            // Python教程
            {
                title: 'Python基础入门',
                url: '/IT-Teacher-Guide/docs/python/01-basics.html',
                category: 'Python',
                keywords: ['python', '基础', '入门', '变量', '语法', '环境']
            },
            {
                title: 'Python数据类型',
                url: '/IT-Teacher-Guide/docs/python/02-data-types.html',
                category: 'Python',
                keywords: ['python', '数据类型', '字符串', '列表', '字典', '元组']
            },
            {
                title: 'Python控制流',
                url: '/IT-Teacher-Guide/docs/python/03-control-flow.html',
                category: 'Python',
                keywords: ['python', '控制流', 'if', 'for', 'while', '循环', '条件']
            },
            {
                title: 'Python函数',
                url: '/IT-Teacher-Guide/docs/python/04-functions.html',
                category: 'Python',
                keywords: ['python', '函数', 'def', '参数', '返回值', 'lambda']
            },
            {
                title: 'Python面向对象',
                url: '/IT-Teacher-Guide/docs/python/05-oop.html',
                category: 'Python',
                keywords: ['python', '面向对象', '类', '对象', '继承', '封装']
            },
            {
                title: 'Python常用模块',
                url: '/IT-Teacher-Guide/docs/python/06-common-modules.html',
                category: 'Python',
                keywords: ['python', '模块', 'import', '库', 'os', 'sys', 'json']
            },
            
            // C++教程
            {
                title: 'C++基础入门',
                url: '/IT-Teacher-Guide/docs/cpp/01-basics.html',
                category: 'C++',
                keywords: ['c++', 'cpp', '基础', '入门', '编译', '语法']
            },
            {
                title: 'C++数据类型与指针',
                url: '/IT-Teacher-Guide/docs/cpp/02-data-types.html',
                category: 'C++',
                keywords: ['c++', 'cpp', '数据类型', '指针', '引用', '内存']
            },
            {
                title: 'C++控制流',
                url: '/IT-Teacher-Guide/docs/cpp/03-control-flow.html',
                category: 'C++',
                keywords: ['c++', 'cpp', '控制流', 'if', 'for', 'while', '循环']
            },
            {
                title: 'C++函数',
                url: '/IT-Teacher-Guide/docs/cpp/04-functions.html',
                category: 'C++',
                keywords: ['c++', 'cpp', '函数', '重载', '模板', '参数']
            },
            {
                title: 'C++面向对象',
                url: '/IT-Teacher-Guide/docs/cpp/05-oop.html',
                category: 'C++',
                keywords: ['c++', 'cpp', '面向对象', '类', '继承', '多态', '虚函数']
            },
            {
                title: 'C++STL标准库',
                url: '/IT-Teacher-Guide/docs/cpp/06-stl.html',
                category: 'C++',
                keywords: ['c++', 'cpp', 'stl', '标准库', 'vector', 'map', '容器']
            },
            
            // 数据结构
            {
                title: '线性结构',
                url: '/IT-Teacher-Guide/docs/data-structure/linear.html',
                category: '数据结构',
                keywords: ['数据结构', '线性', '数组', '链表', '栈', '队列']
            },
            {
                title: '树形结构',
                url: '/IT-Teacher-Guide/docs/data-structure/tree.html',
                category: '数据结构',
                keywords: ['数据结构', '树', '二叉树', '平衡树', '遍历', 'BST']
            },
            {
                title: '图结构',
                url: '/IT-Teacher-Guide/docs/data-structure/graph.html',
                category: '数据结构',
                keywords: ['数据结构', '图', 'DFS', 'BFS', '最短路径', '拓扑排序']
            },
            {
                title: '哈希表',
                url: '/IT-Teacher-Guide/docs/data-structure/hash.html',
                category: '数据结构',
                keywords: ['数据结构', '哈希', 'hash', '散列', '冲突', '查找']
            },
            
            // 算法专题
            {
                title: '排序算法',
                url: '/IT-Teacher-Guide/docs/algorithm/sorting.html',
                category: '算法',
                keywords: ['算法', '排序', '冒泡', '快排', '归并', '堆排序']
            },
            {
                title: '搜索算法',
                url: '/IT-Teacher-Guide/docs/algorithm/searching.html',
                category: '算法',
                keywords: ['算法', '搜索', '查找', '二分', '线性搜索']
            },
            {
                title: '动态规划',
                url: '/IT-Teacher-Guide/docs/algorithm/dynamic-programming.html',
                category: '算法',
                keywords: ['算法', '动态规划', 'dp', '递推', '最优化']
            }
        ];
    }
    
    function performSearch(query) {
        const results = [];
        const queryLower = query.toLowerCase();
        
        searchData.forEach(item => {
            let score = 0;
            
            // 标题匹配（权重最高）
            if (item.title.toLowerCase().includes(queryLower)) {
                score += 10;
            }
            
            // 关键词匹配
            item.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(queryLower)) {
                    score += 5;
                }
            });
            
            // 分类匹配
            if (item.category.toLowerCase().includes(queryLower)) {
                score += 3;
            }
            
            if (score > 0) {
                results.push({ ...item, score });
            }
        });
        
        // 按分数排序
        results.sort((a, b) => b.score - a.score);
        
        displaySearchResults(results.slice(0, 8)); // 最多显示8个结果
    }
    
    function displaySearchResults(results) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">未找到相关内容</div>';
        } else {
            searchResults.innerHTML = results.map(item => `
                <div class="search-result-item" onclick="navigateToResult('${item.url}')">
                    <div class="search-result-title">${item.title}</div>
                    <div class="search-result-excerpt">${item.category}</div>
                </div>
            `).join('');
        }
        
        searchResults.style.display = 'block';
    }
    
    function hideSearchResults() {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }
    
    // 导航到搜索结果
    window.navigateToResult = function(url) {
        window.location.href = url;
    };
    
    // ===== 页面加载完成后初始化 =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
