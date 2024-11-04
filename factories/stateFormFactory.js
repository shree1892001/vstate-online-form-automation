const NewYorkForLLC = require('../handlers/NewYorkForLLCFormHandler.js'); 
const NewYorkForCORP = require('../handlers/NewYorkForCORPFormHandler.js');
const NewJersyForLLC = require('../handlers/NewJersyForLLCFormHandler.js');
const NewJersyForCORP = require('../handlers/NewJersyForCORPFormHandler.js')
const MontanaForLLC =  require('../handlers/MontanaForLLCFormHandler.js')
const MontanaForCORP =  require('../handlers/MontanaForCORPFormHandler.js')
const WyomingForLLC = require('../handlers/WyomingForLLCFormHandler.js')
const WyomingForCORP = require('../handlers/WyomingForCORPFormHandler.js')
const ColoradoForLLC = require('../handlers/ColoradoForLLC.js')
const KentuckyForLLC = require('../handlers/KentuckyForLLCFormHandler.js')
const KentuckyForCORP = require('../handlers/KentuckyForCORPFormHandler.js')
const FloridaForLLC = require('../handlers/FloridaForLLCFormHandler.js')
const FloridaForCORP = require('../handlers/FloridaForCORPFormHandler.js')
const IowaForLLC = require('../handlers/IowaForLLCFormHandler.js')
const IowaForCORP = require('../handlers/IowaForCORPFormHandler.js')
const IndianaForLLC = require('../handlers/IndianaForLLCFormHandler.js')
const IndianaForCORP = require('../handlers/IndianaForCORPFormHandler.js')
const MarylandForLLC = require('../handlers/MarylandForLLCFormHandler.js')
const MarylandForCORP = require('../handlers/MarylandForCORPFormHandler.js')
const OklahomaForLLC = require('../handlers/OklahomaForLLCFormHandler.js')
const OklahomaForCORP = require('../handlers/OklahomaForCORPFormHandler.js')
const DcForLLC = require('../handlers/DcForLLCHandler.js')
const DcForCORP = require('../handlers/DcForCORPHandler.js')
const KansasForLLC = require('../handlers/KansasForLLCFormHandler.js')
const KansasForCORP = require('../handlers/KansasForCORPFormHandler.js')
const IdahoForLLC = require('../handlers/IdahoForLLCFormHandler.js')
const IdahoForCORP = require('../handlers/IdahoForCORPFormHandler.js')
const AlaskaForLLC = require('../handlers/AlaskaForLLCFormHandler.js')
const AlaskaForCORP = require('../handlers/AlaskaForCORPFormHandler.js')
const AlabamaForLLC = require('../handlers/AlabamaForLLCFormHandler.js')
const AlabamaForCORP = require('../handlers/AlabamaForCORPFormHandler.js')
const SouthDakotaForLLC = require('../handlers/SouthDakotaForLLCFormHandler.js')
const SouthDakotaForCORP = require('../handlers/SouthDakotaForCORPFormHandler.js')
const ArkansasForLLC = require('../handlers/ArkansasForLLCFormHandler.js')
const ArkansasForCORP = require('../handlers/ArkansasForCORPFormHandler.js')
const TennesseeForLLC = require('../handlers/TennesseeForLLCFormHandler.js')
const TennesseeForCORP = require('../handlers/TennesseeForCORPFormHandler.js')
const HawaiiForLLC = require('../handlers/HawaiiForLLC.js');
const HawaiiForCorp = require('../handlers/HawaiiForCorp.js');
const NorthDakotaForLLC = require('../handlers/NorthDakotaForLLC.js'); 
const NorthDakotaForCorp =require('../handlers/NorthDakotaForCorp.js');

