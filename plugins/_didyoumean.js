/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

let didyoumean = require('didyoumean');
let similarity = require('similarity');

let handler = m => m;

handler.before = async function (m, { match, usedPrefix }) {
  if ((usedPrefix = (match[0] || '')[0])) {
    let noPrefix = await m.text.replace(usedPrefix, '').trim();
    let kemii = await Object.values(global.plugins)
      .filter(v => v.help && !v.disabled)
      .map(v => v.help)
      .flat(1);
    let alias = await hapusTeksFormat(kemii);
    let mean = await didyoumean(noPrefix, alias);
    let sim = await similarity(noPrefix, mean);
    let similarityPercentage = await parseInt(sim * 100);

    if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {
     await this.reply(
        m.chat,
        Func.Styles(`command *${m.text}* tidak di temukan\nmungkin yang kamu maksud adalah *${usedPrefix + mean}*`).trim(),
        m
      );
    }
  }
};

module.exports = handler;

function hapusTeksFormat(arr) {
  const regex = /<[^<>]*>|[*]{2}[^*]*[*]{2}|@[^ ]+|\*[^*]*\*/g;
  let cleanedItems = arr.map(item => {
    let cleanedItem = item.replace(regex, '').trim();
    return cleanedItem ? `'${cleanedItem}'` : ''; 
  }).filter(item => item !== '');
  
  return `[ \n${cleanedItems.join(', \n')} \n]`;
}