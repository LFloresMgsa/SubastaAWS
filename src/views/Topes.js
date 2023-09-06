import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaGanadores from '../components/mantenimientos/Topes/ListaTopes';
import Cookies from 'universal-cookie';
import Box from '@mui/material/Box';

const cookies = new Cookies();

class Ganadores extends Component {

    componentDidMount() {
        if (!cookies.get('Sgm_cUsuario')) {
            window.location.href = "./login";
        }
    };

    render() {
        return (
            <Box sx={{ p: 2, width: '100%' }}>
                <div >

                    <div>
                        <h3>Mantenimiento de Topes</h3>
                    </div>

                    <ListaGanadores />
                </div>
            </Box>
        );
    }
};

export default Ganadores;
