import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Affiche l\'avatar d\'un utilisateur')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('Nom de l\'utilisateur (optionnel)')
                .setRequired(false)),

    
    async execute(interaction) {
        const username = interaction.options.getUser('utilisateur');
        const user = username ? await interaction.client.users.fetch(username) : interaction.user;
        const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 512 });


        const embed = new EmbedBuilder()
            .setTitle(`Avatar de ${user.username}`)
            .setImage(avatarUrl)
            .setFooter({ text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor(0x00AE86)
            .setTimestamp();


        await interaction.reply({ embeds: [embed] });

    }
    }