const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: "role_5GCU",
	async execute(interaction) {
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('role')
					.setPlaceholder('Groupe classe')
					.addOptions([
						{
							label: 'Groupe GU',
							value: 'role_give-Élève-5GCU-5GU',
						},
						{
							label: 'Groupe TP',
							value: 'role_give-Élève-5GCU-5TP',
						},
                        {
							label: 'Groupe BAT',
							value: 'role_give-Élève-5GCU-5BAT',
						},
					]),
			);

		await interaction.update({ content: ':small_blue_diamond::small_blue_diamond: :arrow_forward: Choisissez votre **groupe classe**:', ephemeral: true , components: [row] });
	},
};