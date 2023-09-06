import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Tienda from './views/Tienda';
import Videoteca from './views/Videoteca';
import Subasta from './views/Subasta';
import Ganadores from './views/Ganadores';
import Topes from './views/Topes';

import Bases from './views/Bases';
import SubastaDetalle from './views/SubastaDetalle';
import MantCatalogo from './views/MantCatalogo';
import MantCatalogoImagenes from './views/MantCatalogoImagenes';
import MantVideoteca from './views/MantVideoteca';
import MantEvento from './views/MantEvento';
import MantEventoDet from './views/MantEventoDet';
import MantEventoPuja from './views/MantEventoPuja';

import Login from './views/Login';
import Logout from './views/Logout';


import CreaCatalogo from './components/mantenimientos/Catalogo/CreaCatalogo';
import EditaCatalogo from './components/mantenimientos/Catalogo/EditaCatalogo';
import CreaCatalogoImagenes from './components/mantenimientos/CatalogoImagenes/CreaCatalogoImagenes';
import EditaCatalogoImagenes from './components/mantenimientos/CatalogoImagenes/EditaCatalogoImagenes';
import CreaVideoteca from './components/mantenimientos/Videoteca/CreaVideoteca';
import EditaVideoteca from './components/mantenimientos/Videoteca/EditaVideoteca';
import CreaEvento from './components/mantenimientos/Evento/CreaEvento';
import EditaEvento from './components/mantenimientos/Evento/EditaEvento';
import CreaEventoDet from './components/mantenimientos/EventoDet/CreaEventoDet';
import EditaEventoDet from './components/mantenimientos/EventoDet/EditaEventoDet';
import CreaEventoDetPuja from './components/mantenimientos/EventoPuja/CreaEventoPuja';
import EditaEventoDetPuja from './components/mantenimientos/EventoPuja/EditaEventoPuja';
import MantPedido from './views/MantPedido';


import FinalizarCompra from './components/tienda/FinalizarCompra';


const AppRoutes = (props) => {
  const { accessToken, currentUser } = props;

  return (
    <Switch>

      <Route exact path="/">
        <Redirect to="/subasta" />
      </Route>

      <Route exact path="/subasta.html">
        <Redirect to="/subasta" />
      </Route>

      <Route exact path="/index.html">
        <Redirect to="/subasta" />
      </Route>

      <Route
        path="/inicio"
        render={(route) => <Dashboard {...props} {...route} />}
      />
      <Route
        path="/tienda"
        render={(route) => <Tienda {...props} {...route} />}
      />
      <Route
        path="/videoteca"
        render={(route) => <Videoteca {...props} {...route} />}
      />
      <Route
        exact
        path="/subasta"
        render={(route) => <Bases {...props} {...route} />}
      />

      <Route
        exact
        path="/pujas"
        render={(route) => <Subasta {...props} {...route} />}
      />

      <Route
        exact
        path="/ganadores"
        render={(route) => <Ganadores {...props} {...route} />}
      />

      <Route
        exact
        path="/topes"
        render={(route) => <Topes {...props} {...route} />}
      />


      <Route
        exact
        path="/MantCatalogo"
        render={(route) => <MantCatalogo {...props} {...route} />}
      />

      <Route
        exact
        path="/MantCatalogoImagenes"
        render={(route) => <MantCatalogoImagenes {...props} {...route} />}
      />

      <Route
        exact
        path="/MantVideoteca"
        render={(route) => <MantVideoteca {...props} {...route} />}
      />

      <Route
        exact
        path="/MantEvento"
        render={(route) => <MantEvento {...props} {...route} />}
      />

      <Route
        exact
        path="/MantEventoDet"
        render={(route) => <MantEventoDet {...props} {...route} />}
      />

      <Route
        exact
        path="/MantEventoPuja"
        render={(route) => <MantEventoPuja {...props} {...route} />}
      />

      <Route
        exact
        path="/MantPedido"
        render={(route) => <MantPedido {...props} {...route} />}
      />


      <Route
        exact
        path="/Login"
        render={(route) => <Login {...props} {...route} />}
      />


      <Route
        exact
        path="/Logout"
        render={(route) => <Logout {...props} {...route} />}
      />

      <Route
        exact
        path="/FinalizarCompra"
        render={(route) => <FinalizarCompra {...props} {...route} />}
      />


      <Route
        exact
        path="/subasta/detalle/:Cab_cCatalogo/:Dvm_cNummov/:IndicePanel/:Per_cPeriodo"
        render={(route) => <SubastaDetalle {...props} {...route} />}
      />

      <Route
        path="/crear"
        render={(route) => <CreaCatalogo {...props} {...route} />}
      />

      <Route
        path="/editar/:Emp_cCodigo/:Cab_cCatalogo"
        render={(route) => <EditaCatalogo {...props} {...route} />}
      />

      <Route
        path="/crearcatalogoimagenes"
        render={(route) => <CreaCatalogoImagenes {...props} {...route} />}
      />

      <Route
        path="/editarcatalogoimagenes/:Emp_cCodigo/:Cab_cCatalogo/:Cab_nItem"
        render={(route) => <EditaCatalogoImagenes {...props} {...route} />}
      />

      <Route
        path="/crearvideoteca"
        render={(route) => <CreaVideoteca {...props} {...route} />}
      />

      <Route
        path="/editarvideoteca/:Emp_cCodigo/:Lgt_nIndice"
        render={(route) => <EditaVideoteca {...props} {...route} />}
      />

      <Route
        path="/crearevento"
        render={(route) => <CreaEvento {...props} {...route} />}
      />

      <Route
        path="/editarevento/:Emp_cCodigo/:Pan_cAnio/:Per_cPeriodo/:Dvm_cNummov"
        render={(route) => <EditaEvento {...props} {...route} />}
      />

      <Route
        path="/creareventodet"
        render={(route) => <CreaEventoDet {...props} {...route} />}
      />

      <Route
        path="/editareventodet/:Emp_cCodigo/:Pan_cAnio/:Per_cPeriodo/:Dvm_cNummov/:Cab_cCatalogo"
        render={(route) => <EditaEventoDet {...props} {...route} />}
      />

      <Route
        path="/creareventodetpuja"
        render={(route) => <CreaEventoDetPuja {...props} {...route} />}
      />

      <Route
        path="/editareventodetpuja/:Emp_cCodigo/:Pan_cAnio/:Per_cPeriodo/:Dvm_cNummov/:Cab_cCatalogo/:Dvd_nCorrel"
        render={(route) => <EditaEventoDetPuja {...props} {...route} />}
      />

    </Switch>
  );

};

export default AppRoutes;
