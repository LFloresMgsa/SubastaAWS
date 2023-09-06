import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import ItemCarousel from './ItemCarouselTienda';

import { eventoService } from '../../services/evento.service';

import { storage } from "../../storage.js";

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import imagenes from '../../assets/images/imagenes';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}


const ItemProgramacionTienda = (
    { alltiendas,
        allProducts,
        setAllProducts,
        countProducts,
        setCountProducts,
        total,
        setTotal }

) => {

    //const history = useHistory();
    const [tienda, setTienda] = React.useState([]);

    const [imagenesSlide, setImagenesSlide] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onAddProduct = async (product) => {

        onRecalcula();

        if (allProducts.find(item => item.Cab_cCatalogo === product.Cab_cCatalogo)) {
            const products = allProducts.map(item =>
                item.Cab_cCatalogo === product.Cab_cCatalogo
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + product.Dvd_nImporte * product.quantity);
            setCountProducts(countProducts + product.quantity);

            storage.SetStorageObj("Carrito", [...products]);
            // console.log(storage.GetStorageObj("Carrito"));

            return setAllProducts([...products]);
        }

        setTotal(total + product.Dvd_nImporte * product.quantity);
        setCountProducts(countProducts + product.quantity);

        setAllProducts([...allProducts, product]);

        storage.SetStorageObj("Carrito", [...allProducts, product]);
        //console.log(storage.GetStorageObj("Carrito"));
    };

    const obtenerSubastaSlider = async (pCab_cCatalogo) => {
        return await obtenerImagenes(pCab_cCatalogo).then(
            (res) => {

                setImagenesSlide(res)
                handleOpen()
            },
            (error) => {
                console.log(error);
            }
        );
    };


    const obtenerImagenes = async (pCab_cCatalogo) => {
        try {
            const body = { Accion: "BUSCARREGISTRO", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Cab_cCatalogo: pCab_cCatalogo };


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

    const obtenerTiendaDetalle = async (pDvm_cNummov) => {
        let _body = { Accion: "EVENTO_DET", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Dvm_cNummov: pDvm_cNummov }


        return await eventoService.obtenerEventosDet(_body).then(

            (res) => {

                setTienda(res[0]);
                //setAllProducts(res[0]);
            },
            (error) => {
                console.log(error);
            }
        );
    };


    function onRecalcula() {

        let countFila = 0;
        let totalFila = 0;

        for (let i = 0; i < allProducts.length; i++) {

            const nFila = allProducts[i];

            countFila = countFila + nFila.quantity;
            totalFila = totalFila + nFila.quantity * nFila.Dvd_nImporte;

        }
        countProducts = countFila;
        total = totalFila;

        setTotal(totalFila);
        setCountProducts(countFila);

        return countFila;
    };


    useEffect(() => {
        obtenerTiendaDetalle(alltiendas.Dvm_cNummov);
        setAllProducts(storage.GetStorageObj("Carrito"));
    }, []);

    useEffect(() => {
        onRecalcula();
    }, [allProducts]);

    //#region Validacion al presionar la tecloa f5
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 116) {
                event.preventDefault();
            }
        };

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // Necesario para que funcione en Chrome
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    //#endregion

    //#region Validacion Salir de ventana 
    const [isNavigating, setIsNavigating] = useState(false);

    const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = '';
    };

    const handleNavigation = (nextLocation) => {
        if (isNavigating) {
            return true; // Permitir navegación
        } else {

            // solo debe validar el cambio de pagina si el carrito tiene items y la pafina es diferente de finalizart compra
            if (allProducts.length > 0 && nextLocation.pathname != "/FinalizarCompra") {
                // Mostrar la alerta de confirmación



                const confirmed = window.confirm('¿Seguro que quieres abandonar esta página? Puede perderse el Carrito.');
                if (confirmed) {
                    setIsNavigating(true);
                    window.removeEventListener('beforeunload', handleBeforeUnload);
                    return true; // Permitir navegación
                } else {
                    return false; // Cancelar la navegación
                }
            }


        }
    };

    React.useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    //#endregion

    return (
        <div>
            <Prompt when={!isNavigating} message={handleNavigation} />

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Calendar" src={imagenes[0].img} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={alltiendas.Dvm_cDescripcion}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >

                                </Typography>
                                {`Inicio : ${alltiendas.Dvm_dInicio} - Termino: ${alltiendas.Dvm_dFin}`}

                            </React.Fragment>
                        }
                    />
                </ListItem>

            </List>
            <Box sx={{ width: '100%' }}>

                <Grid container spacing={1}>
                    {tienda.map((item) => (
                        <Grid item xs={6} lg={3} key={`${item.Emp_cCodigo}-${item.Pan_cAnio}-${item.Dvm_cNummov}-${item.Cab_cCatalogo}`}>
                            <Paper
                                sx={{
                                    p: 1,
                                    margin: 0.5,
                                    maxWidth: 'auto',
                                    flexGrow: 1,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                }}
                            >
                                <ImageListItem key={`${item.Emp_cCodigo}-${item.Dvm_cNummov}-${item.cab_cenlace}`}>

                                    <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                            <ButtonBase sx={{ width: '100%' }} >
                                                <Img alt="complex" src={item.cab_cenlace}
                                                    onClick={() => obtenerSubastaSlider(item.Cab_cCatalogo)} />
                                                <Modal
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>

                                                        <ItemCarousel images={imagenesSlide} />

                                                    </Box>
                                                </Modal>
                                            </ButtonBase>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <p><br /></p>
                                        </Grid>


                                        <Grid item xs={12}>
                                            <ul>
                                                <li><b>Codigo:</b>{item.Cab_cCatalogo}</li>
                                                <li><p><b>Nombre:</b> {item.Cab_cDescripcion}</p></li>

                                                <li><p><b>Placa:</b> {item.Placa}</p></li>
                                                <li><p><b>Propietario</b>: {item.Propietario}</p></li>
                                                {/* <li><p><b>Padre:</b> {item.Padre}</p></li>
                                            <li><p><b>Madre:</b> {item.Madre}</p></li> */}
                                                <li><p><b>Info:</b> {item.Info}</p></li>
                                                <li><p><b>Precio:</b> S/. {ccyFormat(item.Dvd_nImporte)}</p></li>
                                            </ul>


                                        </Grid>
                                        <Grid item xs={12}>
                                            <p><br /></p>
                                        </Grid>
                                        <Grid item xs={12} alignContent={"end"}>
                                            <Button variant="contained" size="small" color="primary" onClick={() => onAddProduct(item)}  >Agregar Carrito</Button>
                                        </Grid>
                                    </Grid>

                                </ImageListItem>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

            </Box>

        </div >
    );
};

export default ItemProgramacionTienda;
