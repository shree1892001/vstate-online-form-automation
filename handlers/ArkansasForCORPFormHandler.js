const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
const { add } = require('winston');
const { json } = require('express/lib/response');

class ArkansasForCORP extends BaseFormHandler {
    constructor() {
        super();
    }

    async  ArkansasForCORP(page, jsonData) {
      try {
        logger.info('Navigating to Arkansas form submission page...');

        const url = jsonData.data.State.stateUrl;
        await this.navigateToPage(page, url);

        await page.evaluate(() => {
            document.querySelector('a[href="javascript:showOptions(1)"]').click();
        });

        // start form 
        await page.click('input[type="submit"][name="do:StartForm=1"]');

        // Entity Name  
        const entityname=[
          {label:'entity_name', value:jsonData.data.Payload.Name.CD_CORP_Name}
        ];
        await this.addInput(page, entityname);

        // Stock info
        await page.click('#stock_nonstock_yes');

        const Stock =[
            {label:'auth_stock_total_shares', value: jsonData.data.Payload.Stock_Information.SI_No_Of_Shares},
            {label:'auth_stock_par_value', value: jsonData.data.Payload.Stock_Information.SI_Share_Par_Value}
        ];
        await this.addInput(page, Stock);


        // Registerd agent

         // Sample values to fill in
         const labels = await page.evaluate(() => {
            const fieldsets = Array.from(document.querySelectorAll('fieldset.group'));
              
            // Find the one that contains "Registered Agent"
            const registeredAgentFieldset = fieldsets.find(fieldset => {
                const legend = fieldset.querySelector('legend');
                return legend && legend.textContent.trim() === 'Registered Agent';
            });
    
            // If the Registered Agent fieldset is found, get all labels in it
            if (registeredAgentFieldset) {
                const labelElements = Array.from(registeredAgentFieldset.querySelectorAll('label'));
                return labelElements.map(label => label.textContent.trim());
            }
            
            return []; // Return an empty array if not found
        });
    
        // Print the labels to the console
        console.log("Registered Agent Labels:", labels);
    
            const inputFields = [
                {
                    label: 'Business Name',
                    value: jsonData.data.Payload.Registered_Agent.RA_Name,
                    sectionText: 'Registered Agent'
                },
          
                {
                    label: '*Address 1',
                    value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1,
                    sectionText: 'Registered Agent'
                },
              
                {
                    label: '*Zip',
                    value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code, // Example Arkansas zip code
                    sectionText: 'Registered Agent'
                },
                {
                    label: 'City',
                    value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City,
                    sectionText: 'Registered Agent'
                 },
               
            ];
    
            await this.addInputbyselector(page, inputFields);

             // Incorporator/Organizer
            //  Incorporator

            const Manager =[
            {label: 'officer_organization_name', value: jsonData.data.Payload.Name.CD_CORP_Name}
            ];
            await this.addInput(page, Manager);
            await this.clickDropdown(page, '#officer_title', 'Incorporator/Organizer');
  
            const Manageradd =[
              {label: 'officer_address_1',value: jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1},
              {label: 'officer_city',value: jsonData.data.Payload.Incorporator_Information.Address.Inc_City},
              {label: 'officer_zip_code',value: String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code)}
            ];
            await this.addInput(page, Manageradd);
            await page.click('input[name="save_add_officer"]');
  
            // Officer
  
              const Member =[
              {label: 'officer_organization_name', value: jsonData.data.Payload.Name.CD_CORP_Name}
              ];
              await this.addInput(page, Member);
              await this.clickDropdown(page, '#officer_title', 'General Manager');
    
              const Memberadd =[
                {label: 'officer_address_1',value: jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1},
                {label: 'officer_city',value: jsonData.data.Payload.Incorporator_Information.Address.Inc_City},
                {label: 'officer_zip_code',value: String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code)}
              ];
              await this.addInput(page, Memberadd);
              await page.click('input[name="save_add_officer"]');


