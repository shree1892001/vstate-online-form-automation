const puppeteer = require('puppeteer');
const logger = require('../utils/logger');  // Import logger

class BaseFormHandler {
    constructor() {
        if (new.target === BaseFormHandler) {
            throw new Error('Cannot instantiate BaseFormHandler directly');
        }
    }

    async navigateToPage(page, url) {
        try {
            // Retry navigation to the provided URL up to 3 times
            const response = await this.retry(async () => {
                return await page.goto(url, {
                    waitUntil: 'networkidle0' // Wait until there are no more than 0 network connections for 500ms
                    // timeout: 60000 // Timeout after 60 seconds
                });
            }, 3); // Retry 3 times before throwing an error
    
            // Check if the page loaded successfully, otherwise refresh
            if (!response || response.status() !== 200) {
                logger.warn('Page not reached, refreshing...');
            } else {
                logger.info('Page loaded successfully.');
            }
        } catch (error) {
            logger.error(`Failed to navigate to page: ${error.message}`);
            throw error;
        }
    }

    
    async randomSleep(min = 1000, max = 10000) {
        const sleepTime = Math.floor(Math.random() * (max - min + 1)) + min;
        await new Promise(resolve => setTimeout(resolve, sleepTime));
    }
    
    
    async getInputSelectorByLabel(page, labelText) {
        try {
            // Find and log all existing labels on the page
            const existingLabels = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('label')).map(label => label.textContent.trim());
            });
    
            console.log("Existing labels on the page:", existingLabels);
    
            // Attempt to find the label element first
            const inputId = await page.evaluate((labelText) => {
                const label = Array.from(document.querySelectorAll('label')).find(
                    el => el.textContent.trim().toLowerCase() === labelText.toLowerCase() // Case insensitive match
                );
    
                // If found, return the 'for' attribute or find the input by traversing the DOM
                if (label) {
                    const forAttribute = label.getAttribute('for');
                    if (forAttribute) {
                        return forAttribute; // Return if 'for' attribute exists
                    }
                    // If no 'for' attribute, look for the input element next to this label
                    const inputElement = label.closest('form').querySelector(`input[name="${labelText}"], input[id="${labelText}"]`);
                    return inputElement ? inputElement.id : null;
                }
    
                return null;
            }, labelText);
    
            // If a valid ID is found, return the selector
            if (inputId) {
                console.log(`Found input ID "${inputId}" for label "${labelText}"`);
                return `#${inputId}`;
            } else {
                // Fallback: Directly return the ID if it's structured correctly
                const directInputId = labelText; // Assuming labelText matches input id
                console.error(`No valid input found for label "${labelText}". Trying direct ID...`);
                return `#${directInputId}`;
            }
        } catch (error) {
            console.error("Error finding input selector by label:", error);
        }
    
        return null; // Return null if no matching input found
    }
    
    // Function to fill inputs dynamically
    async  addInput(page, inputFields) {
        try {
            logger.info("Attempting dynamic input...");
    
            // Find and print all existing input fields on the page
            const inputElements = await page.$$eval('input', inputs =>
                inputs.map(input => ({
                    name: input.name || '',
                    id: input.id || '',
                    class: input.className || '',
                    label: input.labels ? (input.labels[0] ? input.labels[0].innerText : '') : ''
                }))
            );
    
            logger.info("Existing input fields on the page:", inputElements);
    
            // Iterate over inputFields and try to fill them
            for (let field of inputFields) {
                const { value, label } = field;
    
                if (label) {
                    // Handle input based on label
                    const inputSelector = await this.getInputSelectorByLabel(page, label);
    
                    if (inputSelector) {
                        logger.info(`Found input for label "${label}", filling value...`);
                        await page.waitForSelector(inputSelector, { visible: true});
                        await page.type(inputSelector, value, { delay: 100 });
                    } else {
                        logger.error(`Could not find input field for label "${label}"`);
                        throw new Error(`Label "${label}" not found`);
                    }
                } else {
                    // Handle input fields using direct selectors
                    logger.info(`Filling input field for selector "${field.selector}"...`);
                    await page.waitForSelector(field.selector, { visible: true});
                    await page.type(field.selector, value, { delay: 100 });
                }
            }
        } catch (error) {
            logger.error("Failed to fill input field:", error.message);
            throw error; // Re-throw error after logging
        }
    }
    async addInput1(page, inputFields) {
        try {
            logger.info("Attempting dynamic input...");
    
            // Find and print all existing input fields on the page
            const inputElements = await page.$$eval('input', inputs =>
                inputs.map(input => ({
                    name: input.name || '',
                    id: input.id || '',
                    class: input.className || '',
                    label: input.labels ? (input.labels[0] ? input.labels[0].innerText : '') : ''
                }))
            );
    
            logger.info("Existing input fields on the page:", inputElements);
    
            // Iterate over inputFields and set values directly
            for (let field of inputFields) {
                const { value, label } = field;
    
                if (label) {
                    // Handle input based on label
                    const inputSelector = await this.getInputSelectorByLabel(page, label);
    
                    if (inputSelector) {
                        logger.info(`Found input for label "${label}", setting value...`);
                        await page.waitForSelector(inputSelector, { visible: true });
    
                        // Set the value directly without typing
                        await page.evaluate((selector, value) => {
                            document.querySelector(selector).value = value;
                        }, inputSelector, value);
    
                        // Trigger 'input' and 'change' events to ensure any attached listeners react to the new value
                        await page.evaluate((selector) => {
                            const element = document.querySelector(selector);
                            element.dispatchEvent(new Event('input', { bubbles: true }));
                            element.dispatchEvent(new Event('change', { bubbles: true }));
                        }, inputSelector);
    
                    } else {
                        logger.error(`Could not find input field for label "${label}"`);
                        throw new Error(`Label "${label}" not found`);
                    }
                } else {
                    // Handle input fields using direct selectors
                    logger.info(`Setting value for input field with selector "${field.selector}"...`);
                    await page.waitForSelector(field.selector, { visible: true });
    
                    // Set the value directly without typing
                    await page.evaluate((selector, value) => {
                        document.querySelector(selector).value = value;
                    }, field.selector, value);
    
                    // Trigger 'input' and 'change' events
                    await page.evaluate((selector) => {
                        const element = document.querySelector(selector);
                        element.dispatchEvent(new Event('input', { bubbles: true }));
                        element.dispatchEvent(new Event('change', { bubbles: true }));
                    }, field.selector);
                }
            }
        } catch (error) {
            logger.error("Failed to fill input field:", error.message);
            throw error; // Re-throw error after logging
        }
    }
    
    // async fillInputByName(page, inputName, value) {
    //     try {
    //         // Wait for the input field to be visible
    //         await page.waitForSelector(`input[name="${inputName}"]`, { visible: true });
    
    //         // Click to focus on the input field
    //         await page.click(`input[name="${inputName}"]`);
    
    //         // Set value directly using page.evaluate
    //         await page.evaluate((inputName, value) => {
    //             document.querySelector(`input[name="${inputName}"]`).value = value;
    //         }, inputName, value);
    
    //         console.log(`Filled input field "${inputName}" with value: "${value}"`);
    
    //         // Verify the value
    //         const actualValue = await page.$eval(`input[name="${inputName}"]`, input => input.value);
    //         if (actualValue !== value) {
    //             throw new Error(`Value mismatch: expected "${value}", but found "${actualValue}"`);
    //         }
    
    //         console.log(`Verified input field "${inputName}" contains the correct value: "${actualValue}"`);
    //     } catch (error) {
    //         console.error(`Failed to fill input field "${inputName}":`, error.message);
    //         throw error; // Re-throw error after logging
    //     }
    // }
    // async fillInputByName(page, inputName, value) {
    //     try {
    //         // Wait for the input field to be visible
    //         await page.waitForSelector(`input[name="${inputName}"]`, { visible: true });
    
    //         // Click to focus on the input field
    //         await page.click(`input[name="${inputName}"]`);
    
    //         // Type each character one by one with a delay
    //         for (const char of value) {
    //             await page.keyboard.press(char);
    //         }
    
    //         console.log(`Filled input field "${inputName}" with value: "${value}"`);
    //     } catch (error) {
    //         console.error(`Failed to fill input field "${inputName}":`, error.message);
    //         throw error; // Re-throw error after logging
    //     }
    // }
    async fillInputByName(page, inputName, value) {
        try {
            // Wait for the input field to be visible
            await page.waitForSelector(`input[name="${inputName}"]`, { visible: true });
    
            // Click to focus on the input field
            await page.click(`input[name="${inputName}"]`);
    
            // Type each character one by one with a delay
            for (const char of value) {
                await page.keyboard.press(char);
            }
    
            console.log(`Filled input field "${inputName}" with value: "${value}"`);
        } catch (error) {
            console.error(`Failed to fill input field "${inputName}":`, error.message);
            throw error; // Re-throw error after logging
        }
    }
    
    async fillInputByName1(page, inputName, value) {
        try {
            // Wait for the input field to be visible, even if it's disabled
            await page.waitForSelector(`input[name="${inputName}"]`, { visible: true });
    
            // Temporarily enable the input field if it's disabled
            await page.evaluate((inputName) => {
                const inputField = document.querySelector(`input[name="${inputName}"]`);
                if (inputField.disabled) {
                    inputField.disabled = false;
                }
            }, inputName);
    
            // Click to focus on the input field, wait 1 second, and click again
          
    
            // Clear the input field in case it has previous values
            await page.evaluate(inputName => {
                document.querySelector(`input[name="${inputName}"]`).value = '';
            }, inputName);
    
            // Directly set the input value
            await page.evaluate((inputName, value) => {
                document.querySelector(`input[name="${inputName}"]`).value = value;
            }, inputName, value);
    
            // Validate if the value has been correctly filled
            let actualValue = await page.$eval(`input[name="${inputName}"]`, input => input.value);
    
            if (actualValue.trim().toLowerCase() !== value.trim().toLowerCase()) {
                console.log(`Value mismatch detected for input "${inputName}". Retrying...`);
    
                // Clear the input field before retrying
                await page.evaluate(inputName => {
                    document.querySelector(`input[name="${inputName}"]`).value = '';
                }, inputName);
    
                // Refill the input field after retry
                await page.click(`input[name="${inputName}"]`);
                await this.waitForTimeout(1000);  // Wait for 1 second
                await page.click(`input[name="${inputName}"]`);
                await page.evaluate((inputName, value) => {
                    document.querySelector(`input[name="${inputName}"]`).value = value;
                }, inputName, value);
    
                // Re-validate the value
                actualValue = await page.$eval(`input[name="${inputName}"]`, input => input.value);
                if (actualValue.trim().toLowerCase() !== value.trim().toLowerCase()) {
                    throw new Error(`Failed to correctly fill input "${inputName}" even after retry.`);
                } else {
                    console.log(`Successfully filled input "${inputName}" after retry.`);
                }
            } else {
                console.log(`Input "${inputName}" was correctly filled with value: "${value}"`);
            }
    
            // Optionally disable the field again after filling it
          
        } catch (error) {
            console.error(`Failed to fill input field "${inputName}":`, error.message);
            throw error; // Re-throw error after logging
        }
    }
    
    
    
    async fillInputbyid(page, inputData) {
        try {
            // Loop through each input data object
            for (let field of inputData) {
                const { selector, value } = field;
                await page.waitForSelector(selector, { visible: true});
                await page.click(selector);    
                await page.type(selector, value, { delay: 100 });
                console.log(`Filled input field "${selector}" with value: "${value}"`);                
            }
        } catch (error) {
            console.error("Error filling input fields:", error);
            throw error; // Re-throw error after logging
        }
    }
    async fillInputByPlaceholder(page, placeholder, value) {
        try {
            // Wait for the input field to be visible using the placeholder attribute
            const inputSelector = `input[placeholder="${placeholder}"]`;
            await page.waitForSelector(inputSelector, { visible: true});
            
            // Type the value into the input field
            await page.type(inputSelector, value, { delay: 100 });
            console.log(`Filled input with placeholder "${placeholder}" with value: "${value}"`);
        } catch (error) {
            console.error(`Failed to fill input with placeholder "${placeholder}":`, error.message);
            throw error; // Re-throw error after logging
        }
    }
    
    async  clickLinkByLabel(page, label, maxRetries = 3) {
        let retries = 0;
    
        while (retries < maxRetries) {
            try {
                console.log(`Waiting for the list with links to appear...`);
    
                // Wait for the list of links to appear
                await page.waitForSelector('ul.t-LinksList', { visible: true, timeout: 60000 });
                
    
                console.log(`Searching for the link with label: "${label}"`);
    
                // Find the link with the matching label text
                const linkUrl = await page.evaluate((label) => {
                    const links = document.querySelectorAll('ul.t-LinksList li.t-LinksList-item a.t-LinksList-link');
                    for (let link of links) {
                        const linkLabel = link.querySelector('.t-LinksList-label');
                        if (linkLabel && linkLabel.textContent.trim() === label) {
                            return link.getAttribute('href');  // Return the href attribute of the matching link
                        }
                    }
                    return null;
                }, label);
    
                if (!linkUrl) {
                    throw new Error(`Couldn't find the link with label "${label}".`);
                }
    
                console.log(`Found link for "${label}". Navigating to: ${linkUrl}`);
    
                // Navigate to the found link's URL
                await page.goto(new URL(linkUrl, page.url()).href, { waitUntil: 'networkidle0', timeout: 60000 });
    
                console.log(`Successfully navigated to the page for "${label}".`);
    
                // Optional: small delay after navigation
                return;  // Success, exit the function
    
            } catch (error) {
                retries += 1;
                console.error(`Error on attempt ${retries} when clicking on the link with label "${label}":`, error.message);
    
                // Handle specific network errors like ERR_CONNECTION_RESET or Timeout
                if (error.message.includes('ERR_CONNECTION_RESET') || error.message.includes('Timeout')) {
                    console.error('Network error encountered. Retrying...');
    
    
                    if (retries === maxRetries) {
                        console.error(`Max retries reached. Unable to click on the link with label "${label}".`);
                        return;
                    }
                } else {
                    // If it's another type of error, rethrow it
                    throw error;
                }
            }
        }
    }
    async fillInputByIdSingle(page, selector, value) {
        try {
            await page.waitForSelector(selector, { visible: true, timeout: 30000 });
            await page.click(selector);
            await page.type(selector, value, { delay: 100 });
            console.log(`Filled input field "${selector}" with value: "${value}"`);
        } catch (error) {
            console.error("Error filling input field:", error);
            throw error;
        }
    }
    
    async clickOnLinkByText(page, linkText) {
        await page.waitForSelector('a');
        // Find and click the link with matching text
        await page.evaluate((linkText) => {
            const anchorTags = Array.from(document.querySelectorAll('a'));
            const targetLink = anchorTags.find(anchor => anchor.innerText.trim() === linkText);
            if (targetLink) {
                targetLink.click();
            } else {
                console.log(`Link with text "${linkText}" not found`);
            }
        }, linkText);
    }
    
    
    async  selectCheckboxByLabel(page, checkboxText) {
        try {
            // Wait for the checkbox input to be visible
            await page.waitForSelector('input[type="checkbox"]', { visible: true});
    
            // Get all checkbox inputs within the document
            const checkboxes = await page.$$('input[type="checkbox"]');
    
            for (const checkbox of checkboxes) {
                // Find the parent <p> element of the checkbox
                const parentP = await page.evaluateHandle(el => el.closest('p'), checkbox);
    
                // Get the text content of the <p> element
                const paragraphText = await page.evaluate(el => el.textContent.trim(), parentP);
    
                // Use case-insensitive matching
                if (paragraphText.toLowerCase().includes(checkboxText.toLowerCase())) {
                    // Scroll the checkbox into view
                    await page.evaluate(el => {
                        el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
                    }, checkbox);
    
                    // Click the checkbox directly
                    await checkbox.click();
                    console.log(`Attempted to select checkbox with text: "${paragraphText}"`);
    
                    // Check if the checkbox is selected
                    let isChecked = await page.evaluate(el => el.checked, checkbox);
    
                    // Retry clicking if not checked
                    let attempts = 0;
                    while (!isChecked && attempts < 3) {
                        await checkbox.click(); // Try clicking again
                        console.log(`Retrying click for checkbox with text: "${paragraphText}"`);
    
                        // Check again if the checkbox is selected
                        isChecked = await page.evaluate(el => el.checked, checkbox);
                        attempts++;
                    }
    
                    if (isChecked) {
                        console.log(`Successfully selected checkbox with text: "${paragraphText}"`);
                    } else {
                        console.log(`Failed to select checkbox with text: "${paragraphText}" after multiple attempts.`);
                    }
    
                    return; // Exit after processing the correct checkbox
                }
            }
    
            console.log(`Checkbox with text "${checkboxText}" not found.`);
        } catch (error) {
            console.error("Error selecting checkbox:", error);
        }
    }
    
    async  submitForm(page, buttonSelectors = ['button[type="submit"]', 'button.t-Button--hot', 'button#P101_LOGIN','t-Button t-Button--hot']) {
        try {
            // Retry form submission up to 3 times in case of failure
            await this.retry(async () => {
                await page.evaluate((buttonSelectors) => {
                    // Try to find the submit button dynamically using the provided selectors
                    let submitButton;
                    for (const selector of buttonSelectors) {
                        submitButton = document.querySelector(selector);
                        if (submitButton) {
                            // Log button details (id and class)
                            console.log(`Found submit button with selector: ${selector}`);
                            console.log(`Button ID: ${submitButton.id || 'No ID'}`);
                            console.log(`Button Class: ${submitButton.className || 'No Class'}`);
                            break;
                        }
                    }
    
                    if (typeof apex !== 'undefined' && typeof apex.submit === 'function') {
                        // Use apex.submit if available
                        apex.submit({ request: 'LOGIN', validate: true });
                        console.log('Used apex.submit for form submission');
                    } else if (submitButton) {
                        // Fallback to clicking the submit button
                        submitButton.click();
                        console.log('Clicked the submit button for form submission');
                    } else {
                        throw new Error('Submit method or button not found');
                    }
                }, buttonSelectors);
            }, 3); // Retry up to 3 times
    
            logger.info('Form submission succeeded');
    
        } catch (error) {
            logger.error('Form submission failed:', error.message);
            throw error; // Re-throw the error after logging it
        }
    }
    async clickDropdown(page, selector, optionValue) {
        try {
            // Wait for the dropdown to appear and be visible
            await page.waitForSelector(selector, { visible: true, timeout: 60000 });
    
            // Click on the dropdown to expand the options
            await page.click(selector);
    
            // Focus the dropdown and simulate typing the option value (to mimic user interaction)
            await page.focus(selector);
            await page.keyboard.type(optionValue);
    
            // Press 'Enter' to confirm the selection
            await page.keyboard.press('Enter');
    
            // Optionally log success
            logger.info(`Dropdown option "${optionValue}" selected successfully via keyboard.`);
        } catch (error) {
            logger.error(`Failed to select the dropdown option: ${error.message}`);
            throw error;
        }
    }
    async selectDropdownOptionnyplaceholder(page, dropdownSelector, optionText) {
        try {
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
            await page.waitForSelector(dropdownSelector, { visible: true, timeout: 60000 });
            await page.click(dropdownSelector);
            await page.keyboard.type(optionText);
            await page.keyboard.press('Enter');
    
            console.log(`Selected option: "${optionText}" from dropdown: "${dropdownSelector}"`);
        } catch (error) {
            console.error(`Error selecting option from dropdown: ${error.message}`);
        }
    }
    
    
    
    async clickButton(page, buttonSelector, waitForSelector = true, options = { timeout: 60000, visible: true }) {
        try {
            if (waitForSelector) {
                // Wait for the button to be visible
                await page.waitForSelector(buttonSelector, options);
            }
            
            // Click the button
            await Promise.all([
                page.click(buttonSelector),
                // page.waitForNavigation({ waitUntil: 'networkidle0' }) // Wait for navigation after clicking
            ]);
            
            console.log(`Clicked button: ${buttonSelector}`);
        } catch (error) {
            console.error(`Error clicking button ${buttonSelector}:`, error);
            throw error; // Re-throw error after logging
        }
    }
    
    async retry(fn, retries = 3, page) {
        for (let i = 0; i < retries; i++) {
            try {
                return await fn();
            } catch (error) {
                // Check if the error is network related
                const isNetwork = await this.isNetworkError(error);
                
                if (isNetwork) {
                    logger.error(`Network error occurred: ${error.message} ... Reloading the page`);
                    await page.reload({ waitUntil: 'networkidle0' });
                }
                
                // Throw the error if this was the last retry
                if (i === retries - 1) throw error;
            }
        }
    }

    // Async method to check for network-related errors
    async isNetworkError(error) {
        // This is an async function, but since the check is immediate, no need for async operations
        return error.message.includes('ECONNRESET') || 
               error.message.includes('ENOTFOUND') || 
               error.message.includes('ETIMEDOUT') || 
               error.message.includes('EHOSTUNREACH') || 
               error.message.includes('ECONNREFUSED');
    }
    

    async  waitForTimeout(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }
    
    async  refresh_Page(page) {
        const currentURL = page.url(); // Get the current page URL
        await page.goto(currentURL, { waitUntil: 'networkidle0' }); // Navigate to the same URL
        console.log('Page refreshed.');
    }
    
    async  clickOnTitle(page, titleText) {
        try {
            const titleSelector = 'span.title'; // Selector for all span elements with class 'title'

            // Wait for the elements to be visible
            await page.waitForSelector(titleSelector, { timeout: 60000, visible: true });
            
            // Get all elements matching the selector
            const titles = await page.$$(titleSelector);
    
            // Iterate through the elements to find the specific one
            for (const title of titles) {
                const text = await page.evaluate(el => el.textContent, title);
                if (text.trim() === titleText) {
                    // Click the matched element
                    await title.click();
                    console.log(`Clicked on: ${titleText}`);
                    return; // Exit after clicking
                }
            }
            console.error(`Specific title "${titleText}" not found.`);
        } catch (error) {
            console.error(`Clicking on "${titleText}" failed:`, error);
        }
    }
    async clickOnLinkByText(page,linkText){
        await page.waitForSelector('a');
            // Find and click the link with matching text
            await page.evaluate((linkText) => {
            const anchorTags = Array.from(document.querySelectorAll('a'));
            const targetLink = anchorTags.find(anchor => anchor.innerText.trim() === linkText);
            if (targetLink) {
                targetLink.click();
            } else {
                console.log(`Link with text "${linkText}" not found`);
            }
            }, linkText);
    }
    async clickSpanByText(page, text) {
        try {
            // Wait for the span elements to be visible
            await page.waitForSelector('span.submission-answer-text', { visible: true, timeout: 60000 });
    
            // Evaluate to find the specific span and click it
            await page.evaluate((text) => {
                const spans = Array.from(document.querySelectorAll('span.submission-answer-text'));
                const targetSpan = spans.find(span => span.textContent.trim() === text);
                if (targetSpan) {
                    targetSpan.click(); // Click the target span
                } else {
                    console.log(`Span with text "${text}" not found.`);
                }
            }, text);
        } catch (error) {
            console.error(`Error clicking span with text "${text}":`, error);
            throw error;
        }
    }
    
    async selectRadioButtonById(page, radioButtonId) {
        try {
            // Wait for the radio button to be visible
            await page.waitForSelector(`#${radioButtonId}`, { visible: true });
    
            // Click the radio button
            await page.click(`#${radioButtonId}`);
            console.log(`Successfully selected radio button with ID: "${radioButtonId}"`);
        } catch (error) {
            console.error(`Error selecting radio button with ID "${radioButtonId}":`, error);
        }
    }
    async selectRadioButtonByLabel(page, labelText) {
        try {
            // Wait for the radio button labels to be visible
            await page.waitForSelector('label.radio-label', { visible: true});
    
            // Get all radio button labels within the document
            const labels = await page.$$('label.radio-label');
    
            // Log all available label texts for debugging
            const labelTexts = await Promise.all(labels.map(label => page.evaluate(el => el.textContent.trim(), label)));
            console.log("Available label texts:", labelTexts);
    
            for (const label of labels) {
                const text = await page.evaluate(el => el.textContent.trim(), label);
    
                // Use case-insensitive and trimmed text matching
                if (text.toLowerCase().includes(labelText.toLowerCase())) {
                    // Scroll the element into view to ensure it's visible
                    await page.evaluate(el => {
                        el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
                    }, label);
    
                    // Attempt to click the label directly to select the radio button
                    await label.click();
                    console.log(`Attempted to select radio button with label: "${text}"`);
    
                    // Check if the radio button is selected
                    let isChecked = await page.evaluate(el => {
                        const input = el.querySelector('input[type="radio"]');
                        return input ? input.checked : false;
                    }, label);
    
                    // Retry clicking if not checked
                    let attempts = 0;
                    while (!isChecked && attempts < 3) {
                        await label.click(); // Try clicking again
                        console.log(`Retrying click for label: "${text}"`);
    
                        // Check again if the radio button is selected
                        isChecked = await page.evaluate(el => {
                            const input = el.querySelector('input[type="radio"]');
                            return input ? input.checked : false;
                        }, label);
    
                        attempts++;
                    }
    
                    if (isChecked) {
                        console.log(`Successfully selected radio button with label: "${text}"`);
                    } else {
                        console.log(`Failed to select radio button with label: "${text}" after multiple attempts.`);
                    }
    
                    return; // Exit after processing the correct radio button
                }
            }
    
            console.log(`Label with text "${labelText}" not found.`);
        } catch (error) {
            console.error(`Error selecting radio button with label "${labelText}":`, error);
        }
    }
      
}


module.exports = BaseFormHandler;
