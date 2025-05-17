// 3D Visualization for elements using Three.js
let scene, camera, renderer, controls;
let modelGroup, isRotating = true;
let currentElement = null;
let currentModelType = 'atom';
let animationFrameId = null;

// Element colors for 3D models
const elementColors = {
    'H': 0xFFFFFF,  // White
    'C': 0x808080,  // Grey
    'N': 0x0000FF,  // Blue
    'O': 0xFF0000,  // Red
    'F': 0x90E050,  // Light Green
    'Cl': 0x1FF01F, // Green
    'Br': 0xA62929, // Brown
    'I': 0x940094,  // Purple
    'He': 0xD9FFFF, // Light Cyan
    'Ne': 0xB3E3F5, // Light Blue
    'Ar': 0x80D1E3, // Cyan
    'Kr': 0x5CB8D1, // Medium Blue
    'Xe': 0x429EB0, // Teal
    'Na': 0xAB5CF2, // Purple
    'K': 0x8F40D4,  // Dark Purple
    'Mg': 0x8AFF00, // Bright Green
    'Ca': 0x3DFF00, // Lime Green
    'default': 0xCCCCCC // Default Grey
};

// Atomic radii (pm) for visualization
const atomicRadii = {
    'H': 25,
    'C': 70,
    'N': 65,
    'O': 60,
    'F': 50,
    'Cl': 100,
    'Br': 115,
    'I': 140,
    'He': 31,
    'Ne': 38,
    'Ar': 71,
    'Kr': 88,
    'Xe': 108,
    'Na': 180,
    'K': 220,
    'Mg': 150,
    'Ca': 180,
    'default': 100
};

