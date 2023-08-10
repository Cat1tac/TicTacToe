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

//factory function for players
function playing() {
    const updateboard = gameboard.getboard();
    const tiles = document.querySelectorAll('.tile');
    const tilesArr = Array.from(tiles);
    const turn = document.querySelector('.playerTurn');
    let over = false;
    let gameOverCalled = false;
    let spaces = 0;

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
        over ? gameOver() : turn.textContent = `${activePlayer.name}'s turn`;
    }

    const playRound = (i) => {
        if (gameOverCalled) {
            return
        } else {
            let theTile = tilesArr.find(({id}) => id === i); //gets the specific tiles information in object form
            let coords = i.split("-"); //turns the id of the element into an array without the dash
            let r = parseInt(coords[0]); 
            let c = parseInt(coords[1]);
            if (activePlayer === players[0]) {
                if (updateboard[r][c] === 0){
                    updateboard[r][c] = players[0].marker;
                    theTile.classList.add('xtile');
                    checkWinner(r, c);
                    if(over){
                        return
                    } else {
                        swtichPlayer();
                    }
                }
            } else {
                if (updateboard[r][c] === 0){
                    updateboard[r][c] = players[1].marker;
                    theTile.classList.add('otile');
                    checkWinner(r, c);
                    
                    if(over){
                        return;
                    } else {
                        swtichPlayer();
                    }
                    
                }
            }
            console.log(updateboard);
        }
    };

    const checkWinner = (r, c) => {
        if(updateboard[r][c] !== 0){
            //checks horizontally
            if(updateboard[r][0] === updateboard[r][1] && updateboard[r][1] === updateboard[r][2]){
                over = true;
                return
            }
            //checks vertically
            if(updateboard[0][c] === updateboard[1][c] && updateboard[1][c] === updateboard[2][c]){
                over = true;
                return
            }
            //checks diagnally decending
            if(updateboard[0][0] !== 0 && updateboard[0][0] === updateboard[1][1] && updateboard[1][1] === updateboard[2][2]){
                over = true;
                return
            }
             //checks diagnally rising
             if(updateboard[2][0] !== 0 && updateboard[2][0] === updateboard[1][1] && updateboard[1][1] === updateboard[0][2]){
                over = true;
                return
            }
        }
        //check draw
        spaces = 9;
        
        for(let r = 0; r < 3; r++){
            for(let c = 0; c < 3; c++){
                if(updateboard[r][c] !== 0){
                    spaces--;
                }
            }
        }
        if (spaces === 0){
            over = true;
        }
    }

    const gameOver = () => {
        gameOverCalled = true; 
        if (spaces === 0){
            turn.textContent = `Draw`;
        } else {
            turn.textContent = `${activePlayer.name} wins!`;
        }
        console.log("over");
    }

    const resetGame = () => {
        return function() {
            for(let r = 0; r < 3; r++){
                for(let c = 0; c < 3; c++){
                    updateboard[r][c] = 0;
                }
            }
            tiles.forEach((tile) => {
                tile.classList.remove('xtile');
                tile.classList.remove('otile');
            });
    
            activePlayer = players[0];
            over = false;
            gameOverCalled = false;
            spaces = 0;
            getActivePlayer();
        }
    }

    return {getActivePlayer, playRound, resetGame};  
};

function updateGame() {
    const checkGame = playing();
    checkGame.getActivePlayer();
    const tiles = document.querySelectorAll('.tile');
    //keeping this function here for future reference 
    const onClick = (tile) => {
        //Must call function like this or else it will fire immediately
        return function() {
            //gets id of the tile that was clicked on
            let id = tile.id;
            checkGame.playRound(id);
            checkGame.getActivePlayer();
        }
        
    }
    tiles.forEach((tile) => {
        tile.addEventListener('click', onClick(tile));
    });

    const reset = document.querySelector('.reset');
    reset.addEventListener('click', checkGame.resetGame());
};

updateGame();
//make the game over function stop player from beign able to play the game