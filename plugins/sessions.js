let util = require('util')

let handler = async(m, { conn, usedPrefix, command, }) => {
let kemii = await conn.user
await conn.reply(m.chat, util.format(kemii), m)
}
handler.command = ["session","sessions","sesi"]
module.exports = handler