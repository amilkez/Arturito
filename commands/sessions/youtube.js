const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription('Create a youtube session')
        .addBooleanOption((option) =>
            option
                .setName('unlimited')
                .setDescription(
                    "Enable this option for the session to not expire. Otherwise, it'll expire in the next 15 minutes"
                )
        ), //22:50
    async execute(client, interaction, language) {
        await interaction.reply({
            content: client.languages.__({
                phrase: 'youtube.loading',
                locale: language,
            }),
            ephemeral: true,
        });
        if (!interaction.member.voice.channel) {
            return interaction.editReply({
                content: client.languages.__({
                    phrase: 'youtube.noChannel',
                    locale: language,
                }),
                ephemeral: true,
            });
        }
        if (interaction.options._hoistedOptions[0]?.value) {
            //create invitation
            createYoutubeTogether(
                client,
                interaction.member.voice.channel.id,
                '755600276941176913',
                0
            )
                .then((invite) => {
                    const embed = new MessageEmbed()
                        .setColor(config.defaultSuccessColor)
                        .setDescription(
                            `**[Click Here](${invite.code} 'Youtube Link')**`
                        );
                    return interaction.editReply({
                        content: ' ',
                        embeds: [embed],
                    });
                })
                .catch((e) => {
                    if (
                        e ==
                        'An error has occurred while getting the information'
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
                        return interaction.editReply({
                            content: ' ',
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
                        return interaction.editReply({
                            content: ' ',
                            embeds: [errorEmbed],
                        });
                    }
                });
        } else {
            createYoutubeTogether(
                client,
                interaction.member.voice.channel.id,
                '755600276941176913',
                900
            )
                .then((invite) => {
                    const embed = new MessageEmbed()
                        .setColor(config.defaultSuccessColor)
                        .setDescription(
                            `**[Click Here](${invite.code} 'Youtube Link')**`
                        );
                    return interaction.editReply({
                        content: ' ',
                        embeds: [embed],
                    });
                })
                .catch((e) => {
                    if (
                        e ==
                        'An error has occurred while getting the information'
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
                        return interaction.editReply({
                            content: ' ',
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
                        return interaction.editReply({
                            content: ' ',
                            embeds: [errorEmbed],
                        });
                    }
                });
        }
    },
};

async function createYoutubeTogether(
    client,
    voiceChannelId,
    applicationID,
    time
) {
    let returnData = {};
    return new Promise((resolve, reject) => {
        fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
            method: 'POST',
            body: JSON.stringify({
                max_age: time,
                max_uses: 0,
                target_application_id: applicationID,
                target_type: 2,
                temporary: false,
                validate: null,
            }),
            headers: {
                Authorization: `Bot ${client.token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((invite) => {
                if (invite.error || !invite.code) {
                    reject(
                        'An error has occurred while getting the information'
                    );
                }
                if (invite.code === 50013 || invite.code === '50013') {
                    reject(
                        "Your bot doesn't have the enough permissions to run this command"
                    );
                }
                returnData.code = `https://discord.com/invite/${invite.code}`;
                resolve(returnData);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}
