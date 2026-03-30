export default {
  name: 'embed',
  description: 'Kirim embed',

  options: [
    {
      name: 'text',
      description: 'Isi pesan',
      type: 3,
      required: true
    }
  ],

  run: async ({ interaction }) => {
    const text = interaction.options.getString('text');

    await interaction.reply({
      embeds: [
        {
          description: text,
          color: 0x00AEFF
        }
      ]
    });
  }
};
