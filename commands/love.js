module.exports = {
    name: "love",
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        if (args.length === 0) return sock.sendMessage(from, { text: "❌ Please mention someone to calculate love!" });

        const target = args.join(" ");
        let percentage;

        // Rigged logic for Oyindamola
        if (target.toLowerCase().includes("oyindamola")) {
            percentage = "1000% (Infinite Love)";
        } else {
            percentage = Math.floor(Math.random() * 100) + "%";
        }

        const loveText = `❤️ *Love Calculator* ❤️\n\n*User:* ${target}\n*Love Score:* ${percentage}\n\n${parseInt(percentage) > 80 || isNaN(parseInt(percentage)) ? "Wow! This is true love! ✨" : "Maybe try a little harder? 😉"}`;
        
        await sock.sendMessage(from, { text: loveText }, { quoted: msg });
    }
};
