const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../../config.json');
const Discord = require('discord.js');
const moment = require('moment');
const osu = require('node-os-utils');
const os = require('os');
require('moment-duration-format');

const diagramMaker = require('../../functions/diagramMaker.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription("Returns the bot's status"), //22:50
    async execute(client, interaction, language) {
        interaction.reply({ content: 'Obtaining status...', ephemeral: true });
        const totalGuilds = client.guilds.cache.size;
        const totalMembers = await client.guilds.cache.reduce((prev, guild) => {
            return prev + guild.memberCount;
        }, 0);

        var mem = osu.mem;
        let freeRAM, usedRAM, cpuUsage;

        mem.info().then((info) => {
            freeRAM = info['freeMemMb'];
            usedRAM = info['totalMemMb'] - freeRAM;
        });

        const cpu = osu.cpu;
        const p1 = cpu.usage().then((cpuPercentage) => {
            cpuUsage = cpuPercentage;
        });

        await Promise.all([p1]);

        const embed = new Discord.MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setAuthor(`${client.user.username}'s status`)
            .setThumbnail(
                client.user.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 4096,
                })
            )
            .addField(
                'Performance',
                '```' +
                    `RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round(
                        (100 * usedRAM) / (usedRAM + freeRAM)
                    )}%]
                    \nCPU: ${diagramMaker(
                        cpuUsage,
                        100 - cpuUsage
                    )} [${Math.round(cpuUsage)}%]` +
                    '```',
                false
            )
            .addField(
                'System',
                '```' +
                    `Total RAM ${(os.totalmem() / 1024 / 1021 / 1024).toFixed(
                        2
                    )} GB` +
                    '```',
                false
            )
            .addField(
                'OS',
                '```' + `${os.type} ${os.release} ${os.arch}` + '```',
                false
            )
            .addField('Total Users', '```' + totalMembers + '```', true)
            .addField('Total Servers', '```' + totalGuilds + '```', true)
            .addField(
                'Total Emotes',
                '```' + client.emojis.cache.size + '```',
                false
            )
            .addField(
                'Total bot time activity',
                '```' +
                    `${moment
                        .duration(client.uptime)
                        .format(
                            `D [Days], H [Hours], m [Minutes], s [Seconds]`
                        )}` +
                    '```',
                true
            )
            .addField(
                'Total host time activity',
                '```' +
                    `${moment
                        .duration(os.uptime * 1000)
                        .format(
                            `D [Days], H [Hours], m [Minutes], s [Seconds]`
                        )}` +
                    '```',
                true
            )
            .addField(
                'Last Start',
                '````' +
                    `${moment(client.readyAt).format('MMM DD, YYYY HH:mm')}` +
                    '```',
                true
            );
        interaction.editReply({
            content: ' ',
            embeds: [embed],
            ephemeral: true,
        });
    },
};
