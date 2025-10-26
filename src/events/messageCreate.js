import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../../data/messages.json');

// Charger les données existantes
let messages = {};
if (fs.existsSync(dataPath)) {
  messages = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

export default {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    const userId = message.author.id;
    const guildId = message.guild.id;

    // Crée la structure si elle n'existe pas
    if (!messages[guildId]) messages[guildId] = {};
    if (!messages[guildId][userId]) messages[guildId][userId] = 0;

    messages[guildId][userId] += 1;

    // Sauvegarde du compteur (tu peux optimiser avec un délai pour éviter trop d’écritures)
    fs.writeFileSync(dataPath, JSON.stringify(messages, null, 2));
  },
};
