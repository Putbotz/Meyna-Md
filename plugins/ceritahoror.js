// Kemii Cantik
// Jum, 24 Mei - 13.56

let handler = async (m, { conn }) => {
await m.react('🕒')  
let hasil = await ceritahantu()
let kemii = hasil[Math.floor(Math.random() * hasil.length)];
let text = `${kemii.title}\n\n`
text += '```Snippet:```\n'
text += kemii.snippet
await conn.sendMessage(m.chat, {
text: text,
contextInfo: {
externalAdReply: {
title: 'DCODEKEMII',
body: 'Version: 3.0.1',
thumbnailUrl: kemii.image,
sourceUrl: kemii.url,
mediaType: 1,
renderLargerThumbnail: true
}}}, {quoted: m})
await m.react('')
}
handler.help = ['ceritahoror']
handler.tags = ['internet','fun']
handler.command = /^ceritahoror$/i

module.exports = handler

async function ceritahantu() {
  const response = await axios.get(
    "https://cerita-hantu-nyata.blogspot.com/search?q=Kentang&m=1",
  );
  const $ = cheerio.load(response.data);

  const popularPosts = [];

  $(".item-content").each((index, element) => {
    const post = {};
    post.title = $(element).find(".item-title a").text();
    post.snippet = $(element).find(".item-snippet").text().trim();
    post.image = $(element).find(".item-thumbnail img").attr("src");
    post.url = $(element).find(".item-title a").attr("href");
    popularPosts.push(post);
  });

  return popularPosts;
}