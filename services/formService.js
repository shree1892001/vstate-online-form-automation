const puppeteer = require('puppeteer');
const stateFormFactory = require('C:/Users/ACER/Desktop/vstate-utils/src/factories/stateFormFactory.js');
const logger = require('C:/Users/ACER/Desktop/vstate-utils/src/utils/logger.js');


exports.processForm = async (page, jsonData) => {
    try {
        logger.info(`Processing form for state: ${jsonData.data.State.stateFullDesc}`);

        const formHandler = await stateFormFactory.getFormHandler(page, jsonData);
        if (formHandler) {
            try {
                const result = await formHandler(); // Call the async function returned by the factory
            } catch (error) {
                logger.error(`Error occurred while filling form: ${error.message}`);
            }
        } else {
            logger.warn('No form handler returned');
        }
    } catch (error) {
        logger.error(`Error processing form for state: ${jsonData.data.State.stateFullDesc}`, error);
        throw error; // Re-throw the error for upstream handling
    }
};

