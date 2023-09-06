import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Description } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { eventoService } from '../../../services/evento.service';


const CreaVideoteca = (props) => {

    const history = useHistory();
    const [loading, setLoading] = useState([]);
    const [data, setData] = useState([]);


    const [Emp_cCodigo, setEmpresa] = useState('')
    const [Lgt_nIndice, setIndice] = useState('')
    const [Lgt_cURL, setURL] = useState('')
    const [Lgt_cTitulo, setTitulo] = useState('')
    const [Lgt_cComentario, setComentario] = useState('')
    const [Lgt_cEstado, setEstado] = useState('')
    const [Lgt_dFechaCrea, setFecha] = useState('')
    
    
    
    // procedimiento para INSERTAR una VIDEOTECA --- TABLA lgm_videoteca con SP MySQL
    const insertaVideoteca = async (e) => {
        try {
            let _body = { Accion: "INSERTAR", Emp_cCodigo: Emp_cCodigo, Lgt_nIndice: Lgt_nIndice, Lgt_cURL: Lgt_cURL, Lgt_cTitulo: Lgt_cTitulo, Lgt_cComentario: Lgt_cComentario, Lgt_cEstado: Lgt_cEstado,Lgt_dFechaCrea: Lgt_dFechaCrea}
            await eventoService.obtenerVideosAuth(_body).then(
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
                pathname: '/MantVideoteca'
            });
            setLoading(false);
        }
    }

    const cancelar = async (e) => {
        history.push({
            pathname: '/MantVideoteca'
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
                        <h2 >CREA VIDEOTECA:</h2>
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
                                label="Indice"
                                value={Lgt_nIndice}
                                onChange={(e) => setIndice(e.target.value)}
                                name="textformat"
                                id="Indice"
                                variant="standard"
                            />


                            <TextField
                                label="Url"
                                value={Lgt_cURL}
                                onChange={(e) => setURL(e.target.value)}
                                name="textformat"
                                id="Url"
                                variant="standard"
                            />

                            <TextField
                                label="Titulo"
                                value={Lgt_cTitulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                name="textformat"
                                id="Titulo"
                                variant="standard"
                            />
                            <TextField
                                label="Comentario"
                                value={Lgt_cComentario}
                                onChange={(e) => setComentario(e.target.value)}
                                name="textformat"
                                id="Comentario"
                                variant="standard"
                            />

                            <TextField
                                label="Estado"
                                value={Lgt_cEstado}
                                onChange={(e) => setEstado(e.target.value)}
                                name="textformat"
                                id="Estado"
                                variant="standard"
                            />

                            {/* <TextField
                                
                                value={Lgt_dFechaCrea}
                                onChange={(e) => setFecha(e.target.value)}
                                name="textformat"
                                id="date"
                                type="date"
                                defaultValue="09/05/2023"
                                variant="standard"
                            />  */}
                            {/* <TextField
                                value={Lgt_dFechaCrea}
                                id="date"
                                onChange={(e) => setFecha(e.target.value)}
                                type="date"
                                defaultValue="2023-05-09"
                                variant="standard"
                                                               
                             />   */}
                                                   
                                                

                        </Grid>

                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                        <Button variant="contained" size="small" color="primary" onClick={insertaVideoteca}>Crear</Button>
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

export default CreaVideoteca