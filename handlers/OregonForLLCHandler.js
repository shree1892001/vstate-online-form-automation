const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class OregonForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async OregonForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await this.clickOnLinkByText(page, 'Register a Business Online');
            try {
                // Try to click the first button
                await this.clickButton(page, 'a.btn.btn-primary', true, { visible: true });
            } catch (error) {
                console.error('Failed to click "Continue" button. Trying the "I understand and wish to continue" link:', error.message);
                try {
                    // If the first button click fails, try clicking the second link
                    await this.clickButton(page, 'a[href="https://secure.sos.state.or.us/cbrmanager/index.action"]', true, { visible: true });
                } catch (secondError) {
                    console.error('Failed to click the "I understand and wish to continue" link as well:', secondError.message);
                    // Proceed to the next step if both clicks fail
                }
            }
            await this.clickButton(page, '#loginButton');
            await this.fillInputByName(page, 'username', jsonData.data.State.filingWebsiteUsername);
            await this.fillInputByName(page, 'password', jsonData.data.State.filingWebsitePassword);
            await this.clickButton(page, 'input[name="Login"]');
            await this.clickButton(page, '#startBusinessButtonID', true, { visible: true });
            await this.clickButton(page, '#startBusinessButtonID', true, { visible: true });
            await this.clickButton(page, '#startBusRegBtn');
            await this.clickDropdown(page, '#filingType', 'Domestic Limited Liability Company');
            await page.waitForSelector('#busOverview_businessName', { visible: true });
            await page.type('#busOverview_businessName', jsonData.data.Payload.Name.CD_LLC_Name);
            await page.type('#busOverview_activityDescription',"Business Purpose")
            await this.selectRadioButtonById(page, 'busOverview_duration_type_perpetual');
            await this.fillInputByIdSingle(page, '#busOverview_emailAddress_emailAddress', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Email_Address);
            await this.fillInputByIdSingle(page, '#busOverview_emailAddress_emailAddressVerification', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Email_Address);
            await this.fillInputByIdSingle(page, '#busOverview_principalAddr_addressLine1',jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByIdSingle(page, '#busOverview_principalAddr_city', jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByIdSingle(page, '#busOverview_principalAddr_zip', jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString());
            await this.fillInputByIdSingle(page, '#busOverview_businessContact_name', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name);
            // await this.fillInputByIdSingle(page, '#busOverview_businessContact_phone_number', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Contact_No);

                        await this.fillInputByIdSingle(page, '#busOverview_businessContact_phone_number', "(555)123-4567");

            await this.clickButton(page, '#pageButton2');
            await this.clickButton(page, '#pageButton3');

            // Duration
            // await this.randomSleep(300000,400000);
            await this.clickDropdown(page, '#eSelection', 'Email');
            await this.fillInputByIdSingle(page, '#contactDetail', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name);
            await this.fillInputByIdSingle(page, '#contactEmail', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Email_Address);
            await this.fillInputByIdSingle(page, '#validateEmail', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Email_Address);
            await this.clickButton(page, '#pageButton2');
            await this.clickButton(page, '#pageButton3');
            
            //principle Address
            await this.fillInputByIdSingle(page, '#jurisdiction_pplAddr_addressLine1',jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByIdSingle(page, '#jurisdiction_pplAddr_zip', jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString());
            await this.fillInputByIdSingle(page, '#jurisdiction_pplAddr_city', jsonData.data.Payload.Principle_Address.PA_City);
            await this.clickButton(page, '#pageButton2');
            await this.clickButton(page, '#pageButton3');
           
            //Registered Agent
            await this.selectRadioButtonById(page, 'registeredAgent_indvAssocNameEntityType');
            const rafullname = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = rafullname.split(' ');
            await this.fillInputByIdSingle(page, '#registeredAgent_individual_firstName', firstName );
            await this.fillInputByIdSingle(page, '#registeredAgent_individual_lastName',lastName );
            await this.fillInputByIdSingle(page, '#registeredAgent_address_addressLine1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByIdSingle(page, '#registeredAgent_address_zip', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString().toString());
            await this.fillInputByIdSingle(page, '#registeredAgent_address_city', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.clickButton(page, '#pageButton2');
            await this.clickButton(page, '#pageButton3');

            //organizer
            await this.clickButton(page, '#organizer_multiObjectAdd');
            const orgfullname = jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name;
            const [orgfirstName, orglastName] = orgfullname.split(' ');
            await this.fillInputByIdSingle(page, '#organizer_individual_firstName', orgfirstName );
            await this.fillInputByIdSingle(page, '#organizer_individual_lastName', orglastName);
            await this.fillInputByIdSingle(page, '#organizer_address_addressLine1', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1);
            await this.fillInputByIdSingle(page, '#organizer_address_zip', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code.toString().toString());
            await this.fillInputByIdSingle(page, '#organizer_address_city', jsonData.data.Payload.Organizer_Information.Org_Address.Org_City);
            await this.clickButton(page, '#organizer_saveButton');
            await this.clickButton(page, '#pageButton2');
            await this.clickButton(page, '#pageButton3');

            //individual
            await this.clickButton(page, '#indDirectKnowledge_multiObjectAdd');
            await this.fillInputByIdSingle(page, '#indDirectKnowledge_individual_firstName', orgfirstName );
            await this.fillInputByIdSingle(page, '#indDirectKnowledge_individual_lastName', orglastName);
            await this.fillInputByIdSingle(page, '#indDirectKnowledge_address_addressLine1', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1);
            await this.fillInputByIdSingle(page, '#indDirectKnowledge_address_zip', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code.toString());
            await this.fillInputByIdSingle(page, '#indDirectKnowledge_address_city', jsonData.data.Payload.Organizer_Information.Org_Address.Org_City);
            await this.clickButton(page, '#indDirectKnowledge_saveButton');
            await this.clickButton(page, '#pageButton2');
            await this.clickButton(page, '#pageButton3');

            //member-manager
            await this.selectRadioButtonById(page, 'management_trueType');
            await this.clickButton(page, '#pageButton2');
            await this.clickButton(page, '#pageButton3');
            await this.selectRadioButtonById(page, 'memberManager_addMemberManagersNo');
            await this.clickButton(page, '#pageButton2');
            await this.clickButton(page, '#pageButton3');
            await this.selectRadioButtonById(page, 'professionalServices_falseType');
            await this.clickButton(page, '#pageButton2');
            await this.clickButton(page, '#pageButton3');
            await this.clickButton(page, '#pageButton2');
            await this.clickButton(page, '#pageButton3');


        } catch (error) {
            logger.error('Error in NewJersy For LLC form this:', error.stack);
            throw new Error(`NewJersy For LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = OregonForLLC;