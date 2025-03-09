// visualizations.js - Functions for creating atomic and hybridization visualizations

// Update the atomic model visualization
function updateAtomicModel(element) {
    const atomicModel = document.getElementById('atomic-model');
    atomicModel.innerHTML = '';
    
    // Add nucleus
    const nucleus = document.createElement('div');
    nucleus.classList.add('nucleus');
    nucleus.textContent = element.symbol;
    atomicModel.appendChild(nucleus);
    
    // Add electron shells
    element.shells.forEach((electrons, shellIndex) => {
        const shellRadius = 25 + (shellIndex + 1) * 25;
        
        const shell = document.createElement('div');
        shell.classList.add('electron-shell');
        shell.style.width = `${shellRadius * 2}px`;
        shell.style.height = `${shellRadius * 2}px`;
        atomicModel.appendChild(shell);
        
        // Add electrons to the shell
        for (let i = 0; i < electrons; i++) {
            const angle = (i * 2 * Math.PI) / electrons;
            const electronX = shellRadius * Math.cos(angle);
            const electronY = shellRadius * Math.sin(angle);
            
            const electron = document.createElement('div');
            electron.classList.add('electron');
            electron.style.left = `calc(50% + ${electronX}px)`;
            electron.style.top = `calc(50% + ${electronY}px)`;
            
            // Animate electrons with GSAP
            gsap.to(electron, {
                duration: 2 + shellIndex * 1.5,
                rotation: 360,
                transformOrigin: `${-electronX}px ${-electronY}px`,
                repeat: -1,
                ease: 'linear',
            });
            
            atomicModel.appendChild(electron);
        }
    });
}

// Update the hybridization model visualization
function updateHybridizationModel(element) {
    const container = document.getElementById('hybridization-container');
    container.innerHTML = '';
    
    if (element.hybridization[0] === 'None') {
        const message = document.createElement('p');
        message.textContent = `${element.name} typically doesn't form hybrid orbitals.`;
        container.appendChild(message);
        return;
    }
    
    // Show a simple representation of orbitals and hybridization
    const hybridTypes = element.hybridization[0] !== 'None' ? element.hybridization[0].split(', ') : [];
    
    if (hybridTypes.includes('sp')) {
        createHybridizationVisual(container, 'sp', ['s', 'p'], ['sp', 'sp']);
    } else if (hybridTypes.includes('sp²')) {
        createHybridizationVisual(container, 'sp²', ['s', 'p', 'p'], ['sp²', 'sp²', 'sp²']);
    } else if (hybridTypes.includes('sp³')) {
        createHybridizationVisual(container, 'sp³', ['s', 'p', 'p', 'p'], ['sp³', 'sp³', 'sp³', 'sp³']);
    } else if (hybridTypes.includes('sp³d')) {
        createHybridizationVisual(container, 'sp³d', ['s', 'p', 'p', 'p', 'd'], ['sp³d', 'sp³d', 'sp³d', 'sp³d', 'sp³d']);
    } else if (hybridTypes.includes('sp³d²')) {
        createHybridizationVisual(container, 'sp³d²', ['s', 'p', 'p', 'p', 'd', 'd'], 
                                ['sp³d²', 'sp³d²', 'sp³d²', 'sp³d²', 'sp³d²', 'sp³d²']);
    } else {
        const message = document.createElement('p');
        message.textContent = `${element.name} has complex hybridization patterns that vary by compound.`;
        container.appendChild(message);
    }
}

