const fs = require('fs');
const path = './system/uptime.json';

function saveUptime(uptime) {
    fs.writeFileSync(path, JSON.stringify({ uptime }));
}

function loadUptime() {
    if (fs.existsSync(path)) {
        const data = fs.readFileSync(path);
        const { uptime } = JSON.parse(data);
        return uptime;
    }
    return 0;
}

function runtime(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second " : " seconds ") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

let handler = async (m, { conn, args, command }) => {
    let initialDays = 30;
    let previousUptime = loadUptime();
    let totalSeconds = process.uptime() + previousUptime + initialDays * 24 * 3600;
    let muptime = runtime(totalSeconds).trim();
    saveUptime(process.uptime() + previousUptime);
    await m.reply('```Online Selama : ```' + muptime);
}

handler.help = ['runtime'];
handler.tags = ['info'];
handler.command = /^(uptime|runtime)$/i;

module.exports = handler;