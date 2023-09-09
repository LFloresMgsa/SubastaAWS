import axios from 'axios';


import { Try } from '@mui/icons-material';
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

export const eventoService = {
  obtenerEventosCab,
  obtenerEventosDet,
  obtenerEventosDetPuja,
  obtenerCatalogoDetImagenes,
  obtenerVideos,
  obtenerCatalogo,
  obtenerImagenes,
  obtenerUsuario,
  obtenerToken,
  obtenerPedidoCab,
  obtenerPedidoDet,
  GrabarPedido,
  horaservidor,

  obtenerEventosCabAuth,
  obtenerEventosDetAuth,
  obtenerEventosDetPujaAuth,
  obtenerCatalogoDetImagenesAuth,
  obtenerVideosAuth,
  obtenerCatalogoAuth,
  obtenerPedidoCabAuth,
  obtenerPedidoDetAuth,
  obtenerAccesosAuth,
  actualizaPedidoAuth

};

// SERVICIOS SIN AUTORIZACION

function GrabarPedido(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/FinalizarCompra`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

// SERVICIOS SIN AUTORIZACION
function obtenerEventosCab(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/vtm_evento';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}
 
function obtenerEventosDet(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/vtd_evento';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerPedidoCab(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/vtm_pedido';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerPedidoDet(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/vtd_pedido';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerEventosDetPuja(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/vtd_evento_puja';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerCatalogoDetImagenes(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/lgd_catalogo_imagenes';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerCatalogo(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/lgm_catalogo_bs';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerVideos(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/lgn_videoteca';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerImagenes(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/lgm_imagenes';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerUsuario(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/sgm_usuarios';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerToken(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function horaservidor(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/time`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}


// SERVICIOS CON AUTORIZACION

function obtenerEventosCabAuth(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/vtm_evento';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerEventosDetAuth(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/vtd_evento';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerEventosDetPujaAuth(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/vtd_evento_puja';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerCatalogoDetImagenesAuth(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/lgd_catalogo_imagenes';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerCatalogoAuth(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/lgm_catalogo_bs';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerVideosAuth(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/lgn_videoteca';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerPedidoCabAuth(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/vtm_pedido';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerPedidoDetAuth(dataJson) {
  const apiUrl = 'https://fq2f3c40a4.execute-api.us-east-2.amazonaws.com/dev/vtd_pedido';
  const headers = authHeader();
  return axios.post(apiUrl, dataJson, { headers }).then(res => 
      res.data
    )
    .catch(error => {
      console.error('Error al hacer la solicitud:' + apiUrl, error);
    });
}

function obtenerAccesosAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/lgt_accesos/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function actualizaPedidoAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/vtm_pedido_estados/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

