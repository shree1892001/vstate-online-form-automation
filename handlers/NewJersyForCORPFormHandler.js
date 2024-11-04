const logger = require('../utils/logger');
const BaseFormHandler = require('./BaseFormHandler');

class NewJersyForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async NewJersyForCORP(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            // await clickDropdown(page, '#BusinessType');
            await this.clickDropdown(page, '#BusinessType', 'NJ Domestic For-Profit Corporation (DP)');
            const businessNameFields = [{ label: 'BusinessName', value: jsonData.data.Payload.Name.CD_CORP_Name }];
            await this.addInput(page, businessNameFields);
            await page.keyboard.press('Enter');
            await this.clickDropdown(page, '#BusinessNameDesignator','CORP');
            await this.clickButton(page, '.btn.btn-success');
            await new Promise(resolve => setTimeout(resolve, 3000))
            await this.fillInputByName(page, 'TotalShares', jsonData.data.Payload.Stock_Details.SI_No_Of_Shares);

            await new Promise(resolve => setTimeout(resolve, 2000))
            await page.waitForSelector('#btnSubmit');
            await page.click('#btnSubmit');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await page.waitForSelector('#btnSubmit');
            await page.click('#btnSubmit');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await this.clickButton(page, 'input[name="continuebtn"]'); 
            await this.clickButton(page, '#ra-num-link a'); // Click the Registered Agent link
            await this.fillInputByName(page, 'RegisteredAgentName', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(page, 'OfficeAddress1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'OfficeCity', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'OfficeZip', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code);

            await this.selectCheckboxByLabel(page, 'I attest that the Registered Agent information entered is correct for this business');
            await this.clickButton(page, '.btn.btn-success'); // Submit
            await new Promise(resolve => setTimeout(resolve, 10000))
            await page.waitForSelector('#add-member-btn');
            await page.click('#add-member-btn');
            await this.fillInputByName(page, 'Name', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            await this.fillInputByName(page, 'StreetAddress1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page, 'City', jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            await this.clickDropdown(page, '#State', jsonData.data.Payload.Incorporator_Information.Address.Inc_State);
            await this.fillInputByName(page, 'Zip', String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
            await page.evaluate(() => {
                document.body.style.zoom = '90%';
            });
            await this.clickButton(page, '.btn.btn-primary');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await this.clickButton(page, '#continue-btn');
            await new Promise(resolve => setTimeout(resolve, 10000))
            // await page.waitForSelector('.btn.btn-success[title="Add New Incorporators"]', { visible: true });
            // await page.evaluate(() => {
            //     const button = document.getElementById('add-member-btn');
            //     if (button) {
            //         button.click();
            //     }
            // }); 
            await page.waitForSelector('#add-member-btn');
            await page.click('#add-member-btn');       
            await this.fillInputByName(page, 'Name', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            await this.fillInputByName(page, 'StreetAddress1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page, 'City', jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            await this.clickDropdown(page, '#State', jsonData.data.Payload.Incorporator_Information.Address.Inc_State);
            await this.fillInputByName(page, 'Zip', String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
 
            await page.evaluate(() => {
                document.body.style.zoom = '90%';
            });
            await this.clickButton(page, '.btn.btn-primary');
            await page.evaluate(() => {
                document.body.style.zoom = '100%';
            });
            await new Promise(resolve => setTimeout(resolve, 5000))
            await this.clickButton(page, '#continue-btn')
            await this.clickButton(page, 'input.btn.btn-success[value="Continue"]');
            const labelSelector = 'label[for="signing"]';
            await page.waitForSelector(labelSelector, { visible: true, timeout: 30000 });
            await page.reload()
            await page.click(labelSelector);
            console.log(`Clicked the label for checkbox: ${labelSelector}`);
            await page.evaluate(() => {
                const checkbox = document.querySelector('#signing');
                return checkbox ? checkbox.checked : null; // Return checked state or null if not found
            });
            await this.clickButton(page, '#continue-btn')
        } catch (error) {
            logger.error('Error in NewJersy For CORP form handler:', error.stack);
            throw new Error(`NewJersy For CORP form submission failed: ${error.message}`);
        }
    }
}
module.exports = NewJersyForCORP;
