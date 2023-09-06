import { store } from '../store';
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

export const videotecaService = {
  obtenerGAllos,
};

// function obtenergallos() {
//   // tu trabajo
//     const options = { headers: authheader() };
//     const params = {};
//     const url = `localhost:80/obtenerGallos}`;
//     return fetch.get(url, params, options).then(handleresponse);
// }

function obtenerGAllos() {
  let gallosArray = [
    {id:1,nombre: "Edwin", imagen :"https://random.imagecdn.app/500/350"},
    {id:2, nombre: "Dany", imagen :"https://random.imagecdn.app/500/351"},
    {id:3, nombre: "Luis", imagen :"https://random.imagecdn.app/500/352"}
  ]

  const gallos = Promise.resolve(gallosArray);
  return gallos;
}



