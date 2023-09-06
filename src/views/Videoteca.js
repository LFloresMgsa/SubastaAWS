import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import ReactPlayer from 'react-player'
import { eventoService } from '../services/evento.service';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import '../css/Video.css';
import Grid from '@mui/material/Grid';

import { storage } from "../storage.js";

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
// });

function Videoteca() {
  const [videos, setVideos] = useState([]);
  const [contenido, setContenido] = useState('');

  const obtenerVideos = async () => {
    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo") }


    return await eventoService.obtenerVideos(_body).then(
      (res) => {
        setVideos(res[0]);
      },
      (error) => {
        console.log(error);
      }
    );


  };


  const [playerWidth, setPlayerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setPlayerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let gridItemSize;
  let playerAspectRatio;

  if (playerWidth >= 1280) {
    // En una computadora (Grid dividido en 3 partes)
    gridItemSize = 4;
    playerAspectRatio = 16 / 9;
  } else {
    // En un equipo móvil (Grid en una columna del 100%)
    gridItemSize = 12;
    playerAspectRatio = 4 / 3;
  }

  useEffect(() => {
    obtenerVideos();
  }, []);

  return (


    <div>
      <div>
        <h3>Videoteca</h3>
      </div>
      <div >

        <ImageList cols={1} >
          <Grid container spacing={1}>
            {videos.map(video => (

              <Grid item xs={gridItemSize}  key={`${video.Emp_cCodigo}-${video.Lgt_nIndice}`}>
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
                  <div>
                    <div>
                      <h3>{video.Lgt_cTitulo}</h3>
                    </div>

                    <div >
                      <ReactPlayer
                        url={video.Lgt_cURL}
                        style={{ width: '100%' }}
                        width="100%"
                        height="100%"
                        controls
                        loop
                      />
                    </div>
                    <div>
                      <br></br>
                      <h3>Contenido: </h3>
                      <TextField
                        label=""
                        multiline

                        value={video.Lgt_cComentario}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{
                          "& fieldset": { border: 'none' },
                        }}
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>

            ))}
          </Grid>
        </ImageList>

      </div>

    </div>
  );
}

export default Videoteca;