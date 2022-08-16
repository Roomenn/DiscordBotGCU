const { EmbedBuilder } = require('discord.js');
const { embedColor, roleSelectionHead, insaId } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_insa",
	async execute(interaction) {
        const guild = interaction.guild
        const member = await guild.members.fetch(interaction.member.id)
        await RoleUtil.setRole(guild, member, insaId)

        const text = 
`**Configuration Terminée !** 🎉

Bienvenue chez les insaliens ! Tu as accès à:
▫️ Un salon d'orientation:
<#887980530107310111> 

▫️ Un salon d'échange avec les promos actuelles:
<#887980230273269810> 

▫️ Les salons d'offres de stage:
<#786640880420782130> `

		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(roleSelectionHead)
			.setDescription(text)
            .setImage('https://c.tenor.com/49QgyeeMDG0AAAAC/first-day-construction-worker.gif')

        await interaction.update({ embeds: [embed], ephemeral: true, components: [] })
		},
};