const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

// create commands and parse them into json
const commands = [];
const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// declare version of the api and pass the token
const rest = new REST({ version: '9' }).setToken(token);

async function createSlash() {
    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
        console.log('The commands have been added!');
    } catch (e) {
        console.error('Something wrong has occurred', e);
    }
}

createSlash();
// You only need to run node deploy-commands.js once. You should only run it again if you add or edit existing commands.
