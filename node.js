const tiles = (() => {
    let value = 0;

    const addMarker = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addMarker, getValue}
})();

//Module for gameboard
const gameboard = (() => {
    const tileboard = document.querySelectorAll('.tile');
    tileboard.forEach((tile) => {
        tile.addEventListener('click', () => {
            tile.classList.add('xtile');
            console.log(tileboard);
        });
    });

    const rows = 3;
    const columns = 3
    let board = [];
    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(tiles.getValue());
            tileboard[i] = tiles.getValue;
        }
    }

    const getboard = () => board;

    

    return {getboard};
})();

console.log(gameboard.getboard());

//factory function for players
const controllers = (playerOne, playerTwo) => {
    players = [
        {
            name: playerOne,
            marker: 'X'
        },
        {
            name: playerTwo,
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
    };

    const getActivePlayer = () => activePlayer;

    return {};  
};

//module for updating game state
const updateGame = (() => {
    
    return {};
})();