let ytdl = require('ytdl-core');
let fs = require('fs');
let { pipeline } = require('stream');
let { youtubedl } = require('@bochilteam/scraper-sosmed');
let { y2mate } = require('../lib/y2mate.js');
let { promisify } = require('util');
let os = require('os');
let yts = require('yt-search');
let streamPipeline = promisify(pipeline);

function trimYouTubeUrl(url) {
  return url.split("?")[0];
}

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} Tentang Perasaanku`, m);
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
  let edit = await m.reply(`_Searching Music From: *${text}*_`);
  
  try {
    let trimmedUrl = trimYouTubeUrl(text);
    let search = await yts(trimmedUrl);
    let vid = search.videos[0];
    let { title, timestamp, views, url } = vid;
    let audioStream = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });
    let tmpDir = os.tmpdir();
    let writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
    await streamPipeline(audioStream, writableStream);

    let capt = '```Successfully Get Music Data```\n\n';
    capt += `\`\`\`- Title: ${title}\`\`\`\n`;
    capt += `\`\`\`- Views: ${Func.h2k(views)}\`\`\`\n`;
    capt += `\`\`\`- Duration: ${timestamp} minute\`\`\`\n`;
    capt += `\`\`\`- Fetching: ${(new Date() - startTime) / 1000} seconds\`\`\``;

    let q = await conn.sendMessage(m.chat, { text: capt, edit: edit });
    let doc = {
      audio: { url: `${tmpDir}/${title}.mp3` },
      mimetype: 'audio/mp4',
      fileName: `${title}`,
    };
    await conn.sendMessage(m.chat, doc, { quoted: q });
    await m.react('');
    fs.unlink(`${tmpDir}/${title}.mp3`, err => {
      if (err) {
        console.error(`Failed to delete audio file: ${err}`);
      } else {
        console.log(`Deleted audio file: ${tmpDir}/${title}.mp3`);
      }
    });
  } catch (e) {
    handleAlternativeDownload(m, conn, command, text, usedPrefix, edit);
  }
}

async function handleAlternativeDownload(m, conn, command, text, usedPrefix, edit) {
  try {
    let trimmedUrl = trimYouTubeUrl(text);
    let search = await yts(trimmedUrl);
    let vid = search.videos[0];
    let { title, timestamp, views, url } = vid;
    let yt = await youtubedl(url);
    let data = yt.audio[Object.keys(yt.audio)[0]];

    let capt = '```Successfully Get Music Data```\n\n';
    capt += `\`\`\`- Title: ${title}\`\`\`\n`;
    capt += `\`\`\`- Views: ${Func.h2k(views)}\`\`\`\n`;
    capt += `\`\`\`- Duration: ${timestamp} minute\`\`\`\n`;
    capt += `\`\`\`- Fetching: ${(new Date() - startTime) / 1000} seconds\`\`\``;

    let q = await conn.sendMessage(m.chat, { text: capt, edit: edit });
    let doc = {
      audio: { url: `${data.download()}` },
      mimetype: 'audio/mp4',
      fileName: `${title}`,
    };
    await conn.sendMessage(m.chat, doc, { quoted: q });
    await m.react('');
  } catch (e) {
    handleLastResortDownload(m, conn, command, text, usedPrefix, edit);
  }
}

async function handleLastResortDownload(m, conn, command, text, usedPrefix, edit) {
  try {
    let trimmedUrl = trimYouTubeUrl(text);
    let search = await yts(trimmedUrl);
    let vid = search.videos[0];
    let { title, timestamp, views, url } = vid;
    let yt = await y2mate(url);
    let data = yt.audio['128'].url;

    let capt = '```Successfully Get Music Data```\n\n';
    capt += `\`\`\`- Title: ${title}\`\`\`\n`;
    capt += `\`\`\`- Views: ${Func.h2k(views)}\`\`\`\n`;
    capt += `\`\`\`- Duration: ${timestamp} minute\`\`\`\n`;
    capt += `\`\`\`- Fetching: ${(new Date() - startTime) / 1000} seconds\`\`\``;

    let q = await conn.sendMessage(m.chat, { text: capt, edit: edit });
    let doc = {
      audio: { url: `${data}` },
      mimetype: 'audio/mp4',
      fileName: `${title}`,
    };
    await conn.sendMessage(m.chat, doc, { quoted: q });
    await m.react('');
  } catch (e) {
    m.reply(String(e))
  }
}

handler.help = ['play'].map(v => v + ' *<text>*');
handler.tags = ['music'];
handler.command = /^play$/i;

handler.exp = 0;
handler.limit = false;
handler.register = true;

module.exports = handler;