// 3D Visualization for elements using Three.js
let scene, camera, renderer, controls;
let modelGroup, isRotating = true;
let currentElement = null;
let currentModelType = 'atom';
let animationFrameId = null;
let isInitialized = false;

// Initialize access to model data
const modelData = window.periodicTableApp?.modelData || {
    elementColors: {},
    atomicRadii: {},
    elementMolecules: { 'default': { name: '', atoms: [], bonds: [] } },
    crystalStructures: { 'default': { name: '', type: 'sc', atomPairs: [] } }
};

// Initialize 3D visualization
function init3DVisualization() {
    try {
        console.log("Initializing 3D visualization...");
        
        const container = document.getElementById('3d-container');
        
        // Check if container exists
        if (!container) {
            console.error("3D container not found!");
            return;
        }
        
        // Check if THREE is available
        if (typeof THREE === 'undefined') {
            console.error("THREE.js not loaded!");
            showErrorMessage(container, "ERROR: THREE.js library not loaded. Please check your internet connection.");
            return;
        }
        
        // Check if model data is available
        if (!window.periodicTableApp?.modelData) {
            console.error("3D model data not loaded!");
            showErrorMessage(container, "ERROR: 3D model data not loaded. Please check js/3d-model-data.js.");
            return;
        }
        
        // Show loading message
        showLoadingMessage(container);
        
        // Create a scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x121a2b);
        
        // Create a camera
        const aspectRatio = container.clientWidth / container.clientHeight || 1;
        camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
        camera.position.z = 5;
        
        // Create a renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth || 300, container.clientHeight || 300);
        
        // Clear any existing canvas
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        container.appendChild(renderer.domElement);
        
        // Add orbit controls
        if (typeof THREE.OrbitControls === 'undefined') {
            console.error("OrbitControls not loaded!");
            showErrorMessage(container, "ERROR: OrbitControls not loaded. Please check your internet connection.");
            return;
        }
        
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        
        // Create a group for the model
        modelGroup = new THREE.Group();
        scene.add(modelGroup);
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Add help text
        const helpDiv = document.createElement('div');
        helpDiv.className = 'controls-help';
        helpDiv.textContent = 'Drag: Rotate | Scroll: Zoom | Right-click: Pan';
        container.appendChild(helpDiv);
        
        // Setup model controls
        setupModelControls();
        
        // Handle window resize
        window.addEventListener('resize', onWindowResize);
        
        // Mark as initialized
        isInitialized = true;
        
        // If we have a current element already, update the model
        if (currentElement) {
            update3DModel(currentElement);
        }
        
        // Start animation loop
        animate();
        
        console.log("3D visualization initialized successfully");
        
    } catch (error) {
        console.error("Error initializing 3D visualization:", error);
        const container = document.getElementById('3d-container');
        if (container) {
            showErrorMessage(container, "Error initializing 3D visualization: " + error.message);
        }
    }
}

// Show loading message
function showLoadingMessage(container) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-indicator';
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    
    const text = document.createElement('div');
    text.textContent = 'Loading 3D model...';
    
    loadingDiv.appendChild(spinner);
    loadingDiv.appendChild(text);
    
    // Clear container first
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    container.appendChild(loadingDiv);
}

// Show error message
function showErrorMessage(container, message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.color = '#f44336';
    errorDiv.style.padding = '20px';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.width = '100%';
    errorDiv.textContent = message;
    
    // Clear container first
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    container.appendChild(errorDiv);
}

// Animation loop
function animate() {
    try {
        animationFrameId = requestAnimationFrame(animate);
        
        // Rotate the model if rotation is enabled
        if (isRotating && modelGroup) {
            modelGroup.rotation.y += 0.005;
        }
        
        // Update controls
        if (controls) {
            controls.update();
        }
        
        // Render the scene
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    } catch (error) {
        console.error("Error in animation loop:", error);
        cancelAnimationFrame(animationFrameId);
    }
}

