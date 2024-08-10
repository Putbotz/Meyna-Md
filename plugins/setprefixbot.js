let handler = async (m, {
    text,
    command,
    usedPrefix
}) => {
    if (!text || !/^\d$/.test(text)) return m.reply(`• *Example :* ${usedPrefix + command} 1`)

    const isNoPrefix = text === '1';
    const isMultiPrefix = text === '2';

    if (!isNoPrefix && !isMultiPrefix) return m.reply(`Prefix yang Anda masukkan tidak valid. Pilihan tersedia: 1 (no), 2 (multi)`)

    global.opts['noprefix'] = isNoPrefix ? true : false;
    global.opts['multiprefix'] = isMultiPrefix ? true : false;

    await m.reply(`Prefix telah diubah ke *${isNoPrefix ? 'no' : 'multi'}*`)
}

handler.help = ['setprefix'].map(v => v + ' *<text>*')
handler.tags = ['owner']
handler.command = /^(setprefix)$/i
handler.rowner = true

module.exports = handler