import { SlashCommandBuilder } from 'discord.js';
import { successEmbed } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';
import { handleInteractionError } from '../../utils/errorHandler.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
  data: new SlashCommandBuilder()
    .setName("pvpauto")
    .setDescription("Auto format PvP log")
    .addStringOption(option =>
      option.setName('isi')
        .setDescription('Format: nama=..., mode=..., hasil=...')
        .setRequired(true)
    ),

  category: 'Fun',

  async execute(interaction) {
    try {
      const input = interaction.options.getString('isi');

      // parser sederhana key=value
      const data = {};
      input.split(',').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value) {
          data[key.trim().toLowerCase()] = value.trim();
        }
      });

      // ambil data dengan default
      const nama = data.nama || '-';
      const mode = data.mode || '-';
      const rules = data.rules || '-';
      const tipe = data.tipe || '1v1';
      const hasil = data.hasil || '-';
      const lawan = data.lawan || '-';
      const win = data.win || '0';
      const totem = data.totem || '-';

      const text = `
📌 **Nama:**  
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
${totem}
`;

      const embed = successEmbed("pvp logs", text);

      await InteractionHelper.safeReply(interaction, {
        embeds: [embed]
      });

      logger.debug(`pvpauto digunakan oleh ${interaction.user.id}`);

    } catch (error) {
      logger.error(error);

      await handleInteractionError(interaction, error, {
        commandName: 'pvpauto',
        source: 'pvpauto_command'
      });
    }
  },
};
