const { EmbedBuilder, userMention, channelMention, ChannelType, PermissionsBitField } = require('discord.js');
const { embedColor, promoPrefix, classePrefix, botId, cat3Id, cat4Id, cat5Id } = require('../../config.json');
const RoleUtil = require('../../Utils/RoleUtil.js');

module.exports = {
	name: "course_channel3",
	async execute(interaction) {
		const guild = interaction.guild
		const [_, ...groups] = interaction.values[0].split("?")
		
		roleList = await RoleUtil.getRoleListFromNames(guild, groups)
		roleList.push(await guild.roles.cache.find(role => role.id === botId))

		const lesson = groups.pop()
		
		var channelName = ""
		var categoryId = ""
		
		const group = groups[0]
		switch (group) {
			case promoPrefix + "3GCU":
				channelName += "👥-3-gcu-"
				categoryId = cat3Id
				break;
			case promoPrefix + "4GCU":
				channelName += "👥-4-gcu-"
				categoryId = cat4Id
				break;
			case promoPrefix + "5GCU":
				channelName += "👥-5-gcu-"
				categoryId = cat5Id
				break
			case classePrefix + "3A":
				channelName += "👷-3-a-"
				categoryId = cat3Id
				break
			case classePrefix + "3B":
				channelName += "👷-3-b-"
				categoryId = cat3Id
				break
			case classePrefix + "3C":
				channelName += "👷-3-c-"
				categoryId = cat3Id
				break
			case classePrefix + "4A":
				channelName += "👷-4-a-"
				categoryId = cat4Id
				break
			case classePrefix + "4B":
				channelName += "👷-4-b-"
				categoryId = cat4Id
				break
			case classePrefix + "4C":
				channelName += "👷-4-c-"
				categoryId = cat4Id
				break
			case classePrefix + "5GU":
				channelName += "👷-5-gu-"
				categoryId = cat5Id
				break
			case classePrefix + "5TP":
				channelName += "👷-5-tp-"
				categoryId = cat5Id
				break
			case classePrefix + "5BAT":
				channelName += "👷-5-bat-"
				categoryId = cat5Id
				break
			default:
				return
		}
		if (groups.length > 1) {channelName = "👷-commun-"}
		
		channelName += lesson.split("┃")[1]

		guild.channels.create({
				name: channelName,
				type: ChannelType.GuildText,
				permissionOverwrites: [
					{
						id: interaction.guild.id,
						deny: [PermissionsBitField.Flags.ViewChannel],
					}
				]
		})
		.then(async channel => {
			channel.setParent(categoryId)
			
			permissionList = await this.getPermissions(guild, roleList)
			channel.permissionOverwrites.set(permissionList)
		
			const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle("Création d'une salle de cours")
            .setDescription("Salon créé: " + channelMention(channel.id))
        
        	await interaction.update({ embeds: [embed], ephemeral: true, components: []});
		})
	},

	async getPermissions(guild, roleList) {
		list = []
		roleList.forEach(role => {
			list.push({
				id: role.id,
				allow: [PermissionsBitField.Flags.ViewChannel],
			},)
		})

		list.push(
			{
				id: guild.roles.everyone,
				deny: [PermissionsBitField.Flags.ViewChannel],
			},
		)
		
		return list
	}
}