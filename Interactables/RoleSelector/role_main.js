const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require('discord.js');
const { embedColor, roleSelectionHead } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_main",
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('role')
					.setPlaceholder('Sélectionne un Rôle')
					.addOptions([
						{
							label: 'Élève',
							description: 'Accèder aux espaces de cours et d\'échanges',
							value: 'role_eleve',
							emoji: "👷‍♀️",
						},
						{
							label: 'Professeur',
							description: 'Accèder aux cours par matière',
							value: 'role_prof1',
							emoji: "👨‍🏫",
						},
                        {
							label: 'Diplomé',
							description: 'Pour garder le contact',
							value: 'role_diplome',
							emoji: "📜",
						},
                        {
							label: 'Insalien non GCU',
							description: 'Renseigne toi sur la formation',
							value: 'role_insa',
							emoji: "👨‍🎓",
						},
						{
							label: 'Professionel',
							description: 'Échange avec les promotions',
							value: 'role_professionel',
							emoji: "🏗️",
						},
					]),
			);
		
		const text = ":arrow_forward: Choisissez votre **rôle**:"
		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(roleSelectionHead)
			.setDescription(text)

		await interaction.reply({ embeds: [embed], ephemeral: true , components: [row] });
	},
};