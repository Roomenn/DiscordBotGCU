const { EmbedBuilder } = require('discord.js');
const { embedColor, roleSelectionHead } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_prof2",
	async execute(interaction) {
        const guild = interaction.guild
        const member = await guild.members.fetch(interaction.member.id)

        let params = ["Professeur"]
        interaction.values.forEach(value => {
            const [_, ...valueParams] = value.split("?");
            params.push(...valueParams)
        });

        await RoleUtil.setRoleList(guild, member, params)

        const text = 
`**Configuration Terminée !** 🎉

Bienvenue dans l'espace Professeur ! Vous avez accès à:
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
            .setImage('https://c.tenor.com/UwbYxIzEPpwAAAAC/teach-you-yoda.gif')

        await interaction.update({ embeds: [embed], ephemeral: true, components: [] })
		},
};