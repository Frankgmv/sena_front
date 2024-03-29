export const formateFecha = (fecha) => {
    const fechaFormateada = new Date(fecha).toLocaleDateString("en-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    return fechaFormateada
}


export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = String(today.getMonth() + 1);
    let day = String(today.getDate());

    month = month.length === 1 ? `0${month}` : month;
    day = day.length === 1 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
}

export const formateFechaGuion = (fecha) => {
    const fechaEntrada = new Date(fecha).toLocaleDateString("en-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });

    const fechaPartes = fechaEntrada.split("/");
    let month = fechaPartes[0].length === 1 ? `0${fechaPartes[0]}` : fechaPartes[0];
    let day = fechaPartes[1].length === 1 ? [`0`, `${fechaPartes[1]}`].join('') : fechaPartes[1];

    const fechaReordenada = [fechaPartes[2], month, day];
    const fechaFormateada = fechaReordenada.join("-");

    return fechaFormateada;
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,}$/

export const validarPassword = (password) => {
    return passwordRegex.test(password)
}
