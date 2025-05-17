// Define common reactions for elements
const elementReactions = {
    // Example reactions for a few elements
    1: [ // Hydrogen
        {
            name: "Combustion of Hydrogen",
            equation: "2H₂(g) + O₂(g) → 2H₂O(g)",
            description: "Hydrogen gas reacts with oxygen gas in a highly exothermic reaction to form water vapor.",
            conditions: ["Heat or spark required to initiate", "Extremely exothermic", "Explosive in confined spaces"],
            applications: "Used in fuel cells and as a clean energy source."
        },
        {
            name: "Hydrogenation of Alkenes",
            equation: "C₂H₄(g) + H₂(g) → C₂H₆(g)",
            description: "Hydrogen adds across the double bond of alkenes in the presence of a metal catalyst.",
            conditions: ["Metal catalyst (Pt, Pd, or Ni)", "Moderate temperature and pressure", "Reversible reaction"],
            applications: "Used in food industry to convert liquid oils to solid fats."
        }
    ],
    6: [ // Carbon
        {
            name: "Combustion of Carbon",
            equation: "C(s) + O₂(g) → CO₂(g)",
            description: "Carbon reacts with oxygen to form carbon dioxide in a combustion reaction.",
            conditions: ["Heat required", "Exothermic reaction", "Complete combustion with excess oxygen"],
            applications: "Basis for fossil fuel combustion and energy production."
        },
        {
            name: "Formation of Carbon Monoxide",
            equation: "2C(s) + O₂(g) → 2CO(g)",
            description: "In limited oxygen supply, carbon forms carbon monoxide instead of carbon dioxide.",
            conditions: ["Limited oxygen supply", "High temperature", "Incomplete combustion"],
            applications: "Industrial reducing agent in metallurgy."
        }
    ],
    8: [ // Oxygen
        {
            name: "Oxidation of Iron",
            equation: "4Fe(s) + 3O₂(g) → 2Fe₂O₃(s)",
            description: "Iron reacts with oxygen in the presence of moisture to form iron(III) oxide, commonly known as rust.",
            conditions: ["Presence of moisture accelerates reaction", "Room temperature", "More rapid in salt water"],
            applications: "Understanding of this reaction is crucial for preventing metal corrosion."
        },
        {
            name: "Cellular Respiration",
            equation: "C₆H₁₂O₆(aq) + 6O₂(g) → 6CO₂(g) + 6H₂O(l) + Energy",
            description: "Glucose reacts with oxygen in cells to produce carbon dioxide, water, and energy.",
            conditions: ["Enzymatic catalysis", "Body temperature", "Occurs in mitochondria"],
            applications: "Fundamental process for energy production in aerobic organisms."
        }
    ],
    11: [ // Sodium
        {
            name: "Sodium with Water",
            equation: "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)",
            description: "Sodium reacts vigorously with water to produce sodium hydroxide and hydrogen gas.",
            conditions: ["Extremely exothermic", "Potentially explosive", "Sodium often melts and forms a sphere"],
            applications: "Demonstration reaction in chemistry education."
        },
        {
            name: "Sodium Chloride Formation",
            equation: "2Na(s) + Cl₂(g) → 2NaCl(s)",
            description: "Sodium metal reacts with chlorine gas to form sodium chloride (table salt).",
            conditions: ["Highly exothermic", "Vigorous reaction", "Forms white crystalline product"],
            applications: "Illustrates ionic bond formation in chemistry education."
        }
    ],
    17: [ // Chlorine
        {
            name: "Water Disinfection",
            equation: "Cl₂(g) + H₂O(l) → HOCl(aq) + HCl(aq)",
            description: "Chlorine dissolves in water forming hypochlorous acid, a disinfectant, and hydrochloric acid.",
            conditions: ["Room temperature", "Acidic pH results", "UV light accelerates decomposition"],
            applications: "Municipal water treatment and swimming pool disinfection."
        },
        {
            name: "Reaction with Metals",
            equation: "2Fe(s) + 3Cl₂(g) → 2FeCl₃(s)",
            description: "Chlorine gas reacts with iron to form iron(III) chloride.",
            conditions: ["Exothermic reaction", "Can occur at room temperature", "More vigorous with heating"],
            applications: "Production of metal chlorides for industrial applications."
        }
    ],
    // Template for adding more elements
    /*
    XX: [ // Element Name
        {
            name: "Reaction Name",
            equation: "Reactants → Products",
            description: "Description of the reaction.",
            conditions: ["Condition 1", "Condition 2", "Condition 3"],
            applications: "Applications of this reaction."
        }
    ],
    */
};

