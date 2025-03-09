
document.addEventListener("DOMContentLoaded", function() {
     const userData = sessionStorage.getItem("Usuario");

     if(userData){
          console.log(userData);
     }else{
          alert("usuario no encontrado");
     }
});