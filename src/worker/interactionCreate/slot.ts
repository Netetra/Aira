import { DiscordInteractionCreateWorker } from '../../model/discord/index.js';

const SlotCommand = new DiscordInteractionCreateWorker(
    'slot',
    '(2n+1)^2マスのスロット',
);

SlotCommand.option.addNumberOption((option) =>
    option
        .setName('n')
        .setDescription('1～5の間の数字を指定')
        .setRequired(true),
);

SlotCommand.setExecute(async (client, interaction) => {
    const emoji: string[] = [
        ':innocent: ',
        ':poop: ',
        ':face_with_symbols_over_mouth: ',
        ':eyes: ',
        ':monkey_face: ',
        ':thinking: ',
        ':radioactive: ',
        ':computer: ',
        ':cockroach: ',
        ':face_vomiting: ',
        ':thumbsdown: ',
        ':nauseated_face: ',
        ':sunglasses: ',
        ':beer: ',
        ':100: ',
        ':pill: ',
        ':gem: ',
        ':fox: ',
        ':hatching_chick: ',
        ':strawberry: ',
        ':squid: ',
        ':chicken: ',
        ':briefs: ',
        ':smiling_imp: ',
        ':avocado: ',
        ':space_invader: ',
        ':mechanical_arm: ',
    ];
    const n = interaction.options.getNumber('n') * 2 + 1;
    if (n > 11) {
        await interaction.reply('5以下の数値を入力してください');
        return;
    }
    let slot = '';
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            slot = slot + emoji[Math.floor(Math.random() * emoji.length)];
        }
        slot = slot + '\n';
    }
    await interaction.reply(slot);
});

export { SlotCommand };
