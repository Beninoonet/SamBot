// events/interactionCreate.js
export const name = 'interactionCreate';
export const once = false;

/**
 * @param {import('discord.js').Interaction} interaction
 * @param {import('discord.js').Client} client
 */
export async function execute(interaction, client) {
  try {
    // 🎯 Vérifie que c'est une commande slash
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      await command.execute(interaction, client);
    }

    // 🎛️ Gestion des context menus (clic droit)
    else if (interaction.isContextMenuCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      await command.execute(interaction, client);
    }

    // 🧩 Gestion des boutons
    else if (interaction.isButton()) {
      console.log(`🔘 Bouton cliqué : ${interaction.customId}`);
      // Tu peux gérer ici tes boutons custom
    }

    // 🎚️ Gestion des menus déroulants (select menus)
    else if (interaction.isStringSelectMenu()) {
      console.log(`📋 Menu sélectionné : ${interaction.customId}`);
      // Gère tes menus ici
    }
  } catch (error) {
    console.error('❌ Erreur dans interactionCreate:', error);

    // Empêche un second reply si déjà répondu
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: '⚠️ Une erreur est survenue lors de cette interaction.',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: '⚠️ Une erreur est survenue lors de cette interaction.',
        ephemeral: true,
      });
    }
  }
}
