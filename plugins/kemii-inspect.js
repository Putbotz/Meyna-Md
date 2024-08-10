/*
 * Script By Kemii
 * Forbidden to share and delete my wm
 * Facebook : kemii.houkii
 * Github : dcodekemii
 * Telegram : t.me/dcodekemi
 * Breach : Kemii
 * WhatsApp : wa.me/628816609112
 */

const { getBinaryNodeChildString } = require('@whiskeysockets/baileys');
const linkRegex = /https:\/\/whatsapp\.com\/channel\/([0-9A-Za-z]*)/i;

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let [_, code] = text.match(linkRegex) || [];
    if (!code) throw `• *Example :* ${usedPrefix + command} https://whatsapp.com/channel/xxxxx`;

    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});
    try {
    let result = await newsletterInviteInfo(code);
    let thumbnailUrl = result.profileUrl;
    result.creation = new Date(result.creation).toISOString().replace('T', ' ').split('.')[0];
    result.subjectTime = new Date(result.subjectTime).toISOString().replace('T', ' ').split('.')[0];
    delete result.profileUrl;

    if (result.settings['[object Promise]']) {
        result.settings = "Reaction Codes"
    }
    let settings = result.settings;

    let capt = 'SHOW INFORMATION CHANNEL\n\n';
    capt += `ID : ${result.id}\n`;
    capt += `Name : ${result.subject}\n`;
    capt += `Dibuat Pada : ${result.creation}\n`;
    capt += `Subject Diubah : ${result.subjectTime}\n`;
    capt += `Followers : ${result.followers ? Func.formatter(result.followers) : 'Tidak Diketahui'}\n`;
    capt += `Status : ${result.status}\n`;
    capt += `Settings : ${result.settings}\n`;
    capt += `Verifed : ${result.verified}\n`;
    capt += `Description : ${result.desc}`;

    await conn.sendMessage(m.chat, { image: { url: thumbnailUrl }, caption: capt }, { quoted: m })
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key }});
    } catch (error) {
    await m.reply(String(error))
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key }});
    }
};

handler.command = ["inspect"];
handler.tags = ["hengker"];
handler.help = ["inspect *<text>*"];
handler.register = true;
handler.limit = 50;

module.exports = handler;

async function toUpper(str) {
    return str.toUpperCase();
}

const extractNewsLetter = async (data = {}) => {
    const parseSetting = settings => {
        const entries = Object.entries(settings);
        const transformedSettings = entries.reduce((acc, [key, value]) => {
            acc[toUpper(key.replace(/_/g, ' '))] = typeof value === 'object' ? !!value.value : value;
            return acc;
        }, {});
        return Object.fromEntries(Object.entries(transformedSettings));
    };

    return {
        id: data.id,
        inviteCode: data.thread_metadata.invite,
        subject: data.thread_metadata.name?.text || '',
        subjectTime: Number(data.thread_metadata.name?.update_time / 1000) || 0,
        status: data.state.type || false,
        creation: Number(data.thread_metadata.creation_time * 1000),
        desc: data.thread_metadata.description?.text || '',
        descTime: Number(data.thread_metadata.description?.update_time / 1000) || 0,
        settings: (data.thread_metadata.settings && parseSetting(data.thread_metadata.settings)) || null,
        followers: Number(data.thread_metadata.subscribers_count) || false,
        verified: /verified/i.test(data.thread_metadata.verification) || false,
        profileUrl: data.thread_metadata.picture ? 'https://pps.whatsapp.net' + data.thread_metadata.picture.direct_path : 'https://pps.whatsapp.net' + data.thread_metadata.preview.direct_path || false,
    };
};

async function newsletterInviteInfo(code) {
    let payload = {
        variables: {
            input: {
                key: code,
                type: 'INVITE',
                view_role: 'GUEST',
            },
            fetch_viewer_metadata: false,
            fetch_full_image: true,
            fetch_creation_time: true,
        },
    };

    let data = await conn.query({
        tag: 'iq',
        attrs: {
            id: conn.generateMessageTag(),
            to: '@s.whatsapp.net',
            type: 'get',
            xmlns: 'w:mex',
        },
        content: [
            {
                tag: 'query',
                attrs: {
                    query_id: '6620195908089573',
                },
                content: Buffer.from(JSON.stringify(payload)),
            },
        ],
    });

    let result = JSON.parse(getBinaryNodeChildString(data, 'result'));
    return extractNewsLetter(result.data.xwa2_newsletter);
}