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
  if (command === 'otakudesu') {
    if (!text) return m.reply(`• *Example :* ${usedPrefix + command} Maou Gakuin`);
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
    
    let otakus = await search(text);
    if (!otakus.result.length) return m.reply('Anime tidak ditemukan.');
    
    let beton = new Button()
      .setBody(`Showing search results for : “${text}”`)
      .setFooter(footer)
      .setTitle('Powered By Kemii')
      .setImage(otakus.result[0].img)
      .addSelection("Tap Here!")
      .makeSections("", "");

    for (let v of otakus.result) {
      beton.makeRow("", v.title, `[ ${v.title} ]`, `.otakuv ${v.url}`);
    }

    beton.run(m.chat, conn, m);
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });

  } else if (command === 'otakuv') {
    if (!text) return;
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
    
    let otakuv = await view(text);
    let capt = `Title : ${otakuv.judul}/${otakuv.japanese}\n`
      + `Ranting : ${otakuv.skor}\n`
      + `Produser : ${otakuv.produser}\n`
      + `Status : ${otakuv.status}\n`
      + `Episode : ${otakuv.total_episode}\n`
      + `Durations : ${otakuv.durasi}\n`
      + `Genre : ${otakuv.genre}\n`
      + `Studio : ${otakuv.studio}`;
    
    let beton = new Button()
      .setBody(capt)
      .setFooter(footer)
      .setTitle('Powered By Kemii')
      .setImage(otakuv.img)
      .addSelection("Tap Here!")
      .makeSections("", "");

    for (let v of otakuv.episode) {
      beton.makeRow("", v.title, `[ ${v.title} ]`, `.otakud ${v.url}`);
    }

    beton.run(m.chat, conn, m);
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });

  } else if (command === 'otakud') {
    if (!text) return;
    let otakud = await otakudl(text);
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });   
    
    let size720p = await Func.getSize(otakud.m720p.url);
    let size480p = await Func.getSize(otakud.m480p.url);
    let size360p = await Func.getSize(otakud.m360p.url);
    
    let capt = 'Resolution Stream.\n\n'
      + `*1.* 720p\nSize: ${size720p}\n\n`
      + `*2.* 480p\nSize: ${size480p}\n\n`
      + `*3.* 360p\nSize: ${size360p}`;
    
    await conn.sendAliasMessage(m.chat, { text: capt }, [
      { alias: "1", response: `.otakur ${otakud.m720p.url}` },
      { alias: "2", response: `.otakur ${otakud.m480p.url}` },
      { alias: "3", response: `.otakur ${otakud.m360p.url}` }
    ], m);

    await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });

  } else if (command === 'otakur') {
    if (!text) return;
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
    await conn.sendMessage(m.chat, { document: { url: text }, mimetype: 'video/mp4', fileName: 'Otakudesu.mp4' }, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
  }
};

handler.tags = ["search"];
handler.help = ["otakudesu *<text>*"];
handler.command = ["otakudesu", "otakuv", "otakud", "otakur"];

handler.register = true;
handler.limit = 10;

module.exports = handler;

async function search(query) {
  let html = (await axios.get("https://otakudesu.cloud/?s=" + encodeURIComponent(query) + "&post_type=anime")).data;
  const $ = cheerio.load(html);
  
  let result = {
    creator: "Xzyan", 
    result: []
  };
  
  $(".page > ul.chivsrc > li").each((i, e) => {
    result.result.push({
      img: $(e).find("img").attr("src"),
      title: $(e).find("h2").text(),
      url: $(e).find("h2").children("a").attr("href")
    });
  });

  return result;
}

async function view(url) {
  let html = (await axios.get(url)).data;
  const $ = cheerio.load(html);

  let result = {
    creator: "Xzyan",
    img: $(".fotoanime > img").attr("src")
  };

  $(".infozingle > p").each((i, e) => {
    let nazz = $(e).find("span").text().split(":");
    result[nazz[0].toLowerCase().trim().split(" ").join("_")] = nazz.slice(1).join(":").trim();
  });

  result.download = $('.episodelist').eq(0).find('a').attr('href');
  result.batch = $('.episodelist').eq(2).find('a').attr('href') || "Tidak Tersedia";
  result.sinopsis = '';

  $(".sinopc > p").each((i, e) => {
    result.sinopsis += $(e).text().trim() + "\n\n";
  });

  result.episode = [];

  $(".episodelist").eq(1).find("ul").children("li").each((i, e) => {
    result.episode.push({
      title: $(e).find("span").first().children("a").text().trim(),
      url: $(e).find("span").first().children("a").attr("href")
    });
  });

  return result;
}

async function otakudl(episode_url) {
  const $ = cheerio.load((await axios.get(episode_url)).data);
  let result = {};

  $('.mirrorstream > ul').each((i, e) => {
    result[i] = {};
    $(e).find('li').each((index, e) => {
      let obj = { ...JSON.parse(atob($(e).find('a').attr('data-content'))), nonce: '71b9d3859d', action: '2a3505c93b0035d3f455df82bf976b84' };
      let data = Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
      result[i][$(e).text().toLowerCase().trim()] = data;
    });
  });

  for (let i = 0; i < 3; i++) {
    if (result[i].pdrain) {
      let xzyan = cheerio.load((await axios.get(cheerio.load(atob((await axios.post("https://otakudesu.cloud/wp-admin/admin-ajax.php", result[i].pdrain)).data.data))("iframe").attr("src"))).data);
      result[["m360p", "m480p", "m720p"][i]] = {
        url: xzyan('meta[property="og:video"]').attr('content'),
        thumbnail: xzyan('meta[property="og:image"]').attr('content')
      };
    } else {
      result[["m360p", "m480p", "m720p"][i]] = false;
    }
    delete result[i];
  }

  return result;
}