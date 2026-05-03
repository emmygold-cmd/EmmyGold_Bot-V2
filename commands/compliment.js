module.exports = {
    name: "compliment",
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const compliments = [
            "Oyindamola, you have the most beautiful soul I've ever known.",
            "Your intelligence and wit are truly inspiring, Oyindamola.",
            "Oyindamola, the world is a brighter place just because you're in it.",
            "You have a heart of gold, Oyindamola.",
            "Oyindamola, your kindness is a gift to everyone around you.",
            "You are incredibly talented and capable of anything, Oyindamola.",
            "Oyindamola, you make every day feel like a special occasion."
        ];
        const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        
        await sock.sendMessage(from, { text: `✨ *A Sweet Thought for Oyindamola:* \n\n${randomCompliment}` }, { quoted: msg });
    }
};
