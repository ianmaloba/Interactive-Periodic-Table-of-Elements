// Quiz functionality
let currentQuiz = {
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    score: 0,
    settings: {
        difficulty: 'medium',
        category: 'all',
        numQuestions: 10
    }
};

// Initialize quiz functionality
function initializeQuiz() {
    // Set up quiz button in navbar
    const quizButton = document.getElementById('quiz-button');
    if (quizButton) {
        quizButton.addEventListener('click', function(e) {
            e.preventDefault();
            openQuizModal();
        });
    }
    
    // Set up start quiz button
    const startQuizButton = document.getElementById('start-quiz-button');
    if (startQuizButton) {
        startQuizButton.addEventListener('click', startQuiz);
    }
    
    // Set up quiz navigation buttons
    setupQuizNavigation();
    
    // Set up quiz result buttons
    setupQuizResultButtons();
}

// Open the quiz modal
function openQuizModal() {
    const quizModal = document.getElementById('quiz-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (quizModal && modalOverlay) {
        quizModal.style.display = 'block';
        modalOverlay.style.display = 'block';
        
        // Show start screen
        showQuizScreen('quiz-start-screen');
    }
}

// Start a new quiz
function startQuiz() {
    // Get quiz settings
    const difficulty = document.getElementById('quiz-difficulty').value;
    const category = document.getElementById('quiz-category').value;
    const numQuestions = parseInt(document.getElementById('quiz-questions').value);
    
    currentQuiz = {
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
        settings: {
            difficulty,
            category,
            numQuestions
        }
    };
    
    // Generate questions
    generateQuizQuestions();
    
    // Update total questions display
    document.getElementById('total-questions').textContent = currentQuiz.questions.length;
    
    // Show the first question
    showQuizScreen('quiz-question-screen');
    showQuizQuestion(0);
}

// Generate quiz questions based on settings
function generateQuizQuestions() {
    const { difficulty, category, numQuestions } = currentQuiz.settings;
    
    // Elements to use in the quiz
    let availableElements = [...elements];
    
    // Filter elements based on difficulty
    if (difficulty === 'easy') {
        // Use common elements (first 36 elements)
        availableElements = availableElements.filter(el => el.number <= 36);
    } else if (difficulty === 'medium') {
        // Use elements 1-83 (excluding some of the more obscure ones)
        availableElements = availableElements.filter(el => el.number <= 83);
    }
    // For 'hard', use all elements
    
    // Generate questions based on category
    let questions = [];
    
    if (category === 'all' || category === 'symbols') {
        // Element symbol questions
        questions = questions.concat(generateSymbolQuestions(availableElements, 
            category === 'all' ? Math.floor(numQuestions / 4) : numQuestions));
    }
    
    if (category === 'all' || category === 'properties') {
        // Element properties questions
        questions = questions.concat(generatePropertyQuestions(availableElements, 
            category === 'all' ? Math.floor(numQuestions / 4) : numQuestions));
    }
    
    if (category === 'all' || category === 'categories') {
        // Element category questions
        questions = questions.concat(generateCategoryQuestions(availableElements, 
            category === 'all' ? Math.floor(numQuestions / 4) : numQuestions));
    }
    
    if (category === 'all' || category === 'electron-config') {
        // Electron configuration questions
        questions = questions.concat(generateElectronConfigQuestions(availableElements, 
            category === 'all' ? Math.floor(numQuestions / 4) : numQuestions));
    }
    
    // Shuffle and limit to the requested number of questions
    questions = shuffleArray(questions).slice(0, numQuestions);
    
    currentQuiz.questions = questions;
    currentQuiz.answers = new Array(questions.length).fill(null);
}

