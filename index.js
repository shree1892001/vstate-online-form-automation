const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cors = require('cors');
const formController = require('./controllers/formController'); // Ensure this path is correct
const logger = require('./utils/logger'); // Ensure this path is correct

puppeteer.use(StealthPlugin());
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors({
    origin: [
        'chrome-extension://kpmpcomcmochjklgamghkddpaenjojhl',
        'http://192.168.1.4:3000',
        'http://192.168.1.108:3001',
        'http://localhost:3000',
        'http://192.168.0.100:3000',
        'http://192.168.0.101:3000',
        'http://192.168.17.123:3001'
    ],
    methods: ['GET', 'POST']
}));

// User-Agent mapping for different websites
const userAgents = {
    'example1.com': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'example2.com': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15',
    'example3.com': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:60.0) Gecko/20100101 Firefox/60.0',
    'example4.com': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
    'example5.com': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    // Add more sites with corresponding user agents here
    'default': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
};

// Puppeteer script logic
async function runPuppeteerScript(req, res) {
    let browser;
    try {
        const jsonData = req.body;

        // Get the website URL or fallback to 'default'
        const websiteUrl = jsonData.data.State.stateUrl || 'default';
        const hostname = new URL(websiteUrl).hostname;
        const userAgent = userAgents[hostname] || userAgents['default']; // Choose user agent

        // Launch Puppeteer browser with Stealth mode
        browser = await puppeteer.launch({
            headless: false,
            args: [
                '--start-maximized',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--ignore-certificate-errors',
                '--ignore-certificate-errors-spki-list',
                '--disable-blink-features=AutomationControlled',
                '--disable-notifications',
                '--disable-extensions',
            ],
            ignoreHTTPSErrors: true,
            slowMo: 50
        });

        const page = await browser.newPage();

        // Set the user agent dynamically for each website
        await page.setUserAgent(userAgent);

        // Call the formController's submitForm method directly, passing req, res, and formData
        await formController.submitForm(page, jsonData, console.error, res);

    } catch (error) {
        logger.error('Error during Puppeteer script execution: ' + error.message, error);
        res.status(500).send({ error: 'Puppeteer script execution failed' });
    }
}

// Routes
app.post('/run-puppeteer', async (req, res) => {
    if (!req.body.data || !req.body.data.State || !req.body.data.State.stateUrl) {
        return res.status(400).send({ error: 'Invalid input data' });
    }

await runPuppeteerScript(req, res);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
