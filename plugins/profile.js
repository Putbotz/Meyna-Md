let fetch = require("node-fetch");
let canvafy = require ('canvafy')
let levelling = require('../lib/levelling')

let handler = async (m, { conn, command }) => {
  try {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    else who = m.quoted.sender ? m.quoted.sender : m.sender;

    let ppUrl = await conn.profilePictureUrl(who, 'image').catch((_) => "https://telegra.ph/file/59bb57ffc5a86f2036055.jpg");
    let pp = await (await fetch(ppUrl)).buffer();

    let user = global.db.data.users[who];
    let username = user.name;
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    let curr = user.exp - min
    let limit = user.premium ? '∞' : user.limit; // Mengubah limit user premium menjadi 'Infinity' jika pengguna adalah premium
    let balance = user.money > 9999999999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.money;
    let saldo = user.saldo; // Mengubah balance user yang lebih dari 999999999 menjadi 'Infinity'
    let level = user.level > 9999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.level; // Mengubah level pengguna yang lebih dari 9999 menjadi 'Infinity'
    let role = user.role;
    let skill = user.skill;
    let rank = user.owner ? 'Immortality' : user.premium ? 'Sepuh' : 'Kroco'; // Menambahkan 'Not Found' jika rank tidak terdefinisi
    let point = user.point
    let age = user.age > 4000 ? 'Unknown' : user.age;
    let isPremium = user.premium ? "Premium" : "Free User";
    let isVip = user.vip ? "Yes" : "Free User";
    let agama = user.agama ? user.agama : "Ateis";
    let premiumExpired = user.premium ? new Date(user.premiumDate).toDateString() : "Not Found";
    let vipExpired = user.vip ? new Date(user.vipDate).toDateString() : "Not Found";
    let pasangan = user.pasangan ? global.db.data.users[user.pasangan].name : 'Not Have'; // Mengambil nama pasangan dari database
    let guild = user.guild ? global.db.data.users[user.guild].name : 'Not Join'; // Mengambil info guild dari database
    let banned = user.banned ? true : false;
    let sahabat = user.sahabat ? '' + global.db.data.users[user.sahabat].name : 'Not Have';
    
    let caption = '*U S E R - P R O F I L E*\n\n'
    caption += '```Name:```' + ` ${username}\n`
    caption += '```Agama:```' + ` ${agama}\n`
    caption += '```Age:```' + ` ${age}\n`
    caption += '```Rank:```' + ` ${rank}\n`
    caption += '```Level:```' + ` ${level}\n`
    caption += '```Saldo:```' + ` ${formatRupiah(saldo)}\n`
    caption += '```Point:```' + ` ${toRupiah(point)}\n`
    caption += '```Limit:```' + ` ${limit}\n\n`   
    caption += '*U S E R - S T A T U S*\n\n'
    caption += '```Banned:```' + ` ${banned ? 'Yes' : 'No'}\n`
    caption += '```Pasangan:```' + ` ${pasangan.split`@`[0]}\n`
    caption += '```Sahabat:```' + ` ${sahabat}\n`
    caption += '```Status:```' + ` ${isPremium}\n`
    caption += '```PremExpired:```' + ` ${premiumExpired}\n\n`
    caption += '*R P G - S T A T U S*\n\n'
    caption += '```Healt:```' + ` ${user.health}%\n`
    caption += '```Stamina:```' + ` ${user.stamina}%\n`
    caption += '```Money:```' + ` ${Func.h2k(user.money)} ( Rp ${toRupiah(user.money)} )\n`
    caption += '```Role:```' + ` ${role}\n`
    caption += '```Guild:```' + ` ${guild}`
    conn.sendMessage(m.chat, {
    text: caption.trim(), 
    contextInfo: {
    mentionedJid: [m.sender],
    externalAdReply: {
    title: 'DCODEKEMII',
    body: 'Version: 3.0.1',
    thumbnailUrl: ppUrl,
    mediaType: 1,
    renderLargerThumbnail: true
    }}}, {quoted: m})
  } catch {
    let sender = m.sender;;
    let ppUrl = await conn.profilePictureUrl(sender, 'image').catch((_) => "https://telegra.ph/file/59bb57ffc5a86f2036055.jpg");
    let pp = await (await fetch(ppUrl)).buffer();

    let user = global.db.data.users[sender];
    let username = user.name;
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    let curr = user.exp - min
    let limit = user.premium ? '∞' : user.limit; // Mengubah limit user premium menjadi 'Infinity' jika pengguna adalah premium
    let balance = user.money > 9999999999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.money; // Mengubah balance user yang lebih dari 999999999 menjadi 'Infinity'
    let saldo = user.saldo; 
    let level = user.level > 9999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.level; // Mengubah level pengguna yang lebih dari 9999 menjadi 'Infinity'
    let role = user.role;
    let skill = user.skill;
    let rank = user.owner ? 'Immortality' : user.premium ? 'Sepuh' : 'Kroco'; // Menambahkan 'Not Found' jika rank tidak terdefinisi
    let point = user.point
    let age = user.age > 4000 ? 'Unknown' : user.age;
    let isPremium = user.premium ? "Premium" : "Free User";
    let isVip = user.vip ? "Yes" : "Free User";
    let agama = user.agama ? user.agama : "Ateis";
    let premiumExpired = user.premium ? new Date(user.premiumDate).toDateString() : "Not Found";
    let vipExpired = user.vip ? new Date(user.vipDate).toDateString() : "Not Found";
    let pasangan = user.pasangan ? global.db.data.users[user.pasangan].name : 'Not Have'; // Mengambil nama pasangan dari database
    let guild = user.guild ? global.db.data.users[user.guild].name : 'Not Join'; // Mengambil info guild dari database
    let banned = user.banned ? true : false;
    let sahabat = user.sahabat ? '' + global.db.data.users[user.sahabat].name : 'Not Have';

    let caption = '*U S E R - P R O F I L E*\n\n'
    caption += '```Name:```' + ` ${username}\n`
    caption += '```Agama:```' + ` ${agama}\n`
    caption += '```Age:```' + ` ${age}\n`
    caption += '```Rank:```' + ` ${rank}\n`
    caption += '```Level:```' + ` ${level}\n`
    caption += '```Saldo:```' + ` ${formatRupiah(saldo)}\n`
    caption += '```Point:```' + ` ${toRupiah(point)}\n`
    caption += '```Limit:```' + ` ${limit}\n\n`   
    caption += '*U S E R - S T A T U S*\n\n'
    caption += '```Banned:```' + ` ${banned ? 'Yes' : 'No'}\n`
    caption += '```Pasangan:```' + ` ${pasangan.split`@`[0]}\n`
    caption += '```Sahabat:```' + ` ${sahabat}\n`
    caption += '```Status:```' + ` ${isPremium}\n`
    caption += '```PremExpired:```' + ` ${premiumExpired}\n\n`
    caption += '*R P G - S T A T U S*\n\n'    
    caption += '```Healt:```' + ` ${user.health}%\n`
    caption += '```Stamina:```' + ` ${user.stamina}%\n`
    caption += '```Money:```' + ` ${Func.h2k(user.money)} ( Rp ${toRupiah(user.money)} )\n`
    caption += '```Role:```' + ` ${role}\n`    
    caption += '```Guild:```' + ` ${guild}`    
    conn.sendMessage(m.chat, {
    text: caption.trim(), 
    contextInfo: {
    mentionedJid: [m.sender],
    externalAdReply: {
    title: 'DCODEKEMII',
    body: 'Version: 3.0.1',
    thumbnailUrl: ppUrl,
    mediaType: 1,
    renderLargerThumbnail: true
    }}}, {quoted: m})
}
};

handler.command = /^(profile|me)$/i
handler.help = ['profile *@user*'];
handler.tags = ['start'];
handler.register = true;

module.exports = handler;

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

function formatRupiah(number) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
}