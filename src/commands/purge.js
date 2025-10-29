import { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import dotenv from "dotenv";
dotenv.config();


export default {
     data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Nettoie un nombre de message')
        .addIntegerOption(option => option
            .setName('nombre')
            .setDescription('Nombre de messages à supprimés')
            .setRequired(true))
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {

        const amount = interaction.options.getInteger('nombre');

        if (amount < 1 || amount > 100){
            return interaction.reply({
                content: 'Tu dois indiquer un nombre entre 1 et 100',
                ephemeral: true,
            });
        }
        const logChannel = process.env.LOG_CHANNEL_ID;

        const embed = new EmbedBuilder()
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})

        await interaction.deferReply({ ephemeral: true });

        try{
            const deletedMessages = await interaction.channel.bulkDelete(amount, true);
            await interaction.editReply(`${deletedMessages.size} message(s) supprimé(s)`);
            embed.addFields(
                { name: 'Salon', value: interaction.channel.name, inline: false },
                { name: 'Nombre de message supprimés', value: deletedMessages.size, inline: false }
            );

            return logChannel.send({ embeds :  [embed] })
            
        } catch (error) {
            await interaction.editReply(`Erreur lors de la commande.`)
        }

        
    }

}