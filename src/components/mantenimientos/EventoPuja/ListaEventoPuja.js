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
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { eventoService } from '../../../services/evento.service';

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

const ListaEventoPuja = (props) => {

  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);


  const [filterPlaca, setFilterPlaca] = useState('');
  const [filterDocID, setFilterDocID] = useState('');
  const [filterNombres, setFilterNombres] = useState('');

  const [filteredData, setFilteredData] = useState(data);


  // Load de pagina
  useEffect(() => {
    listar();

  }, []);

  // procedimiento para CONSULTA un catalogo con SP MySQL
  const listar = async () => {
    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo") }

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


  // procedimiento para ELIMINAR un catalogo con SP MySQL
  const eliminar = async (Emp_cCodigo, Pan_cAnio, Per_cPeriodo, Dvm_cNummov, Cab_cCatalogo, Dvd_nCorrel) => {
    if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
      try {
        let _result;
        let _body = ({ Accion: "ELIMINAR", Emp_cCodigo: Emp_cCodigo, Pan_cAnio: Pan_cAnio, Per_cPeriodo: Per_cPeriodo, Dvm_cNummov: Dvm_cNummov, Cab_cCatalogo: Cab_cCatalogo, Dvd_nCorrel: Dvd_nCorrel })

        await eventoService.obtenerEventosDetPujaAuth(_body).then(
          (res) => {
            _result = res;
          },
          (error) => {
            console.log(error);
          }
        );

        if (_result.error) {
          throw _result.error;
        }

        alert('El registro fue eliminado');

        listar();

      } catch (error) {
        alert(error);
      }
    }
  };



  // procedimiento para EDITAR un catalogo con SP MySQL
  const editar = (Emp_cCodigo, Pan_cAnio, Per_cPeriodo, Dvm_cNummov, Cab_cCatalogo, Dvd_nCorrel) => {
    history.push({
      pathname: `/editareventodetpuja/${Emp_cCodigo}/${Pan_cAnio}/${Per_cPeriodo}/${Dvm_cNummov}/${Cab_cCatalogo}/${Dvd_nCorrel}`,
      state: { props }
    });
  }

  // procedimiento para CREAR un catalogo con SP MySQL
  const crear = () => {
    history.push({
      pathname: '/creareventodetpuja',
      state: { props }
    });
  }


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
                  <Grid item xs={5} lg={3}>
                    <TextField label="Filtrar por Placa" value={filterPlaca} onChange={handleFilterChangePlaca} />
                  </Grid>
                  <Grid item xs={7} lg={3}>
                    <TextField label="Filtrar por Doc ID" value={filterDocID} onChange={handleFilterChangeDocID} />
                  </Grid>
                  <Grid item xs={8} lg={3}>
                    <TextField label="Filtrar por Nombres" value={filterNombres} onChange={handleFilterChangeNombres} />
                  </Grid>
                  <Grid item xs={4} lg={3}>
                    <Button variant="contained" color="primary" onClick={handleFilterSubmit}>
                      Filtrar
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

                      <StyledTableCell align="left">Llave</StyledTableCell>
                      <StyledTableCell align="left">Catalogo</StyledTableCell>

                      <StyledTableCell align="left">Placa</StyledTableCell>

                      <StyledTableCell align="left">Doc ID</StyledTableCell>
                      <StyledTableCell align="left">Nombres</StyledTableCell>

                      <StyledTableCell align="left">Apellidos</StyledTableCell>
                      <StyledTableCell align="left">Telefono</StyledTableCell>
                      <StyledTableCell align="left">Correo</StyledTableCell>
                      <StyledTableCell align="left">Importe</StyledTableCell>
                      <StyledTableCell align="left">Estado</StyledTableCell>
                      <StyledTableCell align="left">Fecha</StyledTableCell>

                      <StyledTableCell align="left"></StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((item, idx) => (
                      <StyledTableRow item={item} key={idx}>

                        <StyledTableCell align="right">{item.Llave}</StyledTableCell>
                        <StyledTableCell align="left">{item.Cab_cCatalogo}</StyledTableCell>

                        <StyledTableCell align="left">{item.Placa}</StyledTableCell>

                        <StyledTableCell align="left">{item.Dvd_cDocID}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvd_cNombres}</StyledTableCell>

                        <StyledTableCell align="left">{item.Dvd_cApellidos}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvd_cTelefono}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvd_cCorreo}</StyledTableCell>
                        <StyledTableCell align="left">{ccyFormat(item.Dvd_nImporte)}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvd_cEstado}</StyledTableCell>
                        <StyledTableCell align="left">{item.Dvd_dFechaPuja}</StyledTableCell>

                        <StyledTableCell align="left"><Button variant="contained" size="small" color="primary" onClick={() => editar(item.Emp_cCodigo, item.Pan_cAnio, item.Per_cPeriodo, item.Dvm_cNummov, item.Cab_cCatalogo, item.Dvd_nCorrel)} >Editar</Button></StyledTableCell>
                        {/* <StyledTableCell align="left"><Button variant="contained" size="small" color="primary" onClick={() => eliminar(item.Emp_cCodigo, item.Pan_cAnio, item.Per_cPeriodo, item.Dvm_cNummov, item.Cab_cCatalogo, item.Dvd_nCorrel)} >Eliminar</Button></StyledTableCell> */}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>


              </TableContainer>
            </Grid>
          </Grid>
        </Paper>


      </Box >


    </div >
  )
}

export default ListaEventoPuja