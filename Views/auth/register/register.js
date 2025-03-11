import { POSTMasterPassword } from "../../../BackEnd/Queries/POST/auth/POSTMasterPassword.js";
import { POSTuserCredentials } from "../../../BackEnd/Queries/POST/auth/POSTuserCredentials.js";
import { hashPassword } from "../../../BackEnd/services/cryptPassword.js";

document.getElementById("formRegistro").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita el envío automático del formulario

    let username = document.getElementById("usuario").value;
    let password = document.getElementById("clave").value;
    let password2 = document.getElementById("clave_confirmacion").value;
    let masterPassword = document.getElementById("clave_maestra").value;

    if (password === password2) {
        try {
            const hashedPassword = await hashPassword(password);
            await POSTuserCredentials(username, hashedPassword);

            const hashedMasterPassword = await hashPassword(masterPassword)
            await POSTMasterPassword(username, hashedMasterPassword)
            
            //redirige SOLO si las credenciales fueron creadas adecuadamente
            window.location.href = "../login/login.html"; 

        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    } 
});
