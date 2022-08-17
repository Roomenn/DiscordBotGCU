const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")
const { embedColor } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("prof_panel")
		.setDescription("Créer un panel professeur multifonction")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
		
        /**
		 * @param {CommandInteraction} interaction
		 */
		execute(interaction) {

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('course_channel')
                    .setLabel('Salle de cours')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("📚"),
                new ButtonBuilder()
                    .setCustomId('prof_course?0?new')
                    .setLabel('Rôles')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("🎓"),
                new ButtonBuilder()
                    .setCustomId('prof_new_course')
                    .setLabel('Matière')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("🆕"))

            const text = `Choisissez l'option à executer:
            📚┃ Créer une nouvelle salle de cours
            🎓┃ Accèder aux salons d'une autre matière
            🆕┃ Ajouter une nouvelle matière d'enseignement`
            const text2 = `Pour retirer des rôles existants, re-sélectionnez les dans le menu 🎓.`

            const embed = new EmbedBuilder()
                .setColor(embedColor)
                .setTitle("Panneau de commandes")
                .setDescription(text)
                .addFields(
                    { name: '\u200B',value: text2 })

            interaction.channel.send({ embeds: [embed], components: [row] })
            interaction.reply({content: "Done!", ephemeral: true})
		}
    }