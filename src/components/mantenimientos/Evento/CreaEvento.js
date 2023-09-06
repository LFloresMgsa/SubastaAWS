import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Description } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { eventoService } from '../../../services/evento.service';


const CreaEvento = (props) => {

    const history = useHistory();
    const [loading, setLoading] = useState([]);
    const [data, setData] = useState([]);

    const [Emp_cCodigo, setEmpresa] = useState('')
    const [Pan_cAnio, setAnio] = useState('')
    const [Per_cPeriodo, setPeriodo] = useState('')
    const [Dvm_cNummov, setMovimiento] = useState('')
    const [Vtt_cTipoEvento, setTipoEvento] = useState('')
    const [Dvm_cDescripcion, setDescripcion] = useState('')
    const [Dvm_dInicio, setFinicio] = useState('')
    const [Dvm_dFin, setFfin] = useState('')
    const [Dvm_cEstado, setEstado] = useState('')


    const [Dvm_cDescripcionSec, setDescripcionSec] = useState('');
    const [Dvm_nTopeImporte, setTopeImporte] = useState(0);
    const [Dvm_nTopeDias, setTopeDias] = useState(0);


    // procedimiento para INSERTAR un catalogo con SP MySQL
    const insertaEvento = async (e) => {
        try {
            let _body = { Accion: "INSERTAR", Emp_cCodigo: Emp_cCodigo, Pan_cAnio: Pan_cAnio, Per_cPeriodo: Per_cPeriodo, 
                          Dvm_cNummov: Dvm_cNummov, Vtt_cTipoEvento: Vtt_cTipoEvento, Dvm_cDescripcion: Dvm_cDescripcion, 
                          Dvm_dInicio: Dvm_dInicio, Dvm_dFin: Dvm_dFin, Dvm_cEstado: Dvm_cEstado ,
                          Dvm_cDescripcionSec: Dvm_cDescripcionSec, Dvm_nTopeImporte: Dvm_nTopeImporte, Dvm_nTopeDias: Dvm_nTopeDias
                        }
                        
            await eventoService.obtenerEventosCabAuth(_body).then(
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
                pathname: '/MantEvento'
            });
            setLoading(false);
        }
    }

    const cancelar = async (e) => {
        history.push({
            pathname: '/MantEvento'
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
                        <h2 >CREA EVENTO:</h2>
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
                                label="Tipo Evento"
                                value={Vtt_cTipoEvento}
                                onChange={(e) => setTipoEvento(e.target.value)}
                                name="textformat"
                                id="Tipo Evento"
                                variant="standard"
                            />


                            <TextField
                                label="Descripción"
                                value={Dvm_cDescripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                name="textformat"
                                id="Descripción"
                                variant="standard"
                            />

                            <TextField
                                label="Fecha Inicio"
                                value={Dvm_dInicio}
                                onChange={(e) => setFinicio(e.target.value)}
                                name="textformat"
                                id="Fecha Inicio"
                                variant="standard"
                            />
                            <TextField
                                label="Fecha Fin"
                                value={Dvm_dFin}
                                onChange={(e) => setFfin(e.target.value)}
                                name="textformat"
                                id="Fecha Fin"
                                variant="standard"
                            />
                            <TextField
                                label="Estado"
                                value={Dvm_cEstado}
                                onChange={(e) => setEstado(e.target.value)}
                                name="textformat"
                                id="Estado"
                                variant="standard"
                            />

                            <TextField
                                label="Descripción Adicional"
                                value={Dvm_cDescripcionSec}
                                onChange={(e) => setDescripcionSec(e.target.value)}
                                name="textformat"
                                id="DescripciónSec"
                                variant="standard"
                            />

                            <TextField
                                label="Importe Tope"
                                value={Dvm_nTopeImporte}
                                onChange={(e) => setTopeImporte(e.target.value)}
                                name="textformat"
                                id="ImporteTope"
                                variant="standard"
                            />

                            <TextField
                                label="Importe Dias"
                                value={Dvm_nTopeDias}
                                onChange={(e) => setTopeDias(e.target.value)}
                                name="textformat"
                                id="DiasTope"
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
                                            <Button variant="contained" size="small" color="primary" onClick={insertaEvento}>Crear</Button>
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

export default CreaEvento