const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require('discord.js');
const { embedColor, roleSelectionHead, classePrefix } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_eleve2",
	async execute(interaction) {

		const promo = interaction.values[0].split("?")[1]

		prefix = classePrefix
        componentOptions = []
        roles = await RoleUtil.getRoleListFromString(interaction.guild, prefix + promo.charAt(0))
        roles.forEach(role =>{
			if (componentOptions.length < 24) {
				const classe = role.name.replace(prefix, '')
				componentOptions.push(
					{
						label: classe,
						value: "role_eleve3?" + promo + "?" + classe
					})
			}
        })

		const text = ":small_blue_diamond::small_blue_diamond: :arrow_forward: Choisissez votre **groupe classe**:"
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