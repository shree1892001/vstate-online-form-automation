const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class ConnecticuitForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async ConnecticuitForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
        await page.waitForSelector('a.cg-c-navbar__button--signin');
        await page.click('a.cg-c-navbar__button--signin');
            await this.clickButton(page, '.btn.btn-default.login-link');
            const inputFields = [
                { label: 'Username', value: jsonData.data.State.filingWebsiteUsername },
                { label: 'Password', value: jsonData.data.State.filingWebsitePassword }
            ];

            await this.addInput(page, inputFields);
            await this.clickButton(page, '.btn-raised.btn-light-primary.submit');
            await this.clickButton(page, 'a[href="/forms"]');
            await this.clickOnTitle(page, 'Articles of Organization for Domestic Limited Liability Company');
            await this.clickButton(page,'button.btn.btn-primary.btn-text')
            await this.selectRadioButtonByLabel(page,'Standard Processing - $35.00 - Up to 7 - 10 business days processing')
            await this.clickButton(page,'button.btn.btn-raised.btn-primary.next.toolbar-button')
            await this.selectRadioButtonByLabel(page,'Limited Liability Company (LLC)')
            await this.selectRadioButtonByLabel(page, 'No');
            const input_company_name = [
            { label: 'field-field1-undefined', value: jsonData.data.Payload.Name.CD_Legal_Name },
            { label: 'field-field2-undefined', value: jsonData.data.Payload.Name.CD_Legal_Name }
            
            ];
            await this.addInput(page, input_company_name)
            await this.selectRadioButtonByLabel(page,'The business name selected is unique across all registered businesses.  No error message is noted above.')
            await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')
            await this.selectRadioButtonByLabel(page, 'Perpetual / Ongoing');
            const principle_address_fields = [
                { label: 'Address*', value: jsonData.data.Payload.Principal_Address.PA_Address_Line1 },
                { label: 'City*', value: jsonData.data.Payload.Principal_Address.PA_City },
                { label: 'State*', value: jsonData.data.Payload.Principal_Address.PA_State },
                { label: 'ZIP Code*', value: jsonData.data.Payload.Principal_Address.PA_Postal_Code },
                ];
            await this.addInput(page, principle_address_fields)
            await this.selectRadioButtonByLabel(page, 'Perpetual / Ongoing');
            await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')
            await this.clickButton(page, '.add');
            await this.selectRadioButtonByLabel(page,'Individual')
            const fullName = jsonData.data.Payload.Registered_Agent.Name.RA_Name;
            const [firstName, lastName] = fullName.split(' ');
            const register_agent_fields = [
                { label: 'First Name*', value: firstName },
                { label: 'Last Name*', value: lastName},
                { label: 'EMAIL', value: jsonData.data.Payload.Principal_Address.PA_State },
                ];
            await this.addInput(page, register_agent_fields)
            
        } catch (error) {
            logger.error('Error in New Jersey LLC form handler:', error.stack);
            throw new Error(`New Jersey LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = ConnecticuitForLLC;


