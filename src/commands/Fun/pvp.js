import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fs from 'fs';

const DB_PATH = './pvpWins.json';

// load database
function loadDB() {
  if (!fs.existsSync(DB_PATH)) return {};
  return JSON.parse(fs.readFileSync(DB_PATH));
}

// save database
function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export default {
  data: new SlashCommandBuilder()
    .setName("pvpauto")
    .setDescription("PvP auto format (advanced)")

    .addStringOption(o => o.setName('nama').setDescription('Nama kamu').setRequired(true))
    .addStringOption(o => o.setName('mode').setDescription('Mode').setRequired(true))
    .addStringOption(o => o.setName('rules').setDescription('Rules').setRequired(false))
    .addStringOption(o => o.setName('tipe').setDescription('Tipe (1v1)').setRequired(false))
    .addStringOption(o => o.setName('hasil').setDescription('Win / Lose').setRequired(true))
    .addUserOption(o => o.setName('lawan').setDescription('Tag lawan').setRequired(true))
    .addIntegerOption(o => o.setName('totem').setDescription('Totem hancur').setRequired(false)),

  category: 'Fun',

  async execute(interaction) {
    try {
      const nama = interaction.options.getString('nama');
      const mode = interaction.options.getString('mode');
      const rules = interaction.options.getString('rules') || '-';
      const tipe = interaction.options.getString('tipe') || '1v1';
      const hasil = interaction.options.getString('hasil');
      const lawan = interaction.options.getUser('lawan');
      const totem = interaction.options.getInteger('totem') ?? '-';

      // === DATABASE ===
      const db = loadDB();

      if (!db[nama]) db[nama] = 0;

      if (hasil.toLowerCase() === 'win') {
        db[nama] += 1;
      }

      saveDB(db);

      const totalWin = db[nama];

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
${totalWin}

🛡️ **Totem Hancur:**  
${totem}`
        )
        .setColor(color)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

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
