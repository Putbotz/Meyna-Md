let axios = require("axios")

let handler = async (m, {
    conn,
    text
}) => {

    if (!text) return conn.reply(m.chat, '• *Example :* .binary Hallo', m)

    axios.get(`https://some-random-api.com/binary?text=${text}`).then((res) => {
        let hasil = `Teks : ${text}\nBinary : ${res.data.binary}`

        conn.reply(m.chat, hasil, m)
    })
}
handler.help = ['binary'].map(v => v + ' *<teks>*')
handler.tags = ['tools']
handler.command = /^(binary)$/i
handler.owner = false

handler.exp = 0
handler.limit = false

module.exports = handler