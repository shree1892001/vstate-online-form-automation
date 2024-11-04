const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class RhodeislandForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async RhodeislandForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await page.select('select[name="tblDataTable_length"]', '100');
            await page.waitForSelector('a[href="https://business.sos.ri.gov/corp/LoginSystem/FormRouter.asp?FilingCode=0801093&NewFormation=True"]', { visible: true, timeout: 10000 });

            // Click the FileOnline link
            await page.click('a[href="https://business.sos.ri.gov/corp/LoginSystem/FormRouter.asp?FilingCode=0801093&NewFormation=True"]');
             await this.fillInputByName(page, 'EntityName', jsonData.data.Payload.Name.CD_LLC_Name);
            //add register agent
            await this.fillInputByName(page, 'AgentAddr1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'AgentCity', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'AgentName', jsonData.data.Payload.Registered_Agent.RA_Name);
            await new Promise(resolve => setTimeout(resolve, 3000))
            await this.fillInputByName(page, 'AgentPostalCode', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code)); 
            await page.click('input[name="ArticlesChanged1"][value="C"]'); 
            await this.fillInputByName(page, 'Addr1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(page, 'City', jsonData.data.Payload.Principle_Address.PA_City); 
            await new Promise(resolve => setTimeout(resolve, 3000))

            
               const  state="RI";
                jsonData.data.Payload.Principle_Address.PA_State =state;
                // jsonData.data.Payload.Organizer_Information.Org_Address.Org_State =state;

                await page.evaluate(() => {
                    CS(1, 'State', document.TemplateForm.ContactState); 
                  });
                
                  const state1=jsonData.data.Payload.Organizer_Information.Org_Address.Org_State.split("-"); 
                  const req=state1[0]+" "+state1[1]; 
                  const newPagePromise1=new Promise(resolve=>{
                    page.once('popup',resolve); 
                  });
                  const newPage=await newPagePromise1;
    
                 await newPage.click("#submitItem");

    

            
            await this.fillInputByName(page, 'State', jsonData.data.Payload.Principle_Address.PA_State);
            await new Promise(resolve => setTimeout(resolve, 3000))
            await this.fillInputByName(page, 'PostalCode', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code)); 
            await this.fillInputByName(page, 'CountryCode', jsonData.data.Payload.Principle_Address.PA_Country); 

            await page.click('input[name="DateType"][value="P"]');   
            await page.click('input[name="FiscalDay"][value="01"]');

            await this.fillInputByName(page, 'ContactName', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name);
            await this.fillInputByName(page, 'ContactOrgName', jsonData.data.Payload.Name.CD_LLC_Name);
            await this.fillInputByName(page, 'ContactAddr1', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1);
            await this.fillInputByName(page, 'ContactCity', jsonData.data.Payload.Organizer_Information.Org_Address.Org_City);
            await this.fillInputByName(page, 'ContactPhone', String(jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Contact_No));
            await this.fillInputByName(page, 'ContactEMail', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Email_Address);

            
            await this.fillInputByName(page, 'ContactState', req);
            await this.fillInputByName(page, 'ContactPostalCode', String(jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code)); 
            await this.fillInputByName(page, 'ContactCountryCode', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Country); 
            await this.fillInputByName(page, 'UnderSignedName1', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name)
            await new Promise(resolve => setTimeout(resolve, 3000))
            await page.click('input[name="VerifyDisclaimer"][value="A"]');
            try {
                await page.waitForSelector('input[name="Submit"]');
                await page.click('input[name="Submit"]');
                
                // Wait for navigation or a specific element that indicates success
                await page.waitForNavigation(); // You may need to adjust this based on your flow
            } catch (error) {
                console.error('Error during form submission:', error);
            }

           
        } catch (error) {
            logger.error('Error in Rhodeisland LLC form handler:', error.stack);
            throw new Error(`Rhodeisland For LLC form submission failed: ${error.message}`);
        }
    }
}
module.exports = RhodeislandForLLC;
