const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

// declare version of the api and pass the token
const rest = new REST({ version: '9' }).setToken(token);

async function createSlash() {
    try {
        const commands = [];
        fs.readdirSync('./commands').forEach(async (category) => {
            const commandFiles = fs
                .readdirSync(`./commands/${category}`)
                .filter((file) => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./commands/${category}/${file}`);
                commands.push(command.data.toJSON());
            }
        });
        // in order to work in any server change to .applicationCommands(clientId)...
        // for a single server .applicationGuildCommands(clientId, guildId)
        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });
        console.log('The commands have been added!');
    } catch (e) {
        console.error('Something wrong has occurred', e);
    }
}

createSlash();
// You only need to run node deploy-commands.js once. You should only run it again if you add or edit existing commands.
