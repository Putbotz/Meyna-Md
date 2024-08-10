let handler = async(m, { conn, text }) => {
	let tags = ['lucu', 'relate', 'gaming', 'nostalgia', 'teknologi', 'random', 'komik', 'editan', 'wtf', 'olahraga', 'anime', 'opini', 'dark', 'absurd', 'cringe', 'sus', 'binatang']
	if(text && !tags.includes(text)) return m.reply(`Meme "${text}" tidak di temukan! \n\n${tags.map(v => `- ${v}`).join('\n')}`) 
	let url;
	let page = Math.round(Math.random() * 25)
	if(!text) url = `https://lahelu.com/api/post/get-posts?feed=1&page=${page}`
	if(text) url = `https://lahelu.com/api/post/get-posts?feed=1&hashtags[]=${text}&page=${page}`
	let anu = (await axios.get(url)).data
	let data = anu.postInfos[Math.floor(Math.random() * anu.postInfos.length)]
	if(/^video/i.test(data.media)) return await conn.sendMessage(m.chat, { video: { url: 'https://cache.lahelu.com/'+data.media }, caption: data.title }, { quoted: m }) 
	if(/^image/i.test(data.media)) return await conn.sendMessage(m.chat, { image: { url: 'https://cache.lahelu.com/'+data.media }, caption: data.title }, { quoted: m }) 
	}
	
handler.help = ['meme']
handler.tags = ['internet']

handler.command = /^(meme)$/i
handler.premium = false
handler.register = true
handler.limit = 5
module.exports = handler