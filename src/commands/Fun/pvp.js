import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName("pvpnew")
    .setDescription("PvP log lengkap")

    .addStringOption(o => o.setName('nama').setDescription('Nama').setRequired(true))
    .addStringOption(o => o.setName('mode').setDescription('Mode').setRequired(true))

    .addStringOption(o => 
      o.setName('rules')
        .setDescription('Rules')
        .addChoices(
          { name: 'Standard', value: 'standard' },
          { name: 'Crystal', value: 'crystal' },
          { name: 'UHC', value: 'uhc' }
        )
    )

    .addStringOption(o => o.setName('tipe').setDescription('Tipe'))
    .addStringOption(o => o.setName('hasil').setDescription('Win / Lose').setRequired(true))
    .addUserOption(o => o.setName('lawan').setDescription('Lawan').setRequired(true))
    .addIntegerOption(o => o.setName('win').setDescription('Total kemenangan'))
    .addIntegerOption(o => o.setName('totem').setDescription('Totem hancur')),

  category: 'Fun',

  async execute(interaction) {
    try {
      const nama = interaction.options.getString('nama');
      const mode = interaction.options.getString('mode');
      const rulesInput = interaction.options.getString('rules');
      const tipe = interaction.options.getString('tipe') || '1v1';
      const hasil = interaction.options.getString('hasil');
      const lawan = interaction.options.getUser('lawan');
      const win = interaction.options.getInteger('win') ?? '-';
      const totem = interaction.options.getInteger('totem') ?? '-';

      let rules = '-';

      if (rulesInput === 'standard') {
        rules = `• Crystal: Tidak
• Potion: Tidak
• Mace: Tidak
• Elytra: Tidak`;
      } else if (rulesInput === 'crystal') {
        rules = `• Crystal: Ya
• Potion: Tidak
• Mace: Tidak`;
      } else if (rulesInput === 'uhc') {
        rules = `• Golden Apple: Ya
• Potion: Tidak
• Totem: Tidak`;
      }

      let color = 0x00AEFF;
      if (hasil.toLowerCase() === 'win') color = 0x00ff00;
      if (hasil.toLowerCase() === 'lose') color = 0xff0000;

      const embed = new EmbedBuilder()
        .setTitle('📢 PvP Logs')
        .setDescription(
`📌 **Nama:**  
${nama}

⚔️ **Mode:**  
${mode}

📜 **Rules:**  
${rules}

👥 **Tipe:**  
${tipe}

🔥 **Hasil:**  
${hasil}

🎯 **Lawan:**  
${lawan}

🏆 **Total Kemenangan:**  
${win}

🛡️ **Totem Hancur:**  
${totem}`
        )
        .setColor(color)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ error', ephemeral: true });
    }
  },
};
