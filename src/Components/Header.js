import React from "react";


// MUI imports
import {
  Typography,
  AppBar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    navbar: {
        color: "white",
        fontSize: "1.1rem",
        textAlign: "center",
      },
});


function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" style={{ backgroundColor: "black" }}>
      <Typography className={classes.navbar} ><h1>SKILL TEST</h1></Typography>
    </AppBar>
  );
}

export default Header;
