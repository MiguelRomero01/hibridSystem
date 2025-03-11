import { supabase } from "../../conectionDB.js";

export async function getMasterPassword(username){
     const { data, error } = await supabase
          .select("masterPassword")
          .from("masterPassword")
          .eq("FK_username", username);

          if (error || !data){
               console.log("error con los datos");
               return null;
          }

          return data;
}

