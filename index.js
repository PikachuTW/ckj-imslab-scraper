import notifier from 'node-notifier';
import Keyv from 'keyv';
import 'dotenv/config';
import KeyvSqlite from '@keyv/sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import open from 'open';

const db = new Keyv(new KeyvSqlite('sqlite://./db/database.sqlite'));
const cookie = process.env["COOKIE"];

if (!cookie) throw new Error('請提供你正確的cookie在.env文件裡!');

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
            notifier.notify(
                {
                    title: element.title,
                    message: `${element.content}\n${new Date(element.timestamp).toLocaleString()}`,
                    icon: path.join(path.dirname(fileURLToPath(import.meta.url)), 'favicon.png'),
                    wait: true,
                    appID: 'Bonus通知來了!!!'
                },
                () => open(`https://ckj.imslab.org/#/${element.type}/${element.relatedPath}`)
            );
            await db.set(element.title, true, 5 * 86400 * 1000);
        }
    });
}

await main();
setInterval(async () => {
    await main();
}, 60 * 1000);