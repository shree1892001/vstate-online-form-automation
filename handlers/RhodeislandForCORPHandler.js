const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class RhodeislandForCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async RhodeislandForCORP(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            // Click the FileOnline link
            await page.click('a[href="https://business.sos.ri.gov/corp/LoginSystem/FormRouter.asp?FilingCode=0200013&NewFormation=True"]');
            await this.fillInputByName(page, 'EntityName', jsonData.data.Payload.Name.CD_CORP_Name);
            await page.waitForSelector('select[name="StockClass_1"]', { visible: true, timeout: 10000 });
            await this.clickDropdown(page, 'select[name="StockClass_1"]', 'CWP');
            await page.waitForSelector('input[name="stock2_1"]', { visible: true, timeout: 60000 });
            // Manually type data into the input field
            await page.type('input[name="stock2_1"]', jsonData.data.Payload.Stock_Details.SI_No_Of_Shares);
            await this.fillInputByName(page, 'AgentAddr1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName(page, 'AgentCity', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName(page, 'AgentName', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName(page, 'AgentPostalCode',String( jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
            await page.select('select[name="Title_1000"]', 'Incorporator');
            let state=""; 

            
                state="RI";
                jsonData.data.Payload.Incorporator_Information.Address.Inc_State =state;



            const rafullname = jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name;
            const [firstName, lastName] = rafullname.split(' ');
            await this.fillInputByName(page, 'FirstName_1000', firstName);
            await this.fillInputByName(page, 'LastName_1000', lastName);
            logger.info('FoRm submission complete fot Michigan LLC')  
            await this.fillInputByName(page, 'BusAddr_1000', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page, 'BusCity_1000', jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            await this.fillInputByName(page, 'BusState_1000', jsonData.data.Payload.Incorporator_Information.Address.Inc_State);
            await this.fillInputByName(page, 'BusPostalCode_1000', String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
            await this.fillInputByName(page, 'BusCountryCode_1000', jsonData.data.Payload.Incorporator_Information.Address.Inc_Country);
            await page.waitForSelector('input[name="AddIndividual"]');
            await page.click('input[name="AddIndividual"]');




            

           

            await this.fillInputByName(page, 'ContactName', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
            await this.fillInputByName(page, 'ContactOrgName', jsonData.data.Payload.Name.CD_CORP_Name);
            await this.fillInputByName(page, 'ContactAddr1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
            await this.fillInputByName(page, 'ContactCity', jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            await this.fillInputByName(page, 'ContactPhone', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Contact_No);
            await this.fillInputByName(page, 'ContactEMail', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Email_Address);



            await page.evaluate(() => {
                CS(1, 'State', document.TemplateForm.ContactState); 
              });
            
              const state1=jsonData.data.Payload.Incorporator_Information.Address.Inc_State.split("-"); 
              const req=state1[0]+" "+state1[1]; 
              const newPagePromise1=new Promise(resolve=>{
                page.once('popup',resolve); 
              });
              const newPage=await newPagePromise1;

             await newPage.click("#submitItem");
            await this.fillInputByName(page, 'ContactState', req);
            
            
              


            await this.fillInputByName(page, 'ContactPostalCode', String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code)); 
            await this.fillInputByName(page, 'ContactCountryCode', jsonData.data.Payload.Incorporator_Information.Address.Inc_Country); 
          // await page.waitForSelector('input[name="VerifyDisclaimer"][value="A"]', { visible: true, timeout: 60000 });
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
            logger.error('Error in Rhodeisland CORP form handler:', error.stack);
            throw new Error(` Rhodeisland CORP form submission failed: ${error.message}`);
        }
    }
}

module.exports = RhodeislandForCORP;