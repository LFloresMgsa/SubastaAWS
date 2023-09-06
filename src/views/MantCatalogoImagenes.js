import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaCatalogoImagenes from '../components/mantenimientos/CatalogoImagenes/ListaCatalogoImagenes';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class MantCatalogoImagenes extends Component {

    componentDidMount() {
        if (!cookies.get('Sgm_cUsuario')) {
            window.location.href = "./login";
        }
    };

    render() {
        return (
            <div >

                <div>
                    <h3>Mantenimiento - Catalogo Imagenes</h3>
                </div>

                <ListaCatalogoImagenes />                
            </div>
        );
    }
};

export default MantCatalogoImagenes;
