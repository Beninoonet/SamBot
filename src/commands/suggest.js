import { SlashCommandBuilder, ChannelType } from "discord.js";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src/data/guilds.json");

export default {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Propose une suggestion pour ce serveur.")
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("Ta suggestion")
        .setRequired(true)
    ),

  async execute(interaction) {
    const suggestion = interaction.options.getString("message");
    const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

    const guildConfig = data[interaction.guild.id];
    if (!guildConfig || !guildConfig.suggestionsChannel) {
      return interaction.reply({
        content: "⚠️ Le salon des suggestions n’a pas été défini. Un admin doit utiliser `/setsuggestions`.",
        ephemeral: true,
      });
    }

    const suggestionsChannel = await interaction.guild.channels.fetch(guildConfig.suggestionsChannel);

    const message = await suggestionsChannel.send({
      embeds: [
        {
          title: "💡 Nouvelle suggestion",
          description: suggestion,
          color: 0x00b0f4,
          footer: { text: `Proposée par ${interaction.user.tag}` },
          timestamp: new Date(),
        },
      ],
    });

    const thread = await message.startThread({
      name: `💭 ${interaction.user.username}`,
      autoArchiveDuration: 1440,
      type: ChannelType.PublicThread,
    });

    await interaction.reply({
      content: `✅ Suggestion envoyée dans ${suggestionsChannel} !\nUn fil a été créé : ${thread}`,
      ephemeral: true,
    });

    await message.react("👍");
    await message.react("👎");
  },
};
