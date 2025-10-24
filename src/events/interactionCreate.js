import fs from "fs";
import path from "path";

const commands = new Map();
const commandsPath = path.join(process.cwd(), "src/commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
  const command = await import(`../commands/${file}`);
  commands.set(command.default.data.name, command.default);
}

export default async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "❌ Erreur lors de l’exécution de la commande.",
      ephemeral: true,
    });
  }
};