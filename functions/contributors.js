const chromium = require('chrome-aws-lambda');

require('dotenv').config();

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.handler = async (event, context, callback) => {
    const query = new URLSearchParams();

    let response = null,
        browser = null,
        url = null;

    try {
        const { org = 'thinkverse', repo = 'contributors' } = event.queryStringParameters,
            hostname = `${process.env.RENDERER_URL}`;

        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
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

        response = Object.assign({}, response, {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public,max-age=604800',
                'Content-Type': 'image/png', },
            body: image.toString('base64'),
            isBase64Encoded: true,
            statusCode: 200,
        });
    } catch (error) {
        return callback(null, { statusCode: 500, body: error.toString() });
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }

    return callback(null, response);
}
