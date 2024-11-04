const BaseFormHandler = require('./BaseFormHandler');
const logger = require('../utils/logger');

class AlaskaForCORP extends BaseFormHandler {
    constructor() {
        super();
    }

    async AlaskaForCORP(page, jsonData) {
        try {
            logger.info('Navigating to New York form submission page...');
            const url = jsonData.data.State.stateUrl;
            await this.navigateToPage(page, url);

            await page.waitForSelector('a[title="Department of Commerce, Community, & Economic Development"]', { state: 'visible' });
            await this.clickButton(page, 'a[title="Department of Commerce, Community, & Economic Development"]');

            await page.waitForSelector('div.wrap h4.block-title + ul a[href="/web/cbpl/"]', { state: 'visible' });
            await this.clickButton(page, 'div.wrap h4.block-title + ul a[href="/web/cbpl/"]');

            await page.waitForSelector('h4.block-title + div #dnn_ctr1318_HtmlModule_lblContent a[href="/web/cbpl/Corporations.aspx"]', { state: 'visible' });
            await this.clickButton(page, 'h4.block-title + div #dnn_ctr1318_HtmlModule_lblContent a[href="/web/cbpl/Corporations.aspx"]');

            await page.waitForSelector('a[href="/web/cbpl/Corporations/CorpFormsFees/FormsbyEntity.aspx"]', { state: 'visible' });
            await this.clickButton(page, 'a[href="/web/cbpl/Corporations/CorpFormsFees/FormsbyEntity.aspx"]');

            await page.waitForSelector('a.deptUserAccord', { state: 'visible' });
            await page.locator('a.deptUserAccord', { hasText: 'Business Corporations' }).click();

            await page.waitForSelector('a.deptUserAccord');
            await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll('a.deptUserAccord'));
                const targetLink = links.find(link => link.textContent.includes('Domestic (Alaskan)'));
                if (targetLink) targetLink.click();
            });

            await page.waitForSelector('a[href="/web/cbpl/Corporations/OnlineFilingInstructionsBusCorpArticles.aspx"]', { state: 'visible' });
            await page.click('a[href="/web/cbpl/Corporations/OnlineFilingInstructionsBusCorpArticles.aspx"]');

            await page.waitForSelector('a.deptButton[href="/CBP/Corporation/startpage.aspx?file=CRFIL&entity=BUSC&isforeign=N"]', { state: 'visible' });
            await page.click('a.deptButton[href="/CBP/Corporation/startpage.aspx?file=CRFIL&entity=BUSC&isforeign=N"]');

            const newPagePromise = new Promise((resolve) => page.browser().once('targetcreated', target => resolve(target.page())));
            const newPage = await newPagePromise;

            await this.fillInputByName(newPage, 'ctl00$ContentMain$TextBoxLegalName', jsonData.data.Payload.Name.CD_CORP_Name);

            const inputData = [{ selector: '#ContentMain_TextAreaPurpose', value: 'Business purpose' }];
            await this.fillInputbyid(newPage, inputData);

            await this.clickDropdown(newPage, '#ContentMain_DDLNAICS_DDLNAICS', jsonData.data.Payload.Naics_Code.CD_NAICS_Code);

            const raFullName = jsonData.data.Payload.Registered_Agent.RA_Name;
            const [firstName, lastName] = raFullName.split(' ');
            await this.fillInputByName(newPage, 'ctl00$ContentMain$TextBoxAgentFirstName', firstName);
            await this.fillInputByName(newPage, 'ctl00$ContentMain$TextBoxAgentLastName', lastName);

            await newPage.waitForSelector('input[name="ctl00$ContentMain$AgentMailingAddress$TextBoxLine1"]', { state: 'visible' });
            await this.fillInputByName(newPage, 'ctl00$ContentMain$AgentMailingAddress$TextBoxLine1', jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1);

            await newPage.waitForSelector('input[name="ctl00$ContentMain$AgentMailingAddress$TextBoxCityState"]', { state: 'visible' });
            await this.fillInputByName(newPage, 'ctl00$ContentMain$AgentMailingAddress$TextBoxCityState', jsonData.data.Payload.Registered_Agent.RA_Address.RA_City);

            await newPage.waitForSelector('input[name="ctl00$ContentMain$AgentMailingAddress$TextBoxZip"]', { state: 'visible' });
            await this.fillInputByName(newPage, 'ctl00$ContentMain$AgentMailingAddress$TextBoxZip', String(jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code));

            await this.clickButton(newPage, '#ContentMain_AgentPhysicalAddress_ButtonCopy');

            await this.fillInputByName(newPage, 'ctl00$ContentMain$EntityMailingAddress$TextBoxLine1', jsonData.data.Payload.Principle_Address.PA_Address_Line1);
            await this.fillInputByName(newPage, 'ctl00$ContentMain$EntityMailingAddress$TextBoxCityState', jsonData.data.Payload.Principle_Address.PA_City);

            await this.clickDropdown(newPage, '#ContentMain_EntityMailingAddress_DDLState', jsonData.data.Payload.Principle_Address.PA_State);

            await this.fillInputByName(newPage, 'ctl00$ContentMain$EntityMailingAddress$TextBoxZip', String(jsonData.data.Payload.Principle_Address.PA_Zip_Code));
            await this.clickButton(newPage, '#ContentMain_EntityPhysicalAddress_ButtonCopy');

            await this.clickDropdown(newPage, '#ContentMain_Shares_DDLClass', 'Common');
            await this.fillInputByName(newPage, 'ctl00$ContentMain$Shares$TextBoxAuthorized', String(jsonData.data.Payload.Stock_Details.SI_No_Of_Shares));
            await this.clickButton(newPage, '#ContentMain_Shares_ButtonAdd');

            await this.clickButton(newPage, '#ContentMain_Incorporators_ButtonAdd');
            const incFullName = jsonData.data.Payload.Incorporator_Information.Incorporator_Info.Inc_Name;
            const [incfirstName, inclastName] = incFullName.split(' ');
            await this.fillInputByName(newPage, 'ctl00$ContentMain$TextBoxFirstName', incfirstName);
            await this.fillInputByName(newPage, 'ctl00$ContentMain$TextBoxLastName', inclastName);
            await this.clickButton(newPage, '#ContentMain_ButtonSave');

            await newPage.waitForSelector('#ContentMain_Signature_CheckBoxIPromise', { visible: true });
            await newPage.click('#ContentMain_Signature_CheckBoxIPromise');

            await this.fillInputByName(newPage, 'ctl00$ContentMain$Signature$TextBoxMyName', incFullName);
            await this.fillInputByName(newPage, 'ctl00$ContentMain$Signature$TextBoxPhone', String(jsonData.data.Payload.Incorporator_Information.Incorporator_Info.Inc_Contact_No));
            await this.clickButton(newPage, '#ContentMain_ButtonProceed');

        } catch (error) {
            logger.error('Error in AlaskaForCORP form handler:', error.stack);
            throw new Error(`AlaskaForCORP form submission failed: ${error.message}`);
        }
    }
}

module.exports = AlaskaForCORP;
