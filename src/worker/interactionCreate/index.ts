import { AboutCommand } from './about.js';
import { RandomInviteCommand } from './rinvite.js';
import { SlotCommand } from './slot.js';
import { HashCommand } from './hash.js';

const interactionCreateWorkers = [
    AboutCommand,
    RandomInviteCommand,
    SlotCommand,
    HashCommand,
];

export { interactionCreateWorkers };
