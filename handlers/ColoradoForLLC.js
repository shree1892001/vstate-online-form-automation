const BaseFormHandler = require('./BaseFormHandler');
const { waitForSelectorAndType } = require('../utils/puppeteerUtils');
const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs');

class ColoradoForLLC extends BaseFormHandler {
    constructor() {
        super();
    }

    async loadSelectors(stateFullDesc) {
        const stateFile = path.join(__dirname, 'properties', `${stateFullDesc.toLowerCase().replace(/ /g, '-')}_selectors.json`);
        return JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
    }

    async fillForm(page, data) {
        try {
            logger.info('Starting Colorado LLC form submission process...');
            await this.navigateToLandingPage(page, data);
            await this.performEventsonLandingPage(page);
            await this.adjustViewport(page);
            await this.fillLegalName(page, data);
            await this.fillAddress(page, data);
            await this.fillRegisteredAgent(page, data);
            await this.fillMemberManager(page, data);
            await this.fillOrganizerInfo(page, data);
            await this.fillEffectiveDate(page, data);
            await this.fillNotificationInfo(page, data);
            logger.info('Colorado LLC form submission completed successfully.');
        } catch (error) {
            logger.error('Error in Colorado LLC form handler:', error.stack);
            throw new Error(`Colorado LLC form submission failed: ${error.message}`);
        }
    }

    async navigateToLandingPage(page, data) {
        try {
            logger.info("Navigating to the Landing page...");
            await page.goto(data.State.stateUrl, {
                waitUntil: 'networkidle0',
                timeout: 60000
            });
            logger.info('Landing Page Loaded');
        } catch (error) {
            logger.error("Error navigating to the Landing page:", error.message);
            throw new Error("Navigation to the Landing page failed.");
        }
    }

