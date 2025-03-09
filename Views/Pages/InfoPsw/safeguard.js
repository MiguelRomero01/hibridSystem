import {POSTuserData} from "../../../BackEnd/Queries/POST/postUserData.js";

document.addEventListener("DOMContentLoaded", function() {
     const userData = sessionStorage.getItem("Usuario");

     if (userData) {
          console.log(JSON.parse(userData)); // Convertir a objeto antes de usarlo
     } else {
          alert("Usuario no encontrado");
     }
});

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
          const response = await POSTuserData(user.PK_userId, title, description, passwordToSave);
          console.log("Datos enviados con éxito:", response);
     } catch (error) {
          console.error("Error enviando los datos a postUserData:", error);
     }
});
