// const BaseFormHandler = require('./BaseFormHandler');
// const logger = require('../utils/logger');

// class NewYorkForLLC extends BaseFormHandler {
//     constructor() {
//         super();
//     }


//     async  NewYorkForLLC(page, jsonData) {

//         try {
//             logger.info('Navigating to New York form submission page...');
//             await page.setCacheEnabled(false);

//             const url = jsonData.data.State.stateUrl
//             await this.navigateToPage(page, url)
//             const inputFields = [
//                 { label: 'Username', value: jsonData.data.State.filingWebsiteUsername },
//                 { label: 'Password', value: jsonData.data.State.filingWebsitePassword }
//             ];
           
//             await this.addInput1(page, inputFields);
//             logger.info('Login form filled out successfully for New York LLC.');
//             await this.submitForm(page);

//             await page.setCacheEnabled(false);

//             await this.clickLinkByLabel(page, 'Domestic Business Corporation (For Profit) and Domestic Limited Liability Company');
//             await page.setCacheEnabled(false);

//             await this.clickLinkByLabel(page,'Articles of Organization for a Domestic Limited Liability Company (not for professional service limited liability companies)');
//             const LLCfieldinput = [
//                 { label: 'P2_ENTITY_NAME', value: jsonData.data.Payload.Name.CD_LLC_Name },
//             ];
//             await this.addInput1(page, LLCfieldinput);
//             await this.randomSleep()
//             await this.submitForm(page);
//             await page.waitForSelector('#P4_INITIAL_STATEMENT_0', { visible: true });
//             await page.click('#P4_INITIAL_STATEMENT_0');
//             // Article Fields
//             await this.fillInputByName1(page, 'P4_ENTITY_NAME', jsonData.data.Payload.Name.CD_LLC_Name);
//              await this.clickDropdown(page,"#P4_COUNTY",jsonData.data.Payload.County.CD_County.toUpperCase())
//             // Principle Address Fields 
//             await this.fillInputByName1(page, 'P4_SOP_NAME', jsonData.data.Payload.Name.CD_LLC_Name);
//             await this.fillInputByName1(page, 'P4_SOP_ADDR1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
//             await this.fillInputByName1(page, 'P4_SOP_CITY', jsonData.data.Payload.Principle_Address.PA_City);
//             await this.fillInputByName1(page, 'P4_SOP_POSTAL_CODE', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString()));

//             // Registered Agent Fields
//             if (jsonData.data.Payload.Registered_Agent) {

//                 await page.evaluate(() => {                  
//                     const check = document.querySelector('#P4_RA_OPTION_0')
//                 check.click()
//                 });
//             await this.fillInputByName1(page, 'P4_RA_NAME', jsonData.data.Payload.Registered_Agent.RA_Name);
//             await this.fillInputByName1(page, 'P4_RA_ADDR1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
//             await this.fillInputByName1(page, 'P4_RA_CITY', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
//             await this.fillInputByName1(page, 'P4_RA_POSTAL_CODE', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString());
//             }
//             await page.evaluate(() => {  
//             const effectiveDate = document.querySelector('input#P4_EXISTENCE_OPTION_0');
//         const Dissolution_Date = document.querySelector('input#P4_DISSOLUTION_OPTION_0');
//         Dissolution_Date.scrollIntoView()
//         const liability_statement = document.querySelector('input#P4_LIAB_STATEMENT_0');
//         liability_statement.scrollIntoView()

//         // if (data.Payload.effectiveDate) {
//         if (effectiveDate) {
//           effectiveDate.click();
//           const radio1 = document.querySelector("input#P4_EXISTENCE_TYPE_0");
//           const radio2 = document.querySelector("input#P4_EXISTENCE_TYPE_1");

//           if (radio1 && radio1.checked) {
//             radio1.checked = true;
//           } else if (radio2 && radio2.checked) {
//             const effectiveDateInput = document.querySelector('input[name="P4_EXIST_CALENDAR"]');
//             if (effectiveDateInput) {
//               effectiveDateInput.value = data.effectiveDate;


