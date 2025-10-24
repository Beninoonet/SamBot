import { SlashCommandBuilder } from "discord.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


export default {
    
  data: new SlashCommandBuilder()
    .setName("twitchinfo")
    .setDescription("Affiche des informations sur une chaîne Twitch.")
    .addStringOption(option =>
      option
        .setName("login")
        .setDescription("Le nom de la chaîne Twitch (login)")
        .setRequired(true)
    ),
    

  async execute(interaction) {

    async function getTwitchToken() {
  
        const res = await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  });
  return res.data.access_token;
}

    const login = interaction.options.getString("login");
    const clientId = process.env.TWITCH_CLIENT_ID;
    const accessToken = process.env.TWITCH_ACCESS_TOKEN || await getTwitchToken();

    try {
      // --- Étape 1 : Infos utilisateur ---
      const userRes = await axios.get(
        `https://api.twitch.tv/helix/users?login=${login}`,
        {
          headers: {
            "Client-Id": clientId,
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      if (!userRes.data.data.length) {
        return interaction.reply({
          content: `❌ Chaîne non trouvée pour **${login}**.`,
          ephemeral: true,
        });
      }

      const user = userRes.data.data[0];
      const broadcasterId = user.id;

      // --- Étape 2 : Infos de la chaîne ---
      const channelRes = await axios.get(
        `https://api.twitch.tv/helix/channels?broadcaster_id=${broadcasterId}`,
        {
          headers: {
            "Client-Id": clientId,
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      const channel = channelRes.data.data[0];

      // --- Étape 3 : Nombre de followers ---
      const followersRes = await axios.get(
        `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${broadcasterId}`,
        {
          headers: {
            "Client-Id": clientId,
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      const followersCount = followersRes.data.total;

      // --- Étape 4 : Statut du live ---
      const streamRes = await axios.get(
        `https://api.twitch.tv/helix/streams?user_id=${broadcasterId}`,
        {
          headers: {
            "Client-Id": clientId,
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      const stream = streamRes.data.data[0];
      const isLive = !!stream;

      // --- Création de l'embed ---
      const embed = {
        color: isLive ? 0x9146FF : 0x6441A4, // Violet Twitch
        title: `${user.display_name} — ${isLive ? "🔴 EN LIVE !" : "⚫ Hors ligne"}`,
        url: `https://twitch.tv/${user.login}`,
        thumbnail: { url: user.profile_image_url },
        fields: [
          { name: "🎮 Jeu", value: isLive ? stream.game_name || "Non spécifié" : channel.game_name || "Aucun", inline: true },
          { name: "💬 Titre", value: isLive ? stream.title : channel.title || "Aucun", inline: false },
          { name: "🌐 Langue", value: channel.broadcaster_language || "Inconnue", inline: true },
          { name: "👥 Followers", value: followersCount.toLocaleString("fr-FR"), inline: true },
        ],
        footer: {
          text: isLive ? `Viewers : ${stream.viewer_count}` : "Dernière mise à jour",
        },
        timestamp: new Date(),
      };

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("❌ Erreur Twitch API :", error.response?.data || error.message);
      await interaction.reply({
        content: "⚠️ Impossible de récupérer les infos Twitch. Vérifie ton token ou tes identifiants.",
        ephemeral: true,
      });
    }
  },
};
