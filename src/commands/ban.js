import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
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

            if(!member){
                return await interaction.reply({
                    content: "🛑 Ce membre n'existe pas !",
                    ephemeral: true
                });
            }

            if(!member.bannable || member.id === interaction.user.id || interaction.user.has(PermissionFlagsBits.BanMembers)){
                return await interaction.reply({
                    content: "⛔ Ce membre ne peut pas être banni.",
                    ephemeral: true
                });
            }

            try{
                await member.ban({ reason });

                // Embed
                const embed = new EmbedBuilder()
                    .setTitle("🔨Membre banni")
                    .setColor("Red")
                    .setThumbnail(user.displayAvatarURL())
                    .addFields(
                        {name: "👤 Membre", value: `${user.tag}(${user.id})`, inline: false},
                        {name: "🧑‍⚖️ Modérateur", value: `${interaction.user.tag}`, inline: false},
                        {name: "🗒️ Raison", value: `${reason})`, inline: false}
                    )
                    .setTimestamp();

                    await interaction.reply({ embed: [embed] })
            } catch (error){
                console.error(error);
                await interaction.reason({
                    content: '❌ Erreur lors de la commande (merci de vérifier la console).',
                    ephemeral: true
                })
            }
        }
}