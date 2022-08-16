const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require('discord.js');
const { embedColor, roleSelectionHead, promoPrefix } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_eleve",
	async execute(interaction) {

		prefix = promoPrefix
        componentOptions = []
        roles = await RoleUtil.getRoleListFromString(interaction.guild, prefix)
        roles.forEach(role =>{
			if (componentOptions.length < 24) {
				const name = role.name.replace(prefix, '')
				componentOptions.push(
					{
						label: name,
						value: "role_eleve2?" + name
					})
			}
        })

		const text = ":small_blue_diamond::arrow_forward: Choisissez votre **promotion**:"
        const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('promo')
					.setPlaceholder("Rien de sélectionné")
					.addOptions(componentOptions))

		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(roleSelectionHead)
			.setDescription(text)

		await interaction.update({ embeds: [embed], ephemeral: true , components: [row] })
	}
};