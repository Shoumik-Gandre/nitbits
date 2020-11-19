import React from "react";
import Grid from "@material-ui/core/Grid";
import LoginImg from '../../static/images/login_page_img_00.png';
import { makeStyles } from "@material-ui/core/styles";
import LSWrapper from './LSWrapper/LSWrapper';
import Particles from 'react-particles-js';
import "./LandingPage.css";

function LandingPage({ handleLogIn, currentUser, setCurrentUser }) {

	const useStyles = makeStyles((theme) => ({
		landing_container_left: {
			marginTop: "-30px",
			margin: "auto",
		},
		landing_container_right: {
			margin: "auto",
			marginTop: "-30px",
		},
	}));

	const classes = useStyles();

	return (
		<div>
			<Particles
				params={{
					"particles": {
						"number": {
							"value": 50
						},
						"size": {
							"value": 3
						}
					},
					"interactivity": {
						"events": {
							"onhover": {
								"enable": true,
								"mode": "repulse"
							}
						}
					}
				}}
			/>
			<div className="landing-page-wrap">
				<div>
					<h1 className="header-title">Nitbits</h1>
				</div>
				<Grid container>
					<Grid className={classes.landing_container_left} item xs={5} md={5} sm={7}>
						<img src={LoginImg} alt='alt' />
						<h1 className="login-img-content">Let's cook nits ...</h1>
					</Grid>
					<Grid className={classes.landing_container_right} item xs={5} md={6} sm={5}>
						<LSWrapper handleLogIn={handleLogIn} />
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default LandingPage;
