const { BingImageCreator } = require("../lib/scrape/bingimg.js");

const handler = async (m, { conn, args, usedPrefix, command }) => {
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    throw `*• Example:* ${usedPrefix + command} 1girl`
  }
  await m.react('🕒')
  
  try {
    const res = new BingImageCreator({
      cookie: `GI_FRE_COOKIE=gi_fre=3; _C_Auth=; ipv6=hit=1717842650790; MUID=0FB3DA38136063BE264ECE5E123662DE; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=53CF87C941FB49128C4E647E77ACDDC6&dmnchg=1; _UR=cdxcls=0&QS=0&TQS=0; ANON=A=55E7054CE004919120BCDC13FFFFFFFF&E=1dc8&W=1; NAP=V=1.9&E=1d6e&C=WzhlzGQNK7No1Gbg2dZyikeU6ohkTTVqFQ8Blg8WfknnvZX9PFl3qw&W=1; PPLState=1; _U=1E9N4lkZW7nG7OOhU-4BN0AcRLoK260zEjnDl617znxF_5tW00bPQ_N25fH48Y9vJbcvEq_nyMLSLOC9LZ6r7JSgbEzuDoh3g344-FZW-DY7AE_yn1mxzxCo8XP4RsgOYMRkzi9gz3qDulckkGx9vQ1OarP6UUqWVgRRkT0eFd1oFfdrJ2N-OY-udNycYJGMESXUOSIAnmXqeJU-dhpa56w; WLS=C=2938b9e7e1f841c2&N=Kemii; ak_bmsc=99D79B29E7AAEC98CA79B4B833EE8BF2~000000000000000000000000000000~YAAQXu84F1LZEPGPAQAAhlgu9xgVMGwKHtX1+nE3n2uj01VWbYl4NoW4/SEaUa69FXxj2Fr29Gqs/uHsb/D1/HQv73H3VIZEzbFeLTlKH7WuYkc9Qi57fL8vsnQav7bai3QUM1tRfvaz8QQl4Vb/2Dq0fmnlr6R1gngO2myFWxqFUnT0yv8SEPSoJ9BZREcdOdYVuKkObcMgaZln3ozYU8TFsTnJwGnFbLFrqRTHwFR9Pcc0Zb/NKnA0xTSypM9EzQfC4rQh5vCOlu+CZSkzMjLb9wLXCm00DVmIbM/0ZJObBVc/9cwsf6qlw8qLx6KM0Pz56Ez+sx9sy...wiU3QiOjAsIlFzIjowLCJQcm9kIjoiUCJ9LCJTYyI6eyJDbiI6NiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiSCJ9LCJReiI6eyJDbiI6NiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyNC0wNi0wOFQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIlRucyI6MCwiRGZ0IjpudWxsLCJNdnMiOjAsIkZsdCI6MCwiSW1wIjoxOSwiVG9ibiI6MH0=; bm_sv=AF2FB8D2D0522CC697E704418E3C31D3~YAAQre84FzV1Le6PAQAAhnQv9xjbUBNSZqeq3HBUgYyLOtHoCjOywtwhmDUVv3gl6felF27+qQBwC7C7qK0F1xibHfK8mkE6mxUAWMP5FnJu5QGzEU4u3Y8bl64f8sss0e5KteAW56RmFXdCyC5srhNol7ac2fBIXPq7IPdGBWZBEv8lAxlWfMfkZBKGC3cLtrNjJEYhJReuAvFUeTsODWjyXP3+D/TicHMhkZCm3GaNW0z6vkQzx2DQCnHRFQ==~1; SRCHUSR=DOB=20240506&POEX=W&T=1717839033000; dsc=order=BingPages; ipv6=hit=1717842642190; SRCHHPGUSR=SRCHLANG=id&CW=424&CH=848&SCW=424&SCH=848&BRW=MW&BRH=MT&DPR=1.7&UTC=420&DM=1&HV=1717839051&PV=10.0.0&WTS=63850595456&IG=A86C4C274D784E09B1F891C9F52FAA50&PRVCW=424&PRVCH=848&HBOPEN=2&CIBV=1.1766.0; _clck=ts1vij%7C2%7Cfmg%7C0%7C1587; _clsk=1txkjsz%7C1717839052071%7C1%7C0%7Cx.clarity.ms%2Fcollect`,
    });
    const data = await res.createImage(text);

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        try {
          if (!data[i].endsWith(".svg")) {
            await conn.sendFile(m.chat, data[i], "", ``, m)
          }
          await m.react('')
        } catch (error) {
          console.error(`Error sending file: ${error.message}`);
          await m.reply(`Failed to send image *(${i + 1}/${data.length})*`);
        }
      }
    } else {
      await m.reply("No images found.");
    }
  } catch (error) {
    console.error(`Error in handler: ${error.message}`);
    await m.reply(`${error}\n\n${error.message}`);
  }
};

handler.help = ["create *<text>*"]
handler.tags = ["diffusion","ai","premium"]
handler.command = ["create"]
handler.premium = false
handler.register = true
handler.premium = true

module.exports = handler