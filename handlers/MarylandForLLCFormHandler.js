const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class MarylandForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async MarylandForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await this.fillInputByName(page, 'UserName', jsonData.data.State.filingWebsiteUsername);
            await this.fillInputByName(page, 'Password', jsonData.data.State.filingWebsitePassword);
            await this.clickButton(page, 'button.btn.btn-large.btn-primary.loginBtnAlign');
            await this.clickButton(page, 'a.btn.btn-primary.btn-large.dropdown-toggle.appOptionsProfile');
            await this.clickOnLinkByText(page, 'New Business Filings');
            await this.clickOnLinkByText(page, '› Register a Business');
            await this.clickOnLinkByText(page, 'Maryland Limited Liability Company');
            await this.clickButton(page, 'button[type="submit"][name="FilingOptionSaveAndContinue"]');
            await this.fillInputByName(page, 'LLCName', jsonData.data.Payload.Name.CD_LLC_Name);
            await this.clickDropdown(page, '#LLCSuffix', 'LLC');
            await this.clickButton(page, 'button#SearchNames[name="btnSubmit"]');
            await this.fillInputByName(page, 'BusinessPhysicalAddress.AddressStreet1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'BusinessPhysicalAddress.AddressCity', jsonData.data.Payload.Principle_Address.PA_City);
            await this.clickDropdown(page, '#BusinessPhysicalAddress_AddressCountyId', jsonData.data.Payload.Principle_Address.PA_Country);
            await this.fillInputByName(page, 'BusinessPhysicalAddress.AddressZip', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'ContactEmailAddress', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'BusinessPhone', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.clickButton(page, 'input#BusinessLicenseN[name="BusinessLicense"]');
            await this.clickButton(page, 'button#btnSubmitUBD');
            await this.clickDropdown(page, '#ResidentAgentTypeEnumValue', 'An Individual');
            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = fullName.split(' ');
            await this.fillInputByName(page, 'ResidentAgent.FirstName', firstName);
            await this.fillInputByName(page, 'ResidentAgent.LastName', lastName);
            await this.fillInputByName(page, 'ResidentAgent.Phone', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.fillInputByName(page, 'ResidentAgent.Email', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'ResidentAgent.ConfirmEmail', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'ResidentAgent.PersonAddress.AddressStreet1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'ResidentAgent.PersonAddress.AddressCity', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'ResidentAgent.PersonAddress.AddressZip', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await this.clickButton(page, '#btnSubmit');
            await this.clickButton(page, '#btnSubmitUBD');



            

        } catch (error) {
            logger.error('Error in Kentucky For CORP form handler:', error.stack);
            throw new Error(`Kentucky For CORP form submission failed: ${error.message}`);
        }
    }
}

module.exports = MarylandForLLC;


