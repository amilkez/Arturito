const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();
const { token } = require('./config.json');
const { join } = require('path');
const { setInterval } = require('timers');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
});

client.commands = new Collection();
client.selectMenus = new Collection();
client.languages = require('i18n');

client.languages.configure({
    locales: ['en', 'es'],
    directory: join(__dirname, 'locales'),
    defaultLocale: 'en',
    retryInDefaultLocale: true,
    objectNotation: true,
    register: global,

    logWarnFn: function (msg) {
        console.log(msg);
    },
    logErrorFn: function (msg) {
        console.log(msg);
    },
    missingKeyFn: function (locale, value) {
        return value;
    },
    mustacheConfig: {
        tags: ['{{', '}}'],
        disable: false,
    },
});

client.languages.setLocale('en');

setInterval(() => {
    updateStatus();
}, 60000);

async function updateStatus() {
    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval((c) =>
            c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
        ),
    ];

    Promise.all(promises)
        .then((results) => {
            const guildsNum = results[0].reduce(
                (acc, guildCount) => acc + guildCount,
                0
            );
            const membersNum = results[1].reduce(
                (acc, guildCount) => acc + guildCount,
                0
            );
            client.user.setActivity(
                `Servers: ${guildsNum} Members: ${membersNum}`,
                { type: 'LISTENING' }
            );
        })
        .catch((e) => console.log(e));
    const guildNum = await client.guilds.cache.size;
    const memberNum = await client.guilds.cache.reduce((prev, guild) => {
        return prev + guild.memberCount;
    }, 0);

    await client.user.setActivity(
        `Servers: ${guildNum} Members: ${memberNum}`,
        { type: 'LISTENING' }
    );
}

require('./handlers/events.js')(client);
require('./handlers/commands.js')(client);
require('./handlers/selectMenus.js')(client);

//use the config.json if you're hosting it, use the .env if the server will be hosted elsewhere
// client.login(process.env.token);
client.login(token);
