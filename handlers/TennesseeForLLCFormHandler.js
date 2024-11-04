const BaseFormHandler = require('../handlers/BaseFormHandler');
const logger = require('../utils/logger');

class TennesseeForLLC extends BaseFormHandler {
    constructor() {
        super();
    }

    async TennesseeForLLC(page, jsonData){
        logger.info('Navigating to Vermont form submission page...');
        const url = jsonData.data.State.stateUrl;
        await this.navigateToPage(page, url);

        await page.select('select#ctl00_MainContent_slctBusType', 'RegistrationLLC.aspx')

        await page.evaluate(() => {
            const checkbox = document.querySelector('#ctl00_MainContent_chkAgree');
            if (!checkbox.checked) {
              checkbox.checked = true;  // Set it to true (checked)
            }
          });

          await page.evaluate(() => {
            const button = document.querySelector('#ctl00_MainContent_ContinueButton');
            button.click();
          });

        await this.fillInputByName(page, 'ctl00$MainContent$ucName$txtName', jsonData.data.Payload.Name.CD_LLC_Name);
        await this.fillInputByName(page, 'ctl00$MainContent$ucName$txtNameConfirm', jsonData.data.Payload.Name.CD_LLC_Name);

        await page.evaluate(() => {
            const radioButton = document.querySelector('#ctl00_MainContent_ucName_rblIsDomestic_0');
            if (!radioButton.checked) {
              radioButton.checked = true;  // Set it to true (checked)
            }
          });

        await page.click('#ctl00_MainContent_ContinueButton');
        await new Promise(resolve => setTimeout(resolve, 3000))
        await this.clickDropdown(page, '#ctl00_MainContent_ucLLCDetail_ddlManagedBy', 'Manager Managed');

        // await this.fillInputByName(page, 'ctl00$MainContent$ucLLCDetail$txtMemberCount', jsonData.data.Payload.Shares_Information.SI_No_Of_Shares);
        // await this.fillInputByName(page, 'ctl00$MainContent$ucLLCDetail$txtMemberCountConfirm', jsonData.data.Payload.Shares_Information.SI_No_Of_Shares);
        
        await this.fillInputByName(page, 'ctl00$MainContent$ucLLCDetail$txtMemberCount', '1');
        await this.fillInputByName(page, 'ctl00$MainContent$ucLLCDetail$txtMemberCountConfirm', '1');
        
        await page.click('#ctl00_MainContent_ContinueButton');


        const FullName = jsonData.data.Payload.Registered_Agent.RA_Name;
        const [FirstName, LastName] = FullName.split(' ');
        // Assign the split first name and last name to the respective fields
        const regagent = [
            {label: 'ctl00_MainContent_ucRA_txtFirstName', value: FirstName},
            {label: 'ctl00_MainContent_ucRA_txtLastName', value: LastName}
        ];
        await this.addInput(page, regagent); 

      // Fill Registered Agent Address Information
        await page.waitForSelector('input[name="ctl00$MainContent$ucRA$txtAddr1"]');
        await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtAddr1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);

        await page.waitForSelector('input[name="ctl00$MainContent$ucRA$txtCity"]');
        await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtCity', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);

        await page.waitForSelector('input[name="ctl00$MainContent$ucRA$txtPostal"]');
        await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtPostal', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code);

        await this.clickDropdown(page, '#ctl00_MainContent_ucRA_slctCounty', 'DAVIDSON COUNTY');
        

        await page.click('#ctl00_MainContent_ucRA_chkCopyAddress');

        await new Promise(resolve => setTimeout(resolve, 10000))
        await page.waitForSelector('#ctl00_MainContent_ContinueButton');
        await this.clickButton(page,'#ctl00_MainContent_ContinueButton');

        await new Promise(resolve => setTimeout(resolve, 10000))
        await page.waitForSelector('#ctl00_MainContent_ContinueButton');
        await this.clickButton(page,'#ctl00_MainContent_ContinueButton');



        await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtEmail', jsonData.data.Payload.Registered_Agent.RA_Email_Address);
        
        await page.click('#ctl00_MainContent_ucAddress_chkCopyAddress');

        // Continue
        await new Promise(resolve => setTimeout(resolve, 7000))
        await page.click('#ctl00_MainContent_ContinueButton');


        await new Promise(resolve => setTimeout(resolve, 7000))
        await this.clickButton(page,"#ctl00_MainContent_ContinueButton")

        await new Promise(resolve => setTimeout(resolve, 7000))
        await this.clickButton(page,"#ctl00_MainContent_ContinueButton")

        await new Promise(resolve => setTimeout(resolve, 7000))
        await this.clickButton(page,"#ctl00_MainContent_ContinueButton")
        //   await page.select('#ctl00_MainContent_ucLLCDetail_ddlManagedBy', '504');

        // await new Promise(resolve => setTimeout(resolve, 3000))

        // await this.selectCheckboxByLabel('Domestic Tennessee Business - I am forming a new business entity which originates in Tennessee.');

        // await new Promise(resolve => setTimeout(resolve, 5000))

        // // await page.select('#ddlRaType', 'RA'); // Select by value
        // // console.log('Selected: Non-Commercial Registered Agent');ion


        // await this.clickbutton('#ctl00_MainContent_ContinueButton');

        // await this.clickDropdown('#ctl00_MainContent_ucLLCDetail_ddlManagedBy', '499');  

    } catch (error) {
        logger.error(`Failed to navigate to the form page: ${error.message}`);
    }
}


module.exports = TennesseeForLLC;
