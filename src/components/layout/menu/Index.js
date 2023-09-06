import React, { Fragment, useState, useEffect } from 'react';
import MenuItems from './MenuItems';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';

import { Avatar, Chip, Drawer } from '@mui/material';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


const StyledMenu = styled(Drawer)(
  ({ theme, viewport, state }) => css`
    display: ${['expanded', 'icons'].includes(state.current)
      ? 'block'
      : 'none'};
    width: ${state.width};
    position: sticky;
    top: 50px;
    border-top: 0;

    .MuiPaper-root {
      border-top: 0;
      width: ${state.width};
      margin-top: ${['xs', 'sm'].includes(viewport) ? '0px' : '50px'};
      justify-content: space-between;
      background-color: black;
      //background-color: ${theme.palette.sbAppBarYMenuBG?.main};
      
      

    }

    #menu-dev-info {
      text-align: center;
    }

    #logo-and-timer {
      height: 150px;

      .portalLogo {
        img {
          max-width: 200px;
          display: block;
          margin: auto;
        }
      }

      .appTimer {
        display: flex;
        justify-content: center;

        div:first-child {
          color: brown;
          font-weight: 600;
          padding-right: 10px;
        }
      }
    }
  `
);

// Menu states are "expanded  | icons | hidden"

const _temp_tabs = [
  {
    index: 1, // ***
    tabID: 1, // ***
    portalID: 9,
    tabName: 'Inicio', // ***
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;-1;',
    authorizedRolesAllString: ' Root, All, Users , Admin',
    administratorRoles: '65;',
    tabOrder: 1,
    isVisible: true,
    componentName: '',
    routeName: 'inicio', // ***
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [],
  },
  {
    index: 2,
    tabID: 2,
    portalID: 9,
    tabName: 'Tienda',
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;68;-3;',
    authorizedRolesAllString: ' Root',
    administratorRoles: '65;',
    tabOrder: 2,
    isVisible: true,
    componentName: '',
    routeName: 'tienda',
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [],
  },
  {
    index: 3,
    tabID: 3,
    portalID: 9,
    tabName: 'Videoteca',
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;68;-3;',
    authorizedRolesAllString: ' Root',
    administratorRoles: '65;',
    tabOrder: 3,
    isVisible: true,
    componentName: '',
    routeName: 'videoteca',
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [],
  },
  {
    index: 4,
    tabID: 4,
    portalID: 9,
    tabName: 'Subasta',
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;68;-3;',
    authorizedRolesAllString: ' Root, All, Users, Admin',
    administratorRoles: '65;',
    tabOrder: 4,
    isVisible: true,
    componentName: '',
    routeName: 'Subasta',
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [
      {
        index: 400,
        tabID: 400,
        portalID: 9,
        tabName: 'Pujas',
        title: '',
        description: '',
        parentId: 4,
        level: 1,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, All, Users, Admin',
        administratorRoles: '65;',
        tabOrder: 4,
        isVisible: true,
        componentName: '',
        routeName: 'Subasta',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },
      {
        index: 401,
        tabID: 401,
        portalID: 9,
        tabName: 'Ganadores',
        title: '',
        description: '',
        parentId: 4,
        level: 1,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, Users, Admin',
        administratorRoles: '65;',
        tabOrder: 14,
        isVisible: true,
        componentName: '',
        routeName: 'Ganadores',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },

      {
        index: 402,
        tabID: 402,
        portalID: 9,
        tabName: 'Topes',
        title: '',
        description: '',
        parentId: 4,
        level: 1,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, Users, Admin',
        administratorRoles: '65;',
        tabOrder: 14,
        isVisible: true,
        componentName: '',
        routeName: 'Topes',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },      
    ],
  },
  {
    index: 5,
    tabID: 5,
    portalID: 9,
    tabName: 'Mantenimiento',
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;68;-3;',
    authorizedRolesAllString: ' Root, Admin, Users',
    administratorRoles: '65;',
    tabOrder: 5,
    isVisible: true,
    componentName: '',
    routeName: 'Mantenimiento',
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [
      {
        index: 501,
        tabID: 501,
        portalID: 9,
        tabName: 'Catalogo',
        title: '',
        description: '',
        parentId: -1,
        level: 0,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, Admin',
        administratorRoles: '65;',
        tabOrder: 5,
        isVisible: true,
        componentName: '',
        routeName: 'MantCatalogo',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },
    
      {
        index: 502,
        tabID: 502,
        portalID: 9,
        tabName: 'Cat.Imagenes',
        title: '',
        description: '',
        parentId: -1,
        level: 0,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, Admin',
        administratorRoles: '65;',
        tabOrder: 6,
        isVisible: true,
        componentName: '',
        routeName: 'MantCatalogoImagenes',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },
    
      {
        index: 503,
        tabID: 503,
        portalID: 9,
        tabName: 'Videoteca',
        title: '',
        description: '',
        parentId: -1,
        level: 0,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, Admin',
        administratorRoles: '65;',
        tabOrder: 7,
        isVisible: true,
        componentName: '',
        routeName: 'MantVideoteca',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },
    
      {
        index: 504,
        tabID: 504,
        portalID: 9,
        tabName: 'Evento',
        title: '',
        description: '',
        parentId: -1,
        level: 0,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, Admin',
        administratorRoles: '65;',
        tabOrder: 8,
        isVisible: true,
        componentName: '',
        routeName: 'MantEvento',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },
    
      {
        index: 505,
        tabID: 505,
        portalID: 9,
        tabName: 'Evento Det.',
        title: '',
        description: '',
        parentId: -1,
        level: 0,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, Admin',
        administratorRoles: '65;',
        tabOrder: 9,
        isVisible: true,
        componentName: '',
        routeName: 'MantEventoDet',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },
    
      {
        index: 506,
        tabID: 506,
        portalID: 9,
        tabName: 'Evento Puja',
        title: '',
        description: '',
        parentId: -1,
        level: 0,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, Admin, Users',
        administratorRoles: '65;',
        tabOrder: 10,
        isVisible: true,
        componentName: '',
        routeName: 'MantEventoPuja',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },
      {
        index: 507,
        tabID: 507,
        portalID: 9,
        tabName: 'Pedido',
        title: '',
        description: '',
        parentId: -1,
        level: 0,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, Admin',
        administratorRoles: '65;',
        tabOrder: 11,
        isVisible: true,
        componentName: '',
        routeName: 'MantPedido',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },


    ],
  },



  // {
  //   index: 12,
  //   tabID: 12,
  //   portalID: 9,
  //   tabName: 'Login',
  //   title: '',
  //   description: '',
  //   parentId: -1,
  //   level: 0,
  //   authorizedRoles: '65;68;-3;',
  //   authorizedRolesAllString: ' Root, Users, Admin',
  //   administratorRoles: '65;',
  //   tabOrder: 12,
  //   isVisible: true,
  //   componentName: '',
  //   routeName: 'Login',
  //   isDisabled: false,
  //   isDeleted: false,
  //   wasUpdated: false,
  //   tabChildren: [],
  // },

  // {
  //   index: 13,
  //   tabID: 13,
  //   portalID: 9,
  //   tabName: 'Cerrar Sesion',
  //   title: '',
  //   description: '',
  //   parentId: -1,
  //   level: 0,
  //   authorizedRoles: '65;68;-3;',
  //   authorizedRolesAllString: ' Root, Users, Admin',
  //   administratorRoles: '65;',
  //   tabOrder: 13,
  //   isVisible: true,
  //   componentName: '',
  //   routeName: 'Logout',
  //   isDisabled: false,
  //   isDeleted: false,
  //   wasUpdated: false,
  //   tabChildren: [],
  // },
];




