let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, '• *Example :* .heroml balmond', m)
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    let kemii = await Hero(text)
    let teks = 
    conn.sendFile(m.chat, res.result.hero_img, 'heroml.jpg', `${capt}`, m)
}
handler.help = ['heroml'].map(v => v + ' *<name>*')
handler.tags = ['internet']
handler.command = /^(heroml)$/i

module.exports = handler

async function Hero(querry) {
  return new Promise(async (resolve, reject) => {
    try {
      let upper =
        querry.charAt(0).toUpperCase() + querry.slice(1).toLowerCase();
      const { data, status } = await axios.get(
        "https://mobile-legends.fandom.com/wiki/" + upper,
      );
      if (status === 200) {
        const $ = cheerio.load(data);
        let atributes = [];
        let rill = [];
        let rull = [];
        let rell = [];
        let hero_img = $("figure.pi-item.pi-image > a > img").attr("src");
        let desc = $("div.mw-parser-output > p:nth-child(6)").text();
        $(".mw-parser-output > table:nth-child(9) > tbody > tr").each(
          (u, i) => {
            let _doto = [];
            $(i)
              .find("td")
              .each((o, p) => {
                _doto.push($(p).text().trim());
              });
            if (_doto.length === 0) return;
            atributes.push({
              attribute: _doto[0],
              level_1: _doto[1],
              level_15: _doto[2],
              growth: _doto.pop(),
            });
          },
        );
        $(
          "div.pi-item.pi-data.pi-item-spacing.pi-border-color > div.pi-data-value.pi-font",
        ).each((i, u) => {
          rill.push($(u).text().trim());
        });
        $(
          "aside.portable-infobox.pi-background.pi-border-color.pi-theme-wikia.pi-layout-default",
        ).each((i, u) => {
          rull.push($(u).html());
        });
        const _$ = cheerio.load(rull[1]);
        _$(".pi-item.pi-data.pi-item-spacing.pi-border-color").each((l, m) => {
          rell.push(_$(m).text().trim().replace(/\n/g, ":").replace(/\t/g, ""));
        });
        const result = rell.reduce((acc, curr) => {
          const [key, value] = curr.split("::");
          acc[key] = value;
          return acc;
        }, {});
        let anu = {
          hero_img: hero_img,
          desc: desc,
          release: rill[0],
          role: rill[1],
          specialty: rill[2],
          lane: rill[3],
          price: rill[4],
          gameplay_info: {
            durability: rill[5],
            offense: rill[6],
            control_effect: rill[7],
            difficulty: rill[8],
          },
          story_info_list: result,
          story_info_array: rell,
          attributes: atributes,
        };
        resolve(anu);
      } else if (status === 400) {
        resolve({
          mess: "hh",
        });
      }
      console.log(status);
    } catch (err) {
      resolve({
        mess: "asu",
      });
    }
  });
}