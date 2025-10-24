# Discord Bot Project

This is a simple Discord bot project built with Node.js, using "discord.js" library.

A basic command is implemented.

## Commands Available 
// Moderation Commands
- `/setsuggest`: The bot will respond with "Suggest command set!".
- `/serverinfo`: The bot will respond with "Twitch info command!".

// Utility Commands
- `/help`: The bot will respond with a list of available commands and their descriptions.
- `/ping`: The bot will respond with "Pong!". // This command evolued to include latency measurement.
- `/avatar`: The bot will respond with the avatar of a user.

// Twitch Streamer Commands
- `/twitchinfo`: The bot will respond with "Twitch info command!".

// Message Commands
- `/post`: The bot will respond with "This is a post command!".
- `/suggest`: The bot will respond with "This is a suggest command!".


## Event Available
- `ready`: The bot will log "Bot is online!" when it is ready.
- `interactionCreate`: The bot will handle interactions when a command is used.

## Event to be added

// Utility Events
- `guildMemberAdd`: The bot will welcome a new member when they join the server.
- `guildMemberRemove`: The bot will say goodbye to a member when they leave the server.

// Moderation Events
- `Action Logs`: The bot will log moderation actions such as bans, kicks, and mutes.
- `Message Logs`: The bot will log deleted and edited messages.
- `Voice State Update`: The bot will log when members join or leave voice channels.
- `Role Update`: The bot will log when roles are created, deleted, or updated.
- `Channel Update`: The bot will log when channels are created, deleted, or updated.
- `Member Update`: The bot will log when members update their nicknames or roles.

// Twitch Streamer Alert Events
- `Twitch Streamer Online`: The bot will send an alert when a Twitch streamer goes

// World Of Warcraft Events

- `WoW News Update`: The bot will send an alert when there is a new World Of Warcraft news update. (With webook integration)
- `WoW Patch Update`: The bot will send an alert when there is a new World Of Warcraft patch update. (With webook integration)

## Commands to be added

// Utility Commands
- `/info`: The bot will respond with information about the bot.
- `/status`: The bot will respond with its current status and uptime.
- `/creator`: The bot will respond with information about its creator.

// Moderation Commands
- `/roleinfo`: The bot will respond with information about a role.
- `/userinfo`: The bot will respond with information about a user.
- `/ban`: The bot will ban a user from the server.
- `/kick`: The bot will kick a user from the server.
- `/mute`: The bot will mute a user in the server.
- `/unmute`: The bot will unmute a user in the server.
- `/warn`: The bot will warn a user in the server.
- `/warnings`: The bot will respond with a list of warnings for a user.
- `/clearwarnings`: The bot will clear all warnings for a user.
- `/purge`: The bot will delete a specified number of messages from a channel.
- `/lock`: The bot will lock a channel, preventing users from sending messages.
- `/unlock`: The bot will unlock a channel, allowing users to send messages.

- `/setlogchannel`: The bot will set the log channel for moderation logs.
- `/setwelcomechannel`: The bot will set the welcome channel for new member welcomes.
- `/setgoodbyechannel`: The bot will set the goodbye channel for member departures.

// World Of Warcraft Commands
- `/setwowalertchannel`: The bot will set the World of Warcraft alert channel.

- `/wowprofile`: The bot will respond with a World of Warcraft profile of a user.
- `/wowguild`: The bot will respond with a World of Warcraft guild information.
- `/wownews`: The bot will respond with the latest World of Warcraft news.
- `/wowitem`: The bot will respond with information about a World of Warcraft item.
- `/armory`: The bot will respond with a World of Warcraft character's armory information.

// Alert Twitch Streamers Commands
- `/addstreamer`: The bot will add a Twitch streamer to the alert list.
- `/removestreamer`: The bot will remove a Twitch streamer from the alert list.
- `/liststreamers`: The bot will respond with a list of Twitch streamers in the alert list.
- `/setalertchannel`: The bot will set the alert channel for Twitch streamers.


dependencies:
- discord.js
- axios
- dotenv
- data file for storing a guild for /setsuggest command
- .env file for environment variables