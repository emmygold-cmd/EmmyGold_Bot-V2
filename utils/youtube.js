const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");

async function searchYouTube(query) {
    const r = await yts(query);
    return r.videos.length > 0 ? r.videos[0] : null;
}

async function downloadYouTube(url, type = "audio") {
    const fileName = `download_${Date.now()}.${type === "audio" ? "mp3" : "mp4"}`;
    const filePath = path.join(__dirname, "..", "session", fileName);
    
    return new Promise((resolve, reject) => {
        const stream = ytdl(url, {
            quality: type === "audio" ? "highestaudio" : "highest",
            filter: type === "audio" ? "audioonly" : "audioandvideo"
        });

        const fileStream = fs.createWriteStream(filePath);
        stream.pipe(fileStream);

        fileStream.on("finish", () => resolve(filePath));
        fileStream.on("error", reject);
    });
}

module.exports = { searchYouTube, downloadYouTube };
