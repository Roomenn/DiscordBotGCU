const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { embedColor, graduationIsDev } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('graduate')
		.setDescription('Passe tous les élèves à l\'année supérieure (Irréversible)')
		.addBooleanOption(option => option.setName('confirmation').setDescription('Confirmation')),
	
	async execute(interaction) {
        const guild = interaction.guild
		const boolean = interaction.options.getBoolean('confirmation');
		
		if (boolean) {
			const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('graduate1')
					.setLabel('Confirmer')
					.setStyle(ButtonStyle.Danger),
			);

			text = graduationIsDev ? "Version DEV: True" : "Version DEV: False"

			const embed = new EmbedBuilder()
				.setColor(embedColor)
				.setTitle("Fonction de passage à l'année supérieure")
				.setDescription(text)

			await interaction.reply({ embeds: [embed], components: [row] })
		} else {
			await interaction.reply({ content: "Interaction Dangereuse", ephemeral: true})
		}
	}
}