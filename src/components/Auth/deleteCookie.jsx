export default function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}