const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class TokenHandler extends BaseFormHandler {
    constructor() {
        super();
    }

    async handle_token(page, jsonData) {
        logger.info('Processing token with provided data');
        const url = jsonData.url
        const email =  jsonData.email
        const password =  jsonData.password
        await this.navigateToPagetoken(page,url)
        await page.waitForSelector('input[name="Email or user ID"]');
        await this.fillInputByName(page,'Email or user ID',email)
        await this.fillInputByName(page,'Password',password)
        await this.clickButton(page, 'span.Button-label-f10bb25');
        await page.evaluate(() => {
            const mfaWindow = document.querySelector('.MfaChallengePicker__StyledWrapper-n173ye-0');
            if (mfaWindow) {
                mfaWindow.style.display = 'none';  // Hide the MFA window
                console.log('MFA window bypassed.');
            }
        });
        const closeButtonSelector = 'button[aria-label="Close"]';
        await this.clickButton(page, closeButtonSelector);
        console.log('Close button clicked successfully.');
        await this.selectDropdownOptionByPlaceholder(page, 'Please select workspace from the list');
        await this.selectDropdownOptionByPlaceholder(page, 'Please select app from all your apps');
        await this.selectCheckboxByValue(page, 'com.intuit.quickbooks.accounting');
        await this.selectCheckboxByValue(page, 'com.intuit.quickbooks.payment');
        const buttonText = 'Get authorization code';

        await page.evaluate((text) => {
            const button = Array.from(document.querySelectorAll('button')).find(
                btn => btn.textContent.trim() === text
            );
            if (button) {
                button.click();
            }
        }, buttonText);
        await this.waitForTimeout(5000)
        await page.waitForSelector('.step-detail');
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button.idsTSButton'));
            const button = buttons.find(btn => btn.textContent.trim() === 'Get tokens');
            if (button) {
                button.click();
            } else {
                console.log('Button not found');
            }
        });
    
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.waitForTimeout(2000)
        await page.waitForSelector('#idsTxtField11');
        const refreshtoken = await this.getInputValueById(page, 'idsTxtField11');
        await page.waitForSelector('#idsTxtField12');
        const accesstoken = await this.getInputValueById(page, 'idsTxtField12');
        console.log("Input Value:", refreshtoken);
        console.log("Input Value:", accesstoken);
        
        console.log('Token Handler Invoked');   
        return { refreshtoken, accesstoken }
 
    }
}

module.exports = TokenHandler;
