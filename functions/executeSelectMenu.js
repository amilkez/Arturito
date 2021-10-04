const guildModel = require('../models/guild.js');

module.exports = async (client, interaction, language) => {
    const commandName = interaction.message.interaction.commandName;
    const selectMenuId = interaction.customId;
    const selectMenu = client.selectMenus.get(selectMenuId);

    if (!selectMenu) return;

    const Guild = interaction.member.guild;

    await guildModel
        .findOne({ guildId: interaction.guildId })
        .then((s, err) => {
            if (err) return console.log(err);
            if (s) {
                Guild.lang = s.lang;
            } else {
                const newGuild = new guildModel({
                    guildId: interaction.guildId.toString(),
                    lang: 'en',
                });
                newGuild.save().catch((e) => console.log(e));
            }
        });

    try {
        const language = interaction.member.guild.lang;
        await selectMenu.execute(client, interaction, language);
    } catch (e) {
        console.log(e);
    }
};
