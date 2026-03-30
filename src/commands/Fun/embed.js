import { SlashCommandBuilder } from 'discord.js';
import { successEmbed } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';
import { handleInteractionError } from '../../utils/errorHandler.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Kirim embed custom")
    .addStringOption(option =>
      option.setName('text')
        .setDescription('Isi pesan embed')
        .setRequired(true)
    ),

  category: 'Fun',

  async execute(interaction, config, client) {
    try {
      const text = interaction.options.getString('text');

      const embed = successEmbed("📢 Message", text);

      await InteractionHelper.safeReply(interaction, {
        embeds: [embed]
      });

      logger.debug(`Embed command used by ${interaction.user.id}`);

    } catch (error) {
      logger.error('Embed command error:', error);

      await handleInteractionError(interaction, error, {
        commandName: 'embed',
        source: 'embed_command'
      });
    }
  },
};
