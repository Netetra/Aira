import { SlashCommandBuilder } from 'discord.js';

class DiscordBeseEventWorker {
    private executeFunc: Function;
    setExecute(executeFunc: Function) {
        this.executeFunc = executeFunc;
    }
    execute(...args) {
        this.executeFunc(...args);
    }
}

class DiscordMessageCreateWorker extends DiscordBeseEventWorker {
    private regex: RegExp;
    constructor(regex: RegExp) {
        super();
        this.regex = regex;
    }
    isMatch(content: string):boolean {
        if (content.match(this.regex)) return true
        return false
    }
}

class DiscordInteractionCreateWorker extends DiscordBeseEventWorker {
    public name: string;
    public option: SlashCommandBuilder;
    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.option = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description);
    }
}

export { DiscordMessageCreateWorker, DiscordInteractionCreateWorker };
