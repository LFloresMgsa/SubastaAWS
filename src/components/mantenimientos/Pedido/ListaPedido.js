import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { eventoService } from '../../../services/evento.service';
import { storage } from "../../../storage.js";
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';

const TAX_RATE = 0.18;

function totalPedido(items) {

  if (items) {

    let ntotal = items.map(({ Pdd_nPrecioNeto }) => Pdd_nPrecioNeto).reduce((sum, i) => sum + i, 0);

    return ntotal;
  }
  else {
    return 0;
  }

}

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function ccyFormatInt(num) {
  return `${num.toFixed(0)}`;
}


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

const columns = [
  { field: 'Pdm_cNummov', headerName: 'Movimiento', width: 110 },
  { field: 'Pdm_cEstado', headerName: 'Estado', width: 50 },
  { field: 'Cli_cNombre', headerName: 'Nombre', width: 110 },
  { field: 'Cli_cApellido', headerName: 'Apellido', width: 110 },
  { field: 'Cli_cDocId', headerName: 'D.N.I', width: 110 },
  { field: 'Pdm_cDireccion', headerName: 'Dirección', width: 200 },
  { field: 'Pdm_cDistrito', headerName: 'Distrito', width: 110 },
  { field: 'Pdm_cDepartamento', headerName: 'Departamento', width: 110 },
  { field: 'Cli_cTelefono', headerName: 'Telefono', width: 110 },
  { field: 'Cli_cCorreo', headerName: 'Correo', width: 150 },
  { field: 'Pdm_cComentario', headerName: 'Comentario', width: 100 },
  { field: 'Pdm_dFecha', headerName: 'Fecha', width: 200 },
  { field: 'Pan_cAnio', headerName: 'Año', width: 70 },
  { field: 'Per_cPeriodo', headerName: 'Periodo', width: 70 },
];


function Derecha(cadena, cantidad) {
  if (cantidad >= 0 && cantidad <= cadena.length) {
    return cadena.slice(-cantidad);
  } else {
    return "La cantidad especificada es inválida.";
  }
}

