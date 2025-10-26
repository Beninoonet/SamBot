import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../../../data/messages.json');

export default {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Affiche des informations sur un rôle.")
        .addUserOption(option =>
            option.setName("utilisateur")
                .setDescription("L'utilisateur dont vous voulez les informations.")
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser("utilisateur");
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        // Charger les données
        let messages = {};
        if(fs.existsSync(dataPath)) {
            messages = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
        }

        const messageCount = messages[interaction.guild.id]?.[user.id] || 0;


        const embed = new EmbedBuilder()
            .setColor(member?.displayHexColor || 0x00AE86)
            .setAuthor({name: `Informations de ${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: '🆔 ID', value: user.id, inline: true },
                { name: '📅 Compte créé le', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:f>`, inline: true },
                { name: '💬 Messages envoyés', value: `${messageCount}`, inline: true },
            );

            if(member) {
                embed.addFields(
                    { name: '📥 Rejoint le serveur le', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:f>`, inline: true },
                    { name: '🎭 Rôles', value: member.roles.cache.filter(r => r.id !== interaction.guild.id && !r.managed).map(r => r.toString()).join(', ') || 'Aucun rôle', inline: false },
                );
            }

            embed.setFooter({text: `Demandé par ${interaction.user.tag}`}).setTimestamp();

            await interaction.reply({ embeds: [embed] })

    //
    }
// 
}