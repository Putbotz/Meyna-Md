let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
let input = `• *Example :* ${usedPrefix + command} 123.456.789.0`
	if (!text) return m.reply(input)

    getIPInfo(text).then(ipInfo => {
 if (ipInfo) {
 const ip = `*Ip:* ${ipInfo.ip}
*Hostname*: ${ipInfo.hostname}
*City*: ${ipInfo.city}
*Region*: ${ipInfo.region}
*Country*: ${ipInfo.country}
*Loc*: ${ipInfo.loc}
*Org*: ${ipInfo.org}
*Postal*: ${ipInfo.postal}
*Timezone:* ${ipInfo.timezone}
  
*Location:* ${ipInfo.loc}
*Coordinates:* ${ipInfo.loc}`
m.reply(ip)
    }
})
}
handler.help = ['trackip']
handler.tags = ['hengker']
handler.command = /^(trackip|getipinfo)$/i
handler.premium = true
handler.limit = true

module.exports = handler

let ipinfoToken = '882ffefc502ce1';
async function getIPInfo(ip) {
    const response = await axios.get(`http://ipinfo.io/${ip}/json?token=${ipinfoToken}`);
    return response.data;
}