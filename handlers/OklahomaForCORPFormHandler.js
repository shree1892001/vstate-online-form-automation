const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class OklahomaForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async OklahomaForCORP(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await this.clickOnLinkByText(page, 'Domestic For Profit Corporation >>>');
            await this.fillInputByName(page, 'ctl00$DefaultContent$txtName', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            await this.fillInputByName(page, 'ctl00$DefaultContent$txtUserName', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Email_Address);
            await this.clickButton(page, '#ctl00_DefaultContent_Button1');
            await this.clickButton(page, '#ctl00_DefaultContent_cmdNew');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$CorpNameSearch$_name', jsonData.data.Payload.Name.CD_CORP_Name);
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_CorpNameSearch_SearchButton');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.fillInputbyid(page, [{ selector: '#ctl00_DefaultContent_wiz1__textNotepad', value: 'Business purpose' }]);
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = fullName.split(' ');
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$_firstName', firstName);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$_lastName', lastName);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$address1$_address1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$address1$_city', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$address1$_zipcode', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString()));
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_AddButton');
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$_numberOfShares', String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares));
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_UpdateButton');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_AddButton');
            const incfullName = jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name;
            const [incfirstName, inclastName] = incfullName.split(' ');
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$_firstName',incfirstName );
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$_lastName',inclastName );
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$Address1$_address1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page,'ctl00$DefaultContent$wiz1$Address1$_city',jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$Address1$_zipcode',(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code.toString().toString()));
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$Address1$_email',jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Email_Address);
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_UpdateButton');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_AddButton');
            // 
            const dirfullName = jsonData.data.Payload.Director_Information.Director_Details.Dir_Name;
            const [dirfirstName, dirlastName] = dirfullName.split(' ');
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$_firstName',dirfirstName );
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$_lastName',dirlastName );
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$Address1$_address1', jsonData.data.Payload.Director_Information.Address.Dir_Address_Line1);
            await this.fillInputByName(page,'ctl00$DefaultContent$wiz1$Address1$_city',jsonData.data.Payload.Director_Information.Address.Dir_City);
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$Address1$_zipcode',String(jsonData.data.Payload.Director_Information.Address.Dir_Zip_Code.toString()));
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$Address1$_email',jsonData.data.Payload.Director_Information.Director_Details.Dir_Email_Address);
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_UpdateButton');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_btnAdd');
            await this.fillInputByName(page, 'ctl00$DefaultContent$wiz1$_signature', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            await this.submitForm(page, ['#ctl00_DefaultContent_wiz1_btnSignature']);
            await this.clickButton(page, '#ctl00_DefaultContent_wiz1_bNext');
                                    
            
            
        } catch (error) {
            logger.error('Error in Colorado For LLC form handler:', error.stack);
            throw new Error(`Colorado For LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = OklahomaForCORP;


