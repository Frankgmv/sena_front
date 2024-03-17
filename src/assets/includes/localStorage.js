export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key) => {
    let data = localStorage.getItem(key)
    const datos = data ? JSON.parse(data) : ''
    return datos;
}

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}
