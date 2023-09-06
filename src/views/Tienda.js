import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ItemProgramacionTienda from '../components/tienda/ItemProgramacionTienda';
import { eventoService } from '../services/evento.service';

import { Header } from '../components/tienda/Header';
import { storage } from "../storage.js";

import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';


const Tienda = (props) => {

  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);


  const [tiendaActual, setTiendaActual] = React.useState([]);

  const obtenerTiendaActual = async () => {
    let _body = { Accion: "TIENDAABIERTA", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio") }


    return await eventoService.obtenerEventosCab(_body).then(
      (res) => {
        setTiendaActual(res[0]);
      },
      (error) => {
        console.log(error);
      }
    );


  };


  useEffect(() => {

    obtenerTiendaActual();

  }, []);

  return (
    <div>

      <Header
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />

      <Box sx={{ width: '100%' }}>
      <h3>Tienda</h3>

        {tiendaActual.map((item, index) => (
          <ItemProgramacionTienda key={index} {...item} IndicePanel="0"

            alltiendas={item}

            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts} />

        ))}
      </Box>
    </div>
  );
};

export default Tienda;

