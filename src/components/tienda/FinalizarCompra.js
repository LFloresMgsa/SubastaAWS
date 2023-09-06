import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import CustomAlert from '../mensajes/CustomAlert';
import Button from '@mui/material/Button';
import { eventoService } from '../../services/evento.service';

import { storage } from "../../storage.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="S/ "
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const TAX_RATE = 0.18;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}



function subtotal(items) {
    return items.map(({ Dvd_nImporte, quantity }) => Dvd_nImporte * quantity).reduce((sum, i) => sum + i, 0);
}


function Izquierda(cadena, cantidad) {
    return cadena.slice(0, cantidad);
}

function validarRuc(data) {
    //Elimina cualquier caracter espacio o signos habituales y comprueba validez
    var ruc = data.replace(/[-.,[\]()\s]+/g, "")
    // Devuelve un booleano si es un RUC válido
    // (deben ser 11 dígitos sin otro caracter en el medio)
    //11 dígitos y empieza en 10,15,16,17 o 20
    if (!(ruc >= 1e10 && ruc < 11e9
        || ruc >= 15e9 && ruc < 18e9
        || ruc >= 2e10 && ruc < 21e9))
        return false;
    for (var suma = -(ruc % 10 < 2), i = 0; i < 11; i++, ruc = ruc / 10 | 0)
        suma += (ruc % 10) * (i % 7 + (i / 7 | 0) + 1);
    return suma % 11 === 0;
}

