import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("roleinfo")
        .setDescription("Affiche des informations sur un rôle.")
        .addRoleOption(option =>
            option.setName("rôle")
                .setDescription("Le rôle dont vous voulez les informations")
                .setRequired(true)),

    async execute(interaction) {
        const role = interaction.options.getRole("rôle");

        const embed = new EmbedBuilder()
            .setTitle(`Informations sur le rôle : ${role.name}`)
            .setColor(role.color || 0x00AE86)
            .addFields(
                { name: "Nom du rôle", value: role.name, inline: true },
                { name: "ID du rôle", value: role.id, inline: true },
                { name: "Couleur", value: `#${role.color.toString(16).padStart(6, '0')}`, inline: true },
                { name: "Nombre de membres", value: `${role.members.size}`, inline: true },
                { name: "Position", value: `${role.position}`, inline: true },
                { name: "Mentionnable", value: role.mentionable ? "Oui" : "Non", inline: true },
                { name: "Créé le", value: `<t:${Math.floor(role.createdTimestamp / 1000)}:F>`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.displayAvatar})

        await interaction.reply({ embeds: [embed] });
    }

}