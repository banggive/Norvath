import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName("pvp")
    .setDescription("Kirim PvP embed")
    .addStringOption(o => 
      o.setName('text')
        .setDescription('Isi pesan')
        .setRequired(true)
    ),

  category: 'Fun',

  async execute(interaction) {
    try {
      const text = interaction.options.getString('text');

      const embed = new EmbedBuilder()
        .setTitle('📢 PvP Logs')
        .setDescription(text)
        .setColor(0x00AEFF);

      await interaction.reply({
        embeds: [embed]
      });

    } catch (err) {
      console.error(err);

      if (!interaction.replied) {
        await interaction.reply({
          content: '❌ error embed',
          ephemeral: true
        });
      }
    }
  },
};
