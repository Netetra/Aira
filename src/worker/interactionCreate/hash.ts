import crypto from 'crypto';

import { DiscordInteractionCreateWorker } from '../../model/discord/index.js';

function StringToMD5(str: string) {
    const md5 = crypto.createHash('md5').update(str, 'binary').digest('hex');
    return md5;
}

function StringToSHA256(str: string) {
    const sha256 = crypto
        .createHash('sha256')
        .update(str, 'binary')
        .digest('hex');
    return sha256;
}

const HashCommand = new DiscordInteractionCreateWorker('hash', '文字列暗号化');

HashCommand.option
    .addStringOption((option) =>
        option
            .setName('hash')
            .setDescription('暗号化方式を選択')
            .addChoices(
                { name: 'md5', value: 'md5' },
                { name: 'sha256', value: 'sha256' },
            )
            .setRequired(true),
    )
    .addStringOption((option) =>
        option.setName('string').setDescription('文字列').setRequired(true),
    );

HashCommand.setExecute(async (client, interaction) => {
    switch (interaction.options.getString('hash')) {
        case 'md5':
            await interaction.reply(
                StringToMD5(interaction.options.getString('string')),
            );
            break;
        case 'sha256':
            await interaction.reply(
                StringToSHA256(interaction.options.getString('string')),
            );
            break;
    }
});

export { HashCommand };
