import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { API_URL ,logoutidle} from '../../AppConfig'

import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
const ForgotPassword = () => {
  let history = useHistory();
  const [formValues, setFormValues] = useState([""]);
  const [forgot_err1, setForgotErr1] = useState(false);
  const handleForm = evt => {
    if (evt.target.id === "forgot_email") {
      let array1 = [...formValues];
      array1[0] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1);
    }
  };
  const ForgotPass = () => {
    const data = {
      email: formValues[0]
    };
    const config = {
      url: API_URL+"/user/forgotpassword",
      data: data,
      method: "post"
    };
    axios(config)
      .then(response => {
        ////console.log(response);
        let fakearray = [...formValues];
        fakearray[0] = "";
        setFormValues(fakearray);
        localStorage.setItem("email", data.email);
        history.push("/resetpassword");
      })
      .catch(error => {
        alert("error");
        ////console.log(error);
        ////console.log(error.response);
      });
  };
  useEffect(() => {
    // document.title="Forgotpassword - LeadsWatch"
  }, []);
  return (
    <div className="main_div">
      <Container>
        <Helmet>
          <title>ForgotPassword - LeadsWatch</title>
        </Helmet>
        <Row>
          <Col xs={12} sm={12} md={6} lg={5}>
            <div className="lw_class">
              <div className="leads_logo_class">
                <img
                  className="leads_logo_img"
                  src={require("../images/LeadsWatch_Logo.svg")}
                />
              </div>
              <div className="logob_class">
                <img
                  className="logob_img"
                  src={require("../images/loginbg.svg")}
                />
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={2}></Col>
          <Col xs={12} sm={12} md={6} lg={5}>
            <div className="forgot_form_main">
              <div class="md-form md-outline forgot_email_div signin_fname_border">
                <input
                  type="text"
                  name="Email"
                  value={formValues[0]}
                  id="forgot_email"
                  onKeyPress={evt => {
                    var key = evt.which || evt.keyCode;
                    // ////console.log(key, "key");
                    // ////console.log(evt, "event");
                    if (key === 13) {
                      if (formValues[0] == "") alert("Enter Valid data");
                      else ForgotPass();
                      // 13 is enter
                      // code for enter
                    }
                  }}
                  class="form-control"
                  onChange={e => handleForm(e)}
                />
                <div className="search_icon_forgot">
                  <i class="fa fa-envelope" />
                </div>
                <label className="forgot_email_label" for="forgot_email">
                  Email Address
                </label>
              </div>

              
              {forgot_err1 == true ? (
                <div className="email_err_login">
                  <p>
                    {" "}
                    <span>
                      {" "}
                      <i
                        class="fa fa-exclamation-circle circle_err"
                        aria-hidden="true"
                      ></i>
                    </span>
                    Make Sure all required fields are filled
                  </p>
                </div>
              ) : (
                <p></p>
              )}

              <div class="email_msg_forgot">
                <p>Enter Your Email ,You will get an OTP to your email </p>
              </div>

              <div className="button_class_reset">
                <Button
                  id="continue_class"
                  method="post"
                  onClick={event => {
                    event.preventDefault();
                    let flag = 1;
                    if (flag == 1)
                      formValues.forEach((element, idx) => {
                        if (idx != 1 && idx != 6 && idx != 8) {
                          if (element == "") {
                            flag = 0;
                          }
                        }
                      });
                    if (flag == 0) {
                      setForgotErr1(true);
                      // alert("Make Sure all required fields are filled");
                    }
                    if (flag == 1) {
                      ForgotPass(event);
                    }
                  }}
                  type="submit"
                  value="Continue"
                >
                  Continue
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ForgotPassword;
