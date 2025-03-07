import { supabase } from "../../conectionDB.js"; // Importa el cliente de Supabase

// Función para obtener datos de la tabla "USUARIO"
export async function obtenerUsuarios() {
    let { data, error } = await supabase.from("usuario").select("*");

    if (error) {
        console.error("Error obteniendo datos:", error);
        return;
    }

    const lista = document.getElementById("lista");
    lista.innerHTML = ""; // Limpiar lista antes de agregar

    data.forEach(user => {
        let li = document.createElement("li");
        li.textContent = `${user.username}: ${user.password}`;
        lista.appendChild(li);
    });
}

// Hacer que la función esté accesible en el navegador
window.obtenerUsuarios = obtenerUsuarios;
