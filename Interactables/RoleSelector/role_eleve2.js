const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require('discord.js');
const { embedColor, roleSelectionHead, elevePrefix, promoPrefix, classePrefix } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_eleve2",
	async execute(interaction) {

		const promo = interaction.values[0].split("?")[1]
        componentOptions = []
		const baseValue = "role_eleve3?" +elevePrefix+ "Élève?" +promoPrefix+promo+ "?" + classePrefix

		if (promo === "3GCU") {
			componentOptions = [
				{
					label: 'Groupe A',
					value: baseValue + '3A',
				},
				{
					label: 'Groupe B',
					value: baseValue + '3B',
				},
				{
					label: 'Groupe C',
					value: baseValue + '3C',
				}
			]
		} else if (promo === "4GCU") {
			componentOptions = [
				{
					label: 'Groupe A',
					value: baseValue + '4A',
				},
				{
					label: 'Groupe B',
					value: baseValue + '4B',
				},
				{
					label: 'Groupe C',
					value: baseValue + '4C',
				}
			]
		} else if (promo === "5GCU") {
			componentOptions = [
				{
					label: 'Groupe GU',
					value: baseValue + '5GU',
				},
				{
					label: 'Groupe TP',
					value: baseValue + '5TP',
				},
				{
					label: 'Groupe BAT',
					value: baseValue + '5BAT',
				}
			]
		}

		const text = ":small_blue_diamond::small_blue_diamond: :arrow_forward: Choisissez votre **groupe classe**:"
        const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('promo')
					.setPlaceholder("Groupe classe")
					.addOptions(componentOptions))

		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(roleSelectionHead)
			.setDescription(text)

		await interaction.update({ embeds: [embed], ephemeral: true , components: [row] })
	}
};