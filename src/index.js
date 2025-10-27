import { Client, GatewayIntentBits } from "discord.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration

  ],
});

// Chargement automatique des événements
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = await import(`./events/${file}`);
  const { name, once, execute } = event;

  if (!name || !execute) {
    console.warn(`⚠️  L’événement ${file} n’a pas de "name" ou "execute" valide.`);
    continue;
  }

  if (once) client.once(name, (...args) => execute(...args, client));
  else client.on(name, (...args) => execute(...args, client));
}

// Chargement automatique des commandes
client.commands = new Map();

const commandsPath = path.join(process.cwd(), "src/commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command.default);
}


client.login(process.env.DISCORD_TOKEN);