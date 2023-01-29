import { ReadyEvent } from './ready.js';
import { InteractionCreateEvent } from './interactionCreate.js';
import { MessageCreateEvent } from './messageCreate.js';

const eventHandlers = [ReadyEvent, InteractionCreateEvent, MessageCreateEvent];

export { eventHandlers };
