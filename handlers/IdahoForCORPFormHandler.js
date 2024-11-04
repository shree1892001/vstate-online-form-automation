const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class IdahoForCORP extends BaseFormHandler {
    constructor() {
        super();
    }

    async IdahoForCORP(page, jsonData) {
        try {
            logger.info('Navigating to Idaho form submission page...');

            // Navigate to the Idaho form submission page
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);

            // Login process
            await this.clickButton(page, '.btn.btn-default.login-link');
            const inputFields = [
                { label: 'username', value: jsonData.data.State.filingWebsiteUsername },
                { label: 'password', value: jsonData.data.State.filingWebsitePassword }
            ];
            await this.addInput(page, inputFields);
            await this.clickButton(page, '.btn-raised.btn-light-primary.submit');

            // Navigate to "Articles of Incorporation" section
            await page.waitForSelector('span.title');
            await page.$$eval('span.title', spans => {
                const targetElement = spans.find(span => span.textContent.trim() === 'Articles of Incorporation (General Business Corporation)');
                if (targetElement) {
                    targetElement.click();
                } else {
                    throw new Error('Articles of Incorporation option not found');
                }
            });

            await page.click('button.btn.btn-primary.btn-text');

            // Company name input
            const inputCompanyName = [
                { label: 'field-field1-undefined', value: jsonData.data.Payload.Name.CD_CORP_Name },
                { label: 'field-field2-undefined', value: jsonData.data.Payload.Name.CD_CORP_Name }
            ];
            await this.addInput(page, inputCompanyName);
            await page.click('button.btn.btn-raised.btn-primary.next.toolbar-button');

            // Shares input
            const shares = [
                { label: 'field-S1L7R3kJ-G', value: jsonData.data.Payload.Stock_Details.SI_No_Of_Shares }
            ];
            await this.addInput(page, shares);
            await page.click('button.btn.btn-raised.btn-primary.next.toolbar-button');

            // Mailing address address input
            const principalAddress = [
                { label: 'field-address1-BkI2Dnk1ZM', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1},
                { label: 'field-addr-city-BkI2Dnk1ZM', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City},
                { label: 'field-addr-zip-BkI2Dnk1ZM', value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code)}
            ];
            await this.addInput(page, principalAddress);
            await this.clickDropdown(page, '#field-addr-state-BkI2Dnk1ZM', 'ID');
            await this.clickDropdown(page, '#field-addr-country-BkI2Dnk1ZM', 'United States');

            await this.selectRadioButtonByLabel(page, 'Noncommercial or Individual');
            await page.click('button.btn.btn-medium-neutral.add');

            // Registered Agent input
            const raFullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = raFullName.split(' ');
            await this.fillInputByName(page, 'FIRST_NAME', firstName);
            await this.fillInputByName(page, 'LAST_NAME', lastName);

            console.log("trying to add data in ra")
            await this.fillInputbyid(page, [{ selector: '#field-address1-ryIrEjxIf_PRIMARY', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1}]);
            await this.fillInputbyid(page, [{ selector: '#field-addr-city-ryIrEjxIf_PRIMARY', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City}]);
            await this.fillInputbyid(page, [{ selector: '#field-addr-zip-ryIrEjxIf_PRIMARY', value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code)}]);

            // Fill "Mailing Address": "Address Line 1"

            await this.fillInputbyid(page, [{ selector: '#field-address1-ryIrEjxIf_MAIL', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1}]);
            await this.fillInputbyid(page, [{ selector: '#field-addr-city-ryIrEjxIf_MAIL', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City}]);
            // Fill "ZIP Code" for Mailing Address
            await this.fillInputbyid(page, [{ selector: '#field-addr-zip-ryIrEjxIf_MAIL', value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code)}]);

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

                
            await new Promise(resolve => setTimeout(resolve, 5000))

            const labelForAttribute = 'field-H1dcEVxX8';  
            await page.waitForSelector(`label[for="${labelForAttribute}"]`, { visible: true, timeout: 30000 });
            await page.click(`label[for="${labelForAttribute}"]`);


            await page.waitForSelector('button.btn.btn-raised.btn-primary.next.toolbar-button', { visible: true });
            await page.evaluate(() => {
                document.querySelector('button.btn.btn-raised.btn-primary.next.toolbar-button').click();
            });


        
            // Adding new incorporator button
            await page.waitForSelector('button.btn.btn-raised.btn-primary.form-button.add-row', { visible: true });
            await page.evaluate(() => {
                document.querySelector('button.btn.btn-raised.btn-primary.form-button.add-row').click();
            });
            

            // Incorporator input
            const Incname = jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name;
            const [firstInc, lastInc] = Incname.split(' ');
            await this.fillInputByName(page, 'FIRST_NAME', firstInc);
            await this.fillInputByName(page, 'LAST_NAME', lastInc);

            // Log the attempt to add data
            console.log("Trying to add data for Registered Agent (RA)");

            // Fill "Address Line 1" for Registered Agent Primary
            await this.fillInputbyid(page, [{ 
                selector: '#field-address1-B1zN6wp7EQ', 
                value: jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1
            }]);

            // Fill "City" for Registered Agent Primary
            await this.fillInputbyid(page, [{ 
                selector: '#field-addr-city-B1zN6wp7EQ', 
                value: jsonData.data.Payload.Incorporator_Information.Address.Inc_City 
            }]);

            // Fill "ZIP Code" for Registered Agent Primary
            await this.fillInputbyid(page, [{ 
                selector: '#field-addr-zip-B1zN6wp7EQ', 
                value: String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code)
            }]);


            await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button.btn.btn-raised.btn-primary'));
                const targetButton = buttons.find(button => button.textContent.trim() === 'Save');
                if (targetButton) {
                    targetButton.click();
                    console.log('Clicked the Save button');
                } else {
                    console.log('Save button not found');
                }
            });
            
            // Wait for 5 seconds
            await new Promise(resolve => setTimeout(resolve, 5000));
            

            // Director input

            // Adding new Director button
            const buttons = await page.$$('button.btn.btn-raised.btn-primary.form-button.add-row');
            if (buttons.length > 1) {
                await buttons[1].click(); // Clicks the second button (index 1) in the list of matched buttons
                console.log('Clicked the Add button');
            } else {
                console.log('Add button not found');
            }
            

            const dirName = jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name;
            const [firstDir, lastDir] = dirName.split(' ');
            await this.fillInputByName(page, 'FIRST_NAME', firstDir);
            await this.fillInputByName(page, 'LAST_NAME', lastDir);

            console.log("Trying to add data in director address");

            // Fill "Address Line 1"
            await this.fillInputbyid(page, [{ selector: '#field-address1-ryDNpwaQVm', value: jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1 }]);
            
            // Fill "City"
            await this.fillInputbyid(page, [{ selector: '#field-addr-city-ryDNpwaQVm', value: jsonData.data.Payload.Incorporator_Information.Address.Inc_City }]);
            
            // Fill "ZIP Code"
            await this.fillInputbyid(page, [{ selector: '#field-addr-zip-ryDNpwaQVm', value: String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code)}]);
            

            await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button.btn.btn-raised.btn-primary'));
                const targetButton = buttons.find(button => button.textContent.trim() === 'Save');
                if (targetButton) {
                    targetButton.click();
                    console.log('Clicked the Save button');
                } else {
                    console.log('Save button not found');
                }
            });


            await page.waitForSelector('button.btn.btn-raised.btn-primary.next.toolbar-button', { visible: true });
            await page.evaluate(() => {
                document.querySelector('button.btn.btn-raised.btn-primary.next.toolbar-button').click();
            });
        

        } catch (error) {
            logger.error('Error in IdahoForCORP form handler:', error.stack);
            throw new Error(`IdahoForCORP form submission failed: ${error.message}`);
        }
    }
}

module.exports = IdahoForCORP;