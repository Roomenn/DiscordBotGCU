const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle  } = require('discord.js')

module.exports = {
	name: "prof_new_course",
	async execute(interaction) {

        const modal = new ModalBuilder()
			.setCustomId('prof_new_course2')
			.setTitle('Ajouter une nouvelle Matière')
            .addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('course')
                            .setLabel("Matière enseignée:")
                            .setStyle(TextInputStyle.Short)
                    )
            )

		await interaction.showModal(modal);
	},
};