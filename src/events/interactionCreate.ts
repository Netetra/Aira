import { Client, Events, ChatInputCommandInteraction } from 'discord.js';

import { DiscordEventHandler } from '../model/discord/index.js';
import { interactionCreateWorkers } from '../worker/interactionCreate/index.js';

const InteractionCreateEvent = new DiscordEventHandler(
    Events.InteractionCreate,
    false,
    async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.isChatInputCommand()) return;
        for (let i = 0; i < interactionCreateWorkers.length; i++) {
            if (interactionCreateWorkers[i].name == interaction.commandName) {
                await interactionCreateWorkers[i].execute(client, interaction);
            }
        }
    },
);

export { InteractionCreateEvent, interactionCreateWorkers };
