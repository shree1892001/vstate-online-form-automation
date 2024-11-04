const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
const { json } = require('express');
const { timeout } = require('puppeteer');

class ColoradoForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async ColoradoForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            const linkSelector = 'a[href="#LLC"]';
            await page.waitForSelector('td > a[href="helpFiles/LLCintro.html"]', { visible: true, timeout: 60000 });
            await page.click('td > a[href="helpFiles/LLCintro.html"]');
            await this.clickButton(page, '.w3-btn-next');
            const inputFields = [
                { label: 'name', value: jsonData.data.Payload.Name.CD_LLC_Name }
            ];
            await this.addInput(page, inputFields);
            await this.clickButton(page, '.w3-btn-next');
            const principleaddress = [
                { label: 'streetAddress-address1', value: jsonData.data.Payload.Principle_Address.PA_Address_Line1 },
                { label: 'streetAddress-city', value: jsonData.data.Payload.Principle_Address.PA_City },
                { label: 'streetAddress-zip', value: jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString() }
            ];
            await this.addInput(page, principleaddress);
            await this.clickDropdown(page,"#streetAddress-state",jsonData.data.Payload.Principle_Address.PA_State);
            await this.clickDropdown(page,"#streetAddress-country",jsonData.data.Payload.Principle_Address.PA_Country);
            
            if(jsonData.data.Payload.Principle_Address===jsonData.data.Payload.Mailing_Address){
                await page.waitForSelector('input[type="checkbox"][name="isSameAsStreetAddressChecked"]');

                // Check the checkbox
                await page.evaluate(() => {
                  const checkbox = document.querySelector('input[type="checkbox"][name="isSameAsStreetAddressChecked"]');
                  if (!checkbox.checked) {
                    checkbox.click();
                  }
                });
            }else{
                const principleaddress = [
                    { label: 'mailingAddress-address1', value: jsonData.data.Payload.Principle_Address.PA_Address_Line1 },
                    { label: 'mailingAddress-city', value: jsonData.data.Payload.Principle_Address.PA_City },
                    { label: 'mailingAddress-zip', value: jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString() }
                ];
                await this.addInput(page, principleaddress);
                await this.clickDropdown(page,"#mailingAddress-state",jsonData.data.Payload.Principle_Address.PA_State);
                await this.clickDropdown(page,"#mailingAddress-country",jsonData.data.Payload.Principle_Address.PA_Country);
                
            }

            await this.clickButton(page, '.w3-btn-next');
            await page.waitForSelector('input[type="radio"][name="nameTyp"]');

                // Check the checkbox
                await page.evaluate(() => {
                  const checkbox = document.querySelector('input[type="radio"][name="nameTyp"]');
                  if (!checkbox.checked) {
                    checkbox.click();
                  }
                });
               let Name=jsonData.data.Payload.Registered_Agent.RA_Name.split(" ");
               console.log("Name",Name); 
                await this.fillInputByName(page,"individualName-firstName",Name[0]);
                console.log(Name[0]);
                await this.fillInputByName(page,"individualName-lastName",Name[1]);


                const registered_agent_fields = [
                    { label: 'streetAddress-address1', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1 },
                    { label: 'streetAddress-city', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City },
                    { label: 'streetAddress-zip', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString() }
                ];
                await this.addInput(page, registered_agent_fields);
                if(jsonData.data.Payload.Registered_Agent.RA_Address ===jsonData.data.Payload.Registered_Agent.RA_Address){

                   
                        await page.waitForSelector('input[type="checkbox"][name="isSameAsStreetAddressChecked"]');
        
                        // Check the checkbox
                        await page.evaluate(() => {
                          const checkbox = document.querySelector('input[type="checkbox"][name="isSameAsStreetAddressChecked"]');
                          if (!checkbox.checked) {
                            checkbox.click();
                          }
                        });
                }else{
                    const registered_agent_fields = [
                        { label: 'mailingAddress-address1', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1 },
                        { label: 'mailingAddress-city', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City },
                        { label: 'mailingAddress-zip', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString() }
                    ];
                    await this.addInput(page, registered_agent_fields);


                }
                await page.waitForSelector('input[type="radio"][name="agentConsentRadio"]');

                // Check the checkbox
                await page.evaluate(() => {
                  const checkbox = document.querySelector('input[type="radio"][name="agentConsentRadio"]');
                  if (!checkbox.checked) {
                    checkbox.click();
                  }
                });

               
                await page.click("#saveNextId"); 

                    await page.waitForSelector(".w3-modal", { visible: true, timeout: 12000 });
                
                    await page.click(".w3-modal button.w3-btn-next"); 
                
                    console.log("Modal detected and button clicked.");
               

               await page.waitForSelector("#saveNextId",{visible:true,timeout:12000});

                await page.click("#saveNextId");

                await page.waitForSelector('input[type="radio"][name="managedBy"]');

                // Check the checkbox
                await page.evaluate(() => {
                  const checkbox = document.querySelector('input[type="radio"][name="managedBy"]');
                  if (!checkbox.checked) {
                    checkbox.click();
                  }
                });

                await page.waitForSelector('input[type="radio"][name="hasOneMember"]');

                // Check the checkbox
                await page.evaluate(() => {
                  const checkbox = document.querySelector('input[type="radio"][name="hasOneMember"]');
                  if (!checkbox.checked) {
                    checkbox.click();
                  }
                });


                await this.clickButton(page, '.w3-btn-next');


                await page.waitForSelector('input[type="radio"][name="personTyp"]');

                // Check the checkbox
                await page.evaluate(() => {
                  const checkbox = document.querySelector('input[type="radio"][name="personTyp"]');
                  if (!checkbox.checked) {
                    checkbox.click();
                  }
                });
                let og_name= jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name.split(" "); 
                await this.fillInputByName(page,"name-firstName",og_name[0]); 
                await this.fillInputByName(page,"name-lastName",og_name[1]);

                const organizeraddress = [
                  { label: 'address-address1', value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1 },
                  { label: 'address-city', value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_City },
                  { label: 'address-zip', value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code.toString() }
              ];
              await this.addInput(page, organizeraddress);
              await this.clickDropdown(page,"#address-state",jsonData.data.Payload.Organizer_Information.Org_Address.Org_State);

              await page.waitForSelector("#saveNextId",{visible:true,timeout:12000});

                await page.click("#saveNextId");

                try {
                  await page.waitForSelector(".w3-modal", { visible: true, timeout: 12000 });
              
                  await page.waitForSelector('input[type="radio"][name="personTyp"]');

                // Check the checkbox
                await page.evaluate(() => {
                  const checkbox = document.querySelector('input[type="radio"][name="streetAddressSelectionTypeRadio"]');
                  if (!checkbox.checked) {
                    checkbox.click();
                  }
                });
                await page.waitForSelector(".w3-modal button.w3-btn-next"); 
                await page.click(".w3-modal button.w3-btn-next"); 
              
                  console.log("Modal detected and button clicked.");
              } catch (error) {
                  console.log("Modal did not appear, continuing with the flow.");
              }
              
             
              await page.click(".w3-btn-next"); // Replace with your next action
              
              await page.click(".w3-btn-next"); // Replace with your next action
              await page.click(".w3-btn-next");
              

              // Check the checkbox

              await page.waitForSelector('input[type="checkbox"][name="perjuryNoticeAffirmed"]');
              await page.evaluate(() => {
                const checkbox = document.querySelector('input[type="checkbox"][name="perjuryNoticeAffirmed"]');
                if (!checkbox.checked) {
                  checkbox.click();
                }
              });
              await page.waitForSelector('input[type="checkbox"][name="sameAsFormer"]');
               
              await page.evaluate(() => {
                const checkbox = document.querySelector('input[type="checkbox"][name="sameAsFormer"]');
                if (!checkbox.checked) {
                  checkbox.click();
                }
              });

              
              await page.click(".w3-btn-next");
              
             await page.waitForSelector('input[name="emailNotificationRadio"][value="N"]');
              await page.click('input[name="emailNotificationRadio"][value="N"]');


              await page.waitForSelector('input[name="textNotificationRadio"][value="N"]');
              await page.click('input[name="textNotificationRadio"][value="N"]');

              await page.click(".w3-btn-next");



            
              
              





   




                





            
        } catch (error) {
            logger.error('Error in Colorado For LLC form handler:', error.stack);
            throw new Error(`Colorado For LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = ColoradoForLLC;


