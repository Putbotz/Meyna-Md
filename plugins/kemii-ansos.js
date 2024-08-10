// Kemii Cantik
// Jum, 21 Jun - 14.22

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} 108642837`, m);
  await m.react('🕒');
  let scrape = new AnsosForum();
  let hasil = await scrape.fetch(text);
  if (hasil.data && hasil.data.thumbnail) {
    let thumbnailUrl = hasil.data.thumbnail;
    delete hasil.data.thumbnail;
    await conn.sendFile(m.chat, thumbnailUrl, '', util.format(hasil), m);
    await m.react('');
  } else {
    await conn.reply(m.chat, util.format(hasil), m);
    await m.react('');
  }
};

handler.tags = ["hengker"];
handler.help = ["ansos *<text>*"];
handler.command = ["ansos"];
module.exports = handler;

class AnsosForum {
  search = id => new Promise(async resolve => {
    try {
      const html = await (await axios.get('https://ansosforum.com/kasus?cari=' + id, {
        headers: {
          'user-agent': 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        }
      })).data;
      const $ = cheerio.load(html);
      if ($('a.idcamp-card').length < 1) return resolve({
        creator: global.creator,
        status: false,
        mgs: `Data not found!`
      });
      resolve({
        creator: 'dcodekemii',
        status: true,
        data: {
          url: 'https://ansosforum.com/' + $('a.idcamp-card').attr('href')
        }
      });
    } catch (e) {
      resolve({
        creator: 'dcodekemii',
        status: false,
        msg: e.message
      });
    }
  });

  replacer = str => str
    .replace('Tanggal', 'posted')
    .replace('Pelaku / Penipu', 'penipu')
    .replace('Korban / Pelapor', 'korban');

  fetch = id => new Promise(async resolve => {
    try {
      const search = await this.search(id);
      if (!search.status) return resolve(search);
      const html = await (await axios.get(search.data.url, {
        headers: {
          'user-agent': 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        }
      })).data;
      const $ = cheerio.load(html);
      let data = {
        thumbnail: 'https://ansosforum.com' + $('img.card-img-top').attr('src').replace('../', '/'),
        title: $('div.article-title-section').find('h2').text().trim(),
        author: $('div.article-title-section').find('h6').text().split `By` [1].trim(),
        description: $('div.blog-content').text().trim().split `\n` [0].trim()
      };
      $('div.blog-content').find('li').each((i, e) => {
        data[this.replacer($(e).text().split `:` [0].trim()).toLowerCase()] = $(e).text().split `:` [1].trim();
      });
      resolve({
        creator: 'dcodekemii',
        status: true,
        data
      });
    } catch (e) {
      resolve({
        creator: 'dcodekemii',
        status: false,
        msg: e.message
      });
    }
  });
}