const config = require("../config");

module.exports = {
    name: "menu",
    aliases: ["help"],
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const menuText = `✨ *${config.botName} Bot Menu* ✨

*Utility Commands:*
- ${config.prefix}ping : Check bot speed
- ${config.prefix}menu : Show this menu
- ${config.prefix}google <query> : Search Google

*Media Commands:*
- ${config.prefix}song <query> : Download MP3 from YouTube
- ${config.prefix}video <query> : Download MP4 from YouTube
- ${config.prefix}vv : Bypass View-Once media (reply to msg)

*Fun & Games:*
- ${config.prefix}games : Show games list
- ${config.prefix}truth : Random truth question
- ${config.prefix}dare : Random dare challenge

// ... inside the menuText template string ...

*Romantic Features:*
- ${config.prefix}oyindamola : Special message for the Queen
- ${config.prefix}love <name> : Calculate love score (Rigged for Oyindamola!)
- ${config.prefix}compliment : A sweet word for Oyindamola

*Status Automation:*
// ...

- Auto-viewing & reacting to statuses is active! 🚀

_Built with ❤️ by EmmyGold_`;

        await sock.sendMessage(from, { text: menuText }, { quoted: msg });
    }
};
