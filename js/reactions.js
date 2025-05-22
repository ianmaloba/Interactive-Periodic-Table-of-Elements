// Initialize reaction filters and state
let activeReactionFilters = {
    reactionType: 'all'
};

// Update the reactions tab when showing element details
function updateReactionsTab(element) {
    const reactionsContainer = document.getElementById('reactions-container');
    
    // Clear previous content
    if (reactionsContainer) {
        reactionsContainer.innerHTML = '';
    } else {
        console.error("Reactions container not found");
        return;
    }
    
    // Add filters section if there are reactions
    if (window.hasReactions && window.hasReactions(element.number)) {
        addReactionFilters(reactionsContainer, element);
    }
    
    // Get reactions for this element
    let reactions = window.getElementReactions ? window.getElementReactions(element.number) : [];
    
    // Apply filters if any
    reactions = filterReactions(reactions);
    
    // Check if reactions exist for this element
    if (reactions.length > 0) {
        // Create reactions cards
        reactions.forEach(reaction => {
            const reactionCard = createReactionCard(reaction);
            reactionsContainer.appendChild(reactionCard);
        });
        
        // Add reaction count indicator
        const countIndicator = document.createElement('div');
        countIndicator.classList.add('reaction-count');
        countIndicator.textContent = `Showing ${reactions.length} reaction${reactions.length !== 1 ? 's' : ''}`;
        if (window.getElementReactions && window.getElementReactions(element.number).length !== reactions.length) {
            countIndicator.textContent += ` (filtered from ${window.getElementReactions(element.number).length} total)`;
        }
        reactionsContainer.appendChild(countIndicator);
    } else {
        // No reactions available message
        const noReactions = document.createElement('div');
        noReactions.classList.add('no-reactions');
        
        if (window.hasReactions && window.hasReactions(element.number)) {
            noReactions.innerHTML = `
                <p>No reactions matching your current filters.</p>
                <button class="reset-filters-btn">Reset Filters</button>
            `;
            
            // Add event listener to the button once it's in the DOM
            setTimeout(() => {
                const resetButton = noReactions.querySelector('.reset-filters-btn');
                if (resetButton) {
                    resetButton.addEventListener('click', () => {
                        resetReactionFilters(element);
                    });
                }
            }, 0);
        } else {
            noReactions.innerHTML = `
                <p>No specific reactions available for ${element.name}.</p>
                <p>This may be because the element:</p>
                <ul>
                    <li>Is exceptionally stable or inert (like noble gases)</li>
                    <li>Is highly radioactive with very short half-life</li>
                    <li>Has not been extensively studied in chemical reactions</li>
                </ul>
            `;
        }
        
        reactionsContainer.appendChild(noReactions);
    }
}

// Create a reaction card
function createReactionCard(reaction) {
    const reactionCard = document.createElement('div');
    reactionCard.classList.add('reaction-card');
    
    // Add reaction type badge if available
    if (reaction.reactionType && reaction.reactionType !== "None") {
        const typeBadge = document.createElement('div');
        typeBadge.classList.add('reaction-type-badge');
        typeBadge.textContent = reaction.reactionType;
        reactionCard.appendChild(typeBadge);
    }
    
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
    
    // Add conditions section if available
    if (reaction.conditions && reaction.conditions.length > 0) {
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
        reactionBody.appendChild(conditions);
    }
    
    // Add applications if available
    if (reaction.applications) {
        const applications = document.createElement('div');
        applications.classList.add('reaction-applications');
        applications.textContent = 'Applications: ' + reaction.applications;
        reactionBody.appendChild(applications);
    }
    
    reactionBody.insertBefore(equation, reactionBody.firstChild);
    reactionBody.insertBefore(description, reactionBody.children[1]);
    
    reactionCard.appendChild(reactionHeader);
    reactionCard.appendChild(reactionBody);
    
    return reactionCard;
}