// Common molecules containing elements
const elementMolecules = {
    // Hydrogen
    1: {
        name: 'Water (H₂O)',
        atoms: [
            { symbol: 'O', position: [0, 0, 0] },
            { symbol: 'H', position: [-0.8, 0.6, 0] },
            { symbol: 'H', position: [0.8, 0.6, 0] }
        ],
        bonds: [
            { from: 0, to: 1 },
            { from: 0, to: 2 }
        ]
    },
    // Carbon
    6: {
        name: 'Methane (CH₄)',
        atoms: [
            { symbol: 'C', position: [0, 0, 0] },
            { symbol: 'H', position: [0.6, 0.6, 0.6] },
            { symbol: 'H', position: [-0.6, -0.6, 0.6] },
            { symbol: 'H', position: [0.6, -0.6, -0.6] },
            { symbol: 'H', position: [-0.6, 0.6, -0.6] }
        ],
        bonds: [
            { from: 0, to: 1 },
            { from: 0, to: 2 },
            { from: 0, to: 3 },
            { from: 0, to: 4 }
        ]
    },
    // Oxygen
    8: {
        name: 'Oxygen Molecule (O₂)',
        atoms: [
            { symbol: 'O', position: [-0.6, 0, 0] },
            { symbol: 'O', position: [0.6, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 1, order: 2 } // Double bond
        ]
    },
    // Nitrogen
    7: {
        name: 'Ammonia (NH₃)',
        atoms: [
            { symbol: 'N', position: [0, 0, 0] },
            { symbol: 'H', position: [0.8, 0.6, 0] },
            { symbol: 'H', position: [-0.8, 0.6, 0] },
            { symbol: 'H', position: [0, -0.8, 0.6] }
        ],
        bonds: [
            { from: 0, to: 1 },
            { from: 0, to: 2 },
            { from: 0, to: 3 }
        ]
    },
    // Chlorine
    17: {
        name: 'Hydrogen Chloride (HCl)',
        atoms: [
            { symbol: 'H', position: [-0.8, 0, 0] },
            { symbol: 'Cl', position: [0.8, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 1 }
        ]
    },
    // Sodium
    11: {
        name: 'Sodium Chloride (NaCl)',
        atoms: [
            { symbol: 'Na', position: [-1, 0, 0] },
            { symbol: 'Cl', position: [1, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 1, dashed: true } // Ionic bond
        ]
    },
    // Default molecule for other elements
    'default': {
        name: 'Diatomic Molecule',
        atoms: [
            { symbol: 'X', position: [-0.8, 0, 0] },
            { symbol: 'X', position: [0.8, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 1 }
        ]
    }
};

// Crystal structures for elements
const crystalStructures = {
    // Sodium Chloride crystal structure
    11: {
        name: 'Sodium Chloride (NaCl) Crystal',
        type: 'fcc',
        atomPairs: [
            { symbols: ['Na', 'Cl'], colors: [0xAB5CF2, 0x1FF01F] }
        ]
    },
    17: {
        name: 'Sodium Chloride (NaCl) Crystal',
        type: 'fcc',
        atomPairs: [
            { symbols: ['Na', 'Cl'], colors: [0xAB5CF2, 0x1FF01F] }
        ]
    },
    // Carbon (Diamond) crystal structure
    6: {
        name: 'Diamond (Carbon) Crystal',
        type: 'diamond',
        atomPairs: [
            { symbols: ['C', 'C'], colors: [0x808080, 0x505050] }
        ]
    },
    // Default crystal structure
    'default': {
        name: 'Simple Cubic Structure',
        type: 'sc',
        atomPairs: [
            { symbols: ['X', 'X'], colors: [0xCCCCCC, 0xAAAAAA] }
        ]
    }
};

// Initialize 3D visualization
function init3DVisualization() {
    const container = document.getElementById('3d-container');
    
    // Check if container exists
    if (!container) return;
    
    // Create a scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121a2b);
    
    // Create a camera
    const aspectRatio = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.z = 5;
    
    // Create a renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Add orbit controls
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
    
    // Start animation
    animate();
    
    // Add event listeners for controls
    setupModelControls();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

// Animation loop
function animate() {
    animationFrameId = requestAnimationFrame(animate);
    
    // Rotate the model if rotation is enabled
    if (isRotating) {
        modelGroup.rotation.y += 0.005;
    }
    
    // Update controls
    controls.update();
    
    // Render the scene
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    const container = document.getElementById('3d-container');
    if (!container) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
}

// Setup model controls
function setupModelControls() {
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
            camera.position.set(0, 0, 5);
            camera.lookAt(0, 0, 0);
            controls.reset();
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
}

// Update 3D model based on element
function update3DModel(element) {
    if (!scene || !modelGroup) {
        init3DVisualization();
    }
    
    currentElement = element;
    
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
    const modelType = document.getElementById('model-selector').value;
    
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
}

// Create 3D atomic model
function createAtomicModel(element) {
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
        
        // Add electrons to the shell
        for (let i = 0; i < electronCount; i++) {
            const angle = (i * 2 * Math.PI) / electronCount;
            const electronGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const electronMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x2196F3,
                emissive: 0x0d47a1,
                shininess: 80
            });
            
            const electron = new THREE.Mesh(electronGeometry, electronMaterial);
            
            // Position electron on shell with slight randomization for 3D effect
            const randomAxis = Math.floor(Math.random() * 3);
            if (randomAxis === 0) {
                electron.position.set(
                    shellRadius * Math.cos(angle),
                    shellRadius * Math.sin(angle),
                    (Math.random() - 0.5) * 0.2
                );
            } else if (randomAxis === 1) {
                electron.position.set(
                    shellRadius * Math.cos(angle),
                    (Math.random() - 0.5) * 0.2,
                    shellRadius * Math.sin(angle)
                );
            } else {
                electron.position.set(
                    (Math.random() - 0.5) * 0.2,
                    shellRadius * Math.cos(angle),
                    shellRadius * Math.sin(angle)
                );
            }
            
            modelGroup.add(electron);
            
            // Animate electron
            animateElectron(electron, shellRadius, angle, randomAxis, shellIndex);
        }
    });
}

// Animate electron around its orbital
function animateElectron(electron, radius, startAngle, axis, shellIndex) {
    const speed = 0.5 / (shellIndex + 1); // Outer shells move slower
    const offset = startAngle;
    
    // Store animation data with the electron
    electron.userData = {
        radius: radius,
        speed: speed,
        offset: offset,
        axis: axis,
        animationTime: 0
    };
    
    // Add to update loop
    const animate = () => {
        electron.userData.animationTime += 0.016; // Approximately 60fps
        const angle = electron.userData.speed * electron.userData.animationTime + offset;
        
        if (axis === 0) {
            electron.position.x = radius * Math.cos(angle);
            electron.position.y = radius * Math.sin(angle);
        } else if (axis === 1) {
            electron.position.x = radius * Math.cos(angle);
            electron.position.z = radius * Math.sin(angle);
        } else {
            electron.position.y = radius * Math.cos(angle);
            electron.position.z = radius * Math.sin(angle);
        }
        
        requestAnimationFrame(animate);
    };
    
    animate();
}

// Create 3D molecule model
function createMoleculeModel(element) {
    // Get molecule data for the element
    const moleculeData = elementMolecules[element.number] || elementMolecules['default'];
    
    // Replace X with element symbol in default molecule
    if (!elementMolecules[element.number]) {
        moleculeData.atoms.forEach(atom => {
            if (atom.symbol === 'X') atom.symbol = element.symbol;
        });
    }
    
    // Create atoms
    const atomObjects = [];
    moleculeData.atoms.forEach(atom => {
        const symbol = atom.symbol;
        const radius = (atomicRadii[symbol] || atomicRadii['default']) / 100; // Scale down
        const color = elementColors[symbol] || elementColors['default'];
        
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshPhongMaterial({ 
            color: color,
            shininess: 80
        });
        
        const atomMesh = new THREE.Mesh(geometry, material);
        atomMesh.position.set(...atom.position);
        
        // Add label for the atom
        const textSprite = createTextSprite(symbol);
        textSprite.position.set(atom.position[0], atom.position[1] + radius + 0.1, atom.position[2]);
        
        modelGroup.add(atomMesh);
        modelGroup.add(textSprite);
        atomObjects.push(atomMesh);
    });
    
    // Create bonds between atoms
    moleculeData.bonds.forEach(bond => {
        const fromAtom = moleculeData.atoms[bond.from];
        const toAtom = moleculeData.atoms[bond.to];
        
        const fromPos = new THREE.Vector3(...fromAtom.position);
        const toPos = new THREE.Vector3(...toAtom.position);
        
        // Create bond cylinder
        createBond(fromPos, toPos, bond.order || 1, bond.dashed || false);
    });
    
    // Scale the model to fit
    modelGroup.scale.set(1.5, 1.5, 1.5);
}

// Create a bond between atoms
function createBond(start, end, order = 1, dashed = false) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    
    // Bond is a cylinder from start to end
    const bondGeometry = new THREE.CylinderGeometry(0.05, 0.05, length, 8);
    
    // Adjust cylinder to point from start to end
    bondGeometry.translate(0, length / 2, 0);
    
    const bondMaterial = dashed ? 
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
    
    const bond = new THREE.Mesh(bondGeometry, bondMaterial);
    
    // Position and rotate bond to connect atoms
    bond.position.copy(start);
    
    // Orient cylinder to point to end
    const cylinderUp = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(cylinderUp, direction.normalize());
    bond.quaternion.copy(quaternion);
    
    // Handle double or triple bonds
    if (order > 1) {
        const offset = 0.08; // Offset distance for multiple bonds
        
        // Create additional bonds with offset
        for (let i = 0; i < order - 1; i++) {
            const additionalBond = bond.clone();
            
            // Calculate offset direction perpendicular to bond
            const perpendicular = new THREE.Vector3(1, 0, 0);
            if (Math.abs(direction.dot(perpendicular)) > 0.9) {
                perpendicular.set(0, 1, 0);
            }
            const offsetDir = new THREE.Vector3().crossVectors(direction, perpendicular).normalize();
            
            // Position offset
            const offsetAmount = offset * (i - (order - 2) / 2);
            additionalBond.position.addScaledVector(offsetDir, offsetAmount);
            
            modelGroup.add(additionalBond);
        }
    }
    
    modelGroup.add(bond);
}

