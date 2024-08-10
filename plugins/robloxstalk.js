// Kemii Cantik
// Min, 2 Jun - 03.53

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} dcodekemii`, m)
	await m.react('🕒')
	let kemii = await robloxInfo(text)
	let hasil = await kemii.userDetails
	let teks = 'Roblox Stalk\n\n'
	teks += '```Name:```' + ` ${hasil.displayName}\n`
	teks += '```Username:```' + ` ${hasil.name}\n`
	teks += '```isBanned:```' + ` ${hasil.isBanned}\n`
	teks += '```Verifed:```' + ` ${hasil.hasVerifiedBadge}\n`
	teks += '```ID:```' + ` ${hasil.id}\n`
	teks += '```Created:```' + ` ${hasil.created}\n`
	teks += '```LastOnline:```' + ` ${kemii.lastOnline}\n`
	teks += '```Desc:```' + ` ${hasil.description}`
	await conn.sendFile(m.chat, kemii.profileDetails, '', teks, m)
}
handler.help = ['robloxstalk *<text>*']
handler.tags = ['stalking']
handler.command = /^(robloxstalk|rbstalk)$/i
handler.limit = true
handler.register = true
module.exports = handler

async function robloxInfo(name) {
    try {
        const fetchJson = async function (url, options) {
            return (await fetch(url, options)).json();
        };

        const getUsernameData = async function () {
            return fetchJson("https://users.roblox.com/v1/usernames/users", {
                method: "POST",
                body: JSON.stringify({ "usernames": [name] }),
                headers: { "Content-Type": "application/json" }
            });
        };

        const getUserData = async function (id) {
            return fetchJson("https://users.roblox.com/v1/users/" + id);
        };
        
        const getProfile = async function (id) {
            return fetchJson("https://thumbnails.roblox.com/v1/users/avatar?userIds=" + id + "&size=720x720&format=Png&isCircular=false");
        };

        const getPresenceData = async function (id) {
            return fetchJson("https://presence.roblox.com/v1/presence/users", {
                method: "POST",
                body: JSON.stringify({ "userIds": [parseInt(id)] }),
                headers: { "Content-Type": "application/json" }
            });
        };

        const { data } = await getUsernameData();
        const id = data[0].id;

        const userDetails = await getUserData(id);
        
        const profileDetails = (await getProfile(id)).data[0].imageUrl;
        
        const lastOnline = (await getPresenceData(id)).userPresences[0].lastOnline;

        return { userDetails, lastOnline, profileDetails};
    } catch (error) {
        console.error(error);
    }
};