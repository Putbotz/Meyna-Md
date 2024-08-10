/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} 1girl, solo, ponytail, blush.`, m)
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let edit = await m.reply(`_Generate Image From: *${text}*_`)
  let result = await text2imgAfter(text)
  let capt = '```Succes Generate Image```\n\n'
  capt += '```- Prompt:```' + '```' + ` ${text}` + '```\n'
  capt += `\`\`\`- Fetching: ${(new Date() - startTime) / 1000} seconds\`\`\``
  let q = await conn.sendMessage(m.chat, { text: capt, edit: edit })
  await conn.sendFile(m.chat, result, '', '', q)
  await m.react('')
}
 
handler.help = ['txt2img *<text>*'];
handler.command = /^(txt2img|text2img)$/i;
handler.tags = ['internet','ai'];
handler.register = true;
handler.premium = false;
handler.limit = true;

module.exports = handler;

async function text2imgBefore(prompt) {
    const Api = "https://ai-api.magicstudio.com/api/ai-art-generator";
    const body = `prompt=${encodeURIComponent(prompt)}`;
    try {
        const respons = await fetch(Api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });
        if (respons.ok) {
            const imageBuffer = await respons.buffer();
            return imageBuffer
        } else {
            const responsError = await respons.text();
            throw new Error(`Error get this image. Status code: ${respons.status}, Error: ${responsError}`);
        }
    } catch (error) {
        throw error
    }
}
async function text2imgAfter(prompt) {
    try {
        const imageBuffer = await text2imgBefore(prompt);
        const Url = await upload(imageBuffer);
        return Url
    } catch (error) {
        throw error
    }
}