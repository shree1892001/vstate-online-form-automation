const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class IllinoisForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async IllinoisForCORP(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            //select corp
            await this.clickOnLinkByText(page, 'Incorporate a Corporation');
            //add llc name
            await this.fillInputByName(page, 'corpName', jsonData.data.Payload.Name.CD_CORP_Name);
            await this.clickButton(page, '#continue');
            // await page.waitForSelector('input[name="agree"]', { visible: true });
            // await page.click('input[name="agree"]');
            await this.clickButton(page, 'input[name="submit"]');
            //add register agent
            await this.fillInputByName(page, 'agentName', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(page, 'agentStreet', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'agentCity', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'agentZip', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString().toString());
            // await this.clickDropdown(page, 'select[name="agentCounty"]', jsonData.data.Payload.County.CD_County);
            await this.clickDropdown(page, 'select[name="agentCounty"]', "Alexandar");

            await this.clickButton(page, 'input[name="submit"]');
            await this.clickButton(page, 'input[name="contwithout"]');
            await this.waitForTimeout(3000)
            await page.waitForSelector('#submitBtn');
            await page.click('#submitBtn');
            await this.waitForTimeout(3000)
            await page.waitForSelector('#Continue');
            await page.click('#Continue');
            //add shares
            await this.fillInputByName(page, 'authShares', jsonData.data.Payload.Stock_Details.SI_No_Of_Shares);
            await this.fillInputByName(page, 'issuedShares', jsonData.data.Payload.Stock_Details.SI_No_Of_Shares);
            await this.fillInputByName(page, 'totalCap', jsonData.data.Payload.Stock_Details.SI_No_Of_Shares);
            await this.clickButton(page, 'input[name="continue"]');
            await this.waitForTimeout(3000)
            await page.click('#continue');
            //add incorporator information
            await this.fillInputByName(page, 'incName', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            await this.fillInputByName(page, 'incStreet', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page, 'incCity', jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            await this.fillInputByName(page, 'incZip',jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code.toString());
            await this.clickButton(page, 'input[type="submit"][value="Submit"]');
        } catch (error) {
            logger.error('Error in Kentucky For CORP form handler:', error.stack);
            throw new Error(`Kentucky For CORP form submission failed: ${error.message}`);
        }
    }
}

module.exports = IllinoisForCORP;