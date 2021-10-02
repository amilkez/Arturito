const {Client, Intents} = require('discord.js');
require('dotenv').config();
const i18n = require('i18n');
const {token} = require('./config.json');
const { setFlagsFromString } = require('v8');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once('ready', () => {
    console.log('ready');
});

// Command Test
client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return

    const { commandName } = interaction
    if (commandName === 'ping') {
        await interaction.reply('Pong!')
    }
})
//usethe config.json if you're hosting it, use the .env if the server will be hosted elsewhere
// client.login(process.env.token);
client.login(token);
