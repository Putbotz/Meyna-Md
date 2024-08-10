const { Converter } = new(require('@neoxr/wb'))
const WebSocket = require("ws")
const handler = async (m, {
   command,
   usedPrefix
}) => {
   try {
      if (!m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Reply audio to use this command.`), m)
      let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
      if (/audio/.test(mime)) {
         await m.react('🕒')
         client.reply(m.chat, '*Process is very long, please wait 3 minutes+ !*', m)
         const buff = await m.quoted.download()
        const aud = await Instrument(buff)

      client.sendMessage(m.chat, { audio: { url: aud.vocal}, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0,3,58,44,35,32,2,4,31,35,44,34,48,13,0,54,49,40,1,44,50,51,16,0,3,40,39,46,3,42,38,44,46,0,0,47,0,0,46,19,20,48,43,49,0,0,39,40,31,18,29,17,25,37,51,22,37,34,19,11,17,12,16,19] }, { quoted: m }).then(() => client.sendMessage(m.chat, { audio: { url: aud.instrument}, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0,3,58,44,35,32,2,4,31,35,44,34,48,13,0,54,49,40,1,44,50,51,16,0,3,40,39,46,3,42,38,44,46,0,0,47,0,0,46,19,20,48,43,49,0,0,39,40,31,18,29,17,25,37,51,22,37,34,19,11,17,12,16,19] }, { quoted: m }))
      } else {
         client.reply(m.chat, Func.texted('bold', `🚩 Reply audio to use this command.`), m)
      }
   } catch (e) {
      console.log(e)
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}
handler.command = ["moise"]
handler.tags = ["tools"]
handler.help = ["moise *<audio>*"]
module.exports = handler

async function generateRandomLetters(length) {
  let result = ''
  const alphabetLength = 26

  for (let i = 0; i < length; i++) {
    const randomValue = Math.floor(Math.random() * alphabetLength)
    const randomLetter = String.fromCharCode('a'.charCodeAt(0) + randomValue)
    result += randomLetter
  }

  return result
}

async function Instrument(audio) {
  return new Promise(async (resolve, reject) => {
    let result = {}
    let name = Math.floor(Math.random() * 100000000000000000) + await generateRandomLetters() + '.mp3'
    let send_has_payload = { "fn_index": 0, "session_hash": "6inywdd0rtw" }
    let send_data_payload = {
      "data": [
        {
          "data": "data:audio/mpeg;base64," + audio.toString('base64'),
          "name": name
      }
    ],
      "event_data": null,
      "fn_index": 0,
      "session_hash": "6inywdd0rtw"
    }

    const ws = new WebSocket("wss://yanzbotz-instrument.hf.space/queue/join");
    ws.onopen = function() {
      console.log("Connected to websocket")
    };

    ws.onmessage = async function(event) {
      let message = JSON.parse(event.data);

      switch (message.msg) {
        case 'send_hash':
          ws.send(JSON.stringify(send_has_payload));
          break;

        case 'estimation':
          console.log('Menunggu antrean: ️' + message.rank)
          break;

        case 'send_data':
          console.log('Processing your audio....');
          ws.send(JSON.stringify(send_data_payload));
          break;
        case 'process_completed':
          result.vocal = 'https://yanzbotz-instrument.hf.space/file=' + message.output.data[0].name
          result.instrument = 'https://yanzbotz-instrument.hf.space/file=' + message.output.data[1].name
          break;
      }
    };

    ws.onclose = function(event) {
      if (event.code === 1000) {
        console.log('Process completed️');
      } else {
        console.log('Err : WebSocket Connection Error:\n');
      }
      resolve(result)
      console.log(result)
    };
  })
}