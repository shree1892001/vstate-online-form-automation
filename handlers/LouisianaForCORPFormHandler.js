const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class LouisianaForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async LouisianaForCORP(page, jsonData) {
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
            await this.clickButton(page, '.gb-get-started-button-content');
            await new Promise(resolve => setTimeout(resolve,8000))
            await page.click('input[type="radio"][name="rdMultipleSelectChoice65646"][value="71009"]');
            await new Promise(resolve => setTimeout(resolve, 8000))
            await this.clickButton(page, '#btnNext');
            await this.clickButton(page, '#div-question-control-btn-65649');
            await this.selectRadioButtonById(page, 'input-business-type-option-67878-1-4');
            await this.selectRadioButtonById(page, 'input-business-type-option-67878-3-14');
            await this.selectRadioButtonById(page, 'input-business-type-option-67878-4-16');
            await new Promise(resolve => setTimeout(resolve, 8000))
            await this.clickButton(page, '#btnNext');
            await new Promise(resolve => setTimeout(resolve, 8000))
            await page.click('input[type="checkbox"][value="73113"]');
            await page.click('input[type="radio"][name="radio-yes-no-67885"][value="false"]'); // Adjust the name as needed
            await page.click('input[type="radio"][name="radio-yes-no-67886"][value="false"]'); // Adjust the name as needed
            await this.clickButton(page, '#btnNext');
            await this.fillInputByName(page, 'input-business-name-67898', jsonData.data.Payload.Name.CD_CORP_Name);
            await this.randomSleep()
            await this.clickButton(page, '#btnNext');
            await new Promise(resolve => setTimeout(resolve, 11000))
            await page.click('input[type="radio"][name="rdMultipleSelectChoice67907"][value="73120"]');
            await this.fillInputByName(page, 'input-number-67909', String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares));
            //incorporator information
            const incfullName = jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name;
            const [incfirstName, inclastName] = incfullName.split(' ');
            await this.fillInputByName(page, 'first-name-67910-1', incfirstName);
            await this.fillInputByName(page, 'last-name-67910-1', inclastName);
            await this.fillInputByName(page, 'address1-67910-1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page, 'inpCity-67910-1', jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            await this.clickDropdown(page, '#ddlState-67910-1',jsonData.data.Payload.Incorporator_Information.Address.Inc_State );
            await this.fillInputByName(page, 'inpZip-67910-1', String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
            await this.fillInputByName(page, 'phone-67910-1', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Contact_No);
            await this.randomSleep()
            await this.clickButton(page, '#btnNext');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await page.waitForSelector('input.form-control[data-input-mask="99-9999999"]', { visible: true });
            await page.type('input.form-control[data-input-mask="99-9999999"]', '12-3456789');
            await this.clickButton(page, '#btnNext');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await this.fillInputByName(page, 'inpCoraZip-68012', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'address1-68012', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'visibleCity-68012', jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByName(page, 'phone-68012', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.fillInputByName(page, 'email-68012', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            //add mailing address
            await this.fillInputByName(page, 'address1-68013', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'inpCity-68013', jsonData.data.Payload.Principle_Address.PA_City);
            await this.clickDropdown(page, '#ddlState-68013',jsonData.data.Payload.Principle_Address.PA_State );  // To select 'CA' (California)
            await this.fillInputByName(page, 'inpZip-68013', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'phone-68013', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            //add mailing address
            await this.fillInputByName(page, 'address1-68014', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'inpCity-68014', jsonData.data.Payload.Principle_Address.PA_City);
            await this.clickDropdown(page, '#ddlState-68014',jsonData.data.Payload.Principle_Address.PA_State);  // To select 'CA' (California)
            await this.fillInputByName(page, 'inpZip-68014', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'phone-68014', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.clickButton(page, '#btnNext');
            //add registered agent
            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = fullName.split(' ');
            await this.fillInputByName(page, 'first-name-68021-1', firstName);
            await this.fillInputByName(page, 'last-name-68021-1', lastName);
            await this.fillInputByName(page, 'email-68021-1', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'verify-email-68021-1', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'inpCoraZip-68021-1',String( jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await this.fillInputByName(page, 'address1-68021-1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'visibleCity-68021-1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'phone-68021-1', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            //add incorporator agent
            await this.fillInputByName(page, 'first-name-68023-1', incfirstName);
            await this.fillInputByName(page, 'last-name-68023-1', inclastName);
            await this.fillInputByName(page, 'ssn-68023-1', '123-45-6789');
            await this.clickDropdown(page, '#roles-68023-1','Executive Vice-President' );
            await this.fillInputByName(page, 'address1-68023-1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'inpCity-68023-1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await new Promise(resolve => setTimeout(resolve, 3000))
            await page.waitForSelector('#ddlState-68023-1', { visible: true});
            await page.click('#ddlState-68023-1');
            // await page.select('#ddlState-68023-1', 'LA');
            await this.clickDropdown(page, '#ddlState-68023-1', 'LA');
            await this.fillInputByName(page, 'inpZip-68023-1',String( jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await this.fillInputByName(page, 'phone-68023-1', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.clickButton(page, '#btnNext');
            await new Promise(resolve => setTimeout(resolve, 7000))
            await page.click('input[type="radio"][name="radio-yes-no-68289"][value="false"]');
            await this.clickButton(page, '#btnNext');
            await this.fillInputByName(page, 'input-name-68294', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            await this.fillInputByName(page, 'input-title-68294', 'Manager');
            await this.clickButton(page, '#btnNext');
            await this.clickButton(page, '#btnNext');

        } catch (error) {
            logger.error('Error in Kentucky For CORP form handler:', error.stack);
            throw new Error(`Kentucky For CORP form submission failed: ${error.message}`);
        }
    }
}

module.exports = LouisianaForCORP;


