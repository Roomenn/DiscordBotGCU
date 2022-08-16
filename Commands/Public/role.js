const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { embedColor, roleSelectionHead } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Choisis les rôles qui te corresponent')
		.addBooleanOption(option =>
			option.setName('permanent')
				.setDescription('Créer un bouton role permanement (Admin)')
				.setRequired(false)),
	
	async execute(interaction) {
		const member = await interaction.guild.members.fetch(interaction.member.id)
		const isAllowed = await RoleUtil.hasRole(interaction.guild, member, "Helper")
		var permanent = interaction.options.getBoolean('permanent')
		if (!permanent)
			permanent = false

        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('role_main')
					.setLabel('Click !')
					.setStyle(ButtonStyle.Primary),
			);
		
		const embed = new EmbedBuilder()
				.setColor(embedColor)
				.setTitle(roleSelectionHead)
		
		if (isAllowed && permanent) {
			await interaction.channel.send({ embeds: [embed], components: [row] })
			await interaction.reply({ content: 'Permanent button created !', ephemeral: true });

		} else {
			await interaction.reply({ embeds: [embed], ephemeral: true , components: [row] });
		}
	},
};