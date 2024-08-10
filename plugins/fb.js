var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `• *Example :* .fb https://www.facebook.com/xxxxxxx`, m)
  }
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})

  try {
    var res = await FbDownload(text)
    await conn.sendFile(m.chat, res.links["Download High Quality"], 'fb.mp4', `\`\`\`- Fetching: ${(new Date() - startTime) / 1000} seconds\`\`\``, m);
    await m.react('')
  } catch (e) {
conn.reply(m.chat, err, m)
}
};

handler.help = ['facebook'].map((v) => v + ' *<url>*');
handler.tags = ['downloader'];
handler.command = /^((facebook|fb)(downloder|dl)?)$/i;
module.exports = handler;

async function FbDownload(vid_url) {
    try {
        const data = {
            url: vid_url
        };
        const searchParams = new URLSearchParams();
        searchParams.append('url', data.url);
        const response = await fetch('https://facebook-video-downloader.fly.dev/app/main.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: searchParams.toString(),
        });
        const responseData = await response.json();
        return responseData;
    } catch (e) {
        return null;
    }
}