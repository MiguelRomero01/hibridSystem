import { supabase } from "../../conectionDB.js"; // Importar Supabase correctamente

// Función para obtener datos de la tabla "usuario"
async function obtenerUsuarios() {
    let { data, error } = await supabase.from("USUARIO").select("*");

    if (error) {
        console.error("Error obteniendo datos:", error);
        return;
    }

    // Mostrar datos en la página
    const lista = document.getElementById("lista");
    lista.innerHTML = ""; // Limpiar lista antes de agregar
    data.forEach(user => {
        let li = document.createElement("li");
        li.textContent = `${user.Username}: ${user.password}`;
        lista.appendChild(li);
    });
}

// Hacer que la función esté accesible desde el navegador
window.obtenerUsuarios = obtenerUsuarios;
