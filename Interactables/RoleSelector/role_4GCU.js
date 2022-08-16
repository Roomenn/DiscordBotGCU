const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: "role_4GCU",
	async execute(interaction) {
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('role')
					.setPlaceholder('Groupe classe')
					.addOptions([
						{
							label: 'Groupe A',
							value: 'role_give-Élève-4GCU-4A',
						},
						{
							label: 'Groupe B',
							value: 'role_give-Élève-4GCU-4B',
						},
                        {
							label: 'Groupe C',
							value: 'role_give-Élève-4GCU-4C',
						},
					]),
			);

		await interaction.update({ content: ':small_blue_diamond::small_blue_diamond: :arrow_forward: Choisissez votre **groupe classe**:', ephemeral: true , components: [row] });
	},
};