// Element comparison functionality
let elementsToCompare = [];
let contextMenu = null;

// Initialize comparison feature
function initializeComparison() {
    // Add element context menu (right-click)
    setupElementContextMenu();
    
    // Set up compare checkbox
    setupCompareCheckbox();
    
    // Set up comparison container controls
    setupCompareControls();
}

// Create and handle element context menu
function setupElementContextMenu() {
    // Create context menu
    contextMenu = document.createElement('div');
    contextMenu.classList.add('context-menu');
    contextMenu.style.display = 'none';
    document.body.appendChild(contextMenu);
    
    // Add event listeners to elements for context menu
    document.querySelectorAll('.element').forEach(elementDiv => {
        elementDiv.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            
            const atomicNumber = parseInt(this.dataset.atomicNumber);
            const element = elements.find(el => el.number === atomicNumber);
            
            if (element) {
                showContextMenu(e.pageX, e.pageY, element);
            }
        });
    });
    
    // Hide context menu when clicking elsewhere
    document.addEventListener('click', function() {
        contextMenu.style.display = 'none';
    });
}

// Show the context menu for an element
function showContextMenu(x, y, element) {
    // Check if element is already in comparison
    const isInComparison = elementsToCompare.some(el => el.number === element.number);
    
    // Clear previous menu items
    contextMenu.innerHTML = '';
    
    // Add menu item to add/remove from comparison
    const compareItem = document.createElement('div');
    compareItem.classList.add('context-menu-item');
    compareItem.textContent = isInComparison ? 'Remove from Comparison' : 'Add to Comparison';
    compareItem.addEventListener('click', function() {
        if (isInComparison) {
            removeElementFromComparison(element);
        } else {
            addElementToComparison(element);
        }
        
        // Hide context menu
        contextMenu.style.display = 'none';
    });
    
    // Add menu item to view element details
    const detailsItem = document.createElement('div');
    detailsItem.classList.add('context-menu-item');
    detailsItem.textContent = 'View Details';
    detailsItem.addEventListener('click', function() {
        showElementDetails(element);
        
        // Hide context menu
        contextMenu.style.display = 'none';
    });
    
    // Append menu items
    contextMenu.appendChild(compareItem);
    contextMenu.appendChild(detailsItem);
    
    // Position and show context menu
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    
    // Adjust position if menu is too close to the edge
    const menuRect = contextMenu.getBoundingClientRect();
    if (menuRect.right > window.innerWidth) {
        contextMenu.style.left = `${x - menuRect.width}px`;
    }
    if (menuRect.bottom > window.innerHeight) {
        contextMenu.style.top = `${y - menuRect.height}px`;
    }
    
    contextMenu.style.display = 'block';
}

// Set up compare checkbox in element details
function setupCompareCheckbox() {
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'compare-checkbox') {
            const elementDetails = document.getElementById('element-details');
            const nameElement = elementDetails.querySelector('#detail-name');
            
            if (nameElement) {
                const elementName = nameElement.textContent;
                const element = elements.find(el => el.name === elementName);
                
                if (element) {
                    if (e.target.checked) {
                        addElementToComparison(element);
                    } else {
                        removeElementFromComparison(element);
                    }
                }
            }
        }
    });
}

// Set up comparison container controls
function setupCompareControls() {
    // Close comparison container
    const closeCompare = document.getElementById('close-compare');
    if (closeCompare) {
        closeCompare.addEventListener('click', function() {
            const compareContainer = document.getElementById('compare-container');
            compareContainer.classList.remove('active');
        });
    }
    
    // Clear all elements from comparison
    const clearCompare = document.getElementById('clear-compare');
    if (clearCompare) {
        clearCompare.addEventListener('click', function() {
            elementsToCompare = [];
            updateComparisonView();
            
            // Uncheck the compare checkbox if it's checked
            const compareCheckbox = document.getElementById('compare-checkbox');
            if (compareCheckbox && compareCheckbox.checked) {
                compareCheckbox.checked = false;
            }
        });
    }
}

