const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');
//const {selectRadioButtonByLabel,clickOnTitle,navigateToPage,addInput,clickButton  } = require('../utils/puppeteerUtils');

class NebraskaForLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async NebraskaForLLC(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);
            await this.selectRadioButtonById(page, 'entn');
            await this.clickDropdown(page, '#entity', 'Domestic Limited Liability Company');
            await this.clickButton(page, '#submit');
            await this.fillInputByName(page, 'corporationName', jsonData.data.Payload.Name.CD_LLC_Name);
            //add principle address
            await this.fillInputByName(page,'po.address1',jsonData.data.Payload.Principle_Address.PA_Address_Line1)
            await this.fillInputByName(page,'po.city',jsonData.data.Payload.Principle_Address.PA_City)
            await this.clickDropdown(page, '#postate',  jsonData.data.Payload.Principle_Address.PA_State)
            await this.fillInputByName(page,'po.zipCode',String(jsonData.data.Payload.Principle_Address.PA_Zip_Code))
            await this.selectRadioButtonById(page, 'eflano');
            //upload document
            // await this.clickButton(page, '#articlesDoc');
            await page.waitForSelector('#articlesDoc');
            const [fileChooser] = await Promise.all([
                page.waitForFileChooser(),
                page.click('#editDoc label')
            ]);
            const filePath = 'C:/Users/Acer/Desktop/OnlineFormDocuments/CertificateOfOrganization.pdf';
            await fileChooser.accept([filePath]);
            //continue button
            await this.clickButton(page, '#edocsubmit');
            //Registered agent
            await page.waitForSelector('#rai');
            await page.evaluate(() => {
                document.querySelector('#rai').click();
            });
            const rafullname = jsonData.data.Payload.Registered_Agent.RA_Name;
            console.log(rafullname)
            const [firstName, lastName] = rafullname.split(' ');
            await page.waitForSelector('#raisfn');
            await page.click('#raisfn');
            await page.type('#raisfn', firstName);
            await page.waitForSelector('input[name="lastName"]');
            await this.fillInputByName(page, 'lastName', lastName);
            await this.clickButton(page, '#raisearch');
            const buttonSelector = 'input.newira[value="Create New Registered Agent Record"]';
            await this.clickButton(page, buttonSelector);
            const regFields1 = [
                { label: 'Address 1 (Street Address)', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1 },
                { label: 'City', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City },
                { label: 'Zip Code', value: String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code)},
            
            ];
            await this.addInput(page, regFields1);
            await this.clickButton(page, '#lbrasubmit');

        } catch (error) {
            console.error('Error selecting the Registered Agent (Physical) address:', error);
        }
    }
    
}

module.exports = NebraskaForLLC;