import {POSTuserData} from "../../../BackEnd/Queries/POST/postUserData.js";
import { secretKey } from "../../../env.js";

document.getElementById('saveguard-form').addEventListener("submit", async function (event) {
     event.preventDefault();
     const userData = sessionStorage.getItem("Usuario"); 

     if (!userData) {
          alert("No se encontró la información del usuario en la sesión.");
          return;
     }

     const user = JSON.parse(userData); // Convertir a objeto JSON
     
     let title = document.getElementById("titulo").value;
     let description = document.getElementById("descripcion").value;
     let passwordToSave = document.getElementById("password").value;

     try {
          const titleEncrypted = CryptoJS.AES.encrypt(title, secretKey).toString();
          const descriptionEncrypted = CryptoJS.AES.encrypt(description, secretKey).toString();
          const passwordToSaveEncrypted = CryptoJS.AES.encrypt(passwordToSave, secretKey).toString();

          //NO BORRAR: DESENCRIPTAR LOS MENSAJE
          //-----------------------------------
          // const bytes = CryptoJS.AES.decrypt(titleEncrypted, secretKey);
          // const bytes2 = CryptoJS.AES.decrypt(descriptionEncrypted, secretKey);
          // const bytes3 = CryptoJS.AES.decrypt(passwordToSaveEncrypted, secretKey);

          // const decryptmsg = bytes.toString(CryptoJS.enc.Utf8);
          // const decryptmsg2 = bytes2.toString(CryptoJS.enc.Utf8);
          // const decryptmsg3 = bytes3.toString(CryptoJS.enc.Utf8);

          const response = await POSTuserData(user.PK_userId, titleEncrypted, descriptionEncrypted, passwordToSaveEncrypted);
          console.log("Datos enviados con éxito:", response);
     } catch (error) {
          console.error("Error enviando los datos a postUserData:", error);
     }
});
