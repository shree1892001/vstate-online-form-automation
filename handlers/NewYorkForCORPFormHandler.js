// const BaseFormHandler = require('./BaseFormHandler');
// const logger = require('../utils/logger');

// class NewYorkForCORP extends BaseFormHandler {
//     constructor() {
//         super();
//     }

//     async  NewYorkForCORP(page, jsonData) {
//         try {
//             logger.info('Navigating to New York form submission page...');
//             await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36');
//             const url = jsonData.data.State.stateUrl
//             await page.setCacheEnabled(false);
//             await page.setExtraHTTPHeaders({
//               'Cache-Control': 'no-cache, no-store, must-revalidate',
//               'Pragma': 'no-cache',
//               'Expires': '0'
//           });

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

//             await this.clickLinkByLabel(page,'Certificate of Incorporation for a Domestic Business Corporation (not for professional service corporations)');
//             const LLCfieldinput = [
//                 { label: 'P2_ENTITY_NAME', value: jsonData.data.Payload.Name.CD_CORP_Name },
//             ];
//             await this.addInput1(page, LLCfieldinput);
//             await this.randomSleep()
//             await this.submitForm(page);
//             await page.waitForSelector('#P3_INITIAL_STATEMENT_0', { visible: true });
//             await page.click('#P3_INITIAL_STATEMENT_0');
//             const fullName = jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name;
//             const [firstName, lastName] = fullName.split(' ');
//             // Article Fields
//             await this.fillInputByName1(page, 'P3_ENTITY_NAME', jsonData.data.Payload.Name.CD_CORP_Name);
//             await page.waitForSelector('#P3_COUNTY');

//             // Click the dropdown to open it
//             await page.click('#P3_COUNTY');

//             // Select the option with visible text "ALBANY"
//             const optionVisible = await page.evaluate(() => {
//                 const select = document.querySelector('#P3_COUNTY');
//                 const options = Array.from(select.options);
//                 const option = options.find(opt => opt.text === "ALBANY");
//                 if (option) {
//                 option.selected = true;  // Select the option
//                 select.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change event
//                 return true; // Indicate that selection succeeded
//                 }
//                 return false; // Indicate failure
//             });
//             // await page.select('#P3_COUNTY', '1');
//             await this.clickDropdown(page,"#P3_COUNTY",jsonData.data.Payload.County.CD_County.toUpperCase())


//             // Registered Agent Fields  
//             if (jsonData.data.Payload.Registered_Agent) {

//          await page.evaluate(() => {                  
//                     const check = document.querySelector('#P3_RA_OPTION_0');
//                 check.click()
//                 });
//             await this.fillInputByName1(page, 'P3_RA_NAME', jsonData.data.Payload.Registered_Agent.RA_Name);
//             await this.fillInputByName1(page, 'P3_RA_ADDR1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);
//             await this.fillInputByName1(page, 'P3_RA_CITY', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);
//             await this.fillInputByName1(page, 'P3_RA_POSTAL_CODE', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));
//             }

 

//             await page.evaluate((jsonData) => {
//                 const stockInfo = jsonData.data.Payload.Stock_Information;
//                 console.log("Stock information is:", stockInfo);
            
//                 const shareValue = jsonData.data.Payload.Filer_Information.Stock_Information.Shares_Par_Value;
//                 const stockType = shareValue !== undefined && shareValue !== null ? 'PV' : 'NPV';
            
//                 const numSharesInput = document.querySelector('input[name="P3_NUM_SHARES"]');
//                 if (numSharesInput) {
//                     numSharesInput.value = jsonData.data.Payload.Filer_Information.Stock_Information.SI_No_Of_Shares;
//                     numSharesInput.dispatchEvent(new Event('input', { bubbles: true }));
//                 }
            
//                 const stockTypeSelect = document.querySelector('#P3_STOCK_TYPE');
//                 if (stockTypeSelect) {
//                     stockTypeSelect.value = stockType;
//                     stockTypeSelect.dispatchEvent(new Event('change', { bubbles: true }));
//                 }
            
//                 if (stockType === 'PV') {
//                     const shareValueInput = document.querySelector('#P3_SHARE_VALUE');
//                     if (shareValueInput) {
//                         shareValueInput.value = shareValue.toString();
//                         shareValueInput.dispatchEvent(new Event('input', { bubbles: true }));
//                     }
//                 }
//             }, jsonData);
            
//             // Principal Address Fields
//             await this.fillInputByName1(page, 'P3_SOP_NAME', jsonData.data.Payload.Name.CD_CORP_Name);
//             await this.fillInputByName1(page, 'P3_SOP_ADDR1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
//             await this.fillInputByName1(page, 'P3_SOP_CITY', jsonData.data.Payload.Principle_Address.PA_City);
//             await this.fillInputByName1(page, 'P3_SOP_POSTAL_CODE', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
             
//             await page.evaluate(() => {            const effectiveDate = document.querySelector('input#P3_EXISTENCE_OPTION_0');
//         const Dissolution_Date = document.querySelector('input#P3_DISSOLUTION_OPTION_0');
//         const liability_statement = document.querySelector('input#P3_LIAB_STATEMENT_0');

//         // if (data.Payload.effectiveDate) {
//         if (effectiveDate) {
//           effectiveDate.click();
//           const radio1 = document.querySelector("input#P3_EXISTENCE_TYPE_0");
//           const radio2 = document.querySelector("input#P3_EXISTENCE_TYPE_1");

//           if (radio1 && radio1.checked) {
//             radio1.checked = true;
//           } else if (radio2 && radio2.checked) {
//             const effectiveDateInput = document.querySelector('input[name="P3_EXIST_CALENDAR"]');
//             if (effectiveDateInput) {
//               effectiveDateInput.value = data.effectiveDate;


//               effectiveDateInput.dispatchEvent(new Event('change', { bubbles: true }));

//               const dateComponent = document.querySelector('#P3_EXIST_CALENDAR');
//               if (dateComponent) {
//                 const event = new Event('ojInputDateValueChanged', { bubbles: true });
//                 dateComponent.dispatchEvent(event);
//               }
//             }
//           }
//         }

//         if (Dissolution_Date) {
//           Dissolution_Date.click();
//           const radio1 = document.querySelector("input#P3_DISSOLUTION_TYPE_0");
//           const radio2 = document.querySelector("input#P3_DISSOLUTION_TYPE_1");

//           if (radio1 && radio1.checked) {
//             radio1.checked = true;
//           } else if (radio2 && radio2.checked) {
//             const effectiveDateInput = document.querySelector('input[name="P3_DIS_CALENDAR"]');
//             if (effectiveDateInput) {
//               effectiveDateInput.value = data.effectiveDate;

//               effectiveDateInput.dispatchEvent(new Event('change', { bubbles: true }));

//               const dateComponent = document.querySelector('#P3_DIS_CALENDAR');
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
//             await this.fillInputByName1(page, 'P3_INCORP_FNAME', firstName);
//             await this.fillInputByName1(page, 'P3_INCORP_LNAME', lastName);
//             await this.fillInputByName1(page, 'P3_INCORP_ADDR1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
//             await this.fillInputByName1(page, 'P3_INCORP_CITY', jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
//             await this.fillInputByName1(page, 'P3_INCORP_POSTAL_CODE', String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));
//             await this.fillInputByName1(page, 'P3_SIGNATURE', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
//             await this.fillInputByName1(page, 'P3_FILER_NAME', jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name);
//             await this.fillInputByName1(page, 'P3_FILER_ADDR1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1);
//             await this.fillInputByName1(page, 'P3_FILER_CITY', jsonData.data.Payload.Incorporator_Information.Address.Inc_City);
//             await this.fillInputByName1(page, 'P3_FILER_POSTAL_CODE', String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code));

//             await page.evaluate(() => {
//                 return new Promise((resolve) => {
//                     apex.submit({ request: 'CONTINUE', validate: true });
//                     resolve();  // Resolve once submit is initiated
//                 });
//             });
            
            
//             // await page.evaluate(() => {
//             //     apex.submit({ request: 'CONTINUE', validate: true });
//             // });

//             await page.evaluate(() => {
//               const submitButton = document.querySelector('button.t-Button--hot');
//               if (submitButton) {
//                   submitButton.click();
//               }
//             });
            
//             // Set headers to disable caching
//             await page.setExtraHTTPHeaders({
//               'Cache-Control': 'no-cache, no-store, must-revalidate',
//               'Pragma': 'no-cache',
//               'Expires': '0'
//             });
            
//             // Wait for the page with the class name .app-EFILING to be visible
//             for (let i = 0; i < 5; i++) {
//               try {
//                   await page.waitForSelector('.app-EFILING', { visible: true, timeout: 10000 });
//                   console.log('Page with class .app-EFILING is visible.');

//                   // Perform a hard reload after the element is detected
//                   await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
//                   console.log('Page reloaded successfully.');

//                   break; // Exit loop if successful

