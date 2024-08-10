/*
 * Script By Kemii
 * Forbidden to share and delete my wm
 * Facebook : kemii.houkii
 * Github : dcodekemii
 * Telegram : t.me/dcodekemi
 * Breach : Kemii
 * WhatsApp : wa.me/628816609112
 */

const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys");
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id');

async function before(m) {
    if (m.chat?.endsWith('broadcast') || m.fromMe || m.isGroup) return;
    if (m.text.match(global.prefix)) return;

    try {
        let user = db.data.users[m.sender];
        let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
        let sections = [{
            rows: [
                { title: 'Script', id: '.sc' },
                { title: 'Owner', id: '.owner' },
                { title: 'Menu', id: '.menu' }
            ]
        }];

        let listMessage = {
            title: '‎ ',
            sections
        };

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({}),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: `${moment().format('DD/MM/YY HH:mm:ss')}`
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            title: 'PILIH BUTTON BERIKUT',
                            hasMediaAttachment: true,
                            ...(await prepareWAMessageMedia({ image: { url: pp }}, { upload: conn.waUploadToServer }))
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
        }, { userJid: m.chat, quoted: m });

        if (new Date() - user.pc < 21600000) return;
        this.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
        user.pc = Date.now();
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    before,
};