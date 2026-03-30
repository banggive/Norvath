import { SlashCommandBuilder } from 'discord.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
  data: new SlashCommandBuilder()
    .setName("pvp")
    .setDescription("test pvp")
    .addStringOption(o => o.setName('text').setRequired(true)),

  category: 'Fun',

  async execute(interaction) {
    const text = interaction.options.getString('text');

    await InteractionHelper.safeReply(interaction, {
      content: text
    });
  },
};
