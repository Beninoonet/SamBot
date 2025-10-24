import { Client, GatewayIntentBits } from "discord.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

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
const eventsPath = path.join(process.cwd(), "src/events");
const eventFiles = fs.readdirSync(eventsPath);

for (const file of eventFiles) {
  const event = await import(`./events/${file}`);
  const eventName = file.split(".")[0];
  client.on(eventName, (...args) => event.default(client, ...args));
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