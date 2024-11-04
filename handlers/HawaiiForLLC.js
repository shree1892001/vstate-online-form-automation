const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
const { timeout } = require('puppeteer');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class HawaiiForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async HawaiiForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await page.waitForSelector('a[title="eHawaii.gov account services"]');

            // Click the login button
            await page.click('a[title="eHawaii.gov account services"]');
            const inputFields = [
                { label: 'username', value: jsonData.data.State.filingWebsiteUsername },
                { label: 'password', value: jsonData.data.State.filingWebsitePassword }
            ];

            await this.addInput(page, inputFields);
            await page.waitForSelector('#login_button'); // Wait for the button with ID "login_button"

            // Click the login button
            await page.click('#login_button');          
            
            await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 12000 });
            
            await page.waitForSelector('a.btn.btn-lg.btn-secondary'); // Wait for the "Get started" button to appear

    await page.click('a.btn.btn-lg.btn-secondary'); 
    await page.waitForSelector('#startBusiness_1'); // Wait for the radio button with id "startBusiness_1"

    // Click the first radio button
    await page.click('#startBusiness_1'); 
    await page.waitForSelector('#basedInHawaii_true'); // Wait for the radio button with id "basedInHawaii_true"

    // Click the first radio button (Yes, it is based in Hawaii)
    await page.click('#basedInHawaii_true'); 
            // await this.clickOnTitle(page, 'Articles of Organization for Domestic Limited Liability Company');
            // await this.clickButton(page,'button.btn.btn-primary.btn-text')
            // await this.clickDropdown(page, '#businessStructure');
            // await this.getInputSelectorByLabel(page,)

            
                await page.evaluate(() => {
                    const dropdown = document.querySelector('#businessStructure');
                    const option = Array.from(dropdown.options).find(opt => opt.text === "Limited Liability Company");
            
                    if (option) {
                        dropdown.value = option.value;
            
                        // Dispatch a 'change' event to trigger any event listeners
                        const event = new Event('change', { bubbles: true });
                        dropdown.dispatchEvent(event);
                    }
                });
            

            await this.clickButton(page,'#continue')


         
            const input_company_name = [
            { label: 'entityName', value: jsonData.data.Payload.Name.CD_LLC_Name },
            
            ];
            await this.addInput(page, input_company_name)
            // await this.selectRadioButtonByLabel(page,'The business name selected is unique across all registered businesses.  No error message is noted above.')
            // await this.clickButton(page ,'.btn.btn-raised.btn-primary.next.toolbar-button')
            // await this.selectRadioButtonByLabel(page, 'Perpetual / Ongoing');
            await page.evaluate((jsonData) => {
                const dropdown = document.querySelector('#initialPrincipalOffice\\.country');
                const option = Array.from(dropdown.options).find(opt => opt.text === jsonData.data.Payload.Principle_Address.PA_Country.toUpperCase());
        
                if (option) {
                    dropdown.value = option.value;
        
                    // Dispatch a 'change' event to trigger any event listeners
                    const event = new Event('change', { bubbles: true });
                    dropdown.dispatchEvent(event);
                }
            },jsonData);
             let principle_address_fields = [
                { label: 'initialPrincipalOffice\\.street1', value: jsonData.data.Payload.Principle_Address.PA_Address_Line1 },
                { label: 'initialPrincipalOffice\\.city', value: jsonData.data.Payload.Principle_Address.PA_City },
                // { label: 'initialPrincipalOffice\\.state', value: jsonData.data.Payload.Principle_Address.PA_State },
                // { label: 'ZIP Code*', value: jsonData.data.Payload.Principal_Address.PA_Postal_Code },
                ];

            await this.addInput(page, principle_address_fields);
           

            await this.clickDropdown(page,"#initialPrincipalOffice\\.state",jsonData.data.Payload.Principle_Address.PA_State.toUpperCase());
            let principle_address_fields1= [
                
                // { label: 'initialPrincipalOffice\\.state', value: jsonData.data.Payload.Principal_Address.PA_State },
                { label: 'initialPrincipalOffice\\.zip', value: jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString() },
                ];
                await this.addInput(page, principle_address_fields1);

             await this.selectRadioButtonByLabel(page,'Individual')
            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            
            const register_agent_fields = [
                { label: 'registeredAgent\\.nameOfAgent', value: fullName},
                {label:'registeredAgent\\.registeredOffice\\.street1',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1 },
            { label: 'registeredAgent\\.registeredOffice\\.city', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City },
            // {label:'registeredAgent\\.registeredOffice\\.zip',value: jsonData.data.Payload.Registered_Agent.Address.RA_Postal_Code }
               
                ];
            await this.addInput(page, register_agent_fields)
            await page.evaluate((jsonData) => {
                const dropdown = document.querySelector('#registeredAgent\\.registeredOffice\\.state');
                const option = Array.from(dropdown.options).find(opt => opt.text === jsonData.data.Payload.Registered_Agent.RA_Address.RA_State.toUpperCase());
        
                if (option) {
                    dropdown.value = option.value;
        
                    // Dispatch a 'change' event to trigger any event listeners
                    const event = new Event('change', { bubbles: true });
                    dropdown.dispatchEvent(event);
                }
            },jsonData);
            const registered_agent_fields1= [
                
                // { label: 'initialPrincipalOffice\\.state', value: jsonData.data.Payload.Principal_Address.PA_State },
                { label: 'registeredAgent\\.registeredOffice\\.zip', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString()},
                ];
                await this.addInput(page, registered_agent_fields1);


                await page.waitForSelector('#organizers\\[0\\]\\.isSSN_true'); 

                await page.click('#organizers\\[0\\]\\.isSSN_true');
                
                await page.evaluate((jsonData) => {
                    const dropdown = document.querySelector('[id="organizers[0].address.country"]');
                    const option = Array.from(dropdown.options).find(opt => opt.text === jsonData.data.Payload.Principle_Address.PA_Country.toUpperCase());
            
                    if (option) {
                        dropdown.value = option.value;
            
                        // Dispatch a 'change' event to trigger any event listeners
                        const event = new Event('change', { bubbles: true });
                        dropdown.dispatchEvent(event);
                    }
                },jsonData);
                await page.evaluate((jsonData) => {
                    // Update the organizer's name
                    const nameField = document.querySelector('[id="organizers[0].name"]');
                    if (nameField) {
                        nameField.value = jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name;
                        
                        // Dispatch an input event to trigger any listeners
                        const nameEvent = new Event('input', { bubbles: true });
                        nameField.dispatchEvent(nameEvent);
                    }
                
                    // Update the organizer's street address
                    const streetField = document.querySelector('[id="organizers[0].address.street1"]');
                    if (streetField) {
                        streetField.value = jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1;
                        
                        // Dispatch an input event to trigger any listeners
                        const streetEvent = new Event('input', { bubbles: true });
                        streetField.dispatchEvent(streetEvent);
                    }
                
                    // Update the organizer's city
                    const cityField = document.querySelector('[id="organizers[0].address.city"]');
                    if (cityField) {
                        cityField.value = jsonData.data.Payload.Organizer_Information.Org_Address.Org_City;
                        
                        // Dispatch an input event to trigger any listeners
                        const cityEvent = new Event('input', { bubbles: true });
                        cityField.dispatchEvent(cityEvent);
                    }
                
                    // Update the country field (from the previous example)
                    const dropdown = document.querySelector('[id="organizers[0].address.country"]');
                    const option = Array.from(dropdown.options).find(opt => opt.text === jsonData.data.Payload.Organizer_Information.Org_Address.Org_Country.toUpperCase());
                    
                    if (option) {
                        dropdown.value = option.value;
                
                        // Dispatch a 'change' event to trigger any event listeners
                        const event = new Event('change', { bubbles: true });
                        dropdown.dispatchEvent(event);
                    }
                
                }, jsonData);
                
                // await page.evaluate((jsonData) => {
                //     const dropdown = document.querySelector('[id="organizers[0].address.state"]');
                //     const option = Array.from(dropdown.options).find(opt => opt.text === jsonData.data.Payload.Organizer_Information.Org_Address.Org_State.toUpperCase());
            
                //     if (option) {
                //         dropdown.value = option.value;
            
                //         // Dispatch a 'change' event to trigger any event listeners
                //         const event = new Event('change', { bubbles: true });
                //         dropdown.dispatchEvent(event);
                //     }
                // },jsonData);
                await this.clickDropdown(page,'#organizers\\[0\\]\\.address\\.state',jsonData.data.Payload.Organizer_Information.Org_Address.Org_State.toUpperCase()); 

                await page.evaluate((jsonData) => {
                    const dropdown = document.querySelector('[id="organizers[0].address.zip"]');
                    if(dropdown){
                        dropdown.value=jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code.toString();
                    }
            
                   
            
                        
                    
                },jsonData);
                
                await page.click("#isPerpetual_true");

                const number=1;
                  await page.click("#memberManaged_false");
                  await page.type("#memberCount",number.toString());  
                //   await page.type('input[name="managersOrMembers[0].name"]', jsonData.data.Payload.Member_Or_Manager_Details.Mom_Name.toString());
                  await this.fillInputByName(page,"managersOrMembers[0].name",jsonData.data.Payload.Member_Or_Manager_Details[0].Mom_Name);
                  // await page.select('select[name="managersOrMembers[0].address.country"]', jsonData.data.Payload.Memeber_or_Manager_Details.Address.MM_Country);
                  await page.type('input[name="managersOrMembers[0].address.street1"]', jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_Address_Line1);
                  await page.type('input[name="managersOrMembers[0].address.street2"]', jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_Address_Line2);
                  await page.type('input[name="managersOrMembers[0].address.city"]', jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_City);
                  // await page.select('select[name="managersOrMembers[0].address.state"]', jsonData.data.Payload.Memeber_or_Manager_Details.Address.MM_State);

                  await page.evaluate((jsonData) => {
                    const dropdown = document.querySelector('[id="managersOrMembers[0].address.state"]');
                    const option = Array.from(dropdown.options).find(opt => opt.text ===jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_State);
            
                    if (option) {
                        dropdown.value = option.value;
            
                        // Dispatch a 'change' event to trigger any event listeners
                        const event = new Event('change', { bubbles: true });
                        dropdown.dispatchEvent(event);
                    }
                },jsonData);
                  await page.type('input[name="managersOrMembers[0].address.zip"]', jsonData.data.Payload.Member_Or_Manager_Details[0].Address.MM_Zip_Code.toString());


                
        

                 await page.waitForSelector('#isEntity_false',{visible:true,timeout:12000});
               await page.click('#isEntity_false');
               const sign_field = [
                { label: 'signature\\.name', value: jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name},
                {label : 'signature\\.signature' ,value: jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name} 

               ]; 

               await this.addInput(page,sign_field); 
               await page.waitForSelector("#treviewSubmit",{visible:true,timeout:12000}); 
               await page.click("#treviewSubmit"); 

               await this.randomSleep(1000000,1200000); 


                

               


          


            
            
        } catch (error) {
            logger.error('Error in New Jersey LLC form handler:', error.stack);
            throw new Error(`New Jersey LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = HawaiiForLLC;


