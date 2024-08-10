let handler = async(m, { conn, usedPrefix, command, }) => {
let kemii = await conn.authState.creds
let text = '```Session Creds```' + '```' + ` (${kemii.me.name}) :` + '```\n\n'
text += `> _Pairing: ${kemii.pairingCode}_\n`
text += `> _Name: ${kemii.me.name}_\n`
text += `> _Platform: ${kemii.platform}_\n`
text += `> _ID: ${kemii.registrationId}_\n`
text += `> _Device: ${kemii.deviceId}_\n\n`
text += '`Powered By ICSF Team`'
await conn.reply(m.chat, text, m)
}
handler.command = ["creds"]
handler.tags = ["owner"]
handler.help = ["creds"]
handler.owner = true

module.exports = handler