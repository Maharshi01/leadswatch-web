import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { API_URL ,logoutidle} from '../../AppConfig'

import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

import axios from "axios";
const Login = props => {
  let history = useHistory();
  const [formValues, setFormValues] = useState(["", ""]);
  const [emailvalid, setemailvalid] = useState(false);
  const [passvalid, setpassvalid] = useState(false);
  const [errmsg_hold, seterrmsg_hold] = useState(
    "+error.response.data.error.message"
  );
  const [matcherr, setmatcherr] = useState(false);
  useEffect(() => {
    // document.title="Login - LeadsWatch"
    var url = window.location.href;
    ////console.log(url,"url")
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    ////console.log(params,"params")
    if (!params["campaign"]) {
      params["campaign"] = "";
    }
    if (!params["clickid"]) {
      params["clickid"] = "";
    }
    if (!params["trafficsource"]) {
      params["trafficsource"] = "";
    }

    if (!params || Object.keys(params).length < 1) {
      params = {
        campaign: "",
        clickid: "",
        trafficsource: ""
      };
      params = JSON.stringify(params);
      localStorage.setItem("recieveParams", "1");
      localStorage.setItem("params", params);
    } else {
      params = JSON.stringify(params);
      localStorage.setItem("params", params);
      localStorage.setItem("recieveParams", "1");
    }
  }, []);
  // document.querySelector("#log_pass").addEventListener("keypress", );
  const handleForm = evt => {
    if (evt.target.id === "log_email") {
      let array1 = [...formValues];
      array1[0] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1);
      setemailvalid(false);
    }
    if (evt.target.id === "log_pass") {
      let array1 = [...formValues];
      array1[1] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1);
      setpassvalid(false);
    }
  };
  const Signin = evt => {
    const data = {
      email: formValues[0],
      password: formValues[1]
    };
    global.email = formValues[0];
    const config = {
      url: API_URL+"/user/login",
      data: data,
      method: "post"
    };
    axios(config)
      .then(response => {
        ////console.log("Login",response);
        global.access_token = response.data.data.token;
        ////console.log(global.access_token);
        localStorage.setItem(
          "click_id",
          response.data.data.clickid == null ? "" : response.data.data.clickid
        );
        localStorage.setItem("access_token", response.data.data.token);
        localStorage.setItem("email", formValues[0]);
        localStorage.setItem("user_id", response.data.data.id);
        localStorage.setItem("role", response.data.data.role_id);
        localStorage.setItem("publisher", response.data.data.publisher);
        localStorage.setItem("loginT", true);
        localStorage.setItem("subscription", response.data.data.subscription);
        localStorage.setItem("couponamt", response.data.data.coupon_amount);
        localStorage.setItem("permissions", response.data.data.permissions);
        const d = new Date();
        const currentDay = "" + d.getDay();
        const currentMonth = "" + d.getMonth();
        const currentHour = "" + d.getHours();
        localStorage.setItem("day", currentDay);
        localStorage.setItem("month", currentMonth);
        localStorage.setItem("hour", currentHour);
        global.email = formValues[0];
        global.user_id = response.data.data.id;
        global.role = response.data.data.role_id;
        global.publisher = response.data.data.publisher;
        global.subscription = response.data.data.subscription;
        global.loginT = true;
        ////console.log(global.user_id, "userid", global.role, "role");
        let fakearray = [...formValues];
        fakearray[0] = "";
        fakearray[1] = "";
        setFormValues(fakearray);
        ////console.log(props, "props");
        props.setLoginStatus(true);
        props.setAdmin(response.data.data.role_id);
        if (global.role == 2 || global.role == 4)
          if (global.subscription == 0) {
            history.push("/subscription");
          } else {
            props.setsubscription1(1);
            history.push("/leads");
          }

        if (global.role == 3) history.push("/pubdashboard");
      })
      .catch(error => {
        ////console.log("error failed");
        if (error.message == "Network Error") {
          alert("Network Error \n Please Try Again later");
        } else if (
          error.response.data.error.message ===
          "Your account had been deactivated"
        ) {
          ////console.log(error.response);
          alert("error :" + error.response.data.error.message);
        } else {
          ////console.log(error.response);
          alert("error :" + error.response.data.error.message);

          setmatcherr(true);
        }

        ////console.log(error);
        ////console.log(error.message, "msg");
      });
  };
  return (
    <div className="main_div">
      <Helmet>
        <title>App - LeadsWatch</title>
      </Helmet>
      <Container>
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
            <div className="form_main">
              <div className="create_class">
                <p>Login</p>
              </div>

              <div class="md-form md-outline log_email">
                <input
                  type="text"
                  id="log_email"
                  class="form-control"
                  value={formValues[0]}
                  onChange={e => handleForm(e)}
                />
                <label className="log_email_label" for="log_email">
                  Email
                </label>
                <div className="search-icon">
                  <i class="fa fa-user" />
                </div>
              </div>

              {emailvalid == true ? (
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
                    Enter Email
                  </p>
                </div>
              ) : (
                <p></p>
              )}

              <div class="md-form md-outline log_password">
                <input
                  type="password"
                  id="log_pass"
                  value={formValues[1]}
                  onChange={e => handleForm(e)}
                  onKeyPress={evt => {
                    var key = evt.which || evt.keyCode;
                    // ////console.log(key, "key");
                    // ////console.log(evt, "event");
                    if (key === 13) {
                      // ////console.log("hello");
                      Signin();
                      // 13 is enter
                      // code for enter
                    }
                  }}
                />
                <label className="log_pass_label" for="log_pass">
                  Password
                </label>
                <div className="search-icon">
                  <i class="fa fa-key" />
                </div>
              </div>
              {passvalid == true ? (
                <div className="email_pass_login">
                  <p>
                    {" "}
                    <span>
                      {" "}
                      <i
                        class="fa fa-exclamation-circle circle_err"
                        aria-hidden="true"
                      ></i>
                    </span>
                    Enter Password
                  </p>
                </div>
              ) : (
                <p></p>
              )}

              {/* 
              <div className="pass_login">
                {/* <InputGroup> */}

              {/* <Form.Control
                    onKeyPress={(evt)=>{
                        var key = evt.which || evt.keyCode;
                        // ////console.log(key, "key");
                        // ////console.log(evt, "event");
                        if (key === 13) {
                          // ////console.log("hello");
                          Signin()
                          // 13 is enter
                          // code for enter
                        }
                    }}
                    type="password"
                    placeholder="Password"
                    id="log_pass"
                    className="log_pass"
                    value={formValues[1]}
                    onChange={e => handleForm(e)}
                  />
                </InputGroup>
                <div className="search-icon">
                  <i class="fa fa-key" />
                </div>
              </div> */}

              {/* {matcherr==true?
<div className="email_err">
<p>{errmsg_hold}</p>

</div>:<p></p>} */}
              <div className="button_class_log">
                <Button
                  onClick={event => {
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
                      setemailvalid(true);
                      setpassvalid(true);
                    }

                    if (flag == 1) {
                      Signin(event);
                    }
                  }}
                  id="login_class"
                >
                  Login
                </Button>
              </div>
              <div class="acctext_class">
                <Link to={{ pathname: "/signup" }}>
                  <a>
                    <p>Create Account?</p>
                  </a>
                </Link>
              </div>
              <div class="acctext_class">
                <Link to={{ pathname: "/forgotpassword" }}>
                  <a>
                    <p>Forgot Password?</p>
                  </a>
                </Link>
              </div>
            </div>
          </Col>

          {/*
           */}
        </Row>
      </Container>
    </div>
  );
};
export default Login;
