let handler = async(m, { conn }) => {
    if (!m.quoted) throw 'Reply Pesannya!!'
    try {
    let q = await conn.serializeM(await m.getQuotedObj())
    await q.quoted.copyNForward(m.chat, false)
    } catch(e) {
    m.reply(String(e))
    }
}
handler.help = ['q']
handler.tags = ['tools']
handler.command = /^q$/i
handler.limit = true
module.exports = handler
