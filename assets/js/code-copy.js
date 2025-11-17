// ===== Code Copy Functionality =====

(function() {
    'use strict';

    class CodeCopyManager {
        constructor() {
            this.init();
        }

        init() {
            this.addCopyButtons();
            this.bindEvents();
        }

        addCopyButtons() {
            // Find all code blocks
            const codeBlocks = document.querySelectorAll('.highlight');
            
            codeBlocks.forEach((block, index) => {
                // Skip if button already exists
                if (block.querySelector('.copy-code-button')) {
                    return;
                }

                // Create copy button
                const copyButton = this.createCopyButton();
                
                // Add language label if available
                const language = this.detectLanguage(block);
                if (language) {
                    block.setAttribute('data-lang', language);
                }

                // Insert button
                block.style.position = 'relative';
                block.appendChild(copyButton);
            });
        }

        createCopyButton() {
            const button = document.createElement('button');
            button.className = 'copy-code-button';
            button.innerHTML = '<i class="fas fa-copy"></i>复制';
            button.setAttribute('aria-label', '复制代码');
            button.setAttribute('title', '复制代码');
            
            return button;
        }

        detectLanguage(codeBlock) {
            // Try to detect language from class names
            const classList = codeBlock.className;
            const languageMatch = classList.match(/language-(\w+)|highlight-(\w+)/);
            
            if (languageMatch) {
                return languageMatch[1] || languageMatch[2];
            }

            // Try to detect from Rouge highlighting classes
            const codeElement = codeBlock.querySelector('code');
            if (codeElement) {
                const codeClass = codeElement.className;
                const rougeMatch = codeClass.match(/language-(\w+)/);
                if (rougeMatch) {
                    return rougeMatch[1];
                }
            }

            // Try to detect from content
            const codeText = this.getCodeText(codeBlock);
            return this.detectLanguageFromContent(codeText);
        }

        detectLanguageFromContent(code) {
            // Simple language detection based on common patterns
            if (code.includes('def ') || code.includes('import ') || code.includes('print(')) {
                return 'python';
            }
            if (code.includes('#include') || code.includes('std::') || code.includes('cout')) {
                return 'cpp';
            }
            if (code.includes('function') || code.includes('const ') || code.includes('let ')) {
                return 'javascript';
            }
            if (code.includes('<html') || code.includes('<div') || code.includes('<!DOCTYPE')) {
                return 'html';
            }
            if (code.includes('{') && code.includes('}') && code.includes(':')) {
                return 'css';
            }
            
            return 'text';
        }

        bindEvents() {
            // Use event delegation for copy buttons
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('copy-code-button') || 
                    e.target.closest('.copy-code-button')) {
                    
                    const button = e.target.classList.contains('copy-code-button') 
                        ? e.target 
                        : e.target.closest('.copy-code-button');
                    
                    this.handleCopyClick(button);
                }
            });

            // Add keyboard support
            document.addEventListener('keydown', (e) => {
                if (e.target.classList.contains('copy-code-button')) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.handleCopyClick(e.target);
                    }
                }
            });
        }

        async handleCopyClick(button) {
            const codeBlock = button.closest('.highlight');
            if (!codeBlock) return;

            const codeText = this.getCodeText(codeBlock);
            
            try {
                await this.copyToClipboard(codeText);
                this.showCopySuccess(button);
                this.trackCopyEvent(codeBlock);
            } catch (error) {
                console.error('Failed to copy code:', error);
                this.showCopyError(button);
            }
        }

        getCodeText(codeBlock) {
            // Try different selectors to get the code content
            let codeElement = codeBlock.querySelector('code');
            
            // Handle Rouge highlighting structure
            if (!codeElement) {
                codeElement = codeBlock.querySelector('.code code') || 
                             codeBlock.querySelector('pre') ||
                             codeBlock;
            }

            if (!codeElement) return '';

            // Get text content, preserving line breaks
            let text = codeElement.textContent || codeElement.innerText || '';
            
            // Clean up the text
            text = text.replace(/^\n+|\n+$/g, ''); // Remove leading/trailing newlines
            
            return text;
        }

        async copyToClipboard(text) {
            // Modern clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                return await navigator.clipboard.writeText(text);
            }
            
            // Fallback for older browsers
            return this.fallbackCopyToClipboard(text);
        }

        fallbackCopyToClipboard(text) {
            return new Promise((resolve, reject) => {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                textArea.style.opacity = '0';
                
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    const successful = document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    if (successful) {
                        resolve();
                    } else {
                        reject(new Error('Copy command failed'));
                    }
                } catch (error) {
                    document.body.removeChild(textArea);
                    reject(error);
                }
            });
        }

        showCopySuccess(button) {
            const originalContent = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i>已复制';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.classList.remove('copied');
            }, 2000);
        }

        showCopyError(button) {
            const originalContent = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-times"></i>复制失败';
            button.classList.add('error');
            
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.classList.remove('error');
            }, 2000);
        }

        trackCopyEvent(codeBlock) {
            // Track copy events for analytics
            const language = codeBlock.getAttribute('data-lang') || 'unknown';
            const pageUrl = window.location.pathname;
            
            // Send to analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'code_copy', {
                    'language': language,
                    'page': pageUrl
                });
            }

            // Custom event for other tracking systems
            document.dispatchEvent(new CustomEvent('codeCopied', {
                detail: {
                    language: language,
                    page: pageUrl,
                    timestamp: new Date().toISOString()
                }
            }));
        }

        // Add copy buttons to dynamically loaded content
        refresh() {
            this.addCopyButtons();
        }

        // Batch copy all code blocks on page
        copyAllCode() {
            const codeBlocks = document.querySelectorAll('.highlight');
            const allCode = Array.from(codeBlocks)
                .map(block => {
                    const language = block.getAttribute('data-lang') || 'text';
                    const code = this.getCodeText(block);
                    return `// ${language.toUpperCase()}\n${code}`;
                })
                .join('\n\n' + '='.repeat(50) + '\n\n');

            this.copyToClipboard(allCode)
                .then(() => {
                    this.showNotification('所有代码已复制到剪贴板', 'success');
                })
                .catch(() => {
                    this.showNotification('复制失败，请手动复制', 'error');
                });
        }

        showNotification(message, type) {
            // Create notification
            const notification = document.createElement('div');
            notification.className = `copy-notification copy-notification-${type}`;
            notification.textContent = message;
            
            // Style notification
            Object.assign(notification.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                background: type === 'success' ? 'var(--success-color)' : 'var(--error-color)',
                color: 'white',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: '9999',
                transform: 'translateX(100%)',
                transition: 'transform 0.3s ease-in-out',
                fontSize: 'var(--text-sm)',
                fontWeight: '500'
            });

            document.body.appendChild(notification);

            // Show notification
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);

            // Hide notification
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
    }

    // Initialize code copy manager when app is ready
    document.addEventListener('appInitialized', () => {
        window.codeCopyManager = new CodeCopyManager();
    });

    // Re-initialize when new content is loaded
    document.addEventListener('contentLoaded', () => {
        if (window.codeCopyManager) {
            window.codeCopyManager.refresh();
        }
    });

})();