const CabeceraDetalle = (props) => {


  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const nsubtotal = invoiceTotal / (TAX_RATE + 1);
  const nimpuestos = invoiceTotal - nsubtotal;
  const [data, setData] = useState([]);
  const [dataLog, setDataLog] = useState([0]);
  const [dataRowSelCab, setDataRowSelCab] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const [Emp_cCodigo, setEmpresa] = useState('')
  const [Pan_cAnio, setAnio] = useState('')
  const [Per_cPeriodo, setPeriodo] = useState('')
  const [Cli_cNombre, setCliente] = useState('')
  const [Cli_cApellido, setApellido] = useState('')
  const [Cli_cDocID, setDocId] = useState('')
  const [Pdm_cDireccion, setDireccion] = useState('')
  const [Pdm_cDistrito, setDistrito] = useState('')
  const [Pdm_cDepartamento, setDepartamento] = useState('')
  const [Cli_cTelefono, setTelefono] = useState('')
  const [Cli_cCorreo, setCorreo] = useState('')
  const [Pdm_cComentario, setComentario] = useState('')
  const [Pdm_dFecha, setFecha] = useState('')
  const [Pdm_nItem, setItem] = useState('')
  const [Pdm_cEstado, setEstado] = useState('')
  const [Pdm_dFechaCrea, setFechaCrea] = useState('')
  const [Pdm_dFechaModifica, setFechaModifica] = useState('')
  const [Pdm_cUserModifica, setFechaUser] = useState('')
  const [Pdm_cComentarioUser, setComentarioUser] = useState('')


  const handleChange = (event) => {
    _RowSelCab(event.target.value);
  };

  const handleChangeEstado = (event) => {
    _RowSelCab.Pdm_cEstado = event.target.value;

    setEstado(event.target.value);
  };

  const _RowSelCab = FiltraCab();


  function FiltraCab() {

    let pPdm_cNummov = "";

    if (selectedRow) {
      pPdm_cNummov = selectedRow[0].Pdm_cNummov;

    }
    let rowCabSel = data.filter(_temps => _temps.Pdm_cNummov == pPdm_cNummov);

    return rowCabSel[0];
  }

  const actualizar = async () => {

    await actualizaEstado();
    let nunmmov = "";

    if (_RowSelCab) {
      nunmmov = _RowSelCab.Pdm_cNummov;
    }
    await obtenerEstadoLog(nunmmov);
    setComentarioUser('');

  }

  const actualizaEstado = async () => {

    let nunmmov = "";

    if (_RowSelCab) {
      nunmmov = _RowSelCab.Pdm_cNummov;
    }

    let _body = {
      Accion: "ACTUALIZA_ESTADOPED", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"),
      Pdm_cNummov: nunmmov, Per_cPeriodo: Per_cPeriodo, Cli_cNombre: Cli_cNombre, Cli_cApellido: Cli_cApellido, Cli_cDocID: Cli_cDocID,
      Pdm_cDireccion: Pdm_cDireccion, Pdm_cDistrito: Pdm_cDistrito, Pdm_cDepartamento: Pdm_cDepartamento,
      Cli_cTelefono: Cli_cTelefono, Cli_cCorreo: Cli_cCorreo, Pdm_cComentario: Pdm_cComentario, Pdm_dFecha: null,
      Pdm_cEstado: Pdm_cEstado, Pdm_cComentarioUser: Pdm_cComentarioUser, Pdm_dFechaCrea: null,
      Pdm_dFechaModifica: null, Pdm_cUserModifica: Pdm_cUserModifica, Pdm_nItem: 0
    }

    return await eventoService.actualizaPedidoAuth(_body).then(
      (res) => {
        FiltraCab(res[0]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const obtenerEstadoLog = async (pPdm_cNummov) => {

    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Pdm_cNummov: pPdm_cNummov }

    return await eventoService.actualizaPedidoAuth(_body).then(
      (res) => {
        setDataLog(res[0]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleRowClickCab = async (param) => {
    let pPdm_cNummov = Derecha(param[0], 10);

    await listarDetalle(pPdm_cNummov);

    if (_RowSelCab) {
      setEstado(_RowSelCab.Pdm_cEstado);
    }

    await obtenerEstadoLog(pPdm_cNummov);
    //setEstado(Pdm_cEstado[0].Pdm_cEstado); 

  };

  // procedimiento para CONSULTA un catalogo con SP MySQL
  const listarCabecera = async () => {
    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio") }

    return await eventoService.obtenerPedidoCabAuth(_body).then(
      (res) => {

        setData(res[0]);

      },
      (error) => {
        console.log(error);

      }
    );
  };


  const listarDetalle = async (pPdm_cNummov) => {
    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Pdm_cNummov: pPdm_cNummov }

    return await eventoService.obtenerPedidoDetAuth(_body).then(
      (res) => {
        setSelectedRow(res[0]);
        setInvoiceTotal(totalPedido(res[0]));

      },
      (error) => {
        console.log(error);

      }
    );
  };

  useEffect(() => {
    listarCabecera();
  }, []);

  const getRowId = (row) => {
    return `${row.Emp_cCodigo}-${row.Pan_cAnio}-${row.Pdm_cNummov}`;
  };

  return (
    <div>

      <Box sx={{ flexGrow: 1 }}>
        <Paper
          sx={{
            p: 1,
            margin: 1,
            maxWidth: 'auto',
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >

          <Grid container spacing={1}>

            <Grid item xs={12} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  margin: 1,
                  maxWidth: 'auto',
                  height: '100%',
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <DataGrid
                  rows={data}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={getRowId}
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    handleRowClickCab(newRowSelectionModel);
                  }}
                  rowSelectionModel={rowSelectionModel}
                  density='compact'
                  components={{
                    Toolbar: GridToolbar,
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  margin: 1,
                  maxWidth: 'auto',
                  height: '100%',
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >

                <div>
                  <h6>Detalle del Pedido :</h6>

                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">ID</StyledTableCell>
                          <StyledTableCell align="left">Codigo</StyledTableCell>
                          <StyledTableCell align="left">Producto</StyledTableCell>
                          <StyledTableCell align="right">Cantidad</StyledTableCell>
                          <StyledTableCell align="right">P.U.</StyledTableCell>
                          <StyledTableCell align="right">Total</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedRow && (
                          selectedRow.map((detail) => (
                            <StyledTableRow key={detail.Pdd_nItem}>
                              <StyledTableCell align="left">{detail.Pdd_nItem}</StyledTableCell>
                              <StyledTableCell align="left">{detail.Cab_cCatalogo}</StyledTableCell>
                              <StyledTableCell align="left">{detail.Pdd_cDescripcion}</StyledTableCell>
                              <StyledTableCell align="right">{detail.Pdd_nCantidad}</StyledTableCell>
                              <StyledTableCell align="right">{ccyFormat(detail.Pdd_nPrecioUnitario)}</StyledTableCell>
                              <StyledTableCell align="right">{ccyFormat(detail.Pdd_nPrecioNeto)}</StyledTableCell>
                            </StyledTableRow>
                          ))

                        )}
                        <TableRow >
                          <TableCell rowSpan={1} />
                          <TableCell colSpan={4} >Sub Total</TableCell>
                          <TableCell align="right">S/. {ccyFormat(nsubtotal)}</TableCell>
                        </TableRow>

                        <TableRow >
                          <TableCell rowSpan={1} />
                          <TableCell colSpan={4} >IGV {ccyFormatInt(TAX_RATE * 100)} % </TableCell>
                          <TableCell align="right">S/. {ccyFormat(nimpuestos)}</TableCell>
                        </TableRow>

                        <TableRow >
                          <TableCell rowSpan={1} />
                          <TableCell colSpan={4} >Total</TableCell>
                          <TableCell align="right">S/. {ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>

                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>

              </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>

              <Paper
                sx={{
                  p: 2,
                  margin: 1,
                  maxWidth: 'auto',
                  height: '100%',
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                {_RowSelCab && (

                  <form onSubmit={actualizar}>
                    <h6>Cambio de Estado de Pedido :</h6>

                    <Grid container spacing={1}>

                      <Grid item xs={12} lg={3}>
                        <TextField
                          name="pedido"
                          label="Nro.Pedido"
                          value={_RowSelCab.Pdm_cNummov}
                          //onChange={handleChange}
                          disabled
                          // fullWidth
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12} lg={3}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="state-label">Estado</InputLabel>
                          <Select
                            labelId="Estado"
                            name="Estado"
                            value={_RowSelCab.Pdm_cEstado}
                            onChange={handleChangeEstado}
                          >
                            <MenuItem value="A">Activo</MenuItem>
                            <MenuItem value="X">Inactivo</MenuItem>
                            <MenuItem value="P">Pendiente</MenuItem>
                            <MenuItem value="F">Finalizado</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={6}>

                        <TextField
                          name="comentario"
                          label="Comentario"
                          value={Pdm_cComentarioUser}

                          onChange={(e) => setComentarioUser(e.target.value)}
                          fullWidth
                          margin="normal"
                          multiline
                          minRows={1}
                        />
                      </Grid>

                      <Grid item xs={12} lg={12}>
                        <Button variant="contained" size="small" color="primary" onClick={actualizar} width="100%"  >Actualizar Estado</Button>
                      </Grid>

                    </Grid>
                  </form>
                )}
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

                <h6>Log de estados :</h6>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Nro. Movimiento</StyledTableCell>
                      <StyledTableCell align="left">Item</StyledTableCell>
                      <StyledTableCell align="left">Estado</StyledTableCell>
                      <StyledTableCell align="left">Comentario</StyledTableCell>
                      <StyledTableCell align="left">Fecha Crea</StyledTableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataLog.map((row, index) => (
                      <StyledTableRow key={index} >
                        <StyledTableCell align="left">{row.Pdm_cNummov}</StyledTableCell>
                        <StyledTableCell align="left">{row.Pdm_nItem}</StyledTableCell>
                        <StyledTableCell align="left">{row.Pdm_cEstado}</StyledTableCell>
                        <StyledTableCell align="left">{row.Pdm_cComentarioUser}</StyledTableCell>
                        <StyledTableCell align="left">{row.Pdm_dFechaCrea}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default CabeceraDetalle;
