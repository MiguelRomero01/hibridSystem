import { supabase } from '../conectionDB.js';

export async function POSTuserData(userId, title, password, description) {
     const { data, error } = await supabase
          .from("contraseñas")
          .insert([{ 
               FK_userId: userId,
               title: title, 
               password: password, 
               description: description 
          }]);

     if (error) {
          console.error("Error al insertar datos:", error.message);
          return null;
     }

     return data;
}
