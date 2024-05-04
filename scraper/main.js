const { Worker, isMainThread, workerData, parentPort } = require('worker_threads');
const fs = require('fs').promises;
const { cities } = require('./helper/data');
const Spider = require('./helper/Spider');

const NO_OF_THREADS = 10
const site = process.argv[2] || "weather.com";
const base_url = "https://weather.com/weather/today/l/";
let urlSet = new Set();
Spider.init(site );

async function initializeQueue() {
     cities.map(city => {
        urlSet.add(`${base_url}${city.lat},${city.lng}?unit=c`);
     });
    console.log('Queue initialized successfully.');
}

if (isMainThread) {
    (async () => {
        await initializeQueue();
        const urlArray = Array.from(urlSet);
        console.log(`Total URLs: ${urlArray.length}`);

        const workers = [];
        const segmentSize = Math.ceil(urlArray.length / NO_OF_THREADS);

        for (let i = 0; i < NO_OF_THREADS; i++) {
            const workerUrls = urlArray.slice(i * segmentSize, (i + 1) * segmentSize);
            const worker = new Worker(__filename, { workerData: { urls: workerUrls, id: i + 1 } });
            worker.on('message', message => {
                message.urls.forEach(url => urlSet.delete(url));
                console.log(`Remaining URLs: ${Array.from(urlSet).length}`);
                if (Array.from(urlSet).length === 0) {
                    console.log('All URLs processed.');
                }
            });
            workers.push(worker);
        }

        await Promise.all(workers.map(worker => new Promise(resolve => worker.on('exit', resolve))));
    })();
} else {
    (async () => {
        const { urls, id } = workerData;
        for (const url of urls) {
            await Spider.crawl_page(`Thread ${id}`, url);
            console.log(`Thread ${id} processed ${url}`);
        }
        parentPort.postMessage({ id: id, urls: urls });
    })();
}