// Handle window resize
function onWindowResize() {
    try {
        const container = document.getElementById('3d-container');
        if (!container) return;
        
        const width = container.clientWidth || 300;
        const height = container.clientHeight || 300;
        
        if (camera) {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
        
        if (renderer) {
            renderer.setSize(width, height);
        }
    } catch (error) {
        console.error("Error handling window resize:", error);
    }
}

// Setup model controls
function setupModelControls() {
    try {
        const rotateToggle = document.getElementById('rotate-toggle');
        const resetCamera = document.getElementById('reset-camera');
        const modelSelector = document.getElementById('model-selector');
        
        if (rotateToggle) {
            rotateToggle.addEventListener('click', function() {
                isRotating = !isRotating;
                rotateToggle.textContent = isRotating ? 'Pause Rotation' : 'Resume Rotation';
            });
        }
        
        if (resetCamera) {
            resetCamera.addEventListener('click', function() {
                if (camera) {
                    camera.position.set(0, 0, 5);
                    camera.lookAt(0, 0, 0);
                }
                if (controls) {
                    controls.reset();
                }
            });
        }
        
        if (modelSelector) {
            modelSelector.addEventListener('change', function() {
                currentModelType = this.value;
                if (currentElement) {
                    update3DModel(currentElement);
                }
            });
        }
    } catch (error) {
        console.error("Error setting up model controls:", error);
    }
}

// Update 3D model based on element
function update3DModel(element) {
    try {
        console.log("Updating 3D model for element:", element.name, "Type:", currentModelType);
        
        if (!element) {
            console.error("No element provided to update3DModel");
            return;
        }
        
        currentElement = element;
        
        // Initialize if not already done
        if (!isInitialized) {
            init3DVisualization();
            return; // The init function will call update3DModel again after initializing
        }
        
        if (!scene || !modelGroup) {
            console.error("Scene or modelGroup not initialized");
            return;
        }
        
        // Clear existing model
        while (modelGroup.children.length > 0) {
            const object = modelGroup.children[0];
            modelGroup.remove(object);
            
            // Properly dispose of geometries and materials
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        }
        
        // Update 3D model based on selected type
        const modelType = document.getElementById('model-selector')?.value || 'atom';
        currentModelType = modelType;
        
        console.log("Creating model type:", modelType, "for element #", element.number);
        
        switch (modelType) {
            case 'atom':
                createAtomicModel(element);
                break;
            case 'molecule':
                createMoleculeModel(element);
                break;
            case 'crystal':
                createCrystalModel(element);
                break;
            default:
                createAtomicModel(element);
        }
        
        // Update legend and description
        update3DModelInfo(element, modelType);
        
    } catch (error) {
        console.error("Error updating 3D model:", error);
        const container = document.getElementById('3d-container');
        if (container) {
            showErrorMessage(container, "Error updating 3D model: " + error.message);
        }
    }
}

// Create 3D atomic model
function createAtomicModel(element) {
    if (!element || !element.shells) {
        console.error("Invalid element or missing shells data");
        return;
    }
    
    try {
        // Create the nucleus
        const nucleusGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const nucleusMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xf44336,
            emissive: 0x991f1f,
            shininess: 30
        });
        const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
        modelGroup.add(nucleus);
        
        // Add electron shells
        element.shells.forEach((electronCount, shellIndex) => {
            const shellRadius = 1 + (shellIndex + 1) * 0.8;
            
            // Create shell (orbital path)
            const shellGeometry = new THREE.TorusGeometry(shellRadius, 0.02, 16, 100);
            const shellMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x2196F3,
                transparent: true,
                opacity: 0.4
            });
            
            // Create three orthogonal shells for 3D effect
            const shellX = new THREE.Mesh(shellGeometry, shellMaterial);
            modelGroup.add(shellX);
            
            const shellY = new THREE.Mesh(shellGeometry, shellMaterial);
            shellY.rotation.x = Math.PI / 2;
            modelGroup.add(shellY);
            
            const shellZ = new THREE.Mesh(shellGeometry, shellMaterial);
            shellZ.rotation.y = Math.PI / 2;
            modelGroup.add(shellZ);
            
            // Distribute electrons evenly around the shell
            for (let i = 0; i < electronCount; i++) {
                const angle = (i * 2 * Math.PI) / electronCount;
                const electronGeometry = new THREE.SphereGeometry(0.1, 16, 16);
                const electronMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x2196F3,
                    emissive: 0x0d47a1,
                    shininess: 80
                });
                
                const electron = new THREE.Mesh(electronGeometry, electronMaterial);
                
                // Position on a random axis for 3D distribution
                const randomAxis = Math.floor(Math.random() * 3);
                let x, y, z;
                
                if (randomAxis === 0) {
                    x = shellRadius * Math.cos(angle);
                    y = shellRadius * Math.sin(angle);
                    z = (Math.random() - 0.5) * 0.2;
                } else if (randomAxis === 1) {
                    x = shellRadius * Math.cos(angle);
                    y = (Math.random() - 0.5) * 0.2;
                    z = shellRadius * Math.sin(angle);
                } else {
                    x = (Math.random() - 0.5) * 0.2;
                    y = shellRadius * Math.cos(angle);
                    z = shellRadius * Math.sin(angle);
                }
                
                electron.position.set(x, y, z);
                modelGroup.add(electron);
            }
        });
        
    } catch (error) {
        console.error("Error creating atomic model:", error);
    }
}

