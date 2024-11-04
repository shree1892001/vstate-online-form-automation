const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class OklahomaForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async OklahomaForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await this.clickOnLinkByText(page, 'Domestic Limited Liability Company >>>>');
            await this.fillInputByName(page, 'ctl00$DefaultContent$txtName', jsonData.data.Payload.Organizer_Information.Org_Name);
            await this.fillInputByName(page, 'ctl00$DefaultContent$txtUserName', jsonData.data.Payload.Organizer_Information.Org_Email_Address);
            await this.clickButton(page, '#ctl00_DefaultContent_Button1');
            await this.clickButton(page, '#ctl00_DefaultContent_cmdNew');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$CorpNameSearch$_name', jsonData.data.Payload.Name.CD_LLC_Name);
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_CorpNameSearch_SearchButton');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await page.waitForSelector('#ctl00_DefaultContent_wiz1_bNext');

    // Click the button
    await page.click('#ctl00_DefaultContent_wiz1_bNext');
            // await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$Address$_address1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$Address$_city', jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$Address$_zipcode', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString().toString().toString().toString().toString().toString()));
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$Address$_email', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = fullName.split(' ');
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$_firstName', firstName);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$_lastName', lastName);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$address1$_address1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$address1$_city', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$address1$_zipcode', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString().toString().toString().toString().toString()));
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_btnAdd');
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$_signature', jsonData.data.Payload.Organizer_Information.Org_Name);
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_btnSignature');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
                                    
            
            
        } catch (error) {
            logger.error('Error in Colorado For LLC form handler:', error.stack);
            throw new Error(`Colorado For LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = OklahomaForLLC;


