import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaVideoteca from '../components/mantenimientos/Videoteca/ListaVideoteca';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class MantEvento extends Component {

    componentDidMount() {
        if (!cookies.get('Sgm_cUsuario')) {
            window.location.href = "./login";
        }
    };

    render() {
        return (
            <div >

                <div>
                    <h3>Mantenimiento - Videoteca</h3>
                </div>

 
                <ListaVideoteca />                  
            </div>
        );
    }
};

export default MantEvento;