// Create 3D molecule model
function createMoleculeModel(element) {
    try {
        // Get molecule data for the element
        const { elementMolecules } = window.periodicTableApp.modelData;
        console.log("Creating molecule for element #:", element.number);
        
        // First try to get a specific molecule for this element
        let moleculeData = elementMolecules[element.number];
        
        // If no specific molecule, use the default
        if (!moleculeData) {
            console.log("No specific molecule found for element #", element.number, "using default");
            moleculeData = elementMolecules['default'];
            
            // Replace X with element symbol in default molecule
            moleculeData = JSON.parse(JSON.stringify(moleculeData)); // Deep clone to avoid modifying the original
            moleculeData.atoms.forEach(atom => {
                if (atom.symbol === 'X') atom.symbol = element.symbol;
            });
        } else {
            console.log("Found specific molecule for element #", element.number, ":", moleculeData.name);
        }
        
        // Create atoms
        const atomObjects = [];
        moleculeData.atoms.forEach(atom => {
            const symbol = atom.symbol;
            const radius = (modelData.atomicRadii[symbol] || modelData.atomicRadii['default']) / 100; // Scale down
            const color = modelData.elementColors[symbol] || modelData.elementColors['default'];
            
            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            const material = new THREE.MeshPhongMaterial({ 
                color: color,
                shininess: 80
            });
            
            const atomMesh = new THREE.Mesh(geometry, material);
            atomMesh.position.set(...atom.position);
            modelGroup.add(atomMesh);
            atomObjects.push(atomMesh);
            
            // Add label for the atom
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 64;
            canvas.height = 32;
            
            ctx.fillStyle = 'white';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(symbol, canvas.width / 2, canvas.height / 2);
            
            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(
                atom.position[0], 
                atom.position[1] + radius + 0.2, 
                atom.position[2]
            );
            sprite.scale.set(0.5, 0.25, 1);
            modelGroup.add(sprite);
        });
        
        // Create bonds between atoms
        moleculeData.bonds.forEach(bond => {
            const fromAtom = moleculeData.atoms[bond.from];
            const toAtom = moleculeData.atoms[bond.to];
            
            const fromPos = new THREE.Vector3(...fromAtom.position);
            const toPos = new THREE.Vector3(...toAtom.position);
            
            const direction = new THREE.Vector3().subVectors(toPos, fromPos);
            const length = direction.length();
            
            // Bond is a cylinder from start to end
            const bondGeometry = new THREE.CylinderGeometry(0.05, 0.05, length, 8);
            bondGeometry.translate(0, length / 2, 0);
            
            const bondMaterial = bond.dashed ? 
                new THREE.LineDashedMaterial({
                    color: 0xcccccc,
                    dashSize: 0.1,
                    gapSize: 0.05
                }) : 
                new THREE.MeshPhongMaterial({ 
                    color: 0xcccccc,
                    shininess: 30,
                    transparent: true,
                    opacity: 0.8
                });
            
            const bondMesh = new THREE.Mesh(bondGeometry, bondMaterial);
            bondMesh.position.copy(fromPos);
            
            // Orient cylinder to point to end
            const quaternion = new THREE.Quaternion();
            quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 1, 0), 
                direction.normalize()
            );
            bondMesh.quaternion.copy(quaternion);
            modelGroup.add(bondMesh);
            
            // Handle double or triple bonds
            if (bond.order && bond.order > 1) {
                const offset = 0.08; // Offset distance for multiple bonds
                
                // Create additional bonds with offset
                for (let i = 0; i < bond.order - 1; i++) {
                    const additionalBond = bondMesh.clone();
                    
                    // Calculate offset direction perpendicular to bond
                    const perpendicular = new THREE.Vector3(1, 0, 0);
                    if (Math.abs(direction.dot(perpendicular)) > 0.9) {
                        perpendicular.set(0, 1, 0);
                    }
                    
                    const offsetDir = new THREE.Vector3().crossVectors(direction, perpendicular).normalize();
                    const offsetAmount = offset * (i - (bond.order - 2) / 2);
                    
                    additionalBond.position.addScaledVector(offsetDir, offsetAmount);
                    modelGroup.add(additionalBond);
                }
            }
        });
        
        // Scale the model to fit
        modelGroup.scale.set(1.5, 1.5, 1.5);
        
    } catch (error) {
        console.error("Error creating molecule model:", error);
    }
}

