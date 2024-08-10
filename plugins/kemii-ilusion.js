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
    if (!mime) return conn.reply(m.chat, 'Send/Reply Images with the caption *.ilusion*', m)
    let media = await q.download()
    let url = await uploadImage(media)
    if (!text) return conn.reply(m.chat, 'Send/Reply Images with the caption *.ilusion Tokyo*', m)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    try {
    let hasil = `https://skizo.tech/api/illusion?apikey=dcodekemii&url=${url}&filterid=${text}`
	await conn.sendFile(m.chat, hasil, '', '', m)
	} catch (e) {
	let kata = `{
  status: 400,
  author: 'Kemii',
  message: 'filterid not found',
  list: [
    { id: 'pattern113', title: 'rice_dawn', kategory: 'patterns' },
    { id: 'pattern147', title: 'burger', kategory: 'patterns' },
    { id: 'pattern146', title: 'morocco', kategory: 'patterns' },
    { id: 'pattern120', title: 'sand_dunes', kategory: 'patterns' },
    { id: 'pattern138', title: 'las_vegas', kategory: 'patterns' },
    { id: 'pattern135', title: 'tokyo', kategory: 'patterns' },
    { id: 'pattern111', title: 'fall_lake', kategory: 'patterns' },
    { id: 'pattern122', title: 'lavender', kategory: 'patterns' },
    { id: 'pattern136', title: 'savannah', kategory: 'patterns' },
    { id: 'pattern145', title: 'cityscape', kategory: 'patterns' },
    { id: 'pattern116', title: 'snow_town', kategory: 'patterns' },
    { id: 'pattern118', title: 'scotland', kategory: 'patterns' },
    { id: 'pattern119', title: 'trail_hike', kategory: 'patterns' },
    { id: 'pattern112', title: 'outback', kategory: 'patterns' },
    { id: 'pattern123', title: 'aurora', kategory: 'patterns' },
    { id: 'pattern133', title: 'coliseum', kategory: 'patterns' },
    { id: 'pattern107', title: 'star_peaks', kategory: 'patterns' },
    { id: 'pattern148', title: 'pizza', kategory: 'patterns' },
    { id: 'pattern130', title: 'ride_park', kategory: 'patterns' },
    { id: 'pattern144', title: 'castle', kategory: 'patterns' },
    { id: 'pattern124', title: 'haunted', kategory: 'patterns' },
    { id: 'pattern128', title: 'sun_trail', kategory: 'patterns' },
    { id: 'pattern115', title: 'old_ruins', kategory: 'patterns' },
    { id: 'pattern125', title: 'train_hub', kategory: 'patterns' },
    { id: 'pattern149', title: 'lasagna', kategory: 'patterns' },
    { id: 'pattern106', title: 'autumn', kategory: 'patterns' },
    { id: 'pattern109', title: 'sand_bliss', kategory: 'patterns' },
    { id: 'pattern143', title: 'temple', kategory: 'patterns' },
    { id: 'pattern104', title: 'alpine_lake', kategory: 'patterns' },
    { id: 'pattern142', title: 'alp_charm', kategory: 'patterns' },
    { id: 'pattern127', title: 'paper_pile', kategory: 'patterns' },
    { id: 'pattern102', title: 'utah', kategory: 'patterns' },
    { id: 'pattern132', title: 'manhattan', kategory: 'patterns' },
    { id: 'pattern108', title: 'cliff', kategory: 'patterns' },
    { id: 'pattern117', title: 'caribbean', kategory: 'patterns' },
    { id: 'pattern134', title: 'venice', kategory: 'patterns' },
    { id: 'pattern126', title: 'cloth_hill', kategory: 'patterns' },
    { id: 'pattern101', title: 'snow_peaks', kategory: 'patterns' },
    { id: 'pattern137', title: 'dubai', kategory: 'patterns' },
    { id: 'pattern129', title: 'city_square', kategory: 'patterns' },
    { id: 'pattern114', title: 'fuji', kategory: 'patterns' },
    { id: 'pattern141', title: 'art_plaza', kategory: 'patterns' },
    { id: 'pattern001', title: 'custom', kategory: 'patterns' }
  ]
}`
    m.reply(kata)
	}
}
handler.help = ["ilusion *<image>*"]
handler.tags = ["conver","ai"]
handler.command = /^(ilusion)$/i
handler.limit = true
handler.register = true
module.exports = handler;
