const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class DcForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async DcForCORP(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            page.click('a[href="/Account.aspx/AccessDcLogOn?isAccessDc=true"]')
            const inputFields = [
                { label: 'input28', value: jsonData.data.State.filingWebsiteUsername },
                { label: 'input36', value: jsonData.data.State.filingWebsitePassword }
            ];
            await this.addInput(page,inputFields);
            await page.click('input[name="rememberMe"]');
            await page.click('input.button.button-primary[type="submit"][value="Sign in"]');
            await page.waitForSelector('a[href="/Home.aspx/wizard1"]');
            page.click('a[href="/Home.aspx/wizard1"]')
            await page.waitForSelector('a.my-button[href="/Home.aspx/wizard3"]');
            page.click('a.my-button[href="/Home.aspx/wizard3"]')
            await page.waitForSelector('a[href="/Biz.aspx/RedirectFromNewService/33"]');
            page.click('a[href="/Biz.aspx/RedirectFromNewService/33"]')
            await page.waitForSelector('#NextButton');
            await page.click('#NextButton');
            await page.waitForSelector('#NextButton');
            await page.click('#NextButton');
            await this.fillInputByName(page, 'BizData.BusinessName', jsonData.data.Payload.Name.CD_CORP_Name);
            await this.clickDropdown(page, 'select[name="BizData.BusinessSuffix"]', 'Corporation');
            await page.waitForSelector('#NextButton');
            await page.click('#NextButton');
            await this.fillInputByName(page,'CurrentBusinessAddress.Line1',jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page,'CurrentBusinessAddress.City',jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            await new Promise(resolve => setTimeout(resolve, 3000))
            await this.clickDropdown(page, 'select[name="CurrentBusinessAddress.State"]', 'District of Columbia');
            await this.fillInputByName(page,'CurrentBusinessAddress.Zip',String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
            await page.click('#NextButton');
            await this.clickDropdown(page, 'select[name="CurrentStock.StockType"]', 'Common');
            await page.type('input[name="CurrentStock.Quantity"]',jsonData.data.Payload.Stock_Information.SI_No_Of_Shares.toString() );
            await page.type('input[name="CurrentStock.ShareValue"]', jsonData.data.Payload.Stock_Information.SI_Share_Par_Value.toString());
            await page.click('#AddBizStock');
            await page.waitForSelector('#NextButton');
            await page.click('#NextButton');
             await this.clickDropdown(page, 'select[name="BizData.RegisteredAgent.RegisteredAgentId"]', 'Business Filings');
             await page.waitForSelector('#NextButton');
             await page.click('#NextButton');
             await page.type('textarea[name="CurrentStipulation[0].Description"]',
                'Miscellaneous Provisions include various clauses and stipulations that cover areas not addressed elsewhere in the document.',);
             await page.waitForSelector('#NextButton');
             await page.click('#NextButton'); 
             await page.waitForSelector('#NextButton');
             await page.click('#NextButton');
             const rafullname = jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name;
             const [firstName, lastName] = rafullname.split(' ');
             await this.fillInputByName(page, 'CurrentContact[0].FirstName', firstName);
             await this.fillInputByName(page, 'CurrentContact[0].LastName', lastName);
             logger.info('FoRm submission complete fot Michigan LLC')  
             await this.fillInputByName(page, 'CurrentContact[0].Address.Line1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
             await this.fillInputByName(page, 'CurrentContact[0].Address.City', jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
             await this.clickDropdown(page, 'select[name="CurrentContact[0].Address.State"]', 'District of Columbia');
             await this.fillInputByName(page, 'CurrentContact[0].Address.Zip',String( jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
             await this.fillInputByName(page,'CurrentContact[0].Email' ,jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Email_Address);
             await page.waitForSelector('#NextButton');
             await page.click('#NextButton');
             await page.waitForSelector('#NextButton');
             await page.click('#NextButton');
             await page.waitForSelector('#NextButton');
             await page.click('#NextButton');





            


            
        } catch (error) {
            logger.error('Error in Dc For CORP form handler:', error.stack);
            throw new Error(`Dc For CORP form submission failed: ${error.message}`);
        }
    }
}
module.exports = DcForCORP;