import { supabase } from "../conectionDB";

export async function GETuserData(userId){
     let {data, error} = await supabase
          .from("contraseñas")
          .select("title, password, description")
          .eq("FK_userId", userId)

     if (error || !data){
          console.log("Error obteniendo datos", error);
          return null
     }

     return data;
}