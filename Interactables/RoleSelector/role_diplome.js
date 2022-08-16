const { EmbedBuilder } = require('discord.js');
const { embedColor, roleSelectionHead, diplomeId } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_diplome",
	async execute(interaction) {
        const guild = interaction.guild
        const member = await guild.members.fetch(interaction.member.id)
        await RoleUtil.setRole(guild, member, diplomeId)
        
        const text = 
`**Configuration Terminée !** 🎉

Bienvenue chez les diplomés ! Tu as accès à:
▫️ Un salon entre diplomés:
<#753582473954197565> 

▫️ Un salon d'échange avec les promos actuelles:
<#753582862099284018> 

▫️ Un salon d'échange avec les professeurs:
<#753628529324851331> 

▫️ Les salons d'offres de stage:
<#786640880420782130> `

		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(roleSelectionHead)
			.setDescription(text)
            .setImage('https://c.tenor.com/f3S2EIKz1XIAAAAC/peach-and.gif')

        await interaction.update({ embeds: [embed], ephemeral: true, components: [] })
		},
};