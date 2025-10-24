const { SlashCommandBuilder, ChannelType, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('post')
    .setDescription('Crée un post pré-rempli dans le forum')
    .addStringOption(option =>
      option.setName('titre')
        .setDescription('Titre du post')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('jeu')
        .setDescription('Nom du jeu')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('description')
        .setDescription('Description de l’événement')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('date')
        .setDescription('Format (JJ/MM/AAAA)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('heure')
        .setDescription('Format (HH:MM)')
        .setRequired(true)),

  async execute(interaction) {
    const forumChannelId = process.env.POST_CHANNEL_ID;
    const forumChannel = await interaction.client.channels.fetch(forumChannelId);

    if (!forumChannel || forumChannel.type !== ChannelType.GuildForum) {
      return interaction.reply({
        content: '❌ Le canal configuré n’est pas un forum. Utilise `/seteventforum` pour le redéfinir.',
        ephemeral: true,
      });
    }

    const titre = interaction.options.getString('titre').slice(5, 100); // max 100 chars
    const jeu = interaction.options.getString('jeu');
    const description = interaction.options.getString('description');

    // date et heure
    const date = interaction.options.getString('date');
    const heure = interaction.options.getString('heure');


    // Parsing date et heure
    const [day, month, year] = date.split('/').map(Number);
    const [hours, minutes] = heure.split(':').map(Number);

    const eventDate = new Date(year, month - 1, day, hours, minutes);
    const unixTimestamp = Math.floor(eventDate.getTime() / 1000);

    if (isNaN(eventDate.getTime())) {
      return interaction.reply({
        content: '❌ Date ou heure invalide. Utilise le format JJ/MM/AAAA pour la date et HH:MM pour l’heure.',
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
        .setTitle(titre)
        .setColor(0x0099FF)
        .setDescription(`**Description :** ${description}`)
        .addFields(
          { name: '🎮 Jeu', value: jeu, inline: true },
          { name: '\u200B', value: '\u200B' }, // Empty field for spacing
          { name: '⏲️ Date et Heure', value: `<t:${unixTimestamp}:F>`, inline: false },
          { name: '📅 Commence dans', value: `<t:${unixTimestamp}:R>`, inline: false },
          
        )
        .setFooter({ text: `Proposé par ${interaction.user.tag}`})
        .setTimestamp();


    try {

      await forumChannel.threads.create({
        name: titre,
        message: { embeds: [embed] },
      });

      await interaction.reply({ content: '✅ Post créé avec succès dans le forum !', ephemeral: true });
    } catch (err) {
      console.error('Erreur création de thread:', err.rawError ?? err);
      await interaction.reply({
        content: '❌ Erreur lors de la création du post. Vérifie que le forum est valide et que le titre n’est pas trop long.',
        ephemeral: true,
      });
    }
  },
};
