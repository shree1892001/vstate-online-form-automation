const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class IllinoisForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async IllinoisForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            //select LLC
            await this.clickOnLinkByText(page, 'Organize a Limited Liability Company');
            await this.selectRadioButtonById(page, 'llcNo');
            await this.clickButton(page, 'input[type="submit"].formbutton');
            await page.click('input[type="radio"][name="provisions"][value="y"]');
            await this.clickButton(page, 'input[type="submit"].formbutton');
            //add llc name
            await this.fillInputByName(page, 'llcName', jsonData.data.Payload.Name.CD_LLC_Name);
            await this.clickButton(page, 'input[type="submit"].formbutton');
            // await page.waitForSelector('input[name="agree"]', { visible: true });
            // await page.click('input[name="agree"]');

            await page.waitForSelector('input[value="Continue"][type="submit"]');
    await page.click('input[value="Continue"][type="submit"]');
            // await this.clickButton(page, 'input[name="submitform"]');
            //add principle address
            await this.fillInputByName(page, 'llcStreet', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'llcCity', jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByName(page, 'llcZipCode', jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString());
            await this.clickDropdown(page, 'select[name="llcState"]', 'ALABAMA');
            await this.clickButton(page, 'input[type="submit"].formbutton');
            //add register agent
            await this.fillInputByName(page, 'agent', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(page, 'address', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'city', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'zip', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString());
            await this.clickButton(page, 'input[type="submit"].formbutton');
            await this.clickButton(page, 'input[name="contwithout"]');
            await this.clickButton(page, 'input[name="noUsps"]');
            await this.clickButton(page, 'input[name="submit"]');

            // fill input members 
            await this.fillInputByName(page, 'members[0].name', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name);
            await this.fillInputByName(page, 'members[0].address', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1);
            await this.fillInputByName(page, 'members[0].city', jsonData.data.Payload.Organizer_Information.Org_Address.Org_City);
            await this.fillInputByName(page, 'members[0].state', jsonData.data.Payload.Organizer_Information.Org_Address.Org_State);
            await this.fillInputByName(page, 'members[0].zipCode', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code.toString());
            await this.clickButton(page, 'input[type="submit"].formbutton');
            // fill input organizer address
            await this.fillInputByName(page, 'name', jsonData.data.Payload.Member_Or_Manager_Details[0].Mom_Name);
            await this.fillInputByName(page, 'street', jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_Address_Line1);
            await this.fillInputByName(page, 'city', jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_City);
            await this.fillInputByName(page, 'zipCode', jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_Zip_Code.toString());
            await this.clickDropdown(page, 'select[name="state"]', jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_State);
            await this.clickButton(page, 'input[type="submit"].formbutton');
            
        } catch (error) {
            logger.error('Error in Kentucky For CORP form handler:', error.stack);
            throw new Error(`Kentucky For CORP form submission failed: ${error.message}`);
        }
    }
}

module.exports = IllinoisForLLC;


