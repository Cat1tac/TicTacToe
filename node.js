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
    let updateboard = gameboard.getboard();
    const tiles = document.querySelectorAll('.tile');
    const tilesArr = Array.from(tiles);

    players = [
        {
            name: "playerOne",
            marker: 'X'
        },
        {
            name: "playerTwo",
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

    const getActivePlayer = () => activePlayer;

    const checkinner = (r, c) => {
        if(updateboard[r][c] != 0){
            if(updateboard[0][1] === update)
        }
        
    }

    const playRound = (i) => {
        let theTile = tilesArr.find(({id}) => id === i);
        let coords = i.split("-");
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
        winner(r, c);
    };

    

    return {getActivePlayer, playRound};  
};

function updateGame() {
    const checkGame = playing();
    
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        tile.addEventListener('click', () => {
            let id = tile.id;
            checkGame.playRound(id);
        });
    });
};

updateGame();