// Helper function to create hybridization visual
function createHybridizationVisual(container, hybridType, originalOrbitals, hybridOrbitals) {
    const originalContainer = document.createElement('div');
    originalContainer.style.display = 'flex';
    originalContainer.style.flexDirection = 'column';
    originalContainer.style.alignItems = 'center';
    originalContainer.style.margin = '0 20px';
    
    const hybrid = document.createElement('div');
    hybrid.style.display = 'flex';
    hybrid.style.flexDirection = 'column';
    hybrid.style.alignItems = 'center';
    hybrid.style.margin = '0 20px';
    
    const arrow = document.createElement('div');
    arrow.textContent = '→';
    arrow.style.fontSize = '2rem';
    arrow.style.margin = '0 10px';
    
    const title = document.createElement('h3');
    title.textContent = hybridType + ' Hybridization';
    title.style.marginBottom = '20px';
    title.style.textAlign = 'center';
    
    // Title at the top
    container.appendChild(title);
    
    const visualContainer = document.createElement('div');
    visualContainer.style.display = 'flex';
    visualContainer.style.alignItems = 'center';
    visualContainer.style.justifyContent = 'center';
    
    // Original orbitals
    const originalTitle = document.createElement('p');
    originalTitle.textContent = 'Original Orbitals';
    originalTitle.style.marginBottom = '10px';
    originalContainer.appendChild(originalTitle);
    
    const origOrbitalContainer = document.createElement('div');
    origOrbitalContainer.style.display = 'flex';
    
    originalOrbitals.forEach(orbType => {
        const orbital = document.createElement('div');
        orbital.classList.add('orbital');
        orbital.textContent = orbType;
        
        const label = document.createElement('div');
        label.classList.add('orbital-label');
        label.textContent = orbType + ' orbital';
        
        orbital.appendChild(label);
        origOrbitalContainer.appendChild(orbital);
    });
    
    originalContainer.appendChild(origOrbitalContainer);
    
    // Hybrid orbitals
    const hybridTitle = document.createElement('p');
    hybridTitle.textContent = 'Hybrid Orbitals';
    hybridTitle.style.marginBottom = '10px';
    hybrid.appendChild(hybridTitle);
    
    const hybOrbitalContainer = document.createElement('div');
    hybOrbitalContainer.style.display = 'flex';
    
    hybridOrbitals.forEach(orbType => {
        const orbital = document.createElement('div');
        orbital.classList.add('orbital', 'hybrid');
        orbital.textContent = orbType[0] + orbType[1];
        
        const label = document.createElement('div');
        label.classList.add('orbital-label');
        label.textContent = orbType + ' orbital';
        
        orbital.appendChild(label);
        hybOrbitalContainer.appendChild(orbital);
    });
    
    hybrid.appendChild(hybOrbitalContainer);
    
    // Add all to container
    visualContainer.appendChild(originalContainer);
    visualContainer.appendChild(arrow);
    visualContainer.appendChild(hybrid);
    
    container.appendChild(visualContainer);
}

// Update element details
function updateElementDetails(element) {
    // Update element header and properties
    const detailSymbolBox = document.getElementById('detail-symbol-box');
    const detailName = document.getElementById('detail-name');
    const detailCategory = document.getElementById('detail-category');
    const detailAtomicNumber = document.getElementById('detail-atomic-number');
    const detailAtomicMass = document.getElementById('detail-atomic-mass');
    const detailElectronConfig = document.getElementById('detail-electron-config');
    const detailElectronegativity = document.getElementById('detail-electronegativity');
    const detailAtomicRadius = document.getElementById('detail-atomic-radius');
    const detailIonizationEnergy = document.getElementById('detail-ionization-energy');
    const detailMeltingPoint = document.getElementById('detail-melting-point');
    const detailBoilingPoint = document.getElementById('detail-boiling-point');
    
    // Update the element details
    detailSymbolBox.textContent = element.symbol;
    detailSymbolBox.style.backgroundColor = getCategoryColor(element.category);
    detailName.textContent = element.name;
    detailCategory.textContent = element.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    detailAtomicNumber.textContent = element.number;
    detailAtomicMass.textContent = `${element.mass} u`;
    detailElectronConfig.textContent = element.electronConfig;
    
    detailElectronegativity.textContent = element.electronegativity !== null ? element.electronegativity : 'N/A';
    detailAtomicRadius.textContent = element.atomicRadius !== null ? `${element.atomicRadius} pm` : 'N/A';
    detailIonizationEnergy.textContent = element.ionizationEnergy !== null ? `${element.ionizationEnergy} eV` : 'N/A';
    detailMeltingPoint.textContent = element.meltingPoint !== null ? `${element.meltingPoint} °C` : 'N/A';
    detailBoilingPoint.textContent = element.boilingPoint !== null ? `${element.boilingPoint} °C` : 'N/A';
    
    // Update electron configuration explanation
    document.getElementById('electron-config-detail').textContent = 
        `The electron configuration of ${element.name} is ${element.electronConfig}. ` +
        `This element has ${element.shells.reduce((sum, val) => sum + val, 0)} electrons distributed across ${element.shells.length} energy levels.`;
    
    // Update hybridization details
    document.getElementById('hybridization-detail').textContent = 
        `${element.name} can participate in ${element.hybridization.join(', ')} hybridization, depending on the compounds it forms.`;
    
    // Update applications list
    const applicationsList = document.getElementById('applications-list');
    applicationsList.innerHTML = '';
    element.applications.forEach(app => {
        const listItem = document.createElement('li');
        listItem.textContent = app;
        applicationsList.appendChild(listItem);
    });
    
    // Update properties text
    document.getElementById('properties-detail').textContent = 
        `${element.name} (atomic number ${element.number}) has a mass of ${element.mass} u. ` +
        `It ${element.meltingPoint > 25 ? 'is solid' : element.meltingPoint !== null ? 'is liquid' : 'is gaseous'} at room temperature. ` +
        `${element.category !== 'unknown' ? `It belongs to the ${element.category.replace('-', ' ')} group. ` : ''}` +
        `Its electron configuration is ${element.electronConfig}.`;
}

