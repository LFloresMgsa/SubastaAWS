import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ItemProgramacion from '../components/subasta/ItemProgramacion';
import { eventoService } from '../services/evento.service';
import { storage } from "../storage.js";
import Typography from '@material-ui/core/Typography';




const SubastaStyled = styled('div')(
  ({ theme }) => css`
    width:100%;
    background-color:grey;
    height:20px;

    .subasta-item {
    }
  `
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {

  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Subasta = (props) => {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [subastasActual, setSubastasActual] = React.useState([]);
  const [subastasProximas, setSubastasProximas] = React.useState([]);
  const [subastasCerradas, setSubastasCerradas] = React.useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());

    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };


  const obtenerSubastaactual = async () => {
    let _body = { Accion: "EVENTOABIERTO", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio") }

    console.log('obtenerSubastaactual');

    return await eventoService.obtenerEventosCab(_body).then(
      (res) => {
        setSubastasActual(res[0]);
      },
      (error) => {
        console.log(error);
      }
    );


  };

  useEffect(() => {

    obtenerSubastaactual();

  }, []);


  return (

    <Box sx={{ p: 2, width: '100%' }}>

      {/* <h3>Subasta</h3> */}
      <Typography variant="h6" component="h3">
        <p>Subasta hora actual: {currentTime.toLocaleTimeString(undefined, options)}</p>
      </Typography>
      {subastasActual.map((subastaactual, index) => (
        <ItemProgramacion key={index} {...subastaactual} IndicePanel="0" />
      ))}

    </Box>

  );
};

export default Subasta;

