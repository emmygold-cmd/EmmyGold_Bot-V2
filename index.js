const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    getContentType
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const readline = require("readline");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");
const config = require("./config");
const { handleCommand } = require("./commandHandler");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = text => new Promise(resolve => rl.question(text, resolve));

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(config.sessionDir);
    const { version, isLatest } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: !config.pairingCode,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(
                state.keys,
                pino({ level: "silent" })
            )
        },
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    if (config.pairingCode && !sock.authState.creds.registered) {
        console.log(
            `\n\n[ EmmyGold ] Enter your phone number (e.g., 2349065102361):`
        );
        let phoneNumber = config.phoneNumber;
        if (!phoneNumber) {
            phoneNumber = await question(
                "Please enter your phone number (with country code, e.g., 2348000000000): "
            );
        }
        phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

        if (phoneNumber.length < 10) {
            console.error("Invalid phone number. Please restart the bot.");
            process.exit(1);
        }

        setTimeout(async () => {
            try {
                const code = await sock.requestPairingCode(phoneNumber);
                console.log(
                    `\n\x1b[32mYour Pairing Code: \x1b[1m${code}\x1b[0m\n`
                );
            } catch (err) {
                console.error("Failed to request pairing code:", err);
            }
        }, 3000);
    }

    sock.ev.on("connection.update", update => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect.error instanceof Boom
                    ? lastDisconnect.error.output.statusCode !==
                      DisconnectReason.loggedOut
                    : true;
            console.log(
                "Connection closed due to ",
                lastDisconnect.error,
                ", reconnecting ",
                shouldReconnect
            );
            if (shouldReconnect) startBot();
        } else if (connection === "open") {
            console.log("EmmyGold Bot is online! ✨");
        }
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async m => {
        if (m.type !== "notify") return;

        const msg = m.messages[0];
        if (!msg.message) return;

        // --- SPECIAL RECOGNITION FOR OYINDAMOLA ---
        const herNumber = "2348032713375@s.whatsapp.net";
        const sender = msg.key.participant || msg.key.remoteJid;

        if (sender === herNumber) {
            await sock.sendMessage(msg.key.remoteJid, {
                react: { text: "💖", key: msg.key }
            });
        }
        // ------------------------------------------

        // ... rest of your command handling logic ...

        // Handle Status Auto-view
        if (msg.key.remoteJid === "status@broadcast" && config.statusAutoView) {
            await sock.readMessages([msg.key]);
            if (config.statusAutoReact) {
                const randomEmoji =
                    config.reactEmojis[
                        Math.floor(Math.random() * config.reactEmojis.length)
                    ];
                await sock.sendMessage(
                    "status@broadcast",
                    {
                        react: { text: randomEmoji, key: msg.key }
                    },
                    { statusJidList: [msg.key.participant] }
                );
            }
            return;
        }

        // Pass to command handler
        await handleCommand(sock, msg);
    });
}

startBot();
