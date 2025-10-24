import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src/data/eventsForum.json");

if(!fs.existsSync(dataFile)) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
} 

function loadConfig() {
  if (!fs.existsSync(dataFile)) return{};
  return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
}

function saveConfig(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

export default {
  data: new SlashCommandBuilder()
    .setName("seteventforum")
    .setDescription("Définit le salon où seront postées les suggestions.")
    .addChannelOption(option =>
      option
        .setName("salon")
        .setDescription("Salon des suggestions")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const channel = interaction.options.getChannel("salon");

    if (!channel.is) {
      return interaction.reply({
        content: "❌ Merci de sélectionner un salon textuel.",
        ephemeral: true,
      });
    }

    // Lecture du fichier
    const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

    // Enregistre ou met à jour pour cette guild
    data[interaction.guild.id] = {
      suggestionsChannel: channel.id,
    };

    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    await interaction.reply({
      content: `✅ Le salon des suggestions est maintenant défini sur ${channel}`,
      ephemeral: true,
    });
  },
};
