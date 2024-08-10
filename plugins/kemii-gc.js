// Kemii Cantik
// Sab, 15 Jun - 01.25

let { generateWAMessageFromContent, proto, prepareWAMessageMedia, extractImageThumb } = require("@whiskeysockets/baileys")

let handler = async (m, {
 conn, 
 command, 
 usedPrefix, 
 args }) => {
         try {
         if (!args || !args[0]) return
         if (command == 'gc') {
            let jid = args[0]
            let rows = [{
               title: 'STAY 1 DAY',
               id: `${usedPrefix}modify ${jid} 1D`,
               description: ``
            }, {
               title: 'STAY 1 WEEK',
               id: `${usedPrefix}modify ${jid} 7D`,
               description: ``
            }, {
               title: 'STAY 1 MONTH',
               id: `${usedPrefix}modify ${jid} 30D`,
               description: ``
            }, {
               title: 'STAY FOREVER',
               id: `${usedPrefix}modify ${jid} 1`,
               description: ``
            }, {
               title: 'GET LINK',
               id: `${usedPrefix}modify ${jid} 2`,
               description: ``
            }, {
               title: 'LEAVE',
               id: `${usedPrefix}modify ${jid} 3`,
               description: ``
            }, {
               title: 'MUTE',
               id: `${usedPrefix}modify ${jid} 4`,
               description: ``
            }, {
               title: 'UNMUTE',
               id: `${usedPrefix}modify ${jid} 5`,
               description: ``
            }, {
               title: 'CLOSE',
               id: `${usedPrefix}modify ${jid} 6`,
               description: ``
            }, {
               title: 'OPEN',
               id: `${usedPrefix}modify ${jid} 7`,
               description: ``
            }, {
               title: 'RESET TIME',
               id: `${usedPrefix}modify ${jid} 8`,
               description: ``
            }]         
            let pp = './src/avatar_contact.png'
            try {
            pp = await conn.profilePictureUrl(jid, 'image')
            } catch (e) {
            }
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
            text: `Option to set *${await (await conn.groupMetadata(jid)).subject}* group.`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
            text: footer
            }),
            header: proto.Message.InteractiveMessage.Header.create({
            title: 'Powered By Kemii',
            hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: pp } }, { upload: conn.waUploadToServer }))
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
            } else if (command == 'modify') {
            if (!args[1]) return
            let jid = args[0]
            let dial = args[1]
            let groupMetadata = await (await conn.groupMetadata(jid))
            let groupName = groupMetadata.subject
            let groupAdmins = groupMetadata.participants.filter((v) => v.admin !== null).map((i) => i.id)
            let admin = groupAdmins.includes(conn.user.jid)
            let now = new Date() * 1
            if (/1D|7D|30D/.test(dial)) {
               let day = 86400000 * parseInt(dial.replace('D', ''))
               global.db.data.chats[jid].expired = now + day
               global.db.data.chats[jid].stay = false
               return conn.reply(m.chat, Func.texted('bold', `🚩 Bot duration is successfully set to stay for ${dial.replace('D', ' day')} di in ${groupName} group.`), m)
            } else if (dial == 1) {
               global.db.data.chats[jid].expired = 0
               global.db.data.chats[jid].stay = true
               return conn.reply(m.chat, Func.texted('bold', `🚩 Successfully set bot to stay forever in ${groupName} group.`), m)
            } else if (dial == 2) {
               if (!admin) return conn.reply(m.chat, Func.texted('bold', `🚩 Can't get ${groupName} group link because the bot is not an admin.`), m)
               conn.reply(m.chat, 'https://chat.whatsapp.com/' + (await conn.groupInviteCode(jid)), m)
            } else if (dial == 3) {
               await conn.reply(jid, `🚩 Good Bye!`, null)
               await conn.groupLeave(jid)
               return conn.reply(m.chat, Func.texted('bold', `🚩 Successfully leave from ${groupName} group.`), m)
            } else if (dial == 4) {
               global.db.data.chats[jid].isBanned = true
               conn.reply(m.chat, Func.texted('bold', `🚩 Bot successfully muted in ${groupName} group.`), m)
            } else if (dial == 5) {
               global.db.data.chats[jid].isBanned = false
               return conn.reply(m.chat, Func.texted('bold', `🚩 Bot successfully unmuted in ${groupName} group.`), m)
            } else if (dial == 6) {
               if (!admin) return conn.reply(m.chat, Func.texted('bold', `🚩 Can't close ${groupName} group link because the bot is not an admin.`), m)
               conn.groupSettingUpdate(jid, 'announcement').then(() => {
                  conn.reply(jid, Func.texted('bold', `🚩 Group has been closed.`)).then(() => {
                     conn.reply(m.chat, Func.texted('bold', `🚩 Successfully close ${groupName} group.`), m)
                  })
               })
            } else if (dial == 7) {
               if (!admin) return conn.reply(m.chat, Func.texted('bold', `🚩 Can't open ${groupName} group link because the bot is not an admin.`), m)
               conn.groupSettingUpdate(jid, 'not_announcement').then(() => {
                  conn.reply(jid, Func.texted('bold', `🚩 Group has been opened.`)).then(() => {
                     conn.reply(m.chat, Func.texted('bold', `🚩 Successfully open ${groupName} group.`), m)
                  })
               })
            } else if (dial == 8) {
               global.db.data.chats[jid].expired = 0
               global.db.data.chats[jid].stay = false
               conn.reply(m.chat, Func.texted('bold', `🚩 Duration of bot in the ${groupName} group has been successfully reset.`), m)
            }
         }
      } catch (e) {
         conn.reply(m.chat, Func.jsonFormat(e), m)
      }
}
handler.command = ["gc","modify"]
handler.owner = true
module.exports = handler