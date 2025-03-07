import { GETuserCredentials } from "/BackEnd/Queries/GET/auth/GETuserCredentials.js";



document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formLogin").addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita el envío automático del formulario
        console.log("Formulario enviado"); // Depuración

        let username = document.getElementById("Usuario").value.trim();
        let password = document.getElementById("Contraseña").value;

        if (!username || !password) {
            alert("Por favor, ingrese usuario y contraseña.");
            return;
        }

        try {
            // Obtener datos del usuario desde el backend
            const userData = await GETuserCredentials(username);

            if (!userData) {
                console.error("Usuario no encontrado.");
                alert("Usuario no encontrado. Verifique sus credenciales.");
                return;
            }

            // Obtener la contraseña hasheada desde la base de datos
            const hashedPassword = userData.password;

            // Usar bcrypt.compare() para verificar la contraseña
            const isMatch = await window.bcrypt.compare(password, hashedPassword);

            if (isMatch) {
                console.log("Inicio de sesión exitoso.");
                alert("Inicio de sesión exitoso.");


                // Redirigir al usuario a la página principal
                window.location.href = "../Pages/home/home.html";
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
