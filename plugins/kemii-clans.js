/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

const { createCanvas } = require("canvas");

let handler = async (m, { conn, text, usedPrefix }) => {
  let [command, ...params] = text.toLowerCase().split(' ');
  let capt = params.join(' ').trim();
  let button = new Button()

  const getClanLeader = (cid) => {
    for (let jid in global.db.data.users) {
      if (global.db.data.users[jid].cid === cid && global.db.data.users[jid].cleader === 'true') {
        return jid;
      }
    }
    return null;
  };
    

  switch (command) {
    case 'create':
     if(!capt) return m.reply(`• *Example :* ${usedPrefix}clans create Backend`)
      let id = Func.makeId(5)
      let images = await canvas(capt)
      let profile = await upload(images)
      global.db.data.users[m.sender].cname = capt;
      global.db.data.users[m.sender].cid = id;
      global.db.data.users[m.sender].cleader = 'true';
      global.db.data.users[m.sender].cprofile = profile
      global.db.data.users[m.sender].catm = 0;
      global.db.data.clans = global.db.data.clans || {};
      global.db.data.clans[cid] = { requests: [] };      
      let ads = button.setBody(`Clan ${capt} berhasil dibuat dengan ID: ${id}`)
      ads += button.setImage(images)
      ads += button.addCopy('ID - CLANS',`${id}`)
      ads += button.run(m.chat, conn, m)
      break;

    case 'setprofile':
      if (global.db.data.users[m.sender].cleader !== 'true') {
        conn.reply(m.chat, '*❌ Anda bukan leader clan*', m);
        return;
      }
      global.db.data.users[m.sender].cprofile = params.join(' ');
      conn.reply(m.chat, `Profile clan berhasil diubah`, m);
      break;

    case 'info':
      let cidInfo = global.db.data.users[m.sender].cid;
      if (!cidInfo) {
        conn.reply(m.chat, '*❌ Anda belum bergabung dengan clan manapun*', m);
        return;
      }
      let clanProfile = '';
      let clanMembers = [];
      for (let jid in global.db.data.users) {
        if (global.db.data.users[jid].cid === cidInfo) {
          if (global.db.data.users[jid].cleader === 'true') {
            clanProfile += `@${jid.split('@')[0]} (Leader)\n`;
          } else {
            clanProfile += `@${jid.split('@')[0]} (Member)\n`;
          }
          clanMembers.push(jid);
        }
      }
      clanProfile += `Clan Money: ${global.db.data.users[m.sender].catm}\nProfile: ${global.db.data.users[m.sender].cprofile}`;
      conn.reply(m.chat, clanProfile, m, {
        contextInfo: {
          mentionedJid: clanMembers
        }
      });
      break;

    case 'setleader':
      if (global.db.data.users[m.sender].cleader !== 'true') {
        conn.reply(m.chat, '*❌ Anda bukan leader clan*', m);
        return;
      }
      let newLeader = conn.parseMention(params.join(' '))[0];
      if (!newLeader) {
        conn.reply(m.chat, '*❌ Pengguna tidak ditemukan*', m);
        return;
      }
      global.db.data.users[newLeader].cleader = 'true';
      global.db.data.users[m.sender].cleader = 'false';
      global.db.data.users[newLeader].cid = global.db.data.users[m.sender].cid;

      conn.reply(m.chat, `Leader clan berhasil diubah`, m);
      break;

    case 'join':
      let idclan = params.join(' ').trim();
      let leaderJid = getClanLeader(idclan);
      if (!leaderJid) {
        conn.reply(m.chat, '*❌ Clan tidak ditemukan atau tidak ada leader*', m);
        return;
      }

      global.db.data.clans[idclan].requests.push(m.sender);
      conn.reply(leaderJid, `Halo Leader, User ${conn.getName(m.sender)} (@${m.sender.split('@')[0]}) ingin join clan Anda. Ketik .clan accept untuk menerimanya`, m)
      setTimeout(() => {
        let index = global.db.data.clans[idclan].requests.indexOf(m.sender);
        if (index > -1) {
          global.db.data.clans[idclan].requests.splice(index, 1);
        }
      }, 120000);
      break;

    case 'accept':
      if (global.db.data.users[m.sender].cleader !== 'true') {
        conn.reply(m.chat, '*❌ Anda bukan leader clan*', m);
        return;
      }
      let clanId = global.db.data.users[m.sender].cid;
      if (!clanId || !global.db.data.clans[clanId] || !global.db.data.clans[clanId].requests.length) {
        conn.reply(m.chat, '*❌ Tidak ada permintaan bergabung yang tertunda*', m);
        return;
      }
      let newMember = global.db.data.clans[clanId].requests.shift();
      global.db.data.users[newMember].cid = clanId;
      global.db.data.users[newMember].cleader = 'false';

      conn.reply(m.chat, `Permintaan join dari ${conn.getName(newMember)} (@${newMember.split('@')[0]}) diterima`, m);
      break;

    case 'atm':
      let clanMoney = global.db.data.users[m.sender].catm || 0;
      conn.reply(m.chat, `ATM Clan: ${clanMoney}`, m);
      break;

    case 'deposit':
      let depositAmount = parseInt(params.join(' '));
      if (isNaN(depositAmount) || depositAmount <= 0) {
        conn.reply(m.chat, '*❌ Jumlah deposit tidak valid*', m);
        return;
      }
      if (global.db.data.users[m.sender].money < depositAmount) {
        conn.reply(m.chat, '*❌ Uang kamu tidak cukup untuk deposit*', m);
        return;
      }
      global.db.data.users[m.sender].money -= depositAmount;
      global.db.data.users[m.sender].catm = (global.db.data.users[m.sender].catm || 0) + depositAmount;

      conn.reply(m.chat, `Deposit berhasil`, m);
      break;

    case 'narik':
      let withdrawAmount = parseInt(params.join(' '));
      if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        conn.reply(m.chat, '*❌ Jumlah penarikan tidak valid*', m);
        return;
      }
      if (global.db.data.users[m.sender].catm < withdrawAmount) {
        conn.reply(m.chat, '*❌ Uang clan tidak cukup untuk ditarik*', m);
        return;
      }
      global.db.data.users[m.sender].money += withdrawAmount;
      global.db.data.users[m.sender].catm -= withdrawAmount;

      conn.reply(m.chat, `Penarikan berhasil`, m);
      break;

    case 'rename':
      if (global.db.data.users[m.sender].cleader !== 'true') {
        conn.reply(m.chat, '*❌ Anda bukan leader clan*', m);
        return;
      }
      let newName = params.join(' ').trim();
      let newCid = crypto.createHash('md5').update(newName).digest('hex');
      for (let jid in global.db.data.users) {
        if (global.db.data.users[jid].cid === global.db.data.users[m.sender].cid) {
          global.db.data.users[jid].cid = newCid;
          if (global.db.data.users[jid].cleader === 'true') {
            global.db.data.users[jid].cname = newName;
          }
        }
      }
      global.db.data.clans[newCid] = global.db.data.clans[global.db.data.users[m.sender].cid];
      delete global.db.data.clans[global.db.data.users[m.sender].cid];

      conn.reply(m.chat, `Nama clan berhasil diubah`, m);
      break;

    case 'remove':
      if (global.db.data.users[m.sender].cleader !== 'true') {
        conn.reply(m.chat, '*❌ Anda bukan leader clan*', m);
        return;
      }
      let removeCid = global.db.data.users[m.sender].cid;
      let memberCount = 0;
      let clanMoneyToDistribute = global.db.data.users[m.sender].catm || 0;
      let clanMembersToDistribute = [];
      for (let jid in global.db.data.users) {
        if (global.db.data.users[jid].cid === removeCid) {
          memberCount++;
          clanMembersToDistribute.push(jid);
          global.db.data.users[jid].cname = '';
          global.db.data.users[jid].cid = '';
          global.db.data.users[jid].cleader = '';
        }
      }
      let distributedMoney = Math.floor(clanMoneyToDistribute / memberCount);
      clanMembersToDistribute.forEach(jid => {
        global.db.data.users[jid].money += distributedMoney;
      });
      delete global.db.data.clans[removeCid];

      conn.reply(m.chat, `Clan berhasil dihapus`, m);
      break;

    case 'leave':
      let leaveCid = global.db.data.users[m.sender].cid;
      if (!leaveCid) {
        conn.reply(m.chat, '*❌ Anda belum bergabung dengan clan manapun*', m);
        return;
      }
      global.db.data.users[m.sender].cid = '';
      global.db.data.users[m.sender].cleader = '';

      conn.reply(m.chat, `Anda berhasil keluar dari clan`, m);
      break;

    case 'kick':
      if (global.db.data.users[m.sender].cleader !== 'true') {
        conn.reply(m.chat, '*❌ Anda bukan leader clan*', m);
        return;
      }
      let memberToKick = conn.parseMention(params.join(' '))[0];
      if (!memberToKick || global.db.data.users[memberToKick].cid !== global.db.data.users[m.sender].cid) {
        conn.reply(m.chat, '*❌ Pengguna tidak ditemukan atau bukan member clan Anda*', m);
        return;
      }
      global.db.data.users[memberToKick].cid = '';
      global.db.data.users[memberToKick].cleader = '';

      conn.reply(m.chat, `Member ${conn.getName(memberToKick)} berhasil di-kick dari clan`, m);
      break;

    default:
      conn.reply(m.chat, `*❌ Perintah tidak ditemukan. Ketik ${usedPrefix}help untuk melihat daftar perintah*`, m);
  }
};

