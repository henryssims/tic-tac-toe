const items = document.querySelectorAll("button");
const body = document.querySelector("body");

const Player = (name, type) => {
    return {name, type};
}

const board = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        for (let i = 0; i < 9; i++) {
            items[i].textContent = boardArray[i];
        }
    };

    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            boardArray[i] = "";
        }
        render();
    }

    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkGameOver = (player) => {
        for (let i = 0; i < 8; i++) {
            if (boardArray[winConditions[i][0]] == player.type && 
                boardArray[winConditions[i][1]] == player.type && 
                boardArray[winConditions[i][2]] == player.type) {
                    return true;
            }
        }
    };

    return {boardArray, render, checkGameOver, resetBoard};
})();

const game = (() => {
    const playerOne = Player("player one", "X");
    const playerTwo = Player("player two", "O");
    const message = document.getElementById("message");

    let currPlayer = playerOne;
    let gameOver = false;

    const endGame = () => {
        gameOver = true;
        resetBtn.style.display = "block";
    };

    const reset = () => {
        currPlayer = playerOne;
        gameOver = false;
        message.textContent = "player one's turn";
        resetBtn.style.display = "none";
        board.resetBoard();
    };

    items.forEach(item => {
        item.addEventListener("click", () => {
            if (board.boardArray[item.dataset.index] == "" && !gameOver) {
                board.boardArray[item.dataset.index] = currPlayer.type; 
                board.render();

                if (board.checkGameOver(currPlayer)) {
                    message.textContent = `${currPlayer.name} wins!`;
                    endGame();
                } else if (!board.boardArray.includes("")) {
                    message.textContent = "it's a tie";
                    endGame();
                } else {
                    if (currPlayer == playerOne) {
                        currPlayer = playerTwo;
                    } else {
                        currPlayer = playerOne;
                    }
                    message.textContent = `${currPlayer.name}'s turn`;    
                }
            }
        });
    });

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "reset";
    resetBtn.setAttribute("id", "reset");
    resetBtn.addEventListener("click", reset);
    body.appendChild(resetBtn);
    resetBtn.style.display = "none";
})();