// Create 3D crystal model
function createCrystalModel(element) {
    // Get crystal data for the element
    const crystalData = crystalStructures[element.number] || crystalStructures['default'];
    
    // Unit cell dimensions
    const cellSize = 2;
    const cellHalf = cellSize / 2;
    
    switch (crystalData.type) {
        case 'fcc': // Face-centered cubic
            createFCCStructure(cellSize, crystalData.atomPairs[0]);
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
}

// Create face-centered cubic structure
function createFCCStructure(cellSize, atomPair) {
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
    
    // Alternate atoms for crystal structure
    atomPositions.forEach((pos, index) => {
        // Use first atom type for corners, second for face centers
        const isCorner = index < 8;
        const atomSymbol = isCorner ? atomPair.symbols[0] : atomPair.symbols[1];
        const atomColor = isCorner ? atomPair.colors[0] : atomPair.colors[1];
        
        createCrystalAtom(pos, atomSymbol, atomColor, cellSize);
    });
}

// Create diamond cubic structure
function createDiamondStructure(cellSize, atomPair) {
    const quarter = cellSize / 4;
    const atomPositions = [
        // FCC positions
        [0, 0, 0],
        [0, cellSize/2, cellSize/2],
        [cellSize/2, 0, cellSize/2],
        [cellSize/2, cellSize/2, 0],
        
        // Additional tetrahedral positions
        [quarter, quarter, quarter],
        [quarter, 3*quarter, 3*quarter],
        [3*quarter, quarter, 3*quarter],
        [3*quarter, 3*quarter, quarter]
    ];
    
    // Create atoms
    atomPositions.forEach((pos, index) => {
        const atomSymbol = atomPair.symbols[0];
        const atomColor = index < 4 ? atomPair.colors[0] : atomPair.colors[1];
        
        createCrystalAtom(pos, atomSymbol, atomColor, cellSize);
    });
    
    // Create bonds between atoms
    const bondPairs = [
        [0, 4], [1, 5], [2, 6], [3, 7],
        [4, 1], [4, 2], [5, 2], [5, 3],
        [6, 0], [6, 3], [7, 0], [7, 1]
    ];
    
    bondPairs.forEach(pair => {
        const start = new THREE.Vector3(...atomPositions[pair[0]]);
        const end = new THREE.Vector3(...atomPositions[pair[1]]);
        createBond(start, end);
    });
}

// Create simple cubic structure
function createSimpleCubicStructure(cellSize, atomPair) {
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
        
        createCrystalAtom(pos, atomSymbol, atomColor, cellSize);
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
        createBond(start, end);
    });
}

