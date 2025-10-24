import dotenv from "dotenv";
dotenv.config();

export default async (client) => {
 // Affiche un message dans la console lorsque le bot est prêt
  console.log(`✅ Connecté en tant que ${client.user.tag}`);

  // Définit le statut du bot
  client.user.setPresence({
    activities: [{ name: 'En preparation', type: 0 }],
    status: 'dnd',
  });

  // Affiche des informations supplémentaires dans la console
  const cpuUsage = process.cpuUsage().system / 1024 / 1024;
  console.log(`🖥️ Utilisation CPU : ${cpuUsage.toFixed(2)} MB`);
  const platform = process.platform;
  console.log(`💻 Plateforme : ${platform}`);
  const guildsCount = client.guilds.cache.size;
  console.log(`📚 Connecté à ${guildsCount} serveurs`);
  const BotPing = Math.round(client.ws.ping);
  console.log(`📶 Ping du bot : ${BotPing} ms`);

  // Envoie un message sur le serveur mère pour indiquer que le bot est en ligne
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (guild) {
    const channel = guild.channels.cache.get(process.env.MAIN_CHANNEL_LOG_ID);
    if (channel && channel.isTextBased()) {

      channel.send(`///////////////\n\n✅ ${client.user.tag} est maintenant en ligne !\n\n📶 Ping du bot : **${BotPing} ms**.\n\n📚 Connecté à **${guildsCount} serveurs**.\n\n///////////////`)
    }
  }
};