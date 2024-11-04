
const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
const { timeout } = require('puppeteer');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class NorthDakotaForCorp extends BaseFormHandler {
    constructor() {
        super();
    }
    async NorthDakotaForCorp(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await page.waitForSelector('.btn.btn-default.login-link');

            await page.click('.btn.btn-default.login-link');
            const inputFields = [
                { label: 'username', value: jsonData.data.State.filingWebsiteUsername },
                { label: 'password', value: jsonData.data.State.filingWebsitePassword }
            ];

            await this.addInput(page, inputFields);
            await page.waitForSelector('button.btn-raised.btn-light-primary.submit');

    await page.click('button.btn-raised.btn-light-primary.submit');  


    await this.waitForTimeout(3000)

    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const nextStepButton = buttons.find(btn => btn.textContent.trim() === 'Next Step');
        if (nextStepButton) {
            nextStepButton.click();
        }
    });     
            
            
            
    await page.waitForSelector('.radio-label');

    await page.click('.radio-label');

    await page.waitForSelector('button.btn.btn-raised.btn-primary.next.toolbar-button');

    await page.click('button.btn.btn-raised.btn-primary.next.toolbar-button');


    
    const labelText = 'Corporation';

    // Find the associated radio button by its label text
    await page.evaluate((labelText) => {
        const labels = Array.from(document.querySelectorAll('label.field-label.radio-label'));
        const targetLabel = labels.find(label => label.textContent.trim() === labelText);
        if (targetLabel) {
            const radioButtonId = targetLabel.getAttribute('for');
            const radioButton = document.getElementById(radioButtonId);
            if (radioButton) {
                radioButton.click();
            }
        }
    }, labelText);

    const optionLabelText = 'Business corporation';

    await page.evaluate((optionLabelText) => {
        const labels = Array.from(document.querySelectorAll('label.field-label.radio-label'));
        const targetLabel = labels.find(label => label.textContent.trim() === optionLabelText);
        if (targetLabel) {
            const radioButtonId = targetLabel.getAttribute('for');
            const radioButton = document.getElementById(radioButtonId);
            if (radioButton) {
                radioButton.click();
            }
        }
    }, optionLabelText);

    await page.waitForSelector('.btn.btn-raised.btn-primary.next.toolbar-button');
  await page.click('.btn.btn-raised.btn-primary.next.toolbar-button'); 



  const linkText = 'Business Corporation Articles of Incorporation';

    // Using page.evaluate to find and click the link
    // await page.evaluate((linkText) => {
    //     const link = Array.from(document.querySelectorAll('a'))
    //         .find(a => a.textContent.trim() === linkText);
    //     if (link) {
    //         link.click();
    //     } else {
    //         console.error('Link not found:', linkText);
    //     }
    // }, linkText); 
    const newPagePromise = new Promise(resolve => {
        page.once('popup', resolve); // Listen for popup events
    });
await page.evaluate((linkText) => {
    const link = Array.from(document.querySelectorAll('a'))
        .find(a => a.textContent.trim() === linkText);
    if (link) {
        link.click();
    } else {
        console.error('Link not found:', linkText);
    }
}, linkText);
const newPagePromise1 = new Promise(resolve => {
    page.once('popup', resolve); // Listen for popup events
});
const newPage = await newPagePromise1;
    
// Wait for the new page to load
    await newPage.waitForSelector('button.btn.btn-raised.btn-primary.next.toolbar-button');
    
    await newPage.click('button.btn.btn-raised.btn-primary.next.toolbar-button');
    await newPage.waitForSelector('label[for="reservedYN1"]',{visible:true,timeout:12000}); 
    await newPage.click('label[for="reservedYN1"]');

             const input_company_name = [
            { label: 'field-field1-undefined', value: jsonData.data.Payload.Name.CD_CORP_Name },
            { label: 'field-field2-undefined', value: jsonData.data.Payload.Name.CD_CORP_Name },
            

            
            ];
            await this.addInput(newPage, input_company_name);

            let country = jsonData.data.Payload.Principle_Address.PA_Country;

            if (country === "USA") {
                country = "United States"; 
                jsonData.data.Payload.Principle_Address.PA_Country = country;
            }
    


            // Wait for the label with specific text to be visible
await newPage.waitForSelector('label.radio-label', { visible: true, timeout: 12000 });

// Get all label elements and filter for the specific text
const labels = await newPage.$$('label.radio-label');

