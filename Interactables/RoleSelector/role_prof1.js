const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require('discord.js');
const { embedColor, roleSelectionHead, coursPrefix } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_prof1",
	async execute(interaction) {

		prefix = coursPrefix
        componentOptions = []
        roles = await RoleUtil.getRoleListFromString(interaction.guild, prefix)
        roles.forEach(role =>{
			if (componentOptions.length < 24) {
				const name = role.name.replace(prefix, '')
				componentOptions.push(
					{
						label: name,
						value: "role_prof2?" + name
					})
			}
        })

		componentOptions.push(
			{
				label: 'Aucune Matière',
				description: "Ne sélectionner que celle-ci",
				value: "role_prof2"
			})
		

		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('cours')
					.setPlaceholder("Rien de sélectionné")
					.setMinValues(1)
					.setMaxValues(componentOptions.length)
					.addOptions(componentOptions))
		
		const text = `:small_blue_diamond::arrow_forward: Choisissez vos matières enseignées:
(Si une matière manque à la liste, vous pourrez la créer ou l'ajouter plus tard)`
		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(roleSelectionHead)
			.setDescription(text)

        await interaction.update({ embeds: [embed], ephemeral: true , components: [row] })

		},
};