//created by 
//last modified 24 dec 2019

import React, { useState, useEffect } from "react";
import { API_URL ,logoutidle} from '../AppConfig'

import { Link, useHistory } from "react-router-dom";
import { cca } from "./UserManagement/cc";
// import { Modal as Model } from "react-modal";
import SettingsPage from "./SettingsPage.component"
import {
  Col,
  Form,
  Row,
  Dropdown,
  Modal,
  Button,
  Image
} from "react-bootstrap";
import { IoIosPerson, IoIosUnlock, IoIosMailOpen, IoMdMailUnread, IoMdWalk } from "react-icons/io";
import axios from "axios";
import { GoSettings } from "react-icons/go";
import { FaEllipsisV } from "react-icons/fa";


import EditImage from "../EditImage";
import { IoIosClose, IoMdLogOut } from "react-icons/io";
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
    // //console.log("true")
    return true;
  }
  // //console.log("false")
  return false;
};

function Change_Password(props) {
  const [email, setEmail] = useState("");
  const [otp, setotp] = useState("");
  const [pass, setpass] = useState("");
  const [pass2, setpass2] = useState("");
  const [message, setmessage] = useState("");
  const [validemptyfields, setvalidemptyfields] = useState(false);
  const [pswdsame, setpswdsame] = useState(false);
  const [buyerstore, setbuyerstore] = useState();
  const [seeOldPass, setSeeOldPass] = useState("password");
  const [seeNewPass, setSeeNewPass] = useState("password");
  const [seeNewPass2, setSeeNewPass2] = useState("password");
  const [password_match, setpassword_match] = useState(false);
  const [change_modal1, setchange_modal1] = useState(false);
  const [change_modal2, setchange_modal2] = useState(false);
  const [change_modal3, setchange_modal3] = useState(false);
  const[headvalidpass, setheadvalidpass] = useState(false)
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  const verifyEmail = str => {
    if (pass != "" && pass2 != "" && otp != "") {
      let regex = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{";:;'?/>;.<;,])(?!.*\s).*$/;
      if (regex.test(pass) == false) {
        setheadvalidpass(true)
        // alert(
         
        //   "Invalid Password , a good password is a mixture of alphanumericals , symbols and capital letters"
        // );
      } else {
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
              // //console.log(response);
              setpass("");
              setpass2("");
              setotp("");
              // window.location.reload(true)
              props.onHide();
              alert("Successully changed password");
            })
            .catch(error => {
              // //console.log("error failed")
              if (error.message == "Network Error") {
                alert("Network Error \n Please Try Again later");
              } else {
                // //console.log(error.response);
                alert(error.response.data.error.message);
              }

              // //console.log(error);
              // //console.log(error.message, "msg");
            });
          // //console.log('proceed');
        } else {
          // Alert.alert("Passwords Are not equal");
          //  alert("passwords doesnt match")
          setpassword_match(true);
          setpswdsame(true);
        }
      }
    } else {
      // alert("enter valid data")
      setvalidemptyfields(true);
    }
  };
  return (
    <Modal
      id="main_modal"
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header id="modal_head">
        <div className="change_pass_head">
          <p>Change Password</p>
        </div>
        <div id="change_close" onClick={props.onHide}>
          <IoIosClose className="close_icon_head" />
        </div>
        {/* <Image
          onClick={props.onHide}
          id="close_img2"
          src={require("./images/close.png")}
        /> */}
      </Modal.Header>
      <Modal.Body>
        <div className="header_div">
          <div id="change_form1_class">
            <div class="md-form md-outline header_oldpass">
              <input
                type={seeOldPass}
                value={otp}
                id="email_id2"
                className="form-control buyer_popup_field"
                onChange={e => {
                  setotp(e.target.value);
                  setvalidemptyfields(false);
                }}
              />
              <label className="input_text_buyer" for="email_id2">
                Enter Password
              </label>

              <div
                onClick={() => {
                  setchange_modal1(!change_modal1);
                  if (seeOldPass == "password") setSeeOldPass("text");
                  else setSeeOldPass("password");
                }}
                className="search-icon_signup"
              >
                <i
                  class={
                    change_modal1 == true ? "fa fa-eye" : "fa fa-eye-slash"
                  }
                />
              </div>
            </div>

            {/* <Form.Control className="head_change_pass" id="email_id" type={seeOldPass} value={otp} 
            placeholder="Enter Password"
            onChange={(e)=>{
                setotp(e.target.value)
                setvalidemptyfields(false)
            }} /> */}
          </div>
          <div id="change_form2_class">
            <div class="md-form md-outline">
              <input
                type={seeNewPass}
                value={pass}
                id="email_id002a"
                className="form-control buyer_popup_field"
                onChange={e => {
                  setpass(e.target.value);
                  setvalidemptyfields(false);
                  setpswdsame(false);
                }}
              />
              <label className="input_text_buyer" for="email_id002a">
                Enter New Password
              </label>

              <div
                onClick={() => {
                  setchange_modal2(!change_modal2);
                  if (seeNewPass == "password") setSeeNewPass("text");
                  else setSeeNewPass("password");
                }}
                className="search-icon_signup"
              >
                <i
                  class={
                    change_modal2 == true ? "fa fa-eye" : "fa fa-eye-slash"
                  }
                />
              </div>
            </div>

            {/* <Form.Control id="email_id" type={seeNewPass} value={pass} 
            placeholder="Enter New Password"
            onChange={(e)=>{
                setpass(e.target.value)
                setvalidemptyfields(false)
                setpswdsame(false)
            }}/> */}

            {/* <p onClick={()=>{
              if(seeNewPass=="password")
                setSeeNewPass("text")
              else
                setSeeNewPass("password")
            }}>X</p> */}
          </div>
          {password_match == true?
(
  <div className="change_valid">
    <p><span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Passwords Dont match</p>
  </div>
) : (
  <p></p>
)
          }
          {/* {password_match == true ? (
            <div className="email_err">
              <p>Passwords Dont match</p>
            </div>
          ) : (
            <p></p>
          )} */}
          <div id="change_form3_class">
            <div class="md-form md-outline">
              <input
                type={seeNewPass2}
                value={pass2}
                id="email_id1003a"
                className="form-control buyer_popup_field"
                onChange={e => {
                  setpass2(e.target.value);
                  setvalidemptyfields(false);
                  setpswdsame(false);
                }}
              />
              <label className="input_text_buyer" for="email_id1003a">
                Re-Enter Password
              </label>

              <div
                onClick={() => {
                  setchange_modal3(!change_modal3);
                  if (seeNewPass2 == "password") setSeeNewPass2("text");
                  else setSeeNewPass2("password");
                }}
                className="search-icon_signup"
              >
                <i
                  class={
                    change_modal3 == true ? "fa fa-eye" : "fa fa-eye-slash"
                  }
                />
              </div>
            </div>

            {/* <Form.Control id="email_id" type={seeNewPass2} value={pass2} 
            placeholder="Re-Enter Password"
            onChange={(e)=>{
                setpass2(e.target.value)
                setvalidemptyfields(false)
                setpswdsame(false)
            }}/> */}
          </div>
          {headvalidpass == true?
(
  <div className="change_valid">
    <p><span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Invalid Password , a good password is a mixture of alphanumericals , symbols and capital letters</p>
  </div>
) : (
  <p></p>
)
          }

          {validemptyfields == true ? (
            <div className="change_valid">
              <p><span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Enter Valid Data</p>
            </div>
          ) : (
            <p></p>
          )}


          <div className="change_buttonclass">
            <button
              onClick={() => {
                verifyEmail();
              }}
              id="change_button_id"
            >
              {" "}
              Update
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
function Invite(props) {
  const [email, setEmail] = useState("");
  const [inviteemail, setinviteemail] = useState(false);
  const[showtable,setshowtable]=useState(false);
  const[leadper,setleadper]=useState([])
  const[campper,setcampper]=useState([])
  const[buyerper,setbuyerper]=useState([])
  const[pubper,setpubper]=useState([])
  const[vertiper,setvertiper]=useState([])
  const[onviewc,setonviewc]=useState(true)
  const[onviewb,setonviewb]=useState(true)
  const[onviewp,setonviewp]=useState(true)
  const[onviewv,setonviewv]=useState(true)
  const[errormessage,seterrormessage]=useState("")








  const checkEmail = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  const handleEmail = ema => {
    setEmail(ema);
    if (checkEmail(ema) == false) {
      setinviteemail(true);
      setshowtable(false)

    } else {
      setinviteemail(false);
      setshowtable(true)

    }
  };
  const handlelead=(per)=>{
    if(leadper.includes(1)){
      leadper.pop(per)

    }
    else{
      leadper.push(per)
      //console.log(leadper)
      

    }


  }
  const handlecamp=(per)=>{
    //console.log(per,"camp")
   if(campper.includes(per)==false){
     if(campper.find(element => element == per)==undefined){
      if(per==1){
        setonviewc(false);
        campper.push(per);
        //console.log("camp",campper)

      }
      else{
        campper.push(per);
        //console.log("camp",campper)

      }

     }

   }
   else{
   let a = campper.indexOf(per);
       if(per==1){
         setonviewc(true);
         const newcampper = campper.filter((item, idx) => idx !== a);
    setcampper(newcampper);
    //console.log("camp",campper)

       }
       else{
        const newcampper = campper.filter((item, idx) => idx !== a);
        setcampper(newcampper);
        //console.log("camp",campper)

       }
      }
  }
  const handlebuyer=(per)=>{
    //console.log(per,"buy")
    if(buyerper.includes(per)==false){
      if(buyerper.find(element => element == per)==undefined){
       if(per==1){
         setonviewb(false);
         buyerper.push(per);
         //console.log("buyer",buyerper)
 
       }
       else{
         buyerper.push(per);
         //console.log("buyer",buyerper)
 
       }
 
      }
 
    }
    else{
    let a = buyerper.indexOf(per);
        if(per==1){
          setonviewb(true);
          const newbuyerper = buyerper.filter((item, idx) => idx !== a);
     setbuyerper(newbuyerper);
     //console.log("buyer",buyerper)
 
        }
        else{
          const newbuyerper = buyerper.filter((item, idx) => idx !== a);
          setbuyerper(newbuyerper);
          // console.log("buyer",buyerper)
 
        }
       }

  }
  const handlepub=(per)=>{
    //console.log(per,"pub")
    if(pubper.includes(per)==false){
      if(pubper.find(element => element == per)==undefined){
       if(per==1){
         setonviewp(false);
         pubper.push(per);
         console.log("publishe",pubper)
 
       }
       else{
         pubper.push(per);
         console.log("publishe",pubper)
 
       }
 
      }
 
    }
    else{
    let a = pubper.indexOf(per);
        if(per==1){
          setonviewp(true);
          const newpubper = pubper.filter((item, idx) => idx !== a);
     setpubper(newpubper);
     console.log("publishe",pubper)
 
        }
        else{
          const newpubper = pubper.filter((item, idx) => idx !== a);
          setpubper(newpubper);
          console.log("publishe",pubper)
 
        }
       }


  }
  const handlevert=(per)=>{
    //console.log(per,"ver")
    if(vertiper.includes(per)==false){
      if(vertiper.find(element => element == per)==undefined){
       if(per==1){
         setonviewv(false);
         vertiper.push(per);
         console.log("vertical",vertiper)
 
       }
       else{
         vertiper.push(per);
         console.log("vertical",vertiper)
 
       }
 
      }
 
    }
    else{
    let a = vertiper.indexOf(per);
        if(per==1){
          setonviewv(true);
          const newvertiper = vertiper.filter((item, idx) => idx !== a);
     setvertiper(newvertiper);
     console.log("vertical",vertiper)
 
        }
        else{
          const newvertiper = vertiper.filter((item, idx) => idx !== a);
          setvertiper(newvertiper);
          console.log("vertical",vertiper)
 
        }
       }


  }

  const inviteteam=()=>{
   // let email=localStorage.getItem("email")
    

    const data = {
      email:email,
      member_type: "m",
      permission_ids: [
        {
        module_id: 2,
        actions: leadper,
      },
      {
        module_id: 3,
        actions: campper,

      },
      {
        module_id: 4,
        actions: buyerper,

      },
      {
        module_id: 5,
        actions: pubper,

      },
      {
        module_id: 6,
        actions: vertiper,

      }
       
      ]
    };
    console.log("dataofinvite",data)
    const inviteteammate = {
      url:
        API_URL+"/user/invite",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios(inviteteammate)
      .then(response => {
        if (response.status == 200) {
          setshowtable(false);
          setonviewc(true)
         setonviewb(true)
          setonviewp(true)
          setonviewv(true)
          seterrormessage("")
          props.onHide();
console.log("sucess")

          //props.onHide
        
        }

      })
      .catch(error => {
       
        if (error.response.status === 500) {
          console.log("error",error)

            //seterrormessage("Email Already exist")
        } else {
        }
      });
  }

  return (
    <Modal
      id="main_modal"
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header id="modal_head">
        <div id="close_img2" onClick={props.onHide}>
          <IoIosClose />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div id="form2_class">
          <Form.Control
            value={email}
            onChange={event => handleEmail(event.target.value)}
            id="email_id"
            type="email"
            placeholder="Enter Email"
          />
        </div>

        {inviteemail == true ? (
          <div className="email_err">
            <p>Check the format of email</p>
          </div>
        ) : (
          <p></p>
        )}
  {
    showtable == true?(
      <table
      id="dtBasicExample"
      class="table table-striped table-sm"
      cellspacing="0"
    >
      <tr>
        <td></td>
        <th scope="col">Lead</th>
        <th scope="col">Campaign</th>
      
        <th scope="col">Buyer</th>
        <th scope="col">Publisher</th>
        <th scope="col">Vertical</th>
      </tr>
      <tr>
        <th scope="row">View</th>
        <td>
          {" "}
          <input type="checkbox"   onChange={() => handlelead(1)} />
        </td>
        <td>
          {" "}
          <input type="checkbox"  onChange={() =>handlecamp(1) }/>
        </td>
        <td>
          {" "}
          <input type="checkbox"  onChange={() => handlebuyer(1)}/>
        </td>
        <td>
          {" "}
          <input type="checkbox" onChange={() => handlepub(1)} />
        </td>
        <td>
          {" "}
          <input type="checkbox" onChange={() => handlevert(1)}/>
        </td>
      </tr>
      <tr>
        <th scope="row">Create</th>
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(2)} /> */}
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewc} onChange={() =>handlecamp(2) }/>
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewb} onChange={() => handlebuyer(2)}/>
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewp} onChange={() => handlepub(2)} />
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewv} onChange={() => handlevert(2)}/>
        </td>
      </tr>
      <tr>
        <th scope="row">Update</th>
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(3)} /> */}
        </td>
        <td>
          {" "}
          <input type="checkbox"  disabled={onviewc} onChange={() =>handlecamp(3) }/>
        </td>
        <td>
          {" "}
          <input type="checkbox"  disabled={onviewb} onChange={() => handlebuyer(3)}/>
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewp} onChange={() => handlepub(3)} />
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewv} onChange={() => handlevert(3)}/>
        </td>
      </tr>
      <tr>
        <th scope="row">Delete</th>
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(4)} /> */}
        </td>
        <td>
          {" "}
          <input type="checkbox"  disabled={onviewc} onChange={() =>handlecamp(4) }/>
        </td>
        <td>
          {" "}
          <input type="checkbox"  disabled={onviewb} onChange={() => handlebuyer(4)}/>
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewp} onChange={() => handlepub(4)} />
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewv} onChange={() => handlevert(4)}/>
        </td>
      </tr>
    </table>

    ):(
<p></p>
    )
  }
  {errormessage==""?(<p></p>):(
    <p>{errormessage}</p>
  )

  }
       

        <div className="buttonclass">
          <button id="button_id" onClick={()=>{inviteteam()}}> Invite</button>
        </div>
      </Modal.Body>
    </Modal>
  );
}





