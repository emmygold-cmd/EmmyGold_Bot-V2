const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

module.exports = {
    name: "vv",
    aliases: ["viewonce"],
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted) return sock.sendMessage(from, { text: "❌ Please reply to a view-once message." });

        const type = Object.keys(quoted)[0];
        if (!quoted[type].viewOnce) return sock.sendMessage(from, { text: "❌ This is not a view-once message." });

        // Remove viewOnce flag
        quoted[type].viewOnce = false;
        
        await sock.sendMessage(from, { forward: { key: msg.key, message: quoted } }, { quoted: msg });
    }
};
