const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class IndianaForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async IndianaForCORP(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            console.log( jsonData.data.Payload.Officer_Information)
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            try {
                await page.waitForSelector('input[name="username"]', { visible: true });
                await this.fillInputByName(page, 'username', jsonData.data.State.filingWebsiteUsername);
                await this.clickButton(page, 'span.icon-button__text.icon-button__text--transform-right');
                await page.waitForSelector('input[name="password"]', { visible: true });
                await this.fillInputByName(page, 'password', jsonData.data.State.filingWebsitePassword);             
                const errorMessageSelector = '.alert.alert--alert .alert__content'; // Selector for the error message
                const errorMessageElement = await page.$(errorMessageSelector);

                if (errorMessageElement) {
                    const errorMessage = await page.evaluate(el => el.textContent, errorMessageElement);
                    if (errorMessage.trim() === 'Invalid email or password') {
                        throw new Error('Login failed: Invalid email or password');
                    }
                }


                console.log('Login successful!');                
            } catch (error) {
                console.error('An error occurred during login:', error.message);
            }
            // Click the button and the link
            await this.clickButton(page, 'span.icon-button__text.icon-button__text--transform-right');
            await page.waitForSelector('a[href="/portal/services"]', { visible: true });
            await this.clickButton(page, 'a[href="/portal/services"]');
            await this.randomSleep();

            // Click the link using aria-label
            const selector = '[aria-label="Go to INBiz"]';
            await page.waitForSelector(selector, { visible: true});
            await page.click(selector); // Click the element
            console.log('Clicked on the INBiz element');

            // Wait for the new tab to open
            const newPagePromise = new Promise((resolve) => page.browser().once('targetcreated', target => resolve(target.page())));

            // Switch context to the new tab
            const newPage = await newPagePromise; // Wait for the new page to open
            await newPage.waitForSelector('a[title="START A NEW BUSINESS"]', { visible: true });
            await this.clickButton(newPage, 'a[title="START A NEW BUSINESS"]');
            await newPage.waitForSelector('input[type="button"][value="Next"]', { visible: true });
            await this.clickButton(newPage, 'input[type="button"][value="Next"]');
            await this.clickButton(newPage, 'input[type="button"][value="Frequent User"]');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await newPage.click('#\\35');
            await newPage.waitForSelector('input[type="submit"][value="Continue"]', { visible: true });
            await this.clickButton(newPage, 'input[type="submit"][value="Continue"]');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await newPage.waitForSelector('input[name="BusinessInfo.IsBusinessNameReserved"][value="false"]', { visible: true });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await newPage.click('input[name="BusinessInfo.IsBusinessNameReserved"][value="false"]');
            await this.fillInputByName(newPage, 'BusinessInfo.BusinessName', jsonData.data.Payload.Name.CD_CORP_Name);
            await this.clickButton(newPage, '#btnCheckAvailability');
            await this.clickButton(newPage, '#btnNextButton');
            await this.fillInputByName(newPage, 'BusinessInfo.BusinessEmail', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(newPage, 'BusinessInfo.ConfirmBusinessEmail', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(newPage, 'BusinessInfo.PrincipalOfficeAddress.Zip5', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await newPage.click('input[name="BusinessInfo.PrincipalOfficeAddress.StreetAddress1"]');
            await new Promise(resolve => setTimeout(resolve, 3000))
            await this.fillInputByName(newPage, 'BusinessInfo.PrincipalOfficeAddress.StreetAddress1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(newPage, 'BusinessInfo.AuthorizedShares', String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares));
            await this.clickButton(newPage, 'input[type="button"][value="Next"]');
            await new Promise(resolve => setTimeout(resolve, 5000))
            await newPage.click('input[name="rbtnAgentType"][value="Individual"]');
            await this.clickButton(newPage, '#btnCreate');
            await this.fillInputByName(newPage, 'RegisteredAgent.AgentName', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(newPage, 'RegisteredAgent.EmailAddress', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(newPage, 'RegisteredAgent.ConfirmEmailAddress', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(newPage, 'RegisteredAgent.PrincipalAddress.Zip5', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await newPage.click('input[name="RegisteredAgent.PrincipalAddress.StreetAddress1"]');
            await new Promise(resolve => setTimeout(resolve, 3000))
            await this.fillInputByName(newPage, 'RegisteredAgent.PrincipalAddress.StreetAddress1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.clickButton(newPage, '#btnSaveNewAgent');
            await this.clickButton(newPage, 'input[type="submit"][value="Next"]');

            await new Promise((resolve) => setTimeout(resolve, 6000));
            const incfullName = jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name;
            const [incfirstName, inclastName] = incfullName.split(' ');
            await this.fillInputByName(newPage, 'IncorporatorInfo.FirstName',incfirstName );
            await this.fillInputByName(newPage, 'IncorporatorInfo.LastName',inclastName );
            await this.fillInputByName(newPage, 'IncorporatorInfo.PrincipalAddress.Zip5',String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
            await newPage.click('input[name="IncorporatorInfo.PrincipalAddress.StreetAddress1"]');
            await new Promise(resolve => setTimeout(resolve, 3000))
            await this.fillInputByName(newPage, 'IncorporatorInfo.PrincipalAddress.StreetAddress1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await newPage.click('#btnAdd');
            await newPage.waitForSelector('input[type="submit"][value="Next"]', { visible: true });
            await new Promise(resolve => setTimeout(resolve, 1000))
            await newPage.click('input[type="submit"][value="Next"]');
            await newPage.waitForSelector('input[type="submit"][value="Next"]', { visible: true });
            await newPage.click('input[type="submit"][value="Next"]');
            await this.clickButton(newPage, '#Next');








            
            // const linkHref = '/BOS/SOS.Business/Transition?New=true';
            // await page.evaluate((href) => {
            //     const link = Array.from(document.querySelectorAll('a')).find(anchor => anchor.getAttribute('href') === href);
            //     if (link) {
            //         link.click();}
            // }, linkHref);
            // await this.clickButton(page, 'input[value="Next"]');
            // await this.clickButton(page, 'input[value="Frequent User"]');
            // await this.clickButton(page, 'input[type="radio"][name="BusinessType"][value="7"]');
            // await this.clickButton(page, 'input[type="submit"][value="Continue"]');

    
        } catch (error) {
            logger.error('Error in Kentucky For CORP form handler:', error.stack);
            throw new Error(`Kentucky For CORP form submission failed: ${error.message}`);
        }
    }
    async fillInputByCSSSelector(page, cssSelector, value) {
        try {
            // Wait for the input field to be visible using CSS selector
            await page.waitForSelector(cssSelector, { visible: true, timeout: 30000 });
            
            // Type the value into the input field
            await page.type(cssSelector, value, { delay: 100 });
            console.log(`Filled input at CSS selector "${cssSelector}" with value: "${value}"`);
        } catch (error) {
            console.error(`Error filling input at CSS selector "${cssSelector}":`, error.message);
        }
    }
    async selectRadioButtonByNameAndValue(page, name, value) {
        try {
            // Wait for the radio button to be visible
            await page.waitForSelector(`input[type="radio"][name="${name}"][value="${value}"]`, { visible: true, timeout: 30000 });
    
            // Click the radio button
            await page.click(`input[type="radio"][name="${name}"][value="${value}"]`);
            console.log(`Successfully selected radio button with name: "${name}" and value: "${value}"`);
        } catch (error) {
            console.error(`Error selecting radio button with name "${name}" and value "${value}":`, error);
        }
    }
    
    
}

module.exports = IndianaForCORP;


