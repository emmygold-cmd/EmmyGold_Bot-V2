const fs = require("fs");
const path = require("path");

module.exports = {
    name: "truth",
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const truths = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/truths.json")));
        const randomTruth = truths[Math.floor(Math.random() * truths.length)];
        await sock.sendMessage(from, { text: `🤔 *Truth:* ${randomTruth}` }, { quoted: msg });
    }
};