function updatePropertiesVisualization(element) {
    const container = document.getElementById('properties-visualization');
    container.innerHTML = '';
    
    // Create a title for the chart
    const chartTitle = document.createElement('h3');
    chartTitle.textContent = `${element.name} Properties Comparison`;
    chartTitle.style.marginBottom = '15px';
    chartTitle.style.textAlign = 'center';
    
    // Create wrapper for the chart
    const propertiesContainer = document.createElement('div');
    propertiesContainer.classList.add('properties-container');
    
    // Create the chart div
    const propertyChart = document.createElement('div');
    propertyChart.classList.add('property-chart');
    
    // Define the properties to display with units and formatted values
    const properties = [
        { 
            name: 'Electronegativity', 
            value: element.electronegativity, 
            max: 4.0, 
            unit: '', 
            format: value => value !== null ? value.toFixed(2) : 'N/A' 
        },
        { 
            name: 'Atomic Radius', 
            value: element.atomicRadius, 
            max: 300, 
            unit: 'pm', 
            format: value => value !== null ? value : 'N/A' 
        },
        { 
            name: 'Ionization Energy', 
            value: element.ionizationEnergy, 
            max: 25, 
            unit: 'eV', 
            format: value => value !== null ? value.toFixed(2) : 'N/A' 
        },
        { 
            name: 'Melting Point', 
            value: element.meltingPoint, 
            max: 3500, 
            unit: '°C', 
            format: value => value !== null ? value : 'N/A' 
        },
        { 
            name: 'Boiling Point', 
            value: element.boilingPoint, 
            max: 5500, 
            unit: '°C', 
            format: value => value !== null ? value : 'N/A' 
        }
    ];
    
    // Add grid lines for better readability
    for (let i = 0; i <= 4; i++) {
        const percentage = 20 * i;
        const gridLine = document.createElement('div');
        gridLine.classList.add('grid-line');
        gridLine.style.bottom = `${percentage}%`;
        
        const gridLabel = document.createElement('div');
        gridLabel.classList.add('grid-label');
        gridLabel.style.bottom = `${percentage}%`;
        gridLabel.textContent = `${percentage}%`;
        
        propertyChart.appendChild(gridLine);
        propertyChart.appendChild(gridLabel);
    }
    
    // Create bars for each property
    properties.forEach(prop => {
        if (prop.value !== null) {
            const percentage = (prop.value / prop.max) * 100;
            const clamped = Math.min(Math.max(percentage, 5), 95); // Ensure it's visible but not too tall
            
            const propertyBar = document.createElement('div');
            propertyBar.classList.add('property-bar');
            propertyBar.style.height = `${clamped}%`;
            
            // Tooltip for more information
            propertyBar.title = `${prop.name}: ${prop.format(prop.value)} ${prop.unit}\n(${clamped.toFixed(1)}% of scale)`;
            
            const propertyLabel = document.createElement('div');
            propertyLabel.classList.add('property-label');
            propertyLabel.textContent = prop.name;
            
            const propertyValue = document.createElement('div');
            propertyValue.classList.add('property-value');
            
            const valueText = document.createTextNode(prop.format(prop.value));
            propertyValue.appendChild(valueText);
            
            if (prop.unit) {
                const unitSpan = document.createElement('span');
                unitSpan.classList.add('property-unit');
                unitSpan.textContent = ` ${prop.unit}`;
                propertyValue.appendChild(unitSpan);
            }
            
            propertyBar.appendChild(propertyLabel);
            propertyBar.appendChild(propertyValue);
            propertyChart.appendChild(propertyBar);
        }
    });
    
    // Add a legend for better understanding
    const legend = document.createElement('div');
    legend.style.width = '100%';
    legend.style.padding = '10px';
    legend.style.fontSize = '0.8rem';
    legend.style.color = '#666';
    legend.style.textAlign = 'center';
    legend.style.marginTop = '100px';
    legend.textContent = 'Bar heights represent percentage of maximum known values';
    
    propertiesContainer.appendChild(propertyChart);
    propertiesContainer.appendChild(legend);
    
    container.appendChild(chartTitle);
    container.appendChild(propertiesContainer);
    
    // Add a media query for mobile devices
    if (window.innerWidth < 768) {
        // Adjust for mobile screens
        document.querySelectorAll('.property-label').forEach(label => {
            label.style.fontSize = '0.7rem';
            label.style.bottom = '-25px';
        });
        
        document.querySelectorAll('.property-value').forEach(value => {
            value.style.fontSize = '0.8rem';
            value.style.padding = '1px 0';
        });
        
        document.querySelectorAll('.property-bar').forEach(bar => {
            bar.style.margin = '0 5px';
            bar.style.minWidth = '30px';
        });
    }
}