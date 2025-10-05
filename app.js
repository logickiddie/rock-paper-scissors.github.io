let userScore = 0;
let compScore = 0;

// DOM elements
const userScoreSpan = document.getElementById('user-score');
const compScoreSpan = document.getElementById('comp-score');
const scoreBoardDiv = document.querySelector('.score-board');
const resultP = document.querySelector('.result > p');
const rockDiv = document.getElementById('r');
const paperDiv = document.getElementById('p');
const scissorsDiv = document.getElementById('s');

// Game constants
const CHOICES = {
    r: 'Rock',
    p: 'Paper', 
    s: 'Scissors'
};

const WINNING_COMBINATIONS = {
    rs: true, // rock beats scissors
    pr: true, // paper beats rock
    sp: true  // scissors beats paper
};

/**
 * Get computer's random choice
 * @returns {string} Computer's choice ('r', 'p', or 's')
 */
function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Convert choice letter to readable word
 * @param {string} letter - Choice letter ('r', 'p', or 's')
 * @returns {string} Readable choice name
 */
function convertToWord(letter) {
    return CHOICES[letter] || 'Unknown';
}

/**
 * Create formatted text with subscript
 * @param {string} text - Text to format
 * @returns {string} Formatted HTML string
 */
function createFormattedText(text) {
    return text.fontsize(3).sub();
}

/**
 * Update score display
 */
function updateScoreDisplay() {
    userScoreSpan.innerHTML = userScore;
    compScoreSpan.innerHTML = compScore;
}

/**
 * Add visual feedback to choice element
 * @param {string} userChoice - User's choice
 * @param {string} glowClass - CSS class for glow effect
 */
function addVisualFeedback(userChoice, glowClass) {
    const element = document.getElementById(userChoice);
    if (element) {
        element.classList.add(glowClass);
        setTimeout(() => {
            element.classList.remove(glowClass);
        }, 300);
    }
}

/**
 * Handle user win scenario
 * @param {string} userChoice - User's choice
 * @param {string} computerChoice - Computer's choice
 */
function handleWin(userChoice, computerChoice) {
    userScore++;
    updateScoreDisplay();
    
    const smallUserWord = createFormattedText("user");
    const smallCompWord = createFormattedText("comp");
    
    resultP.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. You Win! 🎉`;
    addVisualFeedback(userChoice, 'green-glow');
}

/**
 * Handle user loss scenario
 * @param {string} userChoice - User's choice
 * @param {string} computerChoice - Computer's choice
 */
function handleLoss(userChoice, computerChoice) {
    compScore++;
    updateScoreDisplay();
    
    const smallUserWord = createFormattedText("user");
    const smallCompWord = createFormattedText("comp");
    
    resultP.innerHTML = `${convertToWord(userChoice)}${smallUserWord} loses to ${convertToWord(computerChoice)}${smallCompWord}. You Lose! 😢`;
    addVisualFeedback(userChoice, 'red-glow');
}

/**
 * Handle draw scenario
 * @param {string} userChoice - User's choice
 * @param {string} computerChoice - Computer's choice
 */
function handleDraw(userChoice, computerChoice) {
    const smallUserWord = createFormattedText("user");
    const smallCompWord = createFormattedText("comp");
    
    resultP.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals ${convertToWord(computerChoice)}${smallCompWord}. It's a Draw! 🤝`;
    addVisualFeedback(userChoice, 'grey-glow');
}

/**
 * Determine game outcome
 * @param {string} userChoice - User's choice
 * @param {string} computerChoice - Computer's choice
 * @returns {string} Game result ('win', 'lose', or 'draw')
 */
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    }
    
    const combination = userChoice + computerChoice;
    return WINNING_COMBINATIONS[combination] ? 'win' : 'lose';
}

/**
 * Main game logic
 * @param {string} userChoice - User's choice ('r', 'p', or 's')
 */
function playGame(userChoice) {
    if (!CHOICES[userChoice]) {
        console.error('Invalid user choice:', userChoice);
        return;
    }
    
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);
    
    switch (result) {
        case 'win':
            handleWin(userChoice, computerChoice);
            break;
        case 'lose':
            handleLoss(userChoice, computerChoice);
            break;
        case 'draw':
            handleDraw(userChoice, computerChoice);
            break;
        default:
            console.error('Unexpected game result:', result);
    }
}

/**
 * Add event listeners to choice buttons
 */
function addEventListeners() {
    const choiceElements = [
        { element: rockDiv, choice: 'r' },
        { element: paperDiv, choice: 'p' },
        { element: scissorsDiv, choice: 's' }
    ];
    
    choiceElements.forEach(({ element, choice }) => {
        if (element) {
            element.addEventListener('click', () => playGame(choice));
        } else {
            console.warn(`Element for choice '${choice}' not found`);
        }
    });
}

/**
 * Initialize the game
 */
function initializeGame() {
    // Check if required DOM elements exist
    const requiredElements = [userScoreSpan, compScoreSpan, resultP];
    const missingElements = requiredElements.filter(element => !element);
    
    if (missingElements.length > 0) {
        console.error('Required DOM elements not found. Game initialization failed.');
        return;
    }
    
    // Initialize scores
    updateScoreDisplay();
    
    // Set initial message
    resultP.innerHTML = "Choose your move to start the game! 🎮";
    
    // Add event listeners
    addEventListeners();
    
    console.log('Rock Paper Scissors game initialized successfully! 🎯');
}

// Initialize the game when the script loads
initializeGame();
