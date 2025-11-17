/**
 * Table of Contents Generator
 * 自动生成文章目录
 */

class TOCGenerator {
    constructor() {
        this.contentContainer = document.querySelector('.guide-content');
        
        if (this.contentContainer) {
            this.createRightSidebar();
            this.init();
        }
    }
    
    createRightSidebar() {
        // 创建右侧目录侧边栏
        const rightTocSidebar = document.createElement('div');
        rightTocSidebar.className = 'right-toc-sidebar';
        rightTocSidebar.innerHTML = `
            <div class="right-toc-header">
                <h4>目录导航</h4>
                <button class="right-toc-toggle" aria-label="切换目录">
                    <i class="fas fa-chevron-left"></i>
                </button>
            </div>
            <div class="right-toc-content">
                <div id="right-toc" class="right-toc"></div>
            </div>
        `;
        
        document.body.appendChild(rightTocSidebar);
        
        this.tocContainer = document.getElementById('right-toc');
        this.tocToggle = document.querySelector('.right-toc-toggle');
        this.sidebar = rightTocSidebar;
    }
    
    init() {
        this.generateTOC();
        this.bindEvents();
        this.highlightCurrentSection();
    }
    
    generateTOC() {
        const headings = this.contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        if (headings.length === 0) {
            this.tocContainer.innerHTML = '<p style="color: var(--text-muted); font-size: var(--text-sm);">本页面暂无目录</p>';
            return;
        }
        
        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';
        
        let currentLevel = 1;
        let currentList = tocList;
        const listStack = [tocList];
        
        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const id = heading.id || `heading-${index}`;
            
            // 确保标题有ID
            if (!heading.id) {
                heading.id = id;
            }
            
            // 处理层级变化
            if (level > currentLevel) {
                // 创建新的子列表
                for (let i = currentLevel; i < level; i++) {
                    const newList = document.createElement('ul');
                    const lastItem = currentList.lastElementChild;
                    if (lastItem) {
                        lastItem.appendChild(newList);
                    } else {
                        currentList.appendChild(newList);
                    }
                    listStack.push(newList);
                    currentList = newList;
                }
            } else if (level < currentLevel) {
                // 回到上级列表
                for (let i = currentLevel; i > level; i--) {
                    listStack.pop();
                }
                currentList = listStack[listStack.length - 1];
            }
            
            currentLevel = level;
            
            // 创建目录项
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            link.className = 'toc-link';
            link.dataset.level = level;
            
            listItem.appendChild(link);
            currentList.appendChild(listItem);
        });
        
        this.tocContainer.appendChild(tocList);
    }
    
    bindEvents() {
        // 右侧目录切换按钮
        if (this.tocToggle) {
            this.tocToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isCollapsed = this.sidebar.classList.contains('collapsed');
                
                if (isCollapsed) {
                    this.sidebar.classList.remove('collapsed');
                    this.tocToggle.innerHTML = '<i class="fas fa-chevron-right"></i>';
                    this.tocToggle.setAttribute('aria-label', '收起目录');
                } else {
                    this.sidebar.classList.add('collapsed');
                    this.tocToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
                    this.tocToggle.setAttribute('aria-label', '展开目录');
                }
            });
        }
        
        // 平滑滚动
        const tocLinks = this.tocContainer.querySelectorAll('a[href^="#"]');
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 更新活动状态
                    this.updateActiveLink(link);
                }
            });
        });
        
        // 滚动时高亮当前章节
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.highlightCurrentSection();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    highlightCurrentSection() {
        const headings = this.contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const tocLinks = this.tocContainer.querySelectorAll('.toc-link');
        const scrollPosition = window.scrollY + 100; // 偏移量
        
        let currentHeading = null;
        
        // 找到当前可见的标题
        headings.forEach(heading => {
            if (heading.offsetTop <= scrollPosition) {
                currentHeading = heading;
            }
        });
        
        // 更新目录链接的活动状态
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (currentHeading && link.getAttribute('href') === `#${currentHeading.id}`) {
                link.classList.add('active');
            }
        });
    }
    
    updateActiveLink(activeLink) {
        const tocLinks = this.tocContainer.querySelectorAll('.toc-link');
        tocLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new TOCGenerator();
});

// 添加右侧目录侧边栏样式
const rightTocStyles = `
/* ===== 右侧目录侧边栏 ===== */
.right-toc-sidebar {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    width: 280px;
    max-height: 70vh;
    background: #ffffff;
    border: 1px solid #e1e5e9;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: transform 0.3s ease;
    overflow: hidden;
}

.right-toc-sidebar.collapsed {
    transform: translateY(-50%) translateX(calc(100% - 60px));
}

.right-toc-sidebar.collapsed .right-toc-content {
    display: none;
}

.right-toc-sidebar.collapsed .right-toc-header h4 {
    display: none;
}

.right-toc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: #f8f9fa;
    border-bottom: 1px solid #e1e5e9;
}

.right-toc-header h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
}

.right-toc-toggle {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
    font-size: 12px;
}

.right-toc-toggle:hover {
    background: #e5e7eb;
    color: #374151;
}

.right-toc-content {
    max-height: calc(70vh - 50px);
    overflow-y: auto;
    padding: 16px;
}

.right-toc {
    font-size: 13px;
}

.right-toc .toc-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.right-toc .toc-list ul {
    margin-top: 4px;
    padding-left: 16px;
}

.right-toc .toc-link {
    display: block;
    padding: 6px 8px;
    text-decoration: none;
    color: #6b7280;
    border-radius: 6px;
    transition: all 0.2s ease;
    font-size: 13px;
    line-height: 1.4;
    border-left: 2px solid transparent;
}

.right-toc .toc-link:hover {
    background: #f3f4f6;
    color: #374151;
    border-left-color: #d1d5db;
}

.right-toc .toc-link.active {
    background: #eff6ff;
    color: #2563eb;
    font-weight: 500;
    border-left-color: #2563eb;
}

/* 响应式设计 */
@media (max-width: 1200px) {
    .right-toc-sidebar {
        right: 10px;
        width: 260px;
    }
}

@media (max-width: 768px) {
    .right-toc-sidebar {
        display: none;
    }
}
`;

// 动态添加样式
const styleSheet = document.createElement('style');
styleSheet.textContent = rightTocStyles;
document.head.appendChild(styleSheet);
