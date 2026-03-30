import { SlashCommandBuilder } from 'discord.js';
import { successEmbed } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';
import { handleInteractionError } from '../../utils/errorHandler.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
  data: new SlashCommandBuilder()
    .setName("pvp2")
    .setDescription("Buat PvP log embed")

    .addStringOption(o => o.setName('nama').setDescription('Nama kamu').setRequired(true))
    .addStringOption(o => o.setName('mode').setDescription('Mode').setRequired(true))
    .addStringOption(o => o.setName('rules').setDescription('Rules').setRequired(false))
    .addStringOption(o => o.setName('tipe').setDescription('Tipe (1v1)').setRequired(false))
    .addStringOption(o => o.setName('hasil').setDescription('Win/Lose').setRequired(true))
    .addStringOption(o => o.setName('lawan').setDescription('Nama lawan').setRequired(true))
    .addStringOption(o => o.setName('win').setDescription('Total win').setRequired(false))
    .addStringOption(o => o.setName('totem').setDescription('Totem hancur').setRequired(false)),

  category: 'Fun',

  async execute(interaction) {
    try {
      const nama = interaction.options.getString('nama');
      const mode = interaction.options.getString('mode');
      const rules = interaction.options.getString('rules') || '-';
      const tipe = interaction.options.getString('tipe') || '1v1';
      const hasil = interaction.options.getString('hasil');
      const lawan = interaction.options.getString('lawan');
      const win = interaction.options.getString('win') || '0';
      const totem = interaction.options.getString('totem') || '-';

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

      await InteractionHelper.safeReply(interaction, { embeds: [embed] });

    } catch (error) {
      logger.error(error);
      await handleInteractionError(interaction, error);
    }
  },
};
