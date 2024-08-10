let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
     if (user.warning >= 2) return conn.reply(m.chat, Func.texted('bold', 'Limit Cheat Sudah Di Gunakan, Silahkan Coba Lagi Nanti'), m)
        conn.reply(m.chat, `*Succes Cheat !*`, m)
        global.db.data.users[m.sender].money = 999999999999
        global.db.data.users[m.sender].limit = 999999999999
        global.db.data.users[m.sender].level = 999999999999
        global.db.data.users[m.sender].exp = 999999999999
        global.db.data.users[m.sender].sampah = 999999999999
        global.db.data.users[m.sender].potion = 999999999999
        global.db.data.users[m.sender].common = 999999999999
        global.db.data.users[m.sender].uncommon = 999999999999
        global.db.data.users[m.sender].mythic = 999999999999
        global.db.data.users[m.sender].legendary = 999999999999
        global.db.data.users[m.sender].potion =  999999999999

global.db.data.users[m.sender].diamond =  999999999999

global.db.data.users[m.sender].poin =  999999999999

global.db.data.users[m.sender].balance =  999999999999

global.db.data.users[m.sender].bank =  999999999999
user.warning += 1
}
handler.command = /^(cheat)$/i
handler.premium = true
handler.mods = false

module.exports = handler