const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class KansasForCORP extends BaseFormHandler {
    constructor() {
        super();
    }


    async  KansasForCORP(page, jsonData) {
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
        logger.info('Form submission completed for Kansas CORP.');

        const createBusinessButtonSelector = '#MainContent_lnkbtnFormations';
        await page.waitForSelector(createBusinessButtonSelector, { visible: true });
        await page.click(createBusinessButtonSelector);
        const filingTypeLabelSelector = 'label[for="MainContent_rblFilingTypes_0"]';
        await page.waitForSelector(filingTypeLabelSelector, { visible: true });
        await page.click(filingTypeLabelSelector);
        const nextButtonSelector = '#MainContent_btnSelectEntityTypeContinue';
            await page.waitForSelector(nextButtonSelector, { visible: true });
            await page.click(nextButtonSelector);

        const businessNameInput = [
            { label: 'MainContent_txtBusinessName', value: jsonData.data.Payload.Name.CD_CORP_Name }
            ];
        await this.addInput(page, businessNameInput);
        logger.info('Filled all input fields successfully.');


        const checknameButtonSelector = "#MainContent_btnCheckName";
        await page.waitForSelector(checknameButtonSelector,{visible:true});
        await page.click(checknameButtonSelector);

        await this.clickButton(page, '#MainContent_btnNameContinue'); 
        logger.info('Form submission completed for Kansas CORP.');

        const selectindividual = 'label[for="MainContent_rblRAType_0"]';
        await page.waitForSelector(selectindividual, { visible: true });
        await page.click(selectindividual);

        await this.clickButton(page, '#MainContent_btnResidentAgentSubmit'); 
        logger.info('Form submission completed for Kansas CORP.');

        const residentagentinformation = [
            {label: 'MainContent_txtRAEntityName',value: jsonData.data.Payload.Registered_Agent.RA_Name},
            {label: 'MainContent_txtRAAddress1',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1},
             {label: 'MainContent_txtRAZip',value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code)},
            {label: 'MainContent_txtRACity',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City}
        ];
        await this.addInput(page, residentagentinformation);
        await this.clickDropdown(page, '#MainContent_ddlRAStates', 'Kansas');

        await this.clickButton(page, '#MainContent_btnResidentAgentSubmit'); 
        logger.info('Form submission completed for Kansas CORP.');

      
        await this.selectCheckboxByLabel(page, '#MainContent_chkGeneralPurpose');

        const labelForAttribute = 'MainContent_chkGeneralPurpose';  
        await page.waitForSelector(`label[for="${labelForAttribute}"]`, { visible: true, timeout: 30000 });
        await page.click(`label[for="${labelForAttribute}"]`);
       
        await this.clickButton(page, '#MainContent_btnPurposeSubmit'); 
        logger.info('Form submission completed for Kansas CORP.');


        await this.clickButton(page, '#MainContent_rblStockAuthority_0'); 
        logger.info('Form submission completed for Kansas CORP.');

        const share = [
          {label: 'MainContent_gvStock_txtShares',value:jsonData.data.Payload.Stock_Information.SI_No_Of_Shares},
          {label: 'MainContent_gvStock_txtValue',value:jsonData.data.Payload.Stock_Information.SI_Share_Par_Value},
        ]
          await this.addInput(page, share);

          await this.clickButton(page, '#MainContent_gvStock_lbAddNew'); 
          logger.info('Form submission completed for Kansas CORP.');

          await this.clickButton(page, '#MainContent_btnStockSubmitContinue'); 
          logger.info('Form submission completed for Kansas CORP.');

        
          // await this.selectCheckboxByLabel(page, '#MainContent_rblStockAuthority_0');

          await this.clickButton(page, '#MainContent_btnPurposeSubmit'); 
          logger.info('Form submission completed for Kansas CORP.');


          //Shares Value
          await this.clickButton(page, '#MainContent_btnStockSubmitContinue'); 
          logger.info('Form submission completed for Kansas CORP.');

          const incorporatorinfo = [
          {label: 'MainContent_txtIncorporatorName',value: jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name },
          {label: 'MainContent_txtIncorporatorAddress1',value: jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1 },
          {label: 'MainContent_txtIncorporatorZip',value: String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code)},
          {label: 'MainContent_txtIncorporatorCity',value: jsonData.data.Payload.Incorporator_Information.Address.Inc_City }
        ];
        await this.addInput(page, incorporatorinfo);
        await this.clickDropdown(page, '#MainContent_ddlIncorporatorCountry', 'USA');
        await this.clickDropdown(page, '#MainContent_ddlIncorporatorStates', 'Alabama');

        await this.clickButton(page, '#MainContent_btnContinueIncorporators'); 
        logger.info('Form submission completed for Kansas CORP.');


        const directorinfo = [
          {label: 'MainContent_txtDirectorName',value: jsonData.data.Payload.Director_Information.Director_Details.Dir_Name},
          {label: 'MainContent_txtDirectorAddress1',value: jsonData.data.Payload.Director_Information.Address.Dir_Address_Line1 },
          {label: 'MainContent_txtDirectorZip',value: String(jsonData.data.Payload.Director_Information.Address.Dir_Zip_Code)},
          {label: 'MainContent_txtDirectorCity',value: jsonData.data.Payload.Director_Information.Address.Dir_City }
        ];
        await this.addInput(page, directorinfo);
        await this.clickDropdown(page, '#MainContent_ddlDirectorCountry', 'USA');
        await this.clickDropdown(page, '#MainContent_ddlDirectorStates', 'Alabama');

        await this.clickButton(page, '#MainContent_btnContinueDirectors'); 
        logger.info('Form submission completed for Kansas CORP.');
        

      } catch (error) {
          // Log full error stack for debugging
          logger.error('Error in Kansas CORP form handler:', error.stack);
          throw new Error(`Kansas CORP form submission failed: ${error.message}`);
        }
      }
    }

module.exports = KansasForCORP;
