# Amber (SamBot)

Il s'agit d'une projet d'application discord dans laquelle je cherche à proposer des commandes basiques afin de m'entraîner à la programmation avec l'API Discord.js.

Je tente aussi d'ajouter des fonctionnalités supplémentaires comme des alertes Twitch et World Of Warcraft.


## Commandes Disponibles // Available Commands
// Commandes de Modération
- `/setsuggest`: Cette commande permet de définir le canal où les suggestions seront postées.


// Commandes Utilitaires
- `/info`: Le bot répondra avec des informations sur lui-même.
- `/ping`: Le bot répondra avec le statut du bot comme la latencen, si il est en ligne, etc.
- `/avatar`: Le bot répondra avec l'avatar de l'utilisateur mentionné ou de l'utilisateur qui a utilisé la commande.

- `/roleinfo`: Le bot répondra avec des informations sur un rôle.
- `/serverinfo`: Cette commande affiche des informations sur le serveur.
- `/userinfo`: Le bot répondra avec des informations sur un utilisateur.


// Commandes De Modération
- `/purge`: Le bot supprimera un nombre spécifié de messages dans un canal.
- `/ban`: Le bot bannira un utilisateur du serveur.

// Twitch Streamer Commands
- `/twitchinfo`: Cette commande fournit des informations sur un streamer Twitch spécifié.

// Message Commands
- `/post`: Le bot créera un message en embed dans un post et le publiera dans le canal (forum) spécifié.
- `/suggest`: Le bot créera un message en embed pour une suggestion et le publiera dans le canal de suggestions défini (/setsuggest). 


## Events Disponibles // Events Available

// Events de Base
- `ready`: The bot will log "Bot is online!" when it is ready. and send a message in server log channel.
- `interactionCreate`: The bot will handle interactions when a command is used.

dependencies:
- discord.js
- axios
- dotenv
- data file for storing a guild for /setsuggest command
- .env file for environment variables