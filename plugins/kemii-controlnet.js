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
    if (!mime) return conn.reply(m.chat, 'Send/Reply Images with the caption *.controlnet*', m)
    let media = await q.download()
    let url = await uploadImage(media)
    if (!text) return conn.reply(m.chat, 'Send/Reply Images with the caption *.controlnet outgrown*', m)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    try {
    let hasil = `https://skizo.tech/api/control-net?apikey=dcodekemii&url=${url}&filterid=${text}`
	await conn.sendFile(m.chat, hasil, '', '', m)
	} catch (e) {
	let kata = `{
  status: 400,
  author: 'Kemii',
  message: 'filterid not found',
  list: [
    { id: 'scene102', title: 'outgrown', kategory: 'scenes' },
    { id: 'scene135', title: 'cartoon', kategory: 'scenes' },
    { id: 'scene156', title: 'moon', kategory: 'scenes' },
    { id: 'scene142', title: 'neo_desert', kategory: 'scenes' },
    { id: 'scene140', title: 'neo_metal', kategory: 'scenes' },
    { id: 'scene126', title: 'spring', kategory: 'scenes' },
    { id: 'scene122', title: 'wizardry', kategory: 'scenes' },
    { id: 'scene155', title: 'desert', kategory: 'scenes' },
    { id: 'scene128', title: 'night', kategory: 'scenes' },
    { id: 'scene114', title: 'knitted', kategory: 'scenes' },
    { id: 'scene132', title: 'aesthetic', kategory: 'scenes' },
    { id: 'scene129', title: 'haunted', kategory: 'scenes' },
    { id: 'scene151', title: 'jaipur', kategory: 'scenes' },
    { id: 'scene152', title: 'samurai', kategory: 'scenes' },
    { id: 'scene101', title: 'abandoned', kategory: 'scenes' },
    { id: 'scene139', title: 'utopia', kategory: 'scenes' },
    { id: 'scene138', title: 'anime', kategory: 'scenes' },
    { id: 'scene111', title: 'graffiti', kategory: 'scenes' },
    { id: 'scene165', title: 'xmas_market', kategory: 'scenes' },
    { id: 'scene149', title: 'nyc', kategory: 'scenes' },
    { id: 'scene118', title: 'bounce', kategory: 'scenes' },
    { id: 'scene121', title: 'fantasy', kategory: 'scenes' },
    { id: 'scene127', title: 'fall', kategory: 'scenes' },
    { id: 'scene150', title: 'london', kategory: 'scenes' },
    { id: 'scene109', title: 'kyoto', kategory: 'scenes' },
    { id: 'scene154', title: 'jungle', kategory: 'scenes' },
    { id: 'scene153', title: 'marble', kategory: 'scenes' },
    { id: 'scene168', title: 'snow_lodge', kategory: 'scenes' },
    { id: 'scene116', title: 'dolls', kategory: 'scenes' },
    { id: 'scene113', title: 'candyland', kategory: 'scenes' },
    { id: 'scene167', title: 'ginger', kategory: 'scenes' },
    { id: 'scene106', title: 'medieval', kategory: 'scenes' },
    { id: 'scene110', title: 'azteca', kategory: 'scenes' },
    { id: 'scene157', title: 'cave', kategory: 'scenes' },
    { id: 'scene166', title: 'workshop', kategory: 'scenes' },
    { id: 'scene137', title: 'comic', kategory: 'scenes' },
    { id: 'scene103', title: 'cordyceps', kategory: 'scenes' },
    { id: 'scene141', title: 'futurist', kategory: 'scenes' },
    { id: 'scene115', title: 'paper_art', kategory: 'scenes' },
    { id: 'scene147', title: 'tokyo', kategory: 'scenes' },
    { id: 'scene124', title: 'elven', kategory: 'scenes' },
    { id: 'scene133', title: 'knight', kategory: 'scenes' },
    { id: 'scene148', title: 'venice', kategory: 'scenes' },
    { id: 'scene162', title: 'mmorpg', kategory: 'scenes' },
    { id: 'scene169', title: 'whimsical', kategory: 'scenes' },
    { id: 'scene108', title: 'cairo', kategory: 'scenes' },
    { id: 'scene120', title: 'sand', kategory: 'scenes' },
    { id: 'scene163', title: 'battle', kategory: 'scenes' },
    { id: 'scene125', title: 'moria', kategory: 'scenes' },
    { id: 'scene136', title: '2d', kategory: 'scenes' },
    { id: 'scene117', title: 'coral', kategory: 'scenes' },
    { id: 'scene159', title: 'road_rage', kategory: 'scenes' },
    { id: 'scene105', title: 'flood', kategory: 'scenes' },
    { id: 'scene131', title: 'neo_noir', kategory: 'scenes' },
    { id: 'scene107', title: 'greco', kategory: 'scenes' },
    { id: 'scene158', title: 'blocks', kategory: 'scenes' },
    { id: 'scene123', title: 'shire', kategory: 'scenes' },
    { id: 'scene119', title: 'hansel', kategory: 'scenes' },
    { id: 'scene104', title: 'snowed_in', kategory: 'scenes' },
    { id: 'scene112', title: 'bricks', kategory: 'scenes' },
    { id: 'scene134', title: 'maze', kategory: 'scenes' },
    { id: 'scene160', title: 'nostalgia', kategory: 'scenes' },
    { id: 'scene161', title: 'pixels', kategory: 'scenes' },
    { id: 'scene130', title: 'desert', kategory: 'scenes' },
    { id: 'scene001', title: 'custom', kategory: 'scenes' }
  ]
}`
    m.reply(kata)
	}
}
handler.help = ["controlnet *<image>*"]
handler.tags = ["conver","ai"]
handler.command = /^(controlnet)$/i
handler.limit = true
handler.register = true
module.exports = handler;
