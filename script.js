const board = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');

let cardValues = ['x', 'o', '8', '0', 'I', 'H', 'M', '1'];
cardValues = [...cardValues, ...cardValues]; // Duplicate for pairs

// Shuffle function to randomize the card positions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Initialize game
function createBoard() {
    shuffle(cardValues);
    board.innerHTML = ''; // Clear the board
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

let flippedCards = [];
let matchedCards = [];

// Handle card flipping
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.textContent = this.getAttribute('data-value');
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check if the two flipped cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
        }, 1000);
    }

    flippedCards = [];

    // Check if all cards are matched
    if (matchedCards.length === cardValues.length) {
        setTimeout(() => {
            alert('Congratulations! You won the game!');
        }, 500);
    }
}

// Reset game
resetBtn.addEventListener('click', createBoard);

// Start the game
createBoard();
