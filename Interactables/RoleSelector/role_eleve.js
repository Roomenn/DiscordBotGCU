const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require('discord.js');
const { embedColor, roleSelectionHead } = require('../../config.json');

module.exports = {
	name: "role_eleve",
	async execute(interaction) {

		const text = ":small_blue_diamond::arrow_forward: Choisissez votre **promotion**:"
		const row = new ActionRowBuilder()
		.addComponents(
			new SelectMenuBuilder()
				.setCustomId('promo')
				.setPlaceholder('Promotion')
				.addOptions([
					{
						label: '3 GCU',
						value: 'role_eleve2?3GCU',
					},
					{
						label: '4 GCU',
						value: 'role_eleve2?4GCU',
					},
					{
						label: '5 GCU',
						value: 'role_eleve2?5GCU',
					},
				]),
		);

		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(roleSelectionHead)
			.setDescription(text)

		await interaction.update({ embeds: [embed], ephemeral: true , components: [row] })
	}
};