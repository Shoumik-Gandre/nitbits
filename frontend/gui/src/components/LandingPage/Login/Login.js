import React, {useState} from 'react'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import './Login.css';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 450,
      margin: "auto",
      textAlign: "center",
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
      backgroundColor: "#2a3840",
    },
    error: {
      verticalAlign: "middle",
    },
    title: {
      marginTop: theme.spacing(2),
      color: "#00FFFF",
      // color: theme.palette.openTitle,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
    },
    submit: {
      margin: "auto",
      marginBottom: theme.spacing(2),
    },
  }));

function Login({ handleSignupOn, handleLogIn }) {

    const classes = useStyles();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = (name) => (event) => {
        setUser({ ...user, [name]: event.target.value });
    };

    const handleLogin = () => {
      // login api
      localStorage.setItem('luser', user.username);
      axios.post('http://127.0.0.1:8000/rest-auth/login/', 
      { 
        ...user, 
        email:"" 
      })
      .then((res)=>{
        // alert(JSON.stringify(res));
        if(res.data.key) {
          localStorage.setItem('token', res.data.key);
          handleLogIn();
        }
      });
    }

    return (
        <Card className={classes.card}>
    <CardContent>
      <Typography variant="h6" className={classes.title}>
        Sign In
      </Typography>
      <TextField
        id="username"
        type="text"
        label="Username"
        color="orange"
        className={classes.textField}
        value={user.username}
        onChange={handleChange("username")}
        margin="normal"
        autoComplete="off"
        spellCheck="false"
      />
      <br />
      <TextField
        id="password"
        type="password"
        label="Password"
        className={classes.textField}
        value={user.password}
        onChange={handleChange("password")}
        margin="normal"
        autoComplete="off"
        spellCheck="false"
      />
    </CardContent>
    <CardActions>
      <Button
        color="primary"
        variant="contained"
        onClick={handleLogin}
        className={classes.submit}
      >
        Login
      </Button>
    </CardActions>
    <p className="login-card-nav" onClick={handleSignupOn}>Not Registered yet ? SignUp</p>
  </Card>
    )
}

export default Login;
