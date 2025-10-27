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

## Events qui seront ajoutés // Events to be added

// Events Utilitaires
- `guildMemberAdd`: Le bot accueillera un nouveau membre lorsqu'il rejoindra le serveur.
- `guildMemberRemove`: Le bot dira au revoir à un membre lorsqu'il quittera le serveur.

// Events de Modération
- `Action Logs`: Le bot enregistrera les actions de modération telles que les bannissements, les expulsions, les mises en sourdine, etc.
- `Message Logs`: Le bot enregistrera les messages supprimés et modifiés.
- `Member Join/Leave`: Le bot enregistrera lorsque les membres rejoignent ou quittent le serveur.
- `Voice State Update`: Le bot enregistrera lorsque les membres rejoignent, quittent ou changent d'état dans les canaux vocaux.
- `Role Update`: Le bot enregistrera lorsque les rôles sont créés, supprimés ou mis à jour.
- `Channel Update`: Le bot enregistrera lorsque les canaux sont créés, supprimés ou mis à jour.
- `Member Update`: Le bot enregistrera lorsque les informations des membres sont mises à jour (pseudo, avatar, etc.).

// Events Twitch Streamers
- `Twitch Streamer Online`: Le bot enverra une alerte lorsqu'un streamer Twitch ajouté à la liste des alertes sera en ligne. (Avec intégration de webhook)

// World Of Warcraft Events

- `WoW News Update`: Le bot enverra une alerte lorsqu'il y aura une nouvelle mise à jour des actualités de World Of Warcraft. (Avec intégration de webhook)
- `WoW Patch Update`: Le bot enverra une alerte lorsqu'une nouvelle mise à jour de patch de World Of Warcraft sera publiée. (Avec intégration de webhook)

## Commande qui seront ajoutés // Commands to be added

// Commandes Utilitaires
- `/creator`: Le bot répondra avec des informations sur le créateur du bot.

// Commandes de Modération
- `/kick`: Le bot expulsera un utilisateur du serveur.
- `/mute`: Le bot mettra en sourdine un utilisateur dans le serveur.
- `/unmute`: Le bot enlèvera la sourdine d'un utilisateur dans le serveur.
- `/warn`: Le bot émettra un avertissement à un utilisateur.
- `/warnings`: Le bot répondra avec une liste des avertissements d'un utilisateur.
- `/clearwarnings`: Le bot effacera tous les avertissements d'un utilisateur.
- `/purge`: Le bot supprimera un nombre spécifié de messages dans un canal.
- `/lock`: Le bot verrouillera un canal, empêchant les utilisateurs d'envoyer des messages.
- `/unlock`: Le bot déverrouillera un canal, permettant aux utilisateurs d'envoyer des messages.

- `/setlogchannel`: Le bot définira le canal de journalisation pour les événements de modération.
- `/setwelcomechannel`: Le bot définira le canal de bienvenue pour les nouveaux membres.
- `/setgoodbyechannel`: Le bot définira le canal d'adieu pour les membres qui quittent le serveur.

// World Of Warcraft Commandes 
- `/setwowalertchannel`: Le bot définira le canal d'alerte pour les mises à jour de World of Warcraft.

- `/wowprofile`: Le bot répondra avec le profil d'un joueur de World of Warcraft.
- `/wowguild`: Le bot répondra avec les informations d'une guilde de World of Warcraft.
- `/wownews`: Le bot répondra avec les dernières actualités de World of Warcraft.
- `/wowitem`: Le bot répondra avec les informations d'un objet de World of Warcraft.
- `/armory`: Le bot répondra avec le profil d'un joueur de World of Warcraft à partir de l'Armurerie Blizzard.

// Alert Twitch Streamers Commandes
- `/addstreamer`: Le bot ajoutera un streamer Twitch à la liste des alertes.
- `/removestreamer`: Le bot supprimera un streamer Twitch de la liste des alertes.
- `/liststreamers`: Le bot listera tous les streamers Twitch actuellement dans la liste des alertes.
- `/setalertchannel`: Le bot définira le canal d'alerte pour les streamers Twitch.


dependencies:
- discord.js
- axios
- dotenv
- data file for storing a guild for /setsuggest command
- .env file for environment variables