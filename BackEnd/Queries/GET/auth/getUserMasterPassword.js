import { supabase } from "../../conectionDB.js";

export async function getMasterPassword(username) {
    const { data, error } = await supabase
        .from("masterPassword") 
        .select("password")       
        .eq("FK_username", username)
        .single(); // Retorna un solo registro

    if (error || !data) {
        console.log("Error obteniendo la contraseña maestra", error);
        return null;
    }

    return data.password; // Retorna solo la contraseña maestra
}
