// script.js - Rock Paper Scissors Game Logic

const choices = ['rock', 'paper', 'scissors'];
const icons = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

let playerScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;
let gameActive = true;

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const roundInfoEl = document.getElementById('round-info');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');
const choiceBtns = [
    document.getElementById('rock'),
    document.getElementById('paper'),
    document.getElementById('scissors')
];

function getComputerChoice() {
    const idx = Math.floor(Math.random() * 3);
    return choices[idx];
}

function determineWinner(player, computer) {
    if (player === computer) return 'tie';
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'player';
    }
    return 'computer';
}

function updateUI(player, computer, winner) {
    playerChoiceEl.textContent = icons[player];
    computerChoiceEl.textContent = icons[computer];
    if (winner === 'player') {
        messageEl.textContent = 'You win this round!';
        messageEl.style.color = '#6ee7b7';
    } else if (winner === 'computer') {
        messageEl.textContent = 'Computer wins this round!';
        messageEl.style.color = '#f87171';
    } else {
        messageEl.textContent = "It's a tie!";
        messageEl.style.color = '#fbbf24';
    }
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    roundInfoEl.textContent = `Round ${round}/${maxRounds}`;
}

function endGame() {
    gameActive = false;
    choiceBtns.forEach(btn => btn.disabled = true);
    resetBtn.disabled = false;
    if (playerScore > computerScore) {
        messageEl.textContent = 'Congratulations! You Won The Game!';
        messageEl.style.color = '#6ee7b7';
    } else if (computerScore > playerScore) {
        messageEl.textContent = 'Game Over! Computer Wins The Game!';
        messageEl.style.color = '#f87171';
    } else {
        messageEl.textContent = 
            "It's a Tie Game! Try Again!";
        messageEl.style.color = '#fbbf24';
    }
}

function handleChoice(e) {
    if (!gameActive) return;
    const player = e.currentTarget.id;
    const computer = getComputerChoice();
    const winner = determineWinner(player, computer);
    if (winner === 'player') playerScore++;
    else if (winner === 'computer') computerScore++;
    updateUI(player, computer, winner);
    if (round >= maxRounds) {
        setTimeout(endGame, 700);
    } else {
        round++;
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 1;
    gameActive = true;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    roundInfoEl.textContent = `Round 1/${maxRounds}`;
    playerChoiceEl.textContent = '?';
    computerChoiceEl.textContent = '?';
    messageEl.textContent = 'Make your choice!';
    messageEl.style.color = '#fff';
    choiceBtns.forEach(btn => btn.disabled = false);
    resetBtn.disabled = true;
}

choiceBtns.forEach(btn => btn.addEventListener('click', handleChoice));
resetBtn.addEventListener('click', resetGame);

// Accessibility: allow Enter/Space to trigger buttons
choiceBtns.forEach(btn => {
    btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            btn.click();
        }
    });
});
resetBtn.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && !resetBtn.disabled) {
        resetBtn.click();
    }
});
