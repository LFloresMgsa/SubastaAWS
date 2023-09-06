import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';

import ItemContacto from './ItemContacto';

const ItemPuja = (props) => {

    return (
        <div>
            <ItemContacto pCab_cCatalogo={props.pCab_cCatalogo} pDvm_cNummov={props.pDvm_cNummov} pEventoActual={props.pEventoActual} pIndicePanel={props.pIndicePanel} pPer_cPeriodo={props.pPer_cPeriodo} />
        </div>
    );
};

export default ItemPuja;
