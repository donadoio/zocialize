import React from "react";
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
import ExamplesNavbar from "../../components/ExamplesNavbar";
import TransparentFooter from "../../components/TransparentFooter";
const ConfirmEmail = function () {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
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
                  <h3 className="my-0 py-0">Email Verification</h3>
                  In dev mode use 0000
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
                        <i className="now-ui-icons ui-1_lock-circle-open"></i>
                      </span>
                    </div>
                    <Input
                      placeholder="Verificaiton Code"
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className="text-center mt-0 pt-0">
                  <Button
                    block
                    className="btn-round btn-primary"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    Confirm
                  </Button>
                  <Button
                    block
                    className="btn-round"
                    color="secondary"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    Log out
                  </Button>
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

export default ConfirmEmail;
