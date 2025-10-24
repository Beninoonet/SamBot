# Discord Bot Project

This is a simple Discord bot project built with Node.js, using "discord.js" library.

A basic command is implemented.

## Commands Available 
// Moderation Commands
- `/setsuggest`: The bot will respond with "Suggest command set!".
- `/serverinfo`: The bot will respond with "Twitch info command!".

// Utility Commands
- `/ping`: The bot will respond with "Pong!". // This command evolued to include latency measurement.
- `/twitchinfo`: The bot will respond with "Twitch info command!".

// Message Commands
- `/post`: The bot will respond with "This is a post command!".
- `/suggest`: The bot will respond with "This is a suggest command!".


## Commands to be added

// Utility Commands
- `/help`: The bot will respond with a list of available commands and their descriptions.

// Moderation Commands
- `/userinfo`: The bot will respond with information about a user.
- `/ban`: The bot will ban a user from the server.
- `/kick`: The bot will kick a user from the server.
- `/mute`: The bot will mute a user in the server.


dependencies:
- discord.js
- axios
- dotenv