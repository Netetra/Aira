import { Client, Events, Message } from 'discord.js';

import { DiscordEventHandler } from '../model/discord/index.js';
import { messageCreateWorkers } from '../worker/messageCreate/index.js';

const MessageCreateEvent = new DiscordEventHandler(
    Events.MessageCreate,
    false,
    async (client: Client, message: Message) => {
        if (message.author.bot || message.system) return;
        for (let i = 0; i < messageCreateWorkers.length; i++) {
            if (messageCreateWorkers[i].isMatch(message.content)) {
                await messageCreateWorkers[i].execute(client, message);
            }
        }
    },
);

export { MessageCreateEvent };
