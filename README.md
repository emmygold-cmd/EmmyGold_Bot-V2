# EmmyGold WhatsApp Bot (MVP)

A clean, modular WhatsApp bot built with `@whiskeysockets/baileys` in Node.js.

## ✨ Features
- **Pairing Code Auth**: No QR code needed.
- **Status Automation**: Auto-view and auto-react to statuses.
- **Media Downloader**: Download songs (MP3) and videos (MP4) from YouTube.
- **Anti View-Once**: Bypass view-once restrictions.
- **Games**: TicTacToe and more.
- **Utilities**: Google search, Truth or Dare, Ping, and Menu.

## 🚀 Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure the Bot**:
   Edit `config.js` to set your bot name, owner number, and prefix.

3. **Run the Bot**:
   ```bash
   npm start
   ```

4. **Authentication**:
   - When prompted in the terminal, enter your phone number in international format (e.g., `2349065102361`).
   - The bot will generate a **Pairing Code**.
   - Open WhatsApp on your phone -> Linked Devices -> Link with Phone Number -> Enter the code.

## 🛠 Commands
- `.menu` : Show all commands
- `.ping` : Check bot speed
- `.song <query>` : Download MP3
- `.video <query>` : Download MP4
- `.vv` : (Reply to msg) Bypass view-once
- `.google <query>` : Search Google
- `.truth` / `.dare` : Fun challenges
- `.games` : Play games (e.g., `.ttt`)

## 📁 Project Structure
- `index.js`: Main entry point and connection logic.
- `commandHandler.js`: Routes messages to commands.
- `config.js`: Bot settings.
- `commands/`: Individual command files.
- `utils/`: Reusable logic (YouTube, Games).
- `data/`: JSON files for Truth/Dare.
- `session/`: Stores authentication state.

---
Built by EmmyGold ✨
