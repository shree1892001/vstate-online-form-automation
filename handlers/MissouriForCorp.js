const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
const { timeout } = require('puppeteer');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class MissouriForCorp extends BaseFormHandler {
    constructor() {
        super();
    }
    async MissouriForCorp(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
           
            const inputFields = [
                { label: 'ctl00_ContentPlaceHolderMain_ppWelcomeMessage_ctl00_ctl00_txtUser', value: jsonData.data.State.filingWebsiteUsername },
                { label: 'ctl00_ContentPlaceHolderMain_ppWelcomeMessage_ctl00_ctl00_txtPassword', value: jsonData.data.State.filingWebsitePassword }
            ];

            await this.addInput(page, inputFields);
            await page.waitForSelector('#ctl00_ContentPlaceHolderMain_ppWelcomeMessage_ctl00_ctl00_btnSignIn'); // Wait for the login button to appear
await page.click('#ctl00_ContentPlaceHolderMain_ppWelcomeMessage_ctl00_ctl00_btnSignIn'); // Click the login button
          
            
            await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 12000 });
            
            await page.waitForSelector('a[href="BusinessEntity/NewBEFiling.aspx?FilingCategoryID=4"]');

    await page.click('a[href="BusinessEntity/NewBEFiling.aspx?FilingCategoryID=4"]');

    await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBENewFiling_rcBEType_Input');

    // Click the input field to open the dropdown (if required)
    await page.click('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBENewFiling_rcBEType_Input');

    // Type the value you want to select in the dropdown
    await page.type('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBENewFiling_rcBEType_Input', 'Professional Corporation');


    await page.click('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBENewFiling_rcBEDomesticity_Input');

    // Type the value you want to select in the dropdown
    await page.type('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBENewFiling_rcBEDomesticity_Input', 'Domestic');

   await page.click("#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBENewFiling_stdBtnCreateNewCorporation_divStandardButtonTop");

   await this.randomSleep(10000,20000);


//    await page.select('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBEName_txtBEName', jsonData.data.Payload.Name.CD_CORP_Name );
     await this.fillInputByName(page,"ctl00$ctl00$ContentPlaceHolderMain$ContentPlaceHolderMainSingle$ppBEName$txtBEName",jsonData.data.Payload.Name.CD_CORP_Name);

     await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBEName_stdbtnNext_divStandardButtonBottom');

     await page.click('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBEName_stdbtnNext_divStandardButtonBottom');
     

     await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBERegAgent_esPanel_stdbtnIDoNotWantToSearch_divStandardButtonBottom');
    await page.click('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBERegAgent_esPanel_stdbtnIDoNotWantToSearch_divStandardButtonBottom');

  const name=jsonData.data.Payload.Registered_Agent.RA_Name.split(" ");
  const regFields = [
    { label: 'ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBERegAgent_ucAddress_txtFirstName', value: name[0] },
    { label: 'ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBERegAgent_ucAddress_txtLastName', value: name[1] }
];

await this.addInput(page, regFields);

const regFields1 = [
    { label: 'txtAddress1', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1 },
    { label: 'txtCity', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City },
    { label: 'txtZip', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString()

    },

];

await this.addInput(page, regFields1);
await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBERegAgent_stdbtnSaveRA_container', { visible: true });

    // Click on the button container
    await page.click('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBERegAgent_stdbtnSaveRA_container');

   
    await page.waitForNavigation({waitUntil:"networkidle0"});
    await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBERegAgent_stdbtnNext_divStandardButtonImage', { visible: true });

    // Click on the NEXT button
    await page.click('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBERegAgent_stdbtnNext_divStandardButtonImage');

    await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBEGeneralInfo_BENameCustomFields_AssetDistribution205');

    // Type the value into the textarea
    await page.type('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBEGeneralInfo_BENameCustomFields_AssetDistribution205', jsonData.data.Payload.Stock_Details.SI_No_Of_Shares.toString());
    
    await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBEGeneralInfo_stdbtnNext_divStandardButtonImage');

    // Click the button
    await page.click('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBEGeneralInfo_stdbtnNext_divStandardButtonImage');



    // Check the checkbox if not already checked
    await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppOfficers_cblOfficerType_0');

    // Click the checkbox to check it (toggle)
    await page.click('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppOfficers_cblOfficerType_0');

    const og_name=jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name.split(" ");
    const orgFields = [
    { label: 'ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppOfficers_OfficeAddress_txtFirstName', value: og_name[0] },
    { label: 'ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppOfficers_OfficeAddress_txtLastName', value: og_name[1] }
];

await this.addInput(page, orgFields);
const orgFields1 = [
    { label: 'txtAddress1', value: jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1 },
    { label: 'txtCity', value: jsonData.data.Payload.Incorporator_Information.Address.Inc_City },
    { label: 'txtZip', value: jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code.toString()},

];

await this.addInput(page, orgFields1);

 await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppOfficers_stdBtnSaveOfficer_container');

  // Click on the button
  await page.click('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppOfficers_stdBtnSaveOfficer_container');

    // Use JavaScript to trigger the click event on the button
    await page.evaluate(() => {
        const button = document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppOfficers_stdBtnSaveOfficer_container');
        if (button) {
            button.click(); // Trigger a click event
        } else {
            console.error("Button not found!");
        }
    });

    await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppOfficers_stdbtnNext_container', { visible: true });

    // Click on the NEXT button
    await page.evaluate(() => {
        const button = document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppOfficers_stdbtnNext_container');
        if (button) {
            button.click(); // Trigger a click event
        } else {
            console.error("Button not found!");
        }
    });
    
    await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppFilerAcknowledgementReviewPage_chkAcknowledgment');

    // Check the checkbox
  //   await page.click('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppFilerAcknowledgementReviewPage_chkAcknowledgment');
    await page.evaluate(() => {
      const button = document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppFilerAcknowledgementReviewPage_chkAcknowledgment');
      if (button) {
          button.click(); // Trigger a click event
      } else {
          console.error("NEXT button not found!");
      }
  });
  
  

  await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppFilerAcknowledgementReviewPage_stdbtnNextLower_divStandardButtonImage');
  await page.evaluate(() => {
    const button = document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppFilerAcknowledgementReviewPage_stdbtnNextLower_divStandardButtonImage');
    if (button) {
        button.click(); // Trigger a click event
    } else {
        console.error("NEXT button not found!");
    }
});
await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBESignature_SignorSelectGrid_ctl00_ctl04_cbSignorSelect');
await page.evaluate(() => {
    const button = document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBESignature_SignorSelectGrid_ctl00_ctl04_cbSignorSelect');
    if (button) {
        button.click(); // Trigger a click event
    } else {
        console.error("NEXT button not found!");
    }
});
await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBESignature_chkAcknowledgment');
await page.evaluate(() => {
    const button = document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBESignature_chkAcknowledgment');
    if (button) {
        button.click(); // Trigger a click event
    } else {
        console.error("NEXT button not found!");
    }
});   
await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBESignature_chkAcknowledgment');

  // Check the checkbox (make sure it's not already checked)
  const isChecked = await page.$eval('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBESignature_chkAcknowledgment', el => el.checked);
  if (!isChecked) {
    await page.click('#ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMainSingle_ppBESignature_chkAcknowledgment');
  }
   


               await this.randomSleep(1000000,1200000); 


                

               


          


            
            
        } catch (error) {
            logger.error('Error in New Jersey Corp form handler:', error.stack);
            throw new Error(`New Jersey Corp form submission failed: ${error.message}`);
        }
    }
}

module.exports = MissouriForCorp;


