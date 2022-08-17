const { EmbedBuilder} = require('discord.js');
const { embedColor, diplomeId } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "graduate1",
	async execute(interaction) {
        const guild = interaction.guild

		let embed = new EmbedBuilder()
				.setColor(embedColor)
				.setTitle("Fonction de passage à l'année supérieure")
				.setDescription("- Suppression des rôles groupes classe...")

		await interaction.update({embeds: [embed], components: []})

		this.removeClasses(guild)
		.then( async nbClassRole => {

			embed = new EmbedBuilder()
				.setColor(embedColor)
				.setTitle("Fonction de passage à l'année supérieure")
				.setDescription("- Rôles groupes classe supprimés: " + nbClassRole + "\n- Promotion des 5GCU")
			
			await interaction.editReply({embeds: [embed]})

			this.promote5GCU(guild)
			.then( async nb5GCU => {

				embed = new EmbedBuilder()
				.setColor(embedColor)
				.setTitle("Fonction de passage à l'année supérieure")
				.setDescription("- Rôles groupes classe supprimés: " + nbClassRole 
								+ "\n- 5GCU diplomés: " + nb5GCU 
								+ "\n- Promotion des 4GCU")
			
				await interaction.editReply({embeds: [embed]})

				this.promote4GCU(guild)
				.then( async nb4GCU => {

					embed = new EmbedBuilder()
					.setColor(embedColor)
					.setTitle("Fonction de passage à l'année supérieure")
					.setDescription("- Rôles groupes classe supprimés: " + nbClassRole 
									+ "\n- 5GCU diplomés: " + nb5GCU 
									+ "\n- 4GCU promus: " + nb4GCU 
									+ "\n- Promotion des 3GCU")
				
					await interaction.editReply({embeds: [embed]})
	
					this.promote3GCU(guild)
					.then( async nb3GCU => {

						embed = new EmbedBuilder()
						.setColor(embedColor)
						.setTitle("Fonction de passage à l'année supérieure")
						.setDescription("- Rôles groupes classe supprimés: " + nbClassRole 
										+ "\n- 5GCU diplomés: " + nb5GCU 
										+ "\n- 4GCU promus: " + nb4GCU 
										+ "\n- 3GCU promus: " + nb3GCU 
										+ "\n\nLes rôles prendrons quelques minutes à être réattribuer.")
					
						await interaction.editReply({embeds: [embed]})
					})
				})
			})
		})
	},

	async removeClasses(guild) {
		const ID_3A = "753569888211173468"
		const ID_3B = "753569924206559313"
		const ID_3C = "753569949695606905"
		const ID_4A = "689841904615292957"
		const ID_4B = "689842101256716322"
		const ID_4C = "689842137843761179"
		const ID_5GU = "753569974726950952"
		const ID_5TP = "753570006742335519"
		const ID_5BAT = "753570058378280983"

		let n = 0

		n += parseInt(await RoleUtil.removeEveryRole(guild, ID_3A))
		n += parseInt(await RoleUtil.removeEveryRole(guild, ID_3B))
		n += parseInt(await RoleUtil.removeEveryRole(guild, ID_3C))
		n += parseInt(await RoleUtil.removeEveryRole(guild, ID_4A))
		n += parseInt(await RoleUtil.removeEveryRole(guild, ID_4B))
		n += parseInt(await RoleUtil.removeEveryRole(guild, ID_4C))
		n += parseInt(await RoleUtil.removeEveryRole(guild, ID_5GU))
		n += parseInt(await RoleUtil.removeEveryRole(guild, ID_5TP))
		n += parseInt(await RoleUtil.removeEveryRole(guild, ID_5BAT))

		return n
	},

	async promote5GCU(guild) {
		const ID_5GCU = "753569470903091201"
		const ID_ELEVE = "689841248756170834"

		const list = await RoleUtil.getMembers(guild, ID_5GCU)
		const diplome = await guild.roles.cache.find(role => role.id == diplomeId)
		list.forEach(async member => {
			member.roles.add(diplome)
			member.roles.remove(ID_5GCU)
			member.roles.remove(ID_ELEVE)
		})
		return list.length
	},

	async promote4GCU(guild) {
		const ID_4GCU = "753569435045986395"
		const ID_5GCU = "753569470903091201"

		const list = await RoleUtil.getMembers(guild, ID_4GCU)
		const role = await guild.roles.cache.find(role => role.id == ID_5GCU)
		list.forEach(async member => {
			member.roles.add(role)
			member.roles.remove(ID_4GCU)
		})
		return list.length
	},

	async promote3GCU(guild) {
		const ID_3GCU = "753568848141090868"
		const ID_4GCU = "753569435045986395"

		const list = await RoleUtil.getMembers(guild, ID_3GCU)
		const role = await guild.roles.cache.find(role => role.id == ID_4GCU)
		list.forEach(async member => {
			member.roles.add(role)
			member.roles.remove(ID_3GCU)
		})
		return list.length
	}
}