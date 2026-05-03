const games = new Map();

function createGame(id, type, players) {
    const game = {
        id,
        type,
        players,
        state: {},
        startTime: Date.now()
    };
    games.set(id, game);
    return game;
}

function getGame(id) {
    return games.get(id);
}

function deleteGame(id) {
    games.delete(id);
}

module.exports = { createGame, getGame, deleteGame };
