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
            console.log("Intentando obtener credenciales para:", username);

            const userData = await GETuserCredentials(username);
            console.log("Datos del usuario obtenidos:", userData);

            if (!userData || !userData.password) {
                console.error("Usuario no encontrado o sin contraseña.");
                alert("Usuario no encontrado. Verifique sus credenciales.");
                return;
            }

            const hashedPassword = userData.password;
            console.log("Contraseña obtenida de la BD:", hashedPassword);

            // Validar que bcrypt esté disponible
            if (!window.bcrypt) {
                console.error("bcrypt no está disponible.");
                alert("Error interno. Intente de nuevo.");
                return;
            }

            // Comparar contraseña
            const isMatch = await window.bcrypt.compare(password, hashedPassword);
            console.log("¿La contraseña coincide?:", isMatch);

            if (isMatch) {
                console.log("Inicio de sesión exitoso.");
                alert("Inicio de sesión exitoso.");
                window.location.href = "/FrontEnd/Pages/home/home.html";

                

            } else {
                console.error("Contraseña incorrecta.");
                alert("Contraseña incorrecta.");
            }
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            alert("Hubo un error en el sistema. Intente de nuevo.");
        }
    });
});
