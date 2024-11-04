const logger = require('../utils/logger');
const BaseFormHandler = require('./BaseFormHandler');

class MichiganLLC extends BaseFormHandler {
    constructor() {
        super();
    }
    async MichiganLLC(page, jsonData) {
    
    try {
        logger.info('Navigating to New York form submission page...');
        const url = jsonData.data.State.stateUrl
        await this.navigateToPage(page, url);
        await page.click('#MainContent_parentRepeater_childRepeater_0_link_0');
        // const inputFields = [
        //     { label: 'Username', value: jsonData.data.State.filingWebsiteUsername },
        //     { label: 'Password', value: jsonData.data.State.filingWebsitePassword }
        // ];

        // await addInput(page, inputFields);
        // logger.info('Login form filled out successfully for New York LLC.');
        // await submitForm(page);
        // await clickLinkByLabel(page, 'Domestic Business Corporation (For Profit) and Domestic Limited Liability Company');
        // await clickLinkByLabel(page,'Articles of Organization for a Domestic Limited Liability Company (not for professional service limited liability companies)');
      // await this.clickLinkByLabel(page,'700 - ARTICLES OF ORGANIZATION');
       await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 });

        // await clickLinkByLabel1(page, '500 - ARTICLES OF INCORPORATION');

        const LLCfieldinput = [
            { label: 'MainContent_EntityNameMI1_txtEntityName', value: jsonData.data.Payload.Name.CD_LLC_Name },
        ];
        await this.addInput(page, LLCfieldinput);
        await this.randomSleep()
       // await submitForm(page);
        //await page.waitForSelector('MainContent_EntityNameMI1_txtEntityName', { visible: true });
        //const articlefields = [
            //{ label: 'MainContent_EntityNameMI1_txtEntityName', value: jsonData.data.Payload.Name.CD_LLC_Name },
           // {label:'txtGeneric',value: jsonData.data.Payload.Name.CD_Duration }]
        const registerAgentFields = [{ label: 'MainContent_ResidentAgentControl1_txtAgentName', value: jsonData.data.Payload.Registered_Agent.RA_Name },
            {label:'MainContent_ResidentAgentControl1_txtAgentAddr1',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Address_Line1 },
            { label: 'MainContent_ResidentAgentControl1_txtAgentCity', value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_City },
            {label:'MainContent_ResidentAgentControl1_txtAgentPostalCode',value: jsonData.data.Payload.Registered_Agent.RA_Address.RA_Zip_Code }]
        const pricipleAddressFields = [
            {label:'MainContent_ResidentAgentControl1_PrincipalOfficeControl_MI1_txtAddr',value: jsonData.data.Payload.Principle_Address.PA_Address_Line1 },
            { label: 'MainContent_ResidentAgentControl1_PrincipalOfficeControl_MI1_txtCity', value: jsonData.data.Payload.Principle_Address.PA_City },
            { label: 'MainContent_ResidentAgentControl1_PrincipalOfficeControl_MI1_cboState', value: jsonData.data.Payload.Principle_Address.PA_State },
            {label:'MainContent_ResidentAgentControl1_PrincipalOfficeControl_MI1_txtPostalCode',value: String( jsonData.data.Payload.Principle_Address.PA_Zip_Code )}]
        
            

            const organizerFields = [{label:'MainContent_SignatureControl1_txtSignature',value: jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name }]
            await new Promise(resolve => setTimeout(resolve, 3000))
       // await this.addInput(page, articlefields);
       // await new Promise(resolve => setTimeout(resolve, 3000))
        await this.addInput(page, registerAgentFields);
        await new Promise(resolve => setTimeout(resolve, 3000))
        await this.addInput(page, pricipleAddressFields);
        await new Promise(resolve => setTimeout(resolve, 3000))
        await this.clickButton(page, '#MainContent_SignatureControl1_grdSignature_btnAddSignature');
        // await page.waitForSelector("MainContent_SignatureControl1_grdSignature_btnAddSignature");
        // await  page.click("#MainContent_SignatureControl1_grdSignature_btnAddSignature");
            
        await this.addInput(page, organizerFields);

        await  page.click("#MainContent_SignatureControl1_rdoAccept");
        await new Promise(resolve => setTimeout(resolve, 3000))
        await page.waitForSelector('#MainContent_SignatureControl1_btnSave', { visible: true });
        await page.click("#MainContent_SignatureControl1_btnSave")
              
        const contactFields = [{label:'MainContent_FilingFormContactInfoControl1_txtContactName',value: jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Name },
             {label:'MainContent_FilingFormContactInfoControl1_txtStreetNo',value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_Address_Line1 },
             {label:'MainContent_FilingFormContactInfoControl1_txtCity',value: jsonData.data.Payload.Organizer_Information.Org_Address.Org_City },
             {label:'MainContent_FilingFormContactInfoControl1_txtContactEmail',value: jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Email_Address },
             {label:'MainContent_FilingFormContactInfoControl1_txtZip',value:String( jsonData.data.Payload.Organizer_Information.Org_Address.Org_Zip_Code)},
             {label:'MainContent_FilingFormContactInfoControl1_txtNotificationEmail',value: jsonData.data.Payload.Organizer_Information.Organizer_Details.Org_Email_Address },
        ]
      // await clickButton(page, '#MainContent_ButtonsControlMI1_btnSubmitExternal'); 
      await new Promise(resolve => setTimeout(resolve, 3000))  
        await this.addInput(page, contactFields);
        await this.clickButton(page, '#MainContent_ButtonsControlMI1_btnSubmitExternal');


       

    } catch (error) {
        // Log full error stack for debugging
        logger.error('Error in Michigan LLC form handler:', error.stack);
        throw new Error(`Michigan LLC form submission failed: ${error.message}`);
    }
}
}

module.exports = MichiganLLC;




