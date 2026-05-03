const { searchYouTube, downloadYouTube } = require("../utils/youtube");
const fs = require("fs");

module.exports = {
    name: "song",
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        if (args.length === 0)
            return sock.sendMessage(from, {
                text: "❌ Please provide a song name or YouTube link."
            });

        await sock.sendMessage(
            from,
            { text: "🎧 Cooking your song..." },
            { quoted: msg }
        );

        try {
            const video = await searchYouTube(args.join(" "));
            if (!video)
                return sock.sendMessage(from, { text: "❌ No results found." });

            const filePath = await downloadYouTube(video.url, "audio");
            await sock.sendMessage(
                from,
                {
                    audio: { url: filePath },
                    mimetype: "audio/mpeg",
                    fileName: `${video.title}.mp3`
                },
                { quoted: msg }
            );

            fs.unlinkSync(filePath); // Clean up
        } catch (error) {
            console.error(error);
            await sock.sendMessage(from, {
                text: "❌ Failed to download song."
            });
        }
    }
};
