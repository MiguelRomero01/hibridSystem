import { supabase } from "../../conectionDB.js";

export async function POSTMasterPassword(username, password){
     const { data, error } = await supabase
          .from("masterPassword")
          .insert([{
               FK_username: username,
               password: password,
          }]);

     if (error){
          console.log("Error al insertar datos", +error.message)
          return null;
     }

     return data;
}