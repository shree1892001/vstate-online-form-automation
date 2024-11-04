const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
const { timeout } = require('puppeteer');
const { json } = require('express');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class GeorgiaForCorp extends BaseFormHandler {
    constructor() {
        super();
    }
    async GeorgiaForCorp(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            

            await this.navigateToPage(page, url);
//                 await page.waitForSelector('label input[type="checkbox"]', { visible: true });

//   // Click the checkbox
        //  await page.click('label input[type="checkbox"]');

         await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 120000 });

        //   await this.waitForTimeout(300000);
        await this.randomSleep(60000 ,90000);

            await page.waitForSelector('.jumbo-btns',{visible:true,timeout:12000}); 
            await page.click('.jumbo-btns');
              



            await page.waitForSelector('.ui-dialog-buttonset .ui-button-text', { visible: true });
            await page.click('.ui-dialog-buttonset .ui-button');
          
           
            // Click the login button
            // const inputFields = [
            //     { label: 'txtUserId', value: jsonData.data.State.filingWebsiteUsername },
            //     { label: 'txtPassword', value: jsonData.data.State.filingWebsitePassword }
            // ];

            const inputFields=[
                {label:'txtUserId',value:"redberyl101"},
                {label:'txtPassword',value:"yD7?ddG0!$09"}



            ]







            await this.addInput(page, inputFields);
            await page.waitForSelector('#btnLogin'); // Wait for the button with ID "login_button"

            // Click the login button
            await page.click('#btnLogin');          
                       await page.waitForSelector('.nav_bg');

            await page.waitForSelector('.nav_bg');

            // Find the div that contains the 'Create or Register a Business' text and click it
            const divSelector = await page.evaluate(() => {
              const divs = Array.from(document.querySelectorAll('.nav_bg'));
              const targetDiv = divs.find(div => div.innerText.includes('Create or Register a Business'));
              if (targetDiv) {
                targetDiv.click();
                return true;
              }
              return false;
            });
            await page.waitForSelector('input[name="IsDomesticOrForeign"][value="D"]');
            await page.click('input[name="IsDomesticOrForeign"][value="D"]');
            await this.randomSleep(10000,20000); 
            await this.clickDropdown(page,"#ddlDomestic","Domestic Professional Corporation"); 

           await this.randomSleep(1000,2000);  
           await this.clickDropdown(page,"#ddlProfessionStatement","Pharmacy"); 
           await this.randomSleep(1000,2000);  

           const bussuinessName=[
            {label:'txtBusinessName',value:jsonData.data.Payload.Name.CD_Legal_Name},



        ]

        await this.addInput(page,bussuinessName); 
       await this.clickDropdown(page,"#ddlNaicsCode","Any legal purpose"); 
       await this.randomSleep(10000,20000);
       let zip = "PrincipalOfficeAddress_Zip5";
       let zip5 = "PrincipalOfficeAddress_PostalCode";
       
       const principleaddress = [
           { label: 'PrincipalOfficeAddress_StreetAddress1', value: jsonData.data.Payload.Principle_Address.PA_Address_Line1 },
           { label: 'PrincipalOfficeAddress_City', value: jsonData.data.Payload.Principle_Address.PA_City },
           // Conditionally set the postal code based on the label
           { 
               label: zip === "PrincipalOfficeAddress_Zip5" ? 'PrincipalOfficeAddress_Zip5' : 'PrincipalOfficeAddress_PostalCode', 
               value: jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString() 
           }
       ];

            await this.addInput(page, principleaddress);
            await this.clickDropdown(page,"#PrincipalOfficeAddress_State",jsonData.data.Payload.Principle_Address.PA_State);
            // await this.clickDropdown(page,"#PrincipalOfficeAddress_Country",jsonData.data.Payload.Principle_Address.PA_Country
            
        await this.randomSleep(1000,3000);
        await page.evaluate(() => {
            document.getElementById('btncontinue').click();
        });

            // Click the button

            

            await this.fillInputByName(page,"txtPrimaryEmail",jsonData.data.Payload.Registered_Agent.RA_Email_Address);
            await this.fillInputByName(page,"txtConfirmEmailAddress",jsonData.data.Payload.Registered_Agent.RA_Email_Address);



            await this.fillInputByName(page,"txtShareValue",jsonData.data.Payload.Stock_Information.SI_No_Of_Shares.toString());

            await page.evaluate(() => {
                document.getElementById('btnCreateAgent').click();
            });
           const ra_name=jsonData.data.Payload.Registered_Agent.RA_Name.split(' '); 
           const registeredAgent = [
            { label: 'txtFirstName', value: ra_name[0] },
            { label: 'txtLastName', value: ra_name[1] },
            { label: 'txtEmailAddress', value: jsonData.data.Payload.Registered_Agent.RA_Email_Address},

            // Conditionally set the postal code based on the label
           
        ];
        await this.addInput(page,registeredAgent); 
        await this.fillInputByName(page,"PrincipalAddress.StreetAddress1",jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
        await this.fillInputByName(page,"PrincipalAddress.City",jsonData.data.Payload.Registered_Agent.RA_Address.RA_City); 

        await this.clickDropdown(page,"#PrincipalAddress_County",jsonData.data.Payload.Registered_Agent.RA_Address.RA_County);

        
        await this.fillInputByName(page,"PrincipalAddress.Zip5",jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString()); 
        await page.evaluate(() => {
          // Find the button and call the createAgent function directly
          const button = document.querySelector('input.button[value="Create Registered Agent"]');
          if (button) {
              createAgent();
          }
      });

      await this.randomSleep(10000,30000);
  
      const organizer=jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name.split(' '); 

      await page.waitForSelector('input[name="Incorporator_txtFirstName"]',{visible:true,timeout:10000});
      await this.randomSleep(10000,40000);

      await this.fillInputByName(page,"Incorporator_txtFirstName",organizer[0]);
      await this.fillInputByName(page,"Incorporator_txtLastName",organizer[1]);
      await this.fillInputByName(page,"IncorporatorAddress.StreetAddress1",jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1); 
      await this.fillInputByName(page,"IncorporatorAddress.City",jsonData.data.Payload.Incorporator_Information.Address.Inc_City); 
      await this.fillInputByName(page,"IncorporatorAddress.Zip5",jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code.toString());
      
      await this.randomSleep(1000,3000);
      await page.evaluate(() => {
          document.getElementById('btnPrincipalAdd').click();
      });
      await this.randomSleep(1000,3000);
      await page.evaluate(() => {
        document.getElementById('chkAnnualMessage').click();
    });
    await this.randomSleep(1000,3000);


      await page.evaluate(() => {
        document.getElementById('ChkSignature').click();
    });
    

    await this.randomSleep(1000,3000);
    
    await this.fillInputByName(page,"txtAuthorizer_Signature",jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
   
   
    await this.randomSleep(1000,3000);
        await page.evaluate(() => {
            document.getElementById('btnContinue').click();
        });

        await this.randomSleep(1000,3000);
       

       







      



 
        


            // await page.click('#btncontinue');
          
         
            
            
        } catch (error) {
            logger.error('Error in New Jersey LLC form handler:', error.stack);
            throw new Error(`New Jersey LLC form submission failed: ${error.message}`);
        }
    }
}

module.exports = GeorgiaForCorp;


