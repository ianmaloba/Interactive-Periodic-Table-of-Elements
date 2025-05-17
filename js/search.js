// Search functionality for periodic table
let searchTimeout;
const searchDelay = 300; // milliseconds to wait after typing stops

function initializeSearch() {
    const searchInput = document.getElementById('element-search');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    // Add event listener for input
    searchInput.addEventListener('input', function() {
        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Set new timeout for search to avoid searching on every keystroke
        searchTimeout = setTimeout(() => {
            const query = this.value.trim().toLowerCase();
            
            // Hide results if query is empty
            if (query === '') {
                searchResults.style.display = 'none';
                return;
            }
            
            // Perform search
            const results = searchElements(query);
            displaySearchResults(results);
        }, searchDelay);
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.search-bar')) {
            searchResults.style.display = 'none';
        }
    });
    
    // Add focus event to show results if there's a query
    searchInput.addEventListener('focus', function() {
        const query = this.value.trim().toLowerCase();
        if (query !== '') {
            const results = searchElements(query);
            displaySearchResults(results);
        }
    });
}

// Search elements by name, symbol, number, or category
function searchElements(query) {
    // Return all elements if query is empty
    if (!query) return [];
    
    return elements.filter(element => {
        return element.name.toLowerCase().includes(query) ||
               element.symbol.toLowerCase().includes(query) ||
               element.number.toString().includes(query) ||
               element.category.toLowerCase().replace('-', ' ').includes(query);
    }).slice(0, 10); // Limit to 10 results
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    // Clear previous results
    searchResults.innerHTML = '';
    
    // Show or hide results container
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No elements found</div>';
        searchResults.style.display = 'block';
        return;
    }
    
    // Create result items
    results.forEach(element => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.innerHTML = `
            <span class="result-symbol">${element.symbol}</span>
            <span>${element.name}</span>
            <span class="result-number">${element.number}</span>
            <div class="result-category">${element.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
        `;
        
        // Add click event to show element details
        resultItem.addEventListener('click', () => {
            // Find the element in the table and show its details
            showElementDetails(element);
            
            // Hide search results
            searchResults.style.display = 'none';
            
            // Clear search input
            document.getElementById('element-search').value = '';
            
            // Highlight the element in the table
            highlightElement(element.number);
        });
        
        searchResults.appendChild(resultItem);
    });
    
    searchResults.style.display = 'block';
}

// Highlight an element in the table
function highlightElement(atomicNumber) {
    // Remove any existing highlight
    document.querySelectorAll('.element').forEach(el => {
        el.classList.remove('highlight-pulse');
    });
    
    // Add highlight class to the element
    const elementDiv = document.querySelector(`.element[data-atomic-number="${atomicNumber}"]`);
    if (elementDiv) {
        // Scroll to the element
        elementDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add a pulse animation
        elementDiv.classList.add('highlight-pulse');
        
        // Remove the highlight after animation completes
        setTimeout(() => {
            elementDiv.classList.remove('highlight-pulse');
        }, 2000);
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});