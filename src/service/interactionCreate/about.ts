import { Client, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';

import { DiscordInteractionCreateWorker } from '../../model/discord/index.js';

const AboutCommand = new DiscordInteractionCreateWorker(
    'about',
    'このBotについて',
);

AboutCommand.setExecute(
    async (client: Client, interaction: ChatInputCommandInteraction) => {
        const botTag = client.user.tag;
        const botPing = client.ws.ping;
        const version = process.env.npm_package_version ?? '不明';
        const abountEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('このBotについて')
            .setDescription(botTag)
            .addFields(
                {
                    name: 'version',
                    value: `v${version}`,
                    inline: true,
                },
                { name: 'ping', value: `${botPing}ms`, inline: true },
                {
                    name: '製作者',
                    value: '[Netetra](https://github.com/Netetra)',
                    inline: true,
                },
            );
        await interaction.reply({ embeds: [abountEmbed] });
    },
);

export { AboutCommand };
