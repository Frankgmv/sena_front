import moment from 'moment/moment';

export const formateFecha = (fecha) => {
    return moment(fecha).format('DD-MM-YYYY')
}


export const getTodayDate = () => {
    const today = new Date();
    return moment(today).format('DD-MM-YYYY')
}

export const formateFechaGuion = (fecha) => {
    return moment(fecha).format('YYYY-MM-DD')
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,}$/

export const validarPassword = (password) => {
    return passwordRegex.test(password)
}


export function encontrarSeccionConMasElementos(datos) {
    let mayorCantidadElementos = 0;
    let seccionConMasElementos = "";
  
    for (const seccion in datos) {
      const seccionActual = datos[seccion];
      const cantidadElementos = seccionActual.length;
  
      if (cantidadElementos > mayorCantidadElementos) {
        mayorCantidadElementos = cantidadElementos;
        seccionConMasElementos = seccion;
      }
    }
  
    return seccionConMasElementos;
  }