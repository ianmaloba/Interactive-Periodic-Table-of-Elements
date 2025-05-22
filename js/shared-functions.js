// Initialize the shared object if it doesn't exist
window.periodicTableApp = window.periodicTableApp || {};

// Initialize the 3D functions object
window.periodicTableApp.threeDFunctions = {
    // Initially empty - will be populated by 3d-model.js
    update3DModel: null,
    init3DVisualization: null,
    cleanup3DResources: null
};