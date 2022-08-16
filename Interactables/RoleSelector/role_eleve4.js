const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder  } = require('discord.js');
const { embedColor, roleSelectionHead } = require('../../config.json');

module.exports = {
	name: "role_eleve4",
	async execute(interaction) {
		const baseValue = "role_eleve3?GIVE?"
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
							value: baseValue + 'Ingé Archi',
						},
						{
							label: 'Archi Ingé',
							value: baseValue + 'Archi Ingé',
						},
						{
							label: '3 GCU',
							value: baseValue + '3GCU',
						},
						{
							label: 'Groupe 3A',
							value: baseValue + '3A',
						},
						{
							label: 'Groupe 3B',
							value: baseValue + '3B',
						},
                        {
							label: 'Groupe 3C',
							value: baseValue + '3C',
						},
						{
							label: '4 GCU',
							value: baseValue + '4GCU',
						},
                        {
							label: 'Groupe 4A',
							value: baseValue + '4A',
						},
						{
							label: 'Groupe 4B',
							value: baseValue + '4B',
						},
                        {
							label: 'Groupe 4C',
							value: baseValue + '4C',
						},
                        {
							label: '5 GCU',
							value: baseValue + '5GCU',
						},
                        {
							label: 'Groupe 5GU',
							value: baseValue + '5GU',
						},
						{
							label: 'Groupe 5TP',
							value: baseValue + '5TP',
						},
                        {
							label: 'Groupe 5BAT',
							value: baseValue + '5BAT',
						},
					]),
			);
		
		const text = 'Choisissez votre rôle supplémentaire:'
		const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle(roleSelectionHead)
            .setDescription(text)
		
			await interaction.update({ embeds: [embed], ephemeral: true, components: [row] })
	},
};