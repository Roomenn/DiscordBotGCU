const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle  } = require('discord.js');
const { embedColor, roleSelectionHead } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_eleve3",
	async execute(interaction) {
        const guild = interaction.guild
        const member = await guild.members.fetch(interaction.member.id)

        let params = []
        await interaction.values.forEach(value => {
            const [_, ...valueParams] = value.split("?")
            params.push(...valueParams)
        })
        
        RoleUtil.setRoleList(guild, member, params)
        

        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('role_eleve4')
					.setLabel('Rôle supplémentaire')
					.setStyle(ButtonStyle.Secondary),
			);

        const text = `**Configuration Terminée !** :tada:

:white_small_square: Si tu es dans un cas particulier, tu peux choisir des rôles supplémentaires:`

        const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle(roleSelectionHead)
            .setDescription(text)
            .setImage('https://c.tenor.com/o--Suf5Ju3UAAAAC/dance-minero-dancing.gif')

        await interaction.update({ embeds: [embed], ephemeral: true, components: [row] })
	},
};