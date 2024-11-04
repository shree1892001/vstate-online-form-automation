const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class LouisianaForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async LouisianaForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await page.waitForSelector('a[href="/Account/SsoLogin"]');
            await page.click('a[href="/Account/SsoLogin"]');
            await this.randomSleep()
            await this.fillInputByName(page, 'ctl00$cphContent$txtEmail', jsonData.data.State.filingWebsiteUsername);
            await this.fillInputByName(page, 'ctl00$cphContent$txtPassword', jsonData.data.State.filingWebsitePassword);
            await this.clickButton(page, '#ctl00_cphContent_btnContinue');
            // await this.fillInputByName(page, 'ctl00$cphContent$txtEmail', jsonData.data.State.filingWebsiteUsername);
            // await this.fillInputByName(page, 'ctl00$cphContent$txtPassword', jsonData.data.State.filingWebsitePassword);
            // await this.clickButton(page, '#ctl00_cphContent_btnContinue');
            await this.clickButton(page, '.gb-get-started-button-content');
            await new Promise(resolve => setTimeout(resolve, 10000))
            await page.waitForSelector('input[type="radio"][name="rdMultipleSelectChoice65646"][value="71009"]');
            await page.click('input[type="radio"][name="rdMultipleSelectChoice65646"][value="71009"]');
            await this.clickButton(page, '#btnNext');
            await this.clickButton(page, '#div-question-control-btn-65649');
            await page.waitForSelector('#input-business-type-option-67878-1-2');
            await this.selectRadioButtonById(page, 'input-business-type-option-67878-1-2');

            await page.waitForSelector('#input-business-type-option-67878-3-14');
            await this.selectRadioButtonById(page, 'input-business-type-option-67878-3-14');
            await this.clickButton(page, '#btnNext');
            await new Promise(resolve => setTimeout(resolve, 10000))
            await page.click('input[type="checkbox"][data-bind*="noneValue"]'); // Selects the checkbox
            await page.click('input[type="radio"][name="radio-yes-no-67885"][value="false"]'); // Adjust the name as needed
            await page.click('input[type="radio"][name="radio-yes-no-67886"][value="false"]'); // Adjust the name as needed
            await this.clickButton(page, '#btnNext');
            await this.clickDropdown(page, '#input-multi-answer-text-67894', 'Partnership');
            await this.clickButton(page, '#btnNext');
            await this.fillInputByName(page, 'input-business-name-67898', jsonData.data.Payload.Name.CD_LLC_Name);
            await this.clickButton(page, '#btnNext');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await page.click('input[type="radio"][name="rdMultipleSelectChoice67899"]',jsonData.data.Payload.Naics_Code.CD_NAICS_Code);
            await this.randomSleep()
            await this.clickButton(page, '#btnNext');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await this.fillInputByName(page, 'inpCoraZip-67978',String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'address1-67978', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'visibleCity-67978', jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByName(page, 'phone-67978', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.fillInputByName(page, 'email-67978', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            //add mailing address
            await this.fillInputByName(page, 'address1-67979', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'inpCity-67979', jsonData.data.Payload.Principle_Address.PA_City);
            await this.clickDropdown(page, '#ddlState-67979',jsonData.data.Payload.Principle_Address.PA_State );  // To select 'CA' (California)
            await this.fillInputByName(page, 'inpZip-67979', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'phone-67979', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.clickButton(page, '#btnNext');
            //add registered agent
            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = fullName.split(' ');
            await this.fillInputByName(page, 'first-name-67980-1', firstName);
            await this.fillInputByName(page, 'last-name-67980-1', lastName);
            await this.fillInputByName(page, 'email-67980-1', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'verify-email-67980-1', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'inpCoraZip-67980-1',  String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'address1-67980-1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'visibleCity-67980-1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'phone-67980-1', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.clickSpanByText(page, 'manager-managed');
            //add manager information 
            const orgfullName = jsonData.data.Payload.Organizer_Information.Org_Name;
            const [orgfirstName, orglastName] = orgfullName.split(' ');
            await this.fillInputByName(page, 'first-name-67983-1', orgfirstName);
            await this.fillInputByName(page, 'last-name-67983-1', orglastName);
            await this.clickDropdown(page, '#roles-67983-1', 'Manager');
            await this.fillInputByName(page, 'address1-67983-1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'inpCity-67983-1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.clickDropdown(page, '#ddlState-67983-1',jsonData.data.Payload.Principle_Address.PA_State );
            await this.fillInputByName(page, 'inpZip-67983-1', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'phone-67983-1', jsonData.data.Payload.Organizer_Information.Org_Contact_No);
            await this.clickButton(page, '#btnNext');
            await page.waitForSelector('input[type="radio"][name="radio-yes-no-68289"][value="false"]', { visible: true });
            await page.click('input[type="radio"][name="radio-yes-no-68289"][value="false"]');
            await this.clickButton(page, '#btnNext');
            await this.fillInputByName(page, 'input-name-68294', jsonData.data.Payload.Organizer_Information.Org_Name);
            await this.fillInputByName(page, 'input-title-68294', 'Manager');
            await this.clickButton(page, '#btnNext');
            await this.clickButton(page, '#btnNext');

           

            

        } catch (error) {
            logger.error('Error in Kentucky For CORP form handler:', error.stack);
            throw new Error(`Kentucky For CORP form submission failed: ${error.message}`);
        }
    }
}

module.exports = LouisianaForLLC;


