const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class WyomingForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async WyomingForLLC(page, jsonData) {
        try {
            logger.info('Navigating to wyoming form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await this.clickButton(page, '#regStartNow');
            await this.selectRadioButtonById(page, 'MainContent_chkAgree');
            await this.clickDropdown(page, '#MainContent_slctBusType', 'Limited Liability Company (Domestic)');
            await new Promise(resolve => setTimeout(resolve, 5000));
            await page.waitForSelector('#MainContent_ContinueButton');
            await page.click('#MainContent_ContinueButton');
            await this.fillInputByName(page, 'ctl00$MainContent$ucName$txtName', jsonData.data.Payload.Name.CD_LLC_Name );
            await this.fillInputByName(page, 'ctl00$MainContent$ucName$txtNameConfirm', jsonData.data.Payload.Name.CD_LLC_Name);
            await this.clickButton(page, '#ContinueButton');
            await new Promise(resolve => setTimeout(resolve, 5000));
            await page.keyboard.press('Enter');
            await this.clickButton(page, '#ContinueButton');
            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = fullName.split(' ');
            const inputFieldsforRA = [
                { selector: '#txtFirstName', value: firstName },        // First Name input
                { selector: '#txtLastName', value: lastName },          // Last Name input (make sure this ID is correct)
                { selector: '#txtAddr1', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1 },  // Address input
                { selector: '#txtCity', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City },      // City input (ensure proper ID)
            ];
            await this.addInput(page, inputFieldsforRA);
            await this.clickButton(page, '#txtPhone');
            await this.clickButton(page, '.postalCodeListItem:nth-child(1)');
            await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtPhone', jsonData.data.Payload.Registered_Agent.RA_Contact_No );
            await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtEmail', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await page.click('#chkRAConsent');
            await this.clickButton(page, '#ContinueButton');
            const errorMessageSelector = '#lblErrorMessage';  // Define the selector
            try {
                // Wait for the error message to appear on the page
                await page.waitForSelector(errorMessageSelector, { visible: true, timeout: 5000 });
                console.log('Error message detected.');
                await this.clickButton(page, '#ContinueButton');
            } catch (error) {
                console.log('Error message not found or other issue:', error.message);
                await this.clickButton(page, '#ContinueButton');
            }
            await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtAddr1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtCity', jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtState', jsonData.data.Payload.Principle_Address.PA_State);
            await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtPostal', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtPhone', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtEmail', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtAddr1Mail', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtCityMail', jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtStateMail', jsonData.data.Payload.Principle_Address.PA_State);
            await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtPostalMail',String( jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.clickButton(page, '#ContinueButton');
            const OrgfullName = jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name;
            const [OrgfirstName, OrglastName] = OrgfullName.split(' ');
            await this.fillInputByName(page, 'ctl00$MainContent$ucParties$txtFirstName', OrgfirstName);
            await this.fillInputByName(page, 'ctl00$MainContent$ucParties$txtLastName', OrglastName);
            await this.fillInputByName(page, 'ctl00$MainContent$ucParties$txtMail1', 
                jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1 + ' ,' +
                jsonData.data.Payload.Organizer_Information.Org_Address.Org_City + ', ' +
                jsonData.data.Payload.Organizer_Information.Org_Address.Org_State + ', ' +
               String( jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code
            ));
            await new Promise(resolve => setTimeout(resolve, 1000))
            await page.waitForSelector('#SaveButton');
            await this.clickButton(page, '#SaveButton');
            await new Promise(resolve => setTimeout(resolve, 1000))
            await page.waitForSelector('#ContinueButton');
            await page.click('#ContinueButton');
            await new Promise(resolve => setTimeout(resolve, 3000))
            await page.waitForSelector('#ContinueButton');
            await page.click('#ContinueButton');
            await page.waitForSelector('#ContinueButton');
            await page.click('#ContinueButton');

        } catch (error) {
            logger.error('Error in wyoming LLC form handler:', error.stack);
            throw new Error(`wyoming LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = WyomingForLLC;
