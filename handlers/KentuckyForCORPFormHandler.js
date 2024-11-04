const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class KentuckyForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async KentuckyForCORP(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await page.waitForSelector('a[href="NewBusiness.aspx"]');
            await page.click('a[href="NewBusiness.aspx"]');
            await this.selectRadioButtonById(page, 'ctl00_MainContent_dombutt');
            await page.waitForSelector('a#ctl00_MainContent_LLClink', { visible: true, timeout: 60000 });
            await page.click('a#ctl00_MainContent_Corplink');  
            await this.selectRadioButtonById(page, 'ctl00_MainContent_profit');
            await this.fillInputByName(page, 'ctl00$MainContent$tName', jsonData.data.Payload.Name.CD_CORP_Name);
            await page.waitForSelector('#ctl00_MainContent_tShares', { visible: true });
            await page.click('#ctl00_MainContent_tShares');
            await this.waitForTimeout(1000)
            await this.setInputValue(page, '#ctl00_MainContent_tShares', String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares));
            await this.waitForTimeout(1000)
            // await this.fillInputByName(page, 'ctl00$MainContent$tShares', String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares));

            await this.selectRadioButtonById(page, 'ctl00_MainContent_rbRIndividual');
            const RAfullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [RAfirstName, RAlastName] = RAfullName.split(' ');
            await this.fillInputByName(page, "ctl00$MainContent$RAFName", RAfirstName);
            await this.fillInputByName(page, "ctl00$MainContent$RALName", RAlastName);
            await this.fillInputByName(page, "ctl00$MainContent$RAAddr1", jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, "ctl00$MainContent$RACity", jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page,"ctl00$MainContent$RAZip", jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code);
            
            await this.fillInputByName(page, 'ctl00$MainContent$POAddr1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'ctl00$MainContent$POCity', jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByName(page, 'ctl00$MainContent$POState', jsonData.data.Payload.Principle_Address.PA_State);
            await this.fillInputByName(page, 'ctl00$MainContent$POZip', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.randomSleep()
            
            const fullName = jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name;
            const [firstName, lastName] = fullName.split(' ');
            await this.fillInputByName(page, "ctl00$MainContent$txtIncorpFName", firstName);
            await this.fillInputByName(page, "ctl00$MainContent$txtIncorpLName", lastName);
            await this.fillInputByName(page, "ctl00$MainContent$txtIncorpAddr", jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page, "ctl00$MainContent$txtIncorpCity", jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            await this.fillInputByName(page, "ctl00$MainContent$txtIncorpState", jsonData.data.Payload.Incorporator_Information.Address.Inc_State);
            await this.fillInputByName(page,"ctl00$MainContent$txtIncorpZip", String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
            await page.waitForSelector('#ctl00_MainContent_btnAddIncorp', { visible: true, timeout: 60000 });
            await page.click('#ctl00_MainContent_btnAddIncorp');
            await this.waitForTimeout(2000)
            await page.waitForSelector('#ctl00_MainContent_sign', { visible: true });
            await page.click('#ctl00_MainContent_sign');
            await this.waitForTimeout(1000)
            await this.setInputValue(page, '#ctl00_MainContent_sign', firstName);
            await this.waitForTimeout(1000)

            // await this.fillInputByName(page, "ctl00$MainContent$sign", firstName);
            await this.fillInputByName(page, "ctl00$MainContent$RAsignFname", RAfirstName);
            await this.fillInputByName(page, "ctl00$MainContent$RAsignLname", RAlastName);
            
            await page.waitForSelector('#ctl00_MainContent_email', { visible: true });
            await page.click('#ctl00_MainContent_email');
            await this.waitForTimeout(1000)
            console.log(jsonData.data.Payload.Registered_Agent.RA_Email_Address)
            await this.setInputValue(page, '#ctl00_MainContent_email',  jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.waitForTimeout(1000)

            // await this.fillInputByName(page, "ctl00$MainContent$email", jsonData.data.Payload.Registered_Agent.Name.Email);
            await page.waitForSelector('#ctl00_MainContent_cbStandard', { visible: true});
            await page.click('#ctl00_MainContent_cbStandard');
            await page.waitForSelector('#ctl00_MainContent_bFile', { visible: true});
            await page.click('#ctl00_MainContent_bFile');

        } catch (error) {
            logger.error('Error in Kentucky For CORP form handler:', error.stack);
            throw new Error(`Kentucky For CORP form submission failed: ${error.message}`);
        }
    }
}

module.exports = KentuckyForCORP;


