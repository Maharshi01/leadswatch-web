import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL ,logoutidle} from '../AppConfig'


import { BrowserRouter, Route } from "react-router-dom";
import { Col, Row, Button, Modal, Image, Dropdown } from "react-bootstrap";
import { IoIosClose, IoMdLogOut, IoIosWarning } from "react-icons/io";
export default function Accounting(props) {
  const [buyer, setBuyer] = useState([]);
  const [buyerid, setBuyerId] = useState();
  const [buyerfields, setBuyerFields] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    company: ""
  });
  const [pubList, setPubList] = React.useState([]);
  const [buyeremail, setBuyerEmail] = useState();
  const [buyeramount, setBuyerAmount] = useState();
  const [selectedbuyerid, setSelectedBuyerId] = useState();
  const [payment, setPayment] = useState("2");
  const [showPayPub, setShowPayPub] = React.useState(false);
  const [accesskey, setAccessKey] = useState("");
  const [secretkey, setSecretKey] = useState("");
  const [seeNewPass, setSeeNewPass] = useState("password");
  const [profile_cardexpiry, setProfileCardExpiry] = useState();
  const [planname, setplanname] = useState();
  const [createmsg, setCreateMsg] = useState(false);
  const [buy_fname, setbuy_fname] = useState(false);
  const [active1, setActive] = useState(false);
  const [plandesc, setplandesc] = useState();
  const [profile_cardnumber, setProfileCardNumber] = useState();
  const [profile_cardcvv, setProfileCvv] = useState();
  const [mydata, setData] = React.useState({});
  const [time, setTime] = useState("GMT");
  const [planamount, setplanamout] = useState();
  const [subid, setsubid] = useState();
  const [subcancel, setsubcancel] = useState();
  const [submodal, setsubmodal] = useState(false);
  const [lead_butt1, setlead_butt1] = useState(true);
  const [lead_butt2, setlead_butt2] = useState(false);
  const [personalDetails, setpersonalDetails] = useState(true);
  const [lead_butt3, setlead_butt3] = useState(false);
  const [teamMemb, setteamMemb] = useState(false);
  const [PayDetails, setPayDetails] = useState(false);
  const [unsubcribeenddate, setunsubcribeenddate] = useState();
  const [selectedPublisher, setSelectedPublisher] = React.useState(
    "Select a Publisher"
  );
  const [selectedPublisherId, setSelectedPublisherId] = React.useState(
    "Select a Publisher"
  );
  const [unsubcribealert, setunsubcribealert] = useState(false);
  const [unsubcribetext, setunsubcribetext] = useState("");
  const [publistpayment, setPubListpayment] = useState({});
  const [next, setNext] = useState(null);
  const [listData, setListData] = useState({});
  const [showLoad, setShowLoad] = useState(false);
  const [paypubamount, setPayPubAmount] = useState(0);
  const [selectedPubEmail, setSelectedPubEmail] = useState("");
  const [paymentresponse, setPaymentResponse] = useState();

  const customStyles01 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "37%"
    }
  };
  function closesubmodale() {
    setsubmodal(false);
  }
  useEffect(() => {
    var url = window.location.href;
    ////console.log(url,"url")
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    setPaymentResponse(params.response);
    if (params.response) alert(`Payment Status ${params.response}`);
    console.log("Params in Url", params);
    var a = 10;
    const getPubList = (limit = a) => {
      const data = {
        page: 1,
        limit: limit,
        search: "",
        filters: {},
        sortby: {
          ["created"]: 1
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
          console.log(response, "publisher list response");
          ////console.log(response.data.data, "publishers list");
          if (a !== response.data.data.total_count) {
            a = response.data.data.total_count;
            getPubList((limit = response.data.data.total_count));
          }
          // setTotalpages(response.data.data.total_pages);
          // setLimit(response.data.data.per_page);
          if (response.data.data.next_page !== null) setShowLoad(true);
          else setShowLoad(false);
          setPubListpayment(response.data.data.list);
          setSelectedPubEmail(response.data.data.list[0]["email"]);
          setSelectedPublisherId(response.data.data.list[0]["id"]);
          console.log("email", response.data.data.list[0]["email"]);
          // setPrev(response.data.data.prev_page);
          setNext(response.data.data.next_page);
          // setCurrentPage(response.data.data.page);
        })
        .catch(error => {
          if (error.message == "Network Error") {
            alert("Network Error \n Please Try Again later");
          } else if (
            error.response.data.error.message ===
            "Your account had been deactivated"
          ) {
            alert("error :" + error.response.data.error.message);
          } else {
            alert("error :" + error.response.data.error.message);
          }
        });
    };
    getPubList();
    var b = 10;
    const getBuyerList = (limit = b) => {
      const data = {
        limit: limit,
        page: 1,
        search: "",
        filters: {
          status: [],
          buyer_id: []
        },
        sortby: { created: 1 }
      };
      const config = {
        url: API_URL+"/buyer/list",
        data: data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          setBuyer(response.data.data.list);
          if (b != response.data.data.total_count) {
            b = response.data.data.total_count;
            getBuyerList((limit = response.data.data.total_count));
          }

          console.log("Buyerresponsee", response);
        })
        // Error handling
        .catch(error => {
          alert(error.message);
        });
    };
    getBuyerList();
  }, []);
  const getPubList = () => {
    if (next !== null) {
      const data = {
        page: 1,
        limit: 10,
        search: "",
        filters: {},
        sortby: {
          ["created"]: 1
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
         
          let tempholder = response.data.data.list;
          let tempobj = { ...publistpayment, ...tempholder };
          setPubListpayment(tempobj);
          if (response.data.data.next_page !== null) setShowLoad(true);
          else setShowLoad(false);
          // setPrev(response.data.data.prev_page);
          setNext(response.data.data.next_page);
          // setCurrentPage(response.data.data.page);
        })
        .catch(error => {
          if (error.message == "Network Error") {
            alert("Network Error \n Please Try Again later");
          } else if (
            error.response.data.error.message ===
            "Your account had been deactivated"
          ) {
            alert("error :" + error.response.data.error.message);
          } else {
            alert("error :" + error.response.data.error.message);
          }
        });
    } else {
      setShowLoad(false);
    }
  };
  useEffect(() => {
    const data = {
      limit: 100,
      page: 1,
      search: "",
      filters: {
        status: [],
        buyer_id: []
      },
      sortby: { created: -1 }
    };
    const config = {
      url: API_URL+"/buyer/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        setBuyer(response.data.data.list);
        console.log("Buyerresponsee", response);
      })
      // Error handling
      .catch(error => {
        alert(error.message);
      });
  }, []);
  useEffect(() => {
    //ANCHOR USER DETAILS FETCH
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
          console.log("userdata", response.data.data);
          setListData(response.data.data);
          setPayment(response.data.data.payment_type);
          setAccessKey(response.data.data.payment_gateway_api_key);
          setSecretKey(response.data.data.payment_gateway_secret_key);
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
  const savePayment = () => {
    const data = {
      firstname: buyerfields.firstname,
      middlename: "",
      lastname: buyerfields.lastname,
      phone: buyerfields.phone,
      email: buyerfields.email,
      company: buyerfields.company,
      card_number: profile_cardnumber,
      card_cvv: profile_cardcvv,
      card_expirydate: profile_cardexpiry,
      card_name: "",
      active: 1
    };
    console.log("Buyerdata", data);
    const config = {
      url: API_URL+`/buyer/update/${buyerid}`, //post Url
      data: data, //data to be posted
      method: "put",
      headers: {
        //headers
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        console.log("Response after submitting Card", response);
      })
      .catch(error => {
        // Error Message
        console.log("Card Error", error.sqlMessage);
      });
  };
  const unsubcribe = async (a, b, c) => {
    let userid = localStorage.getItem("user_id");
    if (b == null) {
      const data = {
        user_id: userid,
        razorpay_subscription_id: a,
        cancel_date: c
      };
      console.log("cs", data);
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
          setsubmodal(false);
          setunsubcribealert(true);
          setunsubcribetext("Sucessfully Unsubscribed");
        })
        .catch(error => {
          console.log("error", error);
          alert(
            "Sorry for Inconvince There is problem from our side try again late "
          );
        });
    } else {
      alert("You have already canceled your subcription");
    }
  };
  function subcribemodal() {
    setsubmodal(true);
  }
  return (
    <div className="body_inner_set">
      <div className="page_heading">
       
        <div className="page_heading_name">Accounting</div>
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
              Payment Gateway
            </button>
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
              Buyer Cards
            </button>
            <button
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
              Pay Publisher
            </button>
          </div>
        </div>

        {lead_butt3 == true && (
          <div className="team1_box ">
            <div className="personal_heading">
              <p>Publisher Payments</p>
            </div>
            <div className="team1_box_row">
              {/* <div className="pub_id_form_div"> */}
              <div class="border112 border112_width">
                <h1>Enter amount </h1>
                <input
                  value={paypubamount}
                  id="email_id002a"
                  className="form-control buyer_popup_field"
                  onChange={e => {
                    setPayPubAmount(e.target.value);
                  }}
                />
              </div>

              <select
                defaultValue={selectedPublisher}
                className="pub_select_acc"
                onChange={e => {
                  setSelectedPublisherId(e.target.value);
                  for (let i = 0; i < publistpayment.length; i++) {
                    let myid = e.target.value;
                    if (publistpayment[i]["id"] == myid) {
                      console.log(publistpayment[i], "tada");
                      setSelectedPublisher(
                        publistpayment[i]["firstname"] +
                          " " +
                          publistpayment[i]["lastname"]
                      );
                      setSelectedPubEmail(publistpayment[i]["email"]);
                      console.log(
                        publistpayment[i]["firstname"] +
                          " " +
                          publistpayment[i]["lastname"] +
                          "  name"
                      );
                    }
                  }
                  console.log(e.target.value, "id");
                }}
              >
                {publistpayment &&
                  publistpayment.map((ele, index) => (
                    <option
                      id={ele.id}
                      name={ele.id}
                      label={ele.firstname + "" + ele.lastname}
                      
                      value={ele.id}
                    ></option>
                  ))}
                {/* <button onClick={()=>getPubList()}>Load More </button> */}
              </select>

              <button
                onClick={() => {
                  if (
                    publistpayment[selectedPublisherId][
                      "payment_gateway_api_key"
                    ] != null &&
                    publistpayment[selectedPublisherId][
                      "payment_gateway_secret_key"
                    ] != null
                  )
                    window.open(
                      API_URL+`/payment/do-payment?email=${selectedPubEmail}&amount=${paypubamount}&public_key=${publistpayment[selectedPublisherId]["payment_gateway_api_key"]}&secret_key=${publistpayment[selectedPublisherId]["payment_gateway_secret_key"]}`,
                      "_self"
                    );
                  else alert("Publisher did not enter his payment details");
                }}
                className="pay_acc"
              >
                Pay
              </button>
            </div>
          </div>
        )}

        {lead_butt2 == true && (
          <div className="buy_contact_box">
            <Row>
              {localStorage.getItem("createprofile") != 1 && (
                <div className="align_acc">
                  <div className="personal_heading1">
                    <p>Payment Details</p>
                  </div>
                  <div className="header_div12 Payment_Details_div">
                    <div>
                      <select
                        className="select_accc"
                        onChange={e => {
                          console.log("Buyer selected", buyer[e.target.value]);
                          setBuyerId(buyer[e.target.value].id);
                          let temp = Object.assign({}, buyerfields, {
                            firstname: buyer[e.target.value].firstname,
                            lastname: buyer[e.target.value].lastname,
                            email: buyer[e.target.value].email,
                            company: buyer[e.target.value].company,
                            phone: buyer[e.target.value].phone
                          });
                          setBuyerFields(temp);
                        }}
                      >
                        {buyer &&
                          buyer.map((item, a) => (
                            // <option>Select Buyer</option>
                            <option value={a}>{item.firstname}</option>
                          ))}
                      </select>
                    </div>
                    <div id="change_form2_class_width">
                      <div class="border112">
                        <h1>Card Number</h1>
                        <input
                          type="text"
                          className="form-control buyer_popup_field"
                          name="url"
                          // placeholder="Card Number"
                          value={profile_cardnumber}
                          id="email_id002a_12"
                          class="form-control"
                          onChange={event =>
                            setProfileCardNumber(event.target.value)
                          }
                        />
                      </div>

                      {createmsg ? (
                        <div className="email_err">
                          <p>{createmsg}</p>
                        </div>
                      ) : (
                        <p></p>
                      )}

                      {buy_fname == true ? (
                        <div className="create_byer_form_err_buy_card">
                          <p>
                            <span>
                              
                              <i
                                class="fa fa-exclamation-circle circle_err"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Card Number
                          </p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <div id="change_form2_class_width">
                      <div class="border112">
                        <h1>CVV</h1>
                        <input
                          type="text"
                          className="form-control buyer_popup_field"
                          name="url"
                          // placeholder="Card Number"

                          id="email_id002a_12"
                          class="form-control"
                          value={profile_cardcvv}
                          onChange={event => setProfileCvv(event.target.value)}
                        />
                      </div>

                      {buy_fname == true ? (
                        <div className="create_byer_form_err_buy_card">
                          <p>
                            <span>
                             
                              <i
                                class="fa fa-exclamation-circle circle_err"
                                aria-hidden="true"
                              ></i>
                            </span>
                            CVV
                          </p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>

                    <div id="change_form2_class_width">
                      <div class="border112">
                        <h1> Expiry Date</h1>
                        <input
                          type="text"
                          className="form-control buyer_popup_field"
                          name="url"
                          // placeholder="Card Number"

                          id="email_id002a_12"
                          class="form-control"
                          value={profile_cardexpiry}
                          onChange={event =>
                            setProfileCardExpiry(event.target.value)
                          }
                        />
                      </div>
                      {buy_fname == true ? (
                        <div className="create_byer_form_err_buy_card1">
                          <p>
                            <span>
                           
                              <i
                                class="fa fa-exclamation-circle circle_err"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Expiry
                          </p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {localStorage.getItem("createprofile") == 1 && (
                <div className="">
                  <div className="personal_heading1">
                    <p>Payment Details</p>
                  </div>
                  <div className="header_div12 Payment_Details_div">
                    <div id="change_form2_class">
                      <div>
                        <select
                          className="Payment_Details_select"
                          onChange={e => {
                            console.log(
                              "Buyer selected",
                              buyer[e.target.value]
                            );
                            let temp = Object.assign({}, buyerfields, {
                              firstname: buyer[e.target.value].firstname,
                              lastname: buyer[e.target.value].lastname,
                              email: buyer[e.target.value].email,
                              company: buyer[e.target.value].company,
                              phone: buyer[e.target.value].phone
                            });
                            setBuyerFields(temp);
                          }}
                        >
                          {buyer &&
                            buyer.map((item, a) => (
                              <option value={a}>{item.firstname}</option>
                            ))}
                        </select>
                      </div>

                      <div class="md-form md-outline outline_b_c">
                        <input
                          value={profile_cardnumber}
                          type="text"
                          onChange={event =>
                            setProfileCardNumber(event.target.value)
                          }
                          id="email_id002a"
                          className="form-control buyer_popup_field"
                        />
                        <label className="input_text_buyer" for="email_id002a">
                          Card Number
                        </label>
                      </div>
                      {buy_fname == true ? (
                        <div className="create_byer_form_err_buy_card">
                          <p>
                            <span>
                              {" "}
                              <i
                                class="fa fa-exclamation-circle circle_err"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Card Number
                          </p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <div id="change_form2_class">
                      <div class="md-form md-outline outline_b_c">
                        <input
                          value={profile_cardcvv}
                          onChange={event => setProfileCvv(event.target.value)}
                          type="text"
                          id="email_id002a"
                          className="form-control buyer_popup_field"
                        />
                        <label className="input_text_buyer" for="email_id002a">
                          cvv
                        </label>
                      </div>

                      {buy_fname == true ? (
                        <div className="create_byer_form_err_buy_card">
                          <p>
                            <span>
                              {" "}
                              <i
                                class="fa fa-exclamation-circle circle_err"
                                aria-hidden="true"
                              ></i>
                            </span>
                            CVV
                          </p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>

                    <div id="change_form3_class">
                      <div class="md-form md-outline outline_b_c">
                        <input
                          type="text"
                          value={profile_cardexpiry}
                          onChange={event =>
                            setProfileCardExpiry(event.target.value)
                          }
                          id="email_id1003a"
                          className="form-control buyer_popup_field"
                        />
                        <label className="input_text_buyer" for="email_id1003a">
                          Expiry Date
                        </label>
                      </div>
                      {buy_fname == true ? (
                        <div className="create_byer_form_err_buy_card1">
                          <p>
                            <span>
                              {" "}
                              <i
                                class="fa fa-exclamation-circle circle_err"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Expiry
                          </p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <Col xs={12} sm={12} md={6} lg={6}></Col>
            </Row>

            <div className="change_buttonclass">
              <button
                onClick={() => {
                  savePayment();
                }}
                to={"/buyers"}
                id="change_button_id12_buy"
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
        )}

        {lead_butt1 == true && (
          <div>
            <div className="set_height">
              <div className="team1_box">
                <div className="personal_heading">
                  <p>Payment Settings</p>
                </div>

                <Row>
                  <Col>
                    <p className="custom_logo_set12">
                      Configure your payment Settings
                    </p>
                    <select
                      className="select_top_signup_set12"
                      value={
                        payment != null
                          ? payment == "1"
                            ? "RazorPay"
                            : "Stripe"
                          : "Select"
                      }
                      onChange={event => {
                        if (event.target.value == "Select") {
                          setPayment(null);
                        } else
                          setPayment(event.target.value == "RazorPay" ? 1 : 2);
                      }}
                    >
                      <option value={"Select"}>Select</option>
                      {/* <option value={"RazorPay"}>RazorPay</option> */}
                      <option value={"Stripe"}>Stripe</option>
                    </select>
                  </Col>
                  <Col>
                    <p className="custom_logo_set12_select">
                      {payment == null
                        ? "Select Payment Method"
                        : payment == "1"
                        ? "Current Method: Razor Pay"
                        : payment == "2"
                        ? "Current Method: Stripe"
                        : "Select Payment Method"}
                    </p>
                    <div className="api_row">
                      {/* <p className="api_key12">API Key</p> */}

                      <div class="border112 enter_new_pass_team">
                        <h1>API key</h1>
                        <input
                          type={seeNewPass}
                          name="url"
                          // placeholder="First Name"
                          value={accesskey}
                          id="FirstName"
                          class="form-control"
                          onChange={e => {
                            setAccessKey(e.target.value);
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
                          onChange={e => {
                            setSecretKey(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="set_butt_up">
                  <Button
                    className="butt_up_set12"
                    onClick={() => {
                      //ANCHOR PAYMENT CLICK
                      const data = Object.assign({}, listData, {
                        payment_type: "" + payment + "",
                        payment_gateway_api_key: accesskey,
                        payment_gateway_secret_key: secretkey
                      });
                      const config = {
                        url: API_URL+`/user/update/${localStorage.getItem(
                          "user_id"
                        )}`,

                        data: data,
                        method: "put",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization:
                            "Bearer " + localStorage.getItem("access_token")
                        }
                      };
                      axios(config)
                        .then(response => {
                          alert("Your account settings has been updated");
                        })
                        .catch(error => {
                          console.log("error failed");
                          if (error.message == "Network Error") {
                            alert("Network Error \n Please Try Again later");
                          } else {
                            alert(error.response.data.error.message);
                          }
                        });
                    }}
                  >
                    Update
                  </Button>
                </div>
              </div>

              <div className="team1_box">
                <div className="personal_heading">
                  <p>Get From Buyer</p>
                </div>

                <div className="team1_box_row">


                <div class="border112 enter_new_pass_team1 enter_new_pass_team2">
                        <h1>  Enter amount</h1>
                        <input
                         
                         id="email_id002a"
                         className="form-control buyer_popup_field"
                          class="form-control"
                          onChange={e => {
                            setBuyerAmount(e.target.value);
                          }}
                        />
                      </div>




                  {/* <div class="md-form md-outline enter_new_pass_team1">
                    <input
                      id="email_id002a"
                      className="form-control buyer_popup_field"
                      onChange={e => {
                        setBuyerAmount(e.target.value);
                      }}
                    />
                    <label className="input_text_buyer" for="email_id002a">
                      Enter amount
                    </label>
                  </div> */}

                  <select
                    defaultValue={selectedbuyerid}
                    className="pub_select_acc"
                    onChange={e => {
                      setSelectedBuyerId(e.target.value);
                      setBuyerEmail(buyer[e.target.value].email);
                    }}
                  >
                    {buyer &&
                      buyer.map((ele, index) => (
                        <option
                          id={ele.id}
                          name={ele.id}
                          label={ele.firstname + "" + ele.lastname}
                          value={index}
                        ></option>
                      ))}
                  </select>

                  <button
                    className="pay_acc"
                    onClick={() => {
                      window.open(
                        API_URL+`/payment/do-payment?email=${buyeremail}&amount=${buyeramount}&type=buyer&public_key=${accesskey}&secret_key=${secretkey}`,
                        "_self"
                      );
                    }}
                  >
                    Pay
                  </button>
                  {/* <p>Your Payment is {paymentresponse}</p> */}
                </div>
              </div>
            </div>
          </div>
        )}

        <Modal
          show={showPayPub}
          id="main_modal"
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header id="modal_head">
            <div
              id="close_img2"
              onClick={() => {
                setShowPayPub(false);
              }}
            >
              <IoIosClose
                onClick={() => {
                  setShowPayPub(false);
                }}
              />
            </div>
          </Modal.Header>
          <Modal.Body>
            {/* <p>{props.user.email}</p> */}
            <input placeholder="Enter the amount to be payed"></input>

            <select
              defaultValue={selectedPublisher}
              onChange={e => {
                setSelectedPublisherId(e.target.value);
                for (let i = 0; i < pubList.length; i++) {
                  let myid = e.target.value;
                  if (pubList[i]["id"] == myid) {
                    console.log(pubList[i], "tada");
                    setSelectedPublisher(
                      pubList[i]["firstname"] + " " + pubList[i]["lastname"]
                    );
                    console.log(
                      pubList[i]["firstname"] +
                        " " +
                        pubList[i]["lastname"] +
                        "  name"
                    );
                  }
                }
                console.log(e.target.value, "id");
              }}
            >
              {pubList &&
                pubList.map((ele, index) => (
                  <option
                    id={ele.id}
                    name={ele.id}
                    label={ele.firstname + "" + ele.lastname}
                    value={ele.id}
                  ></option>
                ))}
            </select>

            <button>Pay</button>
          </Modal.Body>
        </Modal>
        <Modal show={unsubcribealert} style={{ marginTop: "17%" }}>
          <div style={{ height: 60, textAlign: "center", padding: "2rem" }}>
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 16, color: "#484393", fontWeight: "500" }}>
                {unsubcribetext}
              </p>{" "}
            </div>
            <div id="close_img11" onClick={() => setunsubcribealert(false)}>
              <IoIosClose />
            </div>
          </div>

          <div className="mail_invt_textcs"></div>
        </Modal>
        <Modal show={submodal} style={customStyles01}>
          <div className="close_img_div" onClick={() => closesubmodale()}>
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

            <button
              className="unsub_butt"
              onClick={() => {
                unsubcribe(subid, subcancel, unsubcribeenddate);
              }}
            >
              UnSubcribe
            </button>
            <p className="warning_settings">
              <span>
                <IoIosWarning />
              </span>{" "}
              This action can not be undone. The subscription will move to
              cancelled state. Canceelation will be done at end of the current
              billing
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
}
