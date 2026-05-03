module.exports = {
    name: "ping",
    async execute(sock, msg, args) {
        const start = Date.now();
        const from = msg.key.remoteJid;
        await sock.sendMessage(from, { text: "🏓 Pinging..." }, { quoted: msg });
        const end = Date.now();
        await sock.sendMessage(from, { text: `🚀 Speed: ${end - start}ms` }, { quoted: msg });
    }
};
