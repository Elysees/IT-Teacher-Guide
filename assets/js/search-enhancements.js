// ===== Search Enhancements =====

(function() {
    'use strict';

    // Search Analytics
    class SearchAnalytics {
        constructor() {
            this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
            this.popularQueries = JSON.parse(localStorage.getItem('popularQueries') || '{}');
        }

        trackSearch(query, resultCount) {
            // Add to search history
            const searchEntry = {
                query: query,
                timestamp: new Date().toISOString(),
                resultCount: resultCount
            };

            this.searchHistory.unshift(searchEntry);
            this.searchHistory = this.searchHistory.slice(0, 50); // Keep last 50 searches

            // Update popular queries
            this.popularQueries[query] = (this.popularQueries[query] || 0) + 1;

            // Save to localStorage
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
            localStorage.setItem('popularQueries', JSON.stringify(this.popularQueries));

            // Send to analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'search', {
                    'search_term': query,
                    'result_count': resultCount
                });
            }
        }

        getPopularQueries(limit = 5) {
            return Object.entries(this.popularQueries)
                .sort(([,a], [,b]) => b - a)
                .slice(0, limit)
                .map(([query]) => query);
        }

        getRecentSearches(limit = 5) {
            return this.searchHistory
                .slice(0, limit)
                .map(entry => entry.query);
        }
    }

    // Search Suggestions
    class SearchSuggestions {
        constructor(searchData) {
            this.searchData = searchData;
            this.suggestions = this.buildSuggestions();
        }

        buildSuggestions() {
            const suggestions = new Set();
            
            this.searchData.forEach(item => {
                // Add title words
                this.extractWords(item.title).forEach(word => suggestions.add(word));
                
                // Add tags
                if (item.tags) {
                    this.extractWords(item.tags).forEach(word => suggestions.add(word));
                }
                
                // Add category
                suggestions.add(item.category);
            });

            return Array.from(suggestions).filter(word => word.length > 2);
        }

        extractWords(text) {
            return text.toLowerCase()
                .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ')
                .split(/\s+/)
                .filter(word => word.length > 1);
        }

        getSuggestions(query, limit = 8) {
            if (!query || query.length < 2) return [];

            const queryLower = query.toLowerCase();
            const matches = this.suggestions.filter(suggestion => 
                suggestion.includes(queryLower)
            );

            // Sort by relevance (exact matches first, then by length)
            matches.sort((a, b) => {
                const aExact = a.startsWith(queryLower) ? 0 : 1;
                const bExact = b.startsWith(queryLower) ? 0 : 1;
                
                if (aExact !== bExact) return aExact - bExact;
                return a.length - b.length;
            });

            return matches.slice(0, limit);
        }
    }

    // Search Autocomplete
    class SearchAutocomplete {
        constructor(searchInput, searchManager) {
            this.searchInput = searchInput;
            this.searchManager = searchManager;
            this.autocompleteContainer = null;
            this.suggestions = [];
            this.selectedIndex = -1;
            
            this.init();
        }

        init() {
            if (!this.searchInput) return;

            this.createAutocompleteContainer();
            this.bindEvents();
        }

        createAutocompleteContainer() {
            this.autocompleteContainer = document.createElement('div');
            this.autocompleteContainer.className = 'search-autocomplete';
            this.autocompleteContainer.style.display = 'none';
            
            this.searchInput.parentNode.appendChild(this.autocompleteContainer);
        }

        bindEvents() {
            this.searchInput.addEventListener('input', (e) => {
                this.handleInput(e.target.value);
            });

            this.searchInput.addEventListener('keydown', (e) => {
                this.handleKeydown(e);
            });

            document.addEventListener('click', (e) => {
                if (!this.searchInput.contains(e.target) && 
                    !this.autocompleteContainer.contains(e.target)) {
                    this.hideAutocomplete();
                }
            });
        }

        handleInput(query) {
            if (query.length < 2) {
                this.hideAutocomplete();
                return;
            }

            const suggestions = this.searchManager.searchSuggestions?.getSuggestions(query) || [];
            this.showSuggestions(suggestions);
        }

        handleKeydown(e) {
            if (!this.isVisible()) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.selectedIndex = Math.min(this.selectedIndex + 1, this.suggestions.length - 1);
                    this.updateSelection();
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
                    this.updateSelection();
                    break;
                    
                case 'Enter':
                    if (this.selectedIndex >= 0) {
                        e.preventDefault();
                        this.selectSuggestion(this.suggestions[this.selectedIndex]);
                    }
                    break;
                    
                case 'Escape':
                    this.hideAutocomplete();
                    break;
            }
        }

        showSuggestions(suggestions) {
            this.suggestions = suggestions;
            this.selectedIndex = -1;

            if (suggestions.length === 0) {
                this.hideAutocomplete();
                return;
            }

            this.autocompleteContainer.innerHTML = suggestions
                .map((suggestion, index) => 
                    `<div class="autocomplete-item" data-index="${index}">${suggestion}</div>`
                )
                .join('');

            // Add click handlers
            this.autocompleteContainer.querySelectorAll('.autocomplete-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    this.selectSuggestion(suggestions[index]);
                });
            });

            this.autocompleteContainer.style.display = 'block';
        }

        hideAutocomplete() {
            this.autocompleteContainer.style.display = 'none';
            this.selectedIndex = -1;
        }

        updateSelection() {
            const items = this.autocompleteContainer.querySelectorAll('.autocomplete-item');
            items.forEach((item, index) => {
                item.classList.toggle('selected', index === this.selectedIndex);
            });
        }

        selectSuggestion(suggestion) {
            this.searchInput.value = suggestion;
            this.hideAutocomplete();
            this.searchManager.handleSearchInput(suggestion);
        }

        isVisible() {
            return this.autocompleteContainer.style.display !== 'none';
        }
    }

    // Enhanced Search Results
    class SearchResultsEnhancer {
        static enhanceResults(results, query) {
            return results.map(result => {
                // Add search snippet
                result.snippet = this.generateSnippet(result, query);
                
                // Add relevance indicators
                result.relevanceIndicators = this.getRelevanceIndicators(result, query);
                
                return result;
            });
        }

        static generateSnippet(result, query, maxLength = 150) {
            const content = result.content || result.excerpt || '';
            const queryTerms = query.toLowerCase().split(/\s+/);
            
            // Find the best position to show snippet
            let bestPosition = 0;
            let maxMatches = 0;
            
            for (let i = 0; i < content.length - maxLength; i += 20) {
                const snippet = content.substring(i, i + maxLength).toLowerCase();
                const matches = queryTerms.reduce((count, term) => {
                    return count + (snippet.includes(term) ? 1 : 0);
                }, 0);
                
                if (matches > maxMatches) {
                    maxMatches = matches;
                    bestPosition = i;
                }
            }
            
            let snippet = content.substring(bestPosition, bestPosition + maxLength);
            
            // Ensure we don't cut words
            if (bestPosition > 0) {
                const firstSpace = snippet.indexOf(' ');
                if (firstSpace > 0) snippet = snippet.substring(firstSpace + 1);
                snippet = '...' + snippet;
            }
            
            if (bestPosition + maxLength < content.length) {
                const lastSpace = snippet.lastIndexOf(' ');
                if (lastSpace > 0) snippet = snippet.substring(0, lastSpace);
                snippet = snippet + '...';
            }
            
            return snippet;
        }

        static getRelevanceIndicators(result, query) {
            const indicators = [];
            
            if (result.title && result.title.toLowerCase().includes(query.toLowerCase())) {
                indicators.push('标题匹配');
            }
            
            if (result.tags && result.tags.toLowerCase().includes(query.toLowerCase())) {
                indicators.push('标签匹配');
            }
            
            if (result.score && result.score > 1) {
                indicators.push('高相关性');
            }
            
            return indicators;
        }
    }

    // Initialize enhancements when search manager is ready
    document.addEventListener('appInitialized', () => {
        if (window.searchManager) {
            // Add analytics
            window.searchManager.analytics = new SearchAnalytics();
            
            // Add suggestions
            window.searchManager.searchSuggestions = new SearchSuggestions(
                window.searchManager.searchData
            );
            
            // Add autocomplete
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                window.searchManager.autocomplete = new SearchAutocomplete(
                    searchInput, 
                    window.searchManager
                );
            }
            
            // Enhance the original performSearch method
            const originalPerformSearch = window.searchManager.performSearch;
            window.searchManager.performSearch = function(query) {
                const results = originalPerformSearch.call(this, query);
                
                // Track search
                if (this.analytics) {
                    this.analytics.trackSearch(query, results?.length || 0);
                }
                
                return results;
            };
            
            // Enhance the original displayResults method
            const originalDisplayResults = window.searchManager.displayResults;
            window.searchManager.displayResults = function(results, query) {
                // Enhance results
                const enhancedResults = SearchResultsEnhancer.enhanceResults(results, query);
                return originalDisplayResults.call(this, enhancedResults, query);
            };
        }
    });

    // Export for global access
    window.SearchAnalytics = SearchAnalytics;
    window.SearchSuggestions = SearchSuggestions;
    window.SearchAutocomplete = SearchAutocomplete;
    window.SearchResultsEnhancer = SearchResultsEnhancer;

})();