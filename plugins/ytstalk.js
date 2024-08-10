let axios = require('axios')
let cheerio = require('cheerio')
let FormData = require('form-data')

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} dcodekemii`, m)
	let salsa = `https://youtube.com/@${text}`
	let kemii = await ytstalk(salsa)
	if (kemii.error) return m.reply(kemii.msg);
	let teks = 'Yt Stalk\n\n'
	teks += '```Name:```' + ` ${kemii.channel}\n`
	teks += '```Location:```' + ` ${kemii.location}\n`
	teks += '```Code:```' + ` ${kemii.dial_code}\n`
	teks += '```Creation:```' + ` ${kemii.creation}\n`
	teks += '```Views:```' + ` ${kemii.total_views}\n`
	teks += '```Video:```' + ` ${kemii.total_videos}\n`
	teks += '```Desc:```' + ` ${kemii.description}`
	await conn.sendFile(m.chat, kemii.avatar.urls[1].url, '', teks, m)
}
handler.help = ['ytstalk *<text>*']
handler.tags = ['stalking']
handler.command = /^(ytstalk)$/i
handler.limit = true
handler.register = true
module.exports = handler

async function ytstalk(url) {
   return new Promise(async resolve => {
   try {
      const parse = await axios.get('https://imageyoutube.com/profile-photo-download/', {
         headers: {
            'user-agent': 'Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36'
         }
      })
      const cookie = parse.headers['set-cookie'].join('; ')
      const token = cheerio.load(parse.data)('input[name="csrf_token"]').attr('value')
      let form = new FormData
      form.append('v', url)
      form.append('csrf_token', token)
      form.append('mcountry', 'en')
      const html = await (await axios.post('https://imageyoutube.com/profile-photo-download/imgyt', form, {
         headers: {
            'origin': 'https://imageyoutube.com',
            'referer': 'https://imageyoutube.com/profile-photo-download/',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36',
            cookie,
            ...form.getHeaders()
         }
      })).data
      const $ = cheerio.load(html)
      let spans = [], imgs = {}
      $('span').each((i, e) => spans.push({
         index: i,
         content: $(e).html()
      }))
      //return resolve(spans)
      $('section').each((x, y) => {
         const imgName = x === 0 ? 'avatar': x === 1 ? 'banner': $(y).find('h6').text().toLowerCase().replace(/(frame|quality)/, '').trim().replace(/\s/, '_').trim()
         if (!imgs[imgName]) {
            imgs[imgName] = {
               urls: []
            }
         }
         $(y).find('a').each((i, e) => {
            if ($(e).text().trim()) imgs[imgName].urls.push({
               name: /Google\sLens/.test($(e).text()) ? 'Google Lens': $(e).text(),
               url: $(e).attr('href')
            })
         })
      })
      const data = {
         error: false,
         channel: $($('a.ayz')[0]).text().trim(),
         channel_url: $('a.ayz').attr('href'),
         location: /Specified/.test(spans[3].content) ? 'N/A' : spans[3].content.split`-`[0].trim(),
         dial_code: /Specified/.test(spans[3].content) ? 'N/A' : '+' + spans[3].content.split`+`[1].split`<`[0].trim(),
         creation: $($('span')[5]).text().trim(),
         total_views: parseInt(spans[14].content) || parseInt(spans[12].content) || 'N/A',
         total_videos: parseInt(spans[17].content) || parseInt(spans[15].content) || 'N/A',
         frequency: {
            year: parseInt(spans[14].content) ? spans[18].content : spans[16].content,
            week:parseInt(spans[14].content) ? spans[20].content : spans[18].content,
            day:parseInt(spans[14].content) ? spans[22].content : spans[20].content,
         },
         playlist: $($('span')[25]).find('a').attr('href') || $($('span')[23]).find('a').attr('href') || 'N/A',
         description: /Specified/.test(spans[3].content) ? 'N/A' : spans[28].content.trim(),
         ...imgs
      }


      resolve(data)
   } catch (e) {
      console.log(e)
      resolve({
         error: true,
         msg: e.message
      })
   }
 })
}