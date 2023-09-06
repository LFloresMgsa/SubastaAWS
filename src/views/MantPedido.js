import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaPedido from '../components/mantenimientos/Pedido/ListaPedido';
import Cookies from 'universal-cookie';
import Box from '@mui/material/Box';

const cookies = new Cookies();

class MantPedido extends Component {

    componentDidMount() {
        if (!cookies.get('Sgm_cUsuario')) {
            window.location.href = "./login";
        }
    };

    render() {
        return (

            <Box sx={{ p: 2, width: '98%' }}>
                <div >
                    <div>
                        <h3>Mantenimiento - Pedido</h3>
                    </div>

                    <ListaPedido />
                </div>
            </Box>

        );
    }
};

export default MantPedido;
