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
    let kemii = await fetchSpaceXNews()
    
    let teks = `乂  *S P A C E X*\n\n`;
    kemii.data.map((v, i) => {
        teks += `*${i + 1}. ${v.label}*\n`;
        teks += `    ◦  *Published* : ${v.date}\n`;
        teks += `    ◦  *Description* : ${v.contents}\n`;
        teks += `    ◦  *Link* : ${v.imageUrl}\n\n`;
    });    
    conn.sendMessageModify(m.chat, teks, m, {
        largeThumb: true,
        title: 'DCODEKEMII',
        body: 'Version: 3.0.2',
        thumbnail: kemii.data[0].imageUrl
    });
};

handler.tags = ["internet"];
handler.help = ["spacex"];
handler.command = ["spacex"];

handler.register = true;

module.exports = handler;

async function fetchSpaceXNews() {
    try {
        const response = await axios.get('https://www.spacex.com/updates/');
        const $ = cheerio.load(response.data);

        return {
            status: true,
            creator: "dcodekemii",
            data: $('.item')
                .map((index, element) => {
                    // Split the contents into paragraphs
                    let contentsArray = $(element).find('.contents').text().trim().split('\n').filter(paragraph => paragraph.trim() !== '');

                    // Join only the first two paragraphs
                    let trimmedContents = contentsArray.slice(0, 2).join('\n\n');

                    return {
                        date: $(element).find('.date').text().trim(),
                        label: $(element).find('.label').text().trim(),
                        contents: trimmedContents,
                        imageUrl: "https://www.spacex.com/" + $(element).find('.u-fullParent').attr('style').match(/url\(['"]?([^'"\)]+)['"]?\)/)[1]
                    };
                })
                .get()
        };

    } catch (error) {
        throw new Error(`Error fetching SpaceX news: ${error}`);
    }
}