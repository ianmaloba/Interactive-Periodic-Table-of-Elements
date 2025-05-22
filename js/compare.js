// Element comparison functionality
let elementsToCompare = [];
let contextMenu = null;

// Initialize comparison feature
function initializeComparison() {
    console.log("Initializing comparison feature");
    
    // Create context menu if it doesn't exist
    if (!contextMenu) {
        contextMenu = document.createElement('div');
        contextMenu.classList.add('context-menu');
        contextMenu.style.display = 'none';
        document.body.appendChild(contextMenu);
    }
    
    // Set up compare checkbox
    setupCompareCheckbox();
    
    // Set up comparison container controls
    setupCompareControls();
    
    // Add direct event listener to the periodic table for delegation
    const periodicTable = document.getElementById('periodic-table');
    if (periodicTable) {
        // Remove any existing handlers first to avoid duplicates
        periodicTable.removeEventListener('contextmenu', handleTableContextMenu);
        periodicTable.addEventListener('contextmenu', handleTableContextMenu);
        console.log("Added context menu handler to periodic table");
    } else {
        console.log("Periodic table not found, will try again after delay");
        // Try again after a short delay
        setTimeout(function() {
            const periodicTable = document.getElementById('periodic-table');
            if (periodicTable) {
                periodicTable.removeEventListener('contextmenu', handleTableContextMenu);
                periodicTable.addEventListener('contextmenu', handleTableContextMenu);
                console.log("Added context menu handler to periodic table (delayed)");
            } else {
                console.error("Periodic table element not found even after delay");
            }
        }, 1000);
    }
    
    // Hide context menu when clicking elsewhere
    document.addEventListener('click', function() {
        if (contextMenu) {
            contextMenu.style.display = 'none';
        }
    });
    
    // Check if we have any elements to compare from a previous session
    updateAllElementVisualIndicators();
}

// Handle context menu on the table using event delegation
function handleTableContextMenu(e) {
    // Check if the clicked element is an element or inside an element
    const elementDiv = e.target.closest('.element');
    
    if (elementDiv) {
        // Found an element - prevent default browser context menu
        e.preventDefault();
        
        const atomicNumber = parseInt(elementDiv.dataset.atomicNumber);
        const element = elements.find(el => el.number === atomicNumber);
        
        if (element) {
            showContextMenu(e.pageX, e.pageY, element);
            console.log(`Context menu shown for element ${element.name}`);
        }
    }
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
    setTimeout(() => {
        const menuRect = contextMenu.getBoundingClientRect();
        if (menuRect.right > window.innerWidth) {
            contextMenu.style.left = `${x - menuRect.width}px`;
        }
        if (menuRect.bottom > window.innerHeight) {
            contextMenu.style.top = `${y - menuRect.height}px`;
        }
    }, 0);
    
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
            clearAllComparisons();
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
        
        // Add visual indicator to the element in the table
        const elementDiv = document.querySelector(`.element[data-atomic-number="${element.number}"]`);
        if (elementDiv) {
            elementDiv.classList.add('in-comparison');
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
    
    // Remove visual indicator from the element in the table
    const elementDiv = document.querySelector(`.element[data-atomic-number="${element.number}"]`);
    if (elementDiv) {
        elementDiv.classList.remove('in-comparison');
    }
}

// Clear all comparisons
function clearAllComparisons() {
    // Remove visual indicators from all elements
    elementsToCompare.forEach(element => {
        const elementDiv = document.querySelector(`.element[data-atomic-number="${element.number}"]`);
        if (elementDiv) {
            elementDiv.classList.remove('in-comparison');
        }
    });
    
    // Clear the array
    elementsToCompare = [];
    updateComparisonView();
    
    // Uncheck the compare checkbox if it's checked
    const compareCheckbox = document.getElementById('compare-checkbox');
    if (compareCheckbox && compareCheckbox.checked) {
        compareCheckbox.checked = false;
    }
}

// Update all element visual indicators
function updateAllElementVisualIndicators() {
    // First remove all in-comparison classes
    document.querySelectorAll('.element.in-comparison').forEach(el => {
        el.classList.remove('in-comparison');
    });
    
    // Then add them back for elements that should have them
    elementsToCompare.forEach(element => {
        const elementDiv = document.querySelector(`.element[data-atomic-number="${element.number}"]`);
        if (elementDiv) {
            elementDiv.classList.add('in-comparison');
        }
    });
}

// Update the comparison view
function updateComparisonView() {
    // First ensure all visual indicators are correct
    updateAllElementVisualIndicators();
    
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

// Update compare checkbox state
function updateCompareCheckbox(element) {
    const compareCheckbox = document.getElementById('compare-checkbox');
    if (compareCheckbox) {
        compareCheckbox.checked = elementsToCompare.some(el => el.number === element.number);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing comparison feature");
    initializeComparison();
});