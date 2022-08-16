const { helperId } = require('../config.json');
class RoleUtil {

    static async giveRole(guild, member, roleName) {
        let role = guild.roles.cache.find(role => role.name === roleName)

        if (!role)
            return console.log("Role not Found: " + roleName)
        
        await member.roles.add(role)
    }

    static async giveRoleId(guild, member, roleId) {
        let role = guild.roles.cache.find(role => role.id === roleId)

        if (!role)
            return console.log("Role not Found: " + roleId)
        
        await member.roles.add(role)
    }

    static async giveOrTakeRole(guild, member, roleName) {
        let role = guild.roles.cache.find(role => role.name === roleName)

        if (!role)
            return console.log("Role not Found: " + roleName)
        
        if (member.roles.cache.has(role.id)){
            await member.roles.remove(role.id)
        } else {
            await member.roles.add(role)
        }
    }

    static async giveRoleList(guild, member, roleNameList) {
        roleNameList.forEach(async roleName => {
            const role = await guild.roles.cache.find(role => role.name.includes(roleName))
            if (role && role.id != helperId)
                await member.roles.add(role)
        })
    }

    static async removeRole(guild, member, roleName) {
        let role = guild.roles.cache.find(role => role.name === roleName)

        if (!role)
            return console.log("Role not Found: " + roleName)
        
        if (member.roles.cache.has(role.id))
            member.roles.remove(role.id)
    }

    static async removeRolesFromList(guild, member, list) {
        for (const roleName of list) {
            this.removeRole(guild, member, roleName)
        }
    }

    static async removeAllRole(guild, member) {
        if (await member.roles.cache.has(helperId)) {
            const role = await guild.roles.cache.find(role => role.id === helperId)
            member.roles.set([role])
        } else {
            member.roles.set([])
        }
        return member
    }

    static async setRole(guild, member, roleId) {
        if (roleId == helperId) return
        
        const role = await guild.roles.cache.find(role => role.id === roleId)

        if (await member.roles.cache.has(helperId)) {
            const helper = await guild.roles.cache.find(role => role.id === helperId)
            member.roles.set([helper, role])
        } else {
            member.roles.set([role])
        }
    }

    static async setRoleList(guild, member, roleNameList) {
        const roleList = []
        roleNameList.forEach(async roleName => {
            const role = await guild.roles.cache.find(role => role.name.includes(roleName))
            if (role && role.id != helperId)
                roleList.push(role)
        });
        
        if (await member.roles.cache.has(helperId)) {
            const helper = await guild.roles.cache.find(role => role.id === helperId)
            roleList.push(helper)
            member.roles.set(roleList)

        } else {
            member.roles.set(roleList)
        }
    }

    static async getRoleListFromString(guild, prefix) {
        let list = []
        guild.roles.cache.forEach(async role => {
			if (role.name.includes(prefix)) {
				list.push(role)
			}
        });
        return list
    }

    static async hasRole(guild, member, roleName) {
        const role = await guild.roles.cache.find(role => role.name === roleName)

        if (!role)
            return false
        
        return member.roles.cache.has(role.id)
    }

}

module.exports = RoleUtil;