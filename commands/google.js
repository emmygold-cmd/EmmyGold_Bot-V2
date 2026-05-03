const googleIt = require("google-it");

module.exports = {
    name: "google",
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        if (args.length === 0) return sock.sendMessage(from, { text: "❌ Please provide a search query." });

        await sock.sendMessage(from, { text: "📡 Searching the internet..." }, { quoted: msg });

        try {
            const results = await googleIt({ query: args.join(" ") });
            let text = `🔎 *Google Search Results:* \n\n`;
            
            results.slice(0, 5).forEach((res, i) => {
                text += `*${i + 1}. ${res.title}*\n_${res.snippet}_\n🔗 ${res.link}\n\n`;
            });

            await sock.sendMessage(from, { text: text.trim() }, { quoted: msg });
        } catch (error) {
            console.error(error);
            await sock.sendMessage(from, { text: "❌ Google search failed." });
        }
    }
};
