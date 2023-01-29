import { ClientEvents } from 'discord.js';

class DiscordEventHandler {
    public eventName: string;
    public isOnce: boolean;
    public execute: Function;
    constructor(eventName: string, isOnce: boolean, execute: Function) {
        this.eventName = eventName;
        this.isOnce = isOnce;
        this.execute = execute;
    }
}

export { DiscordEventHandler };
