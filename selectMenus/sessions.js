const createYoutubeTogether = require('../functions/createYoutubeTogether.js');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
let applicationID;

module.exports = {
    data: {
        name: 'sessions',
    },
    async execute(client, interaction, language) {
        if (!interaction.member.voice.channel) {
            return interaction.update({
                content: client.languages.__({
                    phrase: 'youtube.noChannel',
                    locale: language,
                }),
                ephemeral: true,
            });
        }
        switch (interaction.values[0]) {
            case 'youtube':
                applicationID = '755600276941176913';
                break;
            case 'fishington':
                applicationID = '814288819477020702';
                break;
            case 'poker':
                applicationID = '755827207812677713';
                break;
            case 'betrayal':
                applicationID = '773336526917861400';
                break;
            case 'chess':
                applicationID = '832012774040141894';
                break;
        }
        createYoutubeTogether(
            client,
            interaction.member.voice.channel.id,
            applicationID,
            900
        )
            .then((invite) => {
                const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(
                        client.languages.__mf(
                            {
                                phrase: 'youtube.inviteMessage',
                                locale: language,
                            },
                            { inviteLink: invite.code }
                        )
                    );
                return interaction.update({
                    content: ' ',
                    components: [],
                    embeds: [embed],
                });
            })
            .catch((e) => {
                if (
                    e == 'An error has occurred while getting the information'
                ) {
                    const errorEmbed = new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle(
                            client.languages.__({
                                phrase: 'utilities.errorEmbed',
                                locale: language,
                            })
                        )
                        .setDescription(
                            client.languages.__({
                                phrase: 'utilities.unexpectedError',
                                locale: language,
                            })
                        )
                        .setFooter(
                            interaction.member.user.username,
                            interaction.member.user.avatarURL()
                        );
                    return interaction.update({
                        content: ' ',
                        components: [],
                        embeds: [errorEmbed],
                    });
                } else if (
                    e ==
                    "Your bot doesn't have the enough permissions to run this command"
                ) {
                    const errorEmbed = new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle(
                            client.languages.__({
                                phrase: 'utilities.errorEmbed',
                                locale: language,
                            })
                        )
                        .setDescription(
                            client.languages.__({
                                phrase: 'utilities.noInvitePerms',
                                locale: language,
                            })
                        )
                        .setFooter(
                            interaction.member.user.username,
                            interaction.member.user.avatarURL()
                        );
                    return interaction.update({
                        content: ' ',
                        components: [],
                        embeds: [errorEmbed],
                    });
                } else if (e == 'Bad Request') {
                    const errorEmbed = new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle(
                            client.languages.__({
                                phrase: 'utilities.badRequest',
                                locale: language,
                            })
                        )
                        .setDescription(
                            client.languages.__({
                                phrase: 'utilities.badRequest',
                                locale: language,
                            })
                        )
                        .setFooter(
                            interaction.member.user.username,
                            interaction.member.user.avatarURL()
                        );
                    return interaction.update({
                        content: ' ',
                        components: [],
                        embeds: [errorEmbed],
                    });
                } else {
                    console.log(e);
                }
            });
    },
};
