// app.js - Main application file that initializes the periodic table

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Interactive Periodic Table');
    
    // Build the periodic table
    buildPeriodicTable();
    
    // Set up all event listeners
    initializeEventListeners();
    
    // Show the first element (hydrogen) by default
    setTimeout(() => {
        const hydrogen = elements.find(el => el.number === 1);
        if (hydrogen) {
            showElementDetails(hydrogen);
        }
    }, 500);
    
    console.log('Periodic Table initialized successfully');
});

function improveResponsiveness() {
    // Get current viewport width
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth < 768;
    const isSmallMobile = viewportWidth < 480;
    
    // Adjust the periodic table layout
    const periodicTable = document.getElementById('periodic-table');
    
    if (isSmallMobile) {
        periodicTable.style.gridGap = '1px';
    } else if (isMobile) {
        periodicTable.style.gridGap = '2px';
    } else {
        periodicTable.style.gridGap = '3px';
    }
    
    // Adjust detail sections for better mobile viewing
    if (isMobile) {
        // Make detail items more compact
        const detailItems = document.querySelectorAll('.detail-item');
        detailItems.forEach(item => {
            item.style.padding = isSmallMobile ? '6px' : '8px';
        });
        
        // Ensure tabs are scrollable horizontally
        const tabs = document.querySelector('.tabs');
        tabs.style.overflowX = 'auto';
        tabs.style.whiteSpace = 'nowrap';
        tabs.style.paddingBottom = '5px';
        tabs.style.marginBottom = isSmallMobile ? '10px' : '15px';
        
        // Adjust visualization heights for mobile
        const visualizations = document.querySelectorAll('.visualization');
        visualizations.forEach(viz => {
            viz.style.height = isSmallMobile ? '220px' : '250px';
        });
        
        // Make category legend more compact
        const legendItems = document.querySelectorAll('.legend-item');
        legendItems.forEach(item => {
            item.style.fontSize = isSmallMobile ? '0.65rem' : '0.75rem';
            item.style.marginRight = isSmallMobile ? '5px' : '8px';
            item.style.marginBottom = '5px';
        });
        
        // Adjust element detail sizes
        if (document.getElementById('detail-symbol-box')) {
            document.getElementById('detail-symbol-box').style.width = isSmallMobile ? '55px' : '65px';
            document.getElementById('detail-symbol-box').style.height = isSmallMobile ? '55px' : '65px';
        }
        
        // Make sure buttons have adequate tap targets on mobile
        document.querySelectorAll('.view-toggle button').forEach(button => {
            button.style.minHeight = '40px';
            button.style.padding = isSmallMobile ? '5px 10px' : '6px 12px';
        });
    } else {
        // Reset styles on larger screens
        const detailItems = document.querySelectorAll('.detail-item');
        detailItems.forEach(item => {
            item.style.padding = '10px';
        });
        
        const tabs = document.querySelector('.tabs');
        if (tabs) {
            tabs.style.overflowX = '';
            tabs.style.whiteSpace = '';
            tabs.style.paddingBottom = '';
            tabs.style.marginBottom = '';
        }
        
        const visualizations = document.querySelectorAll('.visualization');
        visualizations.forEach(viz => {
            viz.style.height = '300px';
        });
    }
    
    // Optimize table for the current screen size
    optimizeTableForScreenSize();
}

function optimizeTableForScreenSize() {
    const viewportWidth = window.innerWidth;
    const elements = document.querySelectorAll('.element');
    
    if (viewportWidth < 480) {
        // Extra small screens - minimize padding and font sizes
        elements.forEach(el => {
            const inner = el.querySelector('.element-inner');
            if (inner) inner.style.padding = '1px';
            
            const symbol = el.querySelector('.symbol');
            if (symbol) symbol.style.fontSize = '0.7rem';
            
            const num = el.querySelector('.atomic-number');
            if (num) {
                num.style.fontSize = '0.4rem';
                num.style.top = '1px';
                num.style.left = '1px';
            }
            
            // Hide name and mass for extremely small screens
            const name = el.querySelector('.name');
            const mass = el.querySelector('.mass');
            if (name) name.style.display = 'none';
            if (mass) mass.style.display = 'none';
        });
    } else if (viewportWidth < 768) {
        // Small screens - reduce padding and font sizes
        elements.forEach(el => {
            const inner = el.querySelector('.element-inner');
            if (inner) inner.style.padding = '2px';
            
            const symbol = el.querySelector('.symbol');
            if (symbol) symbol.style.fontSize = '0.8rem';
            
            const num = el.querySelector('.atomic-number');
            if (num) {
                num.style.fontSize = '0.5rem';
                num.style.top = '2px';
                num.style.left = '2px';
            }
            
            // Show symbol but hide name on small screens
            const name = el.querySelector('.name');
            if (name) name.style.display = 'none';
            
            // Only show mass on larger small screens
            const mass = el.querySelector('.mass');
            if (mass) mass.style.display = viewportWidth < 576 ? 'none' : 'block';
        });
    } else {
        // Reset styles for larger screens
        elements.forEach(el => {
            const inner = el.querySelector('.element-inner');
            if (inner) inner.style.padding = '5px';
            
            const symbol = el.querySelector('.symbol');
            if (symbol) symbol.style.fontSize = viewportWidth < 992 ? '1rem' : '1.2rem';
            
            const num = el.querySelector('.atomic-number');
            if (num) {
                num.style.fontSize = viewportWidth < 992 ? '0.6rem' : '0.7rem';
                num.style.top = '3px';
                num.style.left = '3px';
            }
            
            // Show both name and mass on larger screens
            const name = el.querySelector('.name');
            const mass = el.querySelector('.mass');
            if (name) name.style.display = 'block';
            if (mass) mass.style.display = 'block';
        });
    }
}

// Make sure this function runs on load and resize
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('resize', improveResponsiveness);
    improveResponsiveness();
});