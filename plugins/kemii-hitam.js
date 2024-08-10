const uploadImage = require('../lib/uploadFile.js');

const handler = async (m, { conn, text, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw `Send/Reply Images with the caption *${usedPrefix + command}*`
let media = await q.download()
let url = await uploadImage(media)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  const payload = {
  "prompt": "ungly, dark face, { dark skin }",
  "width": 512,
  "height": 512,
  "steps": 25,
  "model_id": "meinamix",
  "sampler": "Euler",
  "init_image": url,
  "control_image": "",
  "mask_image": "",
  "controlnet_model": "tile",
  "controlnet_conditioning_scale": 1,
  "guess_mode": "no",
  "auto_hint": "no",
  "safety_checker": "no",
  "safety_checker_type": "blur",
  "cfg": 7.5,
  "seed": {},
  "enhance_prompt": "no",
  "image_num": 1,
  "lora_model": "",
  "lora_strength": 1,
  "negative_prompt": "ugly, disfigured, low quality, blurry, nsfw",
  "webhook": ""
}
  
  const { data } = await axios.post("https://api.itsrose.rest/image/diffusion/controlNet", payload, {
    headers: {
      Authorization: global.roseapi,
    },
  }).catch((e) => e?.response);

  const { status, message, result } = data;

  if (!status) {
    m.reply(message);
  } else {
    for (let image of result.images) {
    conn.sendFile(m.chat, image, '', done, m)
    }
  }
};

handler.help = ['hitamkan *<image>*'];
handler.tags = ['ai','diffusion'];
handler.premium = true;
handler.command = /^(hitamkan)$/i;
handler.limit = true;

module.exports = handler;