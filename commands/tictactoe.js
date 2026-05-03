const { createGame, getGame, deleteGame } = require("../utils/gameEngine");

module.exports = {
    name: "tictactoe",
    aliases: ["ttt"],
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        let game = getGame(from);

        if (!game || game.type !== "tictactoe") {
            game = createGame(from, "tictactoe", [msg.key.participant || msg.key.remoteJid]);
            game.state.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
            game.state.turn = 0;
            return sock.sendMessage(from, { text: "🎮 TicTacToe Started! Waiting for another player to join by typing .ttt join" }, { quoted: msg });
        }

        if (args[0] === "join") {
            if (game.players.length >= 2) return sock.sendMessage(from, { text: "❌ Game is full!" });
            game.players.push(msg.key.participant || msg.key.remoteJid);
            return sock.sendMessage(from, { text: `✅ Player 2 joined! \n\n${renderBoard(game.state.board)}\n\nPlayer 1's turn! Type .ttt <1-9>` });
        }

        const playerIdx = game.players.indexOf(msg.key.participant || msg.key.remoteJid);
        if (playerIdx === -1) return sock.sendMessage(from, { text: "❌ You are not in this game!" });
        if (playerIdx !== game.state.turn % 2) return sock.sendMessage(from, { text: "❌ It's not your turn!" });

        const move = parseInt(args[0]) - 1;
        if (isNaN(move) || move < 0 || move > 8 || game.state.board[move] !== " ") {
            return sock.sendMessage(from, { text: "❌ Invalid move! Choose 1-9." });
        }

        game.state.board[move] = (playerIdx === 0) ? "X" : "O";
        game.state.turn++;

        const winner = checkWinner(game.state.board);
        if (winner) {
            const result = winner === "Draw" ? "🤝 It's a Draw!" : `🎉 Player ${winner === "X" ? "1" : "2"} Wins!`;
            await sock.sendMessage(from, { text: `${result}\n\n${renderBoard(game.state.board)}` });
            deleteGame(from);
        } else {
            await sock.sendMessage(from, { text: `Next turn: Player ${(game.state.turn % 2) + 1}\n\n${renderBoard(game.state.board)}` });
        }
    }
};

function renderBoard(board) {
    return ` ${board[0]} | ${board[1]} | ${board[2]} \n----------- \n ${board[3]} | ${board[4]} | ${board[5]} \n----------- \n ${board[6]} | ${board[7]} | ${board[8]} `;
}

function checkWinner(board) {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] !== " " && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    if (!board.includes(" ")) return "Draw";
    return null;
}
