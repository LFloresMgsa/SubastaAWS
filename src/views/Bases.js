import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import Box from '@mui/material/Box';
import Bases from '../components/subasta/bases';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';

const Subasta = (props) => {
    const history = useHistory();

    const handleRegresarSubasta = () => {
        console.log("handleRegresarSubasta");
        history.push({
            pathname: '/pujas'
        });
    }

    return (

        <Box sx={{  p: 2,width: '100%' }}>
            <h3>Bases de la Subasta</h3>
            <Bases />

            <Grid container style={{ height: '100%', width: '100%' }} justify="center" alignItems="center">

                <Grid item xs={4} lg={4}>


                </Grid>
                <Grid item xs={4} lg={4}>

                    <Button variant="contained" size="small" color="primary" onClick={handleRegresarSubasta}>Iniciar Subasta</Button>

                </Grid>
                <Grid item xs={4} lg={4}>


                </Grid>

            </Grid>
        </Box>

    );
};

export default Subasta;

