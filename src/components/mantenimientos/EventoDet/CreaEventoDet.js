import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Description } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { eventoService } from '../../../services/evento.service';


const CreaEventoDet = (props) => {

    const history = useHistory();
    const [loading, setLoading] = useState([]);
    const [data, setData] = useState([]);

    const [Emp_cCodigo, setEmpresa] = useState('')
    const [Pan_cAnio, setAnio] = useState('')
    const [Per_cPeriodo, setPeriodo] = useState('')
    const [Dvm_cNummov, setMovimiento] = useState('')
    const [Cab_cCatalogo, setCatalogo] = useState('')
    const [Dvd_nOrden, setOrden] = useState('')
    const [Dvd_nImporte, setImporte] = useState('')
    const [Dvd_cEstado, setEstado] = useState('')

    const [Dvd_nTopeImporte, setTopeImporte] = useState('')


    const [Dvd_dInicio, setInicio] = useState('')
    const [Dvd_dFin, setFin] = useState('')
    const [Dvd_cComentario, setComentario] = useState('')


    // procedimiento para INSERTAR un catalogo con SP MySQL
    const insertaEventoDet = async (e) => {
        try {
            let _body = {
                Accion: "INSERTAR", Emp_cCodigo: Emp_cCodigo, Pan_cAnio: Pan_cAnio, Per_cPeriodo: Per_cPeriodo,
                Dvm_cNummov: Dvm_cNummov, Cab_cCatalogo: Cab_cCatalogo, Dvd_nOrden: Dvd_nOrden,
                Dvd_nImporte: Dvd_nImporte, Dvd_cEstado: Dvd_cEstado,
                Dvd_dInicio: Dvd_dInicio, Dvd_dFin: Dvd_dFin, Dvd_cComentario: Dvd_cComentario, Dvd_nTopeImporte: Dvd_nTopeImporte

            }
            await eventoService.obtenerEventosDetAuth(_body).then(
                (res) => {
                    setData(res[0]);
                },
                (error) => {
                    console.log(error)
                    setError(error);
                }
            )
        } finally {
            history.push({
                pathname: '/MantEventoDet'
            });
            setLoading(false);
        }
    }

    const cancelar = async (e) => {
        history.push({
            pathname: '/MantEventoDet'
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
                        <h2 >CREA DETALLE DEL EVENTO:</h2>
                    </div>

                    <Grid container spacing={2}>

                        <Grid item xs={8}>
                            <TextField
                                label="Empresa"
                                value={Emp_cCodigo}
                                onChange={(e) => setEmpresa(e.target.value)}
                                name="textformat"
                                id="empresa"
                                variant="standard"
                            />
                            <TextField
                                label="Año"
                                value={Pan_cAnio}
                                onChange={(e) => setAnio(e.target.value)}
                                name="textformat"
                                id="Año"
                                variant="standard"
                            />
                            <TextField
                                label="Periodo"
                                value={Per_cPeriodo}
                                onChange={(e) => setPeriodo(e.target.value)}
                                name="textformat"
                                id="Periodo"
                                variant="standard"
                            />
                            <TextField
                                label="Movimiento"
                                value={Dvm_cNummov}
                                onChange={(e) => setMovimiento(e.target.value)}
                                name="textformat"
                                id="Movimiento"
                                variant="standard"
                            />

                            <TextField
                                label="Catalogo"
                                value={Cab_cCatalogo}
                                onChange={(e) => setCatalogo(e.target.value)}
                                name="textformat"
                                id="Catalogo"
                                variant="standard"
                            />

                            <TextField
                                label="Orden"
                                value={Dvd_nOrden}
                                onChange={(e) => setOrden(e.target.value)}
                                name="textformat"
                                id="Orden"
                                variant="standard"
                            />
                            <TextField
                                label="Importe"
                                value={Dvd_nImporte}
                                onChange={(e) => setImporte(e.target.value)}
                                name="textformat"
                                id="Importe"
                                variant="standard"
                            />
                            <TextField
                                label="Estado"
                                value={Dvd_cEstado}
                                onChange={(e) => setEstado(e.target.value)}
                                name="textformat"
                                id="Estado"
                                variant="standard"
                            />

                            <TextField
                                label="Inicio"
                                value={Dvd_dInicio}
                                onChange={(e) => setInicio(e.target.value)}
                                name="textformat"
                                id="Inicio"
                                variant="standard"
                            />

                            <TextField
                                label="Fin"
                                value={Dvd_dFin}
                                onChange={(e) => setFin(e.target.value)}
                                name="textformat"
                                id="Fin"
                                variant="standard"
                            />

                            <TextField
                                label="Comentario"
                                value={Dvd_cComentario}
                                onChange={(e) => setComentario(e.target.value)}
                                name="textformat"
                                id="Comentario"
                                variant="standard"
                            />

                            <TextField
                                label="Importe Tope"
                                value={Dvd_nTopeImporte}
                                onChange={(e) => setTopeImporte(e.target.value)}
                                name="textformat"
                                id="ImporteTope"
                                variant="standard"
                            />


                        </Grid>

                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Button variant="contained" size="small" color="primary" onClick={insertaEventoDet}>Crear</Button>
                                        </td>
                                        <td>
                                            <Button variant="contained" size="small" color="primary" onClick={cancelar}>Cancelar</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                    </Grid>
                </Box >

            </Paper>
        </div>
    )
}

export default CreaEventoDet