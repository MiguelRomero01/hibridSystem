import { POSTuserCredentials } from "../../../BackEnd/Queries/POST/auth/POSTuserCredentials.js";
import { hashPassword } from "../../../BackEnd/services/cryptPassword.js";

document.getElementById("formRegistro").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita el envío automático del formulario

    let username = document.getElementById("usuario").value;
    let password = document.getElementById("clave").value;
    let password2 = document.getElementById("clave_confirmacion").value;

    if (password === password2) {
        try {
            const hashedPassword = await hashPassword(password);
            console.log("Contraseña hasheada:", hashedPassword);

            const response = await POSTuserCredentials(username, hashedPassword);
            console.log("Usuario registrado con éxito:", response);

            // Redirige SOLO si el registro fue exitoso
            window.location.href = "../login/login.html"; 

        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    } else {
        console.error("Las contraseñas no coinciden.");
    }
});
