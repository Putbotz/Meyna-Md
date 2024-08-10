const ytdl = require('ytdl-core');
const fs = require('fs');
const search = require('yt-search');
const { generateWAMessageContent, proto, generateWAMessageFromContent } = require("@whiskeysockets/baileys");

let sentVideos = [];

let handler = async (m, { conn, text, command }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* .${command} rewrite the star`, m);

  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  try {
    let searchResults = await search(text);
    let videoId = searchResults.videos[0].videoId;
    let info = await ytdl.getInfo(videoId);
    let title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

    if (sentVideos.includes(title)) {
      let newVideoId = '';
      for (let i = 0; i < searchResults.videos.length; i++) {
        if (!sentVideos.includes(searchResults.videos[i].title)) {
          newVideoId = searchResults.videos[i].videoId;
          break;
        }
      }
      if (!newVideoId) {
        return m.reply('🐱 No more videos available with the same title');
      }
      videoId = newVideoId;
      info = await ytdl.getInfo(videoId);
      title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    }

    let format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'videoandaudio' });
    let video = ytdl(videoId, { format });

    let fileSize = 0;
    video.on('data', (chunk) => {
      fileSize += chunk.length;
      if (fileSize > 500 * 1024 * 1024) {
        video.destroy();
        fs.unlinkSync(`${title}.mp4`);
        m.reply('The video you requested is over 50MB');
      }
    });

    video.pipe(fs.createWriteStream(`${title}.mp4`)).on('finish', async () => {
      try {
        let buffer = fs.readFileSync(`${title}.mp4`);
        let msg = await generateWAMessageContent({
          video: buffer
        }, {
          upload: conn.waUploadToServer
        });

        let ptv = await generateWAMessageFromContent(m.chat, proto.Message.fromObject({ ptvMessage: msg.videoMessage }), { userJid: m.chat, quoted: m })
        await conn.relayMessage(m.chat, ptv.message, { messageId: ptv.key.id });
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})
        fs.unlinkSync(`${title}.mp4`);

        sentVideos.push(title);
        if (sentVideos.length > 10) {
          sentVideos.shift();
        }
      } catch (e) {
        console.log(e);
        m.reply(`An error occurred while sending the video: ${e.message}`);
      }
    });
  } catch (e) {
    console.log(e);
    m.reply(`An error occurred while downloading the video: ${e.message}`);
  }
};

handler.help = ['playvidio'].map(v => v + ' *<teks>*');
handler.tags = ['downloader'];
handler.command = /^(playvidio|playvideo|playvid)$/i;

module.exports = handler;