import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import moment from "moment";
import Moment from "react-moment";

import Axios from "axios";
import { useImmerReducer } from "use-immer";
//mui
import {
  Grid,
  // AppBar,
  Typography,
  Button,
  // Card,
  // CardHeader,
  // CardMedia,
  // CardContent,
  // CircularProgress,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { makeStyles } from "@mui/styles";

// import { useEffect } from "react";

const useStyles = makeStyles({
  formContainer: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3rem",
    border: "5px solid black",
    padding: "3rem",
  },
  registerBtn: {
    backgroundColor: "green",
    color: "white",
    fontSize: "1.1rem",
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
});

function Register() {
  const classes = useStyles();
  const navigate = useNavigate();

  const initialState = {
    usernameValue: "",
    ageValue: "",
    emailValue: "",
    passwordValue: "",
    password2Value: "",
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChosen;
        break;
      case "catchAgeChange":
        draft.ageValue = action.ageChosen;
        break;
      case "catchEmailChange":
        draft.emailValue = action.emailChosen;
        break;
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen;
        break;
      case "catchPassword2Change":
        draft.password2Value = action.password2Chosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  function refreshPage() {
    window.location.reload(false);
  }

  // function popup() {
  //   alert("User Register Successfully");
  //   // {alert() !== "UserRegisterSuccessfully" ? console.log(response.data) : }
  // }

  function FormSubmit(e) {
    e.preventDefault();
    // console.log("form has been submitted");
    dispatch({ type: "changeSendRequest" });
  }

  useEffect(() => {
    if (state.sendRequest) {
      async function SignUp() {
        const formData = new FormData();
        formData.append("username", state.usernameValue);
        formData.append("age", state.ageValue);
        formData.append("email", state.emailValue);
        formData.append("password", state.passwordValue);
        formData.append("repeat_password", state.password2Value);
        try {
          const response = await Axios.post(
            "http://localhost:8000/api/users/register",
            formData
          );

          console.log(response.data);
          if (response.data === "successfully registered new user.") {
            alert(JSON.stringify(response.data))
            window.location.reload(false)
          } else {
            alert(JSON.stringify(response.data));
          }
          // Display the values
          for (const value of formData.values()) {
            //  console.log(value);
          }
        } catch (error) {
          console.log(error.response);
        }
      }
      SignUp();

    }
  }, [state.sendRequest]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  async function HandleConfirm() {
    setAnchorEl(null);
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel the registration?"
    );
    if (confirmCancel) {
      try {
        refreshPage();
      } catch (e) {
        console.log(e.response);
      }
    }
  }

  return (
    <div className={classes.formContainer}>
      <form onSubmit={FormSubmit} name="registeruser">
        <Grid item container justify Content="center">
          <Typography variant="h4">CREATE AN ACCOUNT</Typography>
        </Grid>
        <Grid item container style={{ marginTop: "1rem" }}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            type="text"
            maxlength="7"
            fullWidth
            value={state.usernameValue}
            onChange={(e) =>
              dispatch({
                type: "catchUsernameChange",
                usernameChosen: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item style={{ marginTop: "1rem" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={1}>
              <DesktopDatePicker
                label="Age"
                inputFormat="YYYY-MM-DD"
                value={state.ageValue}
                // onChange={(e) => console.log(moment(new Date(e).toLocaleDateString("en-US")).format("YYYY-MM-DD").toString())}
                onChange={(e) =>
                  dispatch({
                    type: "catchAgeChange",
                    ageChosen: moment(new Date(e).toLocaleDateString("en-US"))
                      .format("YYYY-MM-DD")
                      .toString(),
                  })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Grid>

        <Grid item container style={{ marginTop: "1rem" }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={state.emailValue}
            onChange={(e) =>
              dispatch({
                type: "catchEmailChange",
                emailChosen: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item container style={{ marginTop: "1rem" }}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={state.passwordValue}
            onChange={(e) =>
              dispatch({
                type: "catchPasswordChange",
                passwordChosen: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item container style={{ marginTop: "1rem" }}>
          <TextField
            id="password2"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            value={state.password2Value}
            onChange={(e) =>
              dispatch({
                type: "catchPassword2Change",
                password2Chosen: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item container>
          <Grid
            item
            xs={4}
            style={{
              marginTop: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              // type="submit"
              className={classes.registerBtn}
              onClick={refreshPage}
            >
              RESET
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              marginTop: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              // type="submit"
              className={classes.registerBtn}
              onClick={HandleConfirm}
            >
              CANCEL
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={8}
          style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
        >
          <Button
            variant="contained"
            fullWidth
            type="submit"
            className={classes.registerBtn}
          >
            SUBMIT
          </Button>
        </Grid>
      </form>
      <Grid
        item
        container
        justifyContent="center"
        style={{ marginTop: "1rem" }}
      >
        <Typography variant="small">
          Already have an account?{" "}
          <span style={{ cursor: "pointer", color: "green" }}>SIGN IN</span>{" "}
        </Typography>
      </Grid>
    </div>
  );
}

export default Register;
