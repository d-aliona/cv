let maxBound = 8;
let totalPrize = 0;
let prize_1 = 100;
let firstChoice = confirm('Do you want to play a game?');

if (firstChoice) {
    startGame(maxBound,totalPrize, prize_1);
} else {
    alert('You did not become a billionaire, but can.');
}

function startGame(numberRange, currentPrize, maxPrize) {
    let userAttempt_1 = prompt(`Choose a roulette pocket number from 0 to ${numberRange} \n`+
    `Attempts left: 3 \nTotal prize: ${currentPrize}$ \n`+
    `Possible prize on  current attempt: ${maxPrize}$`);

    if (getRandom(numberRange) === Number(userAttempt_1)) {
        let nextStep_1 = confirm(`Congratulation, you won! Your prize is: ${maxPrize}$. `+
        `Do you want to continue?`);

        totalPrize = currentPrize + maxPrize;

        if (nextStep_1) {
            startGame(numberRange+4, totalPrize, maxPrize*2);
            return;
        } else {
            alert(`Thank you for your participation. \n`+
            `Your prize is: ${totalPrize}$.`);
            let nextChoice = confirm('Do you want to play again?');

            if (nextChoice) {
                startGame(maxBound, 0, prize_1);
                return;
            } else {
                return;
            }
        }
    } else {
        let userAttempt_2 = prompt(`Choose a roulette pocket number from 0 to ${numberRange} \n`+
            `Attempts left: 2 \nTotal prize: ${currentPrize}$ \n`+
            `Possible prize on  current attempt: ${maxPrize/2}$`);
        
        if (getRandom(numberRange) === Number(userAttempt_2)) {
            let nextStep_2 = confirm(`Congratulation, you won! \n`+
            `Your prize is: ${maxPrize/2}$. \n`+
            `Do you want to continue?`);

            totalPrize = currentPrize + maxPrize/2;

            if (nextStep_2) {
                startGame(numberRange+4, totalPrize, maxPrize*2);
                return;
            } else {
                alert(`Thank you for your participation. \n`+
                `Your prize is: ${totalPrize}$.`);
                let nextChoice = confirm('Do you want to play again?');

                if (nextChoice) {
                    startGame(maxBound, 0, prize_1);
                    return;
                } else {
                    return;
                }    
            }    
        } else {
            let userAttempt_3 = prompt(`Choose a roulette pocket number from 0 to ${numberRange} \n`+
                `Attempts left: 1 \nTotal prize: ${currentPrize}$ \n`+
                `Possible prize on  current attempt: ${maxPrize/4}$`);
        
            if (getRandom(numberRange) === Number(userAttempt_3)) {
                let nextStep_3 = confirm(`Congratulation, you won! \n`+
                `Your prize is: ${maxPrize/4}$. \n`+
                `Do you want to continue?`);

                totalPrize = currentPrize + maxPrize/4;

                if (nextStep_3) {
                    startGame(numberRange+4, totalPrize, maxPrize*2);
                    return;
                }
            } else {
                alert(`Thank you for your participation. \n`+
                `Your prize is: ${currentPrize}$.`);
                let nextChoice = confirm('Do you want to play again?');

                if (nextChoice) {
                    startGame(maxBound, 0, prize_1);
                    return;
                } else {
                    return;
                }
            }
        }
    }
    return;
}
    
function getRandom(max) {
    return Math.floor(Math.random()*(max+1));
}