import { AppSource } from "./config/ormconfig";

export const checkConnection =async()=>{
    try{
       await AppSource.initialize();
       console.log("DataSource Initialization Succesfully");
      }
    catch(error){
      console.log("Error During DataSource Initialization",error);
      }
}