// Create 3D crystal model
function createCrystalModel(element) {
    try {
        // Get crystal data for the element
        const { crystalStructures } = window.periodicTableApp.modelData;
        console.log("Creating crystal structure for element #:", element.number);
        
        // First try to get a specific crystal structure for this element
        let crystalData = crystalStructures[element.number];
        
        // If no specific crystal structure, use the default
        if (!crystalData) {
            console.log("No specific crystal structure found for element #", element.number, "using default");
            crystalData = crystalStructures['default'];
            
            // Replace X with element symbol in default crystal structure
            crystalData = JSON.parse(JSON.stringify(crystalData)); // Deep clone to avoid modifying the original
            crystalData.atomPairs.forEach(pair => {
                if (pair.symbols[0] === 'X') pair.symbols[0] = element.symbol;
                if (pair.symbols[1] === 'X') pair.symbols[1] = element.symbol;
            });
        } else {
            console.log("Found specific crystal structure for element #", element.number, ":", crystalData.name);
        }
        
        // Unit cell dimensions
        const cellSize = 2;
        
        // Create atoms based on structure type
        switch (crystalData.type) {
            case 'fcc': // Face-centered cubic
                createFCCStructure(cellSize, crystalData.atomPairs[0]);
                break;
            case 'bcc': // Body-centered cubic
                createBCCStructure(cellSize, crystalData.atomPairs[0]);
                break;
            case 'hcp': // Hexagonal close-packed
                createHCPStructure(cellSize, crystalData.atomPairs[0]);
                break;
            case 'diamond': // Diamond cubic (for carbon)
                createDiamondStructure(cellSize, crystalData.atomPairs[0]);
                break;
            case 'sc': // Simple cubic
            default:
                createSimpleCubicStructure(cellSize, crystalData.atomPairs[0]);
                break;
        }
        
        // Add unit cell wireframe
        const cellGeometry = new THREE.BoxGeometry(cellSize, cellSize, cellSize);
        const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x666666 });
        const edgesGeometry = new THREE.EdgesGeometry(cellGeometry);
        const cellEdges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
        modelGroup.add(cellEdges);
        
    } catch (error) {
        console.error("Error creating crystal model:", error);
    }
}

