let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} anime`, m)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    const apiURL = 'https://api.itsrose.life/image/diffusion';
    const options = {
    method: 'POST',
    headers: {
    'accept': 'application/json',
    'Authorization': global.rose,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    "prompt": text,
    "negative_prompt": "(worst quality, low quality, extra hand), monochrome",
    "sampler": "Euler a",
    "seed": -1,
    "ratio": "1:1",
    "style": "ACG",
    "init_image": "",
    "cfg": 7.5,
    "controlNet": "none",
    "image_num": 1,
    "steps": 25
    })
    };
    fetch(apiURL, options)
    .then(response => response.json())
    .then(data => {
    if (data.status) {
    conn.sendFile(m.chat, data.images, '', '', m)
    } else {
    conn.reply(m.chat, `Error: ${data.message}`, m)
    }
    })
};
handler.help = ["diffusion *<text>*"]
handler.tags = ["diffusion","ai"]
handler.command = ["dif"]
handler.premium = false

module.exports = handler