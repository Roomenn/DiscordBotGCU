const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require('discord.js');
const { embedColor, promoPrefix, classePrefix, archiPrefix } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "course_channel",
	async execute(interaction) {
		const baseValue = "course_channel2?0?"

        const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('course_channel')
					.setPlaceholder("Groupes d'élèves")
					.setMinValues(1)
					.setMaxValues(14)
					.addOptions([
						{
							label: '3 GCU',
							value: baseValue +promoPrefix+ '3GCU',
						},
						{
							label: 'Groupe 3A',
							value: baseValue +classePrefix+ '3A',
						},
						{
							label: 'Groupe 3B',
							value: baseValue +classePrefix+ '3B',
						},
                        {
							label: 'Groupe 3C',
							value: baseValue +classePrefix+ '3C',
						},
						{
							label: '4 GCU',
							value: baseValue +promoPrefix+ '4GCU',
						},
                        {
							label: 'Groupe 4A',
							value: baseValue +classePrefix+ '4A',
						},
						{
							label: 'Groupe 4B',
							value: baseValue +classePrefix+ '4B',
						},
                        {
							label: 'Groupe 4C',
							value: baseValue +classePrefix+ '4C',
						},
                        {
							label: '5 GCU',
							value: baseValue +promoPrefix+ '5GCU',
						},
                        {
							label: 'Groupe 5GU',
							value: baseValue +classePrefix+ '5GU',
						},
						{
							label: 'Groupe 5TP',
							value: baseValue +classePrefix+ '5TP',
						},
                        {
							label: 'Groupe 5BAT',
							value: baseValue +classePrefix+ '5BAT',
						},
						{
							label: 'Ingé Archi',
							value: baseValue +archiPrefix+ 'Ingé Archi',
						},
						{
							label: 'Archi Ingé',
							value: baseValue +archiPrefix+ 'Archi Ingé',
						}
					])
			)

		const text = `Choisissez la/les promotions concernées`
		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle("Création d'une salle de cours")
			.setDescription(text)

        await interaction.reply({ embeds: [embed], ephemeral: true , components: [row] })
	}
}