handler.help = ['clans create', 'clans setprofile', 'clans info', 'clans setleader', 'clans join', 'clans accept', 'clans atm', 'clans deposit', 'clans narik', 'clans rename', 'clans remove', 'clans leave', 'clans kick'];
handler.tags = ['clans'];
handler.command = /^(clans)$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;

async function canvas(text) {
const canvasWidth = 2560;
const canvasHeight = 1440;

// Membuat canvas
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext("2d");

// Menggambar background hitam
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

// Menggambar teks di tengah gambar (sedikit lebih besar)
const textCenter = text.toUpperCase()
ctx.font = "bold 250px Arial"; // Ukuran teks di tengah menjadi 200px
ctx.fillStyle = "#fff";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(textCenter, canvasWidth / 2, canvasHeight / 2);

// Menggambar teks di tengah bawah (lebih kecil)
const textBottom = '@dcodekemii';
ctx.font = "bold 60px Arial"; // Ukuran teks di bawah menjadi 50px
ctx.fillStyle = "#fff";
ctx.textAlign = "center"; // Teks di tengah
ctx.textBaseline = "bottom"; // Teks di bawah
ctx.fillText(textBottom, canvasWidth / 2, canvasHeight - 50); // Menyesuaikan posisi agar tidak terlalu dekat dengan tepi

// Mengirimkan hasil gambar
const buffer = canvas.toBuffer();
return buffer
}