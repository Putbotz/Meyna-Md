let handler = async (m, {
      conn,
      args,
      usedPrefix,
      command
   }) => {
      try {
         client.crate = client.crate ? client.crate : []
         if (!m.quoted) return m.reply(Func.texted('bold', '🚩 Reply the mystery box.'))
         if(!/ID[-]/.test(m.quoted.text)) return
         const id = m.quoted.text.split`ID-`[1].split`*`[0].trim()
         if (!id) return
         const exists = client.crate.find(v => v._id === id)
         if (!exists) return m.reply(Func.texted('bold', `🚩 Maaf, Mystery box telah dibuka sebelumnya atau belum tersedia.`))
         if (exists.reward.type === 'LIMIT') {
            users.limit += exists.reward._r
            m.reply(`🎉 Congratulations! you got *${exists.reward._r}* limits.`).then(() => {
               Func.removeItem(client.crate, exists)
            })
         } else if (exists.reward.type === 'POINT') {
            users.point += exists.reward._r
            m.reply(`🎉 Congratulations! you got *${Func.formatter(exists.reward._r)}* points.`).then(() => {
               Func.removeItem(client.crate, exists)
            })
         } else if (exists.reward.type === 'MONEY') {
            users.money += exists.reward._r
            const USD = new Intl.NumberFormat('en-US', {
               style: 'currency',
               currency: 'USD',
               minimumFractionDigits: 0,
               maximumFractionDigits: 0
            })
            m.reply(`🎉 Congratulations! you got *${USD.format(exists.reward._r)}*.`).then(() => {
               Func.removeItem(client.crate, exists)
            })
         } else if (exists.reward.type === 'ZONK_L') {
            if (users.limit < exists.reward._r) {
               users.limit = 0
            } else {
               users.limit -= exists.reward._r
            }
            m.reply(`💀 Zonk! Limit kamu dikurangi : -${exists.reward._r} limits.`).then(() => {
               Func.removeItem(client.crate, exists)
            })
         } else if (exists.reward.type === 'ZONK_P') {
            if (users.point < exists.reward._r) {
               users.point = 0
            } else {
               users.point -= exists.reward._r
            }
            m.reply(`💀 Zonk! Point kamu dikurangi : -${Func.formatter(exists.reward._r)} points.`).then(() => {
               Func.removeItem(client.crate, exists)
            })
         } else if (exists.reward.type === 'ZONK_M') {
            if (users.money < exists.reward._r) {
               users.money = 0
            } else {
               users.pocket -= exists.reward._r
            }
            const USD = new Intl.NumberFormat('en-US', {
               style: 'currency',
               currency: 'USD',
               minimumFractionDigits: 0,
               maximumFractionDigits: 0
            })
            m.reply(`💀 Zonk! Uang kamu dikurangi : -${USD.format(exists.reward._r)}.`).then(() => {
               Func.removeItem(client.crate, exists)
            })
         }
      } catch (e) {
         console.log(e)
         client.reply(m.chat, err, m)
      }
   }
   handler.command = ['open']
   module.exports = handler