const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class MassachusettsForLLC extends BaseFormHandler {
    constructor() {
        super();
    }

    async MassachusettsForLLC(page, jsonData) {
      try {
          logger.info('Navigating to Massachusetts form submission page...');
          const url = jsonData.data.State.stateUrl;
          await this.navigateToPage(page, url);


          await this.clickOnLinkByText(page, 'click here');
          await this.clickOnLinkByText(page, 'Certificate of Organization');


          await page.waitForNavigation({ waitUntil: 'networkidle0' });

          const nameaddress = [
            {label: 'MainContent_EntityNameControl1_txtEntityName',value: jsonData.data.Payload.Name.CD_LLC_Name},
            {label: 'MainContent_RecordingOfficeControl1_txtAddr',value: jsonData.data.Payload.Principle_Address.PA_Address_Line1},
            {label: 'MainContent_RecordingOfficeControl1_txtAddr2',value: jsonData.data.Payload.Principle_Address.PA_Address_Line2},
            {label: 'MainContent_RecordingOfficeControl1_txtCity',value: jsonData.data.Payload.Principle_Address.PA_City},
            {label: 'MainContent_RecordingOfficeControl1_txtPostalCode',value: String(jsonData.data.Payload.Principle_Address.PA_Zip_Code)},
          ];
            await this.addInput(page, nameaddress);

            await page.type('textarea[name="ctl00$MainContent$PurposeControl1$txtArea"]',
              'Business(Field is mandatory not in the json',);

            
            const name =[
            {label: 'MainContent_ResidentAgentControl1_txtAgentName',value: jsonData.data.Payload.Registered_Agent.RA_Name},
            {label: 'MainContent_ResidentAgentControl1_txtAgentAddr1',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1},
            {label: 'MainContent_ResidentAgentControl1_txtAgentAddr2',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line2},
            {label: 'MainContent_ResidentAgentControl1_txtAgentCity',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City},
            {label: 'MainContent_ResidentAgentControl1_txtAgentPostalCode',value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code)},
           {label: 'MainContent_ResidentAgentConsentControl1_txtClerk',value: jsonData.data.Payload.Registered_Agent.RA_Name},
          ]
            await this.addInput(page, name);

            await page.click('#MainContent_ManagerControl1_grdOfficers_btnAddPartner');

            // organizer
            
            const orgFullName = jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name;
            const [orgFirstName, orgLastName] = orgFullName.split(' ');
            // Assign the split first name and last name to the respective fields
            const organizerDetails = [
                { label: 'MainContent_ManagerControl1_txtFirstName', value: orgFirstName },
                { label: 'MainContent_ManagerControl1_txtLastName', value: orgLastName }
            ];
            await this.addInput(page, organizerDetails);
            const sixno =[
              {label: 'MainContent_ManagerControl1_txtBusAddress', value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1},
              {label: 'MainContent_ManagerControl1_txtBusCity',value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_City},
              {label: 'MainContent_ManagerControl1_txtBusZip',value: String(jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code)}
            ];
            await this.addInput(page, sixno);

            await new Promise(resolve => setTimeout(resolve, 3000))

            await page.click('#MainContent_ManagerControl1_btnSave');
            await new Promise(resolve => setTimeout(resolve, 3000))

            await page.click('#MainContent_OtherManagerControl1_grdOfficers_btnAddPartner');

            // manager

            await new Promise(resolve => setTimeout(resolve, 3000))

            const manFullName = jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name;
            const [manFirstName, manLastName] = manFullName.split(' ');
            // Assign the split first name and last name to the respective fields
            const managerDetails = [
                { label: 'MainContent_OtherManagerControl1_txtFirstName', value: manFirstName },
                { label: 'MainContent_OtherManagerControl1_txtLastName', value: manLastName }
            ];
            await this.addInput(page, managerDetails);
            const sevenno =[
              {label: 'MainContent_OtherManagerControl1_txtBusAddress', value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1},
              {label: 'MainContent_OtherManagerControl1_txtBusCity',value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_City},
              {label: 'MainContent_OtherManagerControl1_txtBusZip',value: String(jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code)}
            ];
            await this.addInput(page, sevenno);

            await new Promise(resolve => setTimeout(resolve, 3000))

            await page.click('#MainContent_OtherManagerControl1_btnSave');


          // Contact Person 
            const tenno = [
            {label: 'MainContent_FilingFormContactInfoControl1_txtContactName',value: jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name},
            {label: 'MainContent_FilingFormContactInfoControl1_txtStreetNo',value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1},
            {label: 'MainContent_FilingFormContactInfoControl1_txtCity',value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_City},
            {label: 'MainContent_FilingFormContactInfoControl1_txtZip',value: String(jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code)}, 
            {label: 'MainContent_FilingFormContactInfoControl1_txtContactEmail',value: jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Email_Address}
            
        ];
        await this.addInput(page, tenno);
        

        const sign=[
          {label: 'MainContent_DisclaimerNonProfitControl1_txtUndersigned1',value:jsonData.data.Payload.Registered_Agent.RA_Name}
        ]
        await this.addInput(page, sign);

        await this.clickButton(page, '#MainContent_DisclaimerNonProfitControl1_rdoAccept');  
        logger.info('Login form filled out successfully for Massachusetts LLC.');

        
        await this.clickButton(page, '#MainContent_ButtonsControl1_btnSubmitExternal');  
        logger.info('Login form filled out successfully for Massachusetts LLC.');


    } catch (error) {
        // Log full error stack for debugging
        logger.error('Error in Massachusetts LLC form handler:', error.stack);
        throw new Error(`Massachusetts LLC form submission failed: ${error.message}`);
      }
    }
  }
  
module.exports = MassachusettsForLLC;
