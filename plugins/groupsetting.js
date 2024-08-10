let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = { // Switch Case Like :v
        'Open': 'not_announcement',
        'Close': 'announcement',
        'Unlock': 'unlocked',
        'Lock': 'locked',
    }[(args[0] || '')]
    if (isClose === undefined)
        return conn.sendPoll(m.chat, `PILIH POLLING BERIKUT`, [`${command.charAt(0).toUpperCase()+command.slice(1)} Open`,'Settings Close','Settings Lock','Settings Unlock'], m)        
    await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['group *open / close*']
handler.tags = ['group']
handler.command = /^(group|settings)$/i

handler.admin = true
handler.botAdmin = true

module.exports = handler;