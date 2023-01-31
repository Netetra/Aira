import { Events } from 'discord.js';
import type { Client } from 'discord.js';

import { DiscordEventHandler } from '../model/discord/index.js';
import { interactionCreateWorkers } from '../worker/interactionCreate/index.js';
import { commandRegister } from '../lib/discord.js';

function readyLog(botName: string, botId: string, version: string): void {
    console.info('');
    console.info('=============================');
    console.info(`BotName: ${botName}`);
    console.info(`BotID: ${botId}`);
    console.info(`Version: ${version}`);
    console.info('=============================');
    console.info('');
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
        commandRegister(token, botId, interactionCreateWorkers);
        setInterval(() => {
            client.user.setActivity({
                name: `Severs:${joinServers} | v${version}`,
            });
        }, 10000);
    },
);

export { ReadyEvent };
