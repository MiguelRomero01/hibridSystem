import { GETuserData } from "../../../BackEnd/Queries/GET/getUserData.js";
import { getMasterPassword } from "../../../BackEnd/Queries/GET/auth/getUserMasterPassword.js";
import { secretKey } from "../../../env.js";

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
console.log(typeof bcrypt);


let savedPasswords = []; // Almacenará los datos encriptados

document.addEventListener("DOMContentLoaded", async function () {
    const user = sessionStorage.getItem("Usuario");

    if (!user) {
        alert("No se encontró la información del usuario en la sesión.");
        return;
    }

    const userData = JSON.parse(user);
    const passwordList = document.querySelector(".container ul"); // Lista donde se mostrarán las contraseñas

    try {
        const data = await GETuserData(userData.PK_userId); // Obtiene las contraseñas y descripciones de la BD

        if (!data || data.length === 0) {
            passwordList.innerHTML = "<li>No hay contraseñas guardadas.</li>";
            return;
        }

        passwordList.innerHTML = ""; // Limpia la lista antes de agregar elementos
        savedPasswords = data; // Guarda los datos encriptados para usarlos después

        // Crea una lista con "Contraseña 1", "Contraseña 2", etc.
        data.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Contraseña ${index + 1}`;
            listItem.onclick = () => showMasterPasswordDialog(index); // Pide la contraseña maestra al hacer clic
            passwordList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error obteniendo las contraseñas:", error);
    }
});

// Función para mostrar el cuadro de contraseña maestra
function showMasterPasswordDialog(index) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("master-password-dialog").style.display = "block";

    // Asigna la verificación al botón
    document
        .getElementById("verify-password-btn")
        .addEventListener("click", () => verifyMasterPassword(index), { once: true });
}

// Oculta el cuadro de diálogo
function hideMasterPasswordDialog() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("master-password-dialog").style.display = "none";
}

async function verifyMasterPassword(index) {
     let masterPasswordInput = document.getElementById("master-password").value;
     const user = sessionStorage.getItem("Usuario");
 
     if (!user) {
         alert("No se encontró la información del usuario en la sesión.");
         return;
     }
 
     const userData = JSON.parse(user);
 
     try {
         const storedMasterPassword = await getMasterPassword(userData.username); // Obtiene el hash bcrypt de la BD
 
         // Compara la contraseña ingresada con el hash de la BD
         const isMatch = await bcrypt.compare(masterPasswordInput, storedMasterPassword);
 
         if (isMatch) {
             alert("Contraseña maestra verificada. Mostrando detalles...");
 
             // Desencripta la contraseña y la descripción
             const encryptedPassword = savedPasswords[index].password;
             const encryptedDescription = savedPasswords[index].description;
 
             const bytePassword = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
             const byteDescription = CryptoJS.AES.decrypt(encryptedDescription, secretKey);
 
             const decryptedPassword = bytePassword.toString(CryptoJS.enc.Utf8);
             const decryptedDescription = byteDescription.toString(CryptoJS.enc.Utf8);
 
             // Mostrar datos desencriptados
             document.querySelectorAll(".container ul li")[index].innerHTML = 
                 `<strong>Contraseña:</strong> ${decryptedDescription}<br>
                  <strong>Descripción:</strong> ${decryptedPassword}`;
 
         } else {
             alert("Contraseña maestra incorrecta.");
         }
     } catch (error) {
         console.log("Error verificando la contraseña maestra: " + error);
     }
 
     hideMasterPasswordDialog();
 }
 
 