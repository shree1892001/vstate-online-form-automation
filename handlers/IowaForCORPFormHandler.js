const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
// const fs = require('fs');
// const puppeteer = require('puppeteer');

class IowaForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async IowaForCORP(page, jsonData) {
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
            await this.clickOnLinkByText(page, 'Form an Iowa corporation');
            await this.selectDropdownOptionnyplaceholder(page,'select[display-name="Chapter"]','CODE 490 DOMESTIC PROFIT')
            await this.fillInputByPlaceholder(page, 'Corporation Name', jsonData.data.Payload.Name.CD_CORP_Name);
            await this.clickButton(page, 'button[data-cmd="CheckName"]');
            await page.waitForSelector('select.form-control[data-property="Type"]', { visible: true });

            // Click the select element to open the dropdown
            await page.click('select.form-control[data-property="Type"]');

            await page.click('select.form-control[data-property="Type"]');

            await page.select('select.form-control[data-property="Type"]', 'Common');

            // Fill the input field with the required value (e.g., '100')
            // await page.type('input.form-control.numeric[data-property="Shares"]', String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares), { delay: 100 });
            await page.type('input[data-property="Shares"][data-role="numerictextbox"]',jsonData.data.Payload.Stock_Details.SI_No_Of_Shares);
            await page.type('input[data-property="Shares"][data-role="numerictextbox"]',String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares));

            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const registeredAgentFields = [
                { label: 'Full Name', value: fullName, sectionText: 'Registered agent and street address of the registered office in Iowa' },
                { label: 'Address Line  1', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1, sectionText: 'Registered agent and street address of the registered office in Iowa' },
                { label: 'City', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City, sectionText: 'Registered agent and street address of the registered office in Iowa' },
                { label: 'State', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_State, sectionText: 'Registered agent and street address of the registered office in Iowa' },
                { label: 'Zip', value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code), sectionText: 'Registered agent and street address of the registered office in Iowa' },
            ];
            await this.addInputbyselector(page, registeredAgentFields);
            const registeredAgentField = [
                { label: 'Address Line  1', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1, sectionText: 'The mailing address of its registered agent in Iowa' },
                { label: 'City', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City, sectionText: 'The mailing address of its registered agent in Iowa' },
                { label: 'State', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_State, sectionText: 'The mailing address of its registered agent in Iowa' },
                { label: 'Zip', value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code), sectionText: 'The mailing address of its registered agent in Iowa' },
            ];
            await this.addInputbyselector(page, registeredAgentField);

            const incorporatorFields = [
                { label: 'Full Name', value: jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name, sectionText: 'Incorporator' },
                { label: 'Address Line  1', value: jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1, sectionText: 'Incorporator' },
                { label: 'City', value: jsonData.data.Payload.Incorporator_Information.Address.Inc_City, sectionText: 'Incorporator' },
                { label: 'State', value:jsonData.data.Payload.Incorporator_Information.Address.Inc_State, sectionText: 'Incorporator' },
                { label: 'Zip', value: String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code), sectionText: 'Incorporator' },
            ];
            await this.addInputbyselector(page, incorporatorFields);
            
            await page.waitForSelector('input[aria-label^="I certify under penalty of perjury"]', { visible: true });
            // Click the checkbox
            await page.click('input[aria-label^="I certify under penalty of perjury"]');
            await page.waitForSelector('input[placeholder="Full Legal Name"]', { visible: true });
            await page.type('input[placeholder="Full Legal Name"]',jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name, { delay: 100 });
            await page.waitForSelector('button.btn.btn-lg.btn-primary.centered', { visible: true });
            // Click the button
            await page.click('button.btn.btn-lg.btn-primary.centered');
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

module.exports = IowaForCORP;