function MyVerticallyCenteredModal(props) {
  const [success_alert, setsuccess_alert] = useState(false);
  const [success_alertText, setsuccess_alertText] = useState("");
  const [firstname, setFirstName] = useState();
  const [middlename, setMiddleName] = useState();
  const [lastname, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [company, setCompany] = useState();
  const [updateerr, setupdateerr] = useState(false);
  const [code, setcode] = useState("+1");
  const [photo,setPhoto]=useState(true);
  const[ header_err5,setheader_err5] =useState(false)
  const[header_ph,setheader_ph] = useState(false)
  const[header_ph1,setheader_ph1] = useState(false)
  const [myData1,setMyData1]=useState({});
  const checkValidPhN = str => {
    var regex = new RegExp("^([+][0-9]{1,4}[-][0-9]{1,10})$");

    if (regex.test(str)) {
      return true;
    }

    return false;
  };
  const handleChangeFile = file => {
    // //console.log("Image",file.name)
    // //console.log("file",file)
    let picdata = new FormData();
    picdata.append("picture", file);
    picdata.append("id", localStorage.getItem("user_id"));
    const config = {
      url: API_URL+"/file/user/upload",
      method: "post",
      data: picdata,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json"
      }
    };
    axios(config)
      .then(response => {
        // //console.log("Imageupload", response);
        // //console.log("");
        setPhoto(true)
        props.setImgchange(true)
        alert("Image Uploaded Sucessfully");
        setPhoto(false)
        props.setImgchange(false)
      })
      // Error handling
      .catch(error => {
        // alert(error.response.data.error.message);
        alert("Upload Valid Image");
      });
  };
  useEffect(() => {
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
        // //console.log("response", response);
        if (response && response.data.data) {
          if (response.data.status_code == 200) {
            // setSuccess(true);
            // //console.log(response.data);
          }

          setFirstName(response.data.data.firstname);
          setMiddleName(response.data.data.middlename);
          setLastName(response.data.data.lastname);
          setCompany(response.data.data.company);
          // let num = response.data.data.phone;
          setPhone(response.data.data.phone);
          // setcode(num.split("-")[0]);
          setMyData1(response.data.data)
          setEmail(response.data.data.email);
        }

        // //console.log("response of header profile", response);
      })
      .catch(error => {
        // //console.log("error failed header")
        if (error.message == "Network Error") {
          alert("Network Error \n Please Try Again later");
        } else {
          // //console.log(error.response);
          // alert("error :"+error.response.data.error.message)
        }

        // //console.log(error);
        // //console.log(error.message, "msg");
      });
  }, []);
  const buyer_firstname = evt => {
    if (evt.target.value != "") {
      let bool = checkString(evt.target.value);
      // //console.log(bool)
      // //console.log(evt.target.value,"value")
      if (bool) {
        setFirstName(evt.target.value);
        setupdateerr(false);
      }
    }
    if (evt.target.value == "") {
      setFirstName(evt.target.value);
    }
  };

  const buyer_middlename = evt => {
    if (evt.target.value != "") {
      let bool = checkString(evt.target.value);
      // //console.log(bool)
      // //console.log(evt.target.value,"value")
      if (bool) {
        // setFirstName(evt.target.value)
        setMiddleName(evt.target.value);
        setupdateerr(false);
      }
    }
    if (evt.target.value == "") {
      setMiddleName(evt.target.value);
    }
  };
  // function to handle lastname
  const buyer_lastname = evt => {
    if (evt.target.value != "") {
      let bool = checkString(evt.target.value);
      // //console.log(bool)
      // //console.log(evt.target.value,"value")
      if (bool) {
        // setFirstName(evt.target.value)
        setLastName(evt.target.value);
        setupdateerr(false);
      }
    }
    if (evt.target.value == "") {
      setLastName(evt.target.value);
    }
  };
  // function to handle Email
  const buyer_email = value => {
    setEmail(value);
    setupdateerr(false);
  };
  // function to handle Company
  const buyer_company = evt => {
    if (evt.target.value != "") {
      let bool = checkString(evt.target.value);
      // //console.log(bool)
      // //console.log(evt.target.value,"value")
      if (bool) {
        // setFirstName(evt.target.value)
        setCompany(evt.target.value);
        setupdateerr(false);
      }
    }
    if (evt.target.value == "") {
      setCompany(evt.target.value);
    }
  };
  // function to handle buyer Phone
  const buyer_contact = event => {
    const value = event.target.value;
    // console.log(value,"value")
    const message = value.slice(0, 16);
    // console.log("sliced number",message)
    setPhone(message);
    setupdateerr(false);
  };
  //Function to post updated details to Database
  function update() {
    if (firstname && lastname && phone && email && company) {
      const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone:  phone,
        company: company,
        middlename: "",
        active: 1,
        email_notifications:myData1.email_notifications,
        payment_type:myData1.payment_type,
        time_zone:myData1.time_zone,
        payment_gateway_api_key:myData1.payment_gateway_api_key,
        payment_gateway_secret_key:myData1.payment_gateway_secret_key
      };
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
          // window.location.reload(true);
          console.log(response,"header->profile")
          props.setBoolName(false)
          props.mygetdetailfunc()
          props.onHide();
          setsuccess_alert(true);
          setsuccess_alertText("Successfully Edited the Profile");
          props.setBoolName(true)
          // //console.log("success")
          // showToast()
        })
        .catch(error => {
          console.log("error failed")
          if (error.message == "Network Error") {
            alert("Network Error \n Please Try Again later");
          } else {
            // //console.log(error.response);
            alert(error.response.data.error.message);
          }

          // //console.log(error);
          // //console.log(error.message, "msg");
        });
    } else {
      // Alert.alert(
      //   "one or more fields are empty",
      //   "fill all details",
      //   [
      //     {
      //       text: "Ok",
      //       onPress: () =>// //console.log("enter valid details")
      //     }
      //   ],
      //   { cancelable: false }
      // );
    }
  }
  return (
    
    <div>
    <div>
    <Modal
      id="main_modal"
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header id="modal_head">
        <div id="close_img11" onClick={props.onHide}>
          <IoIosClose />
        </div>
        
        <Modal.Title id="update_class_head">Update the Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal_img_class">
         
         

          <div className="profile_images_head">
            <input
              type="file"
              id="file_header"
              style={{ display: "none" }}
              onChange={e => handleChangeFile(e.target.files[0])}
              // onClick={e => handleChangeFile(e.target.files[0])}
            />{" "}
            {props.imgchange &&
            
            <Image
              style={{
                width: "33%",
                height: "7rem",
                outline: "none",
                border: "1px Solid #666",
                marginLeft: "13%"
              }}
              src={API_URL+`/file/user/${localStorage.getItem(
                "user_id"
              )}/200/200?t=${new Date().toTimeString()}`}
              roundedCircle
            />
            }
            {!props.imgchange &&

            <Image
              style={{
                width: "40%",
                height: "40%",
                outline: "none",
                border: "1px Solid #666",
                marginLeft: "4%"
              }}
              src={API_URL+`/file/user/${localStorage.getItem(
                "user_id"
              )}/200/200?t=${new Date().toTimeString()}`}
              roundedCircle
            />
            }
            <label className="edit_pic_upload_head123" for="file_header">
              <EditImage />
            </label>
          </div>

        
        </div>

        <div className="profile_edit_form_div">
          <div className="form1_class">
            <Form>
              <Form.Row id="form_row">
               
                <div class="border112 border112aaa">
                  <h1>First Name</h1>
                  <input
                    type="text"
                    name="fname_profile_edit"
                    placeholder="First Name"
                    value={firstname}
                    id="fname_id"
                    class="form-control"
                    onChange={event => buyer_firstname(event)}
                  />
                </div>

           

                
              </Form.Row>
            </Form>
          </div>

          <div id="form2_class">
           
            <div class="border112 border112aaa">
              <h1>Last Name</h1>
              <input
                type="text"
                name="lname_profile_edit"
                placeholder="Last Name"
                value={lastname}
                id="email_id"
                class="form-control"
                onChange={event => buyer_lastname(event)}
              />
            </div>
          </div>
          <div id="form2_class">
           
            <div class="border112 border112aaa">
              <h1>Email</h1>
              <input
                type="email"
                name="email_profile_edit"
                placeholder="Enter Email"
                value={email}
                id="email_id"
                class="form-control"
                onChange={event => buyer_email(event.target.value)}
              />
            </div>
          </div>
          {header_err5 == true ? (
            <div className="update_err">
              <p> <span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Enter valid email id</p>
            </div>
          ) : (
            <p></p>
          )}
          <div id="form2_class">
           
            <div class="border112 border112aaa">
              <h1>Company</h1>
              <input
                type="text"
                name="company_profile_edit"
                placeholder="Company"
                value={company}
                id="email_id"
                class="form-control"
                onChange={event => buyer_company(event)}
              />
            </div>
          </div>
          <div id="form2_class">
          

          <div class="border112 border112aaa">
              <h1>Phone</h1>
              <input
                id="ph_head_modal"
                type="text"
                class="form-control"
                value={phone}
                onChange={event => buyer_contact(event)}
              />
            </div>
          

            
          </div>
          {header_ph == true ? (
            <div className="update_err123">
              <p> <span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Make Sure to enter a valid phone number</p>
            </div>
          ) : (
            <p></p>
          )}
            {header_ph1 == true ? (
            <div className="update_err">
              <p> <span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Make Sure to enter a valid phone number</p>
            </div>
          ) : (
            <p></p>
          )}
          {updateerr == true ? (
            <div className="update_err">
              <p> <span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Make Sure all required fields are filled</p>
            </div>
          ) : (
            <p></p>
          )}
             




          <div className="buttonclass_head">
            <button
              // onClick={()=>update()}
              onClick={event => {
                let flag = 1;
                if (flag == 1) if (firstname == "") flag = 0;
                if (lastname == "") flag = 0;
                if (email == "") flag = 0;
                if (company == "") flag = 0;
                if (phone == "") flag = 0;
                if (flag == 0) {
                  // alert("Make Sure all required fields are filled")
                  setupdateerr(true);
                }
                if (checkEmail(email) == false && flag == 1) {
                  setheader_err5(true)
                  // alert("Enter valid email id");
                  flag = 0;
                }
                if(phone.length<10 && flag==1){
                  setheader_ph(true)
                  setheader_ph1(false)
                  // alert("Make Sure to enter a valid phone number")
                  flag=0
                }
                if(checkValidPhN(phone)==false && flag==1){
                  setheader_ph(false)
                  setheader_ph1(true)
                  // alert("Make Sure to enter a valid phone number")
                  flag=0
                }
                if (flag == 1) {
                  update(event);
                }
              }}
              id="button_id_head"
            >
              {" "}
              Update
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    </div>
    <div>
       <Modal
        show={success_alert}
       style={{marginTop:"17%"}}
        
      >
        <div style={{height:60,textAlign:"center",padding:"2rem"}} >
          <div style={{marginTop:20}}><p style={{fontSize:16,color:"#484393",fontWeight:"500"}}>{success_alertText}</p> </div><div id="close_img11"  onClick={() => setsuccess_alert(false)}><IoIosClose /></div>
        </div>
        
        <div className="mail_invt_textcs" ></div>
      </Modal>
   </div>
    </div>
  );
}

