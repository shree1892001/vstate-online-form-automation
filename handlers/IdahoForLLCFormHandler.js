const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
const { add } = require('winston');

class IdahoForLLC extends BaseFormHandler {
    constructor() {
        super();
    }

    async  IdahoForLLC(page, jsonData) {
      try {
        logger.info('Navigating to Idaho form submission page...');

        const url = jsonData.data.State.stateUrl;
          await this.navigateToPage(page, url);
          await this.clickButton(page, '.btn.btn-default.login-link');
          const inputFields = [
              { label: 'username', value: jsonData.data.State.filingWebsiteUsername },
              { label: 'password', value: jsonData.data.State.filingWebsitePassword }
          ];
          await this.addInput(page, inputFields);
          await this.clickButton(page, '.btn-raised.btn-light-primary.submit');
          
          
          await page.waitForSelector('span.title');
          await page.$$eval('span.title', spans => {
            const targetElement = spans.find(span => span.textContent.trim() === 'Certificate of Organization Limited Liability Company');
            if (targetElement) {
              targetElement.click();
            } else {
              console.error('Element not found');
            }
          });
          
          await this.clickButton(page,'button.btn.btn-primary.btn-text');
          
          // await this.clickButton(page,'field-label radio-label');
          await this.selectRadioButtonByLabel(page,'Limited Liability Company');

          const input_company_name = [
            { label: 'field-field1-undefined', value: jsonData.data.Payload.Name.CD_LLC_Name },
            { label: 'field-field2-undefined', value: jsonData.data.Payload.Name.CD_LLC_Name }
            
            ];
            await this.addInput(page, input_company_name);
            
            await this.clickButton(page, 'button.btn.btn-raised.btn-primary.next.toolbar-button');

          const principaladdress = [
            {label: 'field-address1-r1lfZGRIgX', value:jsonData.data.Payload.Principle_Address.PA_Address_Line1},
            {label: 'field-addr-city-r1lfZGRIgX', value:jsonData.data.Payload.Principle_Address.PA_City},
            {label: 'field-addr-zip-r1lfZGRIgX', value:String(jsonData.data.Payload.Principle_Address.PA_Zip_Code)}
            ];

          await this.addInput(page, principaladdress);
          await this.clickDropdown(page, '#field-addr-state-r1lfZGRIgX', 'ID');
          await this.clickDropdown(page, '#field-addr-country-r1lfZGRIgX', 'United States');

          const mailingaddress =[
            {label: 'field-address1-HJzMbzRIxm', value:jsonData.data.Payload.Principle_Address.PA_Address_Line1},
            {label: 'field-addr-city-HJzMbzRIxm', value:jsonData.data.Payload.Principle_Address.PA_City},
            {label: 'field-addr-zip-HJzMbzRIxm', value:String(jsonData.data.Payload.Principle_Address.PA_Zip_Code)},
            
          ];
          await this.addInput(page, mailingaddress);
          await this.clickDropdown(page, '#field-addr-state-HJzMbzRIxm', 'ID');
          await this.clickDropdown(page, '#field-addr-country-HJzMbzRIxm', 'United States');

          await page.click('button.btn.btn-raised.btn-primary.next.toolbar-button');

          await this.selectRadioButtonByLabel(page,'Noncommercial or Individual');

          await page.click('button.btn.btn-medium-neutral.add');

                    // Registerd Agent
                    const rafullname = jsonData.data.Payload.Registered_Agent.RA_Name;
                    const [firstName, lastName] = rafullname.split(' ');
                    await this.fillInputByName(page,'FIRST_NAME',firstName);
                    await this.fillInputByName(page,'LAST_NAME',lastName);
          
                    const regagent = [
                      { selector: '#field-address1-SJBKrsl8M_PRIMARY', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1},
                      { selector: '#field-addr-city-SJBKrsl8M_PRIMARY', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City},
                      { selector: '#field-addr-zip-SJBKrsl8M_PRIMARY', value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code)},
                  
                      { selector: '#field-address1-SJBKrsl8M_MAIL', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1},
                      { selector: '#field-addr-city-SJBKrsl8M_MAIL', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City},
                      { selector: '#field-addr-zip-SJBKrsl8M_MAIL', value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code)}
                  ];
                  
                  await this.fillInputbyid(page, regagent);
          
          
                  
                      // Click the Save Button
                      await page.evaluate(() => {
                        const buttons = Array.from(document.querySelectorAll('button'));
                        const targetButton = buttons.find(button => button.textContent.trim() === 'Save');
                        if (targetButton) {
                            targetButton.click();
                            console.log('Clicked the Save button');
                        } else {
                            console.log('Save button not found');
                        }
                    });
          
                    await new Promise(resolve => setTimeout(resolve, 6000))
          
                    const labelForAttribute = 'field-SJZTVExQI';  
                    await page.waitForSelector(`label[for="${labelForAttribute}"]`, { visible: true, timeout: 30000 });
                    await page.click(`label[for="${labelForAttribute}"]`);
          
          
                    await page.click('button.btn.btn-raised.btn-primary.next.toolbar-button');
          
                    
                  // Wait for the button to be available and visible
                    await page.waitForSelector('button.btn.btn-raised.btn-primary.form-button.add-row', { visible: true });
          
                    // Click the button using evaluate
                    await page.evaluate(() => {
                        document.querySelector('button.btn.btn-raised.btn-primary.form-button.add-row').click();
                    });
       

           // governer  
           const govname = jsonData.data.Payload.Organizer_Information.Org_Name;
           const [first, last] = govname.split(' ');
           await this.fillInputByName(page,'FIRST_NAME',first);
           await this.fillInputByName(page,'LAST_NAME',last);
 
           const govadd =[
             {label: 'field-address1-ByOoRiT-f',value:jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1},
             {label: 'field-addr-city-ByOoRiT-f',value:jsonData.data.Payload.Organizer_Information.Org_Address.Org_City},
             {label: 'field-addr-zip-ByOoRiT-f',value:String(jsonData.data.Payload.Organizer_Information.Org_Address.Org_Postal_Code)}
           ];
           await this.addInput(page, govadd);
           await this.clickDropdown(page, '#field-addr-state-ByOoRiT-f', 'ID');
           await this.clickDropdown(page, '#field-addr-country-ByOoRiT-f', 'United States');
 
           // Click the Save Button
           await page.evaluate(() => {
           const buttons = Array.from(document.querySelectorAll('button'));
           const targetButton = buttons.find(button => button.textContent.trim() === 'Save');
           if (targetButton) {
               targetButton.click();
               console.log('Clicked the Save button');
           } else {
               console.log('Save button not found');
           }
       });
 
         
 
           await page.click('button.btn.btn-raised.btn-primary.next.toolbar-button');
           

      } catch (error) {
          // Log full error stack for debugging
          logger.error('Error in Idaho LLC form handler:', error.stack);
          throw new Error(`Idaho LLC form submission failed: ${error.message}`);
        }
      }
    }

module.exports = IdahoForLLC;
