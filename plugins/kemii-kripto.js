var handler = async (m, { conn, command }) => {
  if (command === 'tko_idr') {
  await m.react('🕒')
  let kemii = await kripto.recommendAssets('TKO_IDR')
  let image = await getBuffer(kemii.data.logoUrl)
  let capt = `Harga Terakhir: ${kemii.data.price}\n`
  capt += `Perubahan 24Jam: ${kemii.data.change24h}%\n`
  capt += `Tertinggi 24Jam: ${kemii.data.high}\n`
  capt += `Terendah 24Jam: ${kemii.data.low}\n`
  capt += `Kapitalisasi Pasar: ${kemii.data.volume}\n`
  capt += `Volume Global 24Jam: ${kemii.data.amount}\n\n`
  capt += `Symbol: ${kemii.data.symbol}\n`
  capt += `AssetId: ${kemii.data.assetId}\n`
  capt += `BaseAsset: ${kemii.data.baseAsset}\n`
  capt += `Name: ${kemii.data.name}\n`
  capt += `QuoteAsset: ${kemii.data.quoteAsset}\n`
  capt += `Static: ${kemii.data.klineImageUrl}`
  await conn.sendMessage(m.chat, {
  text: capt.trim(),
  contextInfo: {
  externalAdReply: {
  title: `${kemii.data.symbol} - ${kemii.data.assetId}`,
  body: kemii.data.name,
  thumbnail: image,
  sourceUrl: 'https://www.tokocrypto.com/markets',
  mediaType: 1,
  renderLargerThumbnail: true
  }}}, {quoted: m})
  } else if (command === 'bnb_idr') {
  await m.react('🕒')
  let salsa = await kripto.recommendAssets('BNB_IDR')
  let image2 = await getBuffer(salsa.data.logoUrl)
  let capt = `Harga Terakhir: ${salsa.data.price}\n`
  capt += `Perubahan 24Jam: ${salsa.data.change24h}%\n`
  capt += `Tertinggi 24Jam: ${salsa.data.high}\n`
  capt += `Terendah 24Jam: ${salsa.data.low}\n`
  capt += `Kapitalisasi Pasar: ${salsa.data.volume}\n`
  capt += `Volume Global 24Jam: ${salsa.data.amount}\n\n`
  capt += `Symbol: ${salsa.data.symbol}\n`
  capt += `AssetId: ${salsa.data.assetId}\n`
  capt += `BaseAsset: ${salsa.data.baseAsset}\n`
  capt += `Name: ${salsa.data.name}\n`
  capt += `QuoteAsset: ${salsa.data.quoteAsset}\n`
  capt += `Static: ${salsa.data.klineImageUrl}`
  await conn.sendMessage(m.chat, {
  text: capt.trim(),
  contextInfo: {
  externalAdReply: {
  title: `${salsa.data.symbol} - ${salsa.data.assetId}`,
  body: salsa.data.name,
  thumbnail: image2,
  sourceUrl: 'https://www.tokocrypto.com/markets',
  mediaType: 1,
  renderLargerThumbnail: true
  }}}, {quoted: m})
  } else if (command === 'btc_idr') {
  await m.react('🕒')
  let kemii = await kripto.recommendAssets('BTC_IDR')
  let image = await getBuffer(kemii.data.logoUrl)
  let capt = `Harga Terakhir: ${kemii.data.price}\n`
  capt += `Perubahan 24Jam: ${kemii.data.change24h}%\n`
  capt += `Tertinggi 24Jam: ${kemii.data.high}\n`
  capt += `Terendah 24Jam: ${kemii.data.low}\n`
  capt += `Kapitalisasi Pasar: ${kemii.data.volume}\n`
  capt += `Volume Global 24Jam: ${kemii.data.amount}\n\n`
  capt += `Symbol: ${kemii.data.symbol}\n`
  capt += `AssetId: ${kemii.data.assetId}\n`
  capt += `BaseAsset: ${kemii.data.baseAsset}\n`
  capt += `Name: ${kemii.data.name}\n`
  capt += `QuoteAsset: ${kemii.data.quoteAsset}\n`
  capt += `Static: ${kemii.data.klineImageUrl}`
  await conn.sendMessage(m.chat, {
  text: capt.trim(),
  contextInfo: {
  externalAdReply: {
  title: `${kemii.data.symbol} - ${kemii.data.assetId}`,
  body: kemii.data.name,
  thumbnail: image,
  sourceUrl: 'https://www.tokocrypto.com/markets',
  mediaType: 1,
  renderLargerThumbnail: true
  }}}, {quoted: m})
  }
}

handler.help = ['TKO_IDR','BNB_IDR','BTC_IDR']
handler.tags = ['crypto']

handler.command = ["tko_idr","bnb_idr","btc_idr"]
handler.premium = false
handler.register = true
handler.limit = true

module.exports = handler

async function getBuffer(url, options) {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}