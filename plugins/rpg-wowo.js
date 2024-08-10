// Kemii Cantik 
// Rab, 12 Jun

let players = []
let maxPlayers = 2
let wowo = {
  name: "Wowo",
  inventory: []
}
let friends = []
let culikTeman = null
let desa = {
  name: "Desa Kakek Wowo",
  terpesona: true
}
let hantu = ["Pocong", "Kuntilanak", "Kuyang"]
let senjata = ["Shotgun", "Pisau", "Parang", "Celurit"]

let handler = async (m, {
  conn,
  usedPrefix,
  command,
  args
}) => {
  let names = await conn.getName(m.sender)
  let action = args[0]

  if (action === "join") {
    if (players.length >= maxPlayers) {
      throw "Maaf, jumlah pemain sudah mencapai batas maksimum."
    }
    let playerName = args[1] || names
    let player = {
      name: playerName,
      inventory: []
    }
    players.push(player)
    throw `Selamat datang, ${playerName}! Kamu telah bergabung dalam petualangan Wowo.`
  } else if (action === "leave") {
    let playerIndex = players.findIndex(p => p.name === names)
    if (playerIndex !== -1) {
      players.splice(playerIndex, 1)
      throw `Terima kasih telah berpartisipasi dalam petualangan Wowo. Sampai jumpa lagi!`
    }
    throw "Kamu belum bergabung dalam petualangan Wowo."
  } else if (action === "search") {
    if (players.length === 0) {
      throw "Belum ada pemain yang bergabung dalam petualangan Wowo."
    }
    throw `*${desa.name}* terlihat sangat sepi`
    let ghost = hantu[Math.floor(Math.random() * hantu.length)]
    let weapon = senjata[Math.floor(Math.random() * senjata.length)]
    wowo.inventory.push(weapon)
    throw `Wowo dan teman-temannya sedang mencari hantu ${ghost} di *${desa.name}*. Wowo menemukan ${weapon} untuk mengusir atau membunuh hantu tersebut.`
    if (!culikTeman) {
      let temanAcak = Math.floor(Math.random() * players.length)
      culikTeman = players[temanAcak]
      players.splice(temanAcak, 1)
      throw `Salah satu teman Wowo, ${culikTeman.name}, telah diculik oleh salah satu hantu.`
    }
    throw "Teman Wowo yang diculik belum ditemukan."
  } else if (action === "find") {
    if (players.length === 0) {
      throw "Belum ada pemain yang bergabung dalam petualangan Wowo."
    }
    if (culikTeman) {
      let cariTeman = culikTeman
      culikTeman = null
      players.push(cariTeman)
      throw `Wowo dan teman-temannya berhasil menemukan teman yang hilang, ${cariTeman.name}.`
    }
    throw "Teman Wowo yang diculik belum ditemukan."
  } else if (action === "help") {
    throw `Tutorial Berpetualang si Wowo:
- Gunakan perintah *${usedPrefix + command} join* untuk bergabung dalam petualangan Wowo.
- Gunakan perintah *${usedPrefix + command} leave* untuk keluar dari petualangan Wowo.
- Gunakan perintah *${usedPrefix + command} search* untuk mencari hantu dan senjata di Desa Kakek Wowo.
- Gunakan perintah *${usedPrefix + command} find* untuk mencari teman Wowo yang hilang.
`
  } else {
    throw `Perintah tidak ditemukan! silahkan gunakan perintah *${usedPrefix + command} help* - untuk melihat tutorial cara berpetualang si Wowo.`
  }
}

handler.command = handler.help = ["wowo"]
handler.tags = ["rpg"]
handler.register = true

module.exports = handler