const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription("Returns the user's avatar")
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Which user avatar do you wanna see?')
        ), //22:50
    async execute(client, interaction) {
        const language = interaction.member.guild.lang;
        const user = interaction.options.getUser('user');
        if (user) {
            const embed = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(
                    client.languages.__mf(
                        { phrase: 'avatar.user', locale: language },
                        { username: user.username }
                    )
                )
                .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }));
            return interaction.reply({ embeds: [embed] });
        } else {
            const embed = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(
                    client.languages.__({
                        phrase: 'avatar.self',
                        locale: language,
                    })
                )
                .setImage(
                    interaction.user.displayAvatarURL({
                        dynamic: true,
                        size: 4096,
                    })
                );
            return interaction.reply({ embeds: [embed] });
        }
    },
};
