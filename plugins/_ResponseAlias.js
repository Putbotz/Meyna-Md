/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

const {
    proto,
    generateWAMessage,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    getAggregateVotesInPollMessage,
    areJidsSameUser
} = require('@whiskeysockets/baileys')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

let handler = m => m;

handler.before = async function(m, { conn }) {
	conn.sendAliasMessage = async(jid, mess = {}, alias = {}, quoted = {}) => {
			function check(arr) {
  if (!Array.isArray(arr)) {
    return false;
  }
  if(!arr.length) {
  	return false;
  }
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (typeof item !== 'object' || item === null) {
      return false;
    }
    if (!Object.prototype.hasOwnProperty.call(item, 'alias')) {
      return false;
    }
    if (!Array.isArray(item.alias) && typeof item.alias !== 'string') {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(item, 'response') && typeof item.response !== 'string') {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(item, 'eval') && typeof item.eval !== 'string') {
      return false;
    }
  }
  return true;
}
if(!check(alias)) return "Alias format is not valid!"
let message = await conn.sendMessage(jid, mess, { quoted }) 
if(typeof db.data.respon.alias[jid] === 'undefined') db.data.respon.alias[jid] = {}
			db.data.respon.alias[jid][message.key.id] = { chat: jid, id: message.key.id, alias }
return message
			}
			
			conn.sendInputMessage = async(jid, mess = {}, target = 'all', timeout = 60000, quoted= {}) => {
				let time = Date.now() 
				let message = await conn.sendMessage(jid, mess, { quoted }) 
				if(typeof db.data.respon.input[jid] === 'undefined') db.data.respon.input[jid] = {}
				db.data.respon.input[jid][message.key.id] = { chat: jid, id: message.key.id, target }
				
				while(((Date.now() - time) < timeout) && !db.data.respon.input[jid][message.key.id].hasOwnProperty("input")) await sleep(500) 
				
				return db.data.respon.input[jid][message.key.id].input
				}
				
				m.react = async(emote) => {
				conn.sendMessage(m.chat, { react: { text: emote, key: m.key }})
				}
				
				conn.edit = async(dari, ke) => {
				conn.sendMessage(m.chat, { text: dari, edit: ke })
				}
				
				conn.notify = async(text) => {
                const ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1dff1788814dd281170f8.jpg");
                const contextInfo = {
                mentionedJid: conn.parseMention(text),
	            externalAdReply: {
                title: 'System Notifications', 
                body: `${moment().format('DD/MM/YY HH:mm:ss')}`,
                thumbnailUrl: ppUrl,
                sourceUrl: 'https://instagram.com/dcodekemii',
                mediaType: 1,
                renderLargerThumbnail: false
                }
                }
                let messages = {
                extendedTextMessage: {
                text: text,
                contextInfo: contextInfo
                } 
                }
                let messageToChannel = proto.Message.encode(messages).finish();
                let result = {
                tag: 'message',
                attrs: { to: '120363288101737637@newsletter', type: 'text' },
                content: [
                {
                tag: 'plaintext',
                attrs: {},
                content: messageToChannel
                }
                ]
                };
                return conn.query(result);
                }                
		        conn.sendMessageModify = async (jid, text = '', quoted, additionalInfo, options = {}) => {
  var constants = {
    concat: function (a, b) {
      return a + b;
    },
    baseUrl: "https://telegra.ph/?id="
  };
  
  if (additionalInfo.thumbnail) {
    var { file: thumbnailFile } = additionalInfo.thumbnail
  }
  
  return conn.sendMessage(jid, {
    text: text,
    ...options,
    contextInfo: {
      mentionedJid: await conn.parseMention(text),
      externalAdReply: {
        title: additionalInfo.title || '© 2019 - 2024 | Kikcuhanj',
        body: additionalInfo.body || null,
        mediaType: 1,
        previewType: 0,
        showAdAttribution: !!(additionalInfo.ads && additionalInfo.ads),
        renderLargerThumbnail: !!(additionalInfo.largeThumb && additionalInfo.largeThumb),
        thumbnailUrl: additionalInfo.thumbnail || 'https://telegra.ph/file/59bb57ffc5a86f2036055.jpg',
        sourceUrl: additionalInfo.url || null
      }
    }
  }, {
    quoted: quoted
  });
};

	if(typeof db.data.respon.alias === 'undefined') db.data.respon.alias = {}
	if(typeof db.data.respon.input === 'undefined') db.data.respon.input = {}
	if (m.quoted) {
    const quotedId = m.quoted.id;
    if (db.data.respon.input[m.chat]?.[quotedId]?.target === 'all' || db.data.respon.input[m.chat]?.[quotedId]?.target === m.sender) {
    db.data.respon.input[m.chat][quotedId].input = m.text;
    }
 if(db.data.respon.alias.hasOwnProperty(m.chat)) {
 	if(db.data.respon.alias[m.chat].hasOwnProperty(quotedId)) {
	for (const aliasObj of db.data.respon.alias[m.chat][quotedId].alias) {
            if (Array.isArray(aliasObj.alias) && !aliasObj.alias.map(v => v.toLowerCase()).includes(m.text.toLowerCase())) continue;
            else if (aliasObj.alias.toLowerCase() !== m.text.toLowerCase()) continue;
            else {
                if (aliasObj.response) await appenTextMessage(aliasObj.response, conn, m);
                if (aliasObj.eval) await eval(aliasObj.eval);
            }
        }
    }
  }
}
	}
	
module.exports = handler;

appenTextMessage = async(text, conn, m) => {
        let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
            userJid: conn.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
        messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
        messages.key.id = m.key.id
        messages.pushName = m.pushName
        if (m.isGroup) messages.participant = m.sender
        let msg = {
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        }
        conn.ev.emit('messages.upsert', msg)
    }
    
    async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	async function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH');
    let res = "Malam";
    if (time >= 4) {
        res = "Pagi";
    }
    if (time > 10) {
        res = "Siang";
    }
    if (time >= 15) {
        res = "Sore";
    }
    if (time >= 18) {
        res = "Malam";
    }
    return res;
    }