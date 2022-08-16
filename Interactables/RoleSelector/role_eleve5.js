const { EmbedBuilder  } = require('discord.js');
const { embedColor, roleSelectionHead } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_eleve5",
	async execute(interaction) {
        const guild = interaction.guild
        const member = await guild.members.fetch(interaction.member.id)

        let params = []
        await interaction.values.forEach(value => {
            const [_, ...valueParams] = value.split("?")
            params.push(...valueParams)
        })
        
        RoleUtil.giveRoleList(guild, member, params)

        const text = `**Configuration Terminée !** :tada:`

        const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle(roleSelectionHead)
            .setDescription(text)

        await interaction.update({ embeds: [embed], ephemeral: true, components: [] })
	},
};