for (const label of labels) {
    const text = await label.evaluate(el => el.textContent);
    if (text.includes("It is not known if consent to use the name is needed from a business registered in North Dakota.")) {
        await label.click();
        console.log("Successfully clicked the label based on text content.");
        break; // Exit the loop once the correct label is clicked
    }
}
   // await this.selectRadioButtonByLabel(page, 'Perpetual / Ongoing');

            // Select the country
            await newPage.evaluate((jsonData) => {
              const select = document.querySelector('select[name="COUNTRY"]');
              const option = Array.from(select.options).find(option => option.text === jsonData.data.Payload.Principle_Address.PA_Country);
              if (option) {
                select.value = option.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
              } else {
                throw new Error(`Country  not found in the dropdown`);
              }
            }, jsonData);

            await this.randomSleep(5000,8000);
            await newPage.waitForSelector('input[aria-label="Principal executive office address: Address Line 1"]');

            await newPage.type('input[aria-label="Principal executive office address: Address Line 1"]', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(newPage,"CITY",jsonData.data.Payload.Principle_Address.PA_City);
            await this.fillInputByName(newPage,"POSTAL_CODE",jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString()
        );
            let state = jsonData.data.Payload.Principle_Address.PA_State;

        if (state === "North-Dakota") {
            state = "ND"; 
            jsonData.data.Payload.Principle_Address.PA_State = state;
        }

        
            // { label: 'initialPrincipalOffice\\.state', value: jsonData.data.Payload.Principal_Address.PA_State },
            //     { label: 'ZIP Code*', value: jsonData.data.Payload.Principal_Address.PA_Postal_Code },
           await this.clickDropdown(newPage,"#field-addr-state-HyRmVxJsW",jsonData.data.Payload.Principle_Address.PA_State);


          
            await newPage.evaluate((jsonData) => {
                const select = document.querySelector('select[name="COUNTRY"]');
                const option = Array.from(select.options).find(option => option.text === jsonData.data.Payload.Principle_Address.PA_Country);
                if (option) {
                  select.value = option.value;
                  select.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
                  throw new Error(`Country  not found in the dropdown`);
                }
              }, jsonData);
  
              await this.randomSleep(5000,8000);
              await newPage.waitForSelector('input[aria-label="Mailing address: Address Line 1"]');
  
              await newPage.type('input[aria-label="Mailing address: Address Line 1"]', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
              await newPage.type('input[aria-label="Mailing address: City"]', jsonData.data.Payload.Principle_Address.PA_City);
await newPage.type('input[aria-label="Mailing address: ZIP code"]',jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString());  
  
            
              await this.clickDropdown(newPage,"#field-addr-state-rJPeEgkib","ND");

              await newPage.waitForSelector('button.btn.btn-raised.btn-primary.next.toolbar-button');
    
              await newPage.click('button.btn.btn-raised.btn-primary.next.toolbar-button');

              await newPage.waitForSelector('label[for="TYPE_ID1"]');
              await newPage.click('label[for="TYPE_ID1"]'); 


              await newPage.waitForSelector('button.btn.btn-medium-neutral.add');

  await newPage.click('button.btn.btn-medium-neutral.add');


  await newPage.waitForSelector('input[name="FIRST_NAME"]', { visible: true, timeout: 30000 });

  
            
            const fullName = jsonData.data.Payload.Registered_Agent.RA_Name.split(" ");
            
            await newPage.type('input[name="FIRST_NAME"]', fullName[0]);
            // await page.type('input[name=??"MIDDLE_NAME"]', data.middleName || '');
            await newPage.type('input[name="LAST_NAME"]', fullName[1]);
        
            // Fill in the physical address
            await newPage.type('input[name="ADDR1"]', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
            // await newPage.type('input[name="ADDR2"]', data.address2 || '');
            await newPage.type('input[name="CITY"]', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
            await newPage.type('input[name="POSTAL_CODE"]', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString());

            await newPage.waitForSelector('#field-address1-r1v8uILPZ_MAIL');
            await newPage.type('#field-address1-r1v8uILPZ_MAIL',jsonData.data.Payload.Principle_Address.PA_Address_Line1 );
          
            
          
            
          
            await newPage.waitForSelector('#field-addr-city-r1v8uILPZ_MAIL');
            await newPage.type('#field-addr-city-r1v8uILPZ_MAIL', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
          
            await newPage.waitForSelector('#field-addr-zip-r1v8uILPZ_MAIL');
            await newPage.type('#field-addr-zip-r1v8uILPZ_MAIL', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString());



            await this.randomSleep(1000,3000);

            const submitButton = await newPage.waitForSelector('.controls .btn-primary', {
                visible: true,
                timeout: 5000
            });
        
            // Click the submit button and wait for navigation
            await Promise.all([
                this.randomSleep(10000,20000),
                submitButton.click()
            ]);
            
 
            await this.waitForTimeout(3000)
            await newPage.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                const nextStepButton = buttons.find(btn => btn.textContent.trim() === 'Next Step');
                if (nextStepButton) {
                    nextStepButton.click();
                }
            });
             await newPage.type('#field-H1_Uiexjb',jsonData.data.Payload.Purpose.CD_Business_Purpose_Details);


            await newPage.waitForSelector('button.btn.btn-raised.btn-primary.next.toolbar-button');
    
            await newPage.click('button.btn.btn-raised.btn-primary.next.toolbar-button');

            await this.fillInputByName(newPage,"COMMON_SHARES",jsonData.data.Payload.Stock_Information.SI_Share_Par_Value.toString());

            await this.clickButton(newPage,'button.form-button.add-row'); 
            await this.fillInputByName(newPage,"NO_OF_SHARES",jsonData.data.Payload.Stock_Information.SI_No_Of_Shares.toString());
            await this.fillInputByName(newPage,"PAR_VALUE",jsonData.data.Payload.Stock_Information.SI_Share_Par_Value.toString());
            const submitButton2 = await newPage.waitForSelector('.controls .btn-primary', {
                visible: true,
                timeout: 5000
            });
        
            // Click the submit button and wait for navigation
            await Promise.all([
                this.randomSleep(10000,20000),
                submitButton2.click()
            ]);


            await newPage.waitForSelector('button.btn.btn-raised.btn-primary.next.toolbar-button');
    
            await newPage.click('button.btn.btn-raised.btn-primary.next.toolbar-button');





                    let fullName1=jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name.split(" "); 
                    await this.clickButton(newPage,'button.form-button.add-row'); 

           
                await this.fillInputByName(newPage,"FIRST_NAME",fullName1[0]);
                await this.fillInputByName(newPage,"LAST_NAME",fullName1[1]);
                await this.fillInputByName(newPage,"ADDR1",jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
                await this.fillInputByName(newPage,"CITY",jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
            


                await this.fillInputByName(newPage,"POSTAL_CODE", jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code.toString());
                await this.clickDropdown(newPage,"#field-addr-state-rkK7ieJsZ",jsonData.data.Payload.Incorporator_Information.Address.Inc_State);

                const submitButton1 = await newPage.waitForSelector('.controls .btn-primary', {
                    visible: true,
                    timeout: 5000
                });
            
                // Click the submit button and wait for navigation
                await Promise.all([
                    this.randomSleep(10000,20000),
                    submitButton1.click()
                ]);

            // await page.evaluate((jsonData) => {
            //         const dropdown = document.querySelector('[id="field-addr-country-SJF64fm9m"]');
            //         const option = Array.from(dropdown.options).find(opt => opt.text === jsonData.data.Payload.Principal_Address.PA_Country.toUpperCase());
            
            //         if (option) {
            //             dropdown.value = option.value;
            
            //             // Dispatch a 'change' event to trigger any event listeners
            //             const event = new Event('change', { bubbles: true });
            //             dropdown.dispatchEvent(event);
            //         }
            //     },jsonData);


                // const submitButton1 = await newPage.waitForSelector('.controls .btn.btn-raised.btn-primary', {
                //     visible: true,
                //     timeout: 5000
                // });
            
                // // Click the submit button and wait for navigation
                // await Promise.all([
                //     submitButton1.click()
                // ]);
                await newPage.waitForSelector('button.btn.btn-raised.btn-primary.next.toolbar-button');
    
                await newPage.click('button.btn.btn-raised.btn-primary.next.toolbar-button');

                
              
                // Click the checkbox label after scrolling into view
                await page.waitForSelector('input[name="SIGNATURE_AGREE_YN"]',{visibe:true,timeout:10000}); // Wait for the checkbox to appear
                await page.click('input[name="SIGNATURE_AGREE_YN"]');
                
                const signatureInputSelector = `input[aria-label="Signature for ${jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name}"]`;

                await page.waitForSelector(signatureInputSelector);
                await page.type(signatureInputSelector, jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
              

                await this.clickButton(newPage,'.btn.btn-primary.btn-raised');

                await newPage.waitForSelector('input[name="SIGNATURE_AGREE_YN"]');

                // Use evaluate() to set the checkbox to checked
                await newPage.evaluate(() => {
                  const checkbox = document.querySelector('input[name="SIGNATURE_AGREE_YN"]');
                  if (!checkbox.checked) {
                    checkbox.click(); // Click to check it
                  }
                });
              

                await newPage.waitForSelector('button.btn.btn-raised.btn-primary.next.toolbar-button');
    
                await newPage.click('button.btn.btn-raised.btn-primary.next.toolbar-button');


               await this.randomSleep(1000000,1200000); 


                

               


          


            
            
        } catch (error) {
            logger.error('Error in New Jersey LLC form handler:', error.stack);
            throw new Error(`New Jersey LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = NorthDakotaForCorp;











































































































































