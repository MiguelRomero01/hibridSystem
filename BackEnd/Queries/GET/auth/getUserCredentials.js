import { supabase } from "../../conectionDB.js"; // Ajusta la ruta si es necesario

export async function GETuserCredentials(username) {
    let { data, error } = await supabase
        .from("usuario")
        .select("password")
        .eq("username", username)
        .single();

    if (error || !data) {
        console.error("Error obteniendo credenciales:", error);
        return null;
    }

    return data;
}

// Asegurémonos de que no hay un export default en el archivo.
