import { supabase } from "../../conectionDB.js";

export async function GETuserCredentials(username) {
    let { data, error } = await supabase
        .from("usuario")
        .select("PK_userId, username, password")
        .eq("username", username)
        .single();

    if (error || !data) {
        console.error("Error obteniendo credenciales:", error);
        return null;
    }

    return data;
}