// Add reaction filters to the container
function addReactionFilters(container, element) {
    const allReactions = window.getElementReactions ? window.getElementReactions(element.number) : [];
    
    // Only add filters if we have enough reactions
    if (allReactions.length <= 1) return;
    
    const filtersSection = document.createElement('div');
    filtersSection.classList.add('reaction-filters');
    
    const filtersTitle = document.createElement('h4');
    filtersTitle.textContent = 'Filter Reactions:';
    filtersSection.appendChild(filtersTitle);
    
    // Add reaction type filter if we have multiple types
    const reactionTypes = getReactionTypesForElement(allReactions);
    
    if (reactionTypes.length > 1) {
        const typeFilterGroup = document.createElement('div');
        typeFilterGroup.classList.add('filter-group');
        
        const typeLabel = document.createElement('label');
        typeLabel.textContent = 'Reaction Type:';
        typeLabel.setAttribute('for', 'reaction-type-filter');
        
        const typeSelect = document.createElement('select');
        typeSelect.id = 'reaction-type-filter';
        
        // Add all option
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'All Types';
        typeSelect.appendChild(allOption);
        
        // Add options for each type
        reactionTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            if (activeReactionFilters.reactionType === type) {
                option.selected = true;
            }
            typeSelect.appendChild(option);
        });
        
        // Add event listener
        typeSelect.addEventListener('change', function() {
            activeReactionFilters.reactionType = this.value;
            updateReactionsTab(element);
        });
        
        typeFilterGroup.appendChild(typeLabel);
        typeFilterGroup.appendChild(typeSelect);
        filtersSection.appendChild(typeFilterGroup);
    }
    
    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.classList.add('reset-filters-btn');
    resetButton.textContent = 'Reset Filters';
    resetButton.addEventListener('click', () => {
        resetReactionFilters(element);
    });
    filtersSection.appendChild(resetButton);
    
    container.appendChild(filtersSection);
}

// Get unique reaction types for an element's reactions
function getReactionTypesForElement(reactions) {
    const types = new Set();
    
    reactions.forEach(reaction => {
        if (reaction.reactionType && reaction.reactionType !== "None") {
            types.add(reaction.reactionType);
        }
    });
    
    return Array.from(types).sort();
}

// Reset reaction filters
function resetReactionFilters(element) {
    activeReactionFilters = {
        reactionType: 'all'
    };
    
    updateReactionsTab(element);
}

// Filter reactions based on active filters
function filterReactions(reactions) {
    return reactions.filter(reaction => {
        // Filter by reaction type
        if (activeReactionFilters.reactionType !== 'all' && 
            reaction.reactionType !== activeReactionFilters.reactionType) {
            return false;
        }
        
        return true;
    });
}

// Helper function to format chemical equations with proper styling
function formatEquation(equation) {
    if (!equation) return '';
    
    // Format line breaks
    let formattedEquation = equation.replace(/\n/g, '<br>');
    
    // Format state symbols (g), (l), (s), (aq) with styled spans
    formattedEquation = formattedEquation.replace(/\((g|l|s|aq)\)/g, '<span class="reaction-state">($1)</span>');
    
    // Format arrow symbols
    formattedEquation = formattedEquation.replace(/→/g, '<span class="reaction-arrow">→</span>');
    formattedEquation = formattedEquation.replace(/⇌/g, '<span class="reaction-arrow reaction-equilibrium">⇌</span>');
    
    // Format plus signs
    formattedEquation = formattedEquation.replace(/\+/g, '<span class="reaction-plus">+</span>');
    
    // Format subscripts and superscripts
    formattedEquation = formattedEquation.replace(/₀|₁|₂|₃|₄|₅|₆|₇|₈|₉/g, '<sub>$&</sub>');
    formattedEquation = formattedEquation.replace(/¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹|⁰/g, '<sup>$&</sup>');
    
    // Remove the unicode characters from the subscripts and superscripts
    formattedEquation = formattedEquation.replace(/<sub>([₀₁₂₃₄₅₆₇₈₉]+)<\/sub>/g, function(match, group) {
        return '<sub>' + group
            .replace(/₀/g, '0')
            .replace(/₁/g, '1')
            .replace(/₂/g, '2')
            .replace(/₃/g, '3')
            .replace(/₄/g, '4')
            .replace(/₅/g, '5')
            .replace(/₆/g, '6')
            .replace(/₇/g, '7')
            .replace(/₈/g, '8')
            .replace(/₉/g, '9') + '</sub>';
    });
    
    formattedEquation = formattedEquation.replace(/<sup>([¹²³⁴⁵⁶⁷⁸⁹⁰]+)<\/sup>/g, function(match, group) {
        return '<sup>' + group
            .replace(/⁰/g, '0')
            .replace(/¹/g, '1')
            .replace(/²/g, '2')
            .replace(/³/g, '3')
            .replace(/⁴/g, '4')
            .replace(/⁵/g, '5')
            .replace(/⁶/g, '6')
            .replace(/⁷/g, '7')
            .replace(/⁸/g, '8')
            .replace(/⁹/g, '9') + '</sup>';
    });
    
    return formattedEquation;
}