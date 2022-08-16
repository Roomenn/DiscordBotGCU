const { EmbedBuilder } = require('discord.js');
const { embedColor, roleSelectionHead, proId } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_professionel",
	async execute(interaction) {
        const guild = interaction.guild
        const member = await guild.members.fetch(interaction.member.id)
        await RoleUtil.setRole(guild, member, proId)
        
        const text = 
`**Configuration Terminée.**

Bienvenue dans l'espace professionel. Vous avez accès à:
▫️ Un salon d'offres de stage:
<#786640880420782130> 

▫️ Un salon d'échange sur les sujets de stages:
<#753593207157293056> `

		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(roleSelectionHead)
			.setDescription(text)

        await interaction.update({ embeds: [embed], ephemeral: true, components: [] })
		},
};