const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
const path = require('path');  // Ensure path is imported here


class IowaForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async IowaForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            const inputFields = [
                { label: 'UserName', value: jsonData.data.State.filingWebsiteUsername },
                { label: 'Password', value: jsonData.data.State.filingWebsitePassword }
            ];

            await this.addInput(page, inputFields);
            await this.clickButton(page, '#btnLogin');
            await new Promise(resolve => setTimeout(resolve, 4000))
            await this.clickOnLinkByText(page, 'Form an Iowa limited liability company');
            await this.selectDropdownOptionnyplaceholder(page,'select[display-name="Chapter"]','CODE 489 DOMESTIC LIMITED LIABILITY COMPANY')
            await this.fillInputByPlaceholder(page, 'Corporation Name', jsonData.data.Payload.Name.CD_LLC_Name);
            await this.clickButton(page, 'button[data-cmd="CheckName"]');
        
            await page.click('.btn.btn-primary'); 

    const fileInputSelector = '[id$="_Upload"]';
    await page.waitForSelector(fileInputSelector, { timeout: 60000 });

    const filePath = path.resolve(__dirname, '"C:/Users/Redberyl/Downloads/CertificateOfOrganization.pdf"');

    const inputUploadHandle = await page.$(fileInputSelector);
    await inputUploadHandle.uploadFile(filePath);

    
            const principalOfficeFields = [
                { label: 'Address Line  1', value: jsonData.data.Payload.Principle_Address.PA_Address_Line1, sectionText: 'Principal office' },
                { label: 'City', value: jsonData.data.Payload.Principle_Address.PA_City, sectionText: 'Principal office' },
                { label: 'State', value: jsonData.data.Payload.Principle_Address.PA_State, sectionText: 'Principal office' },
                { label: 'Zip', value: String(jsonData.data.Payload.Principle_Address.PA_Zip_Code), sectionText: 'Principal office' },
            ];
            await this.addInputbyselector(page, principalOfficeFields);
            const principalOfficemailingFields = [
                { label: 'Address Line  1', value: jsonData.data.Payload.Principle_Address.PA_Address_Line1, sectionText: 'The mailing address of the entity’s principal office' },
                { label: 'City', value: jsonData.data.Payload.Principle_Address.PA_City, sectionText: 'The mailing address of the entity’s principal office' },
                { label: 'State', value: jsonData.data.Payload.Principle_Address.PA_State, sectionText: 'The mailing address of the entity’s principal office' },
                { label: 'Zip', value: String(jsonData.data.Payload.Principle_Address.PA_Zip_Code), sectionText: 'The mailing address of the entity’s principal office' },
            ];
            await this.addInputbyselector(page, principalOfficemailingFields);
            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const registeredAgentFields = [
                { label: 'Full Name', value: fullName, sectionText: 'Registered Agent and Address of the Registered Agent' },
                { label: 'Address Line  1', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1, sectionText: 'Registered Agent and Address of the Registered Agent' },
                { label: 'City', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City, sectionText: 'Registered Agent and Address of the Registered Agent' },
                { label: 'Zip', value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code), sectionText: 'Registered Agent and Address of the Registered Agent' },
            ];
            await this.addInputbyselector(page, registeredAgentFields);
            const registeredAgentField = [
                { label: 'Address Line  1', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1, sectionText: 'The mailing address of its registered agent' },
                { label: 'City', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City, sectionText: 'The mailing address of its registered agent' },
                { label: 'State', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_State, sectionText: 'The mailing address of its registered agent' },
                { label: 'Zip', value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code), sectionText: 'The mailing address of its registered agent' },
            ];
            await this.addInputbyselector(page, registeredAgentField);
            await page.waitForSelector('input[aria-label^="I certify under penalty of perjury"]', { visible: true });
            // Click the checkbox
            await page.click('input[aria-label^="I certify under penalty of perjury"]');
            await page.waitForSelector('input[placeholder="Full Legal Name"]', { visible: true });
            await page.type('input[placeholder="Full Legal Name"]',jsonData.data.Payload.Organizer_Information.Org_Name, { delay: 100 });
           // await page.waitForSelector('button[title="Save Work"]', { visible: true });
           // await page.click('button[title="Save Work"]');
           // await page.waitForSelector('button[title="Review & Pay"]', { visible: true });
          //  await page.click('button[title="Review & Pay"]');
        } catch (error) {
            logger.error('Error in Kentucky For CORP form handler:', error.stack);
            throw new Error(`Kentucky For CORP form submission failed: ${error.message}`);
        }
    }
    async addInputbyselector(page, inputFields) {
        try {
            for (let field of inputFields) {
                const { value, label, sectionText } = field;
    
                // Find the section that contains the specified text
                const inputSelector = await page.evaluate((label, sectionText) => {
                    // Find the section based on the panel-header text
                    const panels = Array.from(document.querySelectorAll('div.panel'));
                    let container = null;
    
                    for (let panel of panels) {
                        const header = panel.querySelector('.panel-header-text');
                        if (header && header.textContent.trim().includes(sectionText)) {
                            container = panel;
                            break;
                        }
                    }
    
                    // If the container is found, look for the label and associated input
                    if (container) {
                        const labelElement = Array.from(container.querySelectorAll('label')).find(el => el.textContent.trim() === label);
                        if (labelElement) {
                            const inputElement = labelElement.closest('.form-group').querySelector('input, select');
                            return inputElement ? `#${inputElement.id}` : null;
                        }
                    }
                    return null;
                }, label, sectionText);
    
                if (inputSelector) {
                    await page.waitForSelector(inputSelector, { visible: true });
                    await page.type(inputSelector, value, { delay: 100 });
                    console.log(`Filled input for label "${label}" with value "${value}" in section containing "${sectionText}"`);
                } else {
                    console.error(`Input not found for label "${label}" in section containing "${sectionText}"`);
                }
            }
        } catch (error) {
            console.error("Error filling input fields:", error.message);
            throw error;
        }
    }
    
    
}

module.exports = IowaForLLC;


