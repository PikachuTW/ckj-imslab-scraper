import Discord from 'discord.js';
import 'dotenv/config';
const client = new Discord.Client({ intents: 131071, partials: ['CHANNEL', 'USER', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'GUILD_SCHEDULED_EVENT'], allowedMentions: { parse: ['users'] } });

const CHANNELID = 'put in your channel id';

client.on('ready', () => {
    console.log(`${client.user.tag}, 成員數: ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} ，伺服器數: ${client.guilds.cache.size}`);
    const activity = () => client.user.setActivity(`Made By Tails`, { type: 'PLAYING' });
    activity();
    setInterval(activity, 600000);
});

const main = async () => {
    const fetchResponse = await fetch("https://ckj.imslab.org/message", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-GPC": "1",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Cookie": cookie,
        },
        "referrer": "https://ckj.imslab.org/",
        "method": "GET",
        "mode": "cors"
    });

    let messageList;

    try {
        messageList = await fetchResponse.json();
    } catch (err) {
        console.error(err);
        console.error('請提供你正確的cookie在.env文件裡!');
        process.exit(1);
    }

    messageList = messageList.filter((element) => new Date() - new Date(element.timestamp) <= 3 * 86400 * 1000);

    messageList.forEach(async (element) => {
        if (!await db.has(element.title)) {
            console.log(element);
            await client.channels.cache.get(CHANNELID).send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(element.title)
                        .setImage('https://ckj.imslab.org/favicon.ico')
                        .setURL(`https://ckj.imslab.org/#/${element.type}/${element.relatedPath}`)
                        .setDescription(`${element.content}`)
                        .setFooter({ text: `${new Date(element.timestamp).toLocaleString()}` })
                        .setColor('Random')
                ]
            });
        }
    });
}

client.login(process.env.TOKEN);

await main();
setInterval(main, 10000);
