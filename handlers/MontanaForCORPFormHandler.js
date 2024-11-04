const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class MontanaForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async MontanaForCORP(page, jsonData) {
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
            await this.clickOnTitle(page, 'Articles of Incorporation for Domestic Profit Corporation');
            await this.clickButton(page,'button.btn.btn-primary.btn-text')
            await this.selectRadioButtonByLabel(page,'Standard Processing - $35.00 - Up to 7-10 business days processing')
            //await this.clickButton(page,'button.btn.btn-raised.btn-primary.next.toolbar-button')
            await this.selectRadioButtonByLabel(page,'when filed with the Secretary of State')
            await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')
            await this.selectRadioButtonByLabel(page, 'General For Profit Corporation');
            await this.selectRadioButtonByLabel(page, 'No');
            const input_company_name = [
            { label: 'field-field1-undefined', value: jsonData.data.Payload.Name.CD_CORP_Name },
            { label: 'field-field2-undefined', value: jsonData.data.Payload.Name.CD_CORP_Name }
            
            ];
            await this.addInput(page, input_company_name)
            await this.selectRadioButtonByLabel(page,'The business name selected is unique across all registered businesses.  No error message is noted above.')
            await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')
            await this.selectRadioButtonByLabel(page, 'Perpetual / Ongoing');
            await this.selectRadioButtonByLabel(page, 'Perpetual / Ongoing');
            await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')
            await this.clickButton(page ,'button.btn.btn-raised.btn-primary.form-button.add-row')
            await this.clickDropdown(page, '#field-BJFF_vLjQ', 'Common');
            const shares_fields = [
                { label: 'Shares Authorized*', value: String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares) }
            ];
            
            await this.addInput(page, shares_fields)
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
                { selector: '#field-address1-HknebDwim_MAIL', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1 },
                { selector: '#field-addr-city-HknebDwim_MAIL', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City },
                { selector: '#field-addr-zip-HknebDwim_MAIL', value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code) }
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
            await new Promise(resolve => setTimeout(resolve, 2000))
            await this.clickButton(page, '.btn.btn-raised.btn-primary.form-button.add-row')
            await this.selectRadioButtonByLabel(page,'Individual')
            const IncfullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [IncfirstName, InclastName] = IncfullName.split(' ');
       
            await this.fillInputByName(page,'FIRST_NAME',IncfirstName)
            await this.fillInputByName(page,'LAST_NAME',InclastName)
            await this.fillInputByName(page,'ADDR1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1)
            await this.fillInputByName(page, 'CITY',  jsonData.data.Payload.Incorporator_Information.Address.Inc_City)
            await this.fillInputByName(page,'POSTAL_CODE',String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code))
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
          await new Promise(resolve => setTimeout(resolve, 2000))
          await page.waitForSelector('label[for="HJhK9OvoQ1"]', { visible: true }); // Wait for the label to be visible
          await page.click('label[for="HJhK9OvoQ1"]'); // Click the label
          console.log('Clicked the label for the "No" radio button.');
          await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')
        } catch (error) {
            logger.error('Error in Montana For CORP form handler:', error.stack);
            throw new Error(`Montana For CORP form submission failed: ${error.message}`);
        }
    }
    
}

module.exports = MontanaForCORP;


