const logger = require('../utils/logger');
const BaseFormHandler = require('./BaseFormHandler');

class MichiganCORP extends BaseFormHandler {
    constructor() {
        super();
    }
    async MichiganCORP(page, jsonData) {
    
    try {
        logger.info('Navigating to New York form submission page...');
        const url = jsonData.data.State.stateUrl
        await this.navigateToPage(page, url)
        await page.click('#MainContent_parentRepeater_childRepeater_3_link_0');
        // await this.clickLinkByLabel(page,'500 - ARTICLES OF INCORPORATION');

        // await clickLinkByLabel1(page, '500 - ARTICLES OF INCORPORATION');
     await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 });
     const CORPfieldinput = [
           { label: 'MainContent_EntityNameWithArticleControl1_txtEntityName', value: jsonData.data.Payload.Name.CD_CORP_Name },
        ];
        await this.addInput(page, CORPfieldinput);
        await this.randomSleep()
        // await page.click('select[name="ctl00$MainContent$CapitalStockClassControl1$ddlClassOfStock"]');
        // await page.select('select[name="ctl00$MainContent$CapitalStockClassControl1$ddlClassOfStock"]', 'CNP');


       await this.clickDropdown(page, '#MainContent_CapitalStockClassControl1_ddlClassOfStock','COMMON')
        
        const articlefields = [
            {label:'MainContent_CapitalStockClassControl1_txtTotalAuthorizedNumShares',value: jsonData.data.Payload.Stock_Details.SI_No_Of_Shares }]
          const value =[{label:'MainContent_CapitalStockClassControl1_StockDesignationControl1_txtArea',value: jsonData.data.Payload.Stock_Details.SI_No_Of_Shares }] 
            
            const registerAgentFields = [{ label: 'MainContent_ResidentAgentControl1_txtAgentName', value: jsonData.data.Payload.Registered_Agent.RA_Name },
                {label:'MainContent_ResidentAgentControl1_txtAgentAddr1',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1 },
                { label: 'MainContent_ResidentAgentControl1_txtAgentCity', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City },
                {label:'MainContent_ResidentAgentControl1_txtAgentPostalCode',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code }]
            const pricipleAddressFields = [
                {label:'MainContent_ResidentAgentControl1_PrincipalOfficeControl_MI1_txtAddr',value: jsonData.data.Payload.Principle_Address.PA_Address_Line1 },
                { label: 'MainContent_ResidentAgentControl1_PrincipalOfficeControl_MI1_txtCity', value: jsonData.data.Payload.Principle_Address.PA_City },
                { label: 'MainContent_ResidentAgentControl1_PrincipalOfficeControl_MI1_cboState', value: jsonData.data.Payload.Principle_Address.PA_State },
                {label:'MainContent_ResidentAgentControl1_PrincipalOfficeControl_MI1_txtPostalCode',value:String( jsonData.data.Payload.Principle_Address.PA_Zip_Code )}]

                const organizerFields =[{label: 'MainContent_OfficersControl1_txtIndividualName', value: jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name},
                {label:'MainContent_OfficersControl1_txtResAddress',value: jsonData.data.Payload.Principle_Address.PA_Address_Line1 },
                { label: 'MainContent_OfficersControl1_txtCity', value: jsonData.data.Payload.Principle_Address.PA_City },
                { label: 'txtState', value: jsonData.data.Payload.Principle_Address.PA_State },
                {label:'MainContent_OfficersControl1_txtZip',value: String(jsonData.data.Payload.Principle_Address.PA_Zip_Code) },
               {label:'MainContent_OfficersControl1_cboCountry',value: jsonData.data.Payload.Principle_Address.PA_Country }]
                           
                        //    await page.click('select[name="ctl00$MainContent$CapitalStockClassControl1$ddlClassOfStock"]');
                        //    await page.select('select[name="ctl00$MainContent$CapitalStockClassControl1$ddlClassOfStock"]', 'US');
                   
                
                const orgFields = [{label:'MainContent_SignatureControl1_txtSignature',value: jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name}]
                
            await this.addInput(page, articlefields);
            await this.clickButton(page, '#MainContent_CapitalStockClassControl1_btnSave');
            await new Promise(resolve => setTimeout(resolve, 3000))
            await this.addInput(page,value);
            await new Promise(resolve => setTimeout(resolve, 3000))
            await this.addInput(page, registerAgentFields );
            await new Promise(resolve => setTimeout(resolve, 3000))
            //await clickButton(page, '#MainContent_OfficersControl1_btnAddOfficer');
            await this.addInput(page, pricipleAddressFields );
            await new Promise(resolve => setTimeout(resolve, 3000))
            await page.waitForSelector('#MainContent_OfficersControl1_btnAddOfficer', { visible: true });
            await this.clickButton(page, '#MainContent_OfficersControl1_btnAddOfficer');
            await this.addInput(page, organizerFields);
            await new Promise(resolve => setTimeout(resolve, 3000))
            await page.click('#MainContent_OfficersControl1_btnSave');

           // await page.waitForSelector('#MainContent_OfficersControl1_btnSave');
           // await page.click('#MainContent_OfficersControl1_btnSave');
           // await page.waitForSelector('#MainContent_OfficersControl1_btnSave', { visible: true });
           // await this.clickButton(page,'#MainContent_OfficersControl1_btnSave');
            logger.info('FoRm submission complete fot Michigan CORP')  
            await new Promise(resolve => setTimeout(resolve, 10000))
            await this.clickButton(page,'#MainContent_SignatureControl1_grdSignature_btnAddSignature');
            await new Promise(resolve => setTimeout(resolve, 10000))
            await this.addInput(page, orgFields );
            await page.click("#MainContent_SignatureControl1_rdoAccept");
            await new Promise(resolve => setTimeout(resolve, 3000))
            await page.waitForSelector('#MainContent_SignatureControl1_btnSave', { visible: true });
            await page.click("#MainContent_SignatureControl1_btnSave")
            logger.info('FoRm submission complete fot Michigan CORP')

            const contactFields = [{label:'MainContent_FilingFormContactInfoControl1_txtContactName',value: jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Name},
                {label:'MainContent_FilingFormContactInfoControl1_txtStreetNo',value: jsonData.data.Payload.Incorporator_Information.Address.Inc_Address_Line1 },
                {label:'MainContent_FilingFormContactInfoControl1_txtCity',value: jsonData.data.Payload.Incorporator_Information.Address.Inc_City },
                {label:'MainContent_FilingFormContactInfoControl1_txtContactEmail',value: jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Email_Address },
                {label:'MainContent_FilingFormContactInfoControl1_txtZip',value: String(jsonData.data.Payload.Incorporator_Information.Address.Inc_Zip_Code)},
                {label:'MainContent_FilingFormContactInfoControl1_txtNotificationEmail',value: jsonData.data.Payload.Incorporator_Information.Incorporator_Details.Inc_Email_Address }
           ]
         // await clickButton(page, '#MainContent_ButtonsControlMI1_btnSubmitExternal');
           await new Promise(resolve => setTimeout(resolve, 3000))   
           await this.addInput(page, contactFields);
           await this.clickButton(page, '#MainContent_ButtonsControl1_btnSubmitExternal');
       

    } catch (error) {
        // Log full error stack for debugging
        logger.error('Error in Michigan CORP form handler:', error.stack);
        throw new Error(`Michigan COPR form submission failed: ${error.message}`);
    }
}
}

module.exports = MichiganCORP;




