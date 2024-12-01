export default function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Verifica si la cookie empieza con el nombre especificado
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1); // Devuelve el valor de la cookie
      }
    }
    return null; // Si no encuentra la cookie
  }
  