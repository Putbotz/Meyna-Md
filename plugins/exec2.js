let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, { conn, isOwner, command, text }) => {
  let edit = await conn.reply(m.chat, 'Executing...', m)
  if (global.conn.user.jid != conn.user.jid) return
  let o
  try {
    o = await exec(command.trimStart()  + ' ' + text.trimEnd())
  } catch (e) {
    o = e
  } finally {
    let { stdout, stderr } = o
    if (stdout.trim()) conn.sendMessage(m.chat, { text: stdout, edit: edit })
    if (stderr.trim()) conn.sendMessage(m.chat, { text: stderr, edit: edit })
  }
}
handler.customPrefix = /^[$] /
handler.command = new RegExp
handler.owner = true
module.exports = handler