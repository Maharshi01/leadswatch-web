import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL ,logoutidle} from '../../AppConfig'

import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
const ResetPassword = () => {
  const [formValues, setFormValues] = useState([
    "",
    "",
    "",
    localStorage.getItem("email") ? localStorage.getItem("email") : ""
  ]);
  const [seep, setseep] = useState("password");
  const [cseep, setcseep] = useState("password");
  const [err_reset_state, setErr_Reset_State] = useState(false);
  const [pass_reset, setPass_reset] = useState(false);
  const [pwmatch_reset, setsetpwmatch_reset] = useState(false);
  var history = useHistory();
  useEffect(() => {
    document.title = "Reset Password - LeadsWatch";
    if (
      localStorage.getItem("email") == null ||
      localStorage.getItem("email") == undefined
    )
      history.push("/forgotpassword");
    let temp = [...formValues];
    temp[3] = localStorage.getItem("email");
    setFormValues(temp);
  }, []);
  const handleForm = evt => {
    if (evt.target.id === "Password_reset") {
      let array1 = [...formValues];
      array1[0] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1);
    }
    if (evt.target.id === "Email_reset") {
      let array1 = [...formValues];
      array1[3] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1);
    }
    if (evt.target.id === "ConfirmPassword_reset") {
      let array1 = [...formValues];
      array1[1] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1);
    }
    if (evt.target.id === "OTP_reset") {
      let array1 = [...formValues];
      array1[2] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1);
    }
  };
  const ResetPass = evt => {
    const data = {
      email: formValues[3],
      verification_code: formValues[2],
      password: formValues[1]
    };
    const config = {
      url: API_URL+"/user/resetpassword",
      data: data,
      method: "post"
    };
    axios(config)
      .then(response => {
        ////console.log(response);
        let fakearray = [...formValues];
        fakearray[0] = "";
        fakearray[1] = "";
        fakearray[2] = "";
        fakearray[3] = "";
        setFormValues(fakearray);

        alert("success");
        history.push("/login");
        ////console.log("Successully changed password");
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        ////console.log(error);
        ////console.log(error.response);
        // alert(error.response.data.error.message?error.response.data.error.message:"error");
      });
    ////console.log("proceed to home screen");
  };
  return (
    <div className="main_div">
      <Helmet>
        <title>Resetpassword - LeadsWatch</title>
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
            <div className="reset_main">
              <div className="reset_heading">
                <p>Reset Password</p>
              </div>

              <div className="email_class">
                <div class="border874a">
                  <h1>First Name</h1>
                  <input
                    disabled={true}
                    type="email"
                    id="Email_reset"
                    class="form-control"
                    value={formValues[3]}
                    onChange={e => handleForm(e)}
                  />

                  <div className="search-icon">
                    <i class="fa fa-envelope" />
                  </div>
                </div>

                
              </div>
              <div className="forgot_class">
                <Form>
                  <div className="forgot_class_innerdivs">
                    <div>
                      <div class="md-form md-outline Password_reset signin_fname_border">
                        <input
                          id="Password_reset"
                          class="form-control"
                          value={formValues[0]}
                          onChange={e => handleForm(e)}
                          name="Password"
                          type={seep}
                        />
                        <label className="log_email_label" for="Password_reset">
                          Password
                        </label>
                        <div
                          className="search-icon"
                          onClick={() => {
                            if (seep == "text") setseep("password");
                            else setseep("text");
                          }}
                        >
                          {seep == "password" && <i class="fa fa-eye-slash" />}
                          {seep == "text" && <i class="fa fa-eye" />}
                        </div>
                      </div>

                      
                    </div>
                    <div>
                      <div class="Forgot_class_rest">
                        <div class="md-form md-outline ConfirmPassword signin_fname_border">
                          <input
                            type={cseep}
                            id="ConfirmPassword_reset"
                            class="form-control"
                            value={formValues[1]}
                            onChange={e => handleForm(e)}
                            name="ConfirmPass.."
                          />
                          <label
                            className="log_email_label"
                            for="ConfirmPassword_reset"
                          >
                            Confirm Pass..
                          </label>
                          <div
                            className="search-icon"
                            onClick={() => {
                              if (cseep == "text") setcseep("password");
                              else setcseep("text");
                            }}
                          >
                            {cseep == "password" && (
                              <i class="fa fa-eye-slash" />
                            )}
                            {cseep == "text" && <i class="fa fa-eye" />}
                          </div>
                        </div>

                       
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
              {pass_reset == true ? (
                <div className="reset_pass_valid">
                  <p>
                    {" "}
                    <span>
                      {" "}
                      <i
                        class="fa fa-exclamation-circle circle_err"
                        aria-hidden="true"
                      ></i>
                    </span>
                    Password must contain atleast 1 capital letter, 1 small
                    letter, 1 digit, 1 symbol and must be 8 characters long.
                  </p>
                </div>
              ) : (
                <div></div>
              )}
              {setsetpwmatch_reset == true ? (
                <div>
                  <p>
                    {" "}
                    <span>
                      {" "}
                      <i
                        class="fa fa-exclamation-circle circle_err"
                        aria-hidden="true"
                      ></i>
                    </span>
                    Passwords Donot Match
                  </p>
                </div>
              ) : (
                <div></div>
              )}
              <div className="email_class">
                <div class="md-form md-outline OTP_reset signin_fname_border ">
                  <input
                    type="text"
                    id="OTP_reset"
                    class="form-control"
                    value={formValues[2]}
                    onChange={e => handleForm(e)}
                    name="OTP"
                  />
                  <label className="log_email_label" for="OTP_reset">
                    One-time password
                  </label>
                </div>

                
              </div>
              {err_reset_state == true ? (
                <div>
                  <p className="reset_feilds_text">
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
              <div className="button_class">
                <Button
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
                      setErr_Reset_State(true);

                      // alert("Make Sure all required fields are filled");
                    }
                    var regex = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{";:;'?/>;.<;,])(?!.*\s).*$/;

                    if (!regex.test(formValues[0])) {
                      flag = 0;
                      setPass_reset(true);
                      // alert("invalid Password Format")
                    }
                    if (formValues[0] !== formValues[1] && flag == 1) {
                      flag = 0;
                      setsetpwmatch_reset(true);
                      // alert("Passwords Donot Match :(");
                    }

                    if (flag == 1) {
                      ResetPass(event);
                    }
                  }}
                  type="submit"
                  value="Continue"
                  id="reset_class"
                >
                  Reset
                </Button>
              </div>

              <div className="reset_login">
                <Link to={{ pathname: "/login" }}>Login</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ResetPassword;
