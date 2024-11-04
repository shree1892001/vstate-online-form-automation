const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class NewJersyForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async NewJersyForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await this.clickDropdown(page, '#BusinessType', 'NJ Domestic Limited Liability Company (LLC)');
            const businessNameFields = [
                { label: 'BusinessName', value: jsonData.data.Payload.Name.CD_LLC_Name }
            ];
            await this.addInput(page, businessNameFields);
            await page.keyboard.press('Enter');
            await this.randomSleep()
            await this.clickDropdown(page, '#BusinessNameDesignator', 'LLC');
            await page.keyboard.press('Enter');
            await this.clickButton(page, '.btn.btn-success'); // Click the submit button
            await new Promise(resolve => setTimeout(resolve, 3000))
            await page.waitForSelector('#btnSubmit');
            await page.click('#btnSubmit');
            await new Promise(resolve => setTimeout(resolve, 3000))
            await page.waitForSelector('#btnSubmit');
            await page.click('#btnSubmit');
            await this.clickButton(page, 'input[name="continuebtn"]'); // Click the continue button
            await this.clickButton(page, '#ra-num-link a'); // Click the Registered Agent link
            await this.fillInputByName(page, 'RegisteredAgentName', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(page, 'OfficeAddress1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'OfficeCity', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'OfficeZip', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await this.selectCheckboxByLabel(page, 'I attest that the Registered Agent information entered is correct for this business');
            await this.clickButton(page, '.btn.btn-success'); // Submit
            await this.clickButton(page, '#continue-btn');
            await this.clickButton(page, 'input.btn.btn-success[value="Continue"]');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await page.waitForSelector('a.btn.btn-success#add-signer-btn', { visible: true, timeout: 60000 });
            await page.click('a.btn.btn-success#add-signer-btn');
            await this.fillInputByName(page, 'Name', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name);
            await this.clickDropdown(page, '#Title','Authorized Representative');
            await this.clickButton(page, '#modal-save-btn'); // Save
            await this.randomSleep()
            await page.reload()
            await page.waitForSelector('label[for="sign-ckbx-0"]', { visible: true, timeout: 3000 });
            await page.click('label[for="sign-ckbx-0"]');
            await this.clickButton(page, '#continue-btn');
        } catch (error) {
            logger.error('Error in NewJersy For LLC form handler:', error.stack);
            throw new Error(`NewJersy For LLC form submission failed: ${error.message}`);
        }
    }
}
module.exports = NewJersyForLLC;
