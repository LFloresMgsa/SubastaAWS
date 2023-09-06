import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Item from './Item';

const findRoute = (array = [], tabID = 'home') => {
  for (const item of array) {
    const result =
      item.tabID === tabID ? item : findRoute(item.tabChildren, tabID);
    if (result) return result;
  }
};

const styles = makeStyles((theme) => ({
  root: {
    '& .MuiListItemText-root': {
      color: 'white',
      fontFamily: 'system-ui',
    },

    '& .MuiSvgIcon-root': {
      position: 'absolute',
      color: 'lightslategray',
    },

    '& .MuiCollapse-root': {
      '& .MuiSvgIcon-root': {
        left: '40px',
        
      },
      '& .Mui-selected .MuiSvgIcon-root': {
        left: '35px',
      },
    },

    '& .MuiCollapse-entered': {
      color: '#bebcbc',
      backgroundColor:
        theme.palette.mode === 'light'
          ? '#f3f6f97a'
          : theme.palette.typeFullName === 'darkTheme2'
          ? '#2632385c'
          : '',
    },

    '& .MuiTypography-root': {
      paddingLeft: '60px',
    },

    '& > div.MuiListItem-root': {
      paddingLeft: '9px',

      '& .MuiSvgIcon-root': {
        marginLeft: '10px',
      },
    },
  },
}));

const MenuCollapse = React.forwardRef((props, ref) => {
  // const mountedRef = useRef(true);
  const classes = styles();
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  // useEffect(() => {
  //   if (mountedRef.current) {
  //     let menuNode = findRoute(props.tabChildren, store.getState().activeTabID);
  //     if (typeof menuNode !== 'undefined') {
  //       handleToggle();
  //     }
  //   }
  //   return () => {
  //     console.log('Check if useEffect needs cleanup!');
  //     mountedRef.current = false;
  //   };
  // }, []);

  return (
    <div className={`${classes.root} ${open ? 'activeCollapse' : ''}`}>
      <ListItem button onClick={handleToggle}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={props.tabName} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.tabChildren.map((item, index) => (
            <Item key={index} viewport={props.viewport} isChild {...item} />
          ))}
        </List>
      </Collapse>
    </div>
  );
});

export default MenuCollapse;
