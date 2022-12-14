const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder  } = require('discord.js');
const { embedColor, roleSelectionHead, promoPrefix, classePrefix, archiPrefix } = require('../../config.json');

module.exports = {
	name: "role_eleve4",
	async execute(interaction) {
		const baseValue = "role_eleve5?"
		
        const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('role_plus')
					.setPlaceholder('Rôle')
					.setMinValues(1)
					.setMaxValues(14)
					.addOptions([
						{
							label: 'Ingé Archi',
							value: baseValue +archiPrefix+ 'Ingé Archi',
						},
						{
							label: 'Archi Ingé',
							value: baseValue +archiPrefix+ 'Archi Ingé',
						},
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
						}
					])
			)
		
		const text = 'Choisissez votre rôle supplémentaire:'
		const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle(roleSelectionHead)
            .setDescription(text)
		
			await interaction.update({ embeds: [embed], ephemeral: true, components: [row] })
	}
}