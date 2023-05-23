let scores = JSON.parse(localStorage.getItem('scores')) || {
    Wins: 0,
    Losses: 0,
    Ties: 0
    }
    document.querySelector('.js-win').innerText = scores.Wins;
    document.querySelector('.js-loss').innerText = scores.Losses;
    document.querySelector('.js-tie').innerText = scores.Ties;

    document.querySelector('.js-rock-btn').addEventListener('click',() => {
        playGame('rock');
    })

    document.querySelector('.js-paper-btn').addEventListener('click',() => {
        playGame('paper');
    })

    document.querySelector('.js-scissors-btn').addEventListener('click',() => {
        playGame('scissors');
    })

    document.querySelector('.js-select-yes').addEventListener('click',() => {
        ResetScore();
        hideBar();
    })

    document.querySelector('.js-select-no').addEventListener('click',() => {
        hideBar();
    })
  

    document.body.addEventListener('keydown',(event) =>{
      if(event.key == 'r'){
        playGame('rock');
      }
      else if(event.key == 'p'){
        playGame('paper');
      }
      else if(event.key == 's'){
        playGame('scissors');
      }
      else if(event.key == 'a'){
        autoPlay();
        toggleAutoPlay();
      }
      else if(event.key == 'Backspace'){
        checkPreference();
      }
    })

    document.querySelector('.js-auto-play').addEventListener('click',() => {
        autoPlay();
    })
    document.querySelector('.js-auto-play').addEventListener('click',() => {
        toggleAutoPlay();
    })
    document.querySelector('.js-reset-score').addEventListener('click',() => {
        checkPreference();
    })

    let isAutoPlaying = false;
    let intervalId;

    const hideBar = () => {
        document.querySelector('.js-reset-selector').classList.add('is-not-toggled');
    }

    const checkPreference = () =>{
        document.querySelector('.js-reset-selector').classList.remove('is-not-toggled');

    }

    const toggleAutoPlay = () => {
        let txt = document.querySelector('.js-auto-play').innerText;
        if(txt == 'Auto Play'){
            document.querySelector('.js-auto-play').innerText = 'Stop Playing'
        }
        else{
            document.querySelector('.js-auto-play').innerText = 'Auto Play'
        }
    }

    const autoPlay = () => {
      if(!isAutoPlaying){
        intervalId = setInterval(function(){
        const playerMove = pickComputerMove();
        playGame(playerMove);
        },1000);
        isAutoPlaying = true;
      }
      else{
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
    }
    const ResetScore = () =>{
        scores.Wins = 0;
        scores.Losses = 0;
        scores.Ties = 0;
        document.querySelector('.js-win').innerText = scores.Wins;
        document.querySelector('.js-loss').innerText = scores.Losses;
        document.querySelector('.js-tie').innerText = scores.Ties;
        document.querySelector('.js-urpick').innerHTML = '';
        document.querySelector('.js-compick').innerHTML = '';
        localStorage.removeItem("scores");
    }
    function playGame(playerMove) {
        const computerMove = pickComputerMove();
        let result = '';
        if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
            scores.Losses = scores.Losses + 1;
        } else if (computerMove === 'paper') {
            result = 'You win.';
            scores.Wins = scores.Wins + 1;
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
            scores.Ties = scores.Ties + 1;
        }

        } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
            scores.Wins = scores.Wins + 1;
        } else if (computerMove === 'paper') {
            result = 'Tie.';
            scores.Ties = scores.Ties + 1;
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
            scores.Losses = scores.Losses + 1;  
        }
        
        } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
            scores.Ties = scores.Ties + 1;
            
        } else if (computerMove === 'paper') {
            result = 'You lose.';
            scores.Losses = scores.Losses + 1;
        } else if (computerMove === 'scissors') {
            result = 'You win.';
            scores.Wins = scores.Wins + 1;
        }
        }
        document.querySelector('.js-urpick').innerHTML = `<img class="move-icon " src=`${playerMove}-emoji.png` alt="">`;
        document.querySelector('.js-compick').innerHTML = `<img class="move-icon " src=`${computerMove}-emoji.png` alt="">`;
        document.querySelector('.js-result').innerText = result;
        document.querySelector('.js-win').innerText = scores.Wins;
        document.querySelector('.js-loss').innerText = scores.Losses;
        document.querySelector('.js-tie').innerText = scores.Ties;
        console.log(scores);
        localStorage.setItem('scores',JSON.stringify(scores));
    }

    function pickComputerMove() {
        const randomNumber = Math.random();

        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
        }
        document.querySelector('.js-compick').innerText = computerMove;
        return computerMove;
    }
