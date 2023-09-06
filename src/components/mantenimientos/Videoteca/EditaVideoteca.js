import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { eventoService } from '../../../services/evento.service';

const EditaVideoteca = (props) => {
    const history = useHistory()
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])
     
    // const [Lgt_nIndice, setIndice] = useState('')
    const [Lgt_cURL, setURL] = useState('')
    const [Lgt_cTitulo, setTitulo] = useState('')
    const [Lgt_cComentario, setComentario] = useState('')
    const [Lgt_cEstado, setEstado] = useState('')
    const [Lgt_dFechaCrea, setFecha] = useState('')


    const { Emp_cCodigo } = useParams()
    const { Lgt_nIndice } = useParams()
    

   

    // Load de Pagina
    useEffect(() => {

        obtenerVideoteca()
    }, [])

    // procedimiento para CONSULTA un catalogo con SP MySQL
    const obtenerVideoteca = async () => {
        try {
            let _result;
            let _body = { Accion: "BUSCARREGISTRO", Emp_cCodigo: Emp_cCodigo, Lgt_nIndice: Lgt_nIndice}

            await eventoService.obtenerVideosAuth(_body).then(
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
                
                setURL(item.Lgt_cURL),
                setTitulo(item.Lgt_cTitulo),
                setComentario(item.Lgt_cComentario),
                setEstado(item.Lgt_cEstado),
                setFecha(item.Lgt_dFechaCrea)
                               
            ))

        } finally {
            setLoading(false);
        }
    }


    // procedimiento para EDITAR un catalogo con SP MySQL
    const editarVideoteca = async (e) => {
        try {
            let _body = { Accion: "EDITAR", Emp_cCodigo: Emp_cCodigo, Lgt_nIndice: Lgt_nIndice, Lgt_cURL: Lgt_cURL, Lgt_cTitulo: Lgt_cTitulo, Lgt_cComentario: Lgt_cComentario, Lgt_cEstado: Lgt_cEstado}
            await eventoService.obtenerVideosAuth(_body).then(
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
                        <h3 >EDITA VIDEOTECA:</h3>
                    </div>

                    <Grid container spacing={2}>

                        <Grid item xs={8}>

                            <TextField
                               
                                label="Indice"
                                value={Lgt_nIndice}
                                onChange={(e) => setIndice(e.target.value)}
                                name="textformat"
                                id="Indice"
                                variant="standard"
                                disabled
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
                            
                        </Grid>

                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Button variant="contained" size="small" color="primary" onClick={editarVideoteca}>Actualizar</Button>
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

export default EditaVideoteca