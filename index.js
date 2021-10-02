const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();
const i18n = require('i18n');
const { token } = require('./config.json');
const { setFlagsFromString } = require('v8');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('ready');
});

// Command Test
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (e) {
        console.error(e);
        return interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        });
    }
});
//use the config.json if you're hosting it, use the .env if the server will be hosted elsewhere
// client.login(process.env.token);
client.login(token);
