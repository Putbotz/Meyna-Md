async function before(m, {
      conn
   }) {
   if (!m.isGroup) return
      try {
         client.crate = client.crate ? client.crate : []
         setInterval(async () => {
            const session = client.crate.filter(v => Date.now() - v.created_at > 1800000)
            if (session.length < 1) return
            for (let crate of session) {
               Func.removeItem(client.crate, crate)
            }
         }, 30000)
         const reward = [{
            type: 'LIMIT',
            _r: Func.randomInt(1, 15)
         }, {
            type: 'POINT',
            _r: Func.randomInt(500, 500000)
         }, {
            type: 'MONEY',
            _r: Func.randomInt(100, 100000)
         }, {
            type: 'ZONK_L',
            _r: Func.randomInt(1, 10)
         }, {
            type: 'ZONK_P',
            _r: Func.randomInt(500, 500000)
         }, {
            type: 'ZONK_M',
            _r: Func.randomInt(100, 100000)
         }]
         const id = Func.makeId(25)
         const exists = client.crate.find(v => v.jid === m.chat)
         if (!exists) return client.crate.push({
            _id: id,
            jid: m.chat,
            count: 1,
            reward: Func.random(reward),
            created_at: Date.now()
         })
         exists.count += 1
         let caption = `📦 ¦ Mystery box telah dijatuhkan, buka dengan mengirimkan *.open* dengan mereply pesan ini.\n\n`
         caption += `*ID-${exists._id}*`
         if (exists.count === 25) return client.sendFile(m.chat, 'https://telegra.ph/file/72836ce508a39cafd1dc3.jpg', 'image.jpg', caption)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   }
module.exports = {
before,
}