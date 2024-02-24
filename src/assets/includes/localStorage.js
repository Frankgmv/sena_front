export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key) => {
    let data = localStorage.getItem(key)
    return JSON.parse(data);
}

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}
