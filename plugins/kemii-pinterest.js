// Kemii Cantik
// Kam, 6 Jun - 12.45

let { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 

let handler = async (m, { conn, text, usedPrefix, command, args }) => {	
  if (!args || args.length < 1) return m.reply(Func.example(usedPrefix, command, "Kikuchanj"));
  let response = args.join(" ").split(" --");
  let query = response[0];
  let count = parseInt(response[1]);
  m.react('🕒')
  if (!count) {
  try {
  let anu = await pinterest(text)
  let kemii = await pickRandom(anu)
  let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
  message: {
  "messageContextInfo": {
  "deviceListMetadata": {},
  "deviceListMetadataVersion": 2
  },
  interactiveMessage: proto.Message.InteractiveMessage.create({
  body: proto.Message.InteractiveMessage.Body.create({
  text: kemii.grid_title
  }),
  footer: proto.Message.InteractiveMessage.Footer.create({
  text: '© 2019 - 2024 | Kikuchanj'
  }),
  header: proto.Message.InteractiveMessage.Header.create({
  hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: kemii.images_url }}, { upload: conn.waUploadToServer }))
  }),
  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
  buttons: [
  {
  "name": "quick_reply",
  "buttonParamsJson": `{"display_text":"Next Search","id": ".${command} ${text}"}`
  }
  ],
  })
  })
  }
  }
  }, { userJid: m.chat, quoted: m })
  await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
  await m.react('')
  } catch (e) {
  conn.reply(m.chat, `❌ Coldown Tunggu Beberapa saat lagi.`, m)
  }
  } else {
  let result = []
  try {
  let hasil = await pinterest(text)
  for (let i = 0; i < count; i++) {
  let image = await pickRandom(hasil)
  result.push({
  body: proto.Message.InteractiveMessage.Body.fromObject({
  }),
  footer: proto.Message.InteractiveMessage.Footer.fromObject({
  }),
  header: proto.Message.InteractiveMessage.Header.fromObject({
  title: `\`\`\`Sending ${i + 1}/${count} Images\`\`\``,
  hasMediaAttachment: true,
  ...(await prepareWAMessageMedia({ image: { url: image.images_url } }, { upload: conn.waUploadToServer }))
  }),
  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
  buttons: []
  })
  })
  }
  const msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
  message: {
  messageContextInfo: {
  deviceListMetadata: {},
  deviceListMetadataVersion: 2
  },
  interactiveMessage: proto.Message.InteractiveMessage.fromObject({
  body: proto.Message.InteractiveMessage.Body.fromObject({
  text: '```Berhasil Mendapatkan Data```',
  }),
  footer: proto.Message.InteractiveMessage.Footer.fromObject({
  text: footer
  }),
  header: proto.Message.InteractiveMessage.Header.fromObject({
  hasMediaAttachment: false
  }),
  carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
  cards: result
  })
  })
  }
  }
  }, { quoted: m })
  await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
  })
  } catch (e) {
  conn.reply(m.chat, `❌ Coldown Tunggu Beberapa saat lagi.`, m)
  }
  }
}

handler.help = ['pinterest *<text>*'];
handler.tags = ['internet', 'downloader'];
handler.command = /^(pinterest|pin)$/i
module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
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
    const results = json.resource_response?.data?.results?? [];
    return results.map(item => ({
      pin: 'https://www.pinterest.com/pin/' + item.id?? '',
      link: item.link?? '',
      created_at: (new Date(item.created_at)).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })?? '',
      id: item.id?? '',
      images_url: item.images?.['736x']?.url?? '',
      grid_title: item.grid_title?? ''
    }));
  } catch (error) {
    console.error('Error mengambil data:', error);
    return [];
  }
}