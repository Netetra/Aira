import { ChannelType, Client, EmbedBuilder, Message } from 'discord.js';
import { setTimeout } from 'node:timers/promises';

import { DiscordMessageCreateWorker } from '../../model/discord/worker.js';

const msgLinkToEmbed: DiscordMessageCreateWorker =
    new DiscordMessageCreateWorker(
        /https:\/\/discord.com\/channels\/\d{18}\/\d{18}\/\d{19}/g,
        async (client: Client, message: Message) => {
            let embeds: EmbedBuilder[] = [];
            const msgURLs = [
                ...message.content.matchAll(
                    /https:\/\/discord.com\/channels\/\d{18}\/\d{18}\/\d{19}/g,
                ),
            ].map((v) => v[0]);
            for (let i = 0; i < msgURLs.length; i++) {
                const [guildId, channelId, messageId] = msgURLs[i]
                    .replace('https://discord.com/channels/', '')
                    .split('/');
                const guild = await client.guilds.fetch(guildId);
                if (!guild.available) {
                    const reply = await message.reply(
                        'サーバーを取得できませんでした',
                    );
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
                        text: `サーバー:${guild.name} チャンネル:${channel.name}`,
                        iconURL: guild.bannerURL(),
                    })
                    .setTimestamp();
                const imageURLs: string[] = [];
                getMessage.attachments.map((v) => {
                    imageURLs.push(v.url);
                });
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
        },
    );

export { msgLinkToEmbed };
