const NewYorkForLLC = require('../handlers/NewYorkForLLCFormHandler'); 
const NewJersyForLLC = require('../handlers/NewJersyForLLCFormHandler');
const NewJersyForCORP = require('../handlers/NewJersyForCORPFormHandler');
const ConnecticuitLLCHandler=require('../handlers/ConnecticuitForLLC'); 
const ConnecticuitCorpHandler =require('../handlers/ConnecticuitCorpHandler');       
// const MontanaFormHandler = require('../handlers/MontanaFormHandler');
const logger = require('../utils/logger');
const ConnecticuitForLLC = require('../handlers/ConnecticuitForLLC');
const CaliforniaForLLC = require('../handlers/CaliforniaForLLC');
const HawaiiForLLC = require('../handlers/HawaiiForLLC');
const HawaiiForCorp = require('../handlers/HawaiiForCorp');
const GeorgiaForLLC = require('../handlers/GeorgiaForLLC');
const NevadaForLLC = require('../handlers/NevadaForLLC'); 
const GeorgiaForCorp = require('../handlers/GeorgiaForCorp');
const NorthDakotaForLLC = require('../handlers/NorthDakotaForLLC'); 
const NorthDakotaForCorp =require('../handlers/NorthDakotaForCorp');
const ColoradoForLLC =require('../handlers/ColoradoForLLC');
const MissouriForLLC=require('../handlers/MissouriForLLC');
const ColoradoForCorp =require('../handlers/ColoradoForCorp');

const NewhampshireForLLC=require('../handlers/NewhampshireforLLC')




const PennsylvaniaForLLC =require('../handlers/PennsylvaniaForLLC')


