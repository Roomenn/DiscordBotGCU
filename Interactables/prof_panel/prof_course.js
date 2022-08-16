const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { embedColor, roleSelectionHead, coursPageValue, coursPrefix } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "prof_course",
	async execute(interaction) {
        const maxValues = coursPageValue
        prefix = coursPrefix
        
        let page = interaction.customId.split("?")[1]
        const newEphemeral = (interaction.customId.split("?").length > 2) ? true : false

        componentOptions = []
        roles = await RoleUtil.getRoleListFromString(interaction.guild, prefix)

        if (page*maxValues > roles.length) page = 0
        let pageRoles = roles.splice(page*maxValues, maxValues)
        
        pageRoles.forEach(role =>{
            const name = role.name.replace(prefix, '')
            componentOptions.unshift(
                {
                    label: name,
                    value: "prof_course2?" + name
                })
        })

		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('cours')
					.setPlaceholder("Rien de sélectionné")
					.setMinValues(1)
					.setMaxValues(componentOptions.length)
					.addOptions(componentOptions))

        pageButtons = []
        if (page > 0) {
            pageButtons.push(
            new ButtonBuilder()
                .setCustomId('prof_course?' + (parseInt(page)-1))
                .setLabel('‎')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("◀️")
            )}

        if (page*maxValues < roles.length) {
            pageButtons.push(
            new ButtonBuilder()
                .setCustomId('prof_course?' + (parseInt(page)+1))
                .setLabel('‎')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("▶️")
            )}

        const buttons = new ActionRowBuilder()
            .addComponents(pageButtons)

		const text = `Choisissez vos matières enseignées pour les ajouter (ou les retirer)`
		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(roleSelectionHead)
			.setDescription(text)

        if (newEphemeral) {
            await interaction.reply({ embeds: [embed], ephemeral: true , components: [row, buttons] })
        } else {
            await interaction.update({ embeds: [embed], ephemeral: true , components: [row, buttons] })
        }
	}
}