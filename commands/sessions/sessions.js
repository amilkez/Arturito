const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sessions')
        .setDescription('Create a Discord application session'),
    //Not working until further notice
    // .addBooleanOption((option) =>
    //     option
    //         .setName('unlimited')
    //         .setDescription(
    //             "Enable this option for the session to not expire. Otherwise, it'll expire in the next 15 minutes"
    //         )
    // ), //22:50
    async execute(client, interaction, language) {
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('sessions')
                .setPlaceholder('Application')
                .addOptions([
                    {
                        label: 'Youtube',
                        description: 'Start a Youtube Together session',
                        value: 'youtube',
                    },
                    {
                        label: 'Fishington',
                        description: 'Start a Fishington session',
                        value: 'fishington',
                    },
                    {
                        label: 'Betrayal',
                        description: 'Start a Betrayal session',
                        value: 'betrayal',
                    },
                    {
                        label: 'Poker',
                        description: 'Start a Poker session',
                        value: 'poker',
                    },
                    {
                        label: 'Chess',
                        description: 'Start a Chess session',
                        value: 'chess',
                    },
                    {
                        label: 'Letter Tile',
                        description: 'Start a Letter Tile session',
                        value: 'lettertile',
                    },
                    {
                        label: 'Words Snack',
                        description: 'Start a Words Snack session',
                        value: 'wordsnack',
                    },
                    {
                        label: 'Doddle Crew',
                        description: 'Start a Doddle Crew session',
                        value: 'doodlecrew',
                    },
                ])
        );
        await interaction.reply({
            content: 'Select an application to start a session',
            components: [row],
            ephemeral: true,
        });
    },
};