    async performEventsonLandingPage(page) {
        try {
            await page.waitForSelector('.w3-ulcontents');
            await page.evaluate(() => {
                const link = document.querySelector('.w3-ulcontents a[href="#LLC"]');
                if (link) {
                    link.click();
                }
            });
            await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 120000 });
            await page.waitForSelector('.w3-table.w3-cmsTable');
            await page.evaluate(() => {
                const link = document.querySelector('.w3-table.w3-cmsTable tbody tr:nth-child(1) td:nth-child(2) a');
                if (link) {
                    link.click();
                }
            });
            await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 120000 });
            await page.waitForSelector('input.w3-btn-next[type="button"]');
            await page.evaluate(() => {
                document.querySelector('input.w3-btn-next[type="button"]').click();
            });
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
        } catch (error) {
            logger.error("Error in performEventsonLandingPage:", error.message);
            throw error;
        }
    }

    async adjustViewport(page) {
        // Implement viewport adjustment if needed
    }

    async fillLegalName(page, data) {
        try {
            await page.waitForSelector('#name', { timeout: 5000 });
            let legalName = data.Payload.Name.CD_Legal_Name;
            if (legalName.length > 200) {
                throw new Error('Input exceeds the maximum length of 200 characters.');
            }
            if (!/^[\x00-\x7F]+$/.test(legalName)) {
                throw new Error('Input contains non-ASCII characters.');
            }
            await page.type('#name', legalName, { delay: 100 });
            const filledValue = await page.$eval('#name', el => el.value);
            logger.info('Filled input value:', filledValue);
        } catch (error) {
            logger.error("Error in fillLegalName:", error.message);
            throw error;
        }
    }

    async fillAddress(page, data) {
        try {
            const selectors = await this.loadSelectors(data.State.stateFullDesc);
            await this.fillAddressFields(page, data.Payload.Principal_Address, selectors.Colorado.principal_address);
            if (data.Payload.Incorporator_Information.Address.Inc_Address_Line1 !== data.Payload.Principal_Address.PA_Address_Line1) {
                await this.fillAddressFields(page, data.Payload.Incorporator_Information.Address, selectors.Colorado.mailing_address);
            } else {
                await page.click(selectors.Colorado.common_address.common);
            }
        } catch (error) {
            logger.error("Error in fillAddress:", error.message);
            throw error;
        }
    }

    async fillAddressFields(page, addressData, selectors) {
        for (const [key, selector] of Object.entries(selectors)) {
            await page.waitForSelector(selector);
            await page.type(selector, addressData[key]);
            await page.waitForTimeout(1000); // Add a small delay between inputs
        }
    }

    async fillRegisteredAgent(page, data) {
        try {
            await page.waitForSelector(".w3-margin-button");
            if (data.Payload.Registered_Agent.agentType === "Individual") {
                await page.click('input[name="nameTyp"][value="I"]');
                await this.fillIndividualAgent(page, data);
            } else if (data.Payload.Registered_Agent.agentType === "Entity") {
                await page.click('input[name="nameTyp"][value="O"]');
                await this.fillEntityAgent(page, data);
            }
            await this.fillAgentAddress(page, data.Payload.Registered_Agent.address);
            await page.click('input[name="agentConsentRadio"][value="Y"]');
            await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 120000 });
        } catch (error) {
            logger.error("Error in fillRegisteredAgent:", error.message);
            throw error;
        }
    }

    async fillIndividualAgent(page, data) {
        await page.waitForSelector('input[name="individualName-firstName"]');
        const [firstName, lastName] = data.Payload.Registered_Agent.RA_Name.split(" ");
        await page.type('input[name="individualName-firstName"]', firstName);
        await page.type('input[name="individualName-lastName"]', lastName);
    }

    async fillEntityAgent(page, data) {
        await page.waitForSelector('input[name="orgName"]');
        await page.type('input[name="orgName"]', data.Payload.Registered_Agent.RA_Name);
    }

    async fillAgentAddress(page, address) {
        const fieldRules = {
            '#streetAddress-address1': { required: true, minLength: 2, maxLength: 50, pattern: /^[\x00-\x7F]+$/ },
            '#streetAddress-address2': { required: false, minLength: 2, maxLength: 50, pattern: /^[\x00-\x7F]+$/ },
            '#streetAddress-city': { required: true, minLength: 2, maxLength: 35, pattern: /^[\x00-\x7F]+$/ },
            '#streetAddress-zip': { required: true, minLength: 2, maxLength: 15, pattern: /^[\x00-\x7F]+$/ }
        };

        for (const [selector, rules] of Object.entries(fieldRules)) {
            await this.validateAndFillField(page, selector, address[selector.split('-')[1]], rules);
        }
    }

    async validateAndFillField(page, selector, value, { minLength, maxLength, pattern, required }) {
        if (required && !value) {
            throw new Error(`The field '${selector}' is required but no value was provided.`);
        }
        if (!required && !value) {
            logger.info(`Optional field '${selector}' is not provided, skipping.`);
            return;
        }
        if (value.length > maxLength) {
            throw new Error(`Input for field '${selector}' exceeds the maximum length of ${maxLength} characters.`);
        }
        if (value.length < minLength) {
            throw new Error(`Input for field '${selector}' must be at least ${minLength} characters long.`);
        }
        if (!pattern.test(value)) {
            throw new Error(`Input for field '${selector}' contains invalid characters (non-ASCII).`);
        }
        await page.type(selector, value);
        logger.info(`Successfully filled field: ${selector}`);
    }

    async fillMemberManager(page, data) {
        try {
            await page.waitForSelector('input[name="managedBy"]');
            await page.evaluate((data) => {
                const managedByRadio = document.querySelector(`input[name="managedBy"][value="${data.Payload.Memeber_Or_Manager.Mom_Memeber_Or_Manager}"]`);
                if (managedByRadio) {
                    managedByRadio.click();
                }
            }, data);

            await page.waitForSelector('input[name="hasOneMember"]');
            await page.evaluate((data) => {
                const hasOneMemberRadio = document.querySelector(`input[name="hasOneMember"][value="${data.Payload.Memeber_Or_Manager.Mom_Memeber_Or_Manager}"]`);
                if (hasOneMemberRadio) {
                    hasOneMemberRadio.click();
                }
            }, data);
        } catch (error) {
            logger.error("Error in fillMemberManager:", error.message);
            throw error;
        }
    }

    async fillOrganizerInfo(page, data) {
        try {
            await page.waitForSelector('input[name="perjuryNoticeAffirmed"]', {visible: true, timeout: 12000});
            await page.click('input[name="perjuryNoticeAffirmed"]');

            await page.waitForSelector('input[name="sameAsFormer"]', {visible: true, timeout: 10000});
            if (data.Payload.Organizer_Information === data.Payload.Filer_Information) {
                await page.click('input[name="sameAsFormer"]');
            } else {
                await this.fillOrganizerDetails(page, data);
            }
        } catch (error) {
            logger.error("Error in fillOrganizerInfo:", error.message);
            throw error;
        }
    }

    async fillOrganizerDetails(page, data) {
        try {
            await page.waitForSelector("#name-firstName", { visible: true, timeout: 120000 });
            await page.evaluate((data) => {
                const firstName = data.Payload.Organizer_Information.Organizer_Details.Org_Name.split(" ")[0];
                const lastName = data.Payload.Organizer_Information.Organizer_Details.Org_Name.split(" ")[1];

                const fname = document.querySelector('#name-firstName');
                fname.value = firstName;
                if (fname.value.length < 2 || fname.value.length > 35 || !/[\x00-\x7F]+/.test(fname.value)) {
                    throw new Error('First Name validation failed.');
                }

                const lname = document.querySelector('#name-lastName');
                lname.value = lastName;
                if (lname.value.length < 2 || lname.value.length > 35 || !/[\x00-\x7F]+/.test(lname.value)) {
                    throw new Error('Last Name validation failed.');
                }

                const address1 = data.Payload.Organizer_Information.Org_Address.Org_Address_Line1;
                const addressField1 = document.querySelector('#address-address1');
                addressField1.value = address1;
                if (addressField1.value.length < 2 || addressField1.value.length > 50 || !/[\x00-\x7F]+/.test(addressField1.value)) {
                    throw new Error('Address 1 validation failed.');
                }

                const city = data.Payload.Organizer_Information.Org_Address.Org_City;
                const cityField = document.querySelector('#address-city');
                cityField.value = city;
                if (cityField.value.length < 2 || cityField.value.length > 35 || !/[\x00-\x7F]+/.test(cityField.value)) {
                    throw new Error('City validation failed.');
                }

                const stateDropdown = document.querySelector('#address-state');
                const stateOption = Array.from(stateDropdown.options).find(opt => opt.text.trim() === data.Payload.Organizer_Information.Org_Address.Org_State);
                if (stateOption) {
                    stateDropdown.value = stateOption.value;
                    stateDropdown.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
                    throw new Error('State selection failed.');
                }

                const zip = data.Payload.Organizer_Information.Org_Address.Org_Zip_Code;
                const zipField = document.querySelector('#address-zip');
                zipField.value = zip;
                if (zipField.value.length < 2 || zipField.value.length > 15 || !/[\x00-\x7F]+/.test(zipField.value)) {
                    throw new Error('ZIP Code validation failed.');
                }

                const countryDropdown = document.querySelector('#address-country');
                const countryOption = Array.from(countryDropdown.options).find(opt => opt.text.trim() === 'US');
                if (countryOption) {
                    countryDropdown.value = countryOption.value;
                    countryDropdown.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
                    throw new Error('Country selection failed.');
                }

                const submitButton = document.querySelector('#submit-button');
                if (submitButton) {
                    submitButton.click();
                } else {
                    throw new Error('Submit button not found.');
                }
            }, data);

            await page.waitForNavigation({waitUntil:'networkidle0'});
            logger.info('Organizer details submitted successfully.');
        } catch (error) {
            logger.error("Error in fillOrganizerDetails:", error.message);
            throw error;
        }
    }

    async fillEffectiveDate(page, data) {
        if (data.Payload.EffectiveDate) {
            await page.waitForSelector('input[name="dedSelectRadio"][value="Y"]', {visible: true, timeout: 120000});
            await page.click('input[name="dedSelectRadio"][value="Y"]');
        }
    }

    async fillNotificationInfo(page, data) {
        try {
            await this.handleEmailNotification(page, data);












module.exports=ColoradoForLLC;