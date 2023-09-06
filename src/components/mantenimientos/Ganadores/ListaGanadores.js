import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { eventoService } from '../../../services/evento.service';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { storage } from "../../../storage.js";

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
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

const ListaGanadores = (props) => {

  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);
  const [filterPlaca, setFilterPlaca] = useState('');
  const [filterDocID, setFilterDocID] = useState('');
  const [filterNombres, setFilterNombres] = useState('');

  const [filteredData, setFilteredData] = useState(data);

  const total = CalculaTotal(filteredData);
  const cantidad = CalculaCantidad(filteredData);
  const cantidadItems = CalculaCantidadItems(filteredData);

  // procedimiento para CONSULTA un catalogo con SP MySQL
  const listar = async () => {
    let _body = { Accion: "LISTA_GANADORES", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio") }

    return await eventoService.obtenerEventosDetPujaAuth(_body).then(
      (res) => {

        setData(res[0]);
        setFilteredData(res[0]);
      },
      (error) => {
        console.log(error);

      }
    );
  };


  function CalculaTotal(items) {
    return items.map(({ Dvd_nImporte }) => Dvd_nImporte).reduce((sum, i) => sum + i, 0);
  }

  function CalculaCantidadItems(items) {
    return items.map(({ Quantity }) => Quantity).reduce((sum, i) => sum + i, 0);
  }


  function CalculaCantidad(items) {
    return items
      .filter(({ Dvd_nImporte }) => Dvd_nImporte > 0)
      .map(({ Quantity }) => Quantity)
      .reduce((sum, i) => sum + i, 0);
  }


  // Load de pagina
  useEffect(() => {
    listar();
  }, []);



  const handleFilterChangePlaca = (event) => {
    setFilterPlaca(event.target.value);
  };
  const handleFilterChangeDocID = (event) => {
    setFilterDocID(event.target.value);
  };
  const handleFilterChangeNombres = (event) => {
    setFilterNombres(event.target.value);
  };

  const handleFilterSubmit = () => {
    let filtered;
    filtered = data.filter(item => item.Placa.toLowerCase().includes(filterPlaca.toLowerCase()));
    filtered = filtered.filter(item => item.Dvd_cDocID.toLowerCase().includes(filterDocID.toLowerCase()));
    filtered = filtered.filter(item => item.Dvd_cNombres.toLowerCase().includes(filterNombres.toLowerCase()));

    setFilteredData(filtered);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
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
          <Grid container spacing={1}>
            <Grid item xs={12} >

              <div>
                <Grid container spacing={1}>
                  <Grid item xs={5} lg={4}>
                    <TextField label="Filtrar por Placa" value={filterPlaca} onChange={handleFilterChangePlaca} />
                  </Grid>
                  <Grid item xs={7} lg={4}>
                    <TextField label="Filtrar por Doc ID" value={filterDocID} onChange={handleFilterChangeDocID} />
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <TextField label="Filtrar por Nombres" value={filterNombres} onChange={handleFilterChangeNombres} />
                  </Grid>
                  <Grid item xs={3} lg={4}>
                    <Button variant="contained" color="primary" onClick={handleFilterSubmit}>
                      Filtrar
                    </Button>
                    </Grid>
                  <Grid item xs={3} lg={4}>                    
                    <Button variant="outlined" color="primary" onClick={listar}>
                      Actualizar
                    </Button>                    
                  </Grid>
                </Grid>
              </div>

            </Grid>
            <Grid item xs={12} >
              <TableContainer component={Paper}>




                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Placa</StyledTableCell>
                      <StyledTableCell align="left">Catalogo</StyledTableCell>
                      <StyledTableCell align="left">Doc ID</StyledTableCell>
                      <StyledTableCell align="left">Nombres</StyledTableCell>
                      <StyledTableCell align="left">Apellidos</StyledTableCell>
                      <StyledTableCell align="left">Telefono</StyledTableCell>
                      <StyledTableCell align="left">Correo</StyledTableCell>
                      <StyledTableCell align="right">N° Pujas</StyledTableCell>
                      <StyledTableCell align="left">Importe</StyledTableCell>
                      <StyledTableCell align="left">Fecha</StyledTableCell>
                      <StyledTableCell align="left">Evento</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((item, idx) => (
                      <StyledTableRow item={item} key={idx}>
                        <StyledTableCell align="left">{item.Placa}</StyledTableCell>
                        <StyledTableCell align="left">{item.Cab_cCatalogo}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvd_cDocID}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvd_cNombres}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvd_cApellidos}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvd_cTelefono}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvd_cCorreo}</StyledTableCell>

                        <StyledTableCell align="right">{item.Contador}</StyledTableCell>

                        <StyledTableCell align="right">{ccyFormat(item.Dvd_nImporte)}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvd_dFechaPuja}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvm_cDescripcion}</StyledTableCell>

                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>


              </TableContainer>
            </Grid>
            <Grid item xs={12} >
              <div className='cart-total'>
                <h4>Cantidad de Items:</h4>
                <span className='total-pagar-sm'>{cantidadItems}</span>
              </div>
            </Grid>            
            <Grid item xs={12} >
              <div className='cart-total'>
                <h4>Items Pujados:</h4>
                <span className='total-pagar-sm'>{cantidad}</span>
              </div>
            </Grid>
            <Grid item xs={12} >
              <div className='cart-total'>
                <h4>Puja Total:</h4>
                <span className='total-pagar-sm'>S/.{ccyFormat(total)}</span>
              </div>

            </Grid>
          </Grid>
        </Paper>


      </Box >


    </div >
  )
}


export default ListaGanadores