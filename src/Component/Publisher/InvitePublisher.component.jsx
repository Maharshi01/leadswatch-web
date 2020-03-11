import React, { useState, useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";
// import { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Modal from "react-modal";
import axios from "axios";
import { API_URL ,logoutidle} from '../../AppConfig'

const InvitePublisher = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };
  const [email, setEmail] = useState('');

  
  const checkEmail = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  //Function to post updated details to Database
  function update() {
    if(checkEmail(email))
    {
        const data = {
        email: email,
        member_type: 'p',
      };
      const config = {
        url: API_URL+'/user/invite',
        data: data,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {

         // ////console.log("respse",response);
          
        })
        .catch(error => {
          if(error.message=="Request failed with status code 401"){
            logoutidle()
          }
         // ////console.log("there is some error");
         // ////console.log(error);
         // ////console.log(error.response);
        });



    }
    else{
        alert("Enter the valid email address");

    }
  }
 
  
  const handleEmail=(value)=>
  {
    setEmail(value);
  }

  return (
    <div>
     
       
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 50
          }}
        >
          <label>
            EMAIL:
            {/* {//console} */}
            <input
              type="text"
              name="email"
              value={email}
              onChange={event => handleEmail(event.target.value)}
            />
          </label>
           <button
            onClick={() => {
              update();
            }}
          >
            INVITE
          </button>
        </div>
      
    </div>
  );
};
export default InvitePublisher;
