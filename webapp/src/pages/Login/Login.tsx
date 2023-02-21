import { ThemeProvider } from "@emotion/react";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  createTheme,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { getAuthInfo } from "../../redux/slices/auth/authSlice";
import { getTokens } from "../../redux/slices/auth/thunks";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  AuthStateType,
  ConfirmEmailFulfilled,
  ValidationError,
} from "../../redux/slices/auth/types";
import {
  GeneralStateType,
  getGeneralState,
} from "../../redux/slices/general/generalSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { VisibilityOff, Visibility } from "@mui/icons-material";

type Props = {
  authInformation: AuthStateType;
  onLogin: any;
};

const Login: React.FC<Props> = function ({ authInformation, onLogin }: Props) {
  const authInfo: AuthStateType = useSelector(getAuthInfo);
  const generalState: GeneralStateType = useSelector(getGeneralState);
  const navigate: NavigateFunction = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onPressLogin = () => {
    if (username.length === 0 || password.length === 0) return;
    onLogin(username, password);
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
          Welcome
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Log in
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#">Forgot password?</Link>
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
    onLogin: (arg1: string, arg2: string) =>
      dispatch(getTokens({ username: arg1, password: arg2 })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
