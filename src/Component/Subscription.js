import React, { Component, useEffect, useState } from "react";
import { API_URL ,logoutidle} from '../AppConfig'

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet";
import moment from "moment";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { clone } from "@babel/types";
import { IoIosLogOut } from "react-icons/io";

const Subscription = () => {
  const [plans, setPlans] = useState([]);
  const [d,setD] = useState(localStorage.getItem("user_id"));
  const[ecamt,setecamt]=useState(0)
  const[bcamt,setbcamt]=useState(0)

  const[couponcode,setcouponcode]=useState("")
  const[businesscouponcode,setbusinesscouponcode]=useState("")

  const[businesscouponstatus,setbusinesscouponstatus]=useState();

  const[couponstatus,setcouponstatus]=useState();
  //localStorage.getItem("couponamt")
 //let amount=
 ////console.log("amount",amount);
  const leadspayment = data => {
    const userinformation = JSON.parse(localStorage.getItem("userinfo"));
    const RAZOR_KEY = "rzp_live_DV1CZKqYESincz";
    const PAY_URL = API_URL+"/payment/";
    const subId = data.id;
    const name = userinformation.firstname + " " + userinformation.lastname;
    const email = userinformation.email;
    const phone = userinformation.phonenumber;
    const qs = `key=${RAZOR_KEY}&subId=${subId}&name=${name}&email=${email}&phone=${phone}`;
    const url = `${PAY_URL}/subscribe?${qs}`;
    // localStorage.clear()
    window.open(url, "_self");
    
    
  };



  const subscribe = async (id,amt) => {
    let camt=0
    if(bcamt==0){
     camt=ecamt
    }
    else{
         camt=bcamt
    }
    let click_id=localStorage.getItem("click_id");
   // let clickid=params.clickid;
  

    try {
     
      
      const response = await axios(
        API_URL+"/payment/create-subscription",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
          },
          data: {
            user_id: parseInt(localStorage.getItem("user_id")),
            plan_id: id,
           amount:amt-camt,
           coupon_code:couponcode,
          coupon_amount:camt,
          plan_amount:(id==2?299:99),
          clickid: click_id==""?"":click_id

          }
        }
      );
      //alert(response.data.data);

      leadspayment(response.data.data);

      // history.push("/campaigns");
    } catch (err) {
      // send to custom analytics server
      ////console.log("Error After Subscription", err);
      throw err;
    }
  };

  function applycoupon(a){
    const data = {
      plan_id:a,
      coupon_code:couponcode
    };
    //////console.log("cad",data)
    const config = {
      url: API_URL+"/user/apply-coupon",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        if (response.status == 200) {
        ////console.log("campresponse", response.data.data.coupon_amount);
         setecamt(response.data.data.coupon_amount)
         setcouponstatus(response.data.data.status)
        }
      })
      .catch(error => {
        alert("Invalid coupon");
        //////console.log("Get Campaigns Error", error.response);
      });

  }
  function applybusinesscoupon(a){
    const data = {
      plan_id:a,
      coupon_code:businesscouponcode 
    };
    //////console.log("cad",data)
    const config = {
      url: API_URL+"/user/apply-coupon",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        if (response.status == 200) {
        ////console.log("campresponse", response.data.data.coupon_amount);
         setbcamt(response.data.data.coupon_amount)
         setbusinesscouponstatus(response.data.data.status)
        }
      })
      .catch(error => {
        alert("Invalid coupon");
        //////console.log("Get Campaigns Error", error.response);
      });

  }

  useEffect(() => {
    document.title="Subscription  - LeadsWatch"
    const getdata = () => {
      const config = {
        url: API_URL+"/user/plans-list",
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };

      axios(config)
        .then(response => {
          setPlans(response.data.data);
        
          ////console.log("response publishers", response);
        })
        .catch(error => {
          ////console.log(error);
        });
    };
    getdata();
    const config1 = {
      url:
        API_URL+`/user/detail/${d}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };

    axios(config1)
      .then(response => {
        let userinfo = {
          firstname: response.data.data.firstname,
          lastname: response.data.data.lastname,
          email: response.data.data.email,
          phonenumber: response.data.data.phone
        };
        localStorage.setItem("userinfo", JSON.stringify(userinfo));
      })
      .catch(error => {
        ////console.log(error);
      });
  }, []);

  const handlecoupon=(cc)=>{
    if(couponstatus==true){
alert("Coupon already used")
    }
    else{
      setcouponcode(cc)
    }
   
  }
  const handlebusinesscoupon=(cc)=>{
    if(businesscouponstatus==true){
alert("Coupon already used")
    }
    else{
      setbusinesscouponcode(cc)
    }
   
  }
  var history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload(true);
  };

  return (
    <div>
      <Helmet>
  <title>Subscription - LeadsWatch</title>
</Helmet>
      <Container>
        <div>
          <Link onClick={()=>{logout()}}>Logout</Link>
        </div>
      <Row>
        <div className="sub_div">
    {plans.map(plansitem=>(
      <div className="sub_one">
        {/* <h4>Subscription</h4> */}
        <div className="sub_div_inner">
          <div className="logo_sub">

            <img
              className="sub_leads_logo"
              src={require("./images/LeadsWatch_Logo.svg")}
            />

                  
          </div>
<div>
        
        <p>Subscription:{" "} {plansitem.name}</p>
      
    <p>Amount:{" "}${plansitem.amount}
    
    
    
    {plansitem.amount==plans[0].amount?" ($100 off) ":" ($200 off)"

    }
    </p>
  
{plansitem.id==2?(
  <div>
   
  <div class="md-form md-outline subscribe_label coupon_in">
                         <input
                           type="text"
                           id="couponCode"
                           class="form-control"
                           value={couponcode}
                           onChange={event => handlecoupon(event.target.value)}
                         />
                         <label for="couponCode">Coupon Code </label>
  </div>

                       <div className="applycoupon_btn">
                         <button onClick={() => applycoupon(plansitem.id)} >Apply Coupon </button>
                       </div> 
                         {couponstatus==true && 
                         <p className="discount_text">You Saved $50</p>}
<br/>
<div  className="sub_total">
<p>Total after discount: {" "}${plansitem.discount_amount-ecamt}</p>
</div>
</div>

):(
  <div>
     <div class="md-form md-outline subscribe_label">
                            <input
                              type="text"
                              id="form1"
                              class="form-control"
                              value={businesscouponcode}
                              onChange={event => handlebusinesscoupon(event.target.value)}
                            />
                            <label for="form1">Coupon Code </label>
                          </div>
   
                          <div className="applycoupon_btn">
                            <button onClick={() => applybusinesscoupon(plansitem.id)} >Apply Coupon </button>
                          </div> 
                            {businesscouponstatus==true && 
                            <p className="discount_text">You Saved $25</p>}
<br/>
<div  className="sub_total">
<p>Total After Discount:{" "}${plansitem.discount_amount-bcamt}</p>
</div>

  </div>

)}
  

<div className="sub_btn">


  
<button onClick={() => subscribe(plansitem.id,plansitem.discount_amount)}
            >
      Continue
              </button>
              </div>
              </div>
        </div>
        </div>
      
    ))}
    
    </div>
    
  </Row>
      </Container>
    </div>
  );
};

export default Subscription;
