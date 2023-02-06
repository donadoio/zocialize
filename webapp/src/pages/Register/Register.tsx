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
  Row,
} from "reactstrap";
import TransparentFooter from "../../components/TransparentFooter";
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
    <div className="page-header clear-filter" filter-color="blue">
      <div
        className="page-header-image"
        style={{
          backgroundImage: "url(" + require("../../assets/img/login.jpg") + ")",
        }}
      ></div>
      <div className="content">
        <Container>
          {/* Making alt sign up 
          <Row>
            <Col className="ml-auto mr-auto" md="5">
              <div className="info info-horizontal">
                <div className="icon icon-primary">
                  <i className="now-ui-icons media-2_sound-wave"></i>
                </div>
                <div className="description">
                  <h5 className="info-title">Lalalala</h5>
                  <p className="description">
                    We've created the marketing campaign of the website. It was
                    a very interesting collaboration.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="5"></Col>
          </Row>*/}
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
                  <h3 className="my-0 py-0">Get Started!</h3>
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
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </div>
                    <Input
                      placeholder="Email"
                      type="text"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
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
                      placeholder="Confirm Password"
                      type="password"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      value={confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setConfirmPassword(e.target.value);
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
                      onPressRegister();
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
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/");
                        }}
                      >
                        Already have an accout? Log in
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
    onRegister: (arg: any) => dispatch(registerAccount(arg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
