const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class KentuckyForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async KentuckyForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await page.waitForSelector('a[href="NewBusiness.aspx"]');
            await page.click('a[href="NewBusiness.aspx"]');
            await this.selectRadioButtonById(page, 'ctl00_MainContent_dombutt');
            await page.waitForSelector('a#ctl00_MainContent_LLClink', { visible: true});
            await page.click('a#ctl00_MainContent_LLClink');   
            await this.fillInputByName(page, 'ctl00$MainContent$TName', jsonData.data.Payload.Name.CD_LLC_Name);      
            const emailInputSelector = '#ctl00_MainContent_email'; // The selector for the email input
            const emailValue = jsonData.data.Payload.Registered_Agent.RA_Email_Address; // The email address you want to enter
            await this.setInputValue(page, emailInputSelector, emailValue); 
            await this.waitForTimeout(1000)
            await this.selectRadioButtonById(page,'ctl00_MainContent_membermanaged')
            await page.waitForSelector('#ctl00_MainContent_POAddr1', { visible: true });
            const addrvalue = jsonData.data.Payload.Principle_Address.PA_Address_Line1
            await page.click('#ctl00_MainContent_POAddr1');
            await this.waitForTimeout(1000)
            await this.setInputValue(page, '#ctl00_MainContent_POAddr1',addrvalue);
            await this.waitForTimeout(1000)
            // await this.fillInputByName(page, 'ctl00$MainContent$POAddr1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await page.waitForSelector('input[name="ctl00$MainContent$POCity"]');
            await this.fillInputByName(page, 'ctl00$MainContent$POCity', jsonData.data.Payload.Principle_Address.PA_City);
            await page.waitForSelector('input[name="ctl00$MainContent$POState"]');
            await this.fillInputByName(page, 'ctl00$MainContent$POState', jsonData.data.Payload.Principle_Address.PA_State);
            await page.waitForSelector('input[name="ctl00$MainContent$POZip"]');
            await this.fillInputByName(page, 'ctl00$MainContent$POZip', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.waitForTimeout(1000)
            await page.waitForSelector('#ctl00_MainContent_txtOrgName', { visible: true });
            await this.waitForTimeout(1000)
            await page.click('#ctl00_MainContent_txtOrgName');
            await this.waitForTimeout(1000)
            await this.setInputValue(page, '#ctl00_MainContent_txtOrgName',jsonData.data.Payload.Organizer_Information.Org_Name);
            // await this.fillInputByName(page, 'ctl00$MainContent$txtOrgName', jsonData.data.Payload.Organizer_Information.Org_Name);
            await page.waitForSelector('#ctl00_MainContent_btnAdd', { visible: true });
            await page.click('#ctl00_MainContent_btnAdd');
            await this.randomSleep()
            await this.selectRadioButtonById(page, 'ctl00_MainContent_rbIndividual');
            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = fullName.split(' ');
            await this.waitForTimeout(1000)
            await page.waitForSelector('input[name="ctl00$MainContent$RAFName"]');
            await this.fillInputByName(page, "ctl00$MainContent$RAFName", firstName);
            await this.waitForTimeout(1000)
            await page.waitForSelector('input[name="ctl00$MainContent$RALName"]');
            await this.fillInputByName(page, "ctl00$MainContent$RALName", lastName);
            await page.waitForSelector('input[name="ctl00$MainContent$RAAddr1"]');
            await this.fillInputByName(page, "ctl00$MainContent$RAAddr1", jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await page.waitForSelector('input[name="ctl00$MainContent$RACity"]');
            await this.fillInputByName(page, "ctl00$MainContent$RACity", jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await page.waitForSelector('input[name="ctl00$MainContent$RAZip"]');
            await this.fillInputByName(page,"ctl00$MainContent$RAZip", String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await this.waitForTimeout(1000)
            await page.waitForSelector('#ctl00_MainContent_RAsignFname', { visible: true });
            await page.click('#ctl00_MainContent_RAsignFname');
            await this.waitForTimeout(1000)
            await this.setInputValue(page, '#ctl00_MainContent_RAsignFname',firstName);
            
            // await this.fillInputByName(page, "ctl00$MainContent$RAsignFname", firstName);
            await page.waitForSelector('input[name="ctl00$MainContent$RAsignLname"]');
            await this.fillInputByName(page, "ctl00$MainContent$RAsignLname", lastName);
            await page.waitForSelector('#ctl00_MainContent_CbStandard', { visible: true});
            await page.click('#ctl00_MainContent_CbStandard');
            await this.waitForTimeout(1000)
            await page.waitForSelector('#ctl00_MainContent_bFile', { visible: true});
            await page.click('#ctl00_MainContent_bFile');
                
            
        } catch (error) {
            logger.error('Error in Kentucky For LLC form handler:', error.stack);
            throw new Error(`Kentucky LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = KentuckyForLLC;


