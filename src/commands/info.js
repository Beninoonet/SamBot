import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Affiche des informations sur le bot."),
    async execute(interaction) {
        const client = interaction.client;
        const botName = client.user.username;
        const botTag = client.user.tag;
        const guildCount = client.guilds.cache.size;
        const userCount = client.users.cache.size;
        const botUptime = Math.floor(client.uptime / 1000);

        const embed = new EmbedBuilder()
            .setTitle(`🤖 Informations sur ${botName}`)
            .setColor(0x00AE86)
            .addFields(
                { name: "Nom du bot", value: botName, inline: true },
                { name: "Tag du bot", value: botTag, inline: true },
                { name: "Serveurs", value: `${guildCount}`, inline: true },
                { name: "Utilisateurs", value: `${userCount}`, inline: true },
                { name: "Uptime", value: `${botUptime} secondes`, inline: true }
            )
            .setImage(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        await interaction.reply({ embeds: [embed] });

    }
}
