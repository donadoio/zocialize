import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import TransparentFooter from "../../components/TransparentFooter";
import { getAuthInfo } from "../../redux/slices/auth/authSlice";
import { getTokens } from "../../redux/slices/auth/thunks";
import {
  AuthStateType,
  ConfirmEmailFulfilled,
  ValidationError,
} from "../../redux/slices/auth/types";
import { AppDispatch, RootState } from "../../redux/store";

type Props = {
  authInformation: AuthStateType;
  onLogin: any;
};

const Login: React.FC<Props> = function ({ authInformation, onLogin }: Props) {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const authInfo: AuthStateType = useSelector(getAuthInfo);
  const navigate: NavigateFunction = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onPressLogin = () => {
    if (username.length === 0 || password.length === 0) return;
    onLogin(username, password);
  };
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
  return (
    <div className="page-header clear-filter" filter-color="blue">
      <div
        className="page-header-image"
        style={{
          backgroundImage: "url(" + require("../../assets/img/login.jpg") + ")",
        }}
      ></div>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" md="4">
            <Card className="card-login card-plain">
              <Form action="" className="form" method="">
                <CardHeader className="text-center">
                  <div className="logo-container">
                    <img
                      alt="..."
                      src={require("../../assets/img/now-logo.png")}
                    ></img>
                    Zocialize
                  </div>
                  <h3 className="my-0 py-0">Welcome</h3>
                  {authInfo.error}
                </CardHeader>
                <CardBody className="mb-0 pb-0">
                  <InputGroup
                    className={
                      "no-border input-lg" +
                      (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="now-ui-icons users_single-02"></i>
                      </span>
                    </div>
                    <Input
                      placeholder="Username"
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      value={username}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUsername(e.target.value);
                      }}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border input-lg" +
                      (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <div className="input-group-prepend">
                      <InputGroupText>
                        <i className="now-ui-icons objects_key-25"></i>
                      </InputGroupText>
                    </div>
                    <Input
                      placeholder="Password"
                      type="password"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                      }}
                    ></Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className="text-center mt-0 pt-0">
                  <Button
                    block
                    className="btn-round btn-primary"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPressLogin();
                    }}
                    size="lg"
                  >
                    Log in
                  </Button>
                  <Button
                    block
                    className="btn-round"
                    color="secondary"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/register");
                    }}
                    size="lg"
                  >
                    Sign up
                  </Button>
                  <div className="pull-right">
                    <h6>
                      <a
                        className="link"
                        href="javascript(void)"
                        onClick={(e) => e.preventDefault()}
                      >
                        Forgot Password?
                      </a>
                    </h6>
                  </div>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Container>
      </div>
      <TransparentFooter />
    </div>
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
