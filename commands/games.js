const config = require("../config");

module.exports = {
    name: "games",
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const gamesMenu = `🎮 *EmmyGold Games* 🎮

Available Games:
1. *TicTacToe* - ${config.prefix}tictactoe
2. *Find the Card* - ${config.prefix}findcard
3. *Guess the Number* - ${config.prefix}guess
4. *Rock Paper Scissors* - ${config.prefix}rps

_Type the command to start a game!_`;
        await sock.sendMessage(from, { text: gamesMenu }, { quoted: msg });
    }
};
