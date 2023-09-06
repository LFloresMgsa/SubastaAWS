import React, { Fragment } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import MissedVideoCallOutlinedIcon from '@mui/icons-material/MissedVideoCallOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import StoreIcon from '@mui/icons-material/Store';

import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ReportIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import styled from 'styled-components';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.background.paper,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    color: 'inherit',
    fontSize: 12,
  },
}));

const styles = makeStyles((theme) => ({
  root: {
    height: '50px',
    padding: '0px',
    paddingTop: '4px !important',
    paddingBottom: '4px !important',

    '& a': {
      textDecoration: 'none',
      width: '100%',
      height: 'inherit',
      zIndex: 10,
      color: theme.palette.nsLeftMenuTextColor,
    },

    '& .MuiSvgIcon-root': {
      left: '20px',
      position: 'absolute',
      color: 'lightslategray',
      height: 'inherit',
    },

    '& .MuiListItemText-root': {
      marginLeft: '10px',
    },

    '&.MuiListItem-button:hover': {
      backgroundColor: `${theme.palette.background.default} !important`,
    },

    '&.Mui-selected': {
      backgroundColor: `${theme.palette.background.default} !important`,
      borderLeft: `5px solid ${theme.palette.primary.main} `,
      color: 'white',

      '& .svg-inline--fa, .MuiSvgIcon-root': {
        left: '15px',
      },

      '& .MuiTypography-root': {
        fontFamily: 'system-ui',
        paddingLeft: '55px !important',
        textShadow: '0 0 black',
      },
    },

    '& .MuiTypography-root': {
      fontFamily: 'system-ui',
      paddingLeft: '60px',
      lineHeight: '42px',
    },
  },
}));

const Item = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const classes = styles();
  const { viewport, tabName, routeName, style } = props;

  const currentActiveTabID = useSelector((state) => state.activeTabID || 0);

  const tabIcon = () => {
    switch (routeName) {
      case 'home':
      case 'dashboard':
      case 'inicio':
        return <DashboardOutlinedIcon />;
      case 'tienda':
        return <StoreIcon />;
      case 'videoteca':
        return <MissedVideoCallOutlinedIcon />;
      case 'Subasta':
        return <CrisisAlertIcon />;

      case 'Ganadores':
        return <CrisisAlertIcon />;

      case 'Topes':
        return <CrisisAlertIcon />;

      case 'MantCatalogo':
        return <LibraryAddCheckOutlinedIcon />;

      case 'MantCatalogoImagenes':
        return <LibraryAddCheckOutlinedIcon />;

      case 'MantVideoteca':
        return <LibraryAddCheckOutlinedIcon />;
      case 'MantEvento':
        return <LibraryAddCheckOutlinedIcon />;
      case 'MantEventoDet':
        return <LibraryAddCheckOutlinedIcon />;
      case 'MantEventoPuja':
        return <LibraryAddCheckOutlinedIcon />;
      case 'MantPedido':
        return <LibraryAddCheckOutlinedIcon />;

      case 'MantPedido':
        return <LibraryAddCheckOutlinedIcon />;

      // case 'Login':
      //   return <LoginIcon />;
      // case 'Logout':
      //   return <LogoutIcon />;


      case 'signing-request':
        return <FeaturedPlayListOutlinedIcon />;
      case 'management':
        return <BusinessCenterOutlinedIcon />;
      case 'business-settings':
        return <SettingsOutlinedIcon />;
      case 'manage-request':
        return <ViewListOutlinedIcon />;
      case 'contact-manager':
        return <ContactPageOutlinedIcon />;
      case 'notary-desk':
        return <DoneAllIcon />;
      case 'user-admin':
        return <ManageAccountsIcon />;
      case 'reports':
        return <ReportIcon />;
      default:
        break;
    }
  };

  const handleMenuClose = () => {
    if (['xs', 'sm'].includes(viewport)) {
      dispatch({
        type: 'SET_MENU_STATE',
        payload: 'hidden',
      });
    }
  };

  return (
    <ListItem
      button
      className={`${classes.root} ${style}`}
      selected={currentActiveTabID === props.tabID}
    >
      {style !== 'icons' && (
        <Fragment>
          {tabIcon()}
          <Link
            to={{ pathname: `/${props.routeName}` }}
            onClick={() => handleMenuClose()}
          >
            <ListItemText primary={tabName} />
          </Link>
        </Fragment>
      )}
      {style === 'icons' && (
        <LightTooltip title={tabName} arrow placement="right">
          <Link
            to={{ pathname: `/${props.routeName}` }}
            onClick={() => handleMenuClose()}
          >
            {tabIcon()}
          </Link>
        </LightTooltip>
      )}
    </ListItem>
  );
});

export default Item;
