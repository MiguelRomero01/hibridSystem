import { GETuserData } from "../../../BackEnd/Queries/GET/getUserData.js";
import { getMasterPassword } from "../../../BackEnd/Queries/GET/auth/getUserMasterPassword.js";
import { secretKey } from "../../../env.js";

//verifica la contraseña maestra de la DB vs la contraseña maestra que puso el usuario
//nota: se debe comparar (como lo hizo en el login)
async function verifyPassword(){
     let masterPassword = document.getElementById('master-password').value;
     try{
          const masterPasswordData = await getMasterPassword(userData.usernme)
          if(masterPassword === masterPasswordData){
               alert("contraseñas coinciden")
               //redirigir al apartado donde se mostrará la informacion de la base de datos desencriptada
          }else{
               alert("contraseñas no coincide")
          }
     }catch(error){
          console.log("error en masterpassword"+ error)
     }
     //hideMasterPasswordDialog();
}

document.addEventListener("DOMContentLoaded", async function() {
     //obtiene el usuario registrado actual. sus datos estan guardados en un almacenamiento local, por lo que si se cierra la pestaña se borran
     const user = sessionStorage.getItem("Usuario");
     console.log(user)

     if (!user) {
          alert("No se encontró la información del usuario en la sesión.");
          return;
     }
     const userData = JSON.parse(user); // Convertir a objeto JSON

     try{
          const data = await GETuserData(userData.PK_userId) //trae la informacion de las contraseñas (titulo, contraseña, descripcion. todo lo hace con respecto al id del usaurio que se le pasa, es decir, el que esta almacenado localmente )

          //comienza la desencriptacion de los datos
          const byteTitle = CryptoJS.AES.decrypt(data.title, secretKey);
          const bytePassword = CryptoJS.AES.decrypt(data.password, secretKey);
          const byteDescription = CryptoJS.AES.decrypt(data.description, secretKey);

          //finaliza la desencriptacion de los datos almacenados del usuario
          const decryptTitle = byteTitle.toString(CryptoJS.enc.Utf8);
          const decryptPassword = bytePassword.toString(CryptoJS.enc.Utf8);
          const decryptDescription = byteDescription.toString(CryptoJS.enc.Utf8);

          //muestra si los desencripta bien
          console.log("dT "+ decryptTitle)
          console.log("dP "+ decryptPassword)
          console.log("dD "+ decryptDescription)
     }catch(error){
          console.error("error", error)
     }
});
