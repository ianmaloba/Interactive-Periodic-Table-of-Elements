// interactions.js - Event handlers and interaction functions

// Global variables for tracking state
let activeElement = null;

// Show element details
function showElementDetails(element) {
    const elementDetails = document.getElementById('element-details');
    
    // Update the element details
    updateElementDetails(element);
    
    // Show the element details panel
    elementDetails.classList.add('active');
    
    // Update visualizations
    updateAtomicModel(element);
    updateHybridizationModel(element);
    updatePropertiesVisualization(element);
    
    // Highlight the selected element in the table
    if (activeElement) {
        document.querySelector(`.element[data-atomic-number="${activeElement}"]`).classList.remove('active');
    }
    document.querySelector(`.element[data-atomic-number="${element.number}"]`).classList.add('active');
    activeElement = element.number;
    
    // Scroll to the details
    elementDetails.scrollIntoView({ behavior: 'smooth' });

    updateReactionsTab(element);
    
    // Update the 3D model if the tab is active
    const is3DTabActive = document.querySelector('.tab[data-tab="3d-model"]').classList.contains('active');
    if (is3DTabActive) {
        update3DModel(element);
    }
}

// Set up view toggle buttons
function setupViewToggleButtons() {
    document.querySelectorAll('.view-toggle button').forEach(button => {
        button.addEventListener('click', () => {
            const view = button.id.replace('-view', '');
            updateTableView(view);
        });
    });
}

// Set up tab switching
function setupTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (event) => {
            // Prevent default behavior
            event.preventDefault();
            
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get the tab content id and add active class
            const contentId = tab.getAttribute('data-tab');
            const tabContent = document.getElementById(contentId);
            
            if (tabContent) {
                tabContent.classList.add('active');
                
                // If it's a visualization tab, refresh the visualizations
                if (activeElement) {
                    const element = elements.find(el => el.number === activeElement);
                    if (element) {
                        if (contentId === 'atomic-structure') {
                            updateAtomicModel(element);
                        } else if (contentId === 'hybridization') {
                            updateHybridizationModel(element);
                        } else if (contentId === 'properties') {
                            updatePropertiesVisualization(element);
                        }
                    }
                }
            }
        });
    });
}

// Initialize event listeners
function initializeEventListeners() {
    // Setup basic elements
    setupViewToggleButtons();
    setupTabs();
    
    // Add responsive handling
    window.addEventListener('resize', function() {
        handleResize();
        improveResponsiveness();
    });
    
    // Run once at initialization
    improveResponsiveness();
    
    // Add click handlers for elements directly
    document.querySelectorAll('.element').forEach(el => {
        el.addEventListener('click', function() {
            const atomicNumber = parseInt(this.dataset.atomicNumber);
            const element = elements.find(e => e.number === atomicNumber);
            if (element) {
                showElementDetails(element);
            }
        });
    });
    
    // Make sure the gradient legend displays properly
    const gradientLegend = document.getElementById('gradient-legend');
    gradientLegend.style.display = 'none';
    
    // Add a click handler for the view toggle buttons
    document.querySelectorAll('.view-toggle button').forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.id.replace('-view', '');
            updateTableView(viewType);
            
            // Show the gradient legend for property views
            if (viewType !== 'standard') {
                gradientLegend.style.display = 'flex';
            } else {
                gradientLegend.style.display = 'none';
            }
        });
    });
}

// Add this to js/interactions.js after the initializeEventListeners function

