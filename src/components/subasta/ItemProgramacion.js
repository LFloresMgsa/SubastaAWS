import React, { Fragment, useState, useEffect, useLayoutEffect , useRef } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { eventoService } from '../../services/evento.service';
import ItemSubasta from '../../components/subasta/ItemSubasta';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import imagenes from '../../assets/images/imagenes';

import { storage } from "../../storage.js";

import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Itemprogramacion = (props) => {
    
  // Crea una referencia usando useRef para el elemento al que deseas desplazarte
  const elementToScroll = useRef(null);
  
  
    const [subastas, setSubastas] = React.useState([]);

    const obtenerEventoDetalle = async (pDvm_cNummov) => {
        let _body = { Accion: "EVENTO_DET", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Dvm_cNummov: pDvm_cNummov }

        

        return await eventoService.obtenerEventosDet(_body).then(

            (res) => {
                
                setSubastas(res[0])

            },
            (error) => {
                console.log(error);
            }
        );
    };

    const handleVerDetalle = async () => {
        obtenerEventoDetalle(props.Dvm_cNummov);
    }

    useEffect(() => {
        obtenerEventoDetalle(props.Dvm_cNummov);
    }, []);


     //Efecto para hacer scroll después de volver de la página2 de detalles
     useEffect(() => {
         if (cookies.get('PosImagen') && elementToScroll.current  ) {

             //alert(cookies.get('PosImagen'));

             const element = document.getElementById(cookies.get('PosImagen'));
             if (element) {
                elementToScroll.current.scrollIntoView({ behavior: 'smooth' });
             }

             cookies.remove('PosImagen', { path: "/" });
         }
     }, []);




    return (
        <div  >
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Calendar" src={imagenes[0].img} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.Dvm_cDescripcion}

                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >

                                </Typography>
                                {props.Dvm_cDescripcionSec}
                            </React.Fragment>
                        }

                    />
                </ListItem>
            </List>
            <div>.</div>

            <Button variant="contained" size="small" color="primary" onClick={handleVerDetalle}  >Actualizar Todas las Pujas</Button>
            <div>.</div>

            <Grid container spacing={1}>
                {subastas.map((subasta) => (



                    <Grid item xs={12} lg={3} key={`${subasta.Dvm_cNummov}-${subasta.Cab_cCatalogo}`}>

                        {/* <div ref={`${subasta.Dvm_cNummov}-${subasta.Cab_cCatalogo}`} > */}

                        <ItemSubasta key={subasta.Cab_cCatalogo} {...subasta} IndicePanel={props.IndicePanel} Per_cPeriodo={props.Per_cPeriodo} keyImagen={`${subasta.Dvm_cNummov}-${subasta.Cab_cCatalogo}`} />
                            
                        {/* </div> */}
                    </Grid>


                ))}
            </Grid>
        </div>
    );
};

export default Itemprogramacion;
