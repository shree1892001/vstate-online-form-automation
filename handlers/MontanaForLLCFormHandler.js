const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class MontanaForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async MontanaForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await this.clickButton(page, '.btn.btn-default.login-link');
            await this.fillInputByName(page,'username',jsonData.data.State.filingWebsiteUsername)
            await this.fillInputByName(page,'password',jsonData.data.State.filingWebsitePassword)

            
            await this.clickButton(page, '.btn-raised.btn-light-primary.submit');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await this.clickButton(page, 'a[href="/forms"]');
            await this.clickOnTitle(page, 'Articles of Organization for Domestic Limited Liability Company');
            await this.clickButton(page,'button.btn.btn-primary.btn-text')
            await this.selectRadioButtonByLabel(page,'Standard Processing - $35.00 - Up to 7 - 10 business days processing')
            await this.clickButton(page,'button.btn.btn-raised.btn-primary.next.toolbar-button')
            await this.selectRadioButtonByLabel(page,'Limited Liability Company (LLC)')
            await this.selectRadioButtonByLabel(page, 'No');
            const input_company_name = [
            { label: 'field-field1-undefined', value: jsonData.data.Payload.Name.CD_LLC_Name },
            { label: 'field-field2-undefined', value: jsonData.data.Payload.Name.CD_LLC_Name }
            
            ];
            await this.addInput(page, input_company_name)
            await this.selectRadioButtonByLabel(page,'The business name selected is unique across all registered businesses.  No error message is noted above.')
            await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')
            await new Promise(resolve => setTimeout(resolve, 5000))
            await this.selectRadioButtonByLabel(page, 'Perpetual / Ongoing');
            await this.fillInputByName(page,'ADDR1',jsonData.data.Payload.Principle_Address.PA_Address_Line1)
            await this.fillInputByName(page,'CITY',jsonData.data.Payload.Principle_Address.PA_City)
            await this.clickDropdown(page, '#field-addr-state-B1nv2SCh7',  jsonData.data.Payload.Principle_Address.PA_State)
            await this.fillInputByName(page,'POSTAL_CODE',String(jsonData.data.Payload.Principle_Address.PA_Zip_Code))
           
            await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')
            await this.clickButton(page, '.add');
            await this.selectRadioButtonByLabel(page,'Individual')
            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = fullName.split(' ');
       
            await this.fillInputByName(page,'FIRST_NAME',firstName)
            await this.fillInputByName(page,'LAST_NAME',lastName)
            await this.fillInputByName(page, 'EMAIL',  jsonData.data.Payload.Registered_Agent.RA_Email_Address)
            await this.fillInputByName(page,'ADDR1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1)
            await this.fillInputByName(page, 'CITY',  jsonData.data.Payload.Registered_Agent.RA_Address.RA_City)
            await this.fillInputByName(page,'POSTAL_CODE',String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code))
            
            const inputData = [
                { selector: '#field-address1-HUiGhYlJJ_MAIL', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1 },
                { selector: '#field-addr-city-HUiGhYlJJ_MAIL', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City },
                { selector: '#field-addr-zip-HUiGhYlJJ_MAIL', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code }
            ];
            await this.fillInputbyid(page, inputData);
            await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button.btn.btn-raised.btn-primary'));
                const saveButton = buttons.find(button => button.textContent.trim() === 'Save');
                if (saveButton) {
                    saveButton.click();
                } else {
                    console.error('Save button not found');
                }
            });
            await new Promise(resolve => setTimeout(resolve, 3000))
            const labelForAttribute = 'field-B1HW-DPiX';  
            await page.waitForSelector(`label[for="${labelForAttribute}"]`, { visible: true, timeout: 30000 });
            await page.click(`label[for="${labelForAttribute}"]`);
            await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')
            await this.selectRadioButtonByLabel(page, 'Managers'); 
            await this.clickButton(page, '.btn.btn-raised.btn-primary.form-button.add-row')
            await this.selectRadioButtonByLabel(page,'Individual')
            const orgfullName = jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name;
            const [orgfirstName, orglastName] = orgfullName.split(' ');
            const register_agent_fields = [
                { label: 'First Name*', value: orgfirstName },
                { label: 'Last Name*', value: orglastName}
                ];
            await this.addInput(page, register_agent_fields)
            const inputDataorg = [
                { selector: '#field-address1-HycDG_Dim', value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1 },
                { selector: '#field-addr-city-HycDG_Dim', value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_City },
                { selector: '#field-addr-zip-HycDG_Dim', value: String(jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code )}
            ];
            await this.fillInputbyid(page, inputDataorg);
            await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button.btn.btn-raised.btn-primary'));
                const saveButton = buttons.find(button => button.textContent.trim() === 'Save');
                if (saveButton) {
                    saveButton.click();
                } else {
                    console.error('Save button not found');
                }
            });
            await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')
            await this.selectRadioButtonByLabel(page, 'No');
            await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')

            
        } catch (error) {
            logger.error('Error in Montana For LLC form handler:', error.stack);
            throw new Error(`Montana For LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = MontanaForLLC;