// Create face-centered cubic structure
function createFCCStructure(cellSize, atomPair) {
    try {
        const halfCell = cellSize / 2;
        const atomPositions = [
            // Corner atoms
            [0, 0, 0],
            [cellSize, 0, 0],
            [0, cellSize, 0],
            [cellSize, cellSize, 0],
            [0, 0, cellSize],
            [cellSize, 0, cellSize],
            [0, cellSize, cellSize],
            [cellSize, cellSize, cellSize],
            
            // Face centered atoms
            [halfCell, 0, 0],
            [0, halfCell, 0],
            [0, 0, halfCell],
            [cellSize, halfCell, 0],
            [cellSize, 0, halfCell],
            [halfCell, cellSize, 0],
            [0, cellSize, halfCell],
            [cellSize, cellSize, halfCell],
            [halfCell, 0, cellSize],
            [0, halfCell, cellSize],
            [cellSize, halfCell, cellSize],
            [halfCell, cellSize, cellSize]
        ];
        
        // Create atoms
        atomPositions.forEach((pos, index) => {
            // Use first atom type for corners, second for face centers
            const isCorner = index < 8;
            const atomSymbol = isCorner ? atomPair.symbols[0] : atomPair.symbols[1];
            const atomColor = isCorner ? atomPair.colors[0] : atomPair.colors[1];
            
            // Scale radius based on cell size
            const radius = cellSize / 10;
            
            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            const material = new THREE.MeshPhongMaterial({ 
                color: atomColor,
                shininess: 80
            });
            
            const atom = new THREE.Mesh(geometry, material);
            atom.position.set(...pos);
            
            modelGroup.add(atom);
        });
        
    } catch (error) {
        console.error("Error creating FCC structure:", error);
    }
}

// Create body-centered cubic structure
function createBCCStructure(cellSize, atomPair) {
    try {
        const atomPositions = [
            // Corner atoms
            [0, 0, 0],
            [cellSize, 0, 0],
            [0, cellSize, 0],
            [cellSize, cellSize, 0],
            [0, 0, cellSize],
            [cellSize, 0, cellSize],
            [0, cellSize, cellSize],
            [cellSize, cellSize, cellSize],
            
            // Center atom
            [cellSize/2, cellSize/2, cellSize/2]
        ];
        
        // Create atoms
        atomPositions.forEach((pos, index) => {
            // Use first atom type for corners, second for center
            const isCorner = index < 8;
            const atomSymbol = isCorner ? atomPair.symbols[0] : atomPair.symbols[1];
            const atomColor = isCorner ? atomPair.colors[0] : atomPair.colors[1];
            
            // Scale radius based on cell size
            const radius = cellSize / 10;
            
            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            const material = new THREE.MeshPhongMaterial({ 
                color: atomColor,
                shininess: 80
            });
            
            const atom = new THREE.Mesh(geometry, material);
            atom.position.set(...pos);
            
            modelGroup.add(atom);
        });
        
        // Add bonds between center and corners
        const center = atomPositions[8];
        for (let i = 0; i < 8; i++) {
            const corner = atomPositions[i];
            
            const start = new THREE.Vector3(...center);
            const end = new THREE.Vector3(...corner);
            
            const direction = new THREE.Vector3().subVectors(end, start);
            const length = direction.length();
            
            // Bond is a cylinder
            const bondGeometry = new THREE.CylinderGeometry(0.03, 0.03, length, 8);
            bondGeometry.translate(0, length / 2, 0);
            
            const bondMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xcccccc,
                shininess: 30,
                transparent: true,
                opacity: 0.3
            });
            
            const bond = new THREE.Mesh(bondGeometry, bondMaterial);
            bond.position.copy(start);
            
            // Orient cylinder
            const quaternion = new THREE.Quaternion();
            quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 1, 0), 
                direction.normalize()
            );
            bond.quaternion.copy(quaternion);
            
            modelGroup.add(bond);
        }
        
    } catch (error) {
        console.error("Error creating BCC structure:", error);
    }
}

