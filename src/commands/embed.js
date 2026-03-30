export default {
  name: 'embed',
  description: 'Kirim embed message',

  options: [
    {
      name: 'title',
      type: 3,
      description: 'Judul embed',
      required: true
    },
    {
      name: 'desc',
      type: 3,
      description: 'Isi pesan',
      required: true
    },
    {
      name: 'link',
      type: 3,
      description: 'Link (opsional)',
      required: false
    }
  ],

  async execute(interaction) {
    try {
      const title = interaction.options.getString('title');
      const desc = interaction.options.getString('desc');
      const link = interaction.options.getString('link');

      const embed = {
        title: title,
        description: link ? `${desc}\n\n🔗 ${link}` : desc,
        color: 0x00AEFF
      };

      await interaction.channel.send({ embeds: [embed] });

      await interaction.reply({
        content: '✅ embed terkirim',
        ephemeral: true
      });

    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: '❌ error kirim embed',
        ephemeral: true
      });
    }
  }
};