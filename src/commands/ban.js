import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

export default {
        data: new SlashCommandBuilder()
            .setName("ban")
            .setDescription("Bannir un membre")
            .addUserOption(option => 
                option.setName("membre")
                .setDescription("Sélectionner le membre à bannir")
                .setRequired(true)
            )
            .addStringOption(option => 
                option.setName("raison")
                .setDescription("Donne une raison au bannissement")
                .setRequired(false)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

        async execute(interaction){
            const user = interaction.options.getUser("membre");
            const member = await interaction.guild.members.fetch(user.id).catch(() => null);

            const reason = interaction.options.getString('raison') || "Aucune raison";

            await interaction.deferReply()

            // Empêche l'auto ban
            if(member.user.id === user.id){
                interaction.editReply({ content: "Tu ne peux pas te bannir.", ephemeral: true})
            };
            // Empêche le ban de bot
            if(member.user.id === interaction.client.user.id){
                interaction.editReply({ content: "Tu ne pexu pas bannir le bot.", ephemeral: true})
            }
            // Empêche le bannissement des personnes qui ont la permissions (BanMembers)
            if(member.permissions.has('BanMembers')) {
                interaction.editReply({ content: "Tu ne peux pas bannir cette personne !", ephemeral: true})
            } else {
                interaction.ban({ deleteMessageDays: 7, reason })
                interaction.editReply({ content: `${member} a été banni`, ephemeral: true})
            }
        }
}