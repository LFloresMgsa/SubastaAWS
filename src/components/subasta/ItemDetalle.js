import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import Modal from '@mui/material/Modal';
import { eventoService } from '../../services/evento.service';

import { storage } from "../../storage.js";



//import imagenes from '../../components/subasta/imagenes.js'

// Función para hacer la solicitud a la API
const obtenerDetalleEvento = async (pCab_cCatalogo, pDvm_cNummov) => {
    try {
        const body = { Accion: "EVENTO_DET", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Dvm_cNummov: pDvm_cNummov, Cab_cCatalogo: pCab_cCatalogo };

        const response = await eventoService.obtenerEventosDet(body);

        if (!response || response.length === 0) {
            throw new Error("Respuesta inválida de la API");
        }

        return response[0];

    } catch (error) {
        console.log(error);
        throw error; // Lanzar el error para que el componente lo pueda manejar
    }
};

const obtenerImagenes = async (pCab_cCatalogo, pDvm_cNummov) => {
    try {
        const body = { Accion: "BUSCARREGISTRO", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Dvm_cNummov: pDvm_cNummov, Cab_cCatalogo: pCab_cCatalogo };


        const response = await eventoService.obtenerCatalogoDetImagenes(body);

        if (!response || response.length === 0) {
            throw new Error("Respuesta inválida de la API");
        }

        return response[0];

    } catch (error) {
        console.log(error);
        throw error; // Lanzar el error para que el componente lo pueda manejar
    }
};

const ItemDetalle = (props) => {


    const [imagenesSlide, setImagenesSlide] = React.useState([]);
    const [detalle, setDetalleEvento] = React.useState([]);


    useEffect(() => {
        const fetchDetalleEvento = async (pCab_cCatalogo, pDvm_cNummov) => {
            const detalleEvento = await obtenerDetalleEvento(pCab_cCatalogo, pDvm_cNummov);



            setDetalleEvento(detalleEvento[0]);

        };

        fetchDetalleEvento(props.pCab_cCatalogo, props.pDvm_cNummov);

    }, []);


    useEffect(() => {



        //  console.log(detalle);
    }, [detalle]);


    const obtenerSubastaSlider = async () => {
        return await obtenerImagenes(props.pCab_cCatalogo, props.pDvm_cNummov).then(
            (res) => {

                setImagenesSlide(res)
                handleOpen()
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [isImageExpanded, setIsImageExpanded] = useState(false);

    const handleImageClick = () => {
        setIsImageExpanded(!isImageExpanded);
    };

    return (
        <div>

            <Paper
                sx={{
                    p: 2,
                    margin: 1,
                    maxWidth: 'auto',
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >

                <Grid container spacing={2}>
                    <Grid item >
                        <div >

                            <Grid container justify="center" alignItems="center">
                                <Grid item>
                                    <img

                                        src={`../../../${detalle.cab_cenlace}`}
                                        alt="Imagen"
                                        onClick={handleImageClick}
                                        style={{ width: '150px', height: 'auto' }}
                                    />
                                </Grid>
                                <Modal open={isImageExpanded} onClose={handleImageClick}>
                                    <img
                                        src={`../../../${detalle.cab_cenlace}`}
                                        alt="Imagen"
                                        onClick={handleImageClick}
                                        style={{
                                            cursor: 'pointer',
                                            width: isImageExpanded ? 'auto' : '150px',
                                            height: isImageExpanded ? '100vh' : 'auto',
                                        }}
                                    />
                                </Modal>
                            </Grid>
                        </div>

                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} >
                            <Grid item xs={12} lg={6}>
                                <Typography gutterBottom variant="subtitle1" component="div" align="left">

                                    <b>PUJAR POR N° {detalle.Placa}</b>

                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <b>PROPIETARIO</b>: {detalle.Propietario}

                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <b>PADRE:</b> {detalle.Padre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <b>MADRE:</b> {detalle.Madre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <b>EDAD:</b> {detalle.Info}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <b>DETALLE:</b> {detalle.Cab_cDescripcion}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <b>CODIGO:</b> {detalle.Cab_cCatalogo}
                                </Typography>                                
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <b>OBSERVACIONES:</b> {detalle.Cab_cObservaciones}
                                </Typography>

                            </Grid>

                        </Grid>
                        <Grid item xs={12} lg={6} >
                            <Typography variant="h6" component="div" color="primary">

                                <b>Precio Base : S/. {detalle.Dvd_nImporte}</b>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default ItemDetalle;
