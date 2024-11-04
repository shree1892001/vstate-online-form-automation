const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class AlaskaForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async AlaskaForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            console.log(jsonData.data.Payload.Member_Or_Manager)
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await this.fillInputByName(page, 'ctl00$ContentMain$TextBoxLegalName', jsonData.data.Payload.Name.CD_LLC_Name);
            //add business purpose
            const inputData = [
                { selector: '#ContentMain_TextAreaPurpose', value: jsonData.data.Payload.Purpose.CD_Business_Purpose_Details}
            ];
            await this.fillInputbyid(page, inputData);
            //NAICS Code
            await this.clickDropdown(page, '#ContentMain_DDLNAICS_DDLNAICS', '111110 - SOYBEAN FARMING');
            //register agent details
            const raFullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = raFullName.split(' ');
            await this.fillInputByName(page, 'ctl00$ContentMain$TextBoxAgentFirstName', firstName);
            await this.fillInputByName(page, 'ctl00$ContentMain$TextBoxAgentLastName',lastName);
            // Mailing Address
            await this.fillInputByName(page, 'ctl00$ContentMain$AgentMailingAddress$TextBoxLine1',jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'ctl00$ContentMain$AgentMailingAddress$TextBoxCityState', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'ctl00$ContentMain$AgentMailingAddress$TextBoxZip', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await this.clickButton(page, '#ContentMain_AgentPhysicalAddress_ButtonCopy');
            //entity address
            await page.waitForSelector('input[name="ctl00$ContentMain$AgentMailingAddress$TextBoxLine1"]', {
                state: 'visible',
              });
            await this.fillInputByName(page, 'ctl00$ContentMain$EntityMailingAddress$TextBoxLine1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'ctl00$ContentMain$EntityMailingAddress$TextBoxCityState', jsonData.data.Payload.Principle_Address.PA_City);
            await this.clickDropdown(page, '#ContentMain_EntityMailingAddress_DDLState', jsonData.data.Payload.Principle_Address.PA_State);
            await this.fillInputByName(page, 'ctl00$ContentMain$EntityMailingAddress$TextBoxZip',String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.clickButton(page, '#ContentMain_EntityPhysicalAddress_ButtonCopy');
            //Manager 
            await this.selectRadioButtonById(page, 'ContentMain_RBMangerManaged');
            //add organizer
            await this.clickButton(page, '#ContentMain_Organizers_ButtonAdd');
            const orgFullName = jsonData.data.Payload.Organizer_Information.Org_Name;
            const [orgfirstName, orglastName] = orgFullName.split(' ');
            await this.fillInputByName(page, 'ctl00$ContentMain$TextBoxFirstName',orgfirstName);
            await this.fillInputByName(page, 'ctl00$ContentMain$TextBoxLastName', orglastName);
            await this.clickButton(page, '#ContentMain_ButtonSave');

            //signature
            await page.waitForSelector('#ContentMain_Signature_CheckBoxIPromise', { visible: true });
            await page.click('#ContentMain_Signature_CheckBoxIPromise');
            await this.fillInputByName(page, 'ctl00$ContentMain$Signature$TextBoxMyName',jsonData.data.Payload.Organizer_Information.Org_Name);
            await this.fillInputByName(page, 'ctl00$ContentMain$Signature$TextBoxPhone', String(jsonData.data.Payload.Organizer_Information.Org_Contact_No));
            await this.clickButton(page, '#ContentMain_ButtonProceed');

        } catch (error) {
            logger.error('Error in Colorado For LLC form handler:', error.stack);
            throw new Error(`Colorado For LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = AlaskaForLLC;