function Header(props) {
  var history = useHistory();
  //const[invitedteammeber,setinviteteammember]=useState([])

  const [refresh, setRefresh] = useState({});
  const [next, setNext] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow3, setModalShow3] = React.useState(false);
 // const [modalShow4, setModalShow4] = React.useState(false);

  const [boolname, setBoolName] = useState(true);
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [mname, setMiddleName] = useState("");
  const [company, setCompany] = useState("");
  const [ph, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photo,setPhoto] = useState(true)  
  
  useEffect(() => {
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
        // //console.log("response", response);
        if (response && response.data.data) {
          if (response.data.status_code == 200) {
            // setSuccess(true);
            // //console.log(response.data);
          }
          setFirstName(response.data.data.firstname);
          setMiddleName(response.data.data.middlename);
          setLastName(response.data.data.lastname);
          setCompany(response.data.data.company);
          setPhone(response.data.data.phone);
          setEmail(response.data.data.email);
        }

        // //console.log("response of publisher", response);
      })
      .catch(error => {
        // //console.log("error failed")
        if (error.message == "Network Error") {
          alert("Network Error \n Please Try Again later");
        } else {
        }
      });
     
  }, []);
  const mygetdetailfunc=()=>{
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
        // //console.log("response", response);
        if (response && response.data.data) {
          if (response.data.status_code == 200) {
            // setSuccess(true);
            // //console.log(response.data);
          }
          setFirstName(response.data.data.firstname);
          setMiddleName(response.data.data.middlename);
          setLastName(response.data.data.lastname);
          setCompany(response.data.data.company);
          setPhone(response.data.data.phone);
          setEmail(response.data.data.email);
        }

        // //console.log("response of publisher", response);
      })
      .catch(error => {
        // //console.log("error failed")
        if (error.message == "Network Error") {
          alert("Network Error \n Please Try Again later");
        } else {
        }
      });
     
  }

  const logout = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload(true);
  };
