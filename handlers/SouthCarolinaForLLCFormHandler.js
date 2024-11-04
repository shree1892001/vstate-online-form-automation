const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class SouthCarolinaForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async SouthCarolinaForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            //login 
            await this.clickOnLinkByText(page, 'Log In');
            await this.fillInputByName(page, 'Username', jsonData.data.State.filingWebsiteUsername);
            await this.fillInputByName(page, 'Password', jsonData.data.State.filingWebsitePassword);
            await this.clickButton(page, '.mainButton');
            //enter businees name
            await this.fillInputByName(page, 'EntityName', jsonData.data.Payload.Name.CD_LLC_Name);
            await this.clickButton(page, '#AddEntityButton');
            // await this.selectRadioButtonById(page, 'DomesticRadioButton');
            // await this.clickButton(page, '#AddIndistinguishableEntityButton');

            // Entity Type
            await this.clickDropdown(page, '#EntityTypes', 'Limited Liability Company');
            await this.clickButton(page, 'a.startButton');
            //add registered agent information

            await this.fillInputByName(page, 'ContactCdto.Contact.Name', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(page, 'ContactCdto.Contact.Email', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'ContactCdto.Contact.Phone', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.fillInputByName(page, 'ContactCdto.AddressCdto.Address1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'ContactCdto.AddressCdto.City', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.clickDropdown(page, '#ContactCdto_AddressCdto_StateId', jsonData.data.Payload.Registered_Agent.RA_Address.RA_State);
            await this.fillInputByName(page, 'ContactCdto.AddressCdto.ZipCode', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await this.clickButton(page, '#ContinueButton');
            await this.fillInputByName(page, 'FormsCdto.Agent.AgentName', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(page, 'FormsCdto.Agent.AgentAddressCdto.Address1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'FormsCdto.Agent.AgentAddressCdto.City', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'FormsCdto.Agent.AgentAddressCdto.ZipCode', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            //add principle address information
            await this.fillInputByName(page, 'FormsCdto.Address.Address1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'FormsCdto.Address.City', jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByName(page, 'FormsCdto.Address.ZipCode', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            //add organizer information
            await this.fillInputByName(page, 'FormsCdto.OrganizerCdto.OrganizerName', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name);
            await this.waitForTimeout(1000)
            await this.fillInputByName(page, 'FormsCdto.OrganizerCdto.OrganizerAddressCdto.Address1', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1);
            await this.waitForTimeout(1000)
            await this.fillInputByName(page, 'FormsCdto.OrganizerCdto.OrganizerAddressCdto.City', jsonData.data.Payload.Organizer_Information.Org_Address.Org_City);
            await this.clickDropdown(page, '#FormsCdto_OrganizerCdto_OrganizerAddressCdto_StateId', jsonData.data.Payload.Organizer_Information.Org_Address.Org_State);
            await this.fillInputByName(page, 'FormsCdto.OrganizerCdto.OrganizerAddressCdto.ZipCode', String(jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code));
            //add signature for organizer
            await this.clickDropdown(page, '#FormsCdto_OrganizerCdto_OrganizerSignatureCdto_SelectedOption', 'Organizer');
            await page.click('#OrganizerSignatureConfirmationCheckbox');
            await this.fillInputByName(page, 'FormsCdto.OrganizerCdto.OrganizerSignatureCdto.Text', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name);
            
            await this.clickButton(page, '#ContinueButton');
            
            
            
            
        } catch (error) {
            logger.error('Error in Colorado For LLC form handler:', error.stack);
            throw new Error(`Colorado For LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = SouthCarolinaForLLC;


