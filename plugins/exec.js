let util = require('util')

let handler = async (m, zippo) => { 
const kemii = global.owner.map(([number, isCreator, isDeveloper]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
if (!kemii) return
	Object.keys(zippo).forEach(key => {
  this[key] = zippo[key];
});
if (m.text.startsWith('>')) {
try {
return m.reply(util.format(await eval(m.text.slice(2))))
} catch (err) {
m.reply(String(err))
}
}
if (m.text.startsWith('<')) {
try {
return m.reply(JSON.stringify(await eval(`${m.text.slice(2)}`)))
} catch (e) {
m.reply(String(e))
}
}
if (m.text.startsWith('->')) {
try {
return m.reply(util.inspect(await eval(`${m.text.slice(2)}`), { depth: null })) 
} catch (e) {
m.reply(String(e))
}
}
if (m.text.startsWith('=>')) {
try {
return m.reply(util.format(await eval(`(async() => { ${m.text.slice(2)} })()`))) 
} catch (e) {
m.reply(String(e))
}
}
};

handler.help = ['> ', '=> ', '< ', '-> ']
handler.tags = ['advanced']
handler.customPrefix = /(>|=>|<|->) /
handler.command = /(?:)/i
handler.rowner = false
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler