import { GETuserCredentials } from "/BackEnd/Queries/GET/auth/GETuserCredentials.js";

// Verificar que bcrypt esté cargado
if (typeof window.bcrypt === "undefined") {
    console.error("❌ bcrypt no está disponible. Asegúrate de incluirlo en el HTML.");
} else {
    console.log("✅ bcrypt cargado correctamente.");
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof window.bcrypt === "undefined") {
        console.warn("⚠ bcrypt no está en window. Intentando cargarlo manualmente.");
        window.bcrypt = dcodeIO.bcrypt;
    }

    if (window.bcrypt) {
        console.log("✅ bcrypt ahora está disponible.");
    } else {
        console.error("❌ No se pudo cargar bcrypt.");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formLogin").addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("Formulario enviado");

        let username = document.getElementById("Usuario").value.trim();
        let password = document.getElementById("Contraseña").value;

        if (!username || !password) {
            alert("Por favor, ingrese usuario y contraseña.");
            return;
        }

        try {
            const userData = await GETuserCredentials(username);

            if (!userData || !userData.password) {
                alert("Usuario no encontrado. Verifique sus credenciales.");
                return;
            }

            const hashedPassword = userData.password;

            // Validar que bcrypt esté disponible
            if (!window.bcrypt) {
                alert("Error interno. Intente de nuevo.");
                return;
            }

            // Comparar contraseña
            const isMatch = await window.bcrypt.compare(password, hashedPassword);

            if (isMatch) {
                sessionStorage.setItem("Usuario", JSON.stringify(userData)) //guardar en el almacenamiento local el usuario
                alert("Inicio de sesión exitoso.");
                window.location.href = "/Views/Pages/home/home.html";
            } else {
                alert("Contraseña incorrecta.");
            }
        } catch (error) {
            alert("Hubo un error en el sistema. Intente de nuevo.");
        }
    });
});
