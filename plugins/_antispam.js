/*
 * Script By Kemii
 * Forbidden to share and delete my wm
 * Facebook: kemii.houkii
 * Github: dcodekemii
 * Telegram: t.me/dcodekemi
 * Breach: Kemii
 * WhatsApp: wa.me/628816609112
 */

async function before(m) {
    if ((m.chat.endsWith('broadcast') || m.fromMe) && !m.message && !m.text.match(global.prefix)) return;

    this.spam = this.spam ? this.spam : {};
    let cooldown = 4 * 1000;

    if (m.sender in this.spam) {
        this.spam[m.sender].count++;
        let timeDifference = m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam;

        if (timeDifference < cooldown) {
            m.reply(`Gunakan command lagi setelah ${(cooldown - timeDifference) / 1000} detik`);
            db.data.chats[m.chat].isBanned = true;
            return;
        }

        setTimeout(() => {
            delete this.spam[m.sender];
            db.data.chats[m.chat].isBanned = false;
        }, cooldown);
    } else {
        this.spam[m.sender] = {
            jid: m.sender,
            count: 0,
            lastspam: 0
        };
    }
}

module.exports = {
    before,
};