// Generate questions about element symbols
function generateSymbolQuestions(elements, count) {
    const questions = [];
    const shuffledElements = shuffleArray([...elements]);
    
    // "What is the symbol for..." questions
    for (let i = 0; i < Math.min(count / 2, shuffledElements.length); i++) {
        const correctElement = shuffledElements[i];
        
        // Get 3 random incorrect symbols
        const incorrectElements = shuffleArray(
            shuffledElements.filter(el => el.number !== correctElement.number)
        ).slice(0, 3);
        
        questions.push({
            type: 'symbol',
            text: `What is the chemical symbol for ${correctElement.name}?`,
            correctAnswer: correctElement.symbol,
            options: shuffleArray([
                correctElement.symbol,
                ...incorrectElements.map(el => el.symbol)
            ])
        });
    }
    
    // "Which element has the symbol..." questions
    for (let i = 0; i < Math.min(count / 2, shuffledElements.length); i++) {
        const correctElement = shuffledElements[i];
        
        // Get 3 random incorrect elements
        const incorrectElements = shuffleArray(
            shuffledElements.filter(el => el.number !== correctElement.number)
        ).slice(0, 3);
        
        questions.push({
            type: 'symbol',
            text: `Which element has the symbol ${correctElement.symbol}?`,
            correctAnswer: correctElement.name,
            options: shuffleArray([
                correctElement.name,
                ...incorrectElements.map(el => el.name)
            ])
        });
    }
    
    return shuffleArray(questions).slice(0, count);
}

// Generate questions about element properties
function generatePropertyQuestions(elements, count) {
    const questions = [];
    const shuffledElements = shuffleArray([...elements]);
    
    // Possible properties
    const properties = [
        { name: 'atomic number', value: el => el.number },
        { name: 'atomic mass', value: el => el.mass + ' u' },
        { name: 'electronegativity', value: el => el.electronegativity !== null ? el.electronegativity : 'unknown' },
        { name: 'atomic radius', value: el => el.atomicRadius !== null ? el.atomicRadius + ' pm' : 'unknown' },
        { name: 'melting point', value: el => el.meltingPoint !== null ? el.meltingPoint + ' °C' : 'unknown' }
    ];
    
    // Filter elements with valid property values
    const validElements = shuffledElements.filter(el => 
        el.electronegativity !== null && 
        el.atomicRadius !== null && 
        el.meltingPoint !== null
    );
    
    // Generate questions for each property
    for (let i = 0; i < Math.min(count, validElements.length); i++) {
        const element = validElements[i % validElements.length];
        const property = properties[i % properties.length];
        
        // Skip if property value is unknown
        if (property.value(element) === 'unknown') continue;
        
        questions.push({
            type: 'property',
            text: `What is the ${property.name} of ${element.name}?`,
            correctAnswer: property.value(element).toString(),
            options: generatePropertyOptions(element, property)
        });
    }
    
    return shuffleArray(questions).slice(0, count);
}

// Generate questions about element categories
function generateCategoryQuestions(elements, count) {
    const questions = [];
    const shuffledElements = shuffleArray([...elements]);
    
    // Get all unique categories
    const categories = [...new Set(elements.map(el => el.category))];
    
    // Format category for display
    const formatCategory = category => 
        category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Generate questions
    for (let i = 0; i < Math.min(count, shuffledElements.length); i++) {
        const element = shuffledElements[i];
        const correctCategory = element.category;
        
        // Get 3 random incorrect categories
        const incorrectCategories = shuffleArray(
            categories.filter(cat => cat !== correctCategory)
        ).slice(0, 3);
        
        questions.push({
            type: 'category',
            text: `Which category does ${element.name} belong to?`,
            correctAnswer: formatCategory(correctCategory),
            options: shuffleArray([
                formatCategory(correctCategory),
                ...incorrectCategories.map(formatCategory)
            ])
        });
    }
    
    return shuffleArray(questions).slice(0, count);
}

// Generate questions about electron configurations
function generateElectronConfigQuestions(elements, count) {
    const questions = [];
    const shuffledElements = shuffleArray([...elements]);
    
    // Generate questions
    for (let i = 0; i < Math.min(count, shuffledElements.length); i++) {
        const element = shuffledElements[i];
        
        // Get 3 random incorrect electron configurations
        const incorrectElements = shuffleArray(
            shuffledElements.filter(el => el.number !== element.number)
        ).slice(0, 3);
        
        questions.push({
            type: 'electron-config',
            text: `What is the electron configuration of ${element.name}?`,
            correctAnswer: element.electronConfig,
            options: shuffleArray([
                element.electronConfig,
                ...incorrectElements.map(el => el.electronConfig)
            ])
        });
    }
    
    return shuffleArray(questions).slice(0, count);
}

