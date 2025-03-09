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
    // Detect if we're on a mobile device
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Adjust the periodic table layout
        const periodicTable = document.getElementById('periodic-table');
        periodicTable.style.gridGap = '2px';
        
        // Make sure the element details are easy to view on mobile
        const detailItems = document.querySelectorAll('.detail-item');
        detailItems.forEach(item => {
            item.style.padding = '8px';
        });
        
        // Ensure tabs are scrollable horizontally
        const tabs = document.querySelector('.tabs');
        tabs.style.overflowX = 'auto';
        tabs.style.whiteSpace = 'nowrap';
        tabs.style.paddingBottom = '5px';
        
        // Adjust visualization heights for mobile
        const visualizations = document.querySelectorAll('.visualization');
        visualizations.forEach(viz => {
            viz.style.height = '250px';
        });
    }
}