import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';

import AppRoutes from './AppRoutes';
import Menu from './components/layout/menu/Index';
import ComponentAlert from './components/common/others/ComponentAlert';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';




const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    typeFullName: 'darkTheme1',
    default: {
      main: '#c7c4c4',
    },
    primary: {
      main: '#15d683',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1976d2',
    },
    danger: {
      main: '#C62828',
    },
    error: {
      main: '#E53935',
    },
    nsAppBG: {
      main: '',
    },
    nsAppDialogHeaderBG: {
      main: '#1976d2',
    },
    nsTileHeaderBG: {
      main: '',
    },
    nsTileBodyBG: {
      main: '',
    },
    nsAppHeaderBG: {
      main: '',
    },
    nsLeftMenuTextColor: '#cfcfcf',
    nsDangerColor: {
      main: '#C62828',
      hover: '#8c1c1c',
      contrastText: '#ffffff',
    },
    nsTableRowUpload: {
      main: '#6b6e6e',
    },
    nsTableHeaderBG: {
      main: '#424242',
    },
    nsTableBodyBG: {
      main: '',
    },
    nsTableRowHoverBG: {
      main: '#424242',
    },
    nsStickDivBG: {
      main: '#303030',
    },
    nsPanelInfoBG: {
      main: '',
    },
  },
  
});

const AppBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

const useStyles = makeStyles((theme) => ({
  root: ({ isUserLogged }) => ({



    display: isUserLogged ? 'flex' : 'block',
    '& .MuiAppBar-positionFixed': { zIndex: 1201 },

    '& .MuiAppBar-root': {
      padding: 0,
      paddingRight: '0 !important',

      '& .MuiToolbar-root': {
        '& .toolbar-left': {
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',

          '& div:first-child': {
            marginRight: '15px',
            
          },
        },
        '& .toolbar-right': {},
      },
    },

    '& .content': {
      width: '100%',
    },
  }),
}));





function AppContent(props) {
  const { accessToken, portalTabs, menuState, viewport } = props;
  const appAlerts = useSelector((state) => state.appAlerts);
 
  
  const classes = useStyles({
    // isUserLogged: accessToken.token ? true : false,
    isUserLogged: accessToken.token ? true : true,
  });



  return (
    <div className={classes.root} >

      <ThemeProvider theme={darkTheme} > 

        <Menu
          viewport={viewport}
          state={menuState}
          global={props.global}
          tabs={portalTabs}
        />
       </ThemeProvider>


      <main className="content">
        {appAlerts.length > 0 && <ComponentAlert menuState={menuState} />}
        <AppBarOffset />
        <AppRoutes {...props} />
      </main>
    </div>
  );
}

export default AppContent;

