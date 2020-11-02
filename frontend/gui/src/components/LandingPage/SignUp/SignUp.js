import React, {useState} from 'react'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import './SignUp.css';

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
      // marginBottom: theme.spacing(2),
    },
  }));

function SignUp({ handleSignupOff }) {

    const classes = useStyles();

    const [user, setUser] = useState({
        username: "",
        email: "",
        contact: "",
        password: "",
        confirm_password: "",
    })

    const handleChange = (name) => (event) => {
        setUser({ ...user, [name]: event.target.value });
    };

    const handleSignUp = () => {
        // signup api
    }

    return (
        <Card className={classes.card}>
    <CardContent>
      <Typography variant="h6" className={classes.title}>
        Sign Up
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
        id="email"
        type="email"
        label="Email"
        color="orange"
        className={classes.textField}
        value={user.email}
        onChange={handleChange("email")}
        margin="normal"
        autoComplete="off"
        spellCheck="false"
      />
      <br />
      <TextField
        id="contact"
        type="text"
        label="Contact"
        color="orange"
        className={classes.textField}
        value={user.contact}
        onChange={handleChange("contact")}
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
      <br />
      <TextField
        id="confirm_password"
        type="password"
        label="Confirm Password"
        className={classes.textField}
        value={user.confirm_password}
        onChange={handleChange("confirm_password")}
        margin="normal"
        autoComplete="off"
        spellCheck="false"
      />
    </CardContent>
    <CardActions>
      <Button
        color="primary"
        variant="contained"
        onClick={handleSignUp}
        className={classes.submit}
      >
        Submit
      </Button>
    </CardActions>
    <p className="login-card-nav" onClick={handleSignupOff}>Already have an account ? Login</p>
  </Card>
    )
}

export default SignUp