const Menu = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { viewport, state, global } = props;


  let tabs = _temp_tabs
    .map(item => {
      const subarrayFiltrado = item.tabChildren.filter(subitem => subitem.authorizedRolesAllString.indexOf("All") > 0);
      return { ...item, tabChildren: subarrayFiltrado };
    })
    .filter(_temp_tabs => _temp_tabs.authorizedRolesAllString.indexOf("All") > 0);



  if (cookies.get('Sgm_cUsuario') != "" && cookies.get('Sgm_cUsuario') != null) {

    tabs = _temp_tabs
    .map(item => {
      const subarrayFiltrado = item.tabChildren.filter(subitem => subitem.authorizedRolesAllString.indexOf(cookies.get('Sgm_cPerfil')) > 0);
      return { ...item, tabChildren: subarrayFiltrado };
    })    
    .filter(_temp_tabs => _temp_tabs.authorizedRolesAllString.indexOf(cookies.get('Sgm_cPerfil')) > 0);
  }


  const sortMenuItems = tabs.sort((a, b) => (a.tabOrder > b.tabOrder ? 1 : -1));


  const drawerContent = (
    <Fragment>
      <div id="menu-tabs">
        <MenuItems
          viewport={viewport}
          menuState={state}
          items={sortMenuItems}
        />
      </div>
    </Fragment>
  );

  const container = !window ? () => window().document.body : undefined;



  return (
    <>
      <StyledMenu
        state={state}
        viewport={viewport}
        container={container}
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={state.current === 'expanded' ? true : false}
        onClose={() =>
          dispatch({
            type: 'SET_MENU_STATE',
            payload: 'hidden',
          })
        }
        ModalProps={{ keepMounted: true }}
        sx={{ display: { sm: 'block', md: 'none' } }}
      >
        {drawerContent}
      </StyledMenu>
      <StyledMenu
        state={state}
        viewport={viewport}
        variant="permanent"
        open={state.current === 'expanded' ? true : false}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {drawerContent}
      </StyledMenu>
    </>
  );
};

export default Menu;
