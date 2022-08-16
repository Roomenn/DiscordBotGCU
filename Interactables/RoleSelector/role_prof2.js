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
`**Configuration Terminée !** 🎓

Bienvenue dans l'espace Professeur ! Vous avez accès à:
▫️ Un salon d'annonce par promotion :
<#753597015111499847> 
<#753597181079846982> 
<#753597201384603738> 

▫️ Un salon d'information:
<#689852901887181045> 

▫️ Un salon d'aide technique:
<#753626186776576030> 

▫️ Un salon d'offres de stage:
<#786640880420782130> 

▫️ Un salon d'échange avec les diplomés:
<#753628529324851331> `

		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(roleSelectionHead)
			.setDescription(text)
            .setImage('https://c.tenor.com/UwbYxIzEPpwAAAAC/teach-you-yoda.gif')

        await interaction.update({ embeds: [embed], ephemeral: true, components: [] })
		}
};