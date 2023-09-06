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

const ListaEvento = (props) => {

  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);

  // Load de pagina
  useEffect(() => {
    listar();
  }, []);

  // procedimiento para CONSULTA un catalogo con SP MySQL
  const listar = async () => {
    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo") }

    return await eventoService.obtenerEventosCabAuth(_body).then(
      (res) => {
        setData(res[0]);
      },
      (error) => {
        console.log(error);
      }
    );
  };


  // procedimiento para ELIMINAR un catalogo con SP MySQL
  const eliminar = async (Emp_cCodigo, Pan_cAnio, Per_cPeriodo, Dvm_cNummov) => {
    if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
      try {
        let _result;
        let _body = ({ Accion: "ELIMINAR", Emp_cCodigo: Emp_cCodigo, Pan_cAnio: Pan_cAnio, Per_cPeriodo: Per_cPeriodo, Dvm_cNummov: Dvm_cNummov })

        await eventoService.obtenerEventosCabAuth(_body).then(
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
  const editar = (Emp_cCodigo, Pan_cAnio, Per_cPeriodo, Dvm_cNummov) => {
    history.push({
      pathname: `/editarevento/${Emp_cCodigo}/${Pan_cAnio}/${Per_cPeriodo}/${Dvm_cNummov}`,
      state: { props }
    });
  }

  // procedimiento para CREAR un catalogo con SP MySQL
  const crear = () => {
    history.push({
      pathname: '/crearevento',
      state: { props }
    });
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
        <Box>

          <table>
            <tbody>
              <tr>
                <td>
                  <Button variant="contained" size="small" color="primary"
                    onClick={() => crear()} >Nuevo
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>

                          <StyledTableCell align="right">Llave</StyledTableCell>
                          <StyledTableCell align="left">Tipo</StyledTableCell>
                          <StyledTableCell align="left">Descripción</StyledTableCell>
                          <StyledTableCell align="left">Inicio</StyledTableCell>
                          <StyledTableCell align="left">Fin</StyledTableCell>
                          <StyledTableCell align="left">Estado</StyledTableCell>

                          <StyledTableCell align="left">Desc. Adicional</StyledTableCell>
                          <StyledTableCell align="left">Tope Importe</StyledTableCell>
                          <StyledTableCell align="left">Tope Dias</StyledTableCell>

                          <StyledTableCell align="left"></StyledTableCell>
                          
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item, idx) => (
                          <StyledTableRow item={item} key={`${item.Emp_cCodigo}-${item.Llave}`}>

                            <StyledTableCell align="right">{item.Llave}</StyledTableCell>
                            <StyledTableCell align="left">{item.Vtt_cTipoEvento}</StyledTableCell>
                            <StyledTableCell align="center">{item.Dvm_cDescripcion}</StyledTableCell>
                            <StyledTableCell align="left">{item.Dvm_dInicio}</StyledTableCell>
                            <StyledTableCell align="left">{item.Dvm_dFin}</StyledTableCell>
                            <StyledTableCell align="left">{item.Dvm_cEstado}</StyledTableCell>

                            <StyledTableCell align="left">{item.Dvm_cDescripcionSec}</StyledTableCell>
                            <StyledTableCell align="left">{ccyFormat(item.Dvm_nTopeImporte)}</StyledTableCell>
                            <StyledTableCell align="left">{ccyFormat(item.Dvm_nTopeDias)}</StyledTableCell>

                            <StyledTableCell align="left"><Button variant="contained" size="small" color="primary" onClick={() => editar(item.Emp_cCodigo, item.Pan_cAnio, item.Per_cPeriodo, item.Dvm_cNummov)} >Editar</Button></StyledTableCell>
                            {/* <StyledTableCell align="left"><Button variant="contained" size="small" color="primary" onClick={() => eliminar(item.Emp_cCodigo, item.Pan_cAnio, item.Per_cPeriodo, item.Dvm_cNummov)} >Eliminar</Button></StyledTableCell> */}
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </td>
              </tr>
            </tbody>
          </table>




        </Box>

      </Paper>
    </div>
  )
}

export default ListaEvento