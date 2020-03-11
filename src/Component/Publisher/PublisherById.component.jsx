import React, { useState, useEffect } from "react";
import axios from "axios";
import { cca } from "../UserManagement/cc";
import { API_URL, logoutidle } from "../../AppConfig";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";
import ToggleButton from "react-toggle-button";
import { Col, Form, Row, Dropdown, Button, Image } from "react-bootstrap";
import EditImage from "../../EditImage";
import { Spinner,InputGroup } from "react-bootstrap";
import Modal from "react-modal";
import { IoIosClose, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const PublisherById = props => {
  let WindowUrl = window.location.href;
  const [load, setLoad] = useState(true);
  const [list, setList] = useState([]);
  const [phone, setphone] = useState("");
  let { id } = useParams();
  const [active1, setActive] = useState(false);
  // const [currentPage,setCurrentPage] = useState(1);
  const [validateFieldsText, setValidateFieldsText] = useState(false);
  const [validateEmailText, setValidateEmailText] = useState(false);
  const [success_alert, setsuccess_alert] = useState(false);
  const [success_alertText, setsuccess_alertText] = useState(
    "Successfully updated"
  );
  const [ispicavail, setispicavail] = useState(false);
  const [code, setcode] = useState("+1");
  const [ph_err2, setPhErr2] = useState(false);
  const [ph_phone_err, setph_phone_err] = useState(false);
  const [publid, setPublid] = useState("default");
  const [picture, setPicture] = useState(false);
  const [publisherDuplicate, setPublisherDuplicate] = useState(false);
  const [publisherDuplicateText, setPublisherDuplicateText] = useState("");
  const [ph_err1, setPhErr1] = useState(false);
  const [formValues, setFormValues] = useState(["", "", "", "", "", ""]);
  const [puberror, setpuberror] = useState(false);
  const [pubemail, setpubemail] = useState(false);
  let history = useHistory();
  const checkString = str => {
    var regex = new RegExp("^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$");

    if (regex.test(str)) {
      return true;
    }

    return false;
  };
  const checkValidPhN = str => {
    var regex = new RegExp("^([+][0-9]{1,4}[-][0-9]{1,10})$");

    if (regex.test(str)) {
      return true;
    }

    return false;
  };
  //
  const checkEmail = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const getPublishers = () => {
      const config = {
        url: API_URL + `/publisher/${id}`,
        // data: data,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          ////console.log(response);
          ////console.log(response.data.data, "publisher details");
          setList(response.data.data);

          //let phone1 = response.data.data.phone.split("-")[1];
          setLoad(false);
          setphone(response.data.data.phone.split("-")[1]);
          setcode(response.data.data.phone.split("-")[0]);
          setActive(response.data.data.active);
          // props.navigation.navigate('Dashboard')
          // ////console.log(response);
          // global.access_token = response.data.result.token;
        })
        .catch(error => {
          if (error.message == "Request failed with status code 401") {
            logoutidle();
          }
          alert("something went wrong");
          // setError('Please Enter Correct Login Credentials');
          ////console.log(error.response);
          ////console.log(error);
          ////console.log(error.response);
        });
      ////console.log("proceed to publishers list homescreen");
    };
    if(!(WindowUrl.includes("create"))){
          getPublishers();
    }
    else{
      setLoad(false);
    }
  }, []);
  const Signup2 = evt => {
    const data = {
      firstname: formValues[0],
      middlename: "",
      lastname: formValues[2],
      email: formValues[3],
      phone: code + "-" + formValues[5],
      // phone: formValues[5],
      company: formValues[4]
    };
    ////console.log("data", data);
    const config = {
      url: API_URL + "/publisher/create",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log(response);
        ////console.log(response.data);

        ////console.log("success");
        // alert("Successfully Created");
        setsuccess_alert(true);
        setsuccess_alertText("Publisher added successfully ");
        setPublisherDuplicate(false);
        setPublisherDuplicateText("");
        setPhErr1(false);
        setpuberror(false);
        let fakeFormValues = [...formValues];
        for (let i = 0; i < fakeFormValues.length; i++) {
          fakeFormValues[i] = "";
        }
        setFormValues(fakeFormValues);
      })
      .catch(error => {
        if (error.message == "Request failed with status code 401") {
          logoutidle();
        }
        ////console.log("error failed");
        try {
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
            setPublisherDuplicate(true);
            setPublisherDuplicateText("" + error.response.data.error.message);
            //alert("error :" + error.response.data.error.message);
          }

          ////console.log(error);
          ////console.log(error.message, "msg");
        } catch {
          if (error.message == "Request failed with status code 401") {
            logoutidle();
          }
          alert("something went wrong");
        }
      });
  };
  const handleForm2 = evt => {
    if (evt.target.id === "FirstName2") {
      setpuberror(false);
      // let array1=[...formValues]
      // array1[0]=evt.target.value
      // setFormValues(array1)
      // ////console.log(array1)
      let array1 = [...formValues];
      if (evt.target.value != "") {
        let bool = checkString(evt.target.value);
        ////console.log(bool);
        ////console.log(evt.target.value, "value");
        if (bool) {
          array1[0] = evt.target.value;
          setFormValues(array1);
          ////console.log(array1);
        }
      }
      if (evt.target.value == "") {
        array1[0] = evt.target.value;
        setFormValues(array1);
        ////console.log(array1);
      }
    }
    if (evt.target.id === "MiddleName2") {
      setpuberror(false);
      let array1 = [...formValues];
      if (evt.target.value != "") {
        let bool = checkString(evt.target.value);
        ////console.log(bool);
        ////console.log(evt.target.value, "value");
        if (bool) {
          array1[1] = evt.target.value;
          setFormValues(array1);
          ////console.log(array1);
        }
      }
      if (evt.target.value == "") {
        array1[1] = evt.target.value;
        setFormValues(array1);
        ////console.log(array1);
      }
      // let array1=[...formValues]
      // array1[1]=evt.target.value
      // setFormValues(array1)
      // ////console.log(array1)
    }
    if (evt.target.id === "LastName2") {
      setpuberror(false);
      let array1 = [...formValues];
      if (evt.target.value != "") {
        let bool = checkString(evt.target.value);
        ////console.log(bool);
        ////console.log(evt.target.value, "value");
        if (bool) {
          array1[2] = evt.target.value;
          setFormValues(array1);
          ////console.log(array1);
        }
      }
      if (evt.target.value == "") {
        array1[2] = evt.target.value;
        setFormValues(array1);
        ////console.log(array1);
      }
      // let array1=[...formValues]
      // array1[2]=evt.target.value
      // setFormValues(array1)
      // ////console.log(array1)
    }
    if (evt.target.id === "Email2") {
      setpuberror(false);
      setpubemail(false);
      let array1 = [...formValues];
      array1[3] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1);
    }
    if (evt.target.id === "Company2") {
      setpuberror(false);

      let array1 = [...formValues];
      if (evt.target.value != "") {
        let bool = checkString(evt.target.value);
        ////console.log(bool);
        ////console.log(evt.target.value, "value");
        if (bool) {
          array1[4] = evt.target.value;
          setFormValues(array1);
          ////console.log(array1);
        }
      }
      if (evt.target.value == "") {
        array1[4] = evt.target.value;
        setFormValues(array1);
        ////console.log(array1);
      }
      // let array1=[...formValues]
      // array1[4]=evt.target.value
      // setFormValues(array1)
      // ////console.log(array1)
    }
    if (evt.target.id === "PhoneNumber2") {
      setpuberror(false);
      //const message = evt.target.value.slice(0, 10);
      const value = evt.target.value;
      // //console.log(value,"value")
      const message = value.slice(0, 10);
      // //console.log("sliced number",message)

      let array1 = [...formValues];
      array1[5] = message;

      setFormValues(array1);
      ////console.log(array1);
    }
  };
  const handleChangeFile = file => {
    ////console.log("Image",file.name)
    ////console.log("file",file)
    let picdata = new FormData();
    picdata.append("picture", file);
    picdata.append("id", id);
    const config = {
      url: API_URL + "/file/publisher/upload",
      method: "post",
      data: picdata,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json"
      }
    };
    axios(config)
      .then(response => {
        ////console.log("Imageupload", response);
        setispicavail(false);
        // getPublishersList()
        setispicavail(true);
        ////console.log("");
      })
      // Error handling
      .catch(error => {
        if (error.message == "Request failed with status code 401") {
          logoutidle();
        }
        ////console.log("ImageUploaderror1", error);
        // alert(error.response.data.error.message);
      });
  };
  // ********************************************
  const submitFunc = event => {
    let flag = 1;
    if (
      list.firstname == "" ||
      list.lastname == "" ||
      list.company == "" ||
      list.email == "" ||
      phone == ""
    ) {
      flag = 0;
    }
    if (flag == 0) {
      setValidateFieldsText(true);
      //alert("Make Sure all required fields are filled");
    }
    if (flag == 1) {
      setValidateFieldsText(false);
    }
    if (phone.length < 10 && flag == 1) {
      setValidateFieldsText(false);
      setPhErr2(true);
      // alert("Make Sure to enter a valid phone number1111");
      flag = 0;
    }
    // if (checkValidPhN(phone) == false && flag == 1) {
    //   setph_phone_err(true);

    //   //alert("Make Sure to enter a valid phone number");
    //   flag = 0;
    // }

    if (checkEmail(list.email) == false && flag == 1) {
      // alert("Enter valid email id");
      setValidateEmailText(true);

      flag = 0;
    }

    if (flag == 1) {
      Signup(event);
    }
  };

  const Signup = event => {
    const data = {
      firstname: list.firstname,
      middlename: "",
      lastname: list.lastname,
      email: list.email,
      phone: code+"-"+phone,
      active: active1,
      company: list.company // need to make it dynamic later
    };
    const config = {
      url: API_URL + `/publisher/update/${id}`,
      data: data,
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log(response,'updated');
        ////console.log('succesfully updated the values');

        setValidateFieldsText(false);
        setsuccess_alert(true);
        getPublishersList();
        //alert("success")

        global.updated = true;
        // ////console.log(response);
        // global.access_token = response.data.result.token;
      })
      .catch(error => {
        if (error.message == "Request failed with status code 401") {
          logoutidle();
        }
        alert("Failed");
      });
  };
  // ********************************************
  const handleChangeFile2 = file => {
    ////console.log("Image",file.name)
    ////console.log("file",file)
    let picdata = new FormData();
    picdata.append("picture", file);

    const config = {
      url: API_URL + "/file/publisher/upload",
      method: "post",
      data: picdata,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json"
      }
    };
    axios(config)
      .then(response => {
        ////console.log("Imageupload", response);
        setPicture(true);
        setPublid(response.data.data.id);
        setPicture(false);
        // getPublishersList()
        ////console.log("");
      })
      // Error handling
      .catch(error => {
        if (error.message == "Request failed with status code 401") {
          logoutidle();
        }
        ////console.log("ImageUploaderror1", error);
        alert(error.response.data.error);
      });
  };

  const getPublishersList = () => {
    const config = {
      url: API_URL + `/publisher/${id}`,
      // data: data,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log(response);
        ////console.log(response.data.data, "publishers list");
        setList(response.data.data);
        
        // props.navigation.navigate('Dashboard')
        // ////console.log(response);
        // global.access_token = response.data.result.token;
      })
      .catch(error => {
        if (error.message == "Request failed with status code 401") {
          logoutidle();
        }
      });
    ////console.log("proceed to home screen");

    // value => this.verifyEmail(value)
  };
  const handleForm = evt => {
    if (evt.target.id === "FirstName") {
      if (checkString(evt.target.value)) {
        let jk = Object.assign({}, list, {
          firstname: evt.target.value
        });
        setList(jk);
      }
      if (evt.target.value == "") {
        let jk = Object.assign({}, list, {
          firstname: evt.target.value
        });
        setList(jk);
      }
    }
    if (evt.target.id === "MiddleName") {
      if (checkString(evt.target.value)) {
        let jk = Object.assign({}, list, {
          middlename: evt.target.value
        });
        setList(jk);
      }
      if (evt.target.value == "") {
        let jk = Object.assign({}, list, {
          middlename: evt.target.value
        });
        setList(jk);
      }
    }
    if (evt.target.id === "LastName") {
      if (checkString(evt.target.value)) {
        let jk = Object.assign({}, list, {
          lastname: evt.target.value
        });
        setList(jk);
      }
      if (evt.target.value == "") {
        let jk = Object.assign({}, list, {
          lastname: evt.target.value
        });
        setList(jk);
      }
    }
    if (evt.target.id === "Email") {
      let jk = Object.assign({}, list, {
        email: evt.target.value
      });
      setList(jk);
    }
    if (evt.target.id === "Company") {
      if (checkString(evt.target.value)) {
        let jk = Object.assign({}, list, {
          company: evt.target.value
        });
        setList(jk);
      }
      if (evt.target.value == "") {
        let jk = Object.assign({}, list, {
          company: evt.target.value
        });
        setList(jk);
      }
    }
    if (evt.target.id === "Phone") {
      const message = evt.target.value.slice(0, 11);
      setphone(message);
    }
  };
  var create_pub = (
    <div>
      <div className="body_inner_set">
        <div
          onClick={() => {
            history.goBack();
          }}
          className="back_buy_contact_buy14"
        >
          <IoIosArrowBack />
        </div>

        <div className="camp-header_buy">
          <h2>Create Publisher</h2>
        </div>

        <div className="personal_width">
          <div className="set_content_div">
            <div className="buy_contact_box">
              <div className="personal_heading">
                <p>Publisher Details</p>
              </div>

              <Row>
                <Col xs={12} sm={12} md={6} lg={3}>
                  <div className="">
                    <div className="">
                      {picture && (
                        <div className="profile_images_pub">
                          <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={e => handleChangeFile2(e.target.files[0])}
                          />{" "}
                          <Image
                           
                            className="pub_img_up"
                            src={
                              API_URL +
                              `/file/publisher/${publid}/200/200?t=${new Date().toTimeString()}`
                            }
                            roundedCircle
                          />
                          <label className="edit_pic_upload_pub" for="file">
                            <EditImage />
                          </label>
                        </div>
                      )}

                      {!picture && (
                        <div className="profile_images_pub">
                          <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={e => handleChangeFile2(e.target.files[0])}
                          />{" "}
                          <Image
                            // style={{
                            //   width: "72%",
                            //   height: "8.5rem",
                            //   outline: "none",
                            //   border: "1px Solid #666",
                            //   marginLeft: "15%"
                            // }}
                            
                            className="pub_img_up"
                            src={
                              API_URL +
                              `/file/publisher/${publid}/200/200?t=${new Date().toTimeString()}`
                            }
                            roundedCircle
                          />
                          <label className="edit_pic_upload_pub_ex" for="file">
                            <EditImage />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  <p
                    style={{
                      backgroungColor: "#a0a0a0",
                      width: "13rem",
                      marginLeft: "1rem",
                      color: "#666",
                      marginBottom: "14px",
                      fontSize: "14px"
                    }}
                  >
                    <span style={{ color: "red" }}>Note: </span>Image upload
                    must be 400x400 dimensions
                  </p>
                </Col>
                <Col xs={12} sm={12} md={6} lg={1}></Col>

                <Col xs={12} sm={12} md={6} lg={3}>
                  <div class="md-form md-outline outline_b_c">
                    <input
                      type="text"
                      value={formValues[0]}
                      onChange={e => handleForm2(e)}
                      id="FirstName2"
                      className="form-control buyer_popup_field"
                    />
                    <label className="input_text_buyer" for="email_id002a">
                      First Name
                    </label>
                  </div>

                  <div class="md-form md-outline outline_b_c">
                    <input
                      value={formValues[2]}
                      onChange={e => handleForm2(e)}
                      type="text"
                      id="LastName2"
                      className="form-control buyer_popup_field"
                    />
                    <label className="input_text_buyer" for="email_id002a">
                      Last Name
                    </label>
                  </div>

                  <div class="md-form md-outline outline_b_c">
                    <input
                      type="text"
                      id="Email2"
                      className="form-control buyer_popup_field"
                      value={formValues[3]}
                      onChange={e => handleForm2(e)}
                    />
                    <label className="input_text_buyer" for="email_id002a">
                      Email
                    </label>
                  </div>

                  {pubemail == true ? (
                    <div className="create_byer_form_err_buy123">
                      <p>
                        <span>
                          {" "}
                          <i
                            class="fa fa-exclamation-circle circle_err"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Enter valid Email!Ex:abc@example.com
                      </p>
                    </div>
                  ) : (
                    <p></p>
                  )}

{puberror == true ? (
                  <div className="create_byer_form_err_buy">
                    <p>
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
                </Col>

                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={1}
                  className="head_set_col1"
                ></Col>
                <Col xs={12} sm={12} md={6} lg={3}>
                  <div class="md-form md-outline outline_b_c">
                    <input
                      type="text"
                      id="Company2"
                      className="form-control buyer_popup_field"
                      value={formValues[4]}
                      onChange={e => handleForm2(e)}
                    />
                    <label className="input_text_buyer" for="email_id002a">
                      Company
                    </label>
                  </div>





                  <div className="forgot_cls_signup forgot_cls_signup_buy">
                <InputGroup>
                  <select
                    className="select_top_signup select_top_signup_buy"
                    onChange={event => {
                      setcode(event.target.value);
                    }}
                  >
                    {cca.length > 0 &&
                      cca.map((item, idx) => (
                        <option value={item.value}>{item.label}</option>
                      ))}
                  </select>

                  <div class="md-form md-outline signin_phone signin_phone_buy signin_fname_border1">
                    <input
                     type="text"
                     id="PhoneNumber2"
                     className="form-control buyer_popup_field"
                     value={formValues[5]}
                     onChange={e => handleForm2(e)}
                    />
                    <label className="signup_fname_label signup_fname_label_ex" for="ph_id">
                      Phone
                    </label>
                    
                  </div>
                </InputGroup>
              </div>








{/* 

                  <div class="md-form md-outline outline_b_c">
                    <input
                      type="text"
                      id="email_id002a"
                      className="form-control buyer_popup_field"
                      value={formValues[5]}
                      onChange={e => handleForm2(e)}
                    />
                    <label className="input_text_buyer" for="email_id002a">
                      Phone
                    </label>
                  </div> */}






                  {publisherDuplicate == true ? (
                    <div className="create_byer_form_err_buy">
                      <p>
                        <span>
                          {" "}
                          <i
                            class="fa fa-exclamation-circle circle_err"
                            aria-hidden="true"
                          ></i>
                        </span>
                        {publisherDuplicateText}
                      </p>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </Col>

              
              </Row>
            </div>

            <div></div>
          </div>

          <div className="change_buttonclass">
            <input
              className="campaign_add_submitbtn_ex"
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
                  // alert("Make Sure all required fields are filled")
                  setpuberror(true);
                }
                if (formValues[5].length < 9 && flag == 1) {
                  setPhErr1(true);
                  // alert("Make Sure to enter a valid phone number")
                  flag = 0;
                }

                if (checkEmail(formValues[3]) == false && flag == 1) {
                  // alert("Enter valid email id")
                  setpubemail(true);
                  flag = 0;
                }
                if (flag == 1) {
                  Signup2(event);
                }
              }}
              type="button"
              value="Create"
            />
          </div>
        </div>
      </div>
      <div
        className="pub_close_div5"
        onClick={() => {
          setPublid("default");
          setPublisherDuplicate(false);
          setPublisherDuplicateText("");
        }}
      >
        <IoIosClose />
      </div>

      <Modal
        isOpen={success_alert}
        className="success_modal_camp"
        contentLabel=" Invite Modal"
      >
        <div
          className="pub_close_div5 pub_close_mrgnc"
          onClick={() => setsuccess_alert(false)}
        >
          <IoIosClose />
        </div>
       
        <div className="mail_invt_textcs">
          <p>{success_alertText}</p>
        </div>
      </Modal>
    </div>
  );
  var list_items = (
    <div className="publisherlist_edit_page">
      <div>
        <div className="body_inner_set">
          <div
            onClick={() => {
              history.goBack();
            }}
            className="back_buy_contact_buy14"
          >
            <IoIosArrowBack />
          </div>

          <div className="camp-header_buy">
            <h2>Edit Publisher</h2>
          </div>

          <div className="personal_width">
            <div className="set_content_div_edit ">
              <div className="buy_contact_box">
                <div className=" personal_heading personal_heading_ex">
                  <p>Publisher Details</p>
                </div>

                <Row>
                  <Col xs={12} sm={12} md={6} lg={3}>
                    <div className="">
                      <div className="">
                        {ispicavail && (
                          <div className="profile_images_pub">
                            <input
                              type="file"
                              id="file"
                              style={{ display: "none" }}
                              onChange={e =>
                                handleChangeFile(e.target.files[0])
                              }
                            />{" "}
                            <Image
                              // style={{
                              //   width: "72%",
                              //   height: "8.5rem",
                              //   outline: "none",
                              //   border: "1px Solid #666",
                              //   marginLeft: "15%"
                              // }}
                              
                            className="pub_img_up"
                              src={
                                API_URL +
                                `/file/publisher/${id}/200/200?t=${new Date().toTimeString()}`
                              }
                              roundedCircle
                            />
                            <label className="edit_pic_upload_pub" for="file">
                              <EditImage />
                            </label>
                          </div>
                        )}

                        {!ispicavail && (
                          <div className="profile_images_pub">
                            <input
                              type="file"
                              id="file"
                              style={{ display: "none" }}
                              onChange={e =>
                                handleChangeFile(e.target.files[0])
                              }
                            />{" "}
                            <Image
                              // style={{
                              //   width: "72%",
                              //   height: "8.5rem",
                              //   outline: "none",
                              //   border: "1px Solid #666",
                              //   marginLeft: "15%"
                              // }}
                              
                            className="pub_img_up"
                              src={API_URL + `/file/publisher/${id}/200/200`}
                              roundedCircle
                            />
                            <label
                              className="edit_pic_upload_pub_ex"
                              for="file"
                            >
                              <EditImage />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                    <p
                      style={{
                        backgroungColor: "#a0a0a0",
                        width: "13rem",
                        marginLeft: "1rem",
                        color: "#666",
                        marginBottom: "14px",
                        fontSize: "14px"
                      }}
                    >
                      <span style={{ color: "red" }}>Note: </span>Image upload
                      must be 400x400 dimensions
                    </p>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={1}></Col>

                  <Col xs={12} sm={12} md={6} lg={3}>
                    <div class="border112">
                      <h1>First Name</h1>
                      <input
                        type="text"
                        name="url"
                        placeholder="First Name"
                        value={list.firstname}
                        id="FirstName"
                        class="form-control"
                        onChange={e => handleForm(e)}
                      />
                    </div>

                   

                    <div class="border112">
                      <h1>Last Name</h1>
                      <input
                        type="text"
                        name="url"
                        placeholder="Last Name"
                        value={list.lastname}
                        id="LastName"
                        class="form-control"
                        onChange={e => handleForm(e)}
                      />
                    </div>

                   

                    <div class="border112">
                      <h1>Email</h1>
                      <input
                        type="text"
                        name="url"
                        placeholder="Email"
                        value={list.email}
                        id="Email"
                        class="form-control"
                        onChange={e => handleForm(e)}
                      />
                    </div>

                    {validateFieldsText == true && (
                      <div className="create_byer_form_err_buy">
                        <p>
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
                    
                    )}

                    {validateEmailText == true ? (
                      <div className="create_byer_form_err_buy123">
                        <p>
                          <span>
                            {" "}
                            <i
                              class="fa fa-exclamation-circle circle_err"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Enter valid Email!Ex:abc@example.com
                        </p>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </Col>

                  <Col
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1}
                    className="head_set_col1"
                  ></Col>
                  <Col xs={12} sm={12} md={6} lg={3}>
                    <div className="pub_compdiv">
                      <div class="border112">
                        <h1>Company</h1>
                        <input
                          type="text"
                          name="url"
                          placeholder="Company"
                          value={list.company}
                          id="Company"
                          class="form-control"
                          onChange={e => handleForm(e)}
                        />
                      </div>
                    </div>






                    <div className="forgot_cls_signup forgot_cls_signup_buy forgot_cls_signup_buy12">
               
               <select
                 className="select_top_signup select_top_signup_buy12"
                 value={code}
                 onChange={event => {
                   setcode(event.target.value);
                 }}
               >
                 {cca.length > 0 &&
                   cca.map((item, idx) => (
                     <option value={item.value}>{item.label}</option>
                   ))}
               </select> 
               <div class="border112 border_contact_buy border_contact_buy_ex33">
                       <h1>Phone</h1>
                       <input
                         type="text"
                         className="form-control buyer_popup_field"
                         // placeholder="Card Number"
                        
                         id="email_id002a_12"
                         class="form-control"
                         onChange={e => handleForm(e)}
                         value={phone}
                       />
                     </div>
             
            
           </div>





{/* 
                    <div className="pub_phdiv">
                      <div class="border112 border112a border112a_ex">
                        <h1>Phone</h1>
                        <input
                          type="text"
                          name="url"
                          class="form-control"
                         
                          id="Phone"
                          onChange={e => handleForm(e)}
                          value={phone}
                        />
                      </div>
                    </div> */}

                

                    {ph_err2 == true && (
                      <div className="create_byer_form_err_buy">
                        <p>
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
                    
                    )}

                    {ph_phone_err == true && (
                      <div className="create_byer_form_err_buy">
                        <p>
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
                     
                    )}

                    <div className="publisher_status">
                      <label>{"    "}Account status: </label>
                      <ToggleButton
                        inactiveLabel={""}
                        activeLabel={""}
                        colors={{
                          active: {
                            base: "#63E57D"
                          },
                          inactive: {
                            base: "#9B9B9B"
                          }
                        }}
                        value={active1}
                        onToggle={() => {
                          setActive(!active1);
                        }}
                      />

                      {active1 == true ? (
                        <span>
                          <div className="active_green">Active</div>
                        </span>
                      ) : (
                        <span>
                          {" "}
                          <div className="active_red">Inactive</div>
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              <div></div>
            </div>

            <div
              className="update_butt"
              onClick={() => {
                submitFunc();
              }}
              id="Continue"
            >
              <button className="campUpdateDetailsBtn_btn">
                Update Details
              </button>
            </div>

            <p
              onClick={() => {
                //
                //   const data = {
                //     id: ele.id
                //   };
                // let { id } = useParams();
                const config = {
                  url: `http://69.55.49.121:3003/api/v1/publisher/delete/${id}`,
                  // data: data,
                  method: "delete",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization:
                      "Bearer " + localStorage.getItem("access_token")
                  }
                };
                axios(config)
                  .then(response => {
                    ////console.log(response, "deleted a publisher");
                    // ////console.log(response.data.data, 'publishers list');
                    // setList(response.data.data);
                    getPublishersList();
                    // props.navigation.navigate('Dashboard')
                    // ////console.log(response);
                    // global.access_token = response.data.result.token;
                  })
                  .catch(error => {
                    if (
                      error.message == "Request failed with status code 401"
                    ) {
                      logoutidle();
                    }
                    // setError('Please Enter Correct Login Credentials');
                    ////console.log(error.response);
                    ////console.log(error);
                    ////console.log(error.response);
                  });
                ////console.log("proceed to home screen");

                ////console.log("deleting the publisher");
              }}
            >
             
            </p>
            <Modal
              isOpen={success_alert}
              className="success_modal_camp"
              contentLabel=" Invite Modal"
            >
              <div
                className="pub_close_div5 pub_close_mrgnc"
                onClick={() => setsuccess_alert(false)}
              >
                <IoIosClose />
              </div>
              {/* <div>Successfully Added Publisher</div> */}
              <div className="mail_invt_textcs">
                <p>{success_alertText}</p>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
  return load ? (
    <div className="spinner_div">
      <Spinner animation="border" />
    </div>
  ) : WindowUrl.includes("create") ? (
    <div>{create_pub}</div>
  ) : (
    <div>{list_items}</div>
  );
};
export default PublisherById;
