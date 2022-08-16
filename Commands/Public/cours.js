const { SlashCommandBuilder } = require('@discordjs/builders');
const { cat3Id, cat4Id, cat5Id, promoPrefix, classePrefix } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cours')
		.setDescription('Salon de cours')
		.addSubcommand(subcommand =>
			subcommand
				.setName('creer')
				.setDescription('Créer un nouveau salon')
				.addRoleOption(option =>
					option.setName('élèves')
						.setDescription('promotion ou classe')
						.setRequired(true))
				.addRoleOption(option =>
					option.setName('matière')
						.setDescription('Matière')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('bot')
				.setDescription('ajoute un bot au salon')
				.addChannelOption(option =>
					option.setName('channel')
						.setDescription('#nom-du-salon')
						.setRequired(true))
				.addUserOption(option =>
					option.setName('bot')
						.setDescription('@nom-du-bot')
						.setRequired(true))),
	
	async execute(interaction) {
		
        if (interaction.options.getSubcommand() === 'creer') {
			const group = interaction.options.getRole('élèves')
			const lesson = interaction.options.getRole('matière')

			var channelName = ""
			var categoryId = ""
			switch (group.name) {
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
			channelName += lesson.name

			interaction.guild.channels
				.create(channelName, {
					type: "GUILD_TEXT",
					//parent_id: '689870316713148451',
					permissionOverwrites: [
						{
						  	id: group.id,
						  	allow: ['VIEW_CHANNEL'],
						},
						{
							id: lesson.id,
							allow: ['VIEW_CHANNEL'],
						  },
					  ],
				})
			    .then((channel => {
				  	channel.setParent(categoryId)
					channel.permissionOverwrites.set([
						{
							id: group.id,
							allow: [Permissions.FLAGS.VIEW_CHANNEL],
						},
						{
							id: lesson.id,
							allow: [Permissions.FLAGS.VIEW_CHANNEL],
						},
						{
							id: channel.guild.roles.everyone,
							deny: [Permissions.FLAGS.VIEW_CHANNEL],
						},
					],);
					interaction.reply({ content: ':arrow_forward: Salon de cours créé ' + channel.toString() , ephemeral: true})
			  	}))
			  
		} else if (interaction.options.getSubcommand() === 'bot') {
			const channel = interaction.options.getChannel('channel');
			const bot = interaction.options.getUser('bot');

			channel.permissionOverwrites.create(bot, { VIEW_CHANNEL: true });
		}

	},
};