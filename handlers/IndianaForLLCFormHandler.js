const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class IndianaForLLC extends BaseFormHandler {
    constructor() {
        super();
    }

    async IndianaForLLC(page, jsonData) {
        try {
            logger.info('Navigating to Indiana LLC form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);

            // Ensure elements are available before interacting with them
            await page.waitForSelector('input[name="username"]', { visible: true });
            await this.fillInputByName(page, 'username', jsonData.data.State.filingWebsiteUsername);
            await this.clickButton(page, 'span.icon-button__text.icon-button__text--transform-right');

            await page.waitForSelector('input[name="password"]', { visible: true });
            await this.fillInputByName(page, 'password', jsonData.data.State.filingWebsitePassword);
            await this.clickButton(page, 'span.icon-button__text.icon-button__text--transform-right');

            await page.waitForSelector('a[href="/portal/services"]', { visible: true });
            await this.clickButton(page, 'a[href="/portal/services"]');
            await this.randomSleep();

            const selector = '[aria-label="Go to INBiz"]';
            await page.waitForSelector(selector, { visible: true});
            await page.click(selector);
            console.log('Clicked on the INBiz element');

            const newPagePromise = new Promise((resolve) =>
                page.browser().once('targetcreated', (target) => resolve(target.page()))
            );
            const newPage = await newPagePromise;

            await newPage.waitForSelector('a[title="START A NEW BUSINESS"]', { visible: true });
            await this.clickButton(newPage, 'a[title="START A NEW BUSINESS"]');

            await newPage.waitForSelector('input[type="button"][value="Next"]', { visible: true });
            await this.clickButton(newPage, 'input[type="button"][value="Next"]');
            await this.clickButton(newPage, 'input[type="button"][value="Frequent User"]');
            await new Promise((resolve) => setTimeout(resolve, 5000));
            
            await newPage.click('#\\37');
            await this.clickButton(newPage, 'input[type="submit"][value="Continue"]');

            await newPage.waitForSelector('input[name="BusinessInfo.IsBusinessNameReserved"][value="false"]', { visible: true });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await newPage.click('input[name="BusinessInfo.IsBusinessNameReserved"][value="false"]');
            
            await this.fillInputByName(newPage, 'BusinessInfo.BusinessName', jsonData.data.Payload.Name.CD_LLC_Name);
            await this.clickButton(newPage, '#btnCheckAvailability');
            await newPage.waitForSelector('#btnNextButton', { visible: true });
            await this.clickButton(newPage, '#btnNextButton');

            await newPage.waitForSelector('input[name="BusinessInfo.BusinessEmail"]', { visible: true});
            await this.fillInputByName(newPage, 'BusinessInfo.BusinessEmail', jsonData.data.Payload.Registered_Agent.RA_Email_Address);

            await this.fillInputByName(newPage, 'BusinessInfo.ConfirmBusinessEmail', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(newPage, 'BusinessInfo.PrincipalOfficeAddress.Zip5', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));

            await newPage.click('input[name="BusinessInfo.PrincipalOfficeAddress.StreetAddress1"]');
            await new Promise((resolve) => setTimeout(resolve, 3000));
            await this.fillInputByName(newPage, 'BusinessInfo.PrincipalOfficeAddress.StreetAddress1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await newPage.waitForSelector('input[type="button"][value="Next"]', { visible: true});
            await this.clickButton(newPage, 'input[type="button"][value="Next"]');
            
            await new Promise((resolve) => setTimeout(resolve, 5000));
            await newPage.click('input[name="rbtnAgentType"][value="Individual"]');
            await this.clickButton(newPage, '#btnCreate');

            await this.fillInputByName(newPage, 'RegisteredAgent.AgentName', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(newPage, 'RegisteredAgent.EmailAddress', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(newPage, 'RegisteredAgent.ConfirmEmailAddress', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(newPage, 'RegisteredAgent.PrincipalAddress.Zip5', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));

            await newPage.click('input[name="RegisteredAgent.PrincipalAddress.StreetAddress1"]');
            await new Promise((resolve) => setTimeout(resolve, 3000));
            await this.fillInputByName(newPage, 'RegisteredAgent.PrincipalAddress.StreetAddress1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.clickButton(newPage, '#btnSaveNewAgent');
            await new Promise((resolve) => setTimeout(resolve, 3000));
            await newPage.waitForSelector('input[type="submit"][value="Next"]', { visible: true});
            await this.clickButton(newPage, 'input[type="submit"][value="Next"]');

            await newPage.waitForSelector('input[name="PrincipalManagementInfo.IsManagerManaged"][value="false"]', { visible: true });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await this.waitForTimeout(3000)
            await newPage.click('input[name="PrincipalManagementInfo.IsManagerManaged"][value="false"]');
            await this.randomSleep();
            await this.clickButton(newPage, '#btnNext');
            await newPage.waitForSelector('input[type="submit"][value="Next"]', { visible: true});
            await this.clickButton(newPage, 'input[type="submit"][value="Next"]');

        } catch (error) {
            logger.error('Error in Indiana LLC form handler:', error.stack);
            throw new Error(`Indiana LLC form submission failed: ${error.message}`);
        }
    }

    async fillInputByCSSSelector(page, cssSelector, value) {
        try {
            await page.waitForSelector(cssSelector, { visible: true });
            await page.type(cssSelector, value, { delay: 100 });
            console.log(`Filled input at CSS selector "${cssSelector}" with value: "${value}"`);
        } catch (error) {
            console.error(`Error filling input at CSS selector "${cssSelector}":`, error.message);
        }
    }

    async selectRadioButtonByNameAndValue(page, name, value) {
        try {
            await page.waitForSelector(`input[type="radio"][name="${name}"][value="${value}"]`, { visible: true });
            await page.click(`input[type="radio"][name="${name}"][value="${value}"]`);
            console.log(`Successfully selected radio button with name: "${name}" and value: "${value}"`);
        } catch (error) {
            console.error(`Error selecting radio button with name "${name}" and value "${value}":`, error);
        }
    }
}

module.exports = IndianaForLLC;
