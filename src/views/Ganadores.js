import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaGanadores from '../components/mantenimientos/Ganadores/ListaGanadores';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Ganadores extends Component {

    componentDidMount() {
        if (!cookies.get('Sgm_cUsuario')) {
            window.location.href = "./login";
        }
    };

    render() {
        return (
            <div >

                <div>
                <h3>Lista Ganadores</h3>
                </div>

                <ListaGanadores />
            </div>
        );
    }
};

export default Ganadores;
