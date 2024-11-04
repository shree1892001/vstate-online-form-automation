const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class MarylandForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async MarylandForCORP(page, jsonData) {
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
            await this.clickOnLinkByText(page, 'Maryland Close Corporation');
            await this.clickButton(page, 'button[type="submit"][name="FilingOptionSaveAndContinue"]');
            await this.fillInputByName(page, 'CorpName', jsonData.data.Payload.Name.CD_CORP_Name);
            await this.clickDropdown(page, '#CorpSuffix', 'Corp');
            await this.clickButton(page, 'button#SearchNames[name="btnSubmit"]');
            await this.fillInputByName(page, 'BusinessPhysicalAddress.AddressStreet1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'BusinessPhysicalAddress.AddressCity', jsonData.data.Payload.Principle_Address.PA_City);
            await this.clickDropdown(page, '#BusinessPhysicalAddress_AddressCountyId', jsonData.data.Payload.Principle_Address.PA_Country);
            await this.fillInputByName(page, 'BusinessPhysicalAddress.AddressZip', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'ContactEmailAddress', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'BusinessPhone', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            const inputData = [
                { selector: '#description', value: ' business purpose ' }
            ];
            await this.fillInputbyid(page, inputData);
            await this.clickButton(page, 'input#BusinessLicenseN[name="BusinessLicense"]');
            await this.clickButton(page, 'button#btnSubmitUBD');
            await this.clickOnLinkByText(page, 'Add Incorporator');
            const fullName = jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name;
            const [firstName, lastName] = fullName.split(' ');
            await this.fillInputByName(page, 'Incorporator.FirstName', firstName);
            await this.fillInputByName(page, 'Incorporator.LastName', lastName);
            await this.fillInputByName(page, 'IncorporatorAddress.AddressStreet1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page, 'IncorporatorAddress.AddressCity', jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            await this.fillInputByName(page, 'IncorporatorAddress.AddressZip', String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
            await this.clickButton(page, 'button.btn.btn-primary');
            await this.clickButton(page, 'button[name="IndexAndContinue"].btn-primary');
            await this.clickDropdown(page, '#ResidentAgentTypeEnumValue', 'An Individual');
            const RAfullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [RAfirstName, RAlastName] = RAfullName.split(' ');
            await this.fillInputByName(page, 'ResidentAgent.FirstName', RAfirstName);
            await this.fillInputByName(page, 'ResidentAgent.LastName', RAlastName);
            await this.fillInputByName(page, 'ResidentAgent.Phone', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.fillInputByName(page, 'ResidentAgent.Email', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'ResidentAgent.ConfirmEmail', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'ResidentAgent.PersonAddress.AddressStreet1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'ResidentAgent.PersonAddress.AddressCity', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'ResidentAgent.PersonAddress.AddressZip', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code);
            await this.clickButton(page, '#btnSubmit');
            await this.fillInputByName(page, 'NumberOfShares', String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares));
            await this.fillInputByName(page, 'ValuePerShare', String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares));
            await this.clickButton(page, 'button[name="EditShareInfoAndContinue"].btn-primary');
            await this.clickOnLinkByText(page, 'Add Director');
            const orgfullName = jsonData.data.Payload.Director_Information.Director_Details.Dir_Name;
            const [orgfirstName, orglastName] = orgfullName.split(' ');
            await this.fillInputByName(page, 'Director.FirstName', orgfirstName);
            await this.fillInputByName(page, 'Director.LastName', orglastName);
            await this.fillInputByName(page, 'Director.PersonAddress.AddressStreet1', jsonData.data.Payload.Director_Information.Address.Dir_Address_Line1);
            await this.fillInputByName(page, 'Director.PersonAddress.AddressCity', jsonData.data.Payload.Director_Information.Address.Dir_City);
            await this.fillInputByName(page, 'Director.PersonAddress.AddressZip', jsonData.data.Payload.Director_Information.Address.Dir_Zip_Code);
            await this.clickButton(page, 'button[type="submit"].btn.btn-primary');
            await this.clickButton(page, 'button[name="IndexAndContinue"]');
            await this.clickButton(page, '#btnSubmitUBD');






            

        } catch (error) {
            logger.error('Error in Kentucky For CORP form handler:', error.stack);
            throw new Error(`Kentucky For CORP form submission failed: ${error.message}`);
        }
    }
}

module.exports = MarylandForCORP;


