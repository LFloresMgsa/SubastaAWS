import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';

import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

//import Button from '@mui/material/Button';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { eventoService } from '../../../services/evento.service';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';


const useStyles = makeStyles({
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


const EditaEventoPuja = (props) => {

    const classes = useStyles();

    const history = useHistory()
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])



    const [Dvd_cDocID, setDocID] = useState('')
    const [Dvd_cNombres, setNombre] = useState('')
    const [Dvd_cApellidos, setApellido] = useState('')
    const [Dvd_cTelefono, setTelefono] = useState('')
    const [Dvd_cCorreo, setCorreo] = useState('')
    const [Dvd_nImporte, setImporte] = useState('')
    const [Dvd_cEstado, setEstado] = useState('')
    const [Dvd_dFechaPuja, setFecha] = useState(new Date());
    const [Dvd_cComentario, setComentario] = useState('')
    const [Dvd_dFechaModificacion, setFechaModifica] = useState(new Date());


    const { Emp_cCodigo } = useParams()
    const { Pan_cAnio } = useParams()
    const { Per_cPeriodo } = useParams()
    const { Dvm_cNummov } = useParams()
    const { Cab_cCatalogo } = useParams()
    const { Dvd_nCorrel } = useParams()


    const [estado, setEstadoLista] = React.useState('');

    const handleChange = (event) => {
        setEstado(event.target.value);
    };


    // Load de Pagina
    useEffect(() => {

        obtenerEventosPuja()
    }, [])

    // procedimiento para CONSULTA un catalogo con SP MySQL
    const obtenerEventosPuja = async () => {
        try {
            let _result;
            let _body = { Accion: "BUSCARREGISTRO", Emp_cCodigo: Emp_cCodigo, Pan_cAnio: Pan_cAnio, Per_cPeriodo: Per_cPeriodo, Dvm_cNummov: Dvm_cNummov, Cab_cCatalogo: Cab_cCatalogo, Dvd_nCorrel: Dvd_nCorrel }

            await eventoService.obtenerEventosDetPujaAuth(_body).then(
                (res) => {
                    setData(res[0]);
                    _result = res[0];
                },
                (error) => {
                    console.log(error)
                    setError(error);
                }
            )

            _result.map((item) => (

                setDocID(item.Dvd_cDocID),
                setNombre(item.Dvd_cNombres),
                setApellido(item.Dvd_cApellidos),
                setTelefono(item.Dvd_cTelefono),
                setCorreo(item.Dvd_cCorreo),
                setImporte(item.Dvd_nImporte),
                setEstado(item.Dvd_cEstado),
                setFecha(item.Dvd_dFechaPuja),
                setComentario(item.Dvd_cComentario),
                setFechaModifica(item.Dvd_dFechaModificacion)
            ))

        } finally {
            setLoading(false);
        }
    }


    // procedimiento para EDITAR un catalogo con SP MySQL
    const editarEventoPuja = async (e) => {
        try {

            let _body = {
                Accion: "EDITAR", Emp_cCodigo: Emp_cCodigo, Pan_cAnio: Pan_cAnio, Per_cPeriodo: Per_cPeriodo,
                Dvm_cNummov: Dvm_cNummov, Cab_cCatalogo: Cab_cCatalogo, Dvd_nCorrel: Dvd_nCorrel,
                Dvd_cDocID: Dvd_cDocID, Dvd_cNombres: Dvd_cNombres, Dvd_cApellidos: Dvd_cApellidos,
                Dvd_cTelefono: Dvd_cTelefono, Dvd_cCorreo: Dvd_cCorreo, Dvd_nImporte: Dvd_nImporte,
                Dvd_cEstado: Dvd_cEstado, Dvd_cComentario: Dvd_cComentario, Dvd_dFechaModificacion: Dvd_dFechaModificacion
            }
            await eventoService.obtenerEventosDetPujaAuth(_body).then(
                (res) => {
                    setData(res[0]);
                },
                (error) => {
                    console.log(error)
                    setError(error);
                }
            );


            alert('El registro fue actualizado');

        } catch (error) {
            alert(error);


        } finally {
            history.push({
                pathname: '/MantEventoPuja'
            });
            setLoading(false);
        }
    }

    const cancelar = async (e) => {
        history.push({
            pathname: '/MantEventoPuja'
        });
        setLoading(false);
    }




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

                <Box sx={{ flexGrow: 1 }}>
                    <div align="left">
                        <h2 >EDITA EVENTOS PUJA:</h2>
                    </div>

                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <TextField
                                label="Empresa"
                                value={Emp_cCodigo}
                                onChange={(e) => setEmpresa(e.target.value)}
                                name="textformat"
                                id="empresa"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Año"
                                value={Pan_cAnio}
                                onChange={(e) => setAnio(e.target.value)}
                                name="textformat"
                                id="Año"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Periodo"
                                value={Per_cPeriodo}
                                onChange={(e) => setPeriodo(e.target.value)}
                                name="textformat"
                                id="Periodo"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Movimiento"
                                value={Dvm_cNummov}
                                onChange={(e) => setMovimiento(e.target.value)}
                                name="textformat"
                                id="Movimiento"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Catalogo"
                                value={Cab_cCatalogo}
                                onChange={(e) => setCatalogo(e.target.value)}
                                name="textformat"
                                id="Catalogo"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Correl"
                                value={Dvd_nCorrel}
                                onChange={(e) => setCorrel(e.target.value)}
                                name="textformat"
                                id="Correl"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Doc ID"
                                value={Dvd_cDocID}
                                onChange={(e) => setDocID(e.target.value)}
                                name="textformat"
                                id="Doc ID"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Nombres"
                                value={Dvd_cNombres}
                                onChange={(e) => setNombre(e.target.value)}
                                name="textformat"
                                id="Nombres"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Apellidos"
                                value={Dvd_cApellidos}
                                onChange={(e) => setApellido(e.target.value)}
                                name="textformat"
                                id="Apellidos"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Telefono"
                                value={Dvd_cTelefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                name="textformat"
                                id="Telefono"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label="Correo"
                                value={Dvd_cCorreo}
                                onChange={(e) => setCorreo(e.target.value)}
                                name="textformat"
                                id="Correo"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Importe"
                                value={Dvd_nImporte}
                                onChange={(e) => setImporte(e.target.value)}
                                name="textformat"
                                id="Importe"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label="Fecha"
                                value={Dvd_dFechaPuja}
                                onChange={(e) => setFecha(e.target.value)}
                                name="textformat"
                                id="Fecha"
                                variant="standard"
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                label="Fecha Modificación"
                                value={Dvd_dFechaModificacion}
                                onChange={(e) => setFechaModifica(e.target.value)}
                                name="textformat"
                                id="FechaModifica"
                                variant="standard"
                                disabled
                            />
                        </Grid>

                        

                        <Grid item xs={8}>
                            <TextField
                                label="Comentario"
                                value={Dvd_cComentario}
                                onChange={(e) => setComentario(e.target.value)}
                                name="textformat"
                                id="Comentario"
                                variant="standard"

                            />
                        </Grid>



                        <Grid item xs={12}>
                            <FormControl>
                                <InputLabel id="estado-label">Estado</InputLabel>
                                <Select
                                    labelId="estado-label"
                                    id="estado-select"
                                    value={Dvd_cEstado}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="A">Puja Activ</MenuItem>
                                    <MenuItem value="X">Puja Cancelada</MenuItem>
                                    <MenuItem value="P">Puja Pendiente</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} >
                        <Grid item xs={6} className={classes.buttonContainer}>

                            <Button variant="contained" size="small" color="primary" onClick={editarEventoPuja}>Actualizar</Button>

                        </Grid>
                        <Grid item xs={6} className={classes.buttonContainer}>
                            <Button variant="contained" size="small" color="primary" onClick={cancelar}>Cancelar</Button>

                        </Grid>
                    </Grid>
                </Box >

            </Paper>
        </div>
    )

}

export default EditaEventoPuja