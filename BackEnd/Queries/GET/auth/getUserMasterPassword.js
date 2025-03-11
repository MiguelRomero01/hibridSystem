import { supabase } from "../../conectionDB.js";

export async function getMasterPa(username){
     const { data, error } = await supabase
          .select("masterPassword")
          .from("masterPassword")
          .eq("FK_userId", username);

          if (error || !data){
               console.log("error con los datos");
               return null;
          }

          return data;
}

