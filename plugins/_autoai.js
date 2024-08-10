/*
 * Script By Kemii
 * Forbidden to share and delete my wm
 * Facebook : kemii.houkii
 * Github : dcodekemii
 * Telegram : t.me/dcodekemi
 * Breach : Kemii
 * WhatsApp : wa.me/628816609112
 */

const { G4F } = require("g4f");
const Groq = require('groq-sdk');
const g4f = new G4F();
const groq = new Groq({
  apiKey: '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',
});

async function before(m) {
  conn.autoai = conn.autoai ? conn.autoai : {};
  if (!m.quoted || m.isBaileys || m.quoted.sender !== conn.user.jid) return;
  if (!conn.autoai[m.sender]) return;
  await conn.sendPresenceUpdate("composing", m.chat);
  let edit = await m.reply('...');

  const containsTrigger = /carikan|cari/i.test(m.text);

  if (containsTrigger) {
    let edit = await m.reply('Baiklah! Saya carikan dulu (っ◕‿◕)っ');
    let image = await pinterest(m.text);
    let hasil = image[Math.floor(image.length * Math.random())];
    let q = await conn.sendMessage(m.chat, { text: 'Hei! Berhasil mendapatkan data (❁ᴗ͈ˬᴗ͈)', edit: edit });
    await conn.sendFile(m.chat, hasil.images_url, '', hasil.grid_title, q);
    return;
  }

  let messageType = m.quoted.mtype;
  let mime = (m.mtype == 'audioMessage');

  if (!mime) {
    if (m.mtype !== 'conversation' && m.mtype !== 'extendedTextMessage') {
      return;
    }

    if (!global.db.data.openai[m.sender]) global.db.data.openai[m.sender] = [];
    if (global.db.data.openai[m.sender].length >= 70) global.db.data.openai[m.sender] = [];

    let messages = [
      { role: 'assistant', content: require('fs').readFileSync('./system/prompt.txt', 'utf-8') },
      ...(global.db.data.openai[m.sender].map((msg) => ({ role: msg.role, content: msg.content })) || []),
      { role: 'user', content: m.text }
    ];

    let options = {
      provider: g4f.providers.GPT,
      model: "gpt-4-32k-0314",
      debug: true,
    };

    let json = await g4f.chatCompletion(messages, options);
    global.db.data.openai[m.sender].push({ role: 'user', content: m.text });
    global.db.data.openai[m.sender].push({ role: 'assistant', content: json.trim() });
    await conn.sendMessage(m.chat, { text: json.trim(), edit: edit });
  } else {
    let audio = await uploader.catbox(await m.download());
    let url = await downloadFileFromUrl(audio, Func.makeId(2));
    let result = await voiceRecognition(url);

    if (!global.db.data.openai[m.sender]) global.db.data.openai[m.sender] = [];
    if (global.db.data.openai[m.sender].length >= 70) global.db.data.openai[m.sender] = [];

    let messages = [
      { role: 'assistant', content: require('fs').readFileSync('./system/prompt.txt', 'utf-8') },
      ...(global.db.data.openai[m.sender].map((msg) => ({ role: msg.role, content: msg.content })) || []),
      { role: 'user', content: result }
    ];

    let options = {
      provider: g4f.providers.GPT,
      model: "gpt-4-32k-0314",
      debug: true,
    };

    let json = await g4f.chatCompletion(messages, options);
    global.db.data.openai[m.sender].push({ role: 'user', content: result });
    global.db.data.openai[m.sender].push({ role: 'assistant', content: json.trim() });
    await conn.sendMessage(m.chat, { text: json.trim(), edit: edit });
  }
}

async function pinterest(query) {
  const baseUrl = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
  const queryParams = {
    source_url: '/search/pins/?q=' + encodeURIComponent(query),
    data: JSON.stringify({
      options: {
        isPrefetch: false,
        query,
        scope: 'pins',
        no_fetch_context_on_resource: false
      },
      context: {}
    }),
    _: Date.now()
  };
  const url = new URL(baseUrl);
  Object.entries(queryParams).forEach(entry => url.searchParams.set(entry[0], entry[1]));

  try {
    const json = await (await fetch(url.toString())).json();
    const results = json.resource_response?.data?.results ?? [];
    return results.map(item => ({
      pin: 'https://www.pinterest.com/pin/' + item.id ?? '',
      link: item.link ?? '',
      created_at: (new Date(item.created_at)).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) ?? '',
      id: item.id ?? '',
      images_url: item.images?.['736x']?.url ?? '',
      grid_title: item.grid_title ?? ''
    }));
  } catch (error) {
    console.error('Error mengambil data:', error);
    return [];
  }
}

async function downloadFileFromUrl(url, id) {
  const filePath = `./tmp/${id}.mp3`;
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  const writer = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    response.data.pipe(writer);
    let error = null;
    writer.on('error', err => {
      error = err;
      writer.close();
      reject(err);
    });
    writer.on('close', () => {
      if (!error) {
        resolve(filePath);
      }
    });
  });
}

async function voiceRecognition(stream) {
  return new Promise(async (resolve, reject) => {
    try {
      const recog = await groq.audio.transcriptions.create({
        file: fs.createReadStream(stream),
        model: "whisper-large-v3",
        prompt: "you are vielyn and you are a WhatsApp bot, your goal is to help your user to finish their problem. and use Indonesian",
        temperature: 0.35,
        language: "id",
        response_format: "verbose_json",
      });
      resolve(recog.text);
    } catch (v) {
      reject(v);
    }
  });
}

module.exports = {
  before,
};