// Function to generate the reactions content
function updateReactionsTab(element) {
    const reactionsContainer = document.getElementById('reactions-container');
    
    // Clear previous content
    reactionsContainer.innerHTML = '';
    
    // Check if reactions exist for this element
    if (elementReactions[element.number] && elementReactions[element.number].length > 0) {
        // Create reactions cards
        elementReactions[element.number].forEach(reaction => {
            const reactionCard = document.createElement('div');
            reactionCard.classList.add('reaction-card');
            
            const reactionHeader = document.createElement('div');
            reactionHeader.classList.add('reaction-header');
            reactionHeader.textContent = reaction.name;
            
            const reactionBody = document.createElement('div');
            reactionBody.classList.add('reaction-body');
            
            const equation = document.createElement('div');
            equation.classList.add('reaction-equation');
            equation.innerHTML = formatEquation(reaction.equation);
            
            const description = document.createElement('div');
            description.classList.add('reaction-description');
            description.textContent = reaction.description;
            
            const conditions = document.createElement('div');
            conditions.classList.add('reaction-conditions');
            
            const conditionsTitle = document.createElement('h4');
            conditionsTitle.textContent = 'Conditions:';
            
            const conditionsList = document.createElement('ul');
            reaction.conditions.forEach(condition => {
                const listItem = document.createElement('li');
                listItem.textContent = condition;
                conditionsList.appendChild(listItem);
            });
            
            conditions.appendChild(conditionsTitle);
            conditions.appendChild(conditionsList);
            
            const applications = document.createElement('div');
            applications.classList.add('reaction-applications');
            applications.textContent = 'Applications: ' + reaction.applications;
            
            reactionBody.appendChild(equation);
            reactionBody.appendChild(description);
            reactionBody.appendChild(conditions);
            reactionBody.appendChild(applications);
            
            reactionCard.appendChild(reactionHeader);
            reactionCard.appendChild(reactionBody);
            
            reactionsContainer.appendChild(reactionCard);
        });
    } else {
        // No reactions available message
        const noReactions = document.createElement('div');
        noReactions.style.textAlign = 'center';
        noReactions.style.padding = '20px';
        noReactions.style.color = '#666';
        noReactions.innerHTML = `
            <p>No specific reactions available for ${element.name}.</p>
            <p>Would you like to contribute reaction data? <a href="#" class="modal-trigger" data-modal="about-modal">Contact us</a>.</p>
        `;
        reactionsContainer.appendChild(noReactions);
    }
}

// Helper function to format chemical equations with proper styling
function formatEquation(equation) {
    // Replace state symbols (g), (l), (s), (aq) with styled spans
    const withStates = equation.replace(/\((g|l|s|aq)\)/g, '<span class="reaction-state">($1)</span>');
    
    // Replace arrow with styled span
    const withArrow = withStates.replace(/→/g, '<span class="reaction-arrow">→</span>');
    
    // Replace plus with styled span
    const withPlus = withArrow.replace(/\+/g, '<span class="reaction-plus">+</span>');
    
    // Highlight element symbols (This is simplified and might catch non-element text)
    // A more comprehensive approach would use a regex to match only valid element symbols
    return withPlus;
}

// Update reactions when showing element details
function showElementDetails(element) {
    // Note: This is a modified version of the original function from interactions.js
    // The original function body should be kept intact, just add the following line before the end
    
    // Update the reactions tab
    updateReactionsTab(element);
}