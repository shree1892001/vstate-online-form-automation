const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class FloridaForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async FloridaForCORP(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            console.log(jsonData.data.Payload.Officer_Information)
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await this.clickOnLinkByText(page, 'Start a Business');
            await this.clickOnLinkByText(page, 'Profit Articles of Incorporation');
            await this.clickButton(page, 'a.btn.btn-lg.btn-special');
            await this.selectCheckboxByLabel(page, 'Disclaimer');
            await this.clickButton(page, 'input[name="submit"][value="Start New Filing"]');
            await this.fillInputByName(page, 'corp_name', jsonData.data.Payload.Name.CD_CORP_Name);
            await this.fillInputByName(page, 'stock_shares', String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares));

            await this.fillInputByName(page, 'princ_addr1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'princ_city', jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByName(page, 'princ_st', jsonData.data.Payload.Principle_Address.PA_State);
            await this.fillInputByName(page, 'princ_zip', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.fillInputByName(page, 'princ_cntry', jsonData.data.Payload.Principle_Address.PA_Country);
            await this.clickButton(page, '#same_addr_flag');
            const rafullname = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = rafullname.split(' ');
            await this.fillInputByName(page, 'ra_name_last_name', lastName);
            await this.fillInputByName(page, 'ra_name_first_name', firstName);
            await this.fillInputByName(page, 'ra_addr1',jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'ra_city',jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'ra_zip', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await this.fillInputByName(page, 'ra_signature',jsonData.data.Payload.Registered_Agent.RA_Name);
            //incorporator information
            await this.fillInputByName(page, 'incorporator1', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            await this.fillInputByName(page, 'incorporator2', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page, 'incorporator4',jsonData.data.Payload.Incorporator_Information.Address.Inc_City,',' ,jsonData.data.Payload.Incorporator_Information.Address.Inc_State,',', String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
            await this.fillInputByName(page, 'signature', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            await this.fillInputbyid(page, [
                { selector: '#purpose', value: jsonData.data.Payload.Purpose.CD_Business_Purpose_Details }
              ]);

            // Correspondence Name And E-mail Address
            await this.fillInputByName(page, 'ret_name', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            await this.fillInputByName(page, 'ret_email_addr', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Email_Address);
            await this.fillInputByName(page, 'email_addr_verify', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Email_Address);
            //Name And Address of Person(s) Authorized to Manage LLC
            const ofcrfullName = jsonData.data.Payload.Officer_Information.Officer_Details.Off_Name;
            const [ofcrfirstName, ofcrlastName] = ofcrfullName.split(' ');
            
            await this.fillInputByName(page, 'off1_name_title', 'MGR');
            await this.fillInputByName(page, 'off1_name_last_name', ofcrlastName);
            await this.fillInputByName(page, 'off1_name_first_name', ofcrfirstName);
            await this.fillInputByName(page, 'off1_name_addr1', jsonData.data.Payload.Officer_Information.Address.Of_Address_Line1);
            await this.fillInputByName(page, 'off1_name_city', jsonData.data.Payload.Officer_Information.Address.Of_City);
            await this.fillInputByName(page, 'off1_name_st',jsonData.data.Payload.Officer_Information.Address.Of_State );
            await this.fillInputByName(page, 'off1_name_zip', String(jsonData.data.Payload.Officer_Information.Address.Of_Zip_Code));
            await page.click('input[type="submit"][value="Continue"]');


        } catch (error) {
            logger.error('Error in Kentucky For CORP form handler:', error.stack);
            throw new Error(`Kentucky For CORP form submission failed: ${error.message}`);
        }
    }
}

module.exports = FloridaForCORP;


