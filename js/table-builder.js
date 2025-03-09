// table-builder.js - Contains functions to build and update the periodic table

// Function to create the table
function buildPeriodicTable() {
    const periodicTable = document.getElementById('periodic-table');
    periodicTable.innerHTML = '';
    
    // Create the table based on the layout
    tableLayout.forEach((row, rowIndex) => {
        row.forEach((atomicNumber, colIndex) => {
            if (atomicNumber === null) {
                const placeholder = document.createElement('div');
                placeholder.classList.add('placeholder');
                periodicTable.appendChild(placeholder);
            } else {
                const element = elements.find(e => e.number === atomicNumber);
                if (element) {
                    const elementDiv = createElementDiv(element);
                    periodicTable.appendChild(elementDiv);
                    
                    // Add event listeners
                    elementDiv.addEventListener('click', () => showElementDetails(element));
                }
            }
        });
    });
    
    // Set default view
    updateTableView('standard');
}

// Create a single element div
function createElementDiv(element) {
    const elementDiv = document.createElement('div');
    elementDiv.classList.add('element');
    elementDiv.dataset.atomicNumber = element.number;
    
    const elementInner = document.createElement('div');
    elementInner.classList.add('element-inner');
    
    const atomicNumber = document.createElement('div');
    atomicNumber.classList.add('atomic-number');
    atomicNumber.textContent = element.number;
    
    const symbol = document.createElement('div');
    symbol.classList.add('symbol');
    symbol.textContent = element.symbol;
    
    const name = document.createElement('div');
    name.classList.add('name');
    name.textContent = element.name;
    
    const mass = document.createElement('div');
    mass.classList.add('mass');
    mass.textContent = element.mass;
    
    elementInner.appendChild(atomicNumber);
    elementInner.appendChild(symbol);
    elementInner.appendChild(name);
    elementInner.appendChild(mass);
    elementDiv.appendChild(elementInner);
    
    return elementDiv;
}

// Update the table view based on selected property
function updateTableView(view) {
    const periodicTable = document.getElementById('periodic-table');
    const elementDivs = document.querySelectorAll('.element');
    const gradientLegend = document.getElementById('gradient-legend');
    const gradientTitle = document.getElementById('gradient-title');
    const minValue = document.getElementById('min-value');
    const maxValue = document.getElementById('max-value');
    
    // Reset active button states
    document.querySelectorAll('.view-toggle button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Set the active button
    document.getElementById(`${view}-view`).classList.add('active');
    
    // Remove previous property view classes
    periodicTable.classList.remove('property-view');
    
    // Hide gradient legend by default
    gradientLegend.classList.remove('active');
    
    elementDivs.forEach(el => {
        const atomicNumber = parseInt(el.dataset.atomicNumber);
        const element = elements.find(e => e.number === atomicNumber);
        
        if (element) {
            // Reset styles
            el.style.backgroundColor = '';
            el.style.color = '';
            
            if (view === 'standard') {
                // Use the CSS variable for the category color
                const categoryClass = element.category.toLowerCase().replace(/ /g, '-');
                el.style.backgroundColor = `var(--${categoryClass})`;
                
                // Add contrast for better readability
                if (['alkali-metal', 'alkaline-earth', 'noble-gas', 'lanthanide', 'actinide'].includes(element.category)) {
                    el.style.color = '#000';
                } else {
                    el.style.color = '#fff';
                }
            } else {
                // Handle property views
                periodicTable.classList.add('property-view');
                gradientLegend.classList.add('active');
                
                // Set text color for contrast
                el.style.color = '#000';
                
                if (view === 'electronegativity') {
                    gradientTitle.textContent = 'Electronegativity';
                    minValue.textContent = minElectronegativity.toFixed(2);
                    maxValue.textContent = maxElectronegativity.toFixed(2);
                    
                    if (element.electronegativity !== null) {
                        const color = getColorForValue(
                            element.electronegativity, 
                            minElectronegativity, 
                            maxElectronegativity
                        );
                        el.style.backgroundColor = color;
                        
                        // Add the value to the element for visibility
                        const valueElement = el.querySelector('.value') || document.createElement('div');
                        valueElement.classList.add('value');
                        valueElement.textContent = element.electronegativity.toFixed(1);
                        valueElement.style.position = 'absolute';
                        valueElement.style.bottom = '20px';
                        valueElement.style.width = '100%';
                        valueElement.style.textAlign = 'center';
                        valueElement.style.fontSize = '0.7em';
                        valueElement.style.fontWeight = 'bold';
                        
                        if (!el.querySelector('.value')) {
                            el.appendChild(valueElement);
                        }
                    } else {
                        el.style.backgroundColor = '#e0e0e0';
                    }
                } else if (view === 'atomic-radius') {
                    gradientTitle.textContent = 'Atomic Radius (pm)';
                    minValue.textContent = minAtomicRadius;
                    maxValue.textContent = maxAtomicRadius;
                    
                    if (element.atomicRadius !== null) {
                        const color = getColorForValue(
                            element.atomicRadius, 
                            minAtomicRadius, 
                            maxAtomicRadius
                        );
                        el.style.backgroundColor = color;
                        
                        // Add the value to the element
                        const valueElement = el.querySelector('.value') || document.createElement('div');
                        valueElement.classList.add('value');
                        valueElement.textContent = element.atomicRadius;
                        valueElement.style.position = 'absolute';
                        valueElement.style.bottom = '20px';
                        valueElement.style.width = '100%';
                        valueElement.style.textAlign = 'center';
                        valueElement.style.fontSize = '0.7em';
                        valueElement.style.fontWeight = 'bold';
                        
                        if (!el.querySelector('.value')) {
                            el.appendChild(valueElement);
                        }
                    } else {
                        el.style.backgroundColor = '#e0e0e0';
                    }
                } else if (view === 'ionization-energy') {
                    gradientTitle.textContent = 'Ionization Energy (eV)';
                    minValue.textContent = minIonizationEnergy.toFixed(2);
                    maxValue.textContent = maxIonizationEnergy.toFixed(2);
                    
                    if (element.ionizationEnergy !== null) {
                        const color = getColorForValue(
                            element.ionizationEnergy, 
                            minIonizationEnergy, 
                            maxIonizationEnergy
                        );
                        el.style.backgroundColor = color;
                        
                        // Add the value to the element
                        const valueElement = el.querySelector('.value') || document.createElement('div');
                        valueElement.classList.add('value');
                        valueElement.textContent = element.ionizationEnergy.toFixed(1);
                        valueElement.style.position = 'absolute';
                        valueElement.style.bottom = '20px';
                        valueElement.style.width = '100%';
                        valueElement.style.textAlign = 'center';
                        valueElement.style.fontSize = '0.7em';
                        valueElement.style.fontWeight = 'bold';
                        
                        if (!el.querySelector('.value')) {
                            el.appendChild(valueElement);
                        }
                    } else {
                        el.style.backgroundColor = '#e0e0e0';
                    }
                }
            }
        }
    });
}