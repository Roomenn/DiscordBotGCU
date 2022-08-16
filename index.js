const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js")

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember } = Partials 

const { loadEvents } = require("./Handlers/eventHandler")
const { loadCommands } = require("./Handlers/commandHandler")
const { loadInteracts } = require("./Handlers/interactsHandler")

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages], 
	partials: [User, Message, GuildMember, ThreadMember],
})

client.commands = new Collection()
client.interacts = new Collection();

client.configdev = require("./configdev.json")
client.config = require("./config.json")

client
	.login(client.configdev.token)
	.then(() => {
		loadEvents(client)
		loadCommands(client)
		loadInteracts(client)
	})
	.catch((err) => console.log(err))