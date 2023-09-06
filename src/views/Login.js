import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@mui/styles';
import fondo from '../assets/images/circulo.png'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { eventoService } from '../services/evento.service';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
	root: {
		backgroundImage: `url(${fondo})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',

		height: '91vh'
	},
	container: {
		opacity: '1',
		height: '70%',

		marginTop: theme.spacing(10),
		[theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		}
	},
	div: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},




	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(3, 0, 2)

	}
}))

const Login = () => {
	const [body, setBody] = useState({ nickname: '', password: '' })
	const classes = useStyles()
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [logeo, setLogeo] = useState('');
	const [error, setError] = useState('');
	const [Token, setToken] = useState('');


	const BuscarToken = async () => {

		try {
			let _body = { Accion: "BUSCARREGISTRO", Sgm_cUsuario: username, Sgm_cContrasena: md5(password) }

			// obtenemos el token
			await eventoService.obtenerToken(_body).then(
				(res) => {
					setToken(res)
				},
				(error) => {
					console.log(error);
				}
			);
			/*
				  console.log('------------**********');
				  console.log(username);
				  console.log(password);
				  console.log(Token.token);
				  console.log('------------**********');
			*/

			if (Token) {
				cookies.set('token', Token.token, { path: "/" });
				setError('');
			}
		} catch (error) {
			setError('An error occurred while trying to login - token');
		}
	};


	const handleLogin = async () => {

		try {

			// genera un token
			await BuscarToken();

			// valida si encontro el token

			if (!cookies.get('token')) {
				throw "Error: Token no existe";
			}

			let _body = { Accion: "BUSCARREGISTRO", Sgm_cUsuario: username, Sgm_cContrasena: md5(password) }
			let _result;

			// si encontro el token ingresa el login
			await eventoService.obtenerUsuario(_body).then(

				(res) => {
					setLogeo(res[0]);
					_result = res[0];
				},
				(error) => {
					console.log(error);
				}
			);

			if (_result[0].Sgm_cUsuario == username) {

				cookies.set('Sgm_cUsuario', _result[0].Sgm_cUsuario, { path: "/" });
				cookies.set('Sgm_cNombre', _result[0].Sgm_cNombre, { path: "/" });
				cookies.set('Sgm_cContrasena', _result[0].Sgm_cContrasena, { path: "/" });
				cookies.set('Sgm_cObservaciones', _result[0].Sgm_cObservaciones, { path: "/" });
				cookies.set('Sgm_cPerfil', _result[0].Sgm_cPerfil, { path: "/" });

				cookies.set('IsLoged', true , { path: "/" });

				setError('');

				if (cookies.get('token')) {
					window.location.href = "./inicio";
				}


			}
		} catch (error) {
			setError('');

		}
	};


	return (
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
				<div className={classes.div}>

					<Grid container spacing={1}  >

						<Grid item xs={12} lg={12} >

							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>

						</Grid>
						<Grid item xs={12} lg={12}>


							<Typography component='h1' variant='h5'>Galpón Legado</Typography>

						</Grid>
						<Grid item xs={12} lg={12}>

							<form className={classes.form}>

								<Grid container spacing={1}>

									<Grid item xs={12} lg={12}>

										<TextField
											fullWidth
											autoFocus
											color='primary'
											margin='normal'
											variant='outlined'
											label='Usuario'
											name='nickname'
											value={username}
											onChange={(e) => setUsername(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12} lg={12}>
										<TextField
											fullWidth
											type='password'
											color='primary'
											margin='normal'
											variant='outlined'
											label='Contraseña'
											name='password'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12} lg={12}>
										<Button
											fullWidth
											variant='contained'
											color='primary'
											className={classes.button}
											onClick={handleLogin}
										>
											Ingresar
										</Button>
									</Grid>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</div>
			</Container >
		</Grid >
	)
}

export default Login
