import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { API_URL ,logoutidle} from '../../AppConfig'

import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import { cca } from "./cc";
import Modal from "react-modal";
import { IoIosClose, IoIosArrowForward } from "react-icons/io";
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
const Signup = () => {
  const [formValues, setFormValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]);
  const [fieldsstate, setfieldsstate] = useState(false);
  const [emailstate, setemailstate] = useState(false);
  const [passstate, setpassstate] = useState(false);
  const [passmatch, setpassmatch] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [success_alert, setsuccess_alert] = useState(false);
  const [success_alertText, setsuccess_alertText] = useState("");
  const [see, pass] = useState("password");
  const [see2, pass2] = useState("password");
  const [code, setcode] = useState("+1");
  const [myParams, setMyParams] = useState({});
  useEffect(() => {
    // document.title="Signup - LeadsWatch"
    var canIMakeMyOwn = localStorage.getItem("recieveParams");
    var params = {};
    if (canIMakeMyOwn == "1") {
      params = localStorage.getItem("params");
    } else {
      params = {
        campaign: "",
        clickid: "",
        trafficsource: ""
      };
      params = JSON.stringify(params);
      localStorage.setItem("recieveParams", "1");
      localStorage.setItem("params", params);
    }
    setMyParams(params);
  }, []);
  const checkString = str => {
    var regex = new RegExp("^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$");

    if (regex.test(str)) {
      return true;
    }

    return false;
  };
  const checkEmail = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  const checkPassword = str => {
    // var regex = new RegExp ('(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{";:;\'?/>;.<;,])(?!.*\s).*$');
    var regex = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{";:;'?/>;.<;,])(?!.*\s).*$/;

    if (regex.test(str)) {
      ////console.log("true")
      return true;
    }
    ////console.log("false")
    return false;
  };
  const handleForm = evt => {
    if (evt.target.id === "first_class") {
      let array1 = [...formValues];
      if (evt.target.value != "") {
        let bool = checkString(evt.target.value);
        ////console.log(bool)
        ////console.log(evt.target.value,"value")
        if (bool) {
          array1[0] = evt.target.value;
          setFormValues(array1);
          ////console.log(array1)
        }
      }
      if (evt.target.value == "") {
        array1[0] = evt.target.value;
        setFormValues(array1);
        ////console.log(array1)
      }
    }
    if (evt.target.id === "second_class") {
      let array1 = [...formValues];
      if (evt.target.value != "") {
        let bool = checkString(evt.target.value);
        ////console.log(bool)
        ////console.log(evt.target.value,"value")
        if (bool) {
          array1[1] = evt.target.value;
          setFormValues(array1);
          ////console.log(array1)
        }
      }
      if (evt.target.value == "") {
        array1[1] = evt.target.value;
        setFormValues(array1);
        ////console.log(array1)
      }
      // let array1=[...formValues]
      // array1[1]=evt.target.value
      // setFormValues(array1)
      // ////console.log(array1)
    }
    if (evt.target.id === "second_class") {
      // let array1=[...formValues]
      // array1[2]=evt.target.value
      // setFormValues(array1)
      // ////console.log(array1)
      let array1 = [...formValues];
      if (evt.target.value != "") {
        let bool = checkString(evt.target.value);
        ////console.log(bool)
        ////console.log(evt.target.value,"value")
        if (bool) {
          array1[2] = evt.target.value;
          setFormValues(array1);
          ////console.log(array1)
        }
      }
      if (evt.target.value == "") {
        array1[2] = evt.target.value;
        setFormValues(array1);
        ////console.log(array1)
      }
    }
    if (evt.target.id === "email_id_login") {
      let array1 = [...formValues];
      array1[3] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1)
      setemailstate(false);
      //  let array1=[...formValues]
      // if(evt.target.value!=""){
      //     let bool=checkEmail(evt.target.value)
      //     ////console.log(bool)
      //     ////console.log(evt.target.value,"value")
      //     if(bool){
      //     array1[3]=evt.target.value
      //     setFormValues(array1)
      //     ////console.log(array1)
      //     }
      // }
      // if(evt.target.value==""){
      // array1[3]=evt.target.value
      // setFormValues(array1)
      // ////console.log(array1)
      // }
    }
    if (evt.target.id === "password_id") {
      let array1 = [...formValues];
      array1[4] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1)
      setpassstate(false);
    }
    if (evt.target.id === "forgot_id") {
      let array1 = [...formValues];
      array1[5] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1)
      setpassmatch(false);
    }
    if (evt.target.id === "company_id") {
      let array1 = [...formValues];
      if (evt.target.value != "") {
        let bool = checkString(evt.target.value);
        ////console.log(bool)
        ////console.log(evt.target.value,"value")
        if (bool) {
          array1[6] = evt.target.value;
          setFormValues(array1);
          ////console.log(array1)
        }
      }
      if (evt.target.value == "") {
        array1[6] = evt.target.value;
        setFormValues(array1);
        ////console.log(array1)
      }
      // let array1=[...formValues]
      // array1[6]=evt.target.value
      // setFormValues(array1)
      // ////console.log(array1)
    }
    if (evt.target.id === "ph_id") {
      const { value, maxLength } = evt.target;
      const message = value.slice(0, maxLength);
      let array1 = [...formValues];
      array1[7] = message;
      setFormValues(array1);
      ////console.log(array1)
    }
    if (evt.target.id === "inv_id") {
      let array1 = [...formValues];
      array1[8] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1)
    }
  };
  var history = useHistory();
  const Signup = evt => {
    const data1 = {
      firstname: formValues[0],
      middlename: "",
      lastname: formValues[2],
      email: formValues[3],
      password: formValues[4],
      phone: code + "-" + formValues[7],
      company: formValues[6],
      invitation_code: formValues[8] ? formValues[8] : ""

      // phone:formValues[7],
      // coupon_code:coupon
    };
    var mydata = {
      campaign: "",
      clickid: "",
      trafficsource: ""
    };
    if (myParams != null) mydata = JSON.parse(myParams);

    const data = { ...data1, ...mydata };
    const config = {
      url: API_URL+"/user/register",
      data: data,
      method: "post"
    }; //post data to db
    axios(config)
      .then(response => {
        ////console.log(response);
        let fakeFormValues = [...formValues];
        for (let i = 0; i < fakeFormValues.length; i++) {
          fakeFormValues[i] = "";
        }
        setFormValues(fakeFormValues);
        setsuccess_alert(true);
        setsuccess_alertText("Successfully Registered");
      })
      .catch(error => {
        ////console.log("error failed")
        if (error.message == "Network Error") {
          alert("Network Error \n Please Try Again later");
        } else if (
          error.response.data.error.message ===
          "Your account had been deactivated"
        ) {
          ////console.log(error.response);
          alert("Error :" + error.response.data.error.message);
        } else {
          ////console.log(error.response);
          alert("Error :" + error.response.data.error.message);
        }

        ////console.log(error);
        ////console.log(error.message, "msg");
      });
  };
  const submitFunc = event => {
    let flag = 1;
    if (flag == 1)
      formValues.forEach((element, idx) => {
        if (idx != 1 && idx != 6 && idx != 8) {
          if (element == "" || element == " ") {
            flag = 0;
          }
        }
      });
    if (flag == 0) {
      // alert("Make Sure all required fields are filled")
      setfieldsstate(true);
    }
    if (checkEmail(formValues[3]) == false && flag == 1) {
      // alert("Enter valid email id")formValues[7]
      setemailstate(true);
      flag = 0;
    }
    if (formValues[7].length < 10 && flag == 1) {
      alert("Phone Number must be 10 digits");
      // setemailstate(true);
      flag = 0;
    }
    if (checkPassword(formValues[4]) == false && flag == 1) {
      flag = 0;
      setpassstate(true);
      // alert("Password must contain atleast 1 capital letter , one small letter , a digit , a symbol and must be 8 characters long")
    }
    if (formValues[4] !== formValues[5] && flag == 1) {
      flag = 0;
      // alert("Passwords Donot Match :(")
      setpassmatch(true);
    }
    if (flag == 1) {
      Signup(event);
    }
  };
  return (
    <div className="main_div">
      <Helmet>
        <title>Signup - Leadswatch</title>
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
            <div className="form_main_signin">
              <div className="create_class">
                <p>Create Account</p>
              </div>

              <div className="firstname_class">
                <Form>
                  <Row>
                    <Col>
                      <div className="fname_hold">
                        <div class="md-form md-outline signin_fname signin_fname_border">
                          <input
                            type="text"
                            id="first_class"
                            class="form-control"
                            value={formValues[0]}
                            onKeyPress={evt => {
                              var key = evt.which || evt.keyCode;
                              // ////console.log(key, "key");
                              // ////console.log(evt, "event");
                              if (key === 13) {
                                // ////console.log("hello");
                                submitFunc();
                                // 13 is enter
                                // code for enter
                              }
                            }}
                            onChange={e => handleForm(e)}
                            required
                          />
                          <label
                            className="signup_fname_label"
                            for="first_class"
                          >
                            First Name*
                          </label>
                        </div>

                      </div>
                    </Col>
                    <Col>
                     

                      <div class="md-form md-outline signin_mname signin_fname_border">
                        <input
                          type="text"
                          id="second_class"
                          // id="lname_id_login"
                          class="form-control"
                          onKeyPress={evt => {
                            var key = evt.which || evt.keyCode;
                            // ////console.log(key, "key");
                            // ////console.log(evt, "event");
                            if (key === 13) {
                              // ////console.log("hello");
                              submitFunc();
                              // 13 is enter
                              // code for enter
                            }
                          }}
                          value={formValues[2]}
                          onChange={e => handleForm(e)}
                          required
                        />
                        <label
                          className="signup_fname_label"
                          for="second_class"
                        >
                          Last Name*
                        </label>
                      </div>

                    
                    </Col>
                  </Row>
                </Form>
              </div>

           

              <div className="email_class_signup">
                <div class="md-form md-outline signin_email signin_fname_border">
                  <input
                    type="email"
                    class="form-control"
                    onKeyPress={evt => {
                      var key = evt.which || evt.keyCode;
                      // ////console.log(key, "key");
                      // ////console.log(evt, "event");
                      if (key === 13) {
                        // ////console.log("hello");
                        submitFunc();
                        // 13 is enter
                        // code for enter
                      }
                    }}
                    id="email_id_login"
                    value={formValues[3]}
                    onChange={e => handleForm(e)}
                    required
                  />
                  <label className="signup_fname_label" for="email_id_login">
                    Email Address*
                  </label>
                  <div className="search_icon_email_signup">
                    <i class="fa fa-envelope" />
                  </div>
                </div>

               
              </div>
              {emailstate == true ? (
                <div className="email_err_signup2">
                  <p>
                    {" "}
                    <span>
                      {" "}
                      <i
                        class="fa fa-exclamation-circle circle_err"
                        aria-hidden="true"
                      ></i>
                    </span>
                    Enter valid email id
                  </p>
                </div>
              ) : (
                <p></p>
              )}
              <div className="forgot_class">
                <Form>
                  <Row>
                    <Col>
                      <div class="md-form md-outline signin_password signin_fname_border">
                        <input
                          type={see}
                          class="form-control"
                          onKeyPress={evt => {
                            var key = evt.which || evt.keyCode;
                          
                            if (key === 13) {
                             
                              submitFunc();
                            
                            }
                          }}
                          id="password_id"
                          value={formValues[4]}
                          onChange={e => handleForm(e)}
                          required
                        />
                        <label className="signup_fname_label" for="password_id">
                          Password*
                        </label>
                        <div
                          onClick={() => {
                            if (see == "password") pass("text");
                            else pass("password");
                          }}
                          className="search-icon"
                        >
                          {see == "password" && <i class="fa fa-eye-slash" />}
                          {see == "text" && <i class="fa fa-eye" />}
                        </div>
                      </div>

                
                    </Col>

                    <Col>
                      <div class="Forgot_class">
                        <div class="md-form md-outline signin_cnfrm_password signin_fname_border">
                          <input
                            type={see2}
                            class="form-control"
                            onKeyPress={evt => {
                              var key = evt.which || evt.keyCode;
                             
                              if (key === 13) {
                                // ////console.log("hello");
                                submitFunc();
                                // 13 is enter
                                // code for enter
                              }
                            }}
                            id="forgot_id"
                            value={formValues[5]}
                            onChange={e => handleForm(e)}
                            required
                          />
                          <label className="signup_fname_label" for="forgot_id">
                            Confirm Password*
                          </label>
                          <div
                            onClick={() => {
                              if (see2 == "password") pass2("text");
                              else pass2("password");
                            }}
                            className="search-icon"
                          >
                            {see2 == "password" && (
                              <i class="fa fa-eye-slash" />
                            )}
                            {see2 == "text" && <i class="fa fa-eye" />}
                          </div>
                        </div>

                    
                      </div>
                      {passmatch == true ? (
                        <div className="password_err">
                          <p>
                            {" "}
                            <span>
                              {" "}
                              <i
                                class="fa fa-exclamation-circle circle_err"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Passwords do not match
                          </p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </Col>
                    {passstate == true ? (
                      <div className="pass_err">
                        <p>
                          <span>
                            {" "}
                            <i
                              class="fa fa-exclamation-circle circle_err"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Password must contain atleast 1 capital letter, 1
                          small letter, 1 digit, 1 symbol and must be 8
                          characters long.
                        </p>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </Row>
                </Form>
              </div>

              <div className="comp_class">
                <div class="md-form md-outline signin_cnfrm_comapny signin_fname_border">
                  <input
                    type="text"
                    class="form-control"
                    onKeyPress={evt => {
                      var key = evt.which || evt.keyCode;
                      // ////console.log(key, "key");
                      // ////console.log(evt, "event");
                      if (key === 13) {
                        // ////console.log("hello");
                        submitFunc();
                        // 13 is enter
                        // code for enter
                      }
                    }}
                    id="company_id"
                    value={formValues[6]}
                    onChange={e => handleForm(e)}
                    required
                  />
                  <label className="signup_fname_label" for="company_id">
                    Company (optional)
                  </label>
                  <div className="search_icon_signup_comp">
                    <i class="fa fa-building" />
                  </div>
                </div>
              </div>
              <Modal
                isOpen={success_alert}
                className="success_modal_camp"
                contentLabel=" Invite Modal"
              >
                <div
                  className="pub_close_div5 pub_close_mrgnc"
                  onClick={() => {
                    history.push("/login");
                    setsuccess_alert(false);
                  }}
                >
                  <IoIosClose />
                </div>
                {/* <div>Successfully Added Publisher</div> */}
                <div className="mail_invt_textcs">
                  <p>{success_alertText}</p>
                </div>
              </Modal>

           

              <div className="forgot_cls_signup">
                <InputGroup>
                  <select
                    className="select_top_signup"
                    onChange={event => {
                      setcode(event.target.value);
                    }}
                  >
                    {cca.length > 0 &&
                      cca.map((item, idx) => (
                        <option value={item.value}>{item.label}</option>
                      ))}
                  </select>

                  <div class="md-form md-outline signin_phone signin_fname_border1 signin_phone_ex12">
                    <input
                      type="number"
                      class="form-control"
                      onKeyPress={evt => {
                        var key = evt.which || evt.keyCode;

                        if (key === 13) {
                          submitFunc();
                        }
                      }}
                      id="ph_id"
                      value={formValues[7]}
                      onChange={e => handleForm(e)}
                      maxLength={10}
                      minLength={9}
                      required
                    />
                    <label className="signup_fname_label" for="ph_id">
                      Phone
                    </label>
                    <div className="search-icon">
                      <i class="fa fa-phone" />
                    </div>
                  </div>
                </InputGroup>
              </div>

              <div className="invite_class_signup">
                <div class="md-form md-outline signin_invite_code signin_fname_border">
                  <input
                    type={see2}
                    class="form-control"
                    onKeyPress={evt => {
                      var key = evt.which || evt.keyCode;
                      // ////console.log(key, "key");
                      // ////console.log(evt, "event");
                      if (key === 13) {
                        // ////console.log("hello");
                        submitFunc();
                        // 13 is enter
                        // code for enter
                      }
                    }}
                    id="inv_id"
                    value={formValues[8]}
                    onChange={e => handleForm(e)}
                  />
                  <label className="signup_fname_label" for="inv_id">
                    Invitation Code (optional)
                  </label>
                  <div className="search-icon">
                    <i class="fas fa-file-alt" />
                  </div>
                </div>
              </div>

              {fieldsstate == true ? (
                <div className="email_err_signup1">
                  <p>
                    {" "}
                    <span>
                      {" "}
                      <i
                        class="fa fa-exclamation-circle circle_err"
                        aria-hidden="true"
                      ></i>
                    </span>
                    Please make sure to fill all the required fields.
                  </p>
                </div>
              ) : (
                <p></p>
              )}

              <div className="button_class_signup">
                <Button
                  onClick={event => submitFunc(event)}
                  id="signup_class_butt"
                >
                  Signup
                </Button>
              </div>

              <div class="acctext_class">
                <a>
                  <p>
                    <Link to={{ pathname: "/Login" }}>
                      Already have an account?
                    </Link>
                  </p>
                </a>
              </div>
            </div>
          </Col>
          {/* <Col xs={12} sm={12} md={6} lg={5}>
              <div className="form_main">
                <div className="create_class">
                  <p>Login Here!!</p>
                </div>

                <div className="email_class">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="UserName"
                      id="email_id_login"
                    />
                    <div className="search-icon">
                      <i class="fa fa-user" />
                    </div>
                  </InputGroup>
                </div>

                <div className="email_class">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      id="email_id_login"
                    />
                    <div className="search-icon">
                      <i class="fa fa-key" />
                    </div>
                  </InputGroup>
                </div>

                <div className="button_class">
                  <Button id="signup_class">Login</Button>
                </div>
                <div class="acctext_class">
                  <a><p onClick={SignUp}>Create Account?</p></a>
                </div>
              </div>
            </Col>
         */}
        </Row>
      </Container>
    </div>
  );
};
export default Signup;
