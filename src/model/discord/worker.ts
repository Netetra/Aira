import { SlashCommandBuilder } from 'discord.js';

class DiscordMessageCreateWorker {
    public regex: RegExp;
    public mode: string;
    public execute: Function;
    constructor(regex: RegExp, execute: Function) {
        this.regex = regex;
        this.execute = execute;
    }
    isMatch(content: string) {
        return this.regex.test(content);
    }
}

class DiscordInteractionCreateWorker {
    public name: string;
    public option: SlashCommandBuilder;
    public execute: Function;
    constructor(name: string, description: string) {
        this.name = name;
        this.option = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description);
    }
    setExecute(execute: Function) {
        this.execute = execute;
    }
}

export { DiscordMessageCreateWorker, DiscordInteractionCreateWorker };