class StateFormFactory {
    static async getFormHandler(page, jsonData) {
        const state = jsonData.data.State.stateFullDesc; // Get the state name from jsonData
        logger.info(`Factory creating form handler for state: ${state}`);
        const entity_type = jsonData.data.EntityType.orderShortName

        switch (state) {
            case 'New-York':
                return NewYorkForLLC; 
            case 'New-Jersey':
                if (entity_type == "LLC")
                    return NewJersyForLLC; 
                else if (entity_type == "CORP")
                    return NewJersyForCORP;
            case "Connecticuit":
                if (entity_type == "LLC"){
                    const ConnecticuitForLLCHandler = new ConnecticuitForLLC();
                    await ConnecticuitForLLCHandler.ConnecticuitForLLC(page, jsonData); // Call the form handler method
                    return ConnecticuitForLLCHandler;
                }
                else if (entity_type == "CORP")
                    return ConnecticuitCorpHandler;
                case "Pennsylvania":
                    if (entity_type == "LLC"){
                        const PennsylvaniaForLLCHandler = new PennsylvaniaForLLC();
                        await PennsylvaniaForLLCHandler.PennsylvaniaForLLC(page, jsonData); // Call the form handler method
                        return PennsylvaniaForLLCHandler;
                    }
                    else if (entity_type == "CORP")
                        return ConnecticuitCorpHandler;
                case "Hawaii":
                    if (entity_type == "LLC"){
                        const HawaiiForLLCHandler = new HawaiiForLLC();
                        await HawaiiForLLCHandler.HawaiiForLLC(page, jsonData); // Call the form handler method
                        return HawaiiForLLCHandler;
                    }
                    else if (entity_type == "CORP"){
                        const HawaiiForCorpHandler = new HawaiiForCorp();
                        await HawaiiForCorpHandler.HawaiiForCorp(page, jsonData); // Call the form handler method
                        return HawaiiForCorpHandler;
                    }
                    case "Missouri":
                        if (entity_type == "LLC"){
                            const MissouriForLLCHandler = new MissouriForLLC();
                            await MissouriForLLCHandler.MissouriForLLC(page, jsonData); // Call the form handler method
                            return MissouriForLLCHandler;
                        }
                        else if (entity_type == "CORP"){
                            const MissouriForCorpHandler = new MissouriForCorp();
                            await MissouriForCorpHandler.MissouriForCorp(page, jsonData); // Call the form handler method
                            return MissouriForCorpHandler;
                        }
                    case "Colorado":
                    if (entity_type == "LLC"){
                        const ColoradoForLLCHandler = new ColoradoForLLC();
                        await ColoradoForLLCHandler.ColoradoForLLC(page, jsonData); // Call the form handler method
                        return ColoradoForLLCHandler;
                    }
                    else if (entity_type == "CORP"){
                        const ColoradoForCorpHandler = new ColoradoForCorp();
                        await ColoradoForCorpHandler.ColoradoForCorp(page, jsonData); // Call the form handler method
                        return ColoradoForCorpHandler;
                    }



                    case "Missouri":
                        if (entity_type == "LLC"){
                            const MissouriForLLCHandler = new MissouriForLLC();
                            await MissouriForLLCHandler.MissouriForLLC(page, jsonData); // Call the form handler method
                            return MissouriForLLCHandler;
                        }
                        else if (entity_type == "CORP"){
                            const MissouriForCorpHandler = new MissouriForCorp();
                            await MissouriForCorpHandler.MissouriForCorp(page, jsonData); // Call the form handler method
                            return MissouriForCorpHandler;
                        }
                    case "Newhampshire":
                    if (entity_type == "LLC"){
                        const NewhampshireForLLCHandler = new NewhampshireForLLC();
                        await NewhampshireForLLCHandler.NewhampshireForLLC(page, jsonData); // Call the form handler method
                        return NewhampshireForLLCHandler;
                    }
                    else if (entity_type == "CORP"){
                        const ColoradoForCorpHandler = new ColoradoForCorp();
                        await ColoradoForCorpHandler.ColoradoForCorp(page, jsonData); // Call the form handler method
                        return ColoradoForCorpHandler;
                    }


                    case "Georgia":
                        if (entity_type == "LLC"){
                            const GeorgiaForLLCHandler = new GeorgiaForLLC();
                            await GeorgiaForLLCHandler.GeorgiaForLLC(page, jsonData); // Call the form handler method
                            return GeorgiaForLLCHandler;
                        }
                        else if (entity_type == "CORP"){
                            const GeorgiaForCorpHandler = new GeorgiaForCorp();
                            await GeorgiaForCorpHandler.GeorgiaForCorp(page, jsonData); // Call the form handler method
                            return GeorgiaForCorpHandler;
                        }

                        case "North-Dakota":
                        if (entity_type == "LLC"){
                            const NorthDakotaForLLCHandler = new NorthDakotaForLLC();
                            await NorthDakotaForLLCHandler.NorthDakotaForLLC(page, jsonData); // Call the form handler method
                            return NorthDakotaForLLCHandler;
                        }
                        else if (entity_type == "CORP"){
                            const NorthDakotaForCorpHandler = new NorthDakotaForCorp();
                            await NorthDakotaForCorpHandler.NorthDakotaForCorp(page, jsonData); // Call the form handler method
                            return NorthDakotaForCorpHandler;
                        }


                  case "Nevada": 
                  if (entity_type == "LLC"){
                    const NevadaForLLCHandler = new NevadaForLLC();
                    await NevadaForLLCHandler.NevadaForLLC(page, jsonData); // Call the form handler method
                    return NevadaForLLCHandler;
                }
                else if (entity_type == "CORP"){
                    const GeorgiaForCorpHandler = new GeorgiaForCorp();
                    await GeorgiaForCorpHandler.GeorgiaForCorp(page, jsonData); // Call the form handler method
                    return GeorgiaForCorpHandler;
                }
                              
                case "California":
                    if (entity_type == "LLC"){
                        const CaliforniaforLLCHandler = new CaliforniaForLLC();
                        await CaliforniaforLLCHandler.CaliforniaForLLC(page, jsonData); // Call the form handler method
                        return CaliforniaforLLCHandler;
                    }
                    else if (entity_type == "CORP")
                        return ConnecticuitCorpHandler;
                       
            // case 'Montana':
            //     return MontanaFormHandler; // Return function reference for Montana handler
            default:
                logger.warn(`No handler found for state: ${state}`);
                return null; // Return null if no form handler exists for the state
        }
    }
}

module.exports = StateFormFactory;