              const purpose =[
                {label: 'purpose',value:jsonData.data.Payload.Purpose.CD_Business_Purpose_Details}
              ];
              await this.addInput(page, purpose);
              
              //Submitter Contact Info 

              const submittor =[
                {label: 'contact_organization_name', value: jsonData.data.Payload.Name.CD_CORP_Name}
                ];
                await this.addInput(page, submittor);

              const submittoradd =[
                {label: 'contact_address_1',value:jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1},
                {label: 'contact_city',value:jsonData.data.Payload.Incorporator_Information.Address.Inc_City},
                {label: 'contact_zip_code',value: String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code)},
                {label: 'contact_phone_number', value:jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Contact_No},
                {label: 'contact_email', value:jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Email_Address}
              
              ];
              await this.addInput(page, submittoradd);

              // Annual Report Contact Information 
              const Annual =[
                {label: 'tax_contact_organization_name', value: jsonData.data.Payload.Name.CD_CORP_Name}
                ];
                await this.addInput(page, Annual);
      
                const Annualadd =[
                  {label: 'tax_contact_address_1',value: jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1},
                  {label: 'tax_contact_city',value:jsonData.data.Payload.Incorporator_Information.Address.Inc_City},
                  {label: 'tax_contact_zip_code',value: String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code)},
                  {label: 'tax_contact_phone_number', value: jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Contact_No},
                  {label: 'tax_contact_email', value: jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Email_Address},
                  {label: 'tax_contact_signature', value:jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name}
                
                ];
                await this.addInput(page, Annualadd);


                await page.click('#agreement');

                const sign=[
                  {label: 'filing_signature', value:jsonData.data.Payload.Name.CD_CORP_Name}
                ]
                await this.addInput(page, sign);

                await this.clickDropdown(page, '#signature_title', 'Director');

                await page.click('#save_form');

                await page.click('input[value="Next"]');


        } catch (error) {
            // Log full error stack for debugging
            logger.error('Error in Washington LLC form handler:', error.stack);
            throw new Error(`Washington LLC form submission failed: ${error.message}`);
          }
        }
        async addInputbyselector(page, inputFields) {
          try {
              for (let field of inputFields) {
                  const { value, label, sectionText } = field;
      
                  // Log the current field being processed
                  console.log(`Processing field: ${label}`);
      
                  // Find the section that contains the specified text
                  const inputSelector = await page.evaluate((label, sectionText) => {
                      // Find the fieldset for Registered Agent
                      const fieldsets = Array.from(document.querySelectorAll('fieldset.group'));
                      const registeredAgentFieldset = fieldsets.find(fieldset => {
                          const legend = fieldset.querySelector('legend');
                          return legend && legend.textContent.trim() === sectionText; // Ensure we're checking the right section
                      });
      
                      if (registeredAgentFieldset) {
                          // Find the label element
                          const labelElement = Array.from(registeredAgentFieldset.querySelectorAll('label'))
                              .find(el => el.textContent.trim() === label);
                          
                          if (labelElement) {
                              // Log the found label
                              console.log(`Found label: ${label}`);
                              // Find the associated input
                              const inputElement = labelElement.closest('p').querySelector('input, select');
                              return inputElement ? `#${inputElement.id}` : null;
                          } else {
                              console.log(`Label not found: ${label}`);
                          }
                      }
                      return null;
                  }, label, sectionText);
      
                  if (inputSelector) {
                      await page.waitForSelector(inputSelector, { visible: true });
                      console.log(`Attempting to fill input for label "${label}" with value "${value}"`);
                      await page.type(inputSelector, value, { delay: 100 });
                      console.log(`Filled input for label "${label}" with value "${value}" in section containing "${sectionText}"`);
                  } else {
                      console.error(`Input not found for label "${label}" in section containing "${sectionText}"`);
                  }
              }
          } catch (error) {
              console.error("Error filling input fields:", error.message);
              throw error;
          }
      }
      
      
        
      }
    

    module.exports = ArkansasForCORP;