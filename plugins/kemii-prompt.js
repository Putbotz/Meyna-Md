const axios = require('axios');
const uploadImage = require('../lib/uploadImage');

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (/image/.test(mime)) {
    await conn.sendMessage(m.chat, {
      react: {
        text: '🕒',
        key: m.key,
      }
    });

    let img = await q.download();
    let imageUrl = await uploadImage(img);
    let api = await prompt(imageUrl)
    await conn.reply(m.chat, api.result, m)
    await m.react('')
  } else {
    conn.reply(m.chat, 'Reply image with caption *.prompt*', m) 
  }
};

handler.help = ['prompt *<image>*'];   
handler.tags = ['tools'];
handler.command = /^prompt$/i;

module.exports = handler; 

async function prompt(url) {
let api = await Func.fetchJson(`https://itzpire.com/tools/img2prompt?url=${url}`)
return api
}