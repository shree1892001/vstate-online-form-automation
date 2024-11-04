const BaseFormHandler = require('../handlers/BaseFormHandler');
const logger = require('../utils/logger');

class SouthDakotaForLLC extends BaseFormHandler {
    constructor() {
        super();
    }

    async SouthDakotaForLLC(page, jsonData){
        logger.info('Navigating to SouthDakota form submission page...');
      let url1="https://sosenterprise.sd.gov/BusinessServices/Business/RegistrationLLC.aspx?d=true";
      const llcurl=url1.split('/RegistrationLLC.aspx?d=true')[1];
      console.log(llcurl)
      const appendurl=`${jsonData.data.State.stateUrl}/RegistrationLLC.aspx?d=true`;
    //   console.log(appendurl);

        await this.navigateToPage(page, appendurl);

        await this.waitForTimeout(2000)
        await this.fillInputByName(page, 'ctl00$MainContent$ucName$txtName', jsonData.data.Payload.Name.CD_LLC_Name);
        await this.fillInputByName(page, 'ctl00$MainContent$ucName$txtNameConfirm', jsonData.data.Payload.Name.CD_LLC_Name);
        await page.click('#ContinueButton');

        await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtAddr1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
        await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtCity', jsonData.data.Payload.Principle_Address.PA_City);
        await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtPostal', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
        await this.fillInputByName(page, 'ctl00$MainContent$ucAddress$txtEmail', jsonData.data.Payload.Registered_Agent.RA_Email_Address);

        // Wait for the checkbox to be available
        const checkbox = await page.waitForSelector('#chkCopyAddress');
        await checkbox.click();

        await page.click('.btn.btn-success.btn-md');

        await page.waitForSelector('select#ddlRaType', { visible: true });

        // Select the option with value "RA" (Non-Commercial Registered Agent)
        await page.select('select#ddlRaType', 'RA');

        await page.click('#SaveButton');

        await new Promise(resolve => setTimeout(resolve, 3000))
// add button

        await page.waitForSelector('button.btn.btn-default');

        // Click the button using its text
        await page.evaluate(() => {
            const button = Array.from(document.querySelectorAll('button.btn.btn-default'))
            .find(btn => btn.textContent.trim() === 'Add a New Agent');
            if (button) {
            button.click();
            }
        });

        const FullName = jsonData.data.Payload.Registered_Agent.RA_Name;
        const [FirstName, LastName] = FullName.split(' ');
        // Assign the split first name and last name to the respective fields
        const Regagent = [
            { label: 'txtFirstName', value: FirstName },
            { label: 'txtLastName', value: LastName }
        ];
        await this.addInput(page, Regagent);

        await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtAddr1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
        await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtCity', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
        await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtPostal', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
        await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtEmail', jsonData.data.Payload.Registered_Agent.RA_Email_Address);

        
        await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtAddr1Mail', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
        await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtCityMail', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
        await this.fillInputByName(page, 'ctl00$MainContent$ucRA$txtPostalMail', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));

        await page.click('.btn.btn-success.btn-md');

        // Organizer info
        await new Promise(resolve => setTimeout(resolve, 3000));

        const OrgFullName = jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name;
        const [orgFirstName, orgLastName] = OrgFullName.split(' ');

        // Assign the split first name and last name to the respective fields
        const org = [
            { label: 'txtFirstName', value: orgFirstName },
            { label: 'txtLastName', value: orgLastName }
        ];
        await this.addInput(page, org);

        await new Promise(resolve => setTimeout(resolve, 3000));

        // Wait for the organization name input field and fill it
        await page.waitForSelector('input[name="ctl00$MainContent$ucOrganizers$txtOrgName"]');
        await this.fillInputByName(page, 'ctl00$MainContent$ucOrganizers$txtOrgName', jsonData.data.Payload.Name.CD_LLC_Name);

        // Wait for the address input field and fill it
        await page.waitForSelector('input[name="ctl00$MainContent$ucOrganizers$txtMail1"]');
        await this.fillInputByName(
            page,
            'ctl00$MainContent$ucOrganizers$txtMail1',
            `${jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1}, ${jsonData.data.Payload.Organizer_Information.Org_Address.Org_City}, ${jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code}`
        );

        await new Promise(resolve => setTimeout(resolve, 3000));

        // Wait for the save button and click it
        await page.waitForSelector('#ucOrganizers_SaveButton');
        await page.click('#ucOrganizers_SaveButton');

        await new Promise(resolve => setTimeout(resolve, 5000));

        // Wait for the success button and click it
        await page.waitForSelector('.btn.btn-success.btn-md');
        await page.click('.btn.btn-success.btn-md');

        await new Promise(resolve => setTimeout(resolve, 4000))
        await page.waitForSelector('.btn.btn-success.btn-md');
        await page.click('.btn.btn-success.btn-md');

        // member or manager 

        await page.waitForSelector('select#ddlSelections', { visible: true });
        await page.select('select#ddlSelections', '502');

        await new Promise(resolve => setTimeout(resolve, 3000))

        const memFullName = jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name;
        const [memFirstName, memLastName] = memFullName.split(' ');
        // Assign the split first name and last name to the respective fields
        const mem = [
            { label: 'txtFirstName', value: memFirstName },
            { label: 'txtLastName', value: memLastName }
        ];
        await this.addInput(page, mem);

        await this.fillInputByName(page, 'ctl00$MainContent$ucManagers$txtOrgName',jsonData.data.Payload.Name.CD_LLC_Name);
        await this.fillInputByName(page, 'ctl00$MainContent$ucManagers$txtMail1', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1,',',jsonData.data.Payload.Organizer_Information.Org_Address.Org_City,',',jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code);

        await page.click('.btn.btn-primary.btn-sm');
        
        await new Promise(resolve => setTimeout(resolve, 3000))
        await page.click('.btn.btn-primary.btn-sm');
        await new Promise(resolve => setTimeout(resolve, 3000))

        await page.click('.btn.btn-primary.btn-sm');
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        await page.click('.btn.btn-success.btn-md');
        await new Promise(resolve => setTimeout(resolve, 3000))
        

        await page.click('.btn.btn-success.btn-md');
        await new Promise(resolve => setTimeout(resolve, 3000))


        await new Promise(resolve => setTimeout(resolve, 8000))
        await page.click('.btn.btn-success.btn-md');

        await new Promise(resolve => setTimeout(resolve, 8000))
        await page.click('.btn.btn-success.btn-md');


            // Additional form handling code here
        } catch (error) {
            logger.error(`Failed to navigate to the form page: ${error.message}`);
           
            async function clickElement(page, selector) {
                try {
                    await page.waitForSelector(selector, { visible: true });
                    await page.click(selector);
                    console.log(`Clicked on element: ${selector}`);
                } catch (error) {
                    console.error(`Error clicking on element: ${selector}`, error);
                }
                
            }
            
        }
        
    }

  
module.exports = SouthDakotaForLLC;
