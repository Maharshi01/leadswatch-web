import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { API_URL ,logoutidle} from '../../AppConfig'


import axios from "axios";
const ChangePass = () => {
  const [email, setEmail] = useState("");
  const [otp, setotp] = useState("");
  const [pass, setpass] = useState("");
  const [pass2, setpass2] = useState("");
  const [message, setmessage] = useState("");
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);
  const verifyEmail = str => {
    if (pass != "" && pass2 != "" && otp != "") {
      if (pass == pass2) {
        //check for valid email id and set the error messages
        // https://api.shadow.properties/user/reset-password
        const data = {
          email: email,
          password: otp,
          newpassword: pass
        };
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
            ////console.log(response);
            ////console.log('Successully changed password');
          })
          .catch(error => {
            if(error.message=="Request failed with status code 401"){
              logoutidle()
            }
            ////console.log(error);
            ////console.log(error.response);
          });
        ////console.log('proceed');
      } else {
        // Alert.alert("Passwords Are not equal");
        alert("passwords are not same");
      }
    } else {
      alert("enter valid data");
    }
  };
  return (
    <div>
      <input
        type="password"
        value={otp}
        placeholder="Enter Old Password"
        onChange={e => {
          setotp(e.target.value);
        }}
      ></input>
      <input
        type="password"
        value={pass}
        placeholder="Enter New Password"
        onChange={e => {
          setpass(e.target.value);
        }}
      ></input>
      <input
        type="password"
        value={pass2}
        placeholder="Re-Enter Password"
        onChange={e => {
          setpass2(e.target.value);
        }}
      ></input>
      <p
        onClick={() => {
          verifyEmail();
        }}
      >
        Update
      </p>
    </div>
  );
};
export default ChangePass;
