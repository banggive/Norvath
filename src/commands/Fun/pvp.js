import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName("pvpauto")
    .setDescription("Auto format PvP log")
    .addStringOption(option =>
      option.setName('isi')
        .setDescription('Contoh: nama=Jay, mode=Training, hasil=Win')
        .setRequired(true)
    ),

  category: 'Fun',

  async execute(interaction) {
    try {
      const input = interaction.options.getString('isi');

      // parser sederhana
      const data = {};
      input.split(',').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value) {
          data[key.trim().toLowerCase()] = value.trim();
        }
      });

      // ambil data
      const nama = data.nama || '-';
      const mode = data.mode || '-';
      const rules = data.rules || '-';
      const tipe = data.tipe || '1v1';
      const hasil = data.hasil || '-';
      const lawan = data.lawan || '-';
      const win = data.win || '0';
      const totem = data.totem || '-';

      // warna auto
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

     // 🔥 INI BAGIAN BARU
      await interaction.deferReply({ ephemeral: true });
      await interaction.deleteReply();

      await interaction.channel.send({
        embeds: [embed]
      });

    } catch (err) {
      console.error(err);

      if (!interaction.replied) {
        await interaction.reply({
          content: '❌ error pvpauto',
          ephemeral: true
        });
      }
    }
  },
};
