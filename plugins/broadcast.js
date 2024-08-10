/*
 * Script By Kemii
 * Forbidden to share and delete my wm
 * Facebook : kemii.houkii
 * Github : dcodekemii
 * Telegram : t.me/dcodekemi
 * Breach : Kemii
 * WhatsApp : wa.me/628816609112
 */

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`• *Example :* ${usedPrefix + command} Hello World!`)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    
    let kemii = Object.keys(global.db.data.users).filter(key => {
    let jid = global.db.data.users[key].jid
    return jid && !jid.endsWith('@g.us')
    })
    await conn.reply(m.chat, `Mengirim broadcast ke ${Func.formatter(kemii.length)} chats.`, m)
    let sleep = time => new Promise(res => setTimeout(res, time))
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ""

    if (!mime) {
        for (let i of kemii) {
            await conn.reply(i, text, fverif)
            await sleep(1500)
        }
    } else {
        let media = await q.download()
        let link = await upload(media)

        for (let i of kemii) {
            await conn.sendFile(i, link, '', text, null)
            await sleep(1500)
        }
    }

    await m.reply(`Berhasil mengirim ke ${Func.formatter(kemii.length)} chats.`)
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})
}

handler.help = ['broadcast', 'bc'].map(v => v + ' *<teks>*')
handler.tags = ['owner']
handler.command = /^(broadcast|bc|bcs)$/i
handler.owner = true

module.exports = handler