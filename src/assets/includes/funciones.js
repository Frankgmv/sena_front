import moment from 'moment/moment';
import { useEffect } from 'react';

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

export function handlerMessages(setState, message2) {

  setState((prevMessage) => {
    if (!prevMessage.includes(message2)) {
      let datos = [...prevMessage, message2];
      datos = new Set(datos);
      return [...datos]
    }
    return prevMessage;
  });

  setTimeout(() => {
    if (message2.length != 0) {
      setState([])
    }
  }, 5000)
}
