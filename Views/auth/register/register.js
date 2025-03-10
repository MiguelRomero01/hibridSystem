document.getElementById("formRegistro").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita el envío automático del formulario

    let username = document.getElementById("usuario").value;
    let password = document.getElementById("clave").value;
    let password2 = document.getElementById("clave_confirmacion").value;
    let masterPassword = document.getElementById("clave_maestra").value;

    const MASTER_PASSWORD = "12345"; // Cambia esto por la contraseña maestra real

    if (masterPassword !== MASTER_PASSWORD) {
        console.error("Contraseña maestra incorrecta.");
        alert("Contraseña maestra incorrecta.");
        return;
    }

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
        alert("Las contraseñas no coinciden.");
    }
});
