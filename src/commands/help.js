const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche les commandes locales disponibles'),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const commandFiles = fs.readdirSync(path.join(__dirname, './')).filter(f => f.endsWith('.js'));
    const commands = commandFiles.map(file => {
      const command = require(path.join(__dirname, file));
      return {
        name: command.data?.name || file.replace('.js', ''),
        description: command.data?.description || 'Aucune description',
      };
    });

    const description = commands
      .map(cmd => `\`/${cmd.name}\` — ${cmd.description}`)
      .join('\n');

    const embed = new EmbedBuilder()
      .setTitle('📖 Liste des commandes locales')
      .setDescription(description)
      .setColor(0x00AE86)
      .setFooter({ text: `Total : ${commands.length} commandes` });

    await interaction.editReply({ embeds: [embed] });
  },
};
