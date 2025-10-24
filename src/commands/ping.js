import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Donne le statut du bot"),

  async execute(interaction) {

    await interaction.deferReply();

    // Calcul l'uptime du bot
    const totalSeconds = Math.floor(interaction.client.uptime / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const uptime = `${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes`;

    // Status du bot
    const statusMap = {
      online: "En ligne 🟢",
      idle: "Inactif 🟠",
      dnd: "Ne pas déranger 🔴",
      offline: "Hors ligne ⚫",
    };

    const status = statusMap[interaction.client.presence?.status || "offline"];

    // Infos sur le bot
    const apiPing = Math.round(interaction.client.ws.ping);
    const botPing = Date.now() - interaction.createdTimestamp;
    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const guildCount = interaction.client.guilds.cache.size;
    const cpuUsage = process.cpuUsage().system / 1024 / 1024;
    const platform = process.platform;

    const embed = new EmbedBuilder()
      .setTitle("Statut du bot")
      .addFields(
        { name: "Statut", value: status, inline: true },
        { name: "Uptime", value: uptime, inline: true },
        { name: "Ping API", value: `${apiPing} ms`, inline: true },
        { name: "Ping Bot", value: `${botPing} ms`, inline: true },
        { name: "Utilisation Mémoire", value: `${memoryUsage} MB`, inline: true },
        { name: "Utilisation CPU", value: `${cpuUsage.toFixed(2)} MB`, inline: true },
        { name: "Serveurs", value: `${guildCount}`, inline: true },
        { name: "Plateforme", value: platform, inline: true }
      )
      .setColor(0x00ae86)
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

    await interaction.editReply({ embeds: [embed] });

  }
};