import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('pvpauto')
    .setDescription('Auto format PvP log')

    .addStringOption(option =>
      option.setName('nama')
        .setDescription('Nama player')
        .setRequired(true)
    )

    .addStringOption(option =>
      option.setName('mode')
        .setDescription('Mode (Training, Sparing, dll)')
        .setRequired(true)
        .addChoices(
          { name: 'Training', value: 'training' },
          { name: 'Sparing', value: 'sparing' }
        )
    )

    .addStringOption(option =>
      option.setName('rules')
        .setDescription('Rules')
        .setRequired(false)
    )

    .addUserOption(option =>
      option.setName('lawan')
        .setDescription('Lawan PvP')
        .setRequired(true)
    )

    .addIntegerOption(option =>
      option.setName('win')
        .setDescription('Jumlah win')
        .setRequired(false)
    )

    .addIntegerOption(option =>
      option.setName('totem')
        .setDescription('Jumlah totem')
        .setRequired(false)
    ),

  async execute(interaction) {

    const nama = interaction.options.getString('nama');
    const mode = interaction.options.getString('mode');
    const rules = interaction.options.getString('rules') ?? '-';
    const lawan = interaction.options.getUser('lawan');
    const win = interaction.options.getInteger('win') ?? 0;
    const totem = interaction.options.getInteger('totem') ?? 0;

    await interaction.reply({
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
