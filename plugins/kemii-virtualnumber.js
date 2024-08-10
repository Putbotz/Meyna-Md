// Kemii Cantik
// Jum, 24 Mei - 18.12

var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} country/number/message`, m)
  let keyword = text.split(" ")[0];
  let salsa = text.slice(keyword.length + 1);
  if (keyword === 'country') {
  await m.react('🕒')
  let kemii = await Country()
  let kata = ''
  for (let i = 0; i < kemii.length; i++) {
  var result = kemii[i]
  let hasil = `> _Negara: ${result.title}_\n`
  hasil += `> _Code: ${result.countryFlag}_`
  kata += hasil + '\n\n'
  }
  await m.reply('```Virtual Country```' + '```' + ` :` + '```\n\n' + `${kata}` + '`Powered By ICSF Team`')
  } else if (keyword === 'number') {
  if (!salsa) return conn.reply(m.chat, `${usedPrefix + command} number ar`, m)
  await m.react('🕒')
  let kemii = await getNumber(salsa)
  let kata = ''
  for (let i = 0; i < kemii.length; i++) {
  var result = kemii[i]
  let hasil = `> _PhoneNumber: ${result.phoneNumber}_\n`
  hasil += `> _Negara: ${result.country}_`
  kata += hasil + '\n\n'
  }
  await m.reply('```Virtual Number```' + '```' + ` (${salsa}) :` + '```\n\n' + `${kata}` + '`Powered By ICSF Team`')
  } else if (keyword === 'message') {
  if (!salsa) return conn.reply(m.chat, `${usedPrefix + command} message +541139863664`, m)
  m.react('🕒')
  let kemii = await getMessage(salsa)
  let kata = ''
  for (let i = 0; i < kemii.length; i++) {
  var result = kemii[i]
  let hasil = `> _From: ${result.from}_\n`
  hasil += `> _Code: ${result.content}_`
  kata += hasil + '\n\n'
  }
  await m.reply('```Virtual Message```' + '```' + ` (${salsa}) :` + '```\n\n' + `${kata}` + '`Powered By ICSF Team`')
  }
}

handler.help = ['virtualnumber *<text>*']
handler.tags = ['premium']

handler.command = ["virtualnumber","virtual"]
handler.premium = true
handler.register = true
handler.limit = true

module.exports = handler

async function Country() {
        try {
            const {
                data
            } = await axios.get('https://sms24.me/en/countries');
            const $ = cheerio.load(data);
            return $('.callout').map((_, callout) => {
                const title = $('span.placeholder.h5', callout).text().trim();
                const link = 'https://sms24.me/en/countries/' + $('span.fi', callout).attr('data-flag');
                const countryFlag = $('span.fi', callout).attr('data-flag');
                return {
                    title,
                    link,
                    countryFlag
                };
            }).get();
        } catch (error) {
            console.error('Error fetching country page:', error);
            return [];
        }
}

async function getNumber(country) {
        try {
            const {
                data
            } = await axios.get(`https://sms24.me/en/countries/${country.toLowerCase()}`);
            const $ = cheerio.load(data);
            return $('.callout').map((_, callout) => {
                const phoneNumber = $('.fw-bold.text-primary', callout).text().trim();
                const country = $('h5', callout).text().trim();
                return {
                    phoneNumber,
                    country
                };
            }).get();
        } catch (error) {
            console.error('Error fetching number page:', error);
            return [];
        }
}

async function getMessage(number) {
        try {
            const {
                data
            } = await axios.get(`https://sms24.me/en/numbers/${parseInt(number)}`);
            const $ = cheerio.load(data);
            return $('.shadow-sm.bg-light.rounded.border-start.border-info.border-5').map((_, message) => {
                const from = $('a', message).text().trim().replace('From:', '').trim();
                const content = $('span', message).text().trim();
                return {
                    from,
                    content
                };
            }).get();
        } catch (error) {
            console.error('Error fetching message page:', error);
            return [];
        }
}