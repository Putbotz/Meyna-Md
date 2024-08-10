let os = require('os')
let util = require('util')
let { platform } = require('node:process')
let osu = require('node-os-utils')
let speed = require("performance-now");
let { performance } = require('perf_hooks')
let { sizeFormatter } = require('human-readable')
let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})
let handler = async (m, { conn }) => {
  const used = process.memoryUsage()
  const cpus = os.cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })
  const cpuModel = osu.cpu.model()
  const uptime = await Func.readTime(osu.os.uptime()).days
  const timestamp = speed()
  const latensi = speed() - timestamp
  await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
  let capt = '```Server Information```\n\n'
  capt += '```- CPU Model:```' + '```' + ` ${cpuModel}` + '```\n\n'
  capt += '```- Uptime:```' + '```' + ` ${uptime} days` + '```\n'
  capt += '```- Ram:```' + '```' + ` ${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}` + '```\n'
  capt += '```- Speed:```' + '```' + ` ${latensi.toFixed(4)} ms` + '```'
  await conn.reply(m.chat, capt, m)
  await m.react('')
}
handler.help = ['jaringan','ping']
handler.tags = ['info']

handler.command = /^(jaringan|tes|tester|ping)$/i
module.exports = handler