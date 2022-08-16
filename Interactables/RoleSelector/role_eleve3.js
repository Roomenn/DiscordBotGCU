const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle  } = require('discord.js');
const { embedColor, roleSelectionHead } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_eleve3",
	async execute(interaction) {
        const guild = interaction.guild
        const member = await guild.members.fetch(interaction.member.id)
        let giveOnly = false

        let params = ["Élève"]
        await interaction.values.forEach(value => {
            const [_, ...valueParams] = value.split("?")
            if (valueParams[0] === "GIVE") {
                giveOnly = true
                valueParams.splice(0, 1)
            }
            params.push(...valueParams)
        })
        
        giveOnly ? RoleUtil.giveRoleList(guild, member, params) : RoleUtil.setRoleList(guild, member, params)
        

        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('role_eleve4')
					.setLabel('Rôle supplémentaire')
					.setStyle(ButtonStyle.Secondary),
			);

            const text = `**Configuration Terminée !** :tada:

:white_small_square: Si tu es dans un cas particulier, tu peux choisir un rôle supplémentaire:`

        const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle(roleSelectionHead)
            .setDescription(text)
            .setImage('https://c.tenor.com/o--Suf5Ju3UAAAAC/dance-minero-dancing.gif')

        await interaction.update({ embeds: [embed], ephemeral: true, components: [row] })
	},
};