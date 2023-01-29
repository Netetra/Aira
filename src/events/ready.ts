import { Client, Events, REST, Routes, SlashCommandBuilder } from 'discord.js';

import {
    DiscordEventHandler,
    DiscordInteractionCreateWorker,
} from '../model/discord/index.js';
import { interactionCreateWorkers } from '../worker/interactionCreate/index.js';

function readyLog(botName: string, botId: string, version: string): void {
    console.info('');
    console.info('=============================');
    console.info(`BotName: ${botName}`);
    console.info(`BotID: ${botId}`);
    console.info(`Version: ${version}`);
    console.info('=============================');
    console.info('');
}

function CommandRegister(
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

const ReadyEvent = new DiscordEventHandler(
    Events.ClientReady,
    true,
    async (client: Client) => {
        if (client.user == null) return;
        const botName = client.user.username;
        const botId = client.user.id;
        const token = process.env.DISCORD_BOT_TOKEN;
        const version = process.env.npm_package_version ?? '不明';
        const joinServers = client.guilds.cache.size;
        readyLog(botName, botId, version);
        CommandRegister(token, botId, interactionCreateWorkers);
        setInterval(() => {
            client.user.setActivity({
                name: `Severs:${joinServers} | v${version}`,
            });
        }, 10000);
    },
);

export { ReadyEvent };
