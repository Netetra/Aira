import dotenv from 'dotenv';
import { Client, ClientEvents, GatewayIntentBits } from 'discord.js';

import { eventHandlers } from './events/index.js';

const intents: GatewayIntentBits[] = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
];

dotenv.config();
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const client = new Client({ intents });

// イベントハンドラー読み込み
for (let i = 0; i < eventHandlers.length; i++) {
    const eventName = eventHandlers[i].eventName;
    if (eventHandlers[i].isOnce) {
        client.once(eventName, (...args: ClientEvents[]) =>
            eventHandlers[i].execute(client, ...args),
        );
    } else {
        client.on(eventHandlers[i].eventName, (...args) =>
            eventHandlers[i].execute(client, ...args),
        );
    }
}

client.login(DISCORD_BOT_TOKEN).catch(console.error);