// Generate plausible but incorrect answers for property questions
function generatePropertyOptions(element, property) {
    let correctValue = property.value(element).toString();
    let numericValue, unit;
    
    // Extract numeric value and unit for numeric properties
    const match = correctValue.match(/^(\d+\.?\d*)(.*)$/);
    if (match) {
        numericValue = parseFloat(match[1]);
        unit = match[2];
        
        // Generate plausible incorrect values
        const variance = 0.25; // 25% variance
        const options = [correctValue];
        
        for (let i = 0; i < 3; i++) {
            // Generate a random variation between -50% and +50% of the value
            let variation = numericValue * (Math.random() * variance * 2 - variance);
            let newValue = Math.abs(numericValue + variation);
            
            // Round appropriately
            if (numericValue >= 100) {
                newValue = Math.round(newValue);
            } else if (numericValue >= 10) {
                newValue = Math.round(newValue * 10) / 10;
            } else {
                newValue = Math.round(newValue * 100) / 100;
            }
            
            options.push(newValue + unit);
        }
        
        return shuffleArray(options);
    }
    
    // For non-numeric properties, use other element values
    return shuffleArray([correctValue, 'N/A', 'Unknown', 'Not measured']);
}

// Show a specific quiz screen
function showQuizScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.quiz-screen').forEach(screen => {
        screen.style.display = 'none';
    });
    
    // Show requested screen
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.style.display = 'block';
    }
}

// Show a specific quiz question
function showQuizQuestion(index) {
    if (index < 0 || index >= currentQuiz.questions.length) return;
    
    currentQuiz.currentQuestionIndex = index;
    const question = currentQuiz.questions[index];
    
    // Update question text
    const questionElement = document.getElementById('quiz-question');
    questionElement.textContent = question.text;
    
    // Update options
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('quiz-option-button');
        optionButton.textContent = option;
        optionButton.dataset.index = i;
        
        // Check if this option was previously selected
        const prevAnswer = currentQuiz.answers[index];
        if (prevAnswer !== null && prevAnswer.selectedOption === option) {
            optionButton.classList.add('selected');
            
            if (prevAnswer.correct) {
                optionButton.classList.add('correct');
            } else {
                optionButton.classList.add('incorrect');
                
                // Add indication of correct answer
                question.options.forEach((opt, j) => {
                    if (opt === question.correctAnswer) {
                        const correctButton = document.createElement('button');
                        correctButton.classList.add('quiz-option-button', 'correct');
                        correctButton.textContent = opt;
                        correctButton.disabled = true;
                        optionsContainer.insertBefore(correctButton, optionsContainer.children[j]);
                        optionsContainer.removeChild(optionsContainer.children[j + 1]);
                    }
                });
            }
            
            // Disable all options if answer was already selected
            optionsContainer.querySelectorAll('.quiz-option-button').forEach(btn => {
                btn.disabled = true;
            });
            
            // Enable next button
            document.getElementById('next-question').disabled = false;
        } else {
            optionButton.addEventListener('click', function() {
                selectAnswer(this);
            });
        }
        
        optionsContainer.appendChild(optionButton);
    });
    
    // Update progress
    document.getElementById('current-question').textContent = index + 1;
    const progressPercentage = ((index + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('progress-bar-fill').style.width = `${progressPercentage}%`;
    
    // Reset next button if no answer is selected yet
    if (currentQuiz.answers[index] === null) {
        document.getElementById('next-question').disabled = true;
    } else {
        document.getElementById('next-question').disabled = false;
    }
}

// Select an answer
function selectAnswer(optionButton) {
    const index = currentQuiz.currentQuestionIndex;
    const question = currentQuiz.questions[index];
    const selectedOption = optionButton.textContent;
    const correct = selectedOption === question.correctAnswer;
    
    // Store the answer
    currentQuiz.answers[index] = {
        selectedOption,
        correct
    };
    
    // Update score if correct
    if (correct) {
        currentQuiz.score++;
    }
    
    // Update UI
    document.querySelectorAll('.quiz-option-button').forEach(btn => {
        btn.classList.remove('selected');
        btn.disabled = true;
    });
    
    optionButton.classList.add('selected');
    
    if (correct) {
        optionButton.classList.add('correct');
    } else {
        optionButton.classList.add('incorrect');
        
        // Show the correct answer
        document.querySelectorAll('.quiz-option-button').forEach(btn => {
            if (btn.textContent === question.correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }
    
    // Enable next button
    document.getElementById('next-question').disabled = false;
}

// Set up quiz navigation buttons
function setupQuizNavigation() {
    // Next question button
    const nextButton = document.getElementById('next-question');
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const nextIndex = currentQuiz.currentQuestionIndex + 1;
            if (nextIndex < currentQuiz.questions.length) {
                showQuizQuestion(nextIndex);
            } else {
                // Show results if all questions answered
                showQuizResults();
            }
        });
    }
    
    // Skip question button
    const skipButton = document.getElementById('skip-question');
    if (skipButton) {
        skipButton.addEventListener('click', function() {
            // Mark question as skipped
            currentQuiz.answers[currentQuiz.currentQuestionIndex] = {
                selectedOption: 'skipped',
                correct: false
            };
            
            // Go to next question
            const nextIndex = currentQuiz.currentQuestionIndex + 1;
            if (nextIndex < currentQuiz.questions.length) {
                showQuizQuestion(nextIndex);
            } else {
                // Show results if all questions answered
                showQuizResults();
            }
        });
    }
}

// Set up quiz result buttons
function setupQuizResultButtons() {
    // Restart quiz button
    const restartButton = document.getElementById('restart-quiz');
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            // Reset current quiz
            currentQuiz.currentQuestionIndex = 0;
            currentQuiz.answers = new Array(currentQuiz.questions.length).fill(null);
            currentQuiz.score = 0;
            
            // Show first question
            showQuizScreen('quiz-question-screen');
            showQuizQuestion(0);
        });
    }
    
    // New quiz button
    const newQuizButton = document.getElementById('new-quiz');
    if (newQuizButton) {
        newQuizButton.addEventListener('click', function() {
            // Show start screen
            showQuizScreen('quiz-start-screen');
        });
    }
}

