
//  ----------------------------------------------------------------------------
//                                GAME SECTION                                  
//  ----------------------------------------------------------------------------

(function () {
    let player1 = true;
    let tartget = 5;





    let die = document.getElementById("die");

    let spinBtn = document.getElementById("spin-btn");
    let spinBtnContainer1 = document.getElementById("spinner-wrap1");
    let spinBtnContainer2 = document.getElementById("spinner-wrap2");
    console.log(spinBtnContainer1, spinBtnContainer2)
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
        // settting the TARGET SCORE
        tartget = (document.getElementById("target-score").innerText).trim()
        playerTarget.innerText = tartget;
        console.log(tartget)

        let face = Math.ceil(Math.random() * 6);
        console.log(face);
        die.classList.remove("slow-spinner");
        // spinning
        die.classList.add("spinner");
        // disabling the button click
        spinBtn.disabled = true;
        setTimeout(() => {
            die.src = `/assets/die${face}.png`;
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

        }, 200);
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
            }, 5000);
        }
        switchPlayer()
    }

    // PLAYER SWITCHING FUNCTION
    function switchPlayer() {
        if (player1) {
            left.style.background = inactive;
            right.style.background = active;
            resetPlayer1();
            console.log("removing btn frm 1...", spinBtn)
            spinBtnContainer1.removeChild(spinBtn);
            console.log("addin btn to 2...", spinBtn)
            spinBtnContainer2.appendChild(spinBtn);

        }
        else {
            left.style.background = active;
            right.style.background = inactive;
            resetPlayer2();
            console.log("removing btn frm 2...", spinBtn)
            spinBtnContainer2.removeChild(spinBtn);
            console.log("addin btn to 1...", spinBtn)
            spinBtnContainer1.appendChild(spinBtn);

        }
        player1 = !player1;
        curScore = 0;
        console.log("change")
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
        die.src = `/assets/die6.png`;
        die.classList.add("slow-spinner");

    }

    // SPIN ON CLICK
    spinBtn.addEventListener("click", (e) => { dieSpin(e) });
    holdBtn.addEventListener("click", (e) => { holdScore(e) })

    howToPlay.addEventListener("click", (e) => {
        instructions.classList.remove("hidden")
    });
    instructions.addEventListener("click", (e) => {
        instructions.classList.add("hidden")
    });

})();