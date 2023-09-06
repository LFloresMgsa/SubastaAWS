import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { eventoService } from '../services/evento.service.js';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import GlobalStyles from './GlobalStyles.jsx';
import ImageSlider from './SliderBackground.js'
import '../css/imagenfondo.css'



import image1 from "../assets/images/slide_1.jpeg";
import image2 from "../assets/images/slide_2.jpeg";
import image3 from "../assets/images/slide_3.jpeg";
import image4 from "../assets/images/slide_4.jpeg";
import image5 from "../assets/images/slide_5.jpeg";
import image6 from "../assets/images/slide_6.jpeg";
import image7 from "../assets/images/slide_7.jpeg";
import { storage } from "../storage.js";

import WebPage from "./WebPage.js"

import fondo from '../assets/portada/fondo.png'

const Dashboard = () => {

  const [data, setData] = useState([]);

  // // procedimiento para CONSULTA un catalogo con SP MySQL
  // const obtenerImagenes = async () => {
  //   let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo") }


  //   return await eventoService.obtenerImagenes(_body).then(
  //     (res) => {
  //       setData(res[0]);
  //       // console.log(res[0]);
  //     },
  //     (error) => {
  //       console.log(error);

  //     }
  //   );
  // };

  // useEffect(() => {
  //   obtenerImagenes();

  // }, []);



  return (
    <>
      {/* <GlobalStyles />  */}

  

          <div className="container" >
            <div className="image-container">
              <img className="centered-image" src={fondo} alt="campeonato" />
            </div>
          </div>


          <div >
            {/* <ImageSlider images={[image1, image2, image3, image4, image5, image6, image7]} data={data}> */}
            {/* <img
              src={fondo}
              alt="campeonato"
            /> */}

            {/* <ImageSlider images={[evento01, evento01, evento01]} data={data}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#fff",
              fontSize: "30px"
            }}
          >
          </div>
        </ImageSlider> */}
            {/* <WebPage/>  */}
          </div>





    </>
  );

};

export default Dashboard;
