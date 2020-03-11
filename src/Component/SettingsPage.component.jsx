//created by surya teja
//last modified 24 dec 2019

import React, { useState, useEffect } from "react";
import { API_URL ,logoutidle} from '../AppConfig'
import { cca } from "./UserManagement/cc"
import axios from "axios";
import {timezones} from './gmttime';
import ToggleButton from "react-toggle-button";
import EditImage from "../EditImage";

import TeamMember from "./UserManagement/TeamMember.component";
import { GoSettings } from "react-icons/go";
import {
  Col,
  Row,
  Button,
  Modal,
  Image,
  Dropdown,
  InputGroup
} from "react-bootstrap";
import { IoIosClose, IoMdLogOut,IoIosWarning } from "react-icons/io";
export default function SettingsPage(props) {
  props.setTabChange(true)
  localStorage.setItem("tab","tab")
  localStorage.setItem("key_leads","key_leads")
  props.setTabChange(false)
  const [modalShow2, setModalShow2] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [selectedPublisher, setSelectedPublisher] = React.useState("Select a Publisher");
  const [selectedPublisherId, setSelectedPublisherId] = React.useState("Select a Publisher");
  const [pubList, setPubList] = React.useState([]);
  const [showPayPub, setShowPayPub] = React.useState(false);
  const [mydata,setData]= React.useState({})
  const [active1, setActive] = useState(false);
  const [payment,setPayment]=useState("2")
  const [time,setTime]=useState("GMT")
  const [accesskey,setAccessKey]=useState("")
  const [secretkey,setSecretKey]=useState("")
  const [lead_butt1, setlead_butt1] = useState(true);
  const [lead_butt2, setlead_butt2] = useState(false);
  const [lead_butt3, setlead_butt3] = useState(false);
  const [company, setCompany] = useState();
  const [myData1,setMyData1]=useState({});
  const[personalDetails,setpersonalDetails] = useState(true);
  const[teamMemb,setteamMemb] = useState(false)
  const[PayDetails,setPayDetails] = useState(false);
  const [photo,setPhoto]=useState(true);
  const [middlename, setMiddleName] = useState();
  const [lastname, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [firstname, setFirstName] = useState();
  const [updateerr, setupdateerr] = useState(false);
  const [email1, setEmail1] = useState("");
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
  const[headvalidpass, setheadvalidpass] = useState(false);
  const[ header_err5,setheader_err5] =useState(false)
  const[header_ph,setheader_ph] = useState(false)
  const[header_ph1,setheader_ph1] = useState(false)

  const [success_alert, setsuccess_alert] = useState(false);
  const [success_alertText, setsuccess_alertText] = useState("");
  const [code, setcode] = useState("+1");
  const [email_inv, setEmail_inv] = useState("");
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
  const[planname,setplanname]=useState();
  const[plandesc,setplandesc]=useState();
  const[planamount,setplanamout]=useState();
  const[subid,setsubid]=useState();
  const[subcancel,setsubcancel]=useState();
  const[submodal,setsubmodal]=useState(false);
  const[unsubcribealert,setunsubcribealert]=useState(false)
  const[unsubcribetext,setunsubcribetext]=useState("")
  const[unsubcribeenddate,setunsubcribeenddate]=useState()
  const[set_err1,setSet_err1]= useState(false)
  const[set_err2,setSet_err2]= useState(false)
  const[set_err3,setSet_err3]= useState(false)
 
  useEffect(()=>{
     const getPublishersList = (
    limit = 100,
    page = 1,
    status = [],
    search1 = "",
    pub_id1 = "",
    a = "created",
    b = 1
  ) => {
    
    const data = {
      page: 1,
      limit: 100,
      search: "",
      filters: {
        status: [],
        pub_id: ""
      },
      sortby: {
        [a]: 1
      }
    };
    const config = {
      url: API_URL+"/publisher/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
      console.log(response.data.data.list,"list of pub settings page")
        setPubList(response.data.data.list);
      
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        // ////console.log("error failed");
        // if (error.message == "Network Error") {
        //   alert("Network Error \n Please Try Again later");
        // } else if (
        //   error.response.data.error.message ===
        //   "Your account had been deactivated"
        // ) {
        //   ////console.log(error.response);
        //   alert("error :" + error.response.data.error.message);
        // } else {
        //   ////console.log(error.response);
        //   alert("error :" + error.response.data.error.message);
        // }

        // ////console.log(error);
        // ////console.log(error.message, "msg");
      });
    ////console.log("proceed to home screen");

    // value => this.verifyEmail(value)
  };
  getPublishersList()
  },[])

  const customStyles01 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "37%"
    },
  };
  const unsubcribe = async (a,b,c)  => { 
    let userid =localStorage.getItem("user_id")
    if(b==null){
      
   
    const data = {
      user_id:userid,
      razorpay_subscription_id: a,
      cancel_date: c
    };
    console.log("cs",data)
    const config = {
      url: API_URL+"/payment/cancel-subscription",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        setsubmodal(false)
        setunsubcribealert(true);
        setunsubcribetext("Sucessfully Unsubscribed")
        
      })
      .catch(error => {
        console.log("error", error);
        alert("Sorry for the inconvince, please try again later");
      });
    }
  else{
    alert("You already canceled your subcription");
  }
  }
  function subcribemodal() {
    setsubmodal(true);
  }

  function closesubmodale(){
    setsubmodal(false);
  }
  
  useEffect(() => {
    setEmail1(localStorage.getItem("email"));
  }, []);

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
          console.log("userdata",response.data.data)
           setData(response.data.data);
            setActive(response.data.data.email_notifications==1?true:false)
            setPayment(response.data.data.payment_type)
            setAccessKey(response.data.data.payment_gateway_api_key)
            setSecretKey(response.data.data.payment_gateway_secret_key)
            setTime(response.data.data.time_zone)
          setFirstName(response.data.data.firstname);
          setMiddleName(response.data.data.middlename);
          setLastName(response.data.data.lastname);
          setCompany(response.data.data.company);
          let num = response.data.data.phone;
          setcode(num.split("-")[0]);
          setPhone(num.split("-")[1]);
          setMyData1(response.data.data)
          setEmail(response.data.data.email);
          setplanname(response.data.data.plan.plan_name)
          setplandesc(response.data.data.plan.description)
          setplanamout(response.data.data.plan.amount)
          setsubid(response.data.data.plan.subscription.razorpay_sub_id)
          setsubcancel(response.data.data.plan.subscription.cancel_date)
          //setsubend(response.data.data.)
          setunsubcribeenddate(response.data.data.plan.subscription.enddate);
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
      });
  }, []);
  
   
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
    const data = {
      email_inv:email_inv,
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
        }

      })
      .catch(error => {
       
        if (error.response.status === 500) {
          console.log("error",error)
        } else {
        }
      });
  }
  const handleChangeFile = file => {
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
        props.setImgchange(true)
        setPhoto(true)
        alert("Image Uploaded Sucessfully");
        setPhoto(false)
        props.setImgchange(false)
      })
      // Error handling
      .catch(error => {
        console.log(error.response)
      if(error.response.data){

          alert(error.response.data.error);
        }else{
          alert("Upload valid image")
        }

      });
  };

  const buyer_firstname = evt => {
    if (evt.target.value != "") {
      let bool = checkString(evt.target.value);
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
      if (bool) {
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
      if (bool) {
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
    const message = value.slice(0, 11);
    // console.log("sliced number",message)
    setPhone(message);
    setupdateerr(false);
  };
  //Function to post updated details to Database
  function updateProfile() {
    if (firstname && lastname && phone && email && company) {
      const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone:  code+"-"+phone,
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
       
          setsuccess_alert(true);
          setsuccess_alertText("Profile Details Uploaded Successfully");
         
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
        });
    } else {
   
    }
  }
  const checkValidPhN = str => {
    var regex = new RegExp("^([+][0-9]{1,4}[-][0-9]{1,10})$");

    if (regex.test(str)) {
      return true;
    }
  }
  const changePassword1 = str => {
    if (pass != "" && pass2 != "" && otp != "") {
      let regex = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{";:;'?/>;.<;,])(?!.*\s).*$/;
      if (regex.test(pass) == false) {
        setheadvalidpass(true)
     
      } else {
        if (pass == pass2) {
          const data = {
            email1: email1,
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
              setsuccess_alert(true);
              setsuccess_alertText("Successully changed password");
              // alert("Successully changed password");
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
        props.setLogochange(false)
        alert("Image uploaded sucessfully");
        props.setLogochange(true)
      })
      // Error handling
      .catch(error => {
        // alert(error.response.data.error.message);
        // console.log(error.response)
        if(error.response.data){

          alert(error.response.data.error);
        }else{
          alert("upload valid image")
        }
      });
  };
  
  const checkString = str => {
    var regex = new RegExp("^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$");
  
    if (regex.test(str)) {
      return true;
    }
  
    return false;
  };

  
  return (
    <div className="body_inner_set">
    <div className="page_heading">
      {/* <div className="back_icon"><IoIosArrowBack /></div> */}
      <div className="page_heading_name">Settings</div>
    </div>
    <div className="settings_main_div">
   
             <div className="modal_inner_block">
               
               <div className="modal_tab_btns">
                 <button
              onClick={() => {
                setpersonalDetails(true);
                setteamMemb(false);
                setlead_butt1(true);
                setPayDetails(false);
                setlead_butt2(false);
                setlead_butt3(false);
                ////console.log("hello", lead_butt1);
              }}
                   className={lead_butt1 == true ? "butt_true" : "butt_false"}
                 >
                   Personal Details
                 </button>
                 {localStorage.getItem("role")==2 &&
                 <button
                   onClick={() => {
                    setteamMemb(true);
                    setpersonalDetails(false);
                    setlead_butt1(false);
                    setPayDetails(false);
                    setlead_butt2(true);
                    setlead_butt3(false);
                    ////console.log("hello", lead_butt1);
                  }}
                   className={lead_butt2 == true ? "butt_true" : "butt_false"}
                 >
                   My Team Members
                 </button>
                 }
                 {/* <button
                   onClick={() => {
                   setPayDetails(true);
                   setteamMemb(false);
                   setpersonalDetails(false);
                    setlead_butt1(false);
                    setlead_butt2(false);
                    setlead_butt3(true);
                    ////console.log("hello", lead_butt1);
                  }}
                   className={lead_butt3 == true ? "butt_true" : "butt_false"}
                 >
                   Payment Details
                 </button> */}
               </div>
              
        
             </div>



        <div className="set_div_height">

          {PayDetails ==true?
      <div className="set_height">

        <div className="team1_box">
         <div className="personal_heading">
                    <p>Payment Settings</p>
                  </div>

                  <Row>
                   <Col>
                  <p className="custom_logo_set12">Configure your payment Settings</p>      
                  <select
                      className="select_top_signup_set12"
                      value={payment!=null?(payment=="1"?"RazorPay":"Stripe"):"Select"}
                      onChange={event => {
                       
                          if(event.target.value=="Select"){
                                 setPayment(null);
                          }
                          else
                        setPayment(event.target.value=="RazorPay"?1:2);
                        
                      }}
                    >
                   
                      <option value={"Select"}>Select</option>
                      {/* <option value={"RazorPay"}>RazorPay</option> */}
                      <option value={"Stripe"}>Stripe</option>
                    
                </select>
                </Col>
                <Col>
                <p className="custom_logo_set12">{payment==null?"Select Payment Method":(payment=="1"?"Current Method: Razor Pay":(payment=="2"?"Current Method: Stripe":"Select Payment Method"))}</p> 
                <div className="api_row">   
                <div>
                  {/* <p className="api_key12">API Key</p> */}
            

                  <div class="border112 enter_new_pass_team">
          <h1>API key</h1>
          <input
           type={seeNewPass}
            name="url"
            placeholder="First Name"
            value={accesskey}
            id="FirstName"
            class="form-control"
            onChange={(e)=>{
              setAccessKey(e.target.value)
          }}
          />
        </div>

                  
<div class="border112 enter_new_pass_team1">
          <h1>Secret key</h1>
          <input
          type={seeNewPass}
          value={secretkey}
            name="url"
            
            
            id="FirstName"
            class="form-control"
            onChange={(e)=>{
              setSecretKey(e.target.value)
          }}
          />
        </div>
{/* <div class="md-form md-outline enter_new_pass_team1">
              <input
                type={seeNewPass}
                value={secretkey}
                id="email_id002a"
                className="form-control buyer_popup_field"
                onChange={(e)=>{
                  setSecretKey(e.target.value)
              }}
              />
              <label className="input_text_buyer" for="email_id002a">
                Secret key
              </label>

        
            </div> */}
    {/* <input className="api_class1" placeholder="Secret Key" value={secretkey} onChange={(e)=>{
        setSecretKey(e.target.value)
    }}></input> */}
                  </div>
    </div> 
                </Col>
                </Row>
                <div className="set_butt_up">
                <Button 
                className="butt_up_set12"
                onClick={()=>{
      const mydata1=Object.assign({},{
        "active":mydata.active,
        "company":mydata.company,
        "email":mydata.email,
        "firstname":mydata.firstname,
        "lastname":mydata.lastname,
        "middlename":mydata.middlename,
        "phone":mydata.phone

      })
      const data =Object.assign({},mydata1,{
        email_notifications:active1==true?1:0,
        payment_type:""+payment+"",
        time_zone:time,
        payment_gateway_api_key:accesskey,
        payment_gateway_secret_key:secretkey
      })
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
          
         alert("settings are updated");
         
        })
        .catch(error => {
          console.log("error failed")
          if (error.message == "Network Error") {
            alert("Network Error \n Please Try Again later");
          } else {
           
            alert(error.response.data.error.message);
          }

         
        });
  
    }}>Update</Button>
    </div>
                  </div>
                
    {/* {(payment!=null)?(payment=="1"?<p>RazorPay</p>:<p>Stripe</p>):<p>select a payment method</p>


    } */}
                  </div>
                  :<div></div>
                  
            
          }


          {/* ss */}
          {teamMemb==true?
          <div>
 
          {/* //ANCHOR TEAM CODE */}
         <TeamMember />

          </div>:
         
          
          
          
          <div></div>}
        {personalDetails==true?
        <div>


<div className="sett1_box">
<div className="personal_heading">
            <p>Profile Details</p>
          </div>

<Row>
{/* <Col xs={12} sm={12} md={6} lg={1}>
  hello
</Col> */}
<Col xs={12} sm={12} md={6} lg={2}>
<p style={{backgroungColor:"#a0a0a0",color:"#666",marginBottom:"5px",fontSize:"14px",paddingLeft:"1rem",width:"13rem"}}><span style={{color:"red"}}>Note: </span>Image upload must be 400x400 dimensions</p>

<div className="profile_images_head">
            <input
              type="file"
              id="file_header"
              style={{ display: "none" }}
              onChange={e => handleChangeFile(e.target.files[0])}
              
            />{" "}
            {photo &&
            
            <Image
            className="image_set123"
            
              src={API_URL+`/file/user/${localStorage.getItem(
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
              src={API_URL+`/file/user/${localStorage.getItem(
                "user_id"
              )}/200/200?t=${new Date().toTimeString()}`}
              roundedCircle
            />
            }
            <label className="edit_pic_upload_head123_set" for="file_header">
              <EditImage />
            </label>
          </div>
        

</Col>

<Col xs={12} sm={12} md={6} lg={1}>

</Col>
<Col xs={12} sm={12} md={6} lg={3}>
<div class="border112_set border112_set_ex">
          <h1> First Name</h1>
          <input
                type="text"
                value={firstname}
                id="email_id2"
                className="form-control buyer_popup_field"
                onChange={event => buyer_firstname(event)}
              />
        </div>

            

<div class="border112_set border112_set_ex12">
          <h1> Last Name</h1>
          <input
                type="text"
                value={lastname}
                id="email_id2"
                className="form-control buyer_popup_field"
                onChange={event => buyer_lastname(event)}
              />
        </div>



        <div class="border112_set border112_set_ex12">
          <h1>Email</h1>
          <input
                type="text"
                value={email}
                id="email_id2"
                className="form-control buyer_popup_field"
                onChange={event => buyer_email(event.target.value)}
              />
        </div>
        {header_err5 == true ? (
            <div className="update_err_email">
              <p> <span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Enter valid email id</p>
            </div>
          ) : (
            <p></p>
          )}
          {set_err1 == true?
          
          <div className="update_err_email_set1">
          <p> <span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Check all fields</p>
        </div>
   
       : <p></p>
      
        
        }


{set_err2 == true?
          
          <div className="update_err_email_set1">
          <p> <span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Check all fields</p>
        </div>
   
       : <p></p>
      
        
        }

</Col>
<Col xs={12} sm={12} md={6} lg={1}>

</Col>
<Col xs={12} sm={12} md={6} lg={3}>
<div class="border112_set border112_set_ex">
          <h1> Company</h1>
          <input
                type="text"
                value={company}
                id="email_id2"
                className="form-control buyer_popup_field"
                onChange={event => buyer_company(event)}
              />
        </div>

        {/* <div class="border112_set border112_set_ex12">
          <h1>Phone</h1>
            <select
                              className="select_top_signup select_top_signup_buy"
                              value={code}
                              onChange={event => {
                                setcode(event.target.value);
                              }}
                            >
                              {cca.length > 0 &&
                                cca.map((item, idx) => (
                                  <option value={item.value}>
                                    {item.label}
                                  </option>
                                ))}
                            </select>
          <input
                type="text"
                value={phone}
                id="email_id2"
                className="form-control buyer_popup_field"
                onChange={event => buyer_contact(event)}
              />
        </div> */}

        
<div className="forgot_cls_signup forgot_cls_signup_buy">
                          <InputGroup>
                            <select
                              className="select_top_signup select_top_signup_buy"
                              value={code}
                              onChange={event => {
                                setcode(event.target.value);
                              }}
                            >
                         {cca.length > 0 &&
                                cca.map((item, idx) => (
                                  <option value={item.value}>
                                    {item.label}
                                  </option>
                                ))}
                            </select>
                            <div class="border112_set border112_set_ex md-form md-outline signin_phone signin_phone_buy signin_fname_border1_set_ex12">
          <h1> Phone</h1>
          <input
                type="text"
                value={phone}
                id="email_id2"
                className="form-control buyer_popup_field"
                onChange={event => buyer_contact(event)}
              />
        </div>



                            {/* <div class="md-form md-outline signin_phone signin_phone_buy signin_fname_border1_set">
                              <input
                                type="text"
                                id="email_id002a"
                                className="form-control buyer_popup_field"
                                value={phone}
                                onChange={event => buyer_contact(event)}
                              />
                              <label className="signup_fname_label" for="ph_id">
                                Phone
                              </label>
                            </div> */}
                          </InputGroup>
                        </div>








        {set_err3 == true?
          
          <div className="update_err_email_set1">
          <p> <span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span> Enter valid phone number</p>
        </div>
   
       : <p></p>
      
        
        }

</Col>
<Col xs={12} sm={12} md={6} lg={2}>

</Col>
<Col xs={12} sm={12} md={6} lg={2}>

</Col>




</Row>
<div className="buttonclass_head_set">
            <button
             
              onClick={event => {
                var flag = 1;
                if (flag == 1) if (firstname == "") flag = 0;
                if (lastname == "") flag = 0;
                if (email == "") flag = 0;
                if (company == "") flag = 0;
                if (phone == "") flag = 0;
               
                
                if(checkEmail(email) == false){
                  flag=0  
                }  
               
                if(phone.length<10 ){
                  flag=0
                }
                 if (flag == 0) {
                   
                  //  alert("enter valid phone number")
                    if(!checkEmail(email)) 
                    setSet_err1(true)
                    // alert("enter valid email address11")
                    setSet_err2(true)
                  // alert("Check all fields")
                  setupdateerr(true);
                }
                if (flag == 1) {
                  // ANCHOR profile update function
                  updateProfile(event);
                }
              }}
              id="button_id_head"
            >
              {" "}
              Update Personal Details
            </button>

              <button
                
                
                className="pay_pub_acc1"
                onClick={() => {
                                    subcribemodal();
                                  }}>UnSubcribe</button>
          </div>


  </div>





       
          
           
          <div className="">
           
          <Modal
        show={success_alert}
       style={{marginTop:"17%"}}
        
      >
        <div style={{height:60,textAlign:"center",padding:"2rem"}} >
          <div style={{marginTop:20}}><p style={{fontSize:16,color:"#484393",fontWeight:"500"}}>{success_alertText}</p> </div><div id="close_img11"  onClick={() => setsuccess_alert(false)}><IoIosClose /></div>
        </div>
        
        <div className="mail_invt_textcs" ></div>
      </Modal>

      <Modal
        show={unsubcribealert}
       style={{marginTop:"17%"}}
        
      >
        <div style={{height:60,textAlign:"center",padding:"2rem"}} >
          <div style={{marginTop:20}}><p style={{fontSize:16,color:"#484393",fontWeight:"500"}}>{unsubcribetext}</p> </div><div id="close_img11"  onClick={() => setunsubcribealert(false)}><IoIosClose /></div>
        </div>
        
        <div className="mail_invt_textcs" ></div>
      </Modal>











      <div>

      <div className="sett1_box sett1_box_mg">

          <Row>

          {/* <Col xs={12} sm={12} md={6} lg={1}>
            </Col> */}
<Col xs={12} sm={12} md={6} lg={6}>

<div className="personal_heading1_change">
            <p>Change Password</p>
          </div>
          <div class="md-form md-outline header_oldpass">
            
            <div class="border112_set">
          <h1> Enter Password</h1>
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
        </div>
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



            <div class="md-form md-outline enter_new_pass">
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
            {password_match == true?
(
  <div className="change_valid">
    <p><span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Passwords Dont match</p>
  </div>
) : (
  <p></p>
)
          }

            <div class="md-form md-outline reenter_ouline">
              <input
                type={seeNewPass2}
                value={pass2}
                id="email_id002a"
                className="form-control buyer_popup_field"
                onChange={e => {
                  setpass2(e.target.value);
                  setvalidemptyfields(false);
                  setpswdsame(false);
                }}
              />
              <label className="input_text_buyer" for="email_id002a">
                Re-type New Password
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
            <div className="change_valid123">
              <p><span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Enter Valid Data</p>
            </div>
          ) : (
            <p></p>
          )}
<div className="change_buttonclass_pass">
            <button
              onClick={() => {
                //ANCHOR UPDATE PASSWORD FUNC
                //ANCHOR GET THIS S**T
                changePassword1();
              }}
              id="change_button_id12"
            >
              {" "}
              Update Password Settings
            </button>
         

</div>




  </Col>

  <Col xs={12} sm={12} md={6} lg={6}>

<div>

<div className="personal_heading1">
            <p>Configuration</p>
          </div>
          <Row>
          <p className="custom_logo_set">Upload Custom Logo</p>
         {/* <p>the pic size should be 60px X 200px(height X width)</p> */}
          <form class="js" action="#">
  <div class="input-file-container">  
    <input onChange={e => handleChangecuFile(e.target.files[0])} class="input-file" id="my-file" type="file"/>
    <label tabindex="0" for="my-file" class="input-file-trigger">Choose File</label>
  </div>
  <p class="file-return"></p>
</form>
</Row>


<Row>
          <p className="custom_logo_set11">Change Time Zone</p>
          <select
                      className="select_top_signup_set"
                      value={time}
                      onChange={event => {
                        setTime(event.target.value);
                        
                      }}
                    >
                      {timezones.length > 0 &&
                    timezones.map((item, idx) => (
                      <option value={item.value}>{item.label}</option>
                    ))}
                </select>
         
</Row>
<div>
<p className="custom_logo_set112">Email Notification Settings</p>
</div>

<div className="tog_set_div">
<Row>
{active1 == true ? (
            
            <div className="active_green_set">Active</div>
         
        ) : (
          
            
            <div className="active_red_set">Inactive</div>
          
        )}
<ToggleButton
className="togg_set"
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
          
       
           
        </Row>
        </div>

        <div className="change_buttonclass_pass_x">
            <button
             onClick={()=>{
              const mydata1=Object.assign({},{
                "active":mydata.active,
                "company":mydata.company,
                "email":mydata.email,
                "firstname":mydata.firstname,
                "lastname":mydata.lastname,
                "middlename":mydata.middlename,
                "phone":mydata.phone
        
              })
              const data =Object.assign({},mydata1,{
                email_notifications:active1==true?1:0,
                payment_type:""+payment+"",
                time_zone:time,
                payment_gateway_api_key:accesskey,
                payment_gateway_secret_key:secretkey
              })
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
                  
                 alert("settings are updated");
                 
                })
                .catch(error => {
                  console.log("error failed")
                  if (error.message == "Network Error") {
                    alert("Network Error \n Please Try Again later");
                  } else {
                   
                    alert(error.response.data.error.message);
                  }
        
                 
                });
          
            }}
              id="change_button_id12_confg"
            >
              {" "}
              Update Configuration Settings
            </button>
          </div>
</div>


       
       <Modal
        show={submodal}
        style={customStyles01}
                        
                      >
                         <div
                          className="close_img_div"
                          onClick={() => closesubmodale()}
                        >
                          <IoIosClose />
                        </div>
                        <div>
                          
                       <p className="UnSubcribe_text">UnSubcribe</p>
                        <p className="UnSubcribe_text1">Your plan</p>
                        <div className="set_paln_row">
                        <Row>
                        <p> Plan name:</p>
                        <h6>{planname}</h6>
                        </Row>
                        <Row>
                        <p> Plan Describe:</p>
                        <h6>{plandesc}</h6>
                        </Row>
                        <Row>
                        <p> Plan Amount:</p>
                        <h6>{planamount}</h6>
                        </Row>
                        </div>
                        
                        <button className="unsub_butt" onClick={()=>{unsubcribe(subid,subcancel,unsubcribeenddate);}}>UnSubcribe</button>
                        <p className="warning_settings"><span><IoIosWarning/></span> This action can not be undone. The subscription will move to cancelled state.
        Canceelation will be done at end of the current billing</p>
                        </div>

                      </Modal>
       
</Col>

  </Row>
          </div>


        <Row>
<Col xs={12} sm={12} md={6} lg={6}>







           
       
  </Col>


    {/* <Button onClick={()=>{
      setShowPayPub(true)
    }}>Pay the Publisher</Button> */}
    
    {/* no api by prudhvi //ANCHOR */}
    {/* {showPayPub && */}
     <Modal
     show={showPayPub}
                    id="main_modal"
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header id="modal_head">
                        <div id="close_img2" onClick={()=>{
                          setShowPayPub(false)
                        }
                          }>
                        <IoIosClose />
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <p>{props.user.email}</p> */}
                          <input placeholder="Enter the amount to be payed"></input>
                          

 <select defaultValue={selectedPublisher} 
 onChange={(e)=>{
   
   setSelectedPublisherId(e.target.value)
   for(let i=0;i<pubList.length;i++){
    let myid=e.target.value;
    if(pubList[i]["id"]==myid){
      console.log(pubList[i],"tada")
setSelectedPublisher(pubList[i]["firstname"]+" "+pubList[i]["lastname"])
console.log(pubList[i]["firstname"]+" "+pubList[i]["lastname"]+"  name")
    }
   }
   console.log(e.target.value,"id")
  }} 
 >
    
    {pubList && pubList.map((ele,index)=>(
      
      <option id={ele.id} name={ele.id} label={ele.firstname+""+ele.lastname} value={ele.id}></option>
      )
      )
      
    }
  
    </select>
  
        <Button>Pay</Button>
                    </Modal.Body>
                </Modal>

</Row>


        </div>
     
            </div>
        

          
          </div>
      
      
      :<div></div>
        }
        </div>



      
</div>
    </div>
  );
}

function Change_Password(props) {
  const [email1, setEmail1] = useState("");
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
    setEmail1(localStorage.getItem("email"));
  }, []);

  const changePassword1 = str => {
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
            email1: email1,
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
              alert("Password updated successfully");
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
            <div className="change_valid123">
              <p><span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Enter Valid Data</p>
            </div>
          ) : (
            <p></p>
          )}


          <div className="change_buttonclass">
            <button
              onClick={() => {
                changePassword1();
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