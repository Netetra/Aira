import { REST, Routes } from 'discord.js';
import type { Message, SlashCommandBuilder } from 'discord.js';

import type { DiscordInteractionCreateWorker } from '../model/discord/index.js';

function commandRegister(
    DISCORD_BOT_TOKEN: string,
    botId: string,
    interactionCreateWorkers: DiscordInteractionCreateWorker[],
): void {
    const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);
    let slashCommandOptions: SlashCommandBuilder[] = [];
    for (let i = 0; i < interactionCreateWorkers.length; i++) {
        slashCommandOptions.push(interactionCreateWorkers[i].option);
    }
    (async () => {
        await rest
            .put(Routes.applicationCommands(botId), {
                body: slashCommandOptions,
            })
            .then(() => console.log('[SUCCESS] Registered all guild commands.'))
            .catch(console.error);
    })();
}

function getImageURLs(message: Message) {
    const imageURLs: string[] = [];
    message.attachments.map((v) => {
        imageURLs.push(v.url);
    });
    return imageURLs;
}

export { commandRegister, getImageURLs };