//               effectiveDateInput.dispatchEvent(new Event('change', { bubbles: true }));

//               const dateComponent = document.querySelector('#P4_EXIST_CALENDAR');
//               if (dateComponent) {
//                 const event = new Event('ojInputDateValueChanged', { bubbles: true });
//                 dateComponent.dispatchEvent(event);
//               }
//             }
//           }
//         }

//         if (Dissolution_Date) {
//           Dissolution_Date.click();
//           const radio1 = document.querySelector("input#P4_DISSOLUTION_TYPE_0");
//           const radio2 = document.querySelector("input#P4_DISSOLUTION_TYPE_1");

//           if (radio1 && radio1.checked) {
//             radio1.checked = true;
//           } else if (radio2 && radio2.checked) {
//             const effectiveDateInput = document.querySelector('input[name="P4_DIS_CALENDAR"]');
//             if (effectiveDateInput) {
//               effectiveDateInput.value = data.effectiveDate;

//               effectiveDateInput.dispatchEvent(new Event('change', { bubbles: true }));

//               const dateComponent = document.querySelector('#P4_DIS_CALENDAR');
//               if (dateComponent) {
//                 const event = new Event('ojInputDateValueChanged', { bubbles: true });
//                 dateComponent.dispatchEvent(event);
//               }
//             }
//           }
//         }

//         if (liability_statement) {
//           liability_statement.click();
//         }
            
//     });
//             // Organizer Fields
//             await this.fillInputByName1(page, 'P4_ORGANIZER_NAME', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name);
//             await this.fillInputByName1(page, 'P4_SIGNATURE', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name);
//             await this.fillInputByName1(page, 'P4_FILER_NAME', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name);
//             await this.fillInputByName1(page, 'P4_FILER_ADDR1', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1);
//             await this.fillInputByName1(page, 'P4_FILER_ADDR2', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1);

//             await this.fillInputByName1(page, 'P4_FILER_CITY', jsonData.data.Payload.Organizer_Information.Org_Address.Org_City);
//             await this.fillInputByName1(page, 'P4_FILER_POSTAL_CODE', jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code.toString());
           
//            // Click the submit button
// await page.evaluate(() => {
//   const submitButton = document.querySelector('button.t-Button--hot');
//   if (submitButton) {
//       submitButton.click();
//   }
// });

// // Set headers to disable caching
// await page.setExtraHTTPHeaders({
//   'Cache-Control': 'no-cache, no-store, must-revalidate',
//   'Pragma': 'no-cache',
//   'Expires': '0'
// });

// // Wait for the page with the class name .app-EFILING to be visible
// for(let i=0;i<5;i++){
// try {
//   await page.waitForSelector('.app-EFILING', { visible: true, timeout: 10000 });
//   console.log('Page with class .app-EFILING is visible.');

//   // Perform a hard reload after the element is detected
  
//   await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
//   console.log('Page reloaded successfully.');
  

// } catch (error) {
//   console.error('Error waiting for .app-EFILING or during reload:', error.message);
//   // Optionally, you can also try reloading the page here if the selector isn't found
//   await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
//   console.log('Forced reload after error.');

// await this.randomSleep(1000000,2000000); 

// }
// }



           
//             return 'filled form successfully'
//         } catch (error) {
//             // Log full error stack for debugging
//             logger.error('Error in New York LLC form handler:', error.stack);
//             throw new Error(`New York LLC form submission failed: ${error.message}`);
//         }
//     }
// }

