const config = require("./config");
const fs = require("fs");
const path = require("path");

const commands = {};
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.name) {
        commands[command.name] = command;
        if (command.aliases) {
            command.aliases.forEach(alias => {
                commands[alias] = command;
            });
        }
    }
}

async function handleCommand(sock, msg) {
    const from = msg.key.remoteJid;
    const type = Object.keys(msg.message)[0];
    const body = (type === 'conversation') ? msg.message.conversation : 
                 (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : 
                 (type === 'imageMessage') ? msg.message.imageMessage.caption : 
                 (type === 'videoMessage') ? msg.message.videoMessage.caption : '';

    if (!body?.startsWith(config.prefix)) return;

    const args = body.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands[commandName];
    if (!command) return;

    try {
        await command.execute(sock, msg, args);
    } catch (error) {
        console.error(`Error executing ${commandName}:`, error);
        await sock.sendMessage(from, { text: "❌ An error occurred while executing the command." });
    }
}

module.exports = { handleCommand, commands };
