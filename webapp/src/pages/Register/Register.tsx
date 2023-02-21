import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  authUpdateErrorMsg,
  getAuthInfo,
} from "../../redux/slices/auth/authSlice";
import { registerAccount } from "../../redux/slices/auth/thunks";
import {
  AuthStateType,
  ConfirmEmailFulfilled,
  ValidationError,
} from "../../redux/slices/auth/types";
import { AppDispatch, RootState } from "../../redux/store";

type Props = {
  authInformation: AuthStateType;
  onRegister: any;
};

const Register: React.FC<Props> = function ({
  authInformation,
  onRegister,
}: Props) {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate: NavigateFunction = useNavigate();
  const authInfo: AuthStateType = useSelector(getAuthInfo);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  const dispatch: AppDispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const onPressRegister: () => void = () => {
    console.log(`user: ${username}`);
    console.log("email: ", email);
    console.log("password: ", password);
    console.log("confirm password: ", confirmPassword);
    if (
      !username.length ||
      !password.length ||
      !email.length ||
      !confirmPassword.length
    )
      return;
    if (password !== confirmPassword) {
      dispatch(authUpdateErrorMsg("Passwords do not match."));
      return;
    }
    dispatch(
      onRegister({ username: username, email: email, password: password })
    );
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Get Started
        </Typography>
        <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <FormControl variant="outlined" fullWidth margin="normal" required>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal" required>
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Grid item xs={12}>
            <Checkbox value="allowExtraEmails" color="primary" />I agree with
            the{" "}
            <span
              onClick={() => {
                console.log("GEGE");
              }}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                terms and conditions
              </a>
            </span>
            .
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    authInformation: state.auth,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    RootState,
    ConfirmEmailFulfilled | ValidationError,
    Action
  >
) => {
  return {
    onRegister: (arg: any) => dispatch(registerAccount(arg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
