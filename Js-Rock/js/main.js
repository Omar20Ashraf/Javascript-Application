// Get Dom ELEMENT

const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
  player: 0,
  computer: 0
};


function play(e){
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const ComputerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, ComputerChoice);
  showWinner(winner,ComputerChoice);

}

// Get computers choice
function getComputerChoice() {
  const rand = Math.random();
  if (rand < 0.34) {
    return 'rock';
  } else if (rand <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

//define the winner

function getWinner(p, c) {
  if (p === c) {
    return 'draw';
  } else if (p === 'rock') {
    if (c === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

//show the winner
function showWinner(winner,computerChoice)
{
  if(winner === 'player'){
    scoreboard.player++;

    result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Choice <strong>${computerChoice.charAt(0).toUpperCase()
       + computerChoice.slice(1)}</strong></p>
    `;
  } else if(winner === 'computer'){
     scoreboard.computer++;

    result.innerHTML = `
      <h1 class="text-lose">You lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Choice <strong>${computerChoice.charAt(0).toUpperCase()
       + computerChoice.slice(1)}</strong></p>
    `;   
  } else {
    result.innerHTML = `
      <h1>Its Draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Choice <strong>${computerChoice.charAt(0).toUpperCase()
       + computerChoice.slice(1)}</strong></p>
    `;
  }

  //show the score
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
  `;

  //show the modal
  modal.style.display="block";
}


//clear modal
function clearModal(e){
  if(e.target == modal){
      modal.style.display = 'none';
  }
}

//restart the Game
function restartGame()
{
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
}

//event listener
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click',clearModal);
restart.addEventListener('click',restartGame);
