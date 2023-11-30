const menuWindow = document.querySelector('h2');
const optionAgainstPlayer = document.querySelector('.option1');
const startGameButton = document.createElement('button');
const theGameWindow = document.createElement('div');
const scoreBoard = document.createElement('div');

scoreBoard.classList.add('scoreboard');
document.body.appendChild(scoreBoard);
document.body.appendChild(theGameWindow);

let flippedCards = [];
let player1Score = 0;
let player2Score = 0;

let player1Name, player2Name;
let cards = [];
let cardsShuffled = false;

optionAgainstPlayer.addEventListener('click', function () {
    menuWindow.textContent = '';

    const player1Label = document.createElement('label');
    player1Label.textContent = 'Player 1 Name:';
    const player1Input = document.createElement('input');
    player1Input.placeholder = 'Enter Player 1 Name';
    player1Input.classList.add('input-field');
	player1Input.id = 'player1Input'

    const player2Label = document.createElement('label');
    player2Label.textContent = 'Player 2 Name:';
    const player2Input = document.createElement('input');
    player2Input.placeholder = 'Enter Player 2 Name';
    player2Input.classList.add('input-field');
	player2Input.id = 'player2Input'

    startGameButton.textContent = 'Start Game';
    startGameButton.classList.add('start-game');

    startGameButton.addEventListener('click', function () {
		
        player1Name = player1Input.value;
        player2Name = player2Input.value;

		currentPlayer = player1Name;

        if (!cardsShuffled) {
            shuffleCards();
            cardsShuffled = true;
        }
        renderGameBoard();
        generateScoreboard(player1Name, player2Name);
		
    });

    menuWindow.appendChild(player1Label);
    menuWindow.appendChild(player1Input);
    menuWindow.appendChild(player2Label);
    menuWindow.appendChild(player2Input);
    menuWindow.appendChild(startGameButton);
});

function renderGameBoard() {
    menuWindow.style.display = 'none';
    theGameWindow.style.display = 'grid';
    theGameWindow.classList.add('game-board');
    theGameWindow.textContent = '';

    cards.forEach((cardValue, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = '?';
        cardElement.setAttribute('data-index', index);
        cardElement.addEventListener('click', handleCardClick);

        theGameWindow.appendChild(cardElement);
		
    });

    theGameWindow.style.display = 'flex';
}

function handleCardClick(event) {
    const cardElement = event.target;
    const cardIndex = parseInt(cardElement.getAttribute('data-index'), 10);
    const cardValue = cards[cardIndex];

    if (!cardElement.classList.contains('flipped') && flippedCards.length < 2) {
        cardElement.textContent = cardValue;
        cardElement.classList.add('flipped');

        flippedCards.push({ element: cardElement, value: cardValue });

        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;
            if (card1.value === card2.value) {
                handleMatchedCards(currentPlayer);
            } else {
                setTimeout(() => {
                    card1.element.textContent = '?';
                    card2.element.textContent = '?';
                    card1.element.classList.remove('flipped');
                    card2.element.classList.remove('flipped');
                    flippedCards = [];
                    switchPlayer();
					
                }, 1000);
            }
        }
    }
}


function generateScoreboard(playerName1, playerName2) {
    scoreBoard.textContent = `Scoreboard\n${playerName1} - ${player1Score} | ${playerName2} - ${player2Score}\n Turn: ${currentPlayer}`;
	scoreBoard.style.whiteSpace = 'pre';
    scoreBoard.style.display = 'flex';
	
	

}

function handleMatchedCards(player) {
    
    if (player === player1Name) {
        player1Score++;
    } else {
        player2Score++;
    }
    flippedCards = [];
    generateScoreboard(player1Name, player2Name);
}

function shuffleCards() {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    cards = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
}

function switchPlayer() {
    currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
	generateScoreboard(player1Name, player2Name);
}



const restartButton = restartTheGameButton();
const goBackButton = goBackToMainButton();

function restartTheGameButton() {
	const restartButton = document.createElement('button')
	restartButton.textContent = 'Restart Game';
	restartButton.classList.add ('restart-game-button');
	document.body.appendChild(restartButton);
	return restartButton;
}

function goBackToMainButton () {
	const goBackButton = document.createElement('button')
	goBackButton.textContent = 'Main Menu';
	goBackButton.classList.add ('main-menu-button');
	document.body.appendChild(goBackButton);
	return goBackButton;

}



restartButton.addEventListener ('click', function()  {
	player1Score = 0;
    player2Score = 0;
    cardsShuffled = false;
    flippedCards = [];
    currentPlayer = player1Name;
    shuffleCards();
    renderGameBoard();
    generateScoreboard(player1Name, player2Name);
	
})

goBackButton.addEventListener ('click', function()  {
	window.location.reload();
	
})