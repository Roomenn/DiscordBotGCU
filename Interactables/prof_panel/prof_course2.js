const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle  } = require('discord.js');
const { embedColor, coursPrefix } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "prof_course2",
	async execute(interaction) {
        const guild = interaction.guild
        const member = await guild.members.fetch(interaction.member.id)

        let params = []
        await interaction.values.forEach(value => {
            const [_, ...valueParams] = value.split("?")
            params.push(...valueParams)
        })
        
        
        params.forEach(async roleName => {
            RoleUtil.giveOrTakeRole(guild, member, coursPrefix + roleName)
        })
    

        const text = `Matières ajoutées/supprimées`

        const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle(text)

        await interaction.update({ embeds: [embed], ephemeral: true, components: [] })
	},
};