import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { eventoService } from '../../../services/evento.service';

const EditaCatalogoImagenes = (props) => {
    const history = useHistory()
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])

    const [Lgt_cCategoria, setCategoria] = useState('')
    const [Lgt_cGrupo, setGrupo] = useState('')
    const [Lgt_cClase, setClase] = useState('')
    const [Lgt_cFamilia, setFamilia] = useState('')

    const [Cab_nItem, setItem] = useState('')
    const [Cab_cEnlace, setEnlace] = useState('')


    const { Emp_cCodigo } = useParams()
    const { Cab_cCatalogo } = useParams()

    // Load de Pagina
    useEffect(() => {

        obtenerCatalogoImagenes()
    }, [])

    // procedimiento para CONSULTA un catalogo con SP MySQL
    const obtenerCatalogoImagenes = async () => {
        try {
            let _result;
            let _body = { Accion: "BUSCARREGISTRO", Emp_cCodigo: Emp_cCodigo, Cab_cCatalogo: Cab_cCatalogo }

            await eventoService.obtenerCatalogoDetImagenesAuth(_body).then(
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
                setCategoria(item.Lgt_cCategoria),
                setGrupo(item.Lgt_cGrupo),
                setClase(item.Lgt_cClase),
                setFamilia(item.Lgt_cFamilia),
                setItem(item.Cab_nItem),
                setEnlace(item.Cab_cEnlace)

            ))

        } finally {
            setLoading(false);
        }
    }


    // procedimiento para EDITAR un catalogo con SP MySQL
    const editarCatalogoImagenes = async (e) => {
        try {
            let _body = { Accion: "EDITAR", Emp_cCodigo: Emp_cCodigo, Lgt_cCategoria: Lgt_cCategoria, Lgt_cGrupo: Lgt_cGrupo, Lgt_cClase: Lgt_cClase, Lgt_cFamilia: Lgt_cFamilia, Cab_cCatalogo: Cab_cCatalogo, Cab_nItem: Cab_nItem, Cab_cEnlace: Cab_cEnlace }
            await eventoService.obtenerCatalogoDetImagenesAuth(_body).then(
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
                pathname: '/MantCatalogoImagenes'
            });
            setLoading(false);
        }
    }

    const cancelar = async (e) => {
        history.push({
            pathname: '/MantCatalogoImagenes'
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
                        <h3 >EDITA CATALOGO IMAGENES:</h3>
                    </div>

                    <Grid container spacing={2}>

                        <Grid item xs={8}>

                            <TextField
                                label="Catalogo"
                                value={Cab_cCatalogo}
                                onChange={(e) => setCategoria(e.target.value)}
                                name="textformat"
                                id="catalogo"
                                variant="standard"
                                disabled
                            />

                            <TextField
                                label="Categoria"
                                value={Lgt_cCategoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                name="textformat"
                                id="Categoria"
                                variant="standard"
                            />


                            <TextField
                                label="Grupo"
                                value={Lgt_cGrupo}
                                onChange={(e) => setGrupo(e.target.value)}
                                name="textformat"
                                id="grupo"
                                variant="standard"
                            />

                            <TextField
                                label="Clase"
                                value={Lgt_cClase}
                                onChange={(e) => setClase(e.target.value)}
                                name="textformat"
                                id="clase"
                                variant="standard"
                            />
                            <TextField
                                label="Familia"
                                value={Lgt_cFamilia}
                                onChange={(e) => setFamilia(e.target.value)}
                                name="textformat"
                                id="familia"
                                variant="standard"
                            />

                            <TextField
                                label="Item"
                                value={Cab_nItem}
                                onChange={(e) => setItem(e.target.value)}
                                name="textformat"
                                id="Item"
                                variant="standard"
                            />
                            <TextField
                                label="Enlace"
                                value={Cab_cEnlace}
                                onChange={(e) => setEnlace(e.target.value)}
                                name="textformat"
                                id="Enlace"
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
                                            <Button variant="contained" size="small" color="primary" onClick={editarCatalogoImagenes}>Actualizar</Button>
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

export default EditaCatalogoImagenes