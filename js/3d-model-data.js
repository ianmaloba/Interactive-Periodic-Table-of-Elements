// This file contains data for 3D models of elements, molecules, and crystal structures

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
    'Fe': 0xE06633, // Rust red
    'Cu': 0xC88033, // Copper
    'Ag': 0xC0C0C0, // Silver
    'Au': 0xFFD700, // Gold
    'Hg': 0xB8B8D0, // Mercury
    'Pb': 0x575961, // Lead
    'S': 0xFFFF30,  // Yellow
    'P': 0xFF8000,  // Orange
    'Li': 0xCCCCFF, // Light purple
    'Be': 0xC2FF00, // Bright green
    'B': 0xFFB5B5,  // Pink
    'Al': 0xBFA6A6, // Light brown
    'Si': 0xF0C8A0, // Tan
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
    'Fe': 140,
    'Cu': 135,
    'Ag': 160,
    'Au': 135,
    'Hg': 150,
    'Pb': 180,
    'S': 100,
    'P': 100,
    'Li': 145,
    'Be': 105,
    'B': 85,
    'Al': 125,
    'Si': 110,
    'default': 100
};

// Common molecules containing elements - expanded
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
    // Helium
    2: {
        name: 'Helium (He)',
        atoms: [
            { symbol: 'He', position: [0, 0, 0] }
        ],
        bonds: []
    },
    // Lithium
    3: {
        name: 'Lithium Hydride (LiH)',
        atoms: [
            { symbol: 'Li', position: [-0.8, 0, 0] },
            { symbol: 'H', position: [0.8, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 1 }
        ]
    },
    // Beryllium
    4: {
        name: 'Beryllium Chloride (BeCl₂)',
        atoms: [
            { symbol: 'Be', position: [0, 0, 0] },
            { symbol: 'Cl', position: [-1.2, 0, 0] },
            { symbol: 'Cl', position: [1.2, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 1 },
            { from: 0, to: 2 }
        ]
    },
    // Boron
    5: {
        name: 'Boron Trifluoride (BF₃)',
        atoms: [
            { symbol: 'B', position: [0, 0, 0] },
            { symbol: 'F', position: [0, 1.2, 0] },
            { symbol: 'F', position: [-1.0392, -0.6, 0] },
            { symbol: 'F', position: [1.0392, -0.6, 0] }
        ],
        bonds: [
            { from: 0, to: 1 },
            { from: 0, to: 2 },
            { from: 0, to: 3 }
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
    // Fluorine
    9: {
        name: 'Hydrogen Fluoride (HF)',
        atoms: [
            { symbol: 'H', position: [-0.6, 0, 0] },
            { symbol: 'F', position: [0.6, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 1 }
        ]
    },
    // Neon
    10: {
        name: 'Neon (Ne)',
        atoms: [
            { symbol: 'Ne', position: [0, 0, 0] }
        ],
        bonds: []
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
    // Magnesium
    12: {
        name: 'Magnesium Oxide (MgO)',
        atoms: [
            { symbol: 'Mg', position: [-0.8, 0, 0] },
            { symbol: 'O', position: [0.8, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 1, dashed: true }
        ]
    },
    // Aluminum
    13: {
        name: 'Aluminum Oxide (Al₂O₃)',
        atoms: [
            { symbol: 'Al', position: [-1.2, 0, 0] },
            { symbol: 'Al', position: [1.2, 0, 0] },
            { symbol: 'O', position: [0, 0.8, 0] },
            { symbol: 'O', position: [0, -0.8, 0.6] },
            { symbol: 'O', position: [0, -0.8, -0.6] }
        ],
        bonds: [
            { from: 0, to: 2 },
            { from: 0, to: 3 },
            { from: 1, to: 2 },
            { from: 1, to: 4 }
        ]
    },
    // Silicon
    14: {
        name: 'Silicon Dioxide (SiO₂)',
        atoms: [
            { symbol: 'Si', position: [0, 0, 0] },
            { symbol: 'O', position: [-1, 0, 0] },
            { symbol: 'O', position: [1, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 1, order: 2 },
            { from: 0, to: 2, order: 2 }
        ]
    },
    // Phosphorus
    15: {
        name: 'Phosphine (PH₃)',
        atoms: [
            { symbol: 'P', position: [0, 0, 0] },
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
    // Sulfur
    16: {
        name: 'Hydrogen Sulfide (H₂S)',
        atoms: [
            { symbol: 'S', position: [0, 0, 0] },
            { symbol: 'H', position: [-0.8, 0.6, 0] },
            { symbol: 'H', position: [0.8, 0.6, 0] }
        ],
        bonds: [
            { from: 0, to: 1 },
            { from: 0, to: 2 }
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
    // Argon
    18: {
        name: 'Argon (Ar)',
        atoms: [
            { symbol: 'Ar', position: [0, 0, 0] }
        ],
        bonds: []
    },
    // Potassium
    19: {
        name: 'Potassium Chloride (KCl)',
        atoms: [
            { symbol: 'K', position: [-1, 0, 0] },
            { symbol: 'Cl', position: [1, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 1, dashed: true }
        ]
    },
    // Calcium
    20: {
        name: 'Calcium Oxide (CaO)',
        atoms: [
            { symbol: 'Ca', position: [-0.8, 0, 0] },
            { symbol: 'O', position: [0.8, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 1, dashed: true }
        ]
    },
    // Iron
    26: {
        name: 'Iron(III) Oxide (Fe₂O₃)',
        atoms: [
            { symbol: 'Fe', position: [-1.2, 0, 0] },
            { symbol: 'Fe', position: [1.2, 0, 0] },
            { symbol: 'O', position: [0, 0.8, 0] },
            { symbol: 'O', position: [0, -0.8, 0.6] },
            { symbol: 'O', position: [0, -0.8, -0.6] }
        ],
        bonds: [
            { from: 0, to: 2 },
            { from: 0, to: 3 },
            { from: 1, to: 2 },
            { from: 1, to: 4 }
        ]
    },
    // Copper
    29: {
        name: 'Copper Sulfate (CuSO₄)',
        atoms: [
            { symbol: 'Cu', position: [-1, 0, 0] },
            { symbol: 'S', position: [0.5, 0, 0] },
            { symbol: 'O', position: [0.5, 1, 0] },
            { symbol: 'O', position: [1.5, 0, 0] },
            { symbol: 'O', position: [0.5, -1, 0] },
            { symbol: 'O', position: [-0.5, 0, 0] }
        ],
        bonds: [
            { from: 0, to: 5 },
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 1, to: 4 },
            { from: 1, to: 5 }
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

// Crystal structures for elements - expanded
const crystalStructures = {
    // Hydrogen (hypothetical solid)
    1: {
        name: 'Hydrogen (Hexagonal Close Packed)',
        type: 'hcp',
        atomPairs: [
            { symbols: ['H', 'H'], colors: [0xFFFFFF, 0xEEEEEE] }
        ]
    },
    // Carbon (Diamond)
    6: {
        name: 'Diamond (Carbon) Crystal',
        type: 'diamond',
        atomPairs: [
            { symbols: ['C', 'C'], colors: [0x808080, 0x505050] }
        ]
    },
    // Sodium Chloride (salt)
    11: {
        name: 'Sodium Chloride (NaCl) Crystal',
        type: 'fcc',
        atomPairs: [
            { symbols: ['Na', 'Cl'], colors: [0xAB5CF2, 0x1FF01F] }
        ]
    },
    // Chlorine
    17: {
        name: 'Sodium Chloride (NaCl) Crystal',
        type: 'fcc',
        atomPairs: [
            { symbols: ['Na', 'Cl'], colors: [0xAB5CF2, 0x1FF01F] }
        ]
    },
    // Iron (Body Centered Cubic)
    26: {
        name: 'Iron (BCC) Crystal',
        type: 'bcc',
        atomPairs: [
            { symbols: ['Fe', 'Fe'], colors: [0xE06633, 0xC05623] }
        ]
    },
    // Copper (Face Centered Cubic)
    29: {
        name: 'Copper (FCC) Crystal',
        type: 'fcc',
        atomPairs: [
            { symbols: ['Cu', 'Cu'], colors: [0xC88033, 0xB87030] }
        ]
    },
    // Aluminum (Face Centered Cubic)
    13: {
        name: 'Aluminum (FCC) Crystal',
        type: 'fcc',
        atomPairs: [
            { symbols: ['Al', 'Al'], colors: [0xBFA6A6, 0xAF9696] }
        ]
    },
    // Silicon (Diamond Cubic)
    14: {
        name: 'Silicon Crystal',
        type: 'diamond',
        atomPairs: [
            { symbols: ['Si', 'Si'], colors: [0xF0C8A0, 0xE0B890] }
        ]
    },
    // Magnesium (Hexagonal Close Packed)
    12: {
        name: 'Magnesium (HCP) Crystal',
        type: 'hcp',
        atomPairs: [
            { symbols: ['Mg', 'Mg'], colors: [0x8AFF00, 0x7AEF00] }
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

// Make these available to the window object
window.periodicTableApp = window.periodicTableApp || {};
window.periodicTableApp.modelData = {
    elementColors,
    atomicRadii,
    elementMolecules,
    crystalStructures
};