import React, { useState, useEffect } from "react";
import axios from "axios";
// import {timezones} from './gmttime';
import ToggleButton from "react-toggle-button";
import { API_URL ,logoutidle} from '../../AppConfig'

import {
    Col,
    Row,
    Button,
    Modal,
    Image,
    Dropdown
  } from "react-bootstrap";
  import { IoIosClose, IoMdLogOut,IoIosWarning } from "react-icons/io";

const PublisherAccounting =()=>{

  const[paymentmethod,setpaymentmethod]=useState(2);
  const [firstname,setfirstname]=useState("");
  const [lastname,setlastname]=useState("");
  const [company,setcompany]=useState("");
  const [phonenumber,setphonenumber]=useState("");
  const [email,setemail]=useState("")
  const[apikey,setapikey]=useState("");
  const[secretkey,setscretkey]=useState("");

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
        setpaymentmethod(response.data.data.payment_type);
        setapikey(response.data.data.payment_gateway_api_key);
        setscretkey(response.data.data.payment_gateway_secret_key);
        
      })
      .catch(error => {
        console.log("error", error);
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        alert("Sorry for inconvince,try again later");
      });

  },[])
  const updatepayment=()=>{
    if(paymentmethod==null||apikey==""||secretkey==""){
      alert("Please fill all the fields")
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
      "payment_type": ""+paymentmethod+"",
      "payment_gateway_api_key": apikey,
      "payment_gateway_secret_key": secretkey,
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
       alert("Updated successfully")
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
      });
    }
  }
    return(
<div className="body_inner_set">
    <div className="page_heading">
      <div className="page_heading_name">Accounting</div>
    </div>
    <div className="settings_main_div settings_main_div_pub">
    <div className="sett1_box">
        <div className="personal_heading">
        <p>Payment Settings</p>
        </div>
        <Row>
                   <Col>
                  <p className="custom_logo_set12">Configure your payment Settings</p>      
                  <select
                      className="select_top_signup_set12"
                      value={paymentmethod!=""?(paymentmethod=="1"?"RazorPay":"Stripe"):"Select"}
                      onChange={event => {
                       
                          if(event.target.value=="Select"){
                                 setpaymentmethod(null);
                          }
                          else
                          setpaymentmethod(event.target.value=="RazorPay"?1:2);
                        
                      }}
                    >
                   
                      <option value={"Select"}>Select</option>
                      <option value={"Stripe"}>Stripe</option>
                    
                </select>
                </Col>
                <Col>
                <p className="custom_logo_set12">{paymentmethod==null?"Select payment Method":(paymentmethod=="1"?"Current Method: Razor Pay":(paymentmethod=="2"?"Current Method: Stripe":"Select Payment Method"))}</p> 
                <div className="api_row">   
                <div className="api_field_row">
            

                  <div class="border112 enter_new_pass_team">
          <h1>API key</h1>
          <input
           //type={apikey}
            name="url"
            placeholder="First Name"
            value={apikey}
            id="FirstName"
            class="form-control"
            onChange={(e)=>{
              setapikey(e.target.value)
          }}
          />
        </div>

                  
<div class="border112 enter_new_pass_team1">
          <h1>Secret key</h1>
          <input
          //type={seeNewPass}
          value={secretkey}
            name="url"
            
            
            id="FirstName"
            class="form-control"
            onChange={(e)=>{
              setscretkey(e.target.value)
          }}
          />
        </div>

                  </div>
    </div> 
                </Col>
                </Row>
                <div className="update_butt_pub_div">
                <button 
                id="butt_up_set12_pub"
                onClick={()=>{updatepayment()}}
                >
                    Update
                </button>
                </div>
        </div>
        </div>
        </div>
    );
};
export default PublisherAccounting;