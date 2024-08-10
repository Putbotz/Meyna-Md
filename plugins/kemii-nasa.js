/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let kemii = await getNasaInfo()
    
    let teks = `乂  *N A S A*\n\n`;
    kemii.data.map((v, i) => {
        teks += `*${i + 1}. ${v.title}*\n`;
        teks += `    ◦  *Description* : ${v.description}\n`;
        teks += `    ◦  *Link* : ${v.link}\n\n`;
    });    
    conn.sendMessageModify(m.chat, teks, m, {
        largeThumb: true,
        title: 'DCODEKEMII',
        body: 'Version: 3.0.2',
        thumbnail: kemii.data[0].img
    });
};

handler.tags = ["internet"];
handler.help = ["nasa"];
handler.command = ["nasa"];

handler.register = true;

module.exports = handler;

async function getNasaInfo() {
  try {
    const response = await axios.get('https://www.nasa.gov/');
    const $ = cheerio.load(response.data);
    const slides = [];

    $('.hds-nasa-mag-wrapper').each((index, element) => {
      const title = $(element).find('h2').text().trim();
      const description = $(element).find('p').text().trim();
      const link = $(element).find('a.usa-button').attr('href');
      const img = $(element).find('figure img').attr('src');

      slides.push({ title, description, link, img });
    });

    return {status: true, creator: "dcodekemii", data: slides};
  } catch (error) {
    console.error(error);
    return [];
  }
}