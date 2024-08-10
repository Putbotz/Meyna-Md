// Kemii Cantik
// Kam, 13 Jun - 20.14


let handler = async (m, { conn, text, command }) => {
  if (!text) return conn.reply(m.chat, `*Example*: ${command} https://www.instagram.com/p/ABC123/`, m)
  await sock.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
  let api = await getInstagramMedia(text)
  await sock.sendFile(m.chat, api.downloadLink, '', '', m)
  await m.react('')  
}
handler.help = ['ig', 'igdl', 'instagram'].map(v => v + ' *<url>*')
handler.tags = ['downloader'];
handler.command = /^(ig|igdl|instagram)$/i;

module.exports = handler;

async function getInstagramMedia(q) {
  const url = 'https://v3.igdownloader.app/api/ajaxSearch';

  const data = new URLSearchParams({
    recaptchaToken: '',
    q: q,
    t: 'media',
    lang: 'en'
  }).toString();

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*'
  };

  try {
    let html = (await axios.post(url, data, { headers })).data.data;
    const $ = cheerio.load(html);
    const thumbnailUrl = $('.download-items__thumb img').attr('src');
    const downloadLink = $('.download-items__btn a').attr('href');
    return { thumbnailUrl, downloadLink };
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}