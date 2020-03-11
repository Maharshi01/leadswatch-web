import React, { useState, useEffect } from "react";
import axios from "axios";
// import {timezones} from './gmttime';
import ToggleButton from "react-toggle-button";
import EditImage from "../../EditImage";
import { API_URL ,logoutidle} from '../../AppConfig'


import { Col, Row, Button, Image, Dropdown } from "react-bootstrap";
import { IoIosClose, IoMdLogOut, IoIosWarning } from "react-icons/io";
import Modal from "react-modal";


const PublisherSettings = () => {

  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const [photo,setPhoto]=useState(true);
    const [firstname,setfirstname]=useState("");
    const [lastname,setlastname]=useState("");
    const [company,setcompany]=useState("");
    const [phonenumber,setphonenumber]=useState("");
    const [email,setemail]=useState("")
    const [emailerror,setemailerror]=useState(false);
    const[oldpassword,setoldpassword]=useState();
    const[newpassword,setnewpassword]=useState();
    const[newpaserror,setnewpasserror]=useState(false);
    const[oldpasserror,setoldpasserror]=useState(false);
    const [success_alert, setsuccess_alert] = useState(false);
    const [message, setmessage] = useState("");

    useEffect(()=>{

      const config = {
        url: API_URL+`/user/detail/${localStorage.getItem(
        "user_id"
      )}`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          console.log("response",response.data.data)
          setfirstname(response.data.data.firstname);
          setlastname(response.data.data.lastname);
          setphonenumber(response.data.data.phone);
          setcompany(response.data.data.company);
          setemail(response.data.data.email);
          
        })
        .catch(error => {
          console.log("error", error);
          if(error.message=="Request failed with status code 401"){
            logoutidle()
          }
         // alert("Sorry for Inconvince There is problem from our side try again late ");
        });

    },[])
    const modalclose = () => {
      setsuccess_alert(false);
      setmessage("");
    };
    const userdata=(value,name)=>{
      if(name =="fname"){
        setfirstname(value)
      }
      else if(name=="lname"){
        setlastname(value)
      }
      else if(name=="email"){
        setemail(value)
        if(reg.test(value)==true){
          setemailerror(false)
        }
        else{
          setemailerror(true)
        }

       
      }
      else if(name=="company"){
        setcompany(value)
      }
      else if(name =="pnum"){
        setphonenumber(value)
      }
      else{
        alert("error occurred,reload the page please")
      }

    }
    const updateprofile=()=>{
      if(firstname==""||lastname==""||email==""||phonenumber==""){
alert("error")
      }
else{


      const data ={
        "firstname": firstname,
        "middlename": "",
        "lastname": lastname,
        "email": email,
        "phone": phonenumber,
        "company": company,
        "time_zone": "",
        "email_notifications": 1,
        "payment_type": "",
        "payment_gateway_api_key": "",
        "payment_gateway_secret_key": "",
        "active": 1
      }
      const config = {
        url: API_URL+`/user/update/${localStorage.getItem(
          "user_id"
        )}`,
         data: data,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          setmessage("Updated Successfully")
         alert("Successfully updated")
        })
        .catch(error => {
          if(error.message=="Request failed with status code 401"){
            logoutidle()
          }
        });
}



    }
  const handlenewpassword=(newpas)=>{
    let regex = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{";:;'?/>;.<;,])(?!.*\s).*$/;
    setnewpassword(newpas)
    if(regex.test(newpas) == true){
      setnewpasserror(false)

    }
    else{
      setnewpasserror(true)

    }
  }
  const handleoldpassword=(oldpas)=>{
    //let regex = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{";:;'?/>;.<;,])(?!.*\s).*$/;
    setoldpassword(oldpas)
    // if(regex.test(oldpas) == true){
    //   setoldpasserror(false)

    // }
    // else{
    //   setoldpasserror(true)

    // }
   

  }
  const updatepassword=()=>{
    if(oldpassword==""||newpassword==""){
      setmessage("Fields are empty")
      alert("Empty fields")
    }
  else{
    const data ={
        "email": localStorage.getItem("email"),
        "password": oldpassword,
        "newpassword": newpassword
      }
     
    
    const config = {
      url: API_URL+"/user/change-password",
       data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        setnewpasserror(false);
        setoldpasserror(false);
        setoldpassword("");
        setnewpassword("");
        setsuccess_alert(true)
        setmessage("Updated successfully")
      // alert("Successfully Updated")
      })
      .catch(error => {
        console.log("----error----",error)
        if(error.message=="Request failed with status code 500"){
          setsuccess_alert(true)
          alert("Details given are already exists or invalid old password try again")
        }
       
        if(error.message=="Request failed with status code 401"){

          logoutidle()
        }
      });
  }
  }
  return (
    <div className="body_inner_set">
      <div className="page_heading">
        <div className="page_heading_name">Settings</div>
      </div>
      <div className="settings_main_div">
        <div className="sett1_box">
          <div className="personal_heading">
            <p>Profile Details</p>
            <Row>
              
              <Col xs={12} sm={12} md={6} lg={2}>
                <p
                  style={{
                    backgroungColor: "#a0a0a0",
                    color: "#666",
                    marginBottom: "5px",
                    fontSize: "14px",
                    paddingLeft: "1rem",
                    width: "13rem"
                  }}
                >
                  <span style={{ color: "red" }}>Note: </span>Image upload must
                  be 400x400 dimensions
                </p>

                <div className="profile_images_head">
                  <input
                    type="file"
                    id="file_header"
                    style={{ display: "none" }}
                    //onChange={e => handleChangeFile(e.target.files[0])}
                  />{" "}
                  {photo &&
            
            <Image
            className="image_set123"
            
              src={`https://live.leadswatch.com/api/v1/file/publisher/${localStorage.getItem(
                "user_id"
              )}/200/200?t=${new Date().toTimeString()}`}
              roundedCircle
            />
            }
                  {!photo &&

            <Image
              style={{
                width: "109%",
                height: "8.5rem",
                outline: "none",
                border: "1px Solid #666",
                // marginLeft: "15%"
              }}
              src={`https://live.leadswatch.com/api/v1/file/publisher/${localStorage.getItem(
                "user_id"
              )}/200/200?t=${new Date().toTimeString()}`}
              roundedCircle
            />
            }
                  <label
                    className="edit_pic_upload_head123_set"
                    for="file_header"
                  >
                    <EditImage />
                  </label>
                </div>
              </Col>

              <Col xs={12} sm={12} md={6} lg={1}></Col>
              <Col xs={12} sm={12} md={6} lg={3}>
                <div class="border112_set border112_set_ex">
                  <h1> First Name</h1>
                  <input
                    type="text"
                    value={firstname}
                    id="email_id2"
                    className="form-control buyer_popup_field"
                    onChange={event => userdata(event.target.value,"fname")}
                  />
                </div>

                <div class="border112_set border112_set_ex12">
                  <h1> Last Name</h1>
                  <input
                    type="text"
                    value={lastname}
                    id="email_id2"
                    className="form-control buyer_popup_field"
                    onChange={event => userdata(event.target.value,"lname")}
                  />
                </div>

                <div class="border112_set border112_set_ex12">
                  <h1>Email</h1>
                  <input
                    type="text"
                    value={email}
                    id="email_id2"
                    className="form-control buyer_popup_field"
                    onChange={event => userdata(event.target.value,"email")}
                  />
                </div>
                {emailerror == true ?(
                  <div className="update_err_email_pub">
                  <p> <span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Enter valid email id</p>
                </div>
                ):(<p></p>)}
              </Col>
              <Col xs={12} sm={12} md={6} lg={1}></Col>
              <Col xs={12} sm={12} md={6} lg={3}>
                <div class="border112_set border112_set_ex">
                  <h1> Company</h1>
                  <input
                    type="text"
                    value={company}
                    id="email_id2"
                    className="form-control buyer_popup_field"
                   onChange={event => userdata(event.target.value,"company")}
                  />
                </div>

                <div class="border112_set border112_set_ex12">
                  <h1>Phone</h1>
                  <input
                    type="text"
                    value={phonenumber}
                    id="email_id2"
                    className="form-control buyer_popup_field"
                    onChange={event => userdata(event.target.value,"pnum")}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={2}></Col>
              <Col xs={12} sm={12} md={6} lg={2}></Col>
            </Row>
            <div className="button_id_head_div">
              <button id="button_id_head" onClick={()=>{
                updateprofile()
              }}> Update Personal Details</button>
            </div>
           
          </div>
        </div>
       
        
      </div>
      <div className="settings_main_div">
        <div className="sett1_box">
        <div className="personal_heading">
            <p>Change Password</p>
            </div>
            <div class="md-form md-outline header_oldpass header_oldpass_pub ">
            
            <div class="border112_set">
          <h1> Enter Password</h1>
          <input
                //type={seeOldPass}
                value={oldpassword}
                id="email_id2"
                className="form-control buyer_popup_field"
                onChange={e => {
                  handleoldpassword(e.target.value)
                }}
              />
        </div>
              <div
               
                className="search-icon_signup"
              >
               
              </div>
            </div>



            <div class="md-form md-outline enter_new_pass enter_new_pass_pub">
              <input
                id="email_id"
                type="email"
                class="form-control"
                
                value={newpassword}
                onChange={e => {
                  handlenewpassword(e.target.value)
                }}
              />
              <labe
              />
              <label className="input_text_buyer" for="email_id">
              Enter New Password
              </label>
            </div>




            {/* <div class="md-form md-outline enter_new_pass enter_new_pass_pub">
              <input
                //type={seeNewPass}
                value={newpassword}
                id="email_id002a"
                className="form-control buyer_popup_field"
                onChange={e => {
                  handlenewpassword(e.target.value)
                }}
              />
              <label className="input_text_buyer" for="email_id002a">
                Enter New Password
              </label>
</div> */}
         
         
{/*            
            {oldpasserror==true&& <div className="update_err_email_pub">
                  <p> <span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Enter valid password</p>
                </div>} */}

            {newpaserror==true&& <div className="update_err_email_pub">
                  <p> <span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Enter valid password</p>
                </div>}
            <div className="button_id_head_pub_div">
              <button id="button_id_head_pub" onClick={()=>{
                updatepassword()
              }}> Update Password</button>
            </div>
        </div>
        </div>
        <div style={{height:39}}> 

        </div>
        <Modal
            isOpen={success_alert}
            className="success_modal_camp"
            contentLabel=" Invite Modal"
          >
            <div className="close_camp_modal" onClick={() => modalclose()}>
              <IoIosClose />
            </div>
            <div className="camp_alert_text">{message}</div>
          </Modal>
    </div>
  );
};
export default PublisherSettings;
