import { supabase } from "../../conectionDB.js";

export async function POSTuserCredentials(username, password) {
     const { data, error } = await supabase
          .from("usuario")
          .insert([{ username: username, password: password }]); 

     if (error) {
          console.error("Error al registrar usuario:", error); 
     } else {
          console.log("Usuario registrado:", data); 
     }
}

