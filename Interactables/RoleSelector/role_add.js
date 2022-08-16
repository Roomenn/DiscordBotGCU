const { MessageActionRow, MessageButton } = require('discord.js');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "role_add",
	async execute(interaction) {
        if (!interaction.guild) {
            return interaction.reply({content: "This command can only be used in a guild!", ephemeral: true})
        }

        const member = await interaction.guild.members.fetch(interaction.member.id)
        RoleUtil.giveOrTakeRole(interaction.guild, member, interaction.values[0].split("-")[1])
        
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('role_plus')
					.setLabel('Role supplémentaire')
					.setStyle('SECONDARY'),
			);

            const text = `**Configuration Terminée !** :tada:
https://tenor.com/view/jeremy-clarkson-hard-hat-train-gif-22782744

Si vous êtes dans un cas particulier, vous pouvez choisir un rôle supplémentaire:`

        await interaction.update({ content: text, ephemeral: true, components: [row] });
	},
};