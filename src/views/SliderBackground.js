import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Grid from '@mui/material/Grid';


const IndicatorWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  top: 15px;
  left: 15px;
`;

const Dot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background-color: white;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  margin: 5px;
  transition: 750ms all ease-in-out;
`;

const Wrapper = styled.div`
  height: 91vh;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  position: relative;
`;

const Slide = styled.div`
  height: 100%;
  width: 100vw;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
  transition: 750ms all ease-in-out;
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  text-shadow: 0 0 0.5rem rgb(9, 9, 34);
  transform: translate(-50%, -50%);
`;

const ImageTitle = styled.div`
  position: absolute;
  left: 50%;
  top: 45%;
  
  color: #fff;
  text-shadow: 0 0 0.5rem rgb(9, 9, 34);
	font-size: 2rem;
	font-weight: bold;
  text-align: left;
  transform: translate(-50%, -50%);
`;

const ImageContent = styled.div`
  position: absolute;
  left: 50%;
  top: 70%;
  color: #fff;
  text-shadow: 0 0 0.5rem rgb(9, 9, 34);
	font-size: 1.5rem;
	font-weight: normal;
	text-align: center;
  transform: translate(-50%, -50%);
`;

const Gradient = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
`;

const Indicator = ({ currentSlide, amountSlides, nextSlide }) => {
  return (
    <IndicatorWrapper>
      {Array(amountSlides)
        .fill(1)
        .map((_, i) => (
          <Dot
            key={i}
            isActive={currentSlide === i}
            onClick={() => nextSlide(i)}
          />
        ))}
    </IndicatorWrapper>
  );
};

const ImageSlider = ({
  images = [],
  autoPlay = true,
  autoPlayTime = 10000,
  children,
  data = [],
  ...props
}) => {
  const [currentSlide, setCurrentSlide] = useState(3);
  const [currentInfo, setCurrentInfo] = useState([]);


  function nextSlide(slideIndex = currentSlide + 1) {
    const newSlideIndex = slideIndex >= images.length ? 0 : slideIndex;

    let filtro = data.filter(item => item.Lgt_nIndice == newSlideIndex)


    setCurrentInfo(filtro);

    setCurrentSlide(newSlideIndex);
  }




  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, autoPlayTime);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <Wrapper {...props}>
      {images.map((imageUrl, index) => (
        <Slide
          key={index} {...imageUrl}
          style={{
            backgroundImage: `url(${imageUrl})`,
            width: '100%',
            height: '100%',
            marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined,
          }}
        >
        </Slide>

      ))}

      <Gradient />
      <Indicator
        currentSlide={currentSlide}
        amountSlides={images.length}
        nextSlide={nextSlide}
      />

      <ChildrenWrapper>{children}</ChildrenWrapper>
      {currentInfo && (currentInfo.map((item, index) => (
        <div key={item.Lgt_nIndice}>
          <ImageContent >
            <h2> {item.Lgt_cTitulo}</h2>
            <br />
            {item.Lgt_cComentario}
          </ImageContent>
        </div>

      ))
      )
      }


    </Wrapper>
  );
};

export default ImageSlider;