// module.exports = NewYorkForLLC;
const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class NewYorkForLLC extends BaseFormHandler {
    constructor() {
        super();
    }

    async retryAction(action, retries = 3, delay = 1000) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                return await action();
            } catch (error) {
                logger.error(`Attempt ${attempt} failed: ${error.message}`);
                if (attempt < retries) {
                    logger.info(`Retrying in ${delay} ms...`);
                    await this.randomSleep(delay);
                } else {
                    throw new Error(`All ${retries} attempts failed: ${error.message}`);
                }
            }
        }
    }

    async NewYorkForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            await page.setCacheEnabled(false);

            const url = jsonData.data.State.stateUrl;
            await this.retryAction(() => this.navigateToPage(page, url));

            const inputFields = [
                { label: 'Username', value: jsonData.data.State.filingWebsiteUsername },
                { label: 'Password', value: jsonData.data.State.filingWebsitePassword }
            ];
            await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
            console.log('Page reloaded successfully.');
            await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
          

            await this.retryAction(() => this.addInput1(page, inputFields));
            logger.info('Login form filled out successfully for New York LLC.');
            await this.retryAction(() => this.submitForm(page));

            await page.setCacheEnabled(false);
            await this.retryAction(() => this.clickLinkByLabel(page, 'Domestic Business Corporation (For Profit) and Domestic Limited Liability Company'));
            await page.setCacheEnabled(false);
            await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
            console.log('Page reloaded successfully.');
            await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
            console.log('Page reloaded successfully.');
            await this.retryAction(() => this.clickLinkByLabel(page, 'Articles of Organization for a Domestic Limited Liability Company (not for professional service limited liability companies)'));
            await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
            console.log('Page reloaded successfully.');
          
            const LLCfieldinput = [
                { label: 'P2_ENTITY_NAME', value: jsonData.data.Payload.Name.CD_LLC_Name },
            ];
            await this.retryAction(() => this.addInput1(page, LLCfieldinput));
            await this.randomSleep();
            await this.retryAction(() => this.submitForm(page));

            await page.waitForSelector('#P4_INITIAL_STATEMENT_0', { visible: true });
            await page.click('#P4_INITIAL_STATEMENT_0');

            // Article Fields
            await this.retryAction(() => this.fillInputByName1(page, 'P4_ENTITY_NAME', jsonData.data.Payload.Name.CD_LLC_Name));
            await this.retryAction(() => this.clickDropdown(page, "#P4_COUNTY", jsonData.data.County.countyName.toUpperCase()));

            // Principle Address Fields
            await this.retryAction(() => this.fillInputByName1(page, 'P4_SOP_NAME', jsonData.data.Payload.Name.CD_LLC_Name));
            await this.retryAction(() => this.fillInputByName1(page, 'P4_SOP_ADDR1', jsonData.data.Payload.Principle_Address.PA_Address_Line1));
            await this.retryAction(() => this.fillInputByName1(page, 'P4_SOP_CITY', jsonData.data.Payload.Principle_Address.PA_City));
            await this.retryAction(() => this.fillInputByName1(page, 'P4_SOP_POSTAL_CODE', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code.toString())));

            // Registered Agent Fields
            if (jsonData.data.Payload.Registered_Agent) {
                await page.evaluate(() => {
                    const check = document.querySelector('#P4_RA_OPTION_0');
                    check.click();
                });
                await this.retryAction(() => this.fillInputByName1(page, 'P4_RA_NAME', jsonData.data.Payload.Registered_Agent.RA_Name));
                await this.retryAction(() => this.fillInputByName1(page, 'P4_RA_ADDR1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1));
                await this.retryAction(() => this.fillInputByName1(page, 'P4_RA_CITY', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City));
                await this.retryAction(() => this.fillInputByName1(page, 'P4_RA_POSTAL_CODE', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code.toString()));
            }

            await page.evaluate(() => {
                const effectiveDate = document.querySelector('input#P4_EXISTENCE_OPTION_0');
                const Dissolution_Date = document.querySelector('input#P4_DISSOLUTION_OPTION_0');
                Dissolution_Date.scrollIntoView();
                const liability_statement = document.querySelector('input#P4_LIAB_STATEMENT_0');
                liability_statement.scrollIntoView();

                if (effectiveDate) {
                    effectiveDate.click();
                    const radio1 = document.querySelector("input#P4_EXISTENCE_TYPE_0");
                    const radio2 = document.querySelector("input#P4_EXISTENCE_TYPE_1");

                    if (radio1 && radio1.checked) {
                        radio1.checked = true;
                    } else if (radio2 && radio2.checked) {
                        const effectiveDateInput = document.querySelector('input[name="P4_EXIST_CALENDAR"]');
                        if (effectiveDateInput) {
                            effectiveDateInput.value = data.effectiveDate;
                            effectiveDateInput.dispatchEvent(new Event('change', { bubbles: true }));

                            const dateComponent = document.querySelector('#P4_EXIST_CALENDAR');
                            if (dateComponent) {
                                const event = new Event('ojInputDateValueChanged', { bubbles: true });
                                dateComponent.dispatchEvent(event);
                            }
                        }
                    }
                }

                if (Dissolution_Date) {
                    Dissolution_Date.click();
                    const radio1 = document.querySelector("input#P4_DISSOLUTION_TYPE_0");
                    const radio2 = document.querySelector("input#P4_DISSOLUTION_TYPE_1");

                    if (radio1 && radio1.checked) {
                        radio1.checked = true;
                    } else if (radio2 && radio2.checked) {
                        const effectiveDateInput = document.querySelector('input[name="P4_DIS_CALENDAR"]');
                        if (effectiveDateInput) {
                            effectiveDateInput.value = data.effectiveDate;
                            effectiveDateInput.dispatchEvent(new Event('change', { bubbles: true }));

                            const dateComponent = document.querySelector('#P4_DIS_CALENDAR');
                            if (dateComponent) {
                                const event = new Event('ojInputDateValueChanged', { bubbles: true });
                                dateComponent.dispatchEvent(event);
                            }
                        }
                    }
                }

                if (liability_statement) {
                    liability_statement.click();
                }
            });

            // Organizer Fields
            await this.retryAction(() => this.fillInputByName1(page, 'P4_ORGANIZER_NAME', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name));
            await this.retryAction(() => this.fillInputByName1(page, 'P4_SIGNATURE', jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name));
            await this.retryAction(() => this.fillInputByName1(page, 'P4_FILER_NAME', "vstate Filings"));
            await this.retryAction(() => this.fillInputByName1(page, 'P4_FILER_ADDR1', "301 Mill Road"));
            await this.retryAction(() => this.fillInputByName1(page, 'P4_FILER_ADDR2', "Suite U5"));
            await this.retryAction(() => this.fillInputByName1(page, 'P4_FILER_CITY', "Hewlett"));
            await this.retryAction(() => this.fillInputByName1(page, 'P4_FILER_POSTAL_CODE',"11557"));

            // Click the submit button
            await page.evaluate(() => {
                const submitButton = document.querySelector('button.t-Button--hot');
                if (submitButton) {
                    submitButton.click();
                }
            });

            // Set headers to disable caching
            await page.setExtraHTTPHeaders({
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });

            // Wait for the page with the class name .app-EFILING to be visible
            for (let i = 0; i < 5; i++) {
                try {
                    await page.waitForSelector('.app-EFILING', { visible: true, timeout: 10000 });
                    console.log('Page with class .app-EFILING is visible.');

                    // Perform a hard reload after the element is detected
                    await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
                    console.log('Page reloaded successfully.');

                    break; // Exit loop if successful

                } catch (error) {
                    console.error('Error waiting for .app-EFILING or during reload:', error.message);
                    // Optionally, you can also try reloading the page here if the selector isn't found
                    await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
                    console.log('Forced reload after error.');
                    await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });

                    await this.randomSleep(1000, 2000);


                }
            }
            await this.randomSleep(1000000, 2000000);

            return 'filled form New York LLC';
        } catch (error) {
            logger.error(`New York LLC form submission failed: ${error.message}`);
            throw error;
        }
    }
}

module.exports = NewYorkForLLC;




