
import React, { Fragment, useState, useEffect   } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Logout = () => {

    const cerrarSesion = () => {

        cookies.remove('Sgm_cUsuario', { path: "/" });
        cookies.remove('Sgm_cPerfil', { path: "/" });
        cookies.remove('Sgm_cNombre', { path: "/" });
        cookies.remove('Sgm_cContrasena', { path: "/" });
        cookies.remove('Sgm_cObservaciones', { path: "/" });
        cookies.remove('token', { path: "/" });
        cookies.remove('IsLoged', { path: "/" });

        window.location.href = "./inicio";
    }

    // Load de pagina
    useEffect(() => {
        cerrarSesion();
    }, []);

 

    return (

        <div>Saliendo de sesion ...</div>

    );
};

export default Logout;