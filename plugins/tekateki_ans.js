const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text) return false
    this.tekateki = this.tekateki ? this.tekateki : {}
    if (!(id in this.tekateki)) return
    if (m.quoted.id == this.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {        
            global.db.data.users[m.sender].point += dpoint  
            await this.sendImageAsSticker(m.chat, betul, m, { packname: "sticker by", author: "Kemii" })
            await m.reply(ta)      
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else {       
        await this.sendImageAsSticker(m.chat, salah, m, { packname: "sticker by", author: "Kemii" })
        await m.reply(tm)       
        global.db.data.users[m.sender].point -= mpoint
      }
    }
}
handler.exp = 0

module.exports = handler