import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import { useLocation, useParams } from 'react-router-dom';

import ItemDetalle from '../components/subasta/ItemDetalle';
import ItemPuja from '../components/subasta/ItemPuja';


const SubastaDetalle = (props) => {


    const pCab_cCatalogo = useParams().Cab_cCatalogo;
    const pDvm_cNummov = useParams().Dvm_cNummov;
    const pIndicePanel = useParams().IndicePanel;
    const pPer_cPeriodo = useParams().Per_cPeriodo;
    

    return (
        <div>
            <ItemDetalle pCab_cCatalogo={pCab_cCatalogo} pDvm_cNummov={pDvm_cNummov}/>
            <ItemPuja pCab_cCatalogo={pCab_cCatalogo} pDvm_cNummov={pDvm_cNummov}  pEventoActual={props.pEventoActual} pIndicePanel={pIndicePanel} pPer_cPeriodo={pPer_cPeriodo}/>            
        </div>
    );
};

export default SubastaDetalle;
