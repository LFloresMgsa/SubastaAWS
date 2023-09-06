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

const ListaCatalogoImagenes = (props) => {

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

    return await eventoService.obtenerCatalogoDetImagenesAuth(_body).then(
      (res) => {
        setData(res[0]);
      },
      (error) => {
        console.log(error);
      }
    );
  };


  // procedimiento para ELIMINAR un catalogo con SP MySQL
  const eliminar = async (Emp_cCodigo, Cab_cCatalogo, Cab_nItem) => {
    if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
      try {
        let _result;
        let _body = ({ Accion: "ELIMINAR", Emp_cCodigo: Emp_cCodigo, Cab_cCatalogo: Cab_cCatalogo, Cab_nItem: Cab_nItem })

        await eventoService.obtenerCatalogoDetImagenesAuth(_body).then(
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
  const editar = (Emp_cCodigo, Cab_cCatalogo, Cab_nItem) => {
    history.push({
      pathname: `/editarcatalogoimagenes/${Emp_cCodigo}/${Cab_cCatalogo}/${Cab_nItem}`,
      state: { props }
    });
  }

  // procedimiento para CREAR un catalogo con SP MySQL
  const crear = () => {
    history.push({
      pathname: '/crearcatalogoimagenes',
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
                          <StyledTableCell align="left">Catalogo</StyledTableCell>

                          <StyledTableCell align="right">Categoria</StyledTableCell>
                          <StyledTableCell align="center">Grupo</StyledTableCell>
                          <StyledTableCell align="left">Clase</StyledTableCell>

                          <StyledTableCell align="left">Familia</StyledTableCell>


                          <StyledTableCell align="left">Item</StyledTableCell>
                          <StyledTableCell align="left">Enlace</StyledTableCell>
                          <StyledTableCell align="left"></StyledTableCell>
                          <StyledTableCell align="left"></StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item, idx) => (
                          <StyledTableRow item={item} key={idx}>

                            <StyledTableCell align="right">{item.Cab_cCatalogo}</StyledTableCell>

                            <StyledTableCell align="right">{item.Lgt_cCategoria}</StyledTableCell>
                            <StyledTableCell align="center">{item.Lgt_cGrupo}</StyledTableCell>
                            <StyledTableCell align="left">{item.Lgt_cClase}</StyledTableCell>

                            <StyledTableCell align="right">{item.Lgt_cFamilia}</StyledTableCell>

                            <StyledTableCell align="center">{item.Cab_nItem}</StyledTableCell>
                            <StyledTableCell align="left">{item.Cab_cEnlace}</StyledTableCell>

                            <StyledTableCell align="left"><Button variant="contained" size="small" color="primary" onClick={() => editar(item.Emp_cCodigo, item.Cab_cCatalogo, item.Cab_nItem)} >Editar</Button></StyledTableCell>
                            <StyledTableCell align="left"><Button variant="contained" size="small" color="primary" onClick={() => eliminar(item.Emp_cCodigo, item.Cab_cCatalogo, item.Cab_nItem)} >Eliminar</Button></StyledTableCell>
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

export default ListaCatalogoImagenes