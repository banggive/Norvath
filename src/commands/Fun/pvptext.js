import { SlashCommandBuilder } from 'discord.js';
import { successEmbed } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';
import { handleInteractionError } from '../../utils/errorHandler.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
  data: new SlashCommandBuilder()
    .setName("pvptext2")
    .setDescription("Kirim embed bebas (custom text)")
    .addStringOption(option =>
      option.setName('isi')
        .setDescription('Isi teks bebas')
        .setRequired(true)
    ),

  category: 'Fun',

  async execute(interaction) {
    try {
      const isi = interaction.options.getString('isi');

      const embed = successEmbed("pvp logs", isi);

      await InteractionHelper.safeReply(interaction, {
        embeds: [embed]
      });

      logger.debug(`pvptext digunakan oleh ${interaction.user.id}`);

    } catch (error) {
      logger.error(error);

      await handleInteractionError(interaction, error, {
        commandName: 'pvptext',
        source: 'pvptext_command'
      });
    }
  },
};