// Make visualizations draggable/pannable
function setupDraggableVisualizations() {
    const visualizations = document.querySelectorAll('.visualization');
    
    visualizations.forEach(viz => {
        // Only make it draggable if it has content that might need scrolling
        const content = viz.firstElementChild;
        if (content && (content.scrollWidth > viz.clientWidth || content.scrollHeight > viz.clientHeight)) {
            viz.classList.add('draggable');
        } else {
            viz.classList.remove('draggable');
        }
        let isDragging = false;
        let startX, startY, scrollLeft, scrollTop;
        let hasMoved = false;
        
        viz.addEventListener('mousedown', (e) => {
            // Only initiate drag if not clicking on an interactive element
            if (e.target.closest('.tab, button, .element') === null) {
                isDragging = true;
                hasMoved = false;
                viz.style.cursor = 'grabbing';
                startX = e.pageX - viz.offsetLeft;
                startY = e.pageY - viz.offsetTop;
                scrollLeft = viz.scrollLeft;
                scrollTop = viz.scrollTop;
            }
        });
        
        viz.addEventListener('mouseleave', () => {
            isDragging = false;
            viz.style.cursor = 'grab';
        });
        
        viz.addEventListener('mouseup', () => {
            isDragging = false;
            viz.style.cursor = 'grab';
        });
        
        viz.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const x = e.pageX - viz.offsetLeft;
            const y = e.pageY - viz.offsetTop;
            const walkX = (x - startX);
            const walkY = (y - startY);
            
            // Only consider it a drag if moved more than 5px
            if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
                hasMoved = true;
                e.preventDefault();
                viz.scrollLeft = scrollLeft - walkX;
                viz.scrollTop = scrollTop - walkY;
            }
        });
        
        // Touch events for mobile - with similar click preservation
        viz.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1 && !e.target.closest('.tab, button, .element')) {
                isDragging = true;
                hasMoved = false;
                startX = e.touches[0].pageX - viz.offsetLeft;
                startY = e.touches[0].pageY - viz.offsetTop;
                scrollLeft = viz.scrollLeft;
                scrollTop = viz.scrollTop;
            }
        }, { passive: true });
        
        viz.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        viz.addEventListener('touchmove', (e) => {
            if (!isDragging || e.touches.length > 1) return;
            
            const x = e.touches[0].pageX - viz.offsetLeft;
            const y = e.touches[0].pageY - viz.offsetTop;
            const walkX = (x - startX);
            const walkY = (y - startY);
            
            if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
                hasMoved = true;
                viz.scrollLeft = scrollLeft - walkX;
                viz.scrollTop = scrollTop - walkY;
            }
        }, { passive: true });
        
        // Prevent click events if we've dragged
        viz.addEventListener('click', (e) => {
            if (hasMoved) {
                e.stopPropagation();
                hasMoved = false;
            }
        }, { capture: true });
    });
}

// Helper function to ensure visualizations always fit in viewport
function ensureVisualizationFit() {
    const visualizations = document.querySelectorAll('.visualization');
    
    visualizations.forEach(viz => {
        const content = viz.firstElementChild;
        if (content) {
            // Reset any existing transforms first
            content.style.transform = '';
            
            // Wait a bit to get accurate measurements
            setTimeout(() => {
                // Check if content is larger than container
                if (content.offsetWidth > viz.offsetWidth || content.offsetHeight > viz.offsetHeight) {
                    // Apply a scale factor to make it fit
                    const scaleX = viz.offsetWidth / content.offsetWidth;
                    const scaleY = viz.offsetHeight / content.offsetHeight;
                    const scale = Math.min(scaleX, scaleY, 1) * 0.9; // Add some padding
                    
                    content.style.transform = `scale(${scale})`;
                    content.style.transformOrigin = 'center center';
                }
            }, 50);
        }
    });
}

// DO NOT MODIFY this function, just add to it
function initializeEventListeners() {
    // Setup basic elements
    setupViewToggleButtons();
    setupTabs();
    
    // Add responsive handling
    window.addEventListener('resize', function() {
        handleResize();
        improveResponsiveness();
        ensureVisualizationFit();
    });
    
    // Run once at initialization
    improveResponsiveness();
    
    // Add click handlers for elements directly
    document.querySelectorAll('.element').forEach(el => {
        el.addEventListener('click', function() {
            const atomicNumber = parseInt(this.dataset.atomicNumber);
            const element = elements.find(e => e.number === atomicNumber);
            if (element) {
                showElementDetails(element);
            }
        });
    });
    
    // Make sure the gradient legend displays properly
    const gradientLegend = document.getElementById('gradient-legend');
    gradientLegend.style.display = 'none';
    
    // Add a click handler for the view toggle buttons
    document.querySelectorAll('.view-toggle button').forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.id.replace('-view', '');
            updateTableView(viewType);
            
            // Show the gradient legend for property views
            if (viewType !== 'standard') {
                gradientLegend.style.display = 'flex';
            } else {
                gradientLegend.style.display = 'none';
            }
        });
    });
    
    // Add our new enhancement functions AFTER the original initialization
    // Do this with a small delay to ensure everything else is loaded
    setTimeout(() => {
        setupDraggableVisualizations();
        ensureVisualizationFit();
    }, 500);
}

// Initialize draggable visualizations when tab content becomes active
document.addEventListener('DOMContentLoaded', function() {
    // Set up tab click handlers for visualization updates
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Wait for content to be displayed
            setTimeout(() => {
                setupDraggableVisualizations();
                ensureVisualizationFit();
            }, 200);
        });
    });
});

// Handle window resize
function handleResize() {
    // Adjust visualizations if needed
    if (activeElement) {
        const element = elements.find(el => el.number === activeElement);
        if (element) {
            updateAtomicModel(element);
            updateHybridizationModel(element);
        }
    }
}