const FinalizarCompra = (props) => {

    const invoiceSubtotal = subtotal(props.location.state);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;


    //    console.log(props);
    const history = useHistory();
    const [loading, setLoading] = useState([]);
    const [data, setData] = useState([]);

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [error, setError] = useState([]);

    let _cMensajesJson;
    let _msgerror = '';
    let _mensaje = '';

    const [pPdm_cNummov, setPdm_cNummov] = useState('')
    const [pPer_cPeriodo, setPer_cPeriodo] = useState('')
    const [pCli_cNombre, setCli_cNombre] = useState('')
    const [pCli_cApellido, setCli_cApellido] = useState('')
    const [pCli_cDocId, setCli_cDocId] = useState('')
    const [pPdm_cDireccion, setPdm_cDireccion] = useState('')
    const [pPdm_cDistrito, setPdm_cDistrito] = useState('')
    const [pPdm_cDepartamento, setPdm_cDepartamento] = useState('')
    const [pCli_cTelefono, setCli_cTelefono] = useState('')
    const [pCli_cCorreo, setCli_cCorreo] = useState('')
    const [pPdm_cComentario, setPdm_cComentario] = useState('')
    const [pPdm_dFecha, setPdm_dFecha] = useState('')
    const [pPdm_cEstado, setPdm_cEstado] = useState('')

    const [pPdm_cComentarioUser, setPdm_cComentarioUser] = useState('')
    const [pPdm_dFechaCrea, setPdm_dFechaCrea] = useState('')
    const [pPdm_dFechaModifica, setPdm_dFechaModifica] = useState('')
    const [pPdm_cUserModifica, setPdm_cUserModifica] = useState('')

    async function handleGrabarPedido() {

//console.log(props.location.state);

        let _resultado;
        try {
            let _Cabecera = {
                Accion: "INSERTAR", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), 
                Pdm_cNummov: pPdm_cNummov, Per_cPeriodo: pPer_cPeriodo,
                Cli_cNombre: pCli_cNombre, Cli_cApellido: pCli_cApellido, 
                Cli_cDocId: pCli_cDocId, Pdm_cDireccion: pPdm_cDireccion, 
                Pdm_cDistrito: pPdm_cDistrito,Pdm_cDepartamento: pPdm_cDepartamento, 
                Cli_cTelefono: pCli_cTelefono, Cli_cCorreo: pCli_cCorreo, Pdm_cComentario: pPdm_cComentario, 
                Pdm_dFecha: null, Pdm_cEstado: pPdm_cEstado,
                Pdm_cComentarioUser: ''  ,
                Pdm_dFechaCrea: null,
                Pdm_dFechaModifica : null,
                Pdm_cUserModifica  : null  
            }

            const _Pedido = {
                cabecera: _Cabecera,
                detalle: props.location.state
            };

            await eventoService.GrabarPedido(_Pedido).then(
                (res) => {
                    //console.log(res);
                    _resultado = res
                    //setData(res);
                },
                (error) => {
                    console.log(error)
                    setError(error);
                }
            )
        } finally {
            setLoading(false);

            return _resultado;
        }
    }

    //#region Alerta
    const [alertOpen, setAlertOpen] = useState(false);

    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };
    //#endregion



    //#region Alerta de confirmacion

    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleConfirmOpen = () => {

        let _mensaje = "";

        if (pCli_cCorreo == "") { _mensaje = "Ingrese su Correo" }
        if (pCli_cTelefono == "") { _mensaje = "Ingrese su número Telefónico" }
        if (pPdm_cDepartamento == "") { _mensaje = "Ingrese su Departamento" }
        if (pPdm_cDistrito == "") { _mensaje = "Ingrese su Distrito" }
        if (pPdm_cDireccion == "") { _mensaje = "Ingrese su Dirección" }

        if (pCli_cDocId.length != 8 && pCli_cDocId.length != 12 && pCli_cDocId.length != 15) {
            _mensaje = "Ingrese un documento de identidad correcto"
        }

        if (pCli_cDocId.length == 11 && validarRuc(pCli_cDocId)==false) {
            _mensaje = "Ingrese un RUC valido"
        }

        

        if (pCli_cDocId == "") { _mensaje = "Ingrese su Documento de Identidad / RUC" }

        if (pCli_cNombre == "") { _mensaje = "Ingrese su Nombre / Razon Social" }


        if (_mensaje != "") {

            setAlertMessage(_mensaje);
            setAlertType("alert");
            handleAlertOpen();
        }
        else {
            setAlertMessage("¿Deseas confirmar el Pedido?");
            setConfirmOpen(true);
        }

    };

    const handleConfirmClose = async (result) => {

        if (result) {

            let _estadoPedido = await handleGrabarPedido();

            if (_estadoPedido.message == "OK") {
                alert("Se grabo correctamente el pedido");

                handleRegresarTienda();
            }
            else {
                alert("Ocurrio un problema al grabar el pedido");
            }

        }

        setConfirmOpen(false);
    };

    const handleRegresarTienda = () => {
        history.push({
            pathname: '/Tienda'
        });
    }

    //#endregion

    return (
        <div>
            <CustomAlert
                type={alertType}
                message={alertMessage}
                open={alertOpen}
                onClose={handleAlertClose}
            />

            <CustomAlert
                type="confirm"
                message={alertMessage}
                open={confirmOpen}
                onClose={handleConfirmClose}
            />

            <Box sx={{ width: '100%' }}>
                <h1>Finalizar Compra</h1>


                <Grid container spacing={0}>

                    <Grid item xs={12} lg={6}>

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
                            <div align="left">
                                <h3 >Datos Facturación:</h3>
                            </div>

                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <Item>
                                        <TextField id="outlined-nombre" label="Nombres / Razón Social" variant="standard"
                                            value={pCli_cNombre}
                                            onChange={(e) => setCli_cNombre(e.target.value)}
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>
                                        <TextField id="outlined-apellido" label="Apellidos" variant="standard"
                                            value={pCli_cApellido}
                                            onChange={(e) => setCli_cApellido(e.target.value)}
                                        />
                                    </Item>
                                </Grid>

                                <Grid item xs={8}>
                                    <Item>
                                        <TextField id="outlined-documento" label="Documento Id. (DNI, RUC, Otros)" variant="standard"
                                            value={pCli_cDocId}
                                            onChange={(e) => setCli_cDocId(e.target.value)}
                                        />
                                    </Item>
                                </Grid>

                                <Grid item xs={12}>
                                    <Item>
                                        <TextField id="outlined-direccion" label="Dirección" variant="standard"
                                            value={pPdm_cDireccion}
                                            onChange={(e) => setPdm_cDireccion(e.target.value)}
                                        />
                                    </Item>
                                </Grid>

                                <Grid item xs={6}>
                                    <Item>
                                        <TextField id="outlined-distrito" label="Distrito" variant="standard"
                                            value={pPdm_cDistrito}
                                            onChange={(e) => setPdm_cDistrito(e.target.value)}
                                        />
                                    </Item>
                                </Grid>

                                <Grid item xs={6}>
                                    <Item>
                                        <TextField id="outlined-departamento" label="Departamento" variant="standard"
                                            value={pPdm_cDepartamento}
                                            onChange={(e) => setPdm_cDepartamento(e.target.value)}
                                        />
                                    </Item>
                                </Grid>



                                <Grid item xs={4}>
                                    <Item>
                                        <TextField id="outlined-telefono" label="Teléfono" variant="standard"
                                            value={pCli_cTelefono}
                                            onChange={(e) => setCli_cTelefono(e.target.value)}
                                        />
                                    </Item>
                                </Grid>


                                <Grid item xs={8}>
                                    <Item>
                                        <TextField id="outlined-correo" label="Correo" variant="standard"
                                            value={pCli_cCorreo}
                                            onChange={(e) => setCli_cCorreo(e.target.value)}
                                        />
                                    </Item>
                                </Grid>



                            </Grid>
                        </Paper>


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
                            <div align="left">
                                <h3 >Notas del Pedido - Opcional:</h3>
                            </div>

                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <Item>
                                        <TextField id="outlined-notas" label="Comentario" variant="standard"
                                            value={pPdm_cComentario}
                                            onChange={(e) => setPdm_cComentario(e.target.value)}
                                            multiline
                                            maxRows={4}
                                        />
                                    </Item>

                                </Grid>

                            </Grid>
                        </Paper>

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
                            <div align="left">
                                <h3 >Transferencias Bancarias:</h3>
                            </div>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        value="Realiza tu pago directamente en nuestra cuenta bancaria BCP. Por favor, usa el número del pedido como referencia de pago. Tu pedido no se procesará hasta que se haya recibido el importe en nuestra cuenta."
                                        multiline

                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <p>
                                        Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web y otros propósitos descritos en nuestra política de privacidad.
                                    </p>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button variant="outlined" size="small" color="primary" onClick={handleRegresarTienda}  >Regresar</Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button variant="contained" size="small" color="primary" onClick={handleConfirmOpen} width="100%" >Realizar Pedido</Button>
                                </Grid>

                            </Grid>
                        </Paper>
                        
                    </Grid>
                    
                    <Grid item xs={12} lg={6}>
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
                            <h3>Tu Pedido:</h3>

                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>


                                            <StyledTableCell align="left">Cant.</StyledTableCell>
                                            <StyledTableCell align="left">Descripción</StyledTableCell>
                                            <StyledTableCell align="left">Codigo</StyledTableCell>
                                            <StyledTableCell align="right">Precio</StyledTableCell>
                                            <StyledTableCell align="right">Total</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.location.state.map((product) => (
                                            <StyledTableRow key={product.Cab_cCatalogo}>
                                                <StyledTableCell align="left">{product.quantity}</StyledTableCell>
                                                <StyledTableCell align="left">{product.Cab_cDescripcion}</StyledTableCell>
                                                <StyledTableCell align="left"> {product.Cab_cCatalogo}</StyledTableCell>
                                                <StyledTableCell align="right">S/. {ccyFormat(product.Dvd_nImporte)}</StyledTableCell>
                                                <StyledTableCell align="right">S/. {ccyFormat(product.Dvd_nImporte * product.quantity)}</StyledTableCell>

                                            </StyledTableRow>
                                        ))}

                                        <TableRow >
                                            <TableCell rowSpan={3} />
                                            <TableCell colSpan={3} >Total</TableCell>
                                            <TableCell align="right">S/. {ccyFormat(invoiceSubtotal)}</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>
                    </Grid>
                </Grid>



            </Box>
        </div>
    );
};

export default FinalizarCompra;

