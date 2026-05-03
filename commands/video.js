const { searchYouTube, downloadYouTube } = require("../utils/youtube");
const fs = require("fs");

module.exports = {
    name: "video",
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        if (args.length === 0) return sock.sendMessage(from, { text: "❌ Please provide a video name or YouTube link." });

        await sock.sendMessage(from, { text: "📹 Preparing your video..." }, { quoted: msg });

        try {
            const video = await searchYouTube(args.join(" "));
            if (!video) return sock.sendMessage(from, { text: "❌ No results found." });

            const filePath = await downloadYouTube(video.url, "video");
            await sock.sendMessage(from, { 
                video: { url: filePath }, 
                caption: video.title,
                fileName: `${video.title}.mp4`
            }, { quoted: msg });

            fs.unlinkSync(filePath); // Clean up
        } catch (error) {
            console.error(error);
            await sock.sendMessage(from, { text: "❌ Failed to download video." });
        }
    }
};
