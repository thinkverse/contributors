const chromium = require('chrome-aws-lambda');

require('dotenv').config();

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.handler = async (request, response) => {
    const query = new URLSearchParams();

    let browser = null, url = null;

    try {
        response.setHeader('Access-Control-Allow-Origin', '*');

        const { org = 'thinkverse', repo = 'contributors' } = request.query,
            hostname = `${process.env.RENDERER_URL}`;

        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage();

        query.set('repo', repo);
        query.set('org', org);

        url = `${hostname}?${query.toString()}`;

        await page.goto(url), { waitUntil: 'networkidle0' };

        await page.waitForSelector('.rendered') && await page.waitForSelector('img');

        // ! We need this to wait for all contributors images to be loaded.
        await page.evaluate(() => { window.scrollBy(0, window.innerHeight) });
        await timeout(3000);

        const image = await (await page.$('#content')).screenshot();

        response.setHeader('Cache-Control', 'public,max-age=604800');
        response.setHeader('Content-Type', 'image/png');

        response.send(image).status(200);
        
        return await page.close() && await browser.close();
    } catch (error) {
        return response.status(500).send(error.toString());
    }
}