const MissouriForLLC=require('../handlers/MissouriForLLC.js');
const ColoradoForCorp =require('../handlers/ColoradoForCorp.js');
const MichiganLLC = require('../handlers/MichiganLLCFormHandler.js') 
const MichiganCORP = require('../handlers/MichiganCORPFormHandler.js')  
const RhodeislandForLLC = require('../handlers/RhodeislandForLLCHandler.js')
const RhodeislandForCORP = require('../handlers/RhodeislandForCORPHandler.js')
const NewmaxicoForLLC = require('../handlers/NewmaxicoForLLCHandler.js')
const SouthCarolinaForLLC = require('../handlers/SouthCarolinaForLLCFormHandler.js')
const SouthCarolinaForCORP = require('../handlers/SouthCarolinaForCORPFormHandler.js')
const LouisianaForLLC = require('../handlers/LouisianaForLLCFormHandler.js')
const LouisianaForCORP = require('../handlers/LouisianaForCORPFormHandler.js')   
const OregonForLLC= require('../handlers/OregonForLLCHandler.js'); 
const OregonForCorp =require('../handlers/OregonForCORPHandler.js');
const IllinoisForLLC=require('../handlers/IllinoisForLLCFormHandler.js'); 
const IllinoisForCORP=require('../handlers/IllinoisForCORPFormHandler.js')
const MississippiForLLC = require('../handlers/MississippiForLLCHandler.js')
const MississippiForCORP = require('../handlers/MississippiForCORPHandler.js')
const NebraskaForLLC = require('../handlers/NebraskaForLLCFormHandler.js')
const NebraskaForCORP = require('../handlers/NebraskaForCORPFormHandler.js')
const MassachusettsForCORP = require('../handlers/MassachusettsForCORPFormHandler.js')
const MassachusettsForLLC = require('../handlers/MassachusettsForLLCFromHandler.js')

// const MontanaFormHandler = require('../handlers/MontanaFormHandler');
const logger = require('../utils/logger');