// Create hexagonal close-packed structure
function createHCPStructure(cellSize, atomPair) {
    try {
        const h = cellSize * Math.sqrt(8/3); // Height of the cell
        const a = cellSize;                  // Base edge length
        
        // Positions for first layer (bottom layer)
        const layer1 = [
            [0, 0, 0],
            [a, 0, 0],
            [a/2, a*Math.sqrt(3)/2, 0],
        ];
        
        // Positions for second layer (middle layer)
        const layer2 = [
            [a/2, a*Math.sqrt(3)/6, h/3],
            [3*a/2, a*Math.sqrt(3)/6, h/3],
            [a, 2*a*Math.sqrt(3)/3, h/3],
        ];
        
        // Positions for third layer (top layer)
        const layer3 = [
            [0, 0, 2*h/3],
            [a, 0, 2*h/3],
            [a/2, a*Math.sqrt(3)/2, 2*h/3],
        ];
        
        // Combine all positions
        const atomPositions = [...layer1, ...layer2, ...layer3];
        
        // Create atoms
        atomPositions.forEach((pos, index) => {
            // Alternate colors for visual distinction
            const layerIndex = Math.floor(index / 3);
            const atomColor = layerIndex % 2 === 0 ? atomPair.colors[0] : atomPair.colors[1];
            
            // Scale radius based on cell size
            const radius = cellSize / 10;
            
            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            const material = new THREE.MeshPhongMaterial({ 
                color: atomColor,
                shininess: 80
            });
            
            const atom = new THREE.Mesh(geometry, material);
            atom.position.set(...pos);
            
            modelGroup.add(atom);
        });
        
        // Scale for better view
        modelGroup.scale.set(0.8, 0.8, 0.8);
        
    } catch (error) {
        console.error("Error creating HCP structure:", error);
    }
}

