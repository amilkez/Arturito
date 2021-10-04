const fs = require('fs');
const selectMenus = fs.readdirSync('./selectMenus');

module.exports = (client) => {
    for (const file of selectMenus) {
        const selectMenu = require(`../selectMenus/${file}`);
        client.selectMenus.set(selectMenu.data.name, selectMenu);
    }
};
