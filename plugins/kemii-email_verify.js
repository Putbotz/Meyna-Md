let fs = require('fs')
let handler = m => m
handler.before = async function (m) {
      try {
         let users = global.db.data.users[m.sender]     
         if (!m.isGroup && m.text.toLowerCase(/\d{3}-\d{3}/) && !users.registered) {
         if (m.text.toLowerCase() == users.code.toLowerCase().trim()) {
            if (m.text.toLowerCase() == !users.code.toLowerCase().trim()) return conn.reply(m.chat, Func.texted('bold', '🚩 Your verification code is wrong.'), m)
            if (new Date - users.codeExpire > 180000) return conn.reply(m.chat, Func.texted('bold', '🚩 Your verification code has expired.'), m).then(() => {
               users.codeExpire = 0
               users.code = ''
               users.email = ''
               users.attempt = 0
               users.warn = 0
            })
            return conn.reply(m.chat, Func.texted('bold', `✅ Your number has been successfully verified (+50 Limit)`), m).then(() => {             
               users.codeExpire = 0
               users.code = ''
               users.attempt = 0
               users.warn = 0
               users.registered = true
               users.limit += 50
            })
         }}
      } catch (e) {
         m.reply(m.chat, `SorryErroR`, m)
      }
   }
module.exports = handler