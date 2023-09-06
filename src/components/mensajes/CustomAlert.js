import React from 'react';
import { makeStyles } from '@mui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    alert: {
      backgroundColor: theme.palette.warning.main,
    },
    confirm: {
      backgroundColor: theme.palette.success.main,
    },
  }));

  function CustomAlert(props) {
    const classes = useStyles();
  
    const { type, message, open, onClose } = props;
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      onClose();
    };
  
    const handleConfirm = () => {
      onClose();
    };
  
    const handleAccept = () => {
      onClose(true);
    };
    
    const handleCancel = () => {
      onClose(false);
    };
    

    return (
      <div className={classes.root}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={type === 'alert' ? 'warning' : 'success'}
            className={type === 'alert' ? classes.alert : classes.confirm}
            onClose={handleClose}
            action={
              type === 'confirm' && (
                <>
                  <Button color="inherit" size="small" onClick={handleAccept}>
                    Aceptar
                  </Button>
                  <Button color="inherit" size="small" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </>
              )
            }            
          >
            {message}

          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
  export default CustomAlert;
