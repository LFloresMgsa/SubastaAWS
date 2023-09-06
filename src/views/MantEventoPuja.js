import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaEventoDetPuja from '../components/mantenimientos/EventoPuja/ListaEventoPuja';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class MantEventoPuja extends Component {

    componentDidMount() {
        if (!cookies.get('Sgm_cUsuario')) {
            window.location.href = "./login";
        }
    };

    render() {
        return (
            <div >

                <div>
                    <h3>Mantenimiento - Evento Puja</h3>
                </div>

                <ListaEventoDetPuja />                  
            </div>
        );
    }
};

export default MantEventoPuja;
