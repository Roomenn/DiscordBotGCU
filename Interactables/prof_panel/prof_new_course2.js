const { EmbedBuilder, roleMention } = require('discord.js')
const { embedColor, coursPrefix } = require('../../config.json')
const RoleUtil = require('../../Utils/RoleUtil.js')

module.exports = {
	name: "prof_new_course2",
	async execute(interaction) {

        const guild = interaction.guild
        const courseName = interaction.fields.getTextInputValue('course');
        const prefix = coursPrefix
       
            
        await guild.roles.create({
            name: prefix + courseName,
            color: "#2ecc71"
        })
        .then(async (role) => {
            const member = await guild.members.fetch(interaction.member.id)
            member.roles.add(role)

            const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle("Nouvelle matière créée et ajoutée")
            .setDescription(roleMention(role.id))
        
        await interaction.reply({ embeds: [embed], ephemeral: true, components: []});
        })
	}
};