import { ChannelType, EmbedBuilder } from 'discord.js';
import type { Message, Client } from 'discord.js';
import { setTimeout } from 'node:timers/promises';

import { DiscordMessageCreateWorker } from '../../model/discord/worker.js';
import { getImageURLs } from '../../lib/discord.js';

const msgLinkToEmbed = new DiscordMessageCreateWorker(
    /https:\/\/discord.com\/channels\/\d*\/\d*\/\d*/g,
);

msgLinkToEmbed.setExecute(async (client: Client, message: Message) => {
    let embeds: EmbedBuilder[] = [];
    const msgURLs = [
        ...message.content.matchAll(
            /https:\/\/discord.com\/channels\/\d*\/\d*\/\d*/g,
        ),
    ].map((v) => v[0]);
    for (let i = 0; i < msgURLs.length; i++) {
        const [guildId, channelId, messageId] = msgURLs[i]
            .replace('https://discord.com/channels/', '')
            .split('/');
        const guild = await client.guilds.fetch(guildId);
        if (!guild.available) {
            const reply = await message.reply('サーバーを取得できませんでした');
            await setTimeout(5000);
            reply.delete();
            return;
        }
        const channel = await guild.channels.fetch(channelId);
        if (channel.type != ChannelType.GuildText) {
            const reply = await message.reply(
                'チャンネルを取得できませんでした',
            );
            await setTimeout(5000);
            reply.delete();
            return;
        }
        const getMessage = await channel.messages.fetch(messageId);
        const embed = new EmbedBuilder()
            .setAuthor({
                name: getMessage.author.username,
                iconURL: getMessage.author.avatarURL(),
            })
            .setFooter({
                text: `${guild.name} ${channel.name}`,
                iconURL: guild.bannerURL(),
            })
            .setTimestamp();
        const imageURLs = getImageURLs(getMessage);
        if (imageURLs.length) {
            for (let i = 0; i < imageURLs.length; i++) {
                embed.setImage(imageURLs[i]);
            }
        } else if (getMessage.content == '') {
            const reply = await message.reply('メッセージ内容が空です');
            await setTimeout(5000);
            reply.delete();
            return;
        }
        if (getMessage.content != '') {
            embed.setDescription(getMessage.content);
        }
        embeds.push(embed);
    }
    await message.reply({ embeds: embeds });
});

export { msgLinkToEmbed };
