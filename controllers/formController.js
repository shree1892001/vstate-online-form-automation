const formService = require('C:/Users/ACER/Desktop/vstate-utils/src/services/formService.js');
const tokenService = require('../services/tokenService');
const logger = require('C:/Users/ACER/Desktop/vstate-utils/src/utils/logger.js'); 

// Submit Form Function
exports.submitForm = async (page, jsonData, res) => {
    try {
        logger.info('Received form submission request', { payload: jsonData });
        await formService.processForm(page, jsonData);
        logger.info('Form submission succeeded');
    } catch (error) {
        logger.error('Error processing form submission', error);
    } finally {
        logger.info('Form submission process completed.');
    }
};

// Generate Token Function
exports.generateToken = async (page, jsonData) => {
    try {
        const { refreshtoken, accesstoken } = await tokenService.generateTokenProcess(page, jsonData);
        logger.info('Token generated successfully');
        return { refreshtoken, accesstoken };
    } catch (error) {
        logger.error('Error processing token generation', error);
        throw error; // Rethrow the error to handle it in the route
    }
};
