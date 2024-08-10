// Kemii Cantik
// Jum, 24 Mei - 00.00

let handler = async(m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} GTV`, m)
m.react('🕒')
let kemii = await JadwalTV(text)
let kata = '```JadwalTV```' + '```' + ` (${text}) :` + '```\n\n'
kata += kemii
await m.reply(`${kata}\n\n` + '`Powered By ICSF Team`')
}

handler.command = ['jadwaltv']
handler.tags = ['internet','search']
handler.help = ["jadwaltv *<text>*"]
module.exports = handler

function JadwalTV(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://www.jadwaltv.net/channel/' + query);
            const $ = cheerio.load(data);
            const tv = []
            $('table.table.table-bordered > tbody > tr.jklIv').each((u, i) => {
                let an = $(i).text().split('WIB')
                tv.push(`> _${an[0]} - ${an[1]}_`)
            })
            if (tv.every(x => x === undefined)) return resolve({
                developer: 'dcodekemii',
                mess: 'no result found'
            })
            resolve(tv.join('\n'))
        } catch (err) {
            console.error(err)
        }
    })
}