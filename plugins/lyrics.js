let handler = async (m, { conn, text, usedPrefix, command }) => {
try {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
    if (!teks) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} Seperti Bintang`, m)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    let api = await Func.fetchJson(`https://api.popcat.xyz/lyrics?song=${teks}`)
    let capt = '```Title:```' + ` ${api.title}\n`
    capt += '```Artist:```' + ` ${api.artist}\n`
    capt += '```Lyrics:```' + ` \n${api.lyrics}`
    conn.sendFile(m.chat, api.image, '', capt.trim(), m)
} catch (e) {
    console.log(e);
    m.reply(`🐱 Failed`);
  }
}

handler.help = ['lirik'].map(v => v + ' *<text>*')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i

module.exports = handler