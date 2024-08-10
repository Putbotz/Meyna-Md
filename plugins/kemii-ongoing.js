// Kemii Cantik
// Jum, 24 Mei - 13.57

let handler = async (m, { conn, usedPrefix, command }) => {
  await m.react('🕒')
  let res = await getLatestAnime()
  let hari = await getTodayDate()
  let text = ''
  for (let i = 0; i < res.length; i++) {
    var result = res[i]
    let hasil = `> _Title: ${result.title}_\n`
    hasil += `> _Status: ${result.status}_\n`
    hasil += `> _Episode: ${result.episode}_`
    text += hasil + '\n\n'
  }
  m.reply('```Ongoing```' + '```' + ` (${hari}) :` + '```\n\n' + `${text}` + '`Powered By ICSF Team`')
};
handler.help = ["ongoing"]
handler.tags = ["anime"]
handler.command = ["ongoing"]
module.exports = handler;

function getLatestAnime() {
  return new Promise((resolve, reject) => {
    axios
      .get("https://www.mynimeku.com/")
      .then(({ data }) => {
        let $ = cheerio.load(data);
        let result = [];
        $("div.flexbox-item > a").each(function (i, e) {
          let title = $(e).attr("title");
          let link = $(e).attr("href");
          let status = $(e).find("div.flexbox-status").text();
          let thumb = $(e).find("div.flexbox-thumb > img").attr("data-src");
          let episode = $(e)
            .find("div.flexbox-episode > span.eps")
            .text()
            .split(" ")[1];
          let type = $(e).find("div.flexbox-type").text();
          result.push({ title, status, episode, type, thumb, link });
        });
        resolve(result);
      })
      .catch(reject);
  });
}

function getTodayDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0, maka ditambahkan 1.
  const year = today.getFullYear();
  const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" }); // Mengambil nama hari dalam bahasa Inggris.

  return `${dayOfWeek}`;
}