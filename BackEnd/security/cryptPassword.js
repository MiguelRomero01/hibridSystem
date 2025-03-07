export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    try {
      // Verificar que bcrypt esté disponible
      if (typeof dcodeIO !== "undefined" && dcodeIO.bcrypt) {
        const saltRounds = 10;
        dcodeIO.bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) reject(err);
          else resolve(hash);
        });
      } 
      else {
        reject(new Error("La biblioteca bcrypt no está disponible"));
      }
    } catch (e) {
      reject(e);
    }
  });
}
