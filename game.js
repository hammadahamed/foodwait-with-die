
(function () {
    let player1 = true;
    let tartget = 5;
    let sound = true;
    let soundBtn = document.querySelector("#sound");
    let wonMusic = new Audio('./assets/won.wav');
    let rollMusic = new Audio('./assets/dice-fx.mpeg');
    let turnBreakMusic = new Audio('./assets/turn-break.mpeg');
    let die = document.getElementById("die");

    let spinBtn = document.getElementById("spin-btn");
    let spinBtnContainer1 = document.getElementById("spinner-wrap1");
    let spinBtnContainer2 = document.getElementById("spinner-wrap2");
    let holdBtn = document.getElementById("hold-btn");

    let playerTarget = document.getElementById("target-score");
    let confetti = document.getElementById("confetti");
    let winner = document.getElementById("winner");

    let howToPlay = document.querySelector("#how-to-play");
    let instructions = document.getElementById("instructions");
    let turnBreakNumber = document.getElementById("turn-break-number");

    let playerName1 = document.querySelector("#player1");
    let playerName2 = document.querySelector("#player2");

    let playerCurrScore1 = document.querySelector("#current-score1");
    let playerCurrScore2 = document.querySelector("#current-score2");

    let playerTotalScore1 = document.querySelector("#total-score1");
    let playerTotalScore2 = document.querySelector("#total-score2");

    let left = document.querySelector(".game-left");
    let right = document.querySelector(".game-right");

    let active = "rgba(255, 255, 255, .2)";
    let inactive = "rgba(255, 255, 255, .13)";

    let prevRollNumber = 0;
    let curScore = 0;
    let totalScore1 = 0
    let totalScore2 = 0;

    // DIE ROLL FUNCTION
    function dieSpin(e) {
        // PLAY SOUND
        if (sound) {
            rollMusic.currentTime = 0;
            rollMusic.play();
        }
        // settting the TARGET SCORE
        tartget = (document.getElementById("target-score").innerText).trim()
        playerTarget.innerText = tartget;

        let face = Math.ceil(Math.random() * 6);
        die.classList.remove("slow-spinner");
        // spinning
        die.classList.add("spinner");
        // disabling the button click
        spinBtn.disabled = true;
        setTimeout(() => {
            die.src = `./assets/die${face}.png`;
            die.classList.remove("spinner");
            spinBtn.disabled = false;

            if (face == prevRollNumber || face == 6) {
                switchPlayer()
            }
            else if (player1) {
                curScore += face;
                playerCurrScore1.innerHTML = curScore.toString();
            }
            else {
                curScore += face;
                playerCurrScore2.innerHTML = curScore.toString();
            }
            prevRollNumber = face;
            turnBreakNumber.innerText = prevRollNumber.toString();
            rollMusic.pause();
        }, 300);
    }

    function resetPlayer1() { playerCurrScore1.innerHTML = "0"; };
    function resetPlayer2() { playerCurrScore2.innerHTML = "0"; };

    function holdScore() {
        if (player1) {
            totalScore1 += curScore;
            playerTotalScore1.innerHTML = totalScore1;
        }
        else {
            totalScore2 += curScore;
            playerTotalScore2.innerHTML = totalScore2;
        }
        // CHECK IF TARGET REACHED
        // WINNING
        if (totalScore1 >= tartget || totalScore2 >= tartget) {
            if (sound) {
                wonMusic.play();
            }
            if (totalScore1 >= tartget) {
                winner.innerText = playerName1.innerHTML;
            }
            else if (totalScore2 >= tartget) {
                winner.innerText = playerName2.innerHTML;
            }
            confetti.classList.remove("hidden");
            setTimeout(() => {
                confetti.classList.add("hidden");
                restartGame();
                wonMusic.pause();
            }, 5000);
        }
        switchPlayer();
        holdBtn.blur();
    }

    // PLAYER SWITCHING FUNCTION
    function switchPlayer() {
        console.log("switching player")
        // PLAY SOUND
        if (sound) {
            turnBreakMusic.currentTime = 0;
            turnBreakMusic.play();
        }
        if (player1) {
            left.style.background = inactive;
            right.style.background = active;
            resetPlayer1();
            spinBtnContainer1.removeChild(spinBtn);
            spinBtnContainer2.appendChild(spinBtn);

        }
        else {
            left.style.background = active;
            right.style.background = inactive;
            resetPlayer2();
            spinBtnContainer2.removeChild(spinBtn);
            spinBtnContainer1.appendChild(spinBtn);

        }
        player1 = !player1;
        curScore = 0;
    }

    // NEW GAME
    function restartGame() {
        switchPlayer();
        // variables resetting
        prevRollNumber = 0;
        curScore = 0;
        totalScore1 = 0
        totalScore2 = 0;

        // elements resetting
        playerTotalScore1.innerText = "0";
        playerTotalScore2.innerText = "0";
        turnBreakNumber.innerText = "0";
        die.src = `./assets/die6.png`;
        die.classList.add("slow-spinner");

    }

    // SPIN ON CLICK
    spinBtn.addEventListener("click", (e) => { dieSpin(e) });
    // HOLD ON CLICK
    holdBtn.addEventListener("click", (e) => { holdScore(e) });

    // SPIN ON PRESS
    document.body.addEventListener("keyup", (e) => {
        if ((e.key == "a" || e.key == "A") && player1) {
            dieSpin();
        }
        if ((e.key == "l" || e.key == "L") && !player1) {
            dieSpin();
        }
        else if (e.key == " ") {
            e.stopImmediatePropagation();
            holdScore(e);

        }
    });

    // TOGGLE SOUND
    soundBtn.addEventListener("click", (e) => {
        sound = !sound;
        let img = "x";
        if (sound) img = "2";
        else img = "x";
        soundBtn.src = `./assets/volume-${img}.svg`;

    });

    // HOW TO PLAY
    howToPlay.addEventListener("click", (e) => {
        instructions.classList.remove("hidden")
    });
    instructions.addEventListener("click", (e) => {
        instructions.classList.add("hidden")
    });

})();