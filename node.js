//Module for gameboard
const gameboard = (() => {
    const rows = 3;
    const columns = 3
    let board = [];
    for (let r = 0; r < rows; r++){
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(0);
 
            const tile = document.createElement('div');
            //allows the html to correspond with the js
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add('tile');
            document.querySelector(".gameboard").append(tile);
        }
        board.push(row);
    }

    const getboard = () => board;
    return {getboard};
})();
console.log(gameboard.getboard());
//factory function for players
function playing() {
    
    let updateboard = gameboard.getboard();
    const tiles = document.querySelectorAll('.tile');
    const tilesArr = Array.from(tiles);

    players = [
        {
            name: "Player One",
            marker: 'X'
        },
        {
            name: "Player Two",
            marker: 'O'
        }
    ];

    let activePlayer = players[0];

    const swtichPlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
        console.log(activePlayer);
    };

    const getActivePlayer = () => {
        const turn = document.querySelector('.playerTurn');
        turn.textContent = `${activePlayer.name}'s turn`;
    }

    const playRound = (i) => {
        let theTile = tilesArr.find(({id}) => id === i); //gets the specific tiles information in object form
        let coords = i.split("-"); //turns the id of the element into an array without the dash
        let r = parseInt(coords[0]); 
        let c = parseInt(coords[1]);
        if (activePlayer === players[0]) {
            if (updateboard[r][c] === 0){
                updateboard[r][c] = players[0].marker;
                theTile.classList.add('xtile');
                console.log(updateboard);
                swtichPlayer();
            }
        } else {
            if (updateboard[r][c] === 0){
                updateboard[r][c] = players[1].marker;
                console.log(updateboard);
                theTile.classList.add('otile');
                swtichPlayer();
            }
        }
        checkWinner(r, c);
    };

    const checkWinner = (r, c) => {
        if(updateboard[r][c] !== 0){
            //checks horizontally
            if(updateboard[r][0] === updateboard[r][1] && updateboard[r][1] === updateboard[r][2]){
                gameOver();
                return
            }
            //checks vertically
            if(updateboard[0][c] === updateboard[1][c] && updateboard[1][c] === updateboard[2][c]){
                gameOver();
                return
            }
            //checks diagnally decending
            if(updateboard[0][0] !== 0 && updateboard[0][0] === updateboard[1][1] && updateboard[1][1] === updateboard[2][2]){
                gameOver();
                return
            }
             //checks diagnally rising
             if(updateboard[2][0] !== 0 && updateboard[2][0] === updateboard[1][1] && updateboard[1][1] === updateboard[0][2]){
                gameOver();
                return
            }
        }
    }

    const gameOver = () => {
        console.log("over");
    }

    return {getActivePlayer, playRound};  
};

function updateGame() {
    const checkGame = playing();
    checkGame.getActivePlayer();
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        tile.addEventListener('click', () => {
            //gets id of the tile that was clicked on
            let id = tile.id;
            checkGame.playRound(id);
            checkGame.getActivePlayer();
        });
    });
};

updateGame();
//make the game over function stop player from beign able to play the game