module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (e) {
            console.log(e);
            return interaction.reply({
                content: 'Something wrong has occurred',
            });
        }
    },
};
