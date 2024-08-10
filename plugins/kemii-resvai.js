let fetch = require("node-fetch")

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw `• *Example :* .${command} Hello`
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    try {
        let res = await chatWithGPT(text)
        await m.reply(res)
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["resvai *<text>*"]
handler.tags = ["ai"];
handler.command = /^(resvai)$/i

module.exports = handler

/* New Line */
async function chatWithGPT(your_qus) {
    const response = await fetch("https://tools.revesery.com/ai/ai.php?query=" + encodeURIComponent(your_qus), {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36"
        }
    });

    const data = await response.json();
    return data.result;
}