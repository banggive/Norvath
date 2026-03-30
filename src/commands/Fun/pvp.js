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
        .setDescription('Mode (Training, Ranked, dll)')
        .setRequired(true)
        .addChoices(
          { name: 'Training', value: 'training' },
          { name: 'Ranked', value: 'ranked' }
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
      content: `
📊 **PvP Log**
Nama: ${nama}
Mode: ${mode}
Rules: ${rules}
Lawan: ${lawan}
Win: ${win}
Totem: ${totem}
      `
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
