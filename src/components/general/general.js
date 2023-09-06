import { isValid } from 'date-fns';
import moment from 'moment';

export const general = {
    convertirFechaTextToIsoText,
  };


 function convertirFechaTextToIsoText(fecha) {
    // Dividir la fecha en día, mes y año
    var partes = fecha.split("/");
    var dia = partes[0];
    var mes = partes[1];
    var anio = partes[2];
  
    // Combinar las partes en el formato deseado
    var fechaFormateada = anio + "-" + mes + "-" + dia;
  
    // Devolver la fecha formateada
    return fechaFormateada;
  }