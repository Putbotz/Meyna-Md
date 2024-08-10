// Kemii Cantik
// Jum, 14 Jun - 23.20

let { generateWAMessageFromContent, proto, prepareWAMessageMedia, extractImageThumb } = require("@whiskeysockets/baileys")
let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

let handler = async(m, { conn, usedPrefix, command }) => {

let groupList = async () => Object.entries(await conn.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
  let groups = await groupList()
    let rows = []
      groups.map(x => {
        let v = global.db.data.chats[x.id]
          if (v) {
           rows.push({
            title: x.subject,
             id: `${usedPrefix}gc ${x.id}`,
              description: `[ ${v.stay ? 'FOREVER' : (v.expired == 0 ? 'NOT SET' : Func.timeReverse(v.expired - new Date() * 1))}  | ${x.participants.length} | ${(v.isBanned ? 'OFF' : 'ON')} | ${moment(v.activity).format('DD/MM/YY HH:mm:ss')} ]`
                 })
                   }
          })
           let sections = [{
             rows: rows
              }]
               let listMessage = {
                title: 'Click here!', 
                 sections
                  }
                  let msg = generateWAMessageFromContent(m.chat, {
                   viewOnceMessage: {
                    message: {
                     "messageContextInfo": {
                      "deviceListMetadata": {},
                       "deviceListMetadataVersion": 2
                         },
                          interactiveMessage: proto.Message.InteractiveMessage.create({
                           body: proto.Message.InteractiveMessage.Body.create({
                            text: `Bot has joined to *${groups.length}* groups.`
                             }),
                              footer: proto.Message.InteractiveMessage.Footer.create({
                               text: footer
                                }),
                                 header: proto.Message.InteractiveMessage.Header.create({
                                  title: 'Powered By Kemii',
                                   hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/9a6cef5420c995e08a37a.jpg'} }, { upload: conn.waUploadToServer }))
                                    }),
                                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                   buttons: [
                                  {
                                 "name": "single_select",
                                "buttonParamsJson": JSON.stringify(listMessage) 
                               }
                              ],
                             })
                            })
                           }
                          }
                         }, { userJid: m.chat, quoted: m })
                        await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
}

handler.help = ['grouplist']
handler.tags = ['group']
handler.command = /^(group|listgroups|listgroup|groups|groupslist|grouplist)$/i
handler.owner = true
module.exports = handler