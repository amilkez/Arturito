const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

// create commands and parse them into json
const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
].map((command) => command.toJSON());

// declare version of the api and pass the token
const rest = new REST({ version: '9' }).setToken(token);

async function createSlash() {
    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
        console.log('working');
    } catch (e) {
        console.error('Something wrong has occurred', e);
    }
}

createSlash();
// You only need to run node deploy-commands.js once. You should only run it again if you add or edit existing commands.
