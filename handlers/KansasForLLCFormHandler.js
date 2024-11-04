const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class KansasForLLC extends BaseFormHandler {
    constructor() {
        super();
    }

    async KansasForLLC(page, jsonData) {
      try {
        logger.info('Navigating to Kansas form submission page...');

        const url = jsonData.data.State.stateUrl;
          await this.navigateToPage(page, url);
        
        const loginLinkSelector = 'a[href="https://www.sos.ks.gov/eforms/user_login.aspx?frm=BS"]';
          await page.waitForSelector(loginLinkSelector, { visible: true });
          await page.click(loginLinkSelector);
      
          const inputFields = [
            { label: 'MainContent_txtUserAccount', value: jsonData.data.State.filingWebsiteUsername },
            { label: 'MainContent_txtPassword', value: jsonData.data.State.filingWebsitePassword }
        ];
        await this.addInput(page, inputFields);

        await this.clickButton(page, '#MainContent_btnSignIn');  
        logger.info('Login form filled out successfully for Kensas LLC.');
        // await clickButton(page, 'a[href="/Form/Statement-of-Foreign-Qualification-of-Foreign-Limited-Liability-Partnership"]'); 
        logger.info('Form submission completed for Kansas LLC.');

        const createBusinessButtonSelector = '#MainContent_lnkbtnFormations';
        await page.waitForSelector(createBusinessButtonSelector, { visible: true });
        await page.click(createBusinessButtonSelector);

        const filingTypeLabelSelector = 'label[for="MainContent_rblFilingTypes_2"]';
        await page.waitForSelector(filingTypeLabelSelector, { visible: true });
        await page.click(filingTypeLabelSelector);

        const nextButtonSelector = '#MainContent_btnSelectEntityTypeContinue';
            await page.waitForSelector(nextButtonSelector, { visible: true });
            await page.click(nextButtonSelector);

        const businessNameInput = [
            { label: 'MainContent_txtBusinessName', value: jsonData.data.Payload.Name.CD_LLC_Name }
            ];
        await this.addInput(page, businessNameInput);
        logger.info('Filled all input fields successfully.');


    const checknameButtonSelector = "#MainContent_btnCheckName";
    await page.waitForSelector(checknameButtonSelector,{visible:true});
    await page.click(checknameButtonSelector);

    await this.clickButton(page, '#MainContent_btnNameContinue'); 
    logger.info('Form submission completed for Kansas LLC.');

    const selectindividual = 'label[for="MainContent_rblRAType_0"]';
    await page.waitForSelector(selectindividual, { visible: true });
    await page.click(selectindividual);

    await this.clickButton(page, '#MainContent_btnResidentAgentSubmit'); 
    logger.info('Form submission completed for Kansas LLC.');

    const residentagentinformation = [
       {label: 'MainContent_txtRAEntityName',value: jsonData.data.Payload.Registered_Agent.RA_Name},
        {label: 'MainContent_txtRAAddress1',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1},
        {label: 'MainContent_txtRAZip',value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code)},
       {label: 'MainContent_txtRACity',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City}
    ];
    await this.addInput(page, residentagentinformation);
       await this.clickDropdown(page, '#MainContent_ddlRAStates', 'Kansas');

    await this.clickButton(page, '#MainContent_btnResidentAgentSubmit'); 
    logger.info('Form submission completed for Kansas LLC.');





    } catch (error) {
        // Log full error stack for debugging
        logger.error('Error in Kansas LLC form handler:', error.stack);
        throw new Error(`Kansas LLC form submission failed: ${error.message}`);
      }
    }
}
module.exports = KansasForLLC;