// Show quiz results
function showQuizResults() {
    showQuizScreen('quiz-results-screen');
    
    // Update score
    document.getElementById('quiz-score').textContent = currentQuiz.score;
    document.getElementById('quiz-total').textContent = currentQuiz.questions.length;
    
    const percentage = Math.round((currentQuiz.score / currentQuiz.questions.length) * 100);
    document.getElementById('quiz-percentage').textContent = `${percentage}%`;
    
    // Update feedback
    const feedbackElement = document.getElementById('quiz-feedback');
    if (percentage >= 90) {
        feedbackElement.textContent = 'Excellent! You are a chemistry master!';
        feedbackElement.style.color = '#4CAF50';
    } else if (percentage >= 70) {
        feedbackElement.textContent = 'Great job! You know your elements well!';
        feedbackElement.style.color = '#8BC34A';
    } else if (percentage >= 50) {
        feedbackElement.textContent = 'Good effort! Keep studying to improve!';
        feedbackElement.style.color = '#FFC107';
    } else {
        feedbackElement.textContent = 'Keep practicing and learning about the elements!';
        feedbackElement.style.color = '#FF5722';
    }
    
    // Create summary of questions and answers
    const summaryElement = document.getElementById('quiz-summary');
    summaryElement.innerHTML = '';
    
    currentQuiz.questions.forEach((question, index) => {
        const answer = currentQuiz.answers[index];
        
        const summaryItem = document.createElement('div');
        summaryItem.classList.add('quiz-summary-item');
        
        const questionText = document.createElement('div');
        questionText.classList.add('quiz-summary-question');
        questionText.textContent = `Q${index + 1}: ${question.text}`;
        
        const answerText = document.createElement('div');
        answerText.classList.add('quiz-summary-answer');
        
        if (answer.selectedOption === 'skipped') {
            answerText.textContent = 'Skipped';
        } else {
            answerText.textContent = `Your answer: ${answer.selectedOption}`;
        }
        
        const resultText = document.createElement('div');
        resultText.classList.add('quiz-summary-result');
        
        if (answer.selectedOption === 'skipped') {
            resultText.textContent = `Correct answer: ${question.correctAnswer}`;
            resultText.classList.add('quiz-summary-skipped');
        } else if (answer.correct) {
            resultText.textContent = 'Correct!';
            resultText.classList.add('quiz-summary-correct');
        } else {
            resultText.textContent = `Correct answer: ${question.correctAnswer}`;
            resultText.classList.add('quiz-summary-incorrect');
        }
        
        summaryItem.appendChild(questionText);
        summaryItem.appendChild(answerText);
        summaryItem.appendChild(resultText);
        
        summaryElement.appendChild(summaryItem);
    });
}

// Helper function to shuffle an array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});