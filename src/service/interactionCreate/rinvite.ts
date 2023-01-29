import crypto from 'crypto';

import { DiscordInteractionCreateWorker } from '../../model/discord/index.js';

const RandomInviteCommand = new DiscordInteractionCreateWorker(
    'rinvite',
    '招待リンクをランダムに生成',
);

RandomInviteCommand.setExecute(async (client, interaction) => {
    const N = 10;
    const randomChar = crypto.randomBytes(N).toString('base64').substring(0, N);
    await interaction.reply('discord.gg/' + randomChar);
});

export { RandomInviteCommand };