// Add element to comparison
function addElementToComparison(element) {
    // Check if element is already in comparison
    if (!elementsToCompare.some(el => el.number === element.number)) {
        // Limit to 4 elements for better UI
        if (elementsToCompare.length >= 4) {
            alert('You can compare up to 4 elements at a time. Please remove an element before adding another.');
            return;
        }
        
        elementsToCompare.push(element);
        updateComparisonView();
        
        // Check the compare checkbox if viewing this element
        const detailName = document.getElementById('detail-name');
        if (detailName && detailName.textContent === element.name) {
            const compareCheckbox = document.getElementById('compare-checkbox');
            if (compareCheckbox) {
                compareCheckbox.checked = true;
            }
        }
    }
}

// Remove element from comparison
function removeElementFromComparison(element) {
    elementsToCompare = elementsToCompare.filter(el => el.number !== element.number);
    updateComparisonView();
    
    // Uncheck the compare checkbox if viewing this element
    const detailName = document.getElementById('detail-name');
    if (detailName && detailName.textContent === element.name) {
        const compareCheckbox = document.getElementById('compare-checkbox');
        if (compareCheckbox) {
            compareCheckbox.checked = false;
        }
    }
}

// Update the comparison view
function updateComparisonView() {
    const compareContainer = document.getElementById('compare-container');
    const compareElements = document.getElementById('compare-elements');
    const emptyMessage = document.getElementById('compare-empty-message');
    
    if (!compareContainer || !compareElements || !emptyMessage) return;
    
    // Clear previous elements
    compareElements.innerHTML = '';
    
    // Show or hide empty message
    if (elementsToCompare.length === 0) {
        emptyMessage.style.display = 'block';
        compareContainer.classList.remove('active');
        return;
    } else {
        emptyMessage.style.display = 'none';
        compareContainer.classList.add('active');
    }
    
    // Add elements to comparison
    elementsToCompare.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('compare-element');
        
        // Create element header
        const header = document.createElement('div');
        header.classList.add('compare-element-header');
        header.style.backgroundColor = getCategoryColor(element.category);
        
        const symbol = document.createElement('div');
        symbol.classList.add('compare-symbol');
        symbol.textContent = element.symbol;
        
        const name = document.createElement('div');
        name.classList.add('compare-name');
        name.textContent = element.name;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-compare');
        removeButton.innerHTML = '&times;';
        removeButton.title = 'Remove from comparison';
        removeButton.addEventListener('click', function() {
            removeElementFromComparison(element);
        });
        
        header.appendChild(symbol);
        header.appendChild(name);
        header.style.position = 'relative';
        header.appendChild(removeButton);
        
        // Create element content
        const content = document.createElement('div');
        content.classList.add('compare-element-content');
        
        // Add properties to compare
        const propertiesToCompare = [
            { name: 'Atomic Number', value: element.number },
            { name: 'Atomic Mass', value: element.mass + ' u' },
            { name: 'Category', value: element.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) },
            { name: 'Electron Configuration', value: element.electronConfig },
            { name: 'Electronegativity', value: element.electronegativity !== null ? element.electronegativity : 'N/A' },
            { name: 'Atomic Radius', value: element.atomicRadius !== null ? element.atomicRadius + ' pm' : 'N/A' },
            { name: 'Ionization Energy', value: element.ionizationEnergy !== null ? element.ionizationEnergy + ' eV' : 'N/A' },
            { name: 'Melting Point', value: element.meltingPoint !== null ? element.meltingPoint + ' °C' : 'N/A' },
            { name: 'Boiling Point', value: element.boilingPoint !== null ? element.boilingPoint + ' °C' : 'N/A' }
        ];
        
        propertiesToCompare.forEach(prop => {
            const propertyDiv = document.createElement('div');
            propertyDiv.classList.add('compare-property');
            
            const propertyName = document.createElement('div');
            propertyName.classList.add('compare-property-name');
            propertyName.textContent = prop.name;
            
            const propertyValue = document.createElement('div');
            propertyValue.classList.add('compare-property-value');
            propertyValue.textContent = prop.value;
            
            propertyDiv.appendChild(propertyName);
            propertyDiv.appendChild(propertyValue);
            content.appendChild(propertyDiv);
        });
        
        elementDiv.appendChild(header);
        elementDiv.appendChild(content);
        compareElements.appendChild(elementDiv);
    });
}

// Update the showElementDetails function to update compare checkbox state
function updateCompareCheckbox(element) {
    const compareCheckbox = document.getElementById('compare-checkbox');
    if (compareCheckbox) {
        compareCheckbox.checked = elementsToCompare.some(el => el.number === element.number);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeComparison();
});