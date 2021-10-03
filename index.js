const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();
const i18n = require('i18n');
const { token } = require('./config.json');
const { setFlagsFromString } = require('v8');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

require('./handlers/events.js')(client);
require('./handlers/commands.js')(client);

//use the config.json if you're hosting it, use the .env if the server will be hosted elsewhere
// client.login(process.env.token);
client.login(token);
