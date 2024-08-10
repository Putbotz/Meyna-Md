/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

const crypto = require('crypto');
const axios = require('axios');
const { URLSearchParams } = require('url');

let handler = async (m, { conn, isOwner, usedPrefix, command, args, text }) => {
    conn.gateaway = conn.gateaway ? conn.gateaway : {};
    
    if (!text) {
        return m.reply(`• *Example :* ${usedPrefix}${command} 10K - 10000`);
    }
    if (text == 0) {
        return m.reply('Masukan jumlah saldo yang valid.');
    }
    if (conn.gateaway[m.sender]) {
        return m.reply(`Masih ada pembayaran yang belum anda selesaikan. Selesaikan terlebih dahulu jika ingin membuat permintaan baru.`);
    }
    
    let amount = await parseAmount(text);
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

    let gateway = await paydisini(Func.makeId(32), amount);
    let images = await sendQRCode(gateway.qrcode_url);
    
    let capt = `Lakukan Pembayaran Sebesar "Rp ${Func.formatter(gateway.amount)}"\n`;
    capt += `(Sudah Termasuk Biaya Admin)\n\n`;
    capt += `QRIS Berlaku Selama 5 Menit atau Hingga ${gateway.expired}\n\n`;
    capt += '`Jika Sudah Melakukan Pembayaran tetapi Saldo belum masuk, Hubungi owner`\n\n';
    capt += 'Tutorial : \n\n';
    capt += '1. Buka aplikasi yang mendukung pembayaran dengan QRIS\n';
    capt += '2. Pilih fitur QRIS / Bayar\n';
    capt += '3. Pindai kode QR yang diberikan oleh Merchant\n';
    capt += '4. Pastikan tagihan yang ditagihkan sesuai\n';
    capt += '5. Klik tombol Konfirmasi\n';
    capt += '6. Masukkan PIN untuk menyelesaikan pembayaran\n';
    capt += '7. Setelah pembayaran berhasil, kamu akan dialihkan ke Halaman Hasil Pembayaran';
    
    let kemii = await conn.sendFile(m.chat, images, '', capt, m)
    conn.gateaway[m.sender] = m.sender;

    let startTime = Date.now();
    let timeout = 300000;
    let cektrx = "";
    let status = "";

    while (Date.now() - startTime < timeout) {
        cektrx = await paydisinic(gateway.unique_code);
        let match = cektrx.status;
        
        if (match === "Success") {
            status = "sukses";
            break;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (status === "sukses") {   
        await conn.reply(m.chat, `Pembayaran @${m.sender.replace(/@.+/g, '')} Berhasil dilakukan.`, null);  
        users.saldo += Number(amount);    
        await conn.reply(m.chat, `Saldo "Rp ${Func.formatter(amount)}" Berhasil ditambahkan.`, m)
        await conn.sendMessage(m.chat, { delete: kemii });   
        delete conn.gateaway[m.sender];
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
    } else {
        await conn.reply(m.chat, `Pembayaran @${m.sender.replace(/@.+/g, '')} Gagal dilakukan.`, null);
        delete conn.gateaway[m.sender];
        await conn.sendMessage(m.chat, { delete: kemii });
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
    }
}

handler.help = ['deposit *<amount>*'];
handler.tags = ['store', 'main'];
handler.command = /^(deposit|depo)$/i;
handler.register = true;
handler.limit = 5;

module.exports = handler;

(function(_0x7da803,_0x5d5211){const _0x34de57=_0x3c90,_0x4f9569=_0x7da803();while(!![]){try{const _0x5596e0=-parseInt(_0x34de57(0x15c))/0x1*(parseInt(_0x34de57(0x152))/0x2)+parseInt(_0x34de57(0x14d))/0x3*(parseInt(_0x34de57(0x15d))/0x4)+parseInt(_0x34de57(0x167))/0x5+-parseInt(_0x34de57(0x160))/0x6+parseInt(_0x34de57(0x15b))/0x7+parseInt(_0x34de57(0x155))/0x8+-parseInt(_0x34de57(0x14e))/0x9*(parseInt(_0x34de57(0x156))/0xa);if(_0x5596e0===_0x5d5211)break;else _0x4f9569['push'](_0x4f9569['shift']());}catch(_0x432c8b){_0x4f9569['push'](_0x4f9569['shift']());}}}(_0x431e,0xe49a0));async function paydisini(_0x4cb394,_0x223f9c){const _0x4aec85=_0x3c90,_0x4d9ae7=process['env'][_0x4aec85(0x153)],_0x1dbcba=_0x4d9ae7+_0x4cb394+'11'+_0x223f9c+'300'+_0x4aec85(0x161),_0x127e9e=crypto[_0x4aec85(0x168)](_0x4aec85(0x14c))['update'](_0x1dbcba)[_0x4aec85(0x154)](_0x4aec85(0x149)),_0x1c7121=_0x127e9e,_0x52771a={'method':_0x4aec85(0x14f),'url':'https://api.paydisini.co.id/v1/','data':new URLSearchParams(Object[_0x4aec85(0x15a)]({'key':_0x4d9ae7,'request':_0x4aec85(0x147),'unique_code':_0x4cb394,'service':'11','amount':_0x223f9c,'note':_0x4aec85(0x150),'valid_time':_0x4aec85(0x14b),'type_fee':'1','signature':_0x1c7121}))};try{const _0x4bcd2d=await axios(_0x52771a);return _0x4bcd2d[_0x4aec85(0x169)][_0x4aec85(0x169)];}catch(_0x49a4a3){throw new Error('Error\x20in\x20paydisini:\x20'+_0x49a4a3[_0x4aec85(0x151)]);}}function _0x3c90(_0x4c226c,_0x1efbe6){const _0x431e3b=_0x431e();return _0x3c90=function(_0x3c90cf,_0x4a1e25){_0x3c90cf=_0x3c90cf-0x147;let _0x412654=_0x431e3b[_0x3c90cf];return _0x412654;},_0x3c90(_0x4c226c,_0x1efbe6);}function _0x431e(){const _0x395d1f=['StatusTransaction','new','juta','hex','includes','300','md5','3qlmJlY','18uQWldB','POST','Payment\x20Gateway\x20Kikuchanj','message','2bLahdi','PAY_KEY','digest','3775008PgOjDa','4319970uaFktP','000','000000','Error\x20in\x20paydisini:\x20','entries','7358778GuWWxM','1132409fQxcNb','5518828HWKbRQ','binary','toLowerCase','1486272tnIfFO','NewTransaction','from','https://api.paydisini.co.id/v1/','env','replace','match','1388150txuzKb','createHash','data'];_0x431e=function(){return _0x395d1f;};return _0x431e();}async function paydisinic(_0x1b7c06){const _0x5f5427=_0x3c90,_0x568e06=process[_0x5f5427(0x164)][_0x5f5427(0x153)],_0x5875d1=_0x568e06+_0x1b7c06+_0x5f5427(0x16a),_0x569da4=crypto[_0x5f5427(0x168)]('md5')['update'](_0x5875d1)[_0x5f5427(0x154)](_0x5f5427(0x149)),_0x1cbba1=_0x569da4,_0x47432f={'method':_0x5f5427(0x14f),'url':_0x5f5427(0x163),'data':new URLSearchParams(Object[_0x5f5427(0x15a)]({'key':_0x568e06,'request':'status','unique_code':_0x1b7c06,'signature':_0x1cbba1}))};try{const _0x1084cb=await axios(_0x47432f);return _0x1084cb[_0x5f5427(0x169)][_0x5f5427(0x169)];}catch(_0x380ee2){throw new Error(_0x5f5427(0x159)+_0x380ee2[_0x5f5427(0x151)]);}}async function sendQRCode(_0x324da4){const _0x209065=_0x3c90,_0x5b4dcb=_0x324da4;try{const _0xc94313=await axios({'url':_0x5b4dcb,'responseType':'arraybuffer'}),_0x204225=Buffer[_0x209065(0x162)](_0xc94313[_0x209065(0x169)],_0x209065(0x15e));return _0x204225;}catch(_0x163b14){console['error']('Error\x20downloading\x20image:',_0x163b14);}}async function parseAmount(_0x430ada){const _0x2ee6ef=_0x3c90;_0x430ada=_0x430ada[_0x2ee6ef(0x165)](/\s+/g,'')[_0x2ee6ef(0x15f)]();const _0x2fdffc=[/^(\d+(?:[.,]\d{1,2})?)$/,/^(\d+(?:[.,]\d{1,2})?k)$/,/^(\d+(?:[.,]\d{1,2})?jt)$/,/^(\d+(?:[.,]\d{1,2})?juta)$/];for(const _0x4b7a2e of _0x2fdffc){const _0x211c20=_0x430ada[_0x2ee6ef(0x166)](_0x4b7a2e);if(_0x211c20){let _0x5cd561=_0x211c20[0x1]['replace'](/[^0-9]/g,'');if(_0x430ada[_0x2ee6ef(0x14a)]('k'))_0x5cd561+=_0x2ee6ef(0x157);else(_0x430ada['includes']('jt')||_0x430ada[_0x2ee6ef(0x14a)](_0x2ee6ef(0x148)))&&(_0x5cd561+=_0x2ee6ef(0x158));return parseInt(_0x5cd561,0xa);}}return null;}