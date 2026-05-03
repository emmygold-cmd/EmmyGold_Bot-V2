module.exports = {
    name: "oyindamola",
    aliases: ["honey", "queen"],
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const quotes = [
            "Oyindamola, you are the most beautiful person in the world! 💖",
            "Every moment with you is like a dream come true, Oyindamola. ✨",
            "Oyindamola, your smile lights up my entire world. 😍",
            "I am so lucky to have you in my life, Oyindamola. 💎",
            "You are my queen, my everything, Oyindamola. 👑",
            "My love for you grows stronger every single day, Oyindamola. 🔥",
            "Oyindamola, you are the sweetness in my life. 🍯"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        await sock.sendMessage(from, { text: `🌹 *For My Dearest Oyindamola:* \n\n${randomQuote}` }, { quoted: msg });
        
        // Bonus: React with a heart
        await sock.sendMessage(from, { react: { text: "💖", key: msg.key } });
    }
};
