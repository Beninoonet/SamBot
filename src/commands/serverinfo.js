const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Affiche les informations du serveur'),

    async execute(interaction) {
        const { guild } = interaction;
        const owner = await guild.fetchOwner();
        const memberCount = guild.memberCount;
        const creationDate = `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`;
        const chatCount = guild.channels.cache.filter(channel => channel.type === 0).size;
        const voiceCount = guild.channels.cache.filter(channel => channel.type === 2).size;

        await guild.members.fetch();

        const botRoleIds = new Set();

        guild.members.cache
        .filter(member => member.user.bot)
        .forEach(botMember => {
            botMember.roles.cache.forEach(role => botRoleIds.add(role.id));
        });

        const humanRoles = guild.roles.cache
            .filter(role => !botRoleIds.has(role.id) && role.id !== guild.id)
            .sort((a, b) => b.position - a.position)
            .map(role => role.name)
            .join(', ') || "Aucun rôle";

        
        const embed = new EmbedBuilder()
            .setTitle(`Informations sur le serveur : ${guild.name}`)
            .setColor(0x00AE86)
            .addFields(
                { name: 'Propriétaire', value: `${owner.user}`, inline: true },
                { name: 'Membres', value: memberCount.toString(), inline: true },
                { name: 'Date de création', value: creationDate, inline: false },
                { name: 'Rôles', value: humanRoles || 'Aucun rôle', inline: false },
                { name: 'Canaux texte', value: chatCount.toString(), inline: true },
                { name: 'Canaux vocaux', value: voiceCount.toString(), inline: true },
            )
            .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};