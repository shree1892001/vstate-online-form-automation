const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class SouthCarolinaForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async SouthCarolinaForCORP(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            //login 
            await this.clickOnLinkByText(page, 'Log In');
            await this.fillInputByName(page, 'Username', jsonData.data.State.filingWebsiteUsername);
            await this.fillInputByName(page, 'Password', jsonData.data.State.filingWebsitePassword);
            await this.clickButton(page, '.mainButton');
            //enter businees name
            await this.fillInputByName(page, 'EntityName', jsonData.data.Payload.Name.CD_CORP_Name);
            await this.clickButton(page, '#AddEntityButton');
            // await this.selectRadioButtonById(page, 'DomesticRadioButton');
            // await this.clickButton(page, '#AddIndistinguishableEntityButton');
            await this.clickDropdown(page, '#EntityTypes', 'Corporation');
            await this.clickButton(page, 'a.startButton');
            //add contact information
            await this.fillInputByName(page, 'ContactCdto.Contact.Name', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(page, 'ContactCdto.Contact.Email', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page, 'ContactCdto.Contact.Phone', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.fillInputByName(page, 'ContactCdto.AddressCdto.Address1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'ContactCdto.AddressCdto.City', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.clickDropdown(page, '#ContactCdto_AddressCdto_StateId', jsonData.data.Payload.Registered_Agent.RA_Address.RA_State);
            await this.fillInputByName(page, 'ContactCdto.AddressCdto.ZipCode', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await this.clickButton(page, '#ContinueButton');
            //add registered agent information
            await this.fillInputByName(page, 'FormsCdto.Agent.AgentName', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(page, 'FormsCdto.Agent.AgentAddressCdto.Address1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'FormsCdto.Agent.AgentAddressCdto.City', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'FormsCdto.Agent.AgentAddressCdto.ZipCode', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            //add stock details
            await this.selectRadioButtonById(page, 'SingleClassShareRadioButton');
            await this.fillInputByName(page, 'FormsCdto.SharesCdto.SingleClassShareCount', String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares));
            //add incorporator information
            await this.fillInputByName(page, 'FormsCdto.IncorporatorCdto.IncorporatorName', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            await this.fillInputByName(page, 'FormsCdto.IncorporatorCdto.IncorpatorAddressCdto.Address1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page,'FormsCdto.IncorporatorCdto.IncorpatorAddressCdto.City',jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            await this.clickDropdown(page, '#FormsCdto_IncorporatorCdto_IncorpatorAddressCdto_StateId',jsonData.data.Payload.Incorporator_Information.Address.Inc_State);
            await this.fillInputByName(page, 'FormsCdto.IncorporatorCdto.IncorpatorAddressCdto.ZipCode',String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
            //add signature for organizer
            await this.clickDropdown(page, '#FormsCdto_IncorporatorCdto_IncorporatorSignatureCdto_SelectedOption', 'Incorporator');
            await page.click('#IncorporatorSignatureConfirmationCheckbox');
            await this.fillInputByName(page, 'FormsCdto.IncorporatorCdto.IncorporatorSignatureCdto.Text', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            //add attorney information
            await this.fillInputByName(page, 'FormsCdto.AttorneyNameText', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(page, 'FormsCdto.AttorneyPhoneNumber', jsonData.data.Payload.Registered_Agent.RA_Contact_No);
            await this.fillInputByName(page, 'FormsCdto.AttorneyAddress.Address1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'FormsCdto.AttorneyAddress.City', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.clickDropdown(page, '#FormsCdto_AttorneyAddress_StateId',jsonData.data.Payload.Registered_Agent.RA_Address.RA_State);
            await this.fillInputByName(page, 'FormsCdto.AttorneyAddress.ZipCode', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await this.clickDropdown(page, '#FormsCdto_AttorneySignatureCdto_SelectedOption', 'Attorney');
            await page.click('#AttorneySignatureConfirmationCheckbox');
            await this.fillInputByName(page, 'FormsCdto.AttorneySignatureCdto.Text', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.clickButton(page, '#ContinueButton');

            // upload file
            await this.clickButton(page, 'a.formUploadButton');
            await page.waitForSelector('#FileData');

            // Trigger the file chooser by clicking on the button (you may need to adjust this selector)
            const [fileChooser] = await Promise.all([
                page.waitForFileChooser(),
                page.click('#FileData') // Adjust this selector to match your button
            ]);

            // Specify the path to the file you want to upload
            const filePath = 'C:/Users/Acer/Desktop/OnlineFormDocuments/CertificateOfOrganization.pdf';

            // Accept the file in the file chooser
            await fileChooser.accept([filePath]);
            await this.clickButton(page, '#UploadButton')
            await this.clickButton(page, '#ContinueButton');
        } catch (error) {
            logger.error('Error in Colorado For LLC form handler:', error.stack);
            throw new Error(`Colorado For LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = SouthCarolinaForCORP;