const handleChangecuFile = file => {
    // //console.log("Image",file.name)
    // //console.log("file",file)
    let picdata = new FormData();
    picdata.append("picture", file);
    picdata.append("id", localStorage.getItem("user_id"));
    const config = {
      url: API_URL+"/file/custom/upload",
      method: "post",
      data: picdata,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json"
      }
    };
    axios(config)
      .then(response => {
        // //console.log("Imageupload", response);
        // //console.log("");
        setPhoto(true)
        alert("Image Uploaded Sucessfully");
        setPhoto(false)
      })
      // Error handling
      .catch(error => {
        // alert(error.response.data.error.message);
        alert("Upload Valid Image");
      });
  };
  return (

    <div>
      <div className="heder-part">
        <div className="header">
          <Col xs={12} sm={12} md={4} lg={4}>
          <div className="logo_div">
              
             
             {props.logochange &&
              <img
              style={{height:"50px",marginTop:"-1px"}}
              alt="logo"
             // className="header_logo_img"
               src={API_URL+`/file/custom/${localStorage.getItem(
                 "user_id"
               )}`}
             />
             }
             {!props.logochange &&
              <img
              alt="logo"
              style={{height:"50px",marginTop:"-1px"}}
               src={API_URL+`/file/custom/${localStorage.getItem(
                 "user_id"
               )}`}
             />
             }
           
         </div>



          </Col>
          <Col xs={12} sm={12} md={4} lg={4} style={{display:"flex"}}>
           
          </Col>

          <Col xs={12} sm={12} md={4} lg={4}>
            <div className="profile">
              <div className="name">
                <h2>
                  {boolname &&
                  fname+" "+lname
                  }
                  {!boolname &&
                  fname+" "+lname
                  }
                </h2>
                <p>
                  {localStorage.getItem("role") == 2 ? "Admin" : localStorage.getItem("role") == 3?"Publisher" :"Team Member"}
                </p>
              </div>
              <Link   to={{ pathname: "/settings" }}>
              <div className="pic">
                <img
                  // onClick={() => setModalShow(true)}
                  src={API_URL+`/file/user/${localStorage.getItem(
                    "user_id"
                  )}/200/200?t=${new Date().toTimeString()}`}
                />
              
              
              </div>
              </Link>
            

              <Change_Password
                setRefresh={setRefresh}
                show={modalShow2}
                onHide={() => setModalShow2(false)}
              />

              <Invite
                setRefresh={setRefresh}
                show={modalShow3}
                onHide={() => setModalShow3(false)}
              />
  
            </div>
          </Col>
        </div>
      </div>
      
    </div>
   
      
  );
}
export default Header;
