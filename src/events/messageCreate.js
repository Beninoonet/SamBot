// events/messageCreate.js
import { EmbedBuilder } from 'discord.js';
import dotenv from "dotenv";
dotenv.config();

export const name = 'messageCreate';
export const once = false;

/**
 * @param {import('discord.js').Message} message
 * @param {import('discord.js').Client} client
 */
export async function execute(message, client) {
  // 🔒 Sécurité : éviter les crashs si message n’existe pas
  if (!message || !message.author) return;

  // 🚫 Ignore les messages des bots ou en DM
  if (message.author.bot || !message.guild) return;

  // 🪵 Exemple de log en console
  console.log(`[${message.guild.name}] ${message.author.tag} : ${message.content}`);

  // Exemple : log dans un salon de logs
  const logChannelId = process.env.LOG_CHANNEL_ID; // 🪣 Ton ID de salon
  const logChannel = message.guild.channels.cache.get(logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setColor('Blue')
    .setAuthor({
      name: message.author.tag,
      iconURL: message.author.displayAvatarURL({ dynamic: true })
    })
    .setDescription(`💬 Nouveau message dans ${message.channel}`)
    .addFields({ name: 'Contenu', value: message.content || '*[vide]*' })
    .setTimestamp();

  await logChannel.send({ embeds: [embed] });
}
