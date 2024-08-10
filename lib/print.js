const PhoneNumber = require('awesome-phonenumber');
const urlRegex = require('url-regex-safe')({ strict: false });
const chalk = require('chalk');
const fs = require('fs');

module.exports = async function (m, conn = { user: {} }) {
  let _name = await conn.getName(m.sender);
  let sender = PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') + (_name ? ' ~' + _name : '');
  let chat = await conn.getName(m.chat);
  let messageType = m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : '';
  let ipAddress = m.ip || '';
  let messageTimestamp = m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date();  
  console.log(`
 ╭┈❲ ${chalk.redBright('ICSF Team - Kemii')}
 ╞❴ Date ❵ ${chalk.blueBright(messageTimestamp.toISOString())}
 ╞❴ From ❵ ${chalk.greenBright(sender)}
 ╞❴ In chat ❵ ${chalk.magentaBright(chat || 'private chat')}
 ╞❴ Chat ❵ ${chalk.black(chalk.bgGreen(messageType))}
 ╞❴ Message ❵ ${chalk.whiteBright(m.text || '')}
 ╞❴ Message Reply ❵ ${chalk.whiteBright(m.quoted ? m.quoted.text || '' : '')}
 ╰╼┈⟐ ❰ Powered by : dcodekemii ❱
  `)
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'lib/print.js'"));
  delete require.cache[file];
});
