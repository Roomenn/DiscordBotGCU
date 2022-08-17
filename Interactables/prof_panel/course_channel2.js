const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');
const { embedColor, coursPageValue, coursPrefix } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "course_channel2",
	async execute(interaction) {
		const maxValues = coursPageValue
        prefix = coursPrefix
		
		let paramsValue = ""
		let page

		let params = []
		if (interaction.isButton()) {
            const [_, n, ...valueParams] = interaction.customId.split("?")
	        page = n
            params.push(...valueParams)
        } else if (interaction.isSelectMenu()) {
			await interaction.values.forEach(value => {
				const [_, n, ...valueParams] = value.split("?")
				page = n
				params.push(...valueParams)
			})
        }
        

		params.forEach(async roleName => {
			paramsValue += "?" + roleName
		})

        componentOptions = []
        roles = await RoleUtil.getRoleListFromString(interaction.guild, prefix)

        if (page*maxValues > roles.length) page = 0
        let pageRoles = roles.splice(page*maxValues, maxValues)
        
        pageRoles.forEach(role =>{
            componentOptions.unshift(
                {
                    label: role.name.replace(prefix, ''),
                    value: "course_channel3"+ paramsValue +"?"+ role.name
                }
		)})
		
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('cours')
					.setPlaceholder("Matière")
					.addOptions(componentOptions))
		
		pageButtons = []
		if (page > 0) {
			pageButtons.push(
			new ButtonBuilder()
				.setCustomId("course_channel2?" + (parseInt(page)-1) + paramsValue)
				.setLabel('‎')
				.setStyle(ButtonStyle.Secondary)
				.setEmoji("◀️")
			)}

		if (page*maxValues < roles.length) {
			pageButtons.push(
			new ButtonBuilder()
				.setCustomId("course_channel2?" + (parseInt(page)+1) + paramsValue)
				.setLabel('‎')
				.setStyle(ButtonStyle.Secondary)
				.setEmoji("▶️")
			)}
			
		const buttons = new ActionRowBuilder()
			.addComponents(pageButtons)

		const text = `Choisissez la matière concernée`
		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle("Création d'une salle de cours")
			.setDescription(text)

        await interaction.update({ embeds: [embed], ephemeral: true , components: [row, buttons] })
	}
}