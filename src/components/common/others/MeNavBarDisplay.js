import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import {
  Button,
  Menu,
  Box,
  Avatar,
  ListItemIcon,
  Divider,
  ButtonGroup,
  ListItemText,
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';

import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import { store } from '../../../store';
import { userService } from '../../../services';
import { useDispatch } from 'react-redux';
import { appThemes, appColors } from '../../../theme/AppThemes';
import { AccountBoxOutlined } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const StyledMenu = styled(Menu)(
  ({ theme }) => css`
    & .menuItem {
      .MuiButtonGroup-grouped {
        min-width: 30px;
      }

      .activeBtnInGroup {
        color: ${theme.palette.primary.main};
      }

      .MuiMenuItem-root {
        justify-content: space-between;
      }

      .menuItemLabel {
        display: flex;
        min-width: 170px;
        align-items: center;
      }

      .MuiListItemIcon-root {
        min-width: 30px;
      }

      .menu-list-box {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  `
);

const MeNavBarDisplay = (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const currentAppThemeFullName = theme.palette.typeFullName;
  const currentPrimaryAppColor = theme.palette.primary.main;

  const { mixedRoute, currentUser } = store.getState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [localize, setLocalize] = useState('English');

  const [isLoged, setIsLoged] = useState(false);

  const openMenu = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {

    window.location.href = "../../login";
  };

  const handleLogout = () => {

    window.location.href = "../../logout";
  };


  // const handleProfile = () => {
  //   history.push(
  //     currentUser.userRoles.includes('Customer')
  //       ? `/profile/customer/${currentUser.detail.userID}`
  //       : `/profile/agent/${currentUser.detail.publicID}`
  //   );
  // };

  // const languageButtons = [
  //   <Button
  //     color={'default'}
  //     key="en"
  //     onClick={(e) => {
  //       setLocalize('English');
  //       i18n.changeLanguage('en');
  //     }}
  //   >
  //     <span className={`${localize === 'English' ? 'activeBtnInGroup' : ''}`}>
  //       EN
  //     </span>
  //   </Button>,
  //   <Button
  //     color={'default'}
  //     key="es"
  //     onClick={(e) => {
  //       setLocalize('Spanish');
  //       i18n.changeLanguage('es');
  //     }}
  //   >
  //     <span className={`${localize === 'Spanish' ? 'activeBtnInGroup' : ''}`}>
  //       ES
  //     </span>
  //   </Button>,
  // ];


  // Load de Pagina
  useEffect(() => {
    setIsLoged(cookies.get('IsLoged'));


  }, [])

  return (
    <React.Fragment>
      <Box>
        <Button
          color="inherit"
          onClick={handleMenu}
          startIcon={<AccountCircleOutlinedIcon />}
        >
          {currentUser.detail.username}
        </Button>
      </Box>
      <StyledMenu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        variant="menu"
      >
        <div className="menuItem">
          <MenuItem>
            <ListItemIcon>
              <Avatar fontSize="small" />
            </ListItemIcon>
          </MenuItem>

          <Divider />
          
          {/* {!(
            currentUser.userRoles.includes('SuperUser') ||
            currentUser.userRoles.includes('ServiceOwner')
          ) && (
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <AccountBoxOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile Settings</ListItemText>
            </MenuItem>
          )} */}

          {/* <MenuItem>
            <div className="menuItemLabel">
              <ListItemIcon>
                <TranslateIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Language</ListItemText>
            </div>
            <Box className="menu-list-box">
              <ButtonGroup size="small">{languageButtons}</ButtonGroup>
            </Box>
          </MenuItem> */}

          <MenuItem>
            <div className="menuItemLabel">
              <ListItemText>Oscuro/Claro Tema</ListItemText>
            </div>
            <Box className="menu-list-box">
              <ButtonGroup size="small">
                {Object.keys(appThemes).map((theme, index) => {
                  let defaultActiveColor =
                    currentAppThemeFullName === theme ? 'primary' : 'default';
                  return (
                    <Button
                      key={index}
                      color="default"
                      onClick={(e) => {
                        dispatch({
                          type: 'SET_CURRENT_THEME',
                          payload: { customTheme: theme },
                        });
                      }}
                    >
                      {theme === 'darkTheme1' && (
                        <Brightness4OutlinedIcon
                          fontSize="small"
                          color={defaultActiveColor}
                        />
                      )}
                      {theme === 'darkTheme2' && (
                        <DarkModeOutlinedIcon
                          fontSize="small"
                          color={defaultActiveColor}
                        />
                      )}
                      {theme === 'lightTheme' && (
                        <LightModeOutlinedIcon
                          fontSize="small"
                          color={defaultActiveColor}
                        />
                      )}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </Box>
          </MenuItem>

          <Divider />

          <MenuItem>
            <div className="menuItemLabel">
              <ListItemText>Apariencia</ListItemText>
            </div>
            <Box className="menu-list-box">
              <ButtonGroup size="small" sx={{ minWidth: '30px' }}>
                {Object.keys(appColors).map((color, index) => {
                  return (
                    <Button
                      key={index}
                      color="default"
                      onClick={(e) => {
                        dispatch({
                          type: 'SET_CURRENT_THEME',
                          payload: { customColor: color },
                        });
                      }}
                      sx={{ paddingLeft: '2px', paddingRight: '2px' }}
                    >
                      {currentPrimaryAppColor ===
                        appColors[color].palette.primary.main ? (
                        <CircleIcon
                          sx={{
                            width: '0.7em',
                            color: appColors[color].palette.primary.main,
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'
                              }`,
                            borderRadius: '50%',
                            height: '17px',
                          }}
                        />
                      ) : (
                        <CircleIcon
                          sx={{
                            width: '0.7em',
                            color: appColors[color].palette.primary.main,
                          }}
                        />
                      )}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </Box>
          </MenuItem>

          {/* <MenuItem>
            <ListItemIcon>
              <SettingsOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem> */}

          <Divider />

          {!isLoged &&
            <MenuItem onClick={handleLogin} >
              <ListItemIcon>
                <LoginIcon fontSize="small" />

              </ListItemIcon>
              <ListItemText>Iniciar Sesion</ListItemText>
            </MenuItem>
          }
          
          {isLoged &&
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cerrar Sesion</ListItemText>
            </MenuItem>
          }
        </div>
      </StyledMenu>
    </React.Fragment>
  );
};

export default MeNavBarDisplay;
