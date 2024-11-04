const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class FloridaForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async FloridaForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await this.clickOnLinkByText(page, 'Start a Business');
            await this.clickOnLinkByText(page, 'Articles of Organization');

            await this.clickOnLinkByText(page, 'File or Correct Florida LLC Articles of Organization');

            await this.clickButton(page, 'input[name="submit"][value="Start New Filing"]');
            await this.fillInputByName(page, 'corp_name', jsonData.data.Payload.Name.CD_LLC_Name);
            await this.fillInputByName(page, 'princ_addr1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'princ_city', jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByName(page, 'princ_st', jsonData.data.Payload.Principle_Address.PA_State);
            await this.fillInputByName(page, 'princ_zip', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'princ_cntry', jsonData.data.Payload.Principle_Address.PA_Country);
            await this.clickButton(page, '#same_addr_flag');
            const rafullname = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = rafullname.split(' ');
            await this.fillInputByName(page, 'ra_name_last_name', lastName);
            await this.fillInputByName(page, 'ra_name_first_name', firstName);
            await this.fillInputByName(page, 'ra_addr1',jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'ra_city',jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'ra_zip', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await this.fillInputByName(page, 'ra_signature',jsonData.data.Payload.Registered_Agent.RA_Name);
            // Correspondence Name And E-mail Address
            await this.fillInputByName(page, 'ret_name', jsonData.data.Payload.Organizer_Information.Org_Name);
            await this.fillInputByName(page, 'ret_email_addr', jsonData.data.Payload.Organizer_Information.Org_Email_Address);
            await this.fillInputByName(page, 'email_addr_verify', jsonData.data.Payload.Organizer_Information.Org_Email_Address);
            await this.fillInputByName(page, 'signature', jsonData.data.Payload.Member_Or_Manager_Details[0].Mom_Name);
            //Name And Address of Person(s) Authorized to Manage LLC
            const mbrfullName = jsonData.data.Payload.Member_Or_Manager_Details[0].Mom_Name;
            const [mbrfirstName, mbrlastName] = mbrfullName.split(' ');
            
            await this.fillInputByName(page, 'off1_name_title', 'AMBR');
            await this.fillInputByName(page, 'off1_name_last_name', mbrlastName);
            await this.fillInputByName(page, 'off1_name_first_name', mbrfirstName);
            await this.fillInputByName(page, 'off1_name_addr1', jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_Address_Line1);
            await this.fillInputByName(page, 'off1_name_city', jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_City);
            await this.fillInputByName(page, 'off1_name_st',jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_State );
            await this.fillInputByName(page, 'off1_name_zip', String(jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_Zip_Code));
            await page.click('input[type="submit"][value="Continue"]');
            await page.waitForSelector('#review', { visible: true, timeout: 30000 });
            // await page.click('#review');
            // console.log('Checked the checkbox with ID "review"');

            // // Click the "Continue" button by ID "reviewReservation_action_0"
            // await this.clickButton(page, '#reviewReservation_action_0');

            // // Select "BARBOUR" from the dropdown
            // await this.clickDropdown(page, '#countyOfFormation', 'BARBOUR');
            // console.log('Selected "BARBOUR" from the dropdown');

            // // Select the radio button for LLC type with ID "llcTypeLL"
            // await this.selectRadioButtonById(page, 'llcTypeLL');

            // // Click on the next "Continue" button by ID "filingOptions_action_0"
            // await this.clickButton(page, '#filingOptions_action_0');

            // // Select the registered agent type radio button with ID "registeredAgentTypeINDIVIDUAL"
            // await this.selectRadioButtonById(page, 'registeredAgentTypeINDIVIDUAL');

            // await this.fillInputByName(page, 'agent.lastName', lastName);
            // await this.fillInputByName(page, 'agent.firstName', firstName);
            // await this.fillInputByName(page, 'agent.officeAddressStreet', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            // await this.fillInputByName(page, 'agent.officeAddressCity', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            // await this.fillInputByName(page, 'agent.officeAddressZipCode', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));

            // // Click the "Copy Office Address to Mailing Address" link
            // await this.clickOnLinkByText(page, 'Copy Office Address to Mailing Address');

            // // Check the checkbox to certify registered agent
            // await page.waitForSelector('#certifyRegisteredAgent', { visible: true, timeout: 30000 });
            // await page.click('#certifyRegisteredAgent');
            // console.log('Checked the checkbox with ID "certifyRegisteredAgent"');

            // // Click the "Continue" button by ID "registeredAgent_action_0"
            // await this.clickButton(page, '#registeredAgent_action_0');

            // // Click the "Add New Organizer" button
            // await this.clickOnLinkByText(page, 'Add New Organizer');

            // // Select radio button for organizer with ID "registeredAgentTypeINDIVIDUAL"
            // await this.selectRadioButtonById(page, 'registeredAgentTypeINDIVIDUAL');
            // await this.fillInputByName(page, 'organizer.lastName', orglastName);
            // await this.fillInputByName(page, 'organizer.firstName', orgfirstName);
            // await this.fillInputByName(page, 'organizer.officeAddressStreet', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1);
            // await this.fillInputByName(page, 'organizer.officeAddressCity', jsonData.data.Payload.Organizer_Information.Org_Address.Org_City);
            // await this.fillInputByName(page, 'organizer.officeAddressZipCode', String(jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code));

            // // Copy organizer address
            // await this.clickOnLinkByText(page, 'Copy Office Address to Mailing Address');

            // // Click "Continue" on organizer page
            // await this.clickOnLinkByText(page, 'Continue');

            // // Click "Continue" for document uploads
            // await this.clickButton(page, '#documentUploads_action_0');

            // // Check the checkbox for "cpoQuestions.other"
            // await page.waitForSelector('#other', { visible: true, timeout: 30000 });
            // await page.click('#other');
            // console.log('Checked the checkbox with ID "other"');

            // // Click the "Continue" button by ID "registeredAgent_action_0"
            // await this.clickButton(page, '#registeredAgent_action_0');

            return 'Florida LLC form submitted successfully.'

        } catch (error) {
            logger.error('Error in FloridaForLLC form handler:', error.stack);
            throw new Error(`Florida LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = FloridaForLLC;


