const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription("Return the user's avatar or yours")
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Which user avatar do you wanna see?')
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (user) {
            return interaction.reply(
                user.displayAvatarURL({
                    dynamic: true,
                    size: 4096,
                })
            );
        }
        return interaction.reply(
            interaction.user.displayAvatarURL({
                dynamic: true,
                size: 4096,
            })
        );
    },
};
