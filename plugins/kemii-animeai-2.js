let axios = require('axios')
let uploadImage = require('../lib/uploadImage.js')

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return conn.reply(m.chat, 'Send/Reply Images with the caption *.animeai-2*', m)
    let media = await q.download()
    let url = await uploadImage(media)
    if (!text) return conn.reply(m.chat, 'Send/Reply Images with the caption *.animeai-2 tokyo*', m)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    try {
    let hasil = `https://skizo.tech/api/animai?apikey=dcodekemii&url=${url}&filterid=${text}`
	await conn.sendFile(m.chat, hasil, '', '', m)
	} catch (e) {
	let kata = `{
  status: 400,
  author: 'Kemii',
  message: 'filterid not found',
  list: [
    { id: 'anime103', title: 'school', kategory: 'anime' },
    { id: 'anime126', title: 'tokyo', kategory: 'anime' },
    { id: 'anime123', title: 'galaxy', kategory: 'anime' },
    { id: 'anime110', title: 'yuki', kategory: 'anime' },
    { id: 'anime109', title: 'prince', kategory: 'anime' },
    { id: 'anime120', title: 'paladin', kategory: 'anime' },
    { id: 'anime118', title: 'tech', kategory: 'anime' },
    { id: 'anime121', title: 'romantic', kategory: 'anime' },
    { id: 'anime108', title: 'flame', kategory: 'anime' },
    { id: 'anime114', title: 'manga', kategory: 'anime' },
    { id: 'anime131', title: 'studio', kategory: 'anime' },
    { id: 'anime101', title: 'fire', kategory: 'anime' },
    { id: 'anime102', title: 'demon', kategory: 'anime' },
    { id: 'anime127', title: 'lawyer', kategory: 'anime' },
    { id: 'anime104', title: 'tradition', kategory: 'anime' },
    { id: 'anime135', title: 'classy', kategory: 'anime' },
    { id: 'anime111', title: 'future', kategory: 'anime' },
    { id: 'anime122', title: 'cyberpunk', kategory: 'anime' },
    { id: 'anime119', title: 'survivor', kategory: 'anime' },
    { id: 'anime133', title: 'pirate', kategory: 'anime' },
    { id: 'anime115', title: 'rockstar', kategory: 'anime' },
    { id: 'anime107', title: 'horror', kategory: 'anime' },
    { id: 'anime105', title: 'chibi', kategory: 'anime' },
    { id: 'anime117', title: 'football', kategory: 'anime' },
    { id: 'anime125', title: 'fantasy', kategory: 'anime' },
    { id: 'anime116', title: 'ghost', kategory: 'anime' },
    { id: 'anime132', title: 'captain', kategory: 'anime' },
    { id: 'anime134', title: 'mariner', kategory: 'anime' },
    { id: 'anime124', title: 'shinobi', kategory: 'anime' },
    { id: 'anime112', title: 'isekai', kategory: 'anime' },
    { id: 'anime113', title: 'space', kategory: 'anime' },
    { id: 'anime129', title: 'shonen', kategory: 'anime' },
    { id: 'anime130', title: 'battle', kategory: 'anime' },
    { id: 'anime128', title: 'b_ball', kategory: 'anime' },
    { id: 'anime106', title: 'vintage', kategory: 'anime' },
    { id: 'anime001', title: 'custom', kategory: 'anime' }
  ]
}`
    m.reply(kata)
	}
}
handler.help = ["animeai-2 *<image>*"]
handler.tags = ["conver","ai"]
handler.command = /^(animeai-2)$/i
handler.limit = true
handler.register = true
module.exports = handler;
