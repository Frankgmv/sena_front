export const formateFecha = (fecha) => {
    const fechaFormateada = new Date(fecha).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    return fechaFormateada
}