class StateFormFactory {
    static async getFormHandler(page, jsonData) {
        const state = jsonData.data.State.stateFullDesc; // Get the state name from jsonData
        logger.info(`Factory creating form handler for state: ${state}`);
        const entity_type = jsonData.data.EntityType.entityShortName
        console.log("entity_type ::", entity_type)
        try{
            switch (state) {
                case 'Alabama':
                    if (entity_type == "LLC"){
                        const AlabamaForLLCHandler = new AlabamaForLLC();
                        return async () => {
                            return await AlabamaForLLCHandler.AlabamaForLLC(page,jsonData);
                        }; 
                    }
                    else if (entity_type == "CORP"){
                        const AlabamaForCORPHandler = new AlabamaForCORP();
                        return async () => {
                            return await AlabamaForCORPHandler.AlabamaForCORP(page, jsonData);
                        }
                         
                    }
                case 'Alaska':
                    if (entity_type == "LLC"){
                        const AlaskaForLLCHandler = new AlaskaForLLC();
                        return async () => {
                            return await AlaskaForLLCHandler.AlaskaForLLC(page,jsonData);
                        }
                    }
                    else if (entity_type == "CORP"){
                        const AlaskaForCORPFormHandler = new AlaskaForCORP();
                        return async () => {
                            return await AlaskaForCORPFormHandler.AlaskaForCORP(page,jsonData);
                        }

                    }
                    
                case 'New York':
                    if (entity_type == "LLC"){
                        const NewYorkForLLCHandler = new NewYorkForLLC();
                        // await NewYorkForLLCHandler.NewYorkForLLC(page,jsonData);
                        // return NewYorkForLLCHandler;
                        return async () => {
                            return await NewYorkForLLCHandler.NewYorkForLLC(page,jsonData);
                        }; 
                    }
                    else if (entity_type == "CORP"){
                        const NewYorkForCORPHandler = new NewYorkForCORP();
                        return async () => {
                            return await NewYorkForCORPHandler.NewYorkForCORP(page, jsonData);
                        }
                         
                    }
                case 'New Jersey':
                    if (entity_type == "LLC"){
                        const NewJersyForLLCHandler = new NewJersyForLLC();
                        return async () => {
                            return await NewJersyForLLCHandler.NewJersyForLLC(page, jsonData); // Call the form handler method
                        };
                        // return NewJersyForLLCHandler;
                    }
                    else if (entity_type == "CORP"){
                        const NewJersyForCORPHandler = new NewJersyForCORP();
                        return async () => {
                            return await NewJersyForCORPHandler.NewJersyForCORP(page, jsonData); // Call the form handler method
                        }
                    }
                case 'Montana':
                    if (entity_type == "LLC"){
                        const montanaForLLCHandler = new MontanaForLLC();
                        return async () => {
                            return await montanaForLLCHandler.MontanaForLLC(page, jsonData); // Call the form handler method
                        }
                    }
                    else if (entity_type == "CORP"){
                        const montanaForCORPHandler = new MontanaForCORP();
                        return async () => {
                            return await montanaForCORPHandler.MontanaForCORP(page, jsonData); // Call the form handler method
                        }
                    }
                case 'Wyoming':
                    if (entity_type == "LLC"){
                        const wyomingForLLCHandler = new WyomingForLLC();
                        return async () => {
                            return await wyomingForLLCHandler.WyomingForLLC(page, jsonData); // Call the form handler method
                        }
                    }
                    else if (entity_type == "CORP"){
                        const wyomingForCORPHandler = new WyomingForCORP();
                        return async () => {
                            return await wyomingForCORPHandler.WyomingForCORP(page, jsonData); // Call the form handler method
                        }
                    }
                case 'Colorado':
                        if (entity_type == "LLC"){
                            const ColoradoForLLCHandler = new ColoradoForLLC();
                            return async () => {
                                return await ColoradoForLLCHandler.ColoradoForLLC(page, jsonData); // Call the form handler method
                            }
                        }

                case 'Kentucky':
                    if (entity_type == "LLC"){
                        const KentuckyForLLCHandler = new KentuckyForLLC();
                        return async () => {
                            return await KentuckyForLLCHandler.KentuckyForLLC(page, jsonData); // Call the form handler method
                        }
                    }
                    else if (entity_type == "CORP"){
                        const KentuckyForCORPHandler = new KentuckyForCORP();
                        return async () => {
                            return await KentuckyForCORPHandler.KentuckyForCORP(page, jsonData); // Call the form handler method
                        }
                    }
                    
                case 'Florida':
                    if (entity_type == "LLC"){
                        const FloridaForLLCHandler = new FloridaForLLC();
                        return async () => {
                            return await FloridaForLLCHandler.FloridaForLLC(page, jsonData); // Call the form handler method
                        }
                    }
                    else if (entity_type == "CORP"){
                        const FloridaForCORPHandler = new FloridaForCORP();
                        // await FloridaForCORPHandler.FloridaForCORP(page, jsonData); // Call the form handler method
                        // return FloridaForCORPHandler;
                        return async () => {
                            return await FloridaForCORPHandler.FloridaForCORP(page, jsonData);
                        };
                    }

                case 'Iowa':
                    if (entity_type == "LLC"){
                        const IowaForLLCHandler = new IowaForLLC();
                        return async () => {
                            return await IowaForLLCHandler.IowaForLLC(page, jsonData); // Call the form handler method
                        }
                    }
                    else if (entity_type == "CORP"){
                        const IowaForCORPHandler = new IowaForCORP();
                        return async () => {
                            return await IowaForCORPHandler.IowaForCORP(page, jsonData); // Call the form handler method
                        }
                    }
                case 'Indiana':
                    if (entity_type == "LLC"){
                        const IndianaForLLCHandler = new IndianaForLLC();
                        return async () => {
                            return await IndianaForLLCHandler.IndianaForLLC(page, jsonData); // Call the form handler method
                        }
                    }
                    else if (entity_type == "CORP"){
                        const IndianaForCORPHandler = new IndianaForCORP();
                        return async () => {
                            return await IndianaForCORPHandler.IndianaForCORP(page, jsonData); // Call the form handler method
                        }
                    }
                case 'Maryland':
                    if (entity_type == "LLC"){
                        const MarylandForLLCHandler = new MarylandForLLC();
                        return async () => {
                            return await MarylandForLLCHandler.MarylandForLLC(page, jsonData); // Call the form handler method
                        }
                    }
                    else if (entity_type == "CORP"){
                        const MarylandForCORPHandler = new MarylandForCORP();
                        return async () => {
                            return await MarylandForCORPHandler.MarylandForCORP(page, jsonData); // Call the form handler method
                        }
                    }          
                   
                    case 'dc':
                        if(entity_type =="LLC"){
                            const DcForLLCHandler = new DcForLLC();
                            return async () => {
                                return await DcForLLCHandler.DcForLLC(page,jsonData);
                            }
                        }
                        else if (entity_type == "CORP"){
                            const DcForCORPHandler = new DcForCORP();
                            return async () => {
                                return await DcForCORPHandler.DcForCORP(page,jsonData);
                            }
                        }
                        case 'Kansas':
                            if (entity_type == "LLC"){
                                const KansasForLLCHandler = new KansasForLLC();
                                return async () => {
                                    return await KansasForLLCHandler.KansasForLLC(page, jsonData); // Call the form handler method
                                }
                            }
                            else if (entity_type == "CORP"){
                                const KansasForCORPHandler = new KansasForCORP();
                                return async () => {
                                    return await KansasForCORPHandler.KansasForCORP(page, jsonData); // Call the form handler method
                                }
                            }
            
        
                        case 'Idaho':
                            if (entity_type == "LLC"){
                                const IdahoForLLCHandler = new IdahoForLLC();
                                return async () => {
                                    return await IdahoForLLCHandler.IdahoForLLC(page, jsonData); // Call the form handler method
                                }
                            }
                            else if (entity_type == "CORP"){
                                const IdahoForCORPHandler = new IdahoForCORP();
                                return async () => {
                                    return await IdahoForCORPHandler.IdahoForCORP(page, jsonData); // Call the form handler method
                                }
                            }
                            case 'Arkansas':
                                if (entity_type == "LLC"){
                                    const ArkansasForLLCHandler = new ArkansasForLLC();
                                    return async () => {
                                        return await ArkansasForLLCHandler.ArkansasForLLC(page, jsonData); // Call the form handler method
                                    }
                                }
                                else if (entity_type == "CORP"){
                                    const ArkansasForCORPHandler = new ArkansasForCORP();
                                    return async () => {
                                        return await ArkansasForCORPHandler.ArkansasForCORP(page, jsonData); // Call the form handler method
                                    }
                                }

                            case 'Tennessee':
                                if (entity_type == "LLC"){
                                    const TennesseeForLLCHandler = new TennesseeForLLC();
                                    return async () => {
                                        return await TennesseeForLLCHandler.TennesseeForLLC(page, jsonData); // Call the form handler method
                                    }
                                }
                                else if (entity_type == "CORP"){
                                    const TennesseeForCORPHandler = new TennesseeForCORP();
                                    return async () => {
                                        return await TennesseeForCORPHandler.TennesseeForCORP(page, jsonData); // Call the form handler method
                                    }
                                }
                            case 'SouthDakota':
                                if (entity_type == "LLC"){
                                    const SouthDakotaForLLCHandler = new SouthDakotaForLLC();
                                    return async () => {
                                        return await SouthDakotaForLLCHandler.SouthDakotaForLLC(page, jsonData); // Call the form handler method
                                    }
                                }
                                else if (entity_type == "CORP"){
                                    const SouthDakotaForCORPHandler = new SouthDakotaForCORP();
                                    return async () => {
                                        return await SouthDakotaForCORPHandler.SouthDakotaForCORP(page, jsonData); // Call the form handler method
                                    }
                                }
                                case "Hawaii":
                                    if (entity_type == "LLC"){
                                        const HawaiiForLLCHandler = new HawaiiForLLC();
                                        return async () => {
                                            return await HawaiiForLLCHandler.HawaiiForLLC(page, jsonData); // Call the form handler method
                                        }
                                    }
                                    else if (entity_type == "CORP"){
                                        const HawaiiForCorpHandler = new HawaiiForCorp();
                                        return async () => {
                                            return await HawaiiForCorpHandler.HawaiiForCorp(page, jsonData); // Call the form handler method
                                        }
                                    }
                                case "Missouri":
                                    if (entity_type == "LLC"){
                                        const MissouriForLLCHandler = new MissouriForLLC();
                                        return async () => {
                                            return await MissouriForLLCHandler.MissouriForLLC(page, jsonData); // Call the form handler method
                                        }
                                    }
                                    else if (entity_type == "CORP"){
                                        const MissouriForCorpHandler = new MissouriForCorp();
                                        return async () => {
                                            return await MissouriForCorpHandler.MissouriForCorp(page, jsonData); // Call the form handler method
                                        }
                                    }
                                case "Colorado":
                                    if (entity_type == "LLC"){
                                        const ColoradoForLLCHandler = new ColoradoForLLC();
                                        return async () => {
                                            return await ColoradoForLLCHandler.ColoradoForLLC(page, jsonData); // Call the form handler method
                                        }
                                    }
                                    else if (entity_type == "CORP"){
                                        const ColoradoForCorpHandler = new ColoradoForCorp();
                                        return async () => {
                                            return await ColoradoForCorpHandler.ColoradoForCorp(page, jsonData); // Call the form handler method
                                        }
                                    }
                                case "North Dakota":
                                    if (entity_type == "LLC"){
                                        const NorthDakotaForLLCHandler = new NorthDakotaForLLC();
                                        return async () => {
                                            return await NorthDakotaForLLCHandler.NorthDakotaForLLC(page, jsonData); // Call the form handler method
                                        }
                                    }
                                    else if (entity_type == "CORP"){
                                        const NorthDakotaForCorpHandler = new NorthDakotaForCorp();
                                        return async () => {
                                            return await NorthDakotaForCorpHandler.NorthDakotaForCorp(page, jsonData); // Call the form handler method
                                        }
                                    }
                                case 'Michigan':
                                    if (entity_type =="LLC"){
                                        const MichiganLLCFormHandler = new MichiganLLC();
                                        return async () => {
                                            return await MichiganLLCFormHandler.MichiganLLC(page,jsonData);
                                        }
                                    }
                                    else if (entity_type == "CORP"){
                                        const MichiganCORPFormHandler = new MichiganCORP();
                                        return async () => {
                                            return await MichiganCORPFormHandler.MichiganCORP(page,jsonData);
                                        }
                                    }
                                case 'Rhodeisland':
                                    if(entity_type =="LLC"){
                                        const RhodeislandForLLCHandler = new RhodeislandForLLC();
                                        return async () => {
                                            return await RhodeislandForLLCHandler.RhodeislandForLLC(page,jsonData);
                                        }
                                    }
                                    else if (entity_type == "CORP"){
                                        const RhodeislandForCORPHandler = new RhodeislandForCORP();
                                        return async () => {
                                            return await RhodeislandForCORPHandler.RhodeislandForCORP(page,jsonData);
                                        }
                                    }    
                                case 'newmexico':
                                    if(entity_type == "LLC"){
                                        const NewmaxicoForLLCHandler = new NewmaxicoForLLC();
                                        return async () => {
                                            return await NewmaxicoForLLCHandler.NewmaxicoForLLC(page,jsonData);
                                        }
                                    }
                                case 'Utah':
                                    if(entity_type =="LLC"){
                                        const UtahForLLCHandler = new UtahForLLC();
                                        return async () => {
                                            return await UtahForLLCHandler.UtahForLLC(page,jsonData);
                                        }
                                    }
                                    else if (entity_type == "CORP"){
                                        const UtahForCorpHandler = new UtahForCORP();
                                        return async () => {
                                            return  await UtahForCorpHandler.UtahForCORP(page,jsonData);
                                        }
                                    }
                                    case 'South Carolina':
                                        if (entity_type == "LLC"){
                                            const SouthCarolinaForLLCHandler = new SouthCarolinaForLLC();
                                            return async () => {
                                                return await SouthCarolinaForLLCHandler.SouthCarolinaForLLC(page, jsonData); // Call the form handler method
                                            }
                                        }
                                        else if (entity_type == "CORP"){
                                            const SouthCarolinaForCORPHandler = new SouthCarolinaForCORP();
                                            return async () => {
                                                return await SouthCarolinaForCORPHandler.SouthCarolinaForCORP(page, jsonData); // Call the form handler method
                                            }
                                        }
                                        case 'Louisiana':
                                        if (entity_type == "LLC"){
                                            const LouisianaForLLCHandler = new LouisianaForLLC();
                                            return async () => {
                                                return await LouisianaForLLCHandler.LouisianaForLLC(page, jsonData); // Call the form handler method
                                            }
                                        }
                                        else if (entity_type == "CORP"){
                                            const LouisianaForCORPHandler = new LouisianaForCORP();
                                            return async () => {
                                                return await LouisianaForCORPHandler.LouisianaForCORP(page, jsonData); // Call the form handler method
                                            }
                                        }
                                        case 'Oregon':
                                        if (entity_type == "LLC"){
                                            const AlabamaForLLCHandler = new OregonForLLC();
                                            return async () => {
                                                return await AlabamaForLLCHandler.OregonForLLC(page,jsonData);
                                            }; 
                                        }
                                        else if (entity_type == "CORP"){
                                            const AlabamaForCORPHandler = new OregonForCorp();
                                            return async () => {
                                                return await AlabamaForCORPHandler.OregonForCorp(page, jsonData);
                                            }
                                            
                                        }
                                        case 'Illinois':
                    if (entity_type == "LLC"){
                        const IllinoisForLLCHandler = new IllinoisForLLC();
                        return async () => {
                            return await IllinoisForLLCHandler.IllinoisForLLC(page, jsonData); // Call the form handler method
                        }
                    }
                    else if (entity_type == "CORP"){
                        const IllinoisForCORPHandler = new IllinoisForCORP();
                        return async () => {
                            return await IllinoisForCORPHandler.IllinoisForCORP(page, jsonData); // Call the form handler method
                        }
                    }
                    case 'Mississippi':
                        if(entity_type =="LLC"){
                            const MississippiForLLCHandler = new MississippiForLLC();
                            return async () =>{
                                return await MississippiForLLCHandler.MississippiForLLC(page,jsonData);
                            }
                        }
                        else if (entity_type == "CORP"){
                            const MississippiForCORPHandler = new MississippiForCORP();
                            return async () =>{
                                return await MississippiForCORPHandler.MississippiForCORP(page,jsonData);
                            }
                        }
                        case 'Nebraska':
                            if (entity_type == "LLC"){
                                const NebraskaForLLCHandler = new NebraskaForLLC();
                                return async () => {
                                    return await NebraskaForLLCHandler.NebraskaForLLC(page, jsonData); // Call the form handler method
                                }
                            }
                            else if (entity_type == "CORP"){
                                const NebraskaForCORPHandler = new NebraskaForCORP();
                                return async () => {
                                    return await NebraskaForCORPHandler.NebraskaForCORP(page, jsonData); // Call the form handler method
                                }
                            }
                            case 'Oklahoma':
                                if (entity_type == "LLC"){
                                    const OklahomaForLLCHandler = new OklahomaForLLC();
                                    return async () => {
                                        return await OklahomaForLLCHandler.OklahomaForLLC(page, jsonData); // Call the form handler method
                                    }
                                }
                                else if (entity_type == "CORP"){
                                    const OklahomaForCORPHandler = new OklahomaForCORP();
                                    return async () => {
                                        return await OklahomaForCORPHandler.OklahomaForCORP(page, jsonData); // Call the form handler method
                                    }
                                }
                                case 'Massachusetts':
                            if (entity_type == "LLC"){
                                const MassachusettsForLLCHandler = new MassachusettsForLLC();
                                return async () => {
                                    return await MassachusettsForLLCHandler.MassachusettsForLLC(page, jsonData); // Call the form handler method
                                }
                            }
                            else if (entity_type == "CORP"){
                                const MassachusettsForCORPHandler = new MassachusettsForCORP();
                                return async () => {
                                    return await MassachusettsForCORPHandler.MassachusettsForCORP(page, jsonData); // Call the form handler method
                                }
                    
                            }


                

                default:
                    logger.warn(`No handler found for state: ${state}`);
                    return null; // Return null if no form handler exists for the state
                }
        } catch (error) {
            logger.error(`Error in StateFormFactory for state ${state}:`, error.stack);
            throw error; // Re-throw the error for upstream handling
        }
    }
}


module.exports = StateFormFactory;