// Create diamond cubic structure
function createDiamondStructure(cellSize, atomPair) {
    try {
        const quarter = cellSize / 4;
        const atomPositions = [
            // FCC positions
            [0, 0, 0],
            [0, cellSize/2, cellSize/2],
            [cellSize/2, 0, cellSize/2],
            [cellSize/2, cellSize/2, 0],
            [cellSize, 0, 0],
            [cellSize, cellSize/2, cellSize/2],
            [cellSize/2, cellSize, cellSize/2],
            [cellSize/2, cellSize/2, cellSize],
            [cellSize, cellSize, 0],
            [cellSize, cellSize/2, cellSize/2],
            [cellSize/2, cellSize, cellSize/2],
            [cellSize, cellSize, cellSize],
            
            // Additional tetrahedral positions
            [quarter, quarter, quarter],
            [quarter, 3*quarter, 3*quarter],
            [3*quarter, quarter, 3*quarter],
            [3*quarter, 3*quarter, quarter],
            [quarter + cellSize/2, quarter, 3*quarter],
            [quarter + cellSize/2, 3*quarter, quarter],
            [3*quarter + cellSize/2, quarter, quarter],
            [3*quarter + cellSize/2, 3*quarter, 3*quarter]
        ];
        
        // Create atoms
        atomPositions.forEach((pos, index) => {
            const atomSymbol = atomPair.symbols[0];
            const atomColor = index < 12 ? atomPair.colors[0] : atomPair.colors[1];
            
            // Scale radius based on cell size
            const radius = cellSize / 10;
            
            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            const material = new THREE.MeshPhongMaterial({ 
                color: atomColor,
                shininess: 80
            });
            
            const atom = new THREE.Mesh(geometry, material);
            atom.position.set(...pos);
            
            modelGroup.add(atom);
        });
        
        // Create bonds between atoms - simplified for clarity
        const bondPairs = [
            [0, 12], [1, 13], [2, 14], [3, 15],
            [4, 16], [5, 17], [6, 18], [7, 19],
            [8, 15], [9, 17], [10, 19], [11, 13]
        ];
        
        bondPairs.forEach(pair => {
            const start = new THREE.Vector3(...atomPositions[pair[0]]);
            const end = new THREE.Vector3(...atomPositions[pair[1]]);
            
            const direction = new THREE.Vector3().subVectors(end, start);
            const length = direction.length();
            
            // Bond is a cylinder
            const bondGeometry = new THREE.CylinderGeometry(0.03, 0.03, length, 8);
            bondGeometry.translate(0, length / 2, 0);
            
            const bondMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xcccccc,
                shininess: 30,
                transparent: true,
                opacity: 0.6
            });
            
            const bond = new THREE.Mesh(bondGeometry, bondMaterial);
            bond.position.copy(start);
            
            // Orient cylinder
            const quaternion = new THREE.Quaternion();
            quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 1, 0), 
                direction.normalize()
            );
            bond.quaternion.copy(quaternion);
            
            modelGroup.add(bond);
        });
        
        // Scale for better view
        modelGroup.scale.set(0.7, 0.7, 0.7);
        
    } catch (error) {
        console.error("Error creating diamond structure:", error);
    }
}

// Create simple cubic structure
function createSimpleCubicStructure(cellSize, atomPair) {
    try {
        const atomPositions = [
            [0, 0, 0],
            [cellSize, 0, 0],
            [0, cellSize, 0],
            [cellSize, cellSize, 0],
            [0, 0, cellSize],
            [cellSize, 0, cellSize],
            [0, cellSize, cellSize],
            [cellSize, cellSize, cellSize]
        ];
        
        // Create atoms
        atomPositions.forEach((pos, index) => {
            const atomSymbol = atomPair.symbols[0];
            const atomColor = atomPair.colors[0];
            
            // Scale radius based on cell size
            const radius = cellSize / 10;
            
            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            const material = new THREE.MeshPhongMaterial({ 
                color: atomColor,
                shininess: 80
            });
            
            const atom = new THREE.Mesh(geometry, material);
            atom.position.set(...pos);
            
            modelGroup.add(atom);
        });
        
        // Create bonds between atoms
        const bondPairs = [
            [0, 1], [0, 2], [0, 4],
            [1, 3], [1, 5],
            [2, 3], [2, 6],
            [3, 7],
            [4, 5], [4, 6],
            [5, 7],
            [6, 7]
        ];
        
        bondPairs.forEach(pair => {
            const start = new THREE.Vector3(...atomPositions[pair[0]]);
            const end = new THREE.Vector3(...atomPositions[pair[1]]);
            
            const direction = new THREE.Vector3().subVectors(end, start);
            const length = direction.length();
            
            // Bond is a cylinder
            const bondGeometry = new THREE.CylinderGeometry(0.03, 0.03, length, 8);
            bondGeometry.translate(0, length / 2, 0);
            
            const bondMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xcccccc,
                shininess: 30,
                transparent: true,
                opacity: 0.6
            });
            
            const bond = new THREE.Mesh(bondGeometry, bondMaterial);
            bond.position.copy(start);
            
            // Orient cylinder
            const quaternion = new THREE.Quaternion();
            quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 1, 0), 
                direction.normalize()
            );
            bond.quaternion.copy(quaternion);
            
            modelGroup.add(bond);
        });
        
    } catch (error) {
        console.error("Error creating simple cubic structure:", error);
    }
}

