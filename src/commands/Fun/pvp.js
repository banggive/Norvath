import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName("pvp")
    .setDescription("Test PvP")
    .addStringOption(o => 
      o.setName('text')
        .setDescription('Isi pesan')
        .setRequired(true)
    ),

  category: 'Fun',

  async execute(interaction) {
    try {
      const text = interaction.options.getString('text');

      await interaction.reply({
        content: text
      });

    } catch (err) {
      console.error(err);

      if (!interaction.replied) {
        await interaction.reply({
          content: '❌ error',
          ephemeral: true
        });
      }
    }
  },
};