//               } catch (error) {
//                   console.error('Error waiting for .app-EFILING or during reload:', error.message);
//                   // Optionally, you can also try reloading the page here if the selector isn't found
//                   await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
//                   console.log('Forced reload after error.');
//                   await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });

//                   await this.randomSleep(1000, 2000);


//               }
//           }
//           await this.randomSleep(1000000, 2000000);          
//         } catch (error) {
//             // Log full error stack for debugging
//             logger.error('Error in New York LLC form handler:', error.stack);
//             throw new Error(`New York LLC form submission failed: ${error.message}`);
//         }
//     }
// }
// module.exports = NewYorkForCORP;




const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class NewYorkForCORP extends BaseFormHandler {
    constructor() {
        super();
    }

    async retryAction(action, retries = 3, delay = 1000) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                await action();
                return; // If action succeeds, exit the retry loop
            } catch (error) {
                logger.warn(`Attempt ${attempt} failed: ${error.message}`);
                if (attempt < retries) {
                    await this.randomSleep(delay); // Wait before the next attempt
                } else {
                    throw new Error(`Action failed after ${retries} attempts: ${error.message}`);
                }
            }
        }
    }

    async NewYorkForCORP(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36');
            const url = jsonData.data.State.stateUrl;
            await page.setCacheEnabled(false);
            await page.setExtraHTTPHeaders({
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });

            await this.retryAction(() => this.navigateToPage(page, url));

            const inputFields = [
                { label: 'Username', value: jsonData.data.State.filingWebsiteUsername },
                { label: 'Password', value: jsonData.data.State.filingWebsitePassword }
            ];

            await this.retryAction(() => this.addInput1(page, inputFields));
            logger.info('Login form filled out successfully for New York CORP.');
            await this.retryAction(() => this.submitForm(page));

            await this.retryAction(() => this.clickLinkByLabel(page, 'Domestic Business Corporation (For Profit) and Domestic Limited Liability Company'));
            await this.retryAction(() => this.clickLinkByLabel(page, 'Certificate of Incorporation for a Domestic Business Corporation (not for professional service corporations)'));

            const LLCfieldinput = [
                { label: 'P2_ENTITY_NAME', value: jsonData.data.Payload.Name.CD_CORP_Name },
            ];
            await this.retryAction(() => this.addInput1(page, LLCfieldinput));
            await this.randomSleep();

            await this.retryAction(() => this.submitForm(page));
            // await page.waitForSelector('#P3_INITIAL_STATEMENT_0', { visible: true });
            // await page.click('#P3_INITIAL_STATEMENT_0');

            const fullName = jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name;
            const [firstName, lastName] = fullName.split(' ');

            // Article Fields
            await this.retryAction(() => this.fillInputByName1(page, 'P3_ENTITY_NAME', jsonData.data.Payload.Name.CD_CORP_Name));
            await page.waitForSelector('#P3_COUNTY');

            // Click the dropdown to open it
            await this.retryAction(() => page.click('#P3_COUNTY'));
            await this.clickDropdown(page, "#P3_COUNTY", jsonData.data.Payload.County.CD_County.toUpperCase());

            // Registered Agent Fields  
            if (jsonData.data.Payload.Registered_Agent) {
                await page.evaluate(() => {
                    const check = document.querySelector('#P3_RA_OPTION_0');
                    check.click();
                });
                await this.retryAction(() => this.fillInputByName1(page, 'P3_RA_NAME', jsonData.data.Payload.Registered_Agent.RA_Name));
                await this.retryAction(() => this.fillInputByName1(page, 'P3_RA_ADDR1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1));
                await this.retryAction(() => this.fillInputByName1(page, 'P3_RA_CITY', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City));
                await this.retryAction(() => this.fillInputByName1(page, 'P3_RA_POSTAL_CODE', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code)));
            }

            await page.evaluate((jsonData) => {
                const stockInfo = jsonData.data.Payload.Stock_Information;
                console.log("Stock information is:", stockInfo);

                const shareValue = jsonData.data.Payload.Stock_Information.SI_Share_Par_Value;
                const stockType = shareValue !== undefined && shareValue !== null ? 'PV' : 'NPV';

                const numSharesInput = document.querySelector('input[name="P3_NUM_SHARES"]');
                if (numSharesInput) {
                    numSharesInput.value = jsonData.data.Payload.Filer_Information.Stock_Information.SI_No_Of_Shares;
                    numSharesInput.dispatchEvent(new Event('input', { bubbles: true }));
                }

                const stockTypeSelect = document.querySelector('#P3_STOCK_TYPE');
                if (stockTypeSelect) {
                    stockTypeSelect.value = stockType;
                    stockTypeSelect.dispatchEvent(new Event('change', { bubbles: true }));
                }

                if (stockType === 'PV') {
                    const shareValueInput = document.querySelector('#P3_SHARE_VALUE');
                    if (shareValueInput) {
                        shareValueInput.value = shareValue.toString();
                        shareValueInput.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                }
            }, jsonData);

            // Principal Address Fields
            await this.retryAction(() => this.fillInputByName1(page, 'P3_SOP_NAME', jsonData.data.Payload.Name.CD_CORP_Name));
            await this.retryAction(() => this.fillInputByName1(page, 'P3_SOP_ADDR1', jsonData.data.Payload.Principle_Address.PA_Address_Line1));
            await this.retryAction(() => this.fillInputByName1(page, 'P3_SOP_CITY', jsonData.data.Payload.Principle_Address.PA_City));
            await this.retryAction(() => this.fillInputByName1(page, 'P3_SOP_POSTAL_CODE', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code)));

            await page.evaluate(() => {
                const effectiveDate = document.querySelector('input#P3_EXISTENCE_OPTION_0');
                const dissolutionDate = document.querySelector('input#P3_DISSOLUTION_OPTION_0');
                const liabilityStatement = document.querySelector('input#P3_LIAB_STATEMENT_0');

                if (effectiveDate) {
                    effectiveDate.click();
                    const radio1 = document.querySelector("input#P3_EXISTENCE_TYPE_0");
                    const radio2 = document.querySelector("input#P3_EXISTENCE_TYPE_1");

                    if (radio1 && radio1.checked) {
                        radio1.checked = true;
                    } else if (radio2 && radio2.checked) {
                        const effectiveDateInput = document.querySelector('input[name="P3_EXIST_CALENDAR"]');
                        if (effectiveDateInput) {
                            effectiveDateInput.value = data.effectiveDate;

                            effectiveDateInput.dispatchEvent(new Event('change', { bubbles: true }));

                            const dateComponent = document.querySelector('#P3_EXIST_CALENDAR');
                            if (dateComponent) {
                                const event = new Event('ojInputDateValueChanged', { bubbles: true });
                                dateComponent.dispatchEvent(event);
                            }
                        }
                    }
                }

                if (dissolutionDate) {
                    dissolutionDate.click();
                    const radio1 = document.querySelector("input#P3_DISSOLUTION_TYPE_0");
                    const radio2 = document.querySelector("input#P3_DISSOLUTION_TYPE_1");

                    if (radio1 && radio1.checked) {
                        radio1.checked = true;
                    } else if (radio2 && radio2.checked) {
                        const effectiveDateInput = document.querySelector('input[name="P3_DIS_CALENDAR"]');
                        if (effectiveDateInput) {
                            effectiveDateInput.value = data.effectiveDate;

                            effectiveDateInput.dispatchEvent(new Event('change', { bubbles: true }));

                            const dateComponent = document.querySelector('#P3_DIS_CALENDAR');
                            if (dateComponent) {
                                const event = new Event('ojInputDateValueChanged', { bubbles: true });
                                dateComponent.dispatchEvent(event);
                            }
                        }
                    }
                }

                if (liabilityStatement) {
                    liabilityStatement.click();
                }
            });

            // Organizer Fields
            await this.retryAction(() => this.fillInputByName1(page, 'P3_INCORP_FNAME', firstName));
            await this.retryAction(() => this.fillInputByName1(page, 'P3_INCORP_LNAME', lastName));
            await this.retryAction(() => this.fillInputByName1(page, 'P3_INCORP_ADDR1', jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1));
            await this.retryAction(() => this.fillInputByName1(page, 'P3_INCORP_CITY', jsonData.data.Payload.Incorporator_Information.Address.Inc_City));
            await this.retryAction(() => this.fillInputByName1(page, 'P3_INCORP_POSTAL_CODE', String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code)));
            await this.retryAction(() => this.fillInputByName1(page, 'P3_INCORP_COUNTRY', jsonData.data.Payload.Incorporator_Information.Address.Inc_Country));

            await this.retryAction(() => this.submitForm(page));

            logger.info('New York CORP form submitted successfully.');
        } catch (error) {
            logger.error(`Error during New York CORP submission: ${error.message}`);
            throw error; // Rethrow the error after logging it
        }
    }
}

module.exports = NewYorkForCORP;
