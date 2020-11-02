import React, { useState } from 'react';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
    overrides: {
    //   MuiButton: {
    //       root: {
    //           marginBottom: "0px",
    //       }
    //   },
      MuiInput: {
        underline: {
        //     borderBottomColor: "grey",
        //    '&:hover': {
        //     borderBottomColor: "grey",
        //    },
          '&:before': {
            borderBottomColor: "grey",
          },
          '&:after': {
            borderBottomColor: "orange",
          },
          '&:hover:not($disabled):before': {
            borderBottomColor: "grey",
          },
        },
      },
      MuiInputBase: {
        root: {
          color: "white",
        }
      },
      MuiInputLabel: { 
        root: { 
          color: "orange",
          "&$focused": { 
            color: "orange"
          }
        }
      }
    }
});

function LSWrapper({ handleLogIn }) {

    const [signup, setSignUp] = useState(false);

    const handleSignupOn = () => {
        setSignUp(true);
    }

    const handleSignupOff = () => {
        setSignUp(false);
    }

    return (
        <ThemeProvider theme={theme}>
            { signup && <SignUp handleSignupOff={handleSignupOff} /> }
            { !signup && <Login handleSignupOn={handleSignupOn} handleLogIn={handleLogIn} /> }
        </ThemeProvider>
    )
}

export default LSWrapper;
