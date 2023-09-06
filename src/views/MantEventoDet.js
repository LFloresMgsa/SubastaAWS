import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaEventoDet from '../components/mantenimientos/EventoDet/ListaEventoDet';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class MantEventoDet extends Component {

    componentDidMount() {
        if (!cookies.get('Sgm_cUsuario')) {
            window.location.href = "./login";
        }
    };

    render() {
        return (
            <div >

                <div>
                    <h3>Mantenimiento - Evento Detalle</h3>
                </div>

                <ListaEventoDet />      
            </div>
        );
    }
};

export default MantEventoDet;
