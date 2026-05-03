const fs = require("fs");
const path = require("path");

module.exports = {
    name: "dare",
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const dares = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/dares.json")));
        const randomDare = dares[Math.floor(Math.random() * dares.length)];
        await sock.sendMessage(from, { text: `🔥 *Dare:* ${randomDare}` }, { quoted: msg });
    }
};