// Create atom for crystal structure
function createCrystalAtom(position, symbol, color, cellSize) {
    // Scale radius based on cell size
    const radius = (atomicRadii[symbol] || 100) * cellSize / 800;
    
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: color,
        shininess: 80
    });
    
    const atom = new THREE.Mesh(geometry, material);
    atom.position.set(...position);
    
    modelGroup.add(atom);
}

// Create text sprite for atom labels
function createTextSprite(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;
    
    context.font = '24px Arial';
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    
    const material = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true
    });
    
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.3, 0.15, 1);
    
    return sprite;
}

// Update model info
function update3DModelInfo(element, modelType) {
    const modelDetail = document.getElementById('3d-model-detail');
    
    if (modelDetail) {
        switch (modelType) {
            case 'atom':
                modelDetail.textContent = `This visualization shows the atomic structure of ${element.name} (${element.symbol}), with ${element.shells.reduce((a, b) => a + b, 0)} electrons distributed across ${element.shells.length} energy levels. The nucleus contains ${element.number} protons.`;
                break;
            case 'molecule':
                const moleculeData = elementMolecules[element.number] || elementMolecules['default'];
                modelDetail.textContent = `Visualizing ${moleculeData.name}, a common molecule containing ${element.name}. The 3D model shows how the atoms are arranged and bonded in the molecular structure.`;
                break;
            case 'crystal':
                const crystalData = crystalStructures[element.number] || crystalStructures['default'];
                modelDetail.textContent = `This is a visualization of the ${crystalData.name} crystal structure. The model shows how ${element.name} atoms are arranged in a repeating pattern in solid state.`;
                break;
        }
    }
}

// Initialize the 3D visualization when a tab is clicked
document.addEventListener('DOMContentLoaded', function() {
    // Add script for Three.js if not already loaded
    if (typeof THREE === 'undefined') {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        document.head.appendChild(threeScript);
        
        const orbitControlsScript = document.createElement('script');
        orbitControlsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/controls/OrbitControls.min.js';
        document.head.appendChild(orbitControlsScript);
        
        // Initialize after scripts are loaded
        orbitControlsScript.onload = function() {
            // Set up tab click handler
            setupTabClickHandler();
        };
    } else {
        // Scripts already loaded
        setupTabClickHandler();
    }
});

// Set up click handler for the 3D tab
function setupTabClickHandler() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            if (tabId === '3d-model') {
                // Initialize 3D view if it's not already
                setTimeout(() => {
                    if (!scene) {
                        init3DVisualization();
                    }
                    
                    // Update model if an element is active
                    if (activeElement) {
                        const element = elements.find(el => el.number === activeElement);
                        if (element) {
                            update3DModel(element);
                        }
                    }
                }, 100);
            }
        });
    });
}

// Clean up 3D resources when switching elements
function cleanup3DResources() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    if (renderer) {
        renderer.dispose();
    }
    
    if (scene) {
        scene.clear();
    }
    
    if (controls) {
        controls.dispose();
    }
    
    // Remove the canvas from the container
    const container = document.getElementById('3d-container');
    if (container && container.querySelector('canvas')) {
        container.querySelector('canvas').remove();
    }
    
    // Reset variables
    scene = null;
    camera = null;
    renderer = null;
    controls = null;
    modelGroup = null;
}