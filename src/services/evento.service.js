
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
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/vtm_evento`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerEventosDet(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/vtd_evento`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerPedidoCab(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/vtm_pedido`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerPedidoDet(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/vtd_pedido`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}


function obtenerEventosDetPuja(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/vtd_evento_puja`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerCatalogoDetImagenes(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/lgd_catalogo_imagenes`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerCatalogo(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/lgm_catalogo_bs`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerVideos(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/lgm_videoteca`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerImagenes(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/lgm_imagenes`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}


function obtenerUsuario(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/sgm_usuarios`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
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
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/vtm_evento/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerEventosDetAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/vtd_evento/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerEventosDetPujaAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/vtd_evento_puja/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerCatalogoDetImagenesAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/lgd_catalogo_imagenes/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerCatalogoAuth(dataJson) {

  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/lgm_catalogo_bs/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerVideosAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/lgm_videoteca/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerPedidoCabAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/vtm_pedido/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerPedidoDetAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/evento/vtd_pedido/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
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