// Update model info
function update3DModelInfo(element, modelType) {
    try {
        const modelDetail = document.getElementById('3d-model-detail');
        const { elementMolecules, crystalStructures } = window.periodicTableApp.modelData;
        
        if (modelDetail) {
            switch (modelType) {
                case 'atom':
                    modelDetail.textContent = `This visualization shows the atomic structure of ${element.name} (${element.symbol}), with ${element.shells.reduce((a, b) => a + b, 0)} electrons distributed across ${element.shells.length} energy levels. The nucleus contains ${element.number} protons.`;
                    break;
                case 'molecule':
                    const moleculeData = elementMolecules[element.number] || elementMolecules['default'];
                    const moleculeName = moleculeData.name.replace('X', element.symbol);
                    modelDetail.textContent = `Visualizing ${moleculeName}, a common molecule containing ${element.name}. The 3D model shows how the atoms are arranged and bonded in the molecular structure.`;
                    break;
                case 'crystal':
                    const crystalData = crystalStructures[element.number] || crystalStructures['default'];
                    const crystalName = crystalData.name.replace('X', element.name);
                    modelDetail.textContent = `This is a visualization of the ${crystalName} crystal structure. The model shows how ${element.name} atoms are arranged in a repeating pattern in solid state.`;
                    break;
            }
        }
    } catch (error) {
        console.error("Error updating 3D model info:", error);
    }
}

// Set up click handler for the 3D tab
document.addEventListener('DOMContentLoaded', function() {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.error("THREE.js not loaded at DOMContentLoaded. Make sure the script is included in the head.");
    }
    
    // Set up tab click handler
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            if (tabId === '3d-model') {
                console.log("3D tab clicked");
                
                // Initialize 3D view if it's not already
                setTimeout(() => {
                    if (!isInitialized) {
                        console.log("Initializing 3D visualization from tab click");
                        init3DVisualization();
                    }
                    
                    // Update model if an element is active
                    if (activeElement) {
                        console.log("Updating model for active element:", activeElement);
                        const element = elements.find(el => el.number === activeElement);
                        if (element) {
                            update3DModel(element);
                        }
                    }
                    
                    // Handle any potential sizing issues
                    onWindowResize();
                }, 300);  // Longer timeout to ensure the tab is visible
            }
        });
    });
});

// Clean up 3D resources when switching elements
function cleanup3DResources() {
    try {
        console.log("Cleaning up 3D resources");
        
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        
        if (renderer) {
            renderer.dispose();
            renderer = null;
        }
        
        if (controls) {
            controls.dispose();
            controls = null;
        }
        
        if (scene) {
            // Properly dispose of all objects in the scene
            scene.traverse(object => {
                if (object.geometry) {
                    object.geometry.dispose();
                }
                
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => {
                            if (material.map) material.map.dispose();
                            material.dispose();
                        });
                    } else {
                        if (object.material.map) object.material.map.dispose();
                        object.material.dispose();
                    }
                }
            });
            
            scene = null;
        }
        
        // Remove the canvas from the container
        const container = document.getElementById('3d-container');
        if (container && container.querySelector('canvas')) {
            container.querySelector('canvas').remove();
        }
        
        isInitialized = false;
        modelGroup = null;
        
    } catch (error) {
        console.error("Error cleaning up 3D resources:", error);
    }
}

// Make functions available to the global object
window.periodicTableApp = window.periodicTableApp || {};
window.periodicTableApp.threeDFunctions = window.periodicTableApp.threeDFunctions || {};
window.periodicTableApp.threeDFunctions.update3DModel = update3DModel;
window.periodicTableApp.threeDFunctions.init3DVisualization = init3DVisualization;
window.periodicTableApp.threeDFunctions.cleanup3DResources = cleanup3DResources;