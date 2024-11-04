const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class NorthCarolinaLLC extends BaseFormHandler {
    constructor() {
        super();
    }


    async  NorthCarolinaLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl
            await this.navigateToPage(page, url); 

            await this.randomSleep(10000,40000);

            await page.waitForSelector('img[src="/img/Business_Registration/FileBusImageOnly.png"]',{visible:true,timeout:10000});

            await page.evaluate(() => {
                const imgElement = document.querySelector('img[src="/img/Business_Registration/FileBusImageOnly.png"]');
                if (imgElement) {
                    imgElement.closest('a').click(); 
                }
            });
        
            await this.randomSleep(10000,40000);
            const input_company_name = [
                { label: 'UserName', value: jsonData.data.State.filingWebsiteUsername },
                { label: 'Password', value: jsonData.data.State.filingWebsitePassword },
                
    
                
                ];
                await this.addInput(page, input_company_name);
                



        
           
               
               

            logger.info('Login form filled out successfully for New York LLC.');

            await this.clickButton(page,"#SubmitButton"); 
            await this.clickLinkByLabel(page, 'Domestic Business Corporation (For Profit) and Domestic Limited Liability Company');
            await this.clickLinkByLabel(page,'Articles of Organization for a Domestic Limited Liability Company (not for professional service limited liability companies)');
            const LLCfieldinput = [
                { label: 'P2_ENTITY_NAME', value: jsonData.data.Payload.Name.CD_Legal_Name },
            ];
            await this.addInput(page, LLCfieldinput);
            await this.randomSleep()
            await this.submitForm(page);
            await page.waitForSelector('#P4_INITIAL_STATEMENT_0', { visible: true });
            await page.click('#P4_INITIAL_STATEMENT_0');
            // Article Fields
            await this.fillInputByName1(page, 'P4_ENTITY_NAME', jsonData.data.Payload.Name.CD_Legal_Name);
            await page.select('#P4_COUNTY', '1');

            // Principle Address Fields 
            await this.fillInputByName1(page, 'P4_SOP_NAME', jsonData.data.Payload.Name.CD_Legal_Name);
            await this.fillInputByName1(page, 'P4_SOP_ADDR1', jsonData.data.Payload.Principal_Address.PA_Address_Line1);
            await this.fillInputByName1(page, 'P4_SOP_CITY', jsonData.data.Payload.Principal_Address.PA_City);
            await this.fillInputByName1(page, 'P4_SOP_POSTAL_CODE', String(jsonData.data.Payload.Principal_Address.PA_Zip_Code));

            // Registered Agent Fields
            await this.fillInputByName1(page, 'P4_RA_NAME', jsonData.data.Payload.Registered_Agent.RA_Name);
            await this.fillInputByName1(page, 'P4_RA_ADDR1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            await this.fillInputByName1(page, 'P4_RA_CITY', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await this.fillInputByName1(page, 'P4_RA_POSTAL_CODE', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));

            

            // Organizer Fields
            await this.fillInputByName1(page, 'P4_ORGANIZER_NAME', jsonData.data.Payload.Organizer_Information.Org_Name);
            await this.fillInputByName1(page, 'P4_SIGNATURE', jsonData.data.Payload.Organizer_Information.Org_Name);
            await this.fillInputByName1(page, 'P4_FILER_NAME', jsonData.data.Payload.Organizer_Information.Org_Name);
            await this.fillInputByName1(page, 'P4_FILER_ADDR1', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1);
            await this.fillInputByName1(page, 'P4_FILER_CITY', jsonData.data.Payload.Organizer_Information.Org_Address.Org_City);
            await this.fillInputByName1(page, 'P4_FILER_POSTAL_CODE', String(jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code));
            await page.evaluate(() => {
                apex.submit({ request: 'CONTINUE', validate: true });
            });


            await page.click('button#continue-button');


           
            return 'filled form successfully'
        } catch (error) {
            // Log full error stack for debugging
            logger.error('Error in New York LLC form handler:', error.stack);
            throw new Error(`New York LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = NorthCarolinaLLC;




