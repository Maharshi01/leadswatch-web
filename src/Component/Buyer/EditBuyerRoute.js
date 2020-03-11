// Created By Uday
// On 29/10/2019
// last modified on 1/11/2019
// Page=Edit Buyer Route
import React, { useState, useEffect } from "react";
import { API_URL, logoutidle } from "../../AppConfig";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory
} from "react-router-dom";
import ToggleButton from "react-toggle-button";
import axios from "axios";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import Help from "../../Help";
import Close from "../../Close";
import Modal from "react-modal";
import {
  IoIosClose,
  IoIosArrowBack,
  IoMdInformationCircle
} from "react-icons/io";
import { FaPlusCircle, FaClone, FaCheck } from "react-icons/fa";
import { TiFilter } from "react-icons/ti";
const EditBuyerRoute = props => {
  var pfile = "";
  let history = useHistory();
  const [permissions, setPermissions] = useState({});
  let { id } = useParams(); //Getting id from previous page
  const [name, setName] = useState(); //State to store name
  const [desc, setDesc] = useState(); //State to store description
  const [url, setUrl] = useState(); //State to store url
  const [pingurl, setPingUrl] = useState(); //State to store url
  const [method, setMethod] = useState(); //State to store Method
  const [price, setPrice] = useState(); //State to store Price
  const [pricetype, setPriceType] = useState(); //State to store Pricetype
  const [noofleads, setNoOfLeads] = useState(); //State to store noofleads
  const [deliverytype, setDeliveryType] = useState();
  const [success, setSuccess] = useState(); //State to store Success Response
  const [failure, setFailure] = useState(); //State to store Failure Response
  const [validname, setValidName] = useState(false); //State to store name
  const [validdesc, setValidDesc] = useState(false); //State to store description
  const [vurl, setVUrl] = useState(false); //State to store url
  const [vmethod, setVMethod] = useState(false); //State to store Method
  const [vprice, setVPrice] = useState(false); //State to store Price
  const [vpricetype, setVPriceType] = useState(false); //State to store Pricetype
  const [vnoofleads, setVNoOfLeads] = useState(false); //State to store noofleads
  const [vsuccess, setVSuccess] = useState(false); //State to store Success Response
  const [vfailure, setVFailure] = useState(false); //State to store Failure Response
  const [pickervalue, setPickerValue] = useState(); //State to store vertical dropdown value
  const [pickername, setPickerName] = useState();
  const [buyerroute, setBuyerRoute] = useState([]); //State to store BUyer Route details
  const [toggle, setToggle] = useState(false); //State to store switch value
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [payload, setPayload] = useState();
  const [verticals, setVerticals] = useState([]); // State to store All Verticals
  const [verticalsfields, setVerticalsFields] = useState([]); //Array to store Vertical fields
  const [buyerid, setBuyerId] = useState(); //State to store BUyerid
  const [selectedVerticalId, setSelectedVerticalId] = useState();
  const [dialogdetails, setDialogDetails] = useState("ping");
  const [pingData, setPingData] = useState([]);
  const [pingBodyData, setPingBodyData] = useState([]);
  const [pingHeaderData, setPingHeaderData] = useState([]);
  const [pingAuthData, setPingAuthData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [lead_butt1, setlead_butt1] = useState(true);
  const [lead_butt1_data, setlead_butt1_data] = useState(true);
  const [lead_butt2_data, setlead_butt2_data] = useState(false);
  const [lead_butt1_ping, setlead_butt1_ping] = useState(true);
  const [lead_butt2_ping, setlead_butt2_ping] = useState(false);
  const [lead_butt3_ping, setlead_butt3_ping] = useState(false);
  const [lead_butt4_ping, setlead_butt4_ping] = useState(false);

  const [lead_butt5, setlead_butt5] = useState(true);
  const [lead_butt6, setlead_butt6] = useState(false);
  const [lead_butt2, setlead_butt2] = useState(false);
  const [xmlpingstatus, setXmlPingStatus] = useState("ping");
  const [pingfiledata, setPingFileData] = useState();
  const [postfiledata, setPostFileData] = useState();
  const [pingmappedKeys, setPingMappedKeys] = useState({});
  const [pingpostmappedKeys, setPingPostMappedKeys] = useState({});
  const [pingxmlpost, setPingXmlPost] = useState([]);
  const [pingpostxmlpost, setPingPostXmlPost] = useState([]);
  const [pingid, setPingId] = useState();
  const [filterData, setFilterData] = useState([]);
  const [selectedfilters, setSelectedFilters] = useState([]);
  const [verttoggle, setVertToggle] = useState([]);
  const [verttoggle1, setVertToggle1] = useState([]);
  const [getFilterData, setGetFilterData] = useState([]);
  const [getConvData, setGetConvData] = useState({});
  const [getConvData1, setGetConvData1] = useState({});
  const [filterstatus, setFilterStatus] = useState(false);
  //States used to make functionality of clicking "Not found in the List" in data format section(to get textbox instead of dropdown)

  //States to hold the values given for dataformatss
  const [dateformat, setDateFormat] = useState();
  const [ageformat, setAgeFormat] = useState();
  const [timeformat, setTimeFormat] = useState();
  const [phoneformat, setPhoneFormat] = useState();
  const [convData, setConvData] = useState({});
  //==========================================States to store Params fields
  const [paramstatus, setParamStatus] = useState(true);
  const [paramData, setParamData] = useState([]);
  const [paramkey, setParamKey] = useState();
  const [paramtype, setParamValue] = useState("Select Datatype");
  const [paramdesc, setParamDesc] = useState();
  const [paramrequired, setParamRequired] = useState();
  const [editstatus, setEditStatus] = useState(false);
  const [index, setIndex] = useState();
  const [defaultparamkeystatus, setDefaultParamKeyStatus] = useState(false);
  const [editdefaultparamStatus, setEditDefaultParamStatus] = useState(false);
  //   ========================================States to store Body Fields
  const [bodyData, setBodyData] = useState([]);
  const [bodystatus, setBodyStatus] = useState(true);
  const [bodykey, setBodyKey] = useState();
  const [bodytype, setBodyType] = useState("Select Datatype");
  const [bodydesc, setBodyDesc] = useState();
  const [editbodyStatus, setEditBodyStatus] = useState(false);
  const [bodyrequired, setBodyRequired] = useState();
  const [bodyindex, setBodyIndex] = useState();
  const [defaultkeystatus, setDefaultKeyStatus] = useState(false);
  const [editdefaultbodyStatus, setEditDefaultBodyStatus] = useState(false);
  //   ===============================================States to store Header Fields
  const [headerindex, setHeaderIndex] = useState();
  const [headerData, setHeaderData] = useState([]);
  const [editheaderStatus, setEditHeaderStatus] = useState(false);
  const [headerstatus, setHeaderStatus] = useState(true);
  const [headerkey, setHeaderKey] = useState();
  const [headertype, setHeaderType] = useState("Select Datatype");
  const [headerdesc, setHeaderDesc] = useState();
  const [headerrequired, setHeaderRequired] = useState();
  const [defaultheaderkeystatus, setDefaultHeaderKeyStatus] = useState(false);
  const [editdefaultheaderStatus, setEditDefaultHeaderStatus] = useState(false);
  //   ==================================================States to store Auth Fields
  const [authData, setAuthData] = useState([]);
  const [authstatus, setAuthStatus] = useState(true);
  const [authkey, setAuthKey] = useState();
  const [authtype, setAuthType] = useState("Select Datatype");
  const [authdesc, setAuthDesc] = useState();
  const [authrequired, setAuthRequired] = useState("Is it Required");
  const [editauthStatus, setEditAuthStatus] = useState(false);
  const [authindex, setAuthIndex] = useState();
  const [defaultauthkeystatus, setDefaultAuthKeyStatus] = useState(false);
  const [editdefaultauthstatus, setEditDefaultAuthStatus] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [cards, setCards] = useState(false);
  const [filedata, setFileData] = useState(); //State to store textarea data
  const [open, setOpen] = useState(false);
  const [resopen, setResOpen] = useState(false);
  const [xmlarray, setXmlArray] = useState([]);
  const [xmlarray1, setXmlArray1] = useState([]);
  const [xmlstate, setXmlState] = useState(false);
  const [xmlstate1, setXmlState1] = useState(false);
  const [xmlstate2, setXmlState2] = useState(false);
  const [xmlpost, setXmlPost] = useState([]);
  const [radiostatus, setRadioStatus] = useState("xml");
  const [payloadpick, setPayloadPick] = useState([]);
  const [payloadpick1, setPayloadPick1] = useState([]);
  const [xmlindexarray, setXmlIndexArray] = useState([]);
  const [xmlindexarray1, setXmlIndexArray1] = useState([]);
  const [tabledata, settabledata] = useState();
  const [mappedKeys, setMappedKeys] = useState({});
  const [datevertfield, setDateVertField] = useState();
  const [dateofbirthvertfield, setDateOfBirthVertField] = useState();
  const [timevertfield, setTimeVertField] = useState();
  const [phvertfield, setPhVertField] = useState();
  const [verticalsfieldsfilters, setVerticalsFieldsFilters] = useState([]);
  const [filterverticalsfields, setFilterVerticalsFields] = useState([]);
  const [filterkeys, setFilterKeys] = useState([]);

  //post_info
  const [buy_route_params, setBuy_Route_Params] = useState(false);
  const [buy_route_params1, setBuy_Route_Params1] = useState(false);
  const [buy_route_params2, setBuy_Route_Params2] = useState(false);
  const [buy_route_params3, setBuy_Route_Params3] = useState(false);
  const [formats, setFormats] = useState([
    { key: "dateofbirth", value: "", map_field: "" },
    { key: "time", value: "", map_field: "" },
    { key: "date", value: "", map_field: "" },
    { key: "phone", value: "", map_field: "" }
  ]);
  const [filterformats, setFilterFormats] = useState([]);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "35%"
    }
  };
  const [leadsstate, setLeadsState] = useState();
  const [campaignstate, setCampaignState] = useState();
  const [publisherstate, setPublisherState] = useState();
  const [buyerstate, setBuyerState] = useState();
  const [personalDetails, setpersonalDetails] = useState(true);
  const [teamMemb, setteamMemb] = useState(false);
  const [PayDetails, setPayDetails] = useState(false);
  const [lead_butt3, setlead_butt3] = useState(false);
  const [lead_butt4, setlead_butt4] = useState(false);

  // svg_edit

  const [post_params_edit, setpost_params_edit] = useState(false);
  const [post_body_edit, setpost_body_edit] = useState(false);
  const [post_header_edit, setpost_header_edit] = useState(false);
  const [post_authh_edit, setpost_authh_edit] = useState(false);

  const [param_key_edit1, setparam_key_edit1] = useState(true);
  const [body_key_edit1, setbody_key_edit1] = useState(true);
  const [header_key_edit1, setheader_key_edit1] = useState(true);
  const [auth_key_edit1, setauth_key_edit1] = useState(true);

  const [ping_param_key_edit1, setping_param_key_edit1] = useState(true);
  const [ping_body_key_edit1, setping_body_key_edit1] = useState(true);
  const [ping_header_key_edit1, setping_header_key_edit1] = useState(true);
  const [ping_auth_key_edit1, setping_auth_key_edit1] = useState(true);

  //Function to add paramDataArray to array (Called on Clicking Add)
  function getParam() {
    //This method is called on clicking add after filing details in Params Section
    //Data to be posted to array paramData on clicking add when method is post and pingData when method is pingpost
    //Categorised based on the method and post or pingpost
    //Key is buyerfield and mapfield or value is vertical field and testData array is used to TestBuyer Route
    if (method === "ping-post") {
      if (dialogdetails === "ping") {
        const paramdata = {
          default: 0,
          key: paramkey,
          map_field: paramdesc, //vertical field
          value: "",
          stat: "false"
        };
        console.log("PingParamdata", paramdata);
        pingData.push(paramdata);
        //pingtestData.push(paramdata);
      } else {
        const paramdata = {
          default: 0,
          key: paramkey,
          map_field: paramdesc,
          value: "",
          stat: "false"
        };
        console.log("Paramdata", paramdata);
        paramData.push(paramdata);
        // testData.push(paramdata);
      }
      setParamKey("");
      setParamDesc("");
      console.log("paramData", pingData);
      // to remove add screen
    } else {
      const paramdata = {
        default: 0,
        key: paramkey,
        map_field: paramdesc,
        stat: "false",
        value: ""
      };
      console.log("Paramdata", paramdata);
      paramData.push(paramdata);
      //testData.push(paramdata);
      setParamKey("");
      setParamDesc("");

      console.log("=======p", paramData);
    }
  }
  //This function is called on CLicking add after toggling custom default
  //Data to be posted to array paramData on clicking add when method is post and pingData when method is pingpost
  //Categorised based on the method and post or pingpost
  //Key is buyerfield and mapfield or value is vertical field and testData array is used to TestBuyer Route
  function getDefaultParam() {
    //Data to be posted to array
    if (method === "ping-post") {
      if (dialogdetails == "ping") {
        const paramdata = {
          default: 1,
          key: paramkey,
          map_field: "",
          value: paramdesc,
          stat: "false"
        };
        console.log("PingParamdata", paramdata);
        pingData.push(paramdata);
        setParamKey("");
        setParamDesc("");
        //pingtestData.push(paramdata);
      } else {
        const paramdata = {
          default: 1,
          key: paramkey,
          map_field: "",
          value: paramdesc,
          stat: "false"
        };
        paramData.push(paramdata);
        setParamKey("");
        setParamDesc("");
        // testData.push(paramdata);
      }

      // setDefaultParamKeyStatus(false); // to remove add screen
    } else {
      const paramdata = {
        default: 1,
        key: paramkey,
        map_field: "",
        value: paramdesc,
        stat: "false"
      };
      paramData.push(paramdata);
      //testData.push(paramdata);
      setParamKey("");
      setParamDesc("");
      // setDefaultParamKeyStatus(false); // to remove add screen
    }
  }
  //This method is called on clicking add after filing details in Body Section
  //Data to be posted to array bodyData on clicking add when method is post and pingData when method is pingpost
  //Categorised based on the method and post or pingpost
  //Key is buyerfield and mapfield or value is vertical field and testData array is used to TestBuyer Route
  function getBody() {
    console.log("inside body");
    //data to be pushed
    if (method === "ping-post") {
      if (dialogdetails == "ping") {
        const bodydata = {
          default: 0,
          key: bodykey,
          // datatype: "String",
          map_field: bodydesc,
          // required: "Yes",
          value: "",
          stat: "false"
        };
        //console.log("bodydata", bodydata);
        pingBodyData.push(bodydata);
        setBodyKey("");
        setBodyDesc("");
        //pingtestData.push(bodydata);
      } else {
        const bodydata = {
          default: 0,
          key: bodykey,
          map_field: bodydesc,
          value: "",
          stat: "false"
        };
        //console.log("bodydata", bodydata);
        bodyData.push(bodydata);
        setBodyKey("");
        setBodyDesc("");
        //testData.push(bodydata);
      }

      //console.log("bodyData", bodyData);
      // setBodyStatus(false);
    } else {
      const bodydata = {
        default: 0,
        key: bodykey,
        map_field: bodydesc,
        value: "",
        stat: "false"
      };
      //console.log("bodydata", bodydata);
      bodyData.push(bodydata);
      // testData.push(bodydata);
      setBodyKey("");
      setBodyDesc("");
      //console.log("bodyData", bodyData);
      // setBodyStatus(false);
    }
  }
  //This function is called on CLicking add after toggling custom default
  //Data to be posted to array bodyData on clicking add when method is post and pingData when method is pingpost
  //Categorised based on the method and post or pingpost
  //Key is buyerfield and mapfield or value is vertical field and testData array is used to TestBuyer Route
  function getDefaultBody() {
    if (method === "ping-post") {
      //data to be pushed
      if (dialogdetails == "ping") {
        const bodydata = {
          default: 1,
          key: bodykey,
          value: bodydesc,
          map_field: "",
          stat: "false"
        };
        //console.log("bodydata", bodydata);
        pingBodyData.push(bodydata);
        //pingtestData.push(bodydata);
      } else {
        const bodydata = {
          default: 1,
          key: bodykey,
          value: bodydesc,
          map_field: "",
          stat: "false"
        };
        //console.log("bodydata", bodydata);
        bodyData.push(bodydata);
        //testData.push(bodydata);
      }
      setBodyKey("");
      setBodyDesc("");
      //console.log("bodyData", bodyData);
      // setBodyStatus(false);
      // setDefaultKeyStatus(false);
    } else {
      const bodydata = {
        default: 1,
        key: bodykey,
        value: bodydesc,
        map_field: "",
        stat: "false"
      };
      //console.log("bodydata", bodydata);
      bodyData.push(bodydata);
      // testData.push(bodydata);
      setBodyKey("");
      setBodyDesc("");
      //console.log("bodyData", bodyData);
      // setBodyStatus(false);
      // setDefaultKeyStatus(false);
    }
  }

  //This method is called on clicking add after filing details in Body Section
  //Data to be posted to array headerData on clicking add when method is post and pingData when method is pingpost
  //Categorised based on the method and post or pingpost
  //Key is buyerfield and mapfield or value is vertical field and testData array is used to TestBuyer Route
  function getHeader() {
    if (method === "ping-post") {
      //data to be pushed
      if (dialogdetails == "ping") {
        const headerdata = {
          default: 0,
          key: headerkey,
          map_field: headerdesc,
          value: "",
          stat: "false"
        };
        //console.log("headerdata", headerdata);
        pingHeaderData.push(headerdata);
        setHeaderKey("");
        setHeaderDesc("");
        // pingtestData.push(headerdata);
      } else {
        const headerdata = {
          default: 0,
          key: headerkey,
          map_field: headerdesc,
          value: "",
          stat: "false"
        };
        //console.log("headerdata", headerdata);
        headerData.push(headerdata);
        setHeaderKey("");
        setHeaderDesc("");
        // testData.push(headerdata);
      }

      //console.log("headerData", headerData);
      // setHeaderStatus(false);
    } else {
      const headerdata = {
        default: 0,
        key: headerkey,
        map_field: headerdesc,
        value: "",
        stat: "false"
      };
      //console.log("headerdata", headerdata);
      headerData.push(headerdata);
      //testData.push(headerdata);
      setHeaderKey("");
      setHeaderDesc("");
      //console.log("headerData", headerData);
      // setHeaderStatus(false);
    }
  }
  //This function is called on CLicking add after toggling custom default
  //Data to be posted to array headerData on clicking add when method is post and pingData when method is pingpost
  //Categorised based on the method and post or pingpost
  //Key is buyerfield and mapfield or value is vertical field and testData array is used to TestBuyer Route
  function getDefaultHeader() {
    if (method === "ping-post") {
      //data to be pushed
      if (dialogdetails == "ping") {
        const headerdata = {
          default: 1,
          key: headerkey,
          value: headerdesc,
          map_field: "",
          stat: "false"
        };
        //console.log("headerdata", headerdata);
        pingHeaderData.push(headerdata);
        setHeaderKey(" ");
        setHeaderDesc(" ");
        //pingtestData.push(headerdata);
      } else {
        const headerdata = {
          default: 1,
          key: headerkey,
          value: headerdesc,
          map_field: "",
          stat: "false"
        };
        //console.log("headerdata", headerdata);
        headerData.push(headerdata);
        setHeaderKey(" ");
        setHeaderDesc(" ");
        //testData.push(headerdata);
      }

      //console.log("headerData", headerData);
      // setHeaderStatus(false);
      // setDefaultHeaderKeyStatus(false);
    } else {
      const headerdata = {
        default: 1,
        key: headerkey,
        value: headerdesc,
        map_field: "",
        stat: "false"
      };
      console.log("headerdata", headerdata);
      headerData.push(headerdata);
      // testData.push(headerdata);
      setHeaderKey(" ");
      setHeaderDesc(" ");
      console.log("headerData", headerData);
      // setHeaderStatus(false);
      // setDefaultHeaderKeyStatus(false);
    }
  }
  //This method is called on clicking add after filing details in Body Section
  //Data to be posted to array authData on clicking add when method is post and pingData when method is pingpost
  //Categorised based on the method and post or pingpost
  //Key is buyerfield and mapfield or value is vertical field and testData array is used to TestBuyer Route
  function getAuth() {
    if (method === "ping-post") {
      if (dialogdetails == "ping") {
        const authdata = {
          default: 0,
          key: authkey,
          map_field: authdesc,
          value: "",
          stat: "false"
        };
        //console.log("Authdata", authdata);
        pingAuthData.push(authdata);
        // pingtestData.push(authdata);
      } else {
        const authdata = {
          default: 0,
          key: authkey,
          map_field: authdesc,
          value: "",
          stat: "false"
        };
        //console.log("Authdata", authdata);
        authData.push(authdata);
        //testData.push(authdata);
      }
      setAuthKey("");
      setAuthDesc("");
      //console.log("AuthData", authData);
      // setAuthStatus(false);
    } else {
      const authdata = {
        default: 0,
        key: authkey,
        map_field: authdesc,
        value: "",
        stat: "false"
      };
      //console.log("Authdata", authdata);
      authData.push(authdata);
      // testData.push(authdata);
      setAuthKey("");
      setAuthDesc("");
      //console.log("AuthData", authData);
      // setAuthStatus(false);
    }
  }
  //This function is called on CLicking add after toggling custom default
  //Data to be posted to array authData on clicking add when method is post and pingData when method is pingpost
  //Categorised based on the method and post or pingpost
  //Key is buyerfield and mapfield or value is vertical field and testData array is used to TestBuyer Route
  function getDefaultAuth() {
    if (method === "ping-post") {
      if (dialogdetails == "ping") {
        const authdata = {
          default: 1,
          key: authkey,
          value: authdesc,
          map_field: "",
          stat: "false"
        };
        //console.log("Authdata", authdata);
        pingAuthData.push(authdata);
        // pingtestData.push(authdata);
      } else {
        const authdata = {
          default: 1,
          key: authkey,
          value: authdesc,
          map_field: "",
          stat: "false"
        };
        //console.log("Authdata", authdata);
        authData.push(authdata);
        // testData.push(authdata);
      }
      setAuthKey("");
      setAuthDesc("");
      //console.log("AuthData", authData);
      // setDefaultAuthKeyStatus(false);
    } else {
      const authdata = {
        default: 1,
        key: authkey,
        value: authdesc,
        map_field: "",
        stat: "false"
      };
      //console.log("Authdata", authdata);
      authData.push(authdata);
      //testData.push(authdata);
      setAuthKey("");
      setAuthDesc("");
      // setDefaultAuthKeyStatus(false);
    }
  }
  //Map function to display Params added
  const paramitems =
    paramData.length &&
    paramData.map((paramitem, index) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "#FFFFFF",
            width: "100%",
            // padding: "1rem",
            marginTop: "0rem"
          }}
        >
          <table
            id="dtBasicExample"
            class="table table-striped table-sm table_buy_con12"
            cellspacing="0"
          >
            <thead></thead>

            <tbody>
              <tr
                style={{
                  color: "#38383B",
                  fontWeight: "400",
                  fontSize: 17
                }}
              >
                <td class="th-sm extra_class12 thead_width">
                  <div className="">
                    {paramData[index].stat == "true" ? (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Key</h1>
                          <input
                            className="input_borderless editbuyerRKeyInputs"
                            type="text"
                            name="key"
                            placeholder="Key edit"
                            value={paramkey}
                            onChange={event =>
                              route_param_key(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="keyValue">{paramitem.key}</p>
                    )}

                    {/* <div className="svg_grid"></div> */}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {paramData[index].stat == "true" ? (
                    paramData[index].default === 0 ? (
                      <div class="md-form md-outline md-form-extraClass01">
                        <select
                          id="selectBox"
                          className="priceType_select priceType_select0059"
                          value={paramdesc}
                          // value={bodydesc}

                          onChange={event => {
                            // route_body_desc(event.target.value)
                            //console.log(event.target.value);
                            route_param_desc(event.target.value);
                          }}
                        >
                          <option>Select</option>
                          {verticalsfields &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Value</h1>
                          <input
                            className="input_borderless editbuyerRKeyInputs"
                            type="text"
                            name="key"
                            placeholder="Value edit"
                            value={paramdesc}
                            onChange={event =>
                              route_param_desc(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="first_div">
                      <p className="keyValue">
                        {paramitem.value
                          ? paramitem.value
                          : paramitem.map_field}
                      </p>
                    </div>
                  )}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {param_key_edit1 == true && (
                      <p
                        className="key_edit"
                        onClick={() => {
                          if (paramitem.default === 1) {
                            setDefaultParamKeyStatus(false);
                            paramData[index].stat = "true";
                            setEditStatus(false);
                            setparam_key_edit1(false);
                            setParamStatus(false);
                            setIndex(index);
                            setParamKey(paramData[index].key);
                            setParamValue(paramData[index].datatype);
                            setParamDesc(paramData[index].value);
                            setParamRequired(paramData[index].required);
                          } else {
                            setDefaultParamKeyStatus(false);
                            setpost_params_edit(!post_params_edit);
                            paramData[index].stat = "true";
                            setParamStatus(false);
                            setIndex(index);
                            setParamKey(paramData[index].key);
                            setParamValue(paramData[index].datatype);
                            setParamDesc(paramData[index].map_field);
                            setParamRequired(paramData[index].required);
                            console.log("Paramstatusedit", paramstatus);
                          }
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="#9B9B9B"
                          viewBox="0 -1 381.53417 381"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m370.589844 230.964844c-5.523438 0-10 4.476562-10 10v88.792968c-.019532 16.558594-13.4375 29.980469-30 30h-280.589844c-16.5625-.019531-29.980469-13.441406-30-30v-260.589843c.019531-16.5625 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.589843c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.789062c0-5.523438-4.476563-10.003906-10-10.003906zm0 0" />
                          <path d="m156.367188 178.34375 146.011718-146.015625 47.089844 47.089844-146.011719 146.015625zm0 0" />
                          <path d="m132.542969 249.257812 52.039062-14.414062-37.625-37.625zm0 0" />
                          <path d="m362.488281 7.578125c-9.769531-9.746094-25.585937-9.746094-35.355469 0l-10.605468 10.605469 47.089844 47.089844 10.605468-10.605469c9.75-9.769531 9.75-25.585938 0-35.355469zm0 0" />
                        </svg>
                      </p>
                    )}
                    {param_key_edit1 == false && (
                      <FaCheck
                        className="FaCheck_icon"
                        onClick={() => {
                          if (paramitem.default === 0) {
                            const newParam = paramData.map((item, key) => {
                              if (key === index) {
                                return {
                                  default: 0,
                                  key: paramkey,
                                  datatype: "String",
                                  value: paramdesc,
                                  required: "Yes",
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });

                            setParamStatus(true);
                            setlead_butt1(true);
                            setpost_params_edit(!post_params_edit);
                            setEditDefaultParamStatus(false);
                            console.log("Paramstatustick0", paramstatus);
                            setParamData(newParam);
                            setParamKey("");
                            setParamDesc("");
                          } else {
                            const newParam = paramData.map((item, key) => {
                              if (key === index) {
                                return {
                                  default: 1,
                                  key: paramkey,
                                  datatype: "String",
                                  value: paramdesc,

                                  required: "Yes"
                                };
                              } else {
                                return item;
                              }
                            });

                            setpost_params_edit(!post_params_edit);
                            setParamStatus(true);
                            setlead_butt1(true);
                            setparam_key_edit1(true);
                            setEditDefaultParamStatus(false);
                            setParamData(newParam);
                            setParamKey("");
                            setParamDesc("");
                            console.log("Paramstatustick1", paramstatus);
                          }
                        }}
                      />
                    )}
                    <div>
                      <span
                        className="key_span"
                        onClick={() => {
                          const newParamData = paramData.filter(
                            (item, idx) => idx !== index
                          );
                          setParamData(newParamData);
                        }}
                      >
                        <Close />
                      </span>
                    </div>
                    <div className="svg_grid"></div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  const pingparamitems =
    pingData.length &&
    pingData.map((paramitem, index) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "#FFFFFF",
            width: "100%",
            // padding: "1rem",
            marginTop: "0rem"
          }}
        >
          <table
            id="dtBasicExample"
            class="table table-striped table-sm table_buy_con12"
            cellspacing="0"
          >
            <thead></thead>
            <tbody>
              <tr
                style={{
                  color: "#38383B",
                  fontWeight: "400",
                  fontSize: 17
                }}
              >
                <td class="th-sm extra_class12 thead_width">
                  <div className="">
                    {pingData[index].stat == "true" ? (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Key</h1>
                          <input
                            className="input_borderless editbuyerRKeyInputs"
                            type="text"
                            name="key"
                            placeholder="Key edit"
                            value={paramkey}
                            onChange={event =>
                              route_param_key(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="keyValue">{paramitem.key}</p>
                    )}

                    {/* <div className="svg_grid"></div> */}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {pingData[index].stat == "true" ? (
                    pingData[index].default === 0 ? (
                      <div class="md-form md-outline md-form-extraClass01">
                        <select
                          id="selectBox"
                          className="priceType_select priceType_select0059"
                          value={paramdesc}
                          // value={bodydesc}

                          onChange={event => {
                            // route_body_desc(event.target.value)
                            //console.log(event.target.value);
                            route_param_desc(event.target.value);
                          }}
                        >
                          <option>Select</option>
                          {verticalsfields &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Value</h1>
                          <input
                            className="input_borderless editbuyerRKeyInputs"
                            type="text"
                            name="key"
                            placeholder="Value edit"
                            value={paramdesc}
                            onChange={event =>
                              route_param_desc(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="first_div">
                      <p className="keyValue">
                        {paramitem.value
                          ? paramitem.value
                          : paramitem.map_field}
                      </p>
                    </div>
                  )}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {ping_param_key_edit1 == true && (
                      <p
                        className="key_edit"
                        onClick={() => {
                          if (paramitem.default === 1) {
                            setDefaultParamKeyStatus(false);
                            pingData[index].stat = "true";
                            setEditStatus(false);
                            setParamStatus(false);
                            setIndex(index);
                            setParamKey(pingData[index].key);

                            setParamDesc(pingData[index].value);
                          } else {
                            setDefaultParamKeyStatus(false);
                            pingData[index].stat = "true";
                            setParamStatus(false);
                            setIndex(index);
                            setParamKey(pingData[index].key);
                            setping_param_key_edit1(false);
                            setParamDesc(pingData[index].map_field);

                            console.log("Paramstatusedit", paramstatus);
                          }
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="#9B9B9B"
                          viewBox="0 -1 381.53417 381"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m370.589844 230.964844c-5.523438 0-10 4.476562-10 10v88.792968c-.019532 16.558594-13.4375 29.980469-30 30h-280.589844c-16.5625-.019531-29.980469-13.441406-30-30v-260.589843c.019531-16.5625 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.589843c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.789062c0-5.523438-4.476563-10.003906-10-10.003906zm0 0" />
                          <path d="m156.367188 178.34375 146.011718-146.015625 47.089844 47.089844-146.011719 146.015625zm0 0" />
                          <path d="m132.542969 249.257812 52.039062-14.414062-37.625-37.625zm0 0" />
                          <path d="m362.488281 7.578125c-9.769531-9.746094-25.585937-9.746094-35.355469 0l-10.605468 10.605469 47.089844 47.089844 10.605468-10.605469c9.75-9.769531 9.75-25.585938 0-35.355469zm0 0" />
                        </svg>
                      </p>
                    )}
                    {ping_param_key_edit1 == false && (
                      <FaCheck
                        className="FaCheck_icon"
                        onClick={() => {
                          if (paramitem.default === 0) {
                            const newParam = pingData.map((item, key) => {
                              if (key === index) {
                                return {
                                  default: 0,
                                  key: paramkey,
                                  datatype: "String",
                                  value: paramdesc,
                                  required: "Yes",
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });
                            setParamStatus(true);
                            setlead_butt1(true);
                            setpost_params_edit(!post_params_edit);
                            setEditDefaultParamStatus(false);
                            console.log("Paramstatustick0", paramstatus);
                            setPingData(newParam);
                            setParamKey("");
                            setParamDesc("");
                            setping_param_key_edit1(true);
                          } else {
                            const newParam = pingData.map((item, key) => {
                              if (key === index) {
                                return {
                                  default: 1,
                                  key: paramkey,
                                  datatype: "String",
                                  value: paramdesc,

                                  required: "Yes"
                                };
                              } else {
                                return item;
                              }
                            });

                            setpost_params_edit(!post_params_edit);
                            setParamStatus(true);
                            setlead_butt1(true);
                            setEditDefaultParamStatus(false);
                            setPingData(newParam);
                            setParamKey("");
                            setParamDesc("");
                            console.log("Paramstatustick1", paramstatus);
                          }
                        }}
                      />
                    )}
                    <div>
                      <span
                        className="key_span"
                        onClick={() => {
                          const newParamData = paramData.filter(
                            (item, idx) => idx !== index
                          );
                          setPingData(newParamData);
                        }}
                      >
                        <Close />
                      </span>
                    </div>
                    <div className="svg_grid"></div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });

  //Map function to display bodyfields added
  const bodyitems =
    bodyData.length &&
    bodyData.map((bodyitem, index) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "#FFFFFF",
            width: "100%",
            // padding: "1rem",
            marginTop: "0rem"
          }}
        >
          <table
            id="dtBasicExample"
            class="table table-striped table-sm table_buy_con12"
            cellspacing="0"
          >
            <thead></thead>

            <tbody>
              <tr
                style={{
                  color: "#38383B",
                  fontWeight: "400",
                  fontSize: 17
                }}
              >
                <td class="th-sm extra_class12 thead_width">
                  <div className="">
                    {bodyData[index].stat == "true" ? (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Key</h1>
                          <input
                            className="input_borderless input_borderlessExtra"
                            type="text"
                            name="key"
                            value={bodykey}
                            placeholder="Key"
                            onChange={event =>
                              route_body_key(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="keyValue">{bodyitem.key}</p>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {bodyData[index].stat == "true" ? (
                    bodyData[index].default === 0 ? (
                      <div class="md-form md-outline md-form-extraClass01">
                        <select
                          className="priceType_select"
                          value={bodydesc}
                          onChange={event =>
                            route_body_desc(event.target.value)
                          }
                        >
                          <option>Select</option>
                          {verticalsfields.length > 0 &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Value</h1>
                          <input
                            className="input_borderless editbuyerRKeyInputs"
                            type="text"
                            name="key"
                            placeholder="Value edit"
                            value={bodydesc}
                            onChange={event =>
                              route_body_desc(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="first_div">
                      <p className="keyValue">
                        {bodyitem.value ? bodyitem.value : bodyitem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {body_key_edit1 == true && (
                      <p
                        className="key_edit"
                        onClick={() => {
                          if (bodyitem.default === 1) {
                            setDefaultKeyStatus(false);
                            setEditDefaultBodyStatus(true);
                            setEditBodyStatus(false);
                            setBodyIndex(index);
                            bodyData[index].stat = "true";
                            setBodyKey(bodyData[index].key);

                            setBodyDesc(bodyData[index].value);
                          } else {
                            // setpost_body_edit(true)
                            setDefaultKeyStatus(false);
                            setbody_key_edit1(false);
                            bodyData[index].stat = "true";
                            setEditBodyStatus(true);
                            setEditDefaultBodyStatus(false);
                            setBodyStatus(false);
                            setBodyIndex(index);
                            setBodyKey(bodyData[index].key);

                            setBodyDesc(bodyData[index].map_field);
                          }
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="#9B9B9B"
                          viewBox="0 -1 381.53417 381"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m370.589844 230.964844c-5.523438 0-10 4.476562-10 10v88.792968c-.019532 16.558594-13.4375 29.980469-30 30h-280.589844c-16.5625-.019531-29.980469-13.441406-30-30v-260.589843c.019531-16.5625 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.589843c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.789062c0-5.523438-4.476563-10.003906-10-10.003906zm0 0" />
                          <path d="m156.367188 178.34375 146.011718-146.015625 47.089844 47.089844-146.011719 146.015625zm0 0" />
                          <path d="m132.542969 249.257812 52.039062-14.414062-37.625-37.625zm0 0" />
                          <path d="m362.488281 7.578125c-9.769531-9.746094-25.585937-9.746094-35.355469 0l-10.605468 10.605469 47.089844 47.089844 10.605468-10.605469c9.75-9.769531 9.75-25.585938 0-35.355469zm0 0" />
                        </svg>
                      </p>
                    )}
                    {body_key_edit1 == false && (
                      <FaCheck
                        className="FaCheck_icon"
                        onClick={() => {
                          if (bodyitem.default === 0) {
                            const newBody = bodyData.map((item, key) => {
                              if (key === bodyindex) {
                                return {
                                  default: 0,
                                  key: bodykey,
                                  datatype: bodytype,
                                  map_field: bodydesc,
                                  required: bodyrequired,
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });
                            setbody_key_edit1(true);
                            setBodyStatus(false);
                            setEditBodyStatus(false);
                            setBodyData(newBody);
                            setBodyKey("");
                            setBodyDesc("");
                          } else {
                            const newBody = bodyData.map((item, key) => {
                              if (key === bodyindex) {
                                return {
                                  default: 1,
                                  key: bodykey,
                                  datatype: "String",
                                  value: bodydesc,
                                  required: "Yes",
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });

                            setEditBodyStatus(false);
                            setEditDefaultBodyStatus(false);
                            setBodyData(newBody);
                            setBodyKey("");
                            setBodyDesc("");
                          }
                        }}
                      />
                    )}
                    <div>
                      <span
                        className="key_span"
                        onClick={() => {
                          const newBodyData = bodyData.filter(
                            (item, idx) => idx !== index
                          );
                          setBodyData(newBodyData);
                        }}
                      >
                        <Close />
                      </span>
                    </div>
                    <div className="svg_grid"></div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  const pingbodyitems =
    pingBodyData.length &&
    pingBodyData.map((bodyitem, index) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "#FFFFFF",
            width: "100%",
            // padding: "1rem",
            marginTop: "0rem"
          }}
        >
          <table
            id="dtBasicExample"
            class="table table-striped table-sm table_buy_con12"
            cellspacing="0"
          >
            <thead></thead>

            <tbody>
              <tr
                style={{
                  color: "#38383B",
                  fontWeight: "400",
                  fontSize: 17
                }}
              >
                <td class="th-sm extra_class12 thead_width">
                  <div className="">
                    {pingBodyData[index].stat == "true" ? (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Key</h1>
                          <input
                            className="input_borderless input_borderlessExtra"
                            type="text"
                            name="key"
                            value={bodykey}
                            placeholder="Key"
                            onChange={event =>
                              route_body_key(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="keyValue">{bodyitem.key}</p>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {pingBodyData[index].stat == "true" ? (
                    pingBodyData[index].default === 0 ? (
                      <div class="md-form md-outline md-form-extraClass01">
                        <select
                          className="priceType_select"
                          value={bodydesc}
                          onChange={event =>
                            route_body_desc(event.target.value)
                          }
                        >
                          <option>Select</option>
                          {verticalsfields.length > 0 &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Value</h1>
                          <input
                            className="input_borderless editbuyerRKeyInputs"
                            type="text"
                            name="key"
                            placeholder="Value edit"
                            value={bodydesc}
                            onChange={event =>
                              route_body_desc(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="first_div">
                      <p className="keyValue">
                        {bodyitem.value ? bodyitem.value : bodyitem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {ping_body_key_edit1 == true && (
                      <p
                        className="key_edit"
                        onClick={() => {
                          if (bodyitem.default === 1) {
                            setDefaultKeyStatus(false);
                            setEditBodyStatus(false);
                            setBodyIndex(index);
                            pingBodyData[index].stat = "true";
                            setBodyKey(pingBodyData[index].key);

                            setBodyDesc(pingBodyData[index].value);
                          } else {
                            // setpost_body_edit(true)
                            setDefaultKeyStatus(false);
                            pingBodyData[index].stat = "true";
                            setEditBodyStatus(true);
                            setEditDefaultBodyStatus(false);
                            setBodyStatus(false);
                            setBodyIndex(index);
                            setBodyKey(pingBodyData[index].key);
                            setping_body_key_edit1(false);
                            setBodyDesc(pingBodyData[index].map_field);
                          }
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="#9B9B9B"
                          viewBox="0 -1 381.53417 381"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m370.589844 230.964844c-5.523438 0-10 4.476562-10 10v88.792968c-.019532 16.558594-13.4375 29.980469-30 30h-280.589844c-16.5625-.019531-29.980469-13.441406-30-30v-260.589843c.019531-16.5625 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.589843c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.789062c0-5.523438-4.476563-10.003906-10-10.003906zm0 0" />
                          <path d="m156.367188 178.34375 146.011718-146.015625 47.089844 47.089844-146.011719 146.015625zm0 0" />
                          <path d="m132.542969 249.257812 52.039062-14.414062-37.625-37.625zm0 0" />
                          <path d="m362.488281 7.578125c-9.769531-9.746094-25.585937-9.746094-35.355469 0l-10.605468 10.605469 47.089844 47.089844 10.605468-10.605469c9.75-9.769531 9.75-25.585938 0-35.355469zm0 0" />
                        </svg>
                      </p>
                    )}
                    {ping_body_key_edit1 == false && (
                      <FaCheck
                        className="FaCheck_icon"
                        onClick={() => {
                          if (bodyitem.default === 0) {
                            const newBody = pingBodyData.map((item, key) => {
                              if (key === bodyindex) {
                                return {
                                  default: 0,
                                  key: bodykey,
                                  datatype: bodytype,
                                  map_field: bodydesc,
                                  required: bodyrequired,
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });
                            setBodyStatus(true);
                            setEditBodyStatus(false);
                            setPingBodyData(newBody);
                            setBodyKey("");
                            setBodyDesc("");
                            setping_body_key_edit1(false);
                          } else {
                            const newBody = pingBodyData.map((item, key) => {
                              if (key === bodyindex) {
                                return {
                                  default: 1,
                                  key: bodykey,
                                  datatype: "String",
                                  value: bodydesc,
                                  required: "Yes",
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });
                            setBodyStatus(true);
                            setEditBodyStatus(false);
                            setEditDefaultBodyStatus(false);
                            setPingBodyData(newBody);
                            setBodyKey("");
                            setBodyDesc("");
                          }
                        }}
                      />
                    )}
                    <div>
                      <span
                        className="key_span"
                        onClick={() => {
                          const newBodyData = pingBodyData.filter(
                            (item, idx) => idx !== index
                          );
                          setPingBodyData(newBodyData);
                        }}
                      >
                        <Close />
                      </span>
                    </div>
                    <div className="svg_grid"></div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  const headeritems =
    headerData.length &&
    headerData.map((headeritem, index) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "#FFFFFF",
            width: "100%",
            // padding: "1rem",
            marginTop: "0rem"
          }}
        >
          <table
            id="dtBasicExample"
            class="table table-striped table-sm table_buy_con12"
            cellspacing="0"
          >
            <thead></thead>

            <tbody>
              <tr
                style={{
                  color: "#38383B",
                  fontWeight: "400",
                  fontSize: 17
                }}
              >
                <td class="th-sm extra_class12 thead_width">
                  <div className="">
                    {headerData[index].stat == "true" ? (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Key</h1>
                          <input
                            className="input_borderless input_borderlessExtra"
                            type="text"
                            name="key"
                            value={headerkey}
                            placeholder="Key"
                            onChange={event =>
                              route_header_key(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="keyValue">{headeritem.key}</p>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {headerData[index].stat == "true" ? (
                    headerData[index].default === 0 ? (
                      <div class="md-form md-outline md-form-extraClass01">
                        <select
                          className="priceType_select"
                          value={headerdesc}
                          onChange={event =>
                            route_header_desc(event.target.value)
                          }
                        >
                          <option>Select</option>
                          {verticalsfields.length > 0 &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Value</h1>
                          <input
                            className="input_borderless editbuyerRKeyInputs"
                            type="text"
                            name="key"
                            placeholder="Value edit"
                            value={headerdesc}
                            onChange={event =>
                              route_header_desc(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="first_div">
                      <p className="keyValue">
                        {headeritem.value
                          ? headeritem.value
                          : headeritem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {header_key_edit1 == true && (
                      <p
                        className="key_edit"
                        onClick={() => {
                          if (headeritem.default === 1) {
                            setDefaultHeaderKeyStatus(false);
                            headerData[index].stat = "true";

                            setEditHeaderStatus(false);
                            setHeaderStatus(false);
                            setHeaderIndex(index);
                            setHeaderKey(headerData[index].key);

                            setHeaderDesc(headerData[index].value);
                          } else {
                            setDefaultHeaderKeyStatus(false);
                            setEditDefaultHeaderStatus(false);
                            headerData[index].stat = "true";
                            setHeaderStatus(false);
                            setHeaderIndex(index);
                            setHeaderKey(headerData[index].key);
                            setheader_key_edit1(false);
                            setHeaderDesc(headerData[index].map_field);
                          }
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="#9B9B9B"
                          viewBox="0 -1 381.53417 381"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m370.589844 230.964844c-5.523438 0-10 4.476562-10 10v88.792968c-.019532 16.558594-13.4375 29.980469-30 30h-280.589844c-16.5625-.019531-29.980469-13.441406-30-30v-260.589843c.019531-16.5625 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.589843c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.789062c0-5.523438-4.476563-10.003906-10-10.003906zm0 0" />
                          <path d="m156.367188 178.34375 146.011718-146.015625 47.089844 47.089844-146.011719 146.015625zm0 0" />
                          <path d="m132.542969 249.257812 52.039062-14.414062-37.625-37.625zm0 0" />
                          <path d="m362.488281 7.578125c-9.769531-9.746094-25.585937-9.746094-35.355469 0l-10.605468 10.605469 47.089844 47.089844 10.605468-10.605469c9.75-9.769531 9.75-25.585938 0-35.355469zm0 0" />
                        </svg>
                      </p>
                    )}

                    {header_key_edit1 == false && (
                      <FaCheck
                        className="FaCheck_icon"
                        onClick={() => {
                          if (headeritem.default === 0) {
                            const newHeader = headerData.map((item, key) => {
                              if (key === headerindex) {
                                return {
                                  default: 0,
                                  key: headerkey,
                                  datatype: "String",
                                  map_field: headerdesc,
                                  required: "Yes",
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });
                            setHeaderStatus(true);
                            setheader_key_edit1(true);
                            setEditHeaderStatus(false);
                            setHeaderData(newHeader);
                            setHeaderKey("");
                            setHeaderDesc("");
                          } else {
                            const newHeader = headerData.map((item, key) => {
                              if (key === headerindex) {
                                return {
                                  default: 1,
                                  key: headerkey,
                                  datatype: "String",
                                  value: headerdesc,
                                  required: "Yes",
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });

                            setHeaderStatus(true);
                            setEditDefaultHeaderStatus(false);
                            setHeaderData(newHeader);
                            setHeaderKey("");
                            setHeaderDesc("");
                          }
                        }}
                      />
                    )}

                    <div>
                      <span
                        className="key_span"
                        onClick={() => {
                          const newBodyData = headerData.filter(
                            (item, idx) => idx !== index
                          );
                          setHeaderData(newBodyData);
                        }}
                      >
                        <Close />
                      </span>
                    </div>
                    <div className="svg_grid"></div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });

  const pingheaderitems =
    pingHeaderData.length &&
    pingHeaderData.map((headeritem, index) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "#FFFFFF",
            width: "100%",
            // padding: "1rem",
            marginTop: "0rem"
          }}
        >
          <table
            id="dtBasicExample"
            class="table table-striped table-sm table_buy_con12"
            cellspacing="0"
          >
            <thead></thead>

            <tbody>
              <tr
                style={{
                  color: "#38383B",
                  fontWeight: "400",
                  fontSize: 17
                }}
              >
                <td class="th-sm extra_class12 thead_width">
                  <div className="">
                    {pingHeaderData[index].stat == "true" ? (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Key</h1>
                          <input
                            className="input_borderless input_borderlessExtra"
                            type="text"
                            name="key"
                            value={headerkey}
                            placeholder="Key"
                            onChange={event =>
                              route_header_key(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="keyValue">{headeritem.key}</p>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {pingHeaderData[index].stat == "true" ? (
                    pingHeaderData[index].default === 0 ? (
                      <div class="md-form md-outline md-form-extraClass01">
                        <select
                          className="priceType_select"
                          value={headerdesc}
                          onChange={event =>
                            route_header_desc(event.target.value)
                          }
                        >
                          <option>Select</option>
                          {verticalsfields.length > 0 &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Value</h1>
                          <input
                            className="input_borderless editbuyerRKeyInputs"
                            type="text"
                            name="key"
                            placeholder="Value edit"
                            value={headerdesc}
                            onChange={event =>
                              route_header_desc(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="first_div">
                      <p className="keyValue">
                        {headeritem.value
                          ? headeritem.value
                          : headeritem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {ping_header_key_edit1 == true && (
                      <p
                        className="key_edit"
                        onClick={() => {
                          if (headeritem.default === 1) {
                            setDefaultHeaderKeyStatus(false);
                            pingHeaderData[index].stat = "true";
                            setEditHeaderStatus(false);
                            setHeaderStatus(false);
                            setHeaderIndex(index);
                            setHeaderKey(pingHeaderData[index].key);

                            setHeaderDesc(pingHeaderData[index].value);
                          } else {
                            setDefaultHeaderKeyStatus(false);
                            setEditDefaultHeaderStatus(false);
                            pingHeaderData[index].stat = "true";
                            setHeaderStatus(false);
                            setHeaderIndex(index);
                            setHeaderKey(pingHeaderData[index].key);
                            setping_header_key_edit1(false);
                            setHeaderDesc(pingHeaderData[index].map_field);
                          }
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="#9B9B9B"
                          viewBox="0 -1 381.53417 381"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m370.589844 230.964844c-5.523438 0-10 4.476562-10 10v88.792968c-.019532 16.558594-13.4375 29.980469-30 30h-280.589844c-16.5625-.019531-29.980469-13.441406-30-30v-260.589843c.019531-16.5625 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.589843c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.789062c0-5.523438-4.476563-10.003906-10-10.003906zm0 0" />
                          <path d="m156.367188 178.34375 146.011718-146.015625 47.089844 47.089844-146.011719 146.015625zm0 0" />
                          <path d="m132.542969 249.257812 52.039062-14.414062-37.625-37.625zm0 0" />
                          <path d="m362.488281 7.578125c-9.769531-9.746094-25.585937-9.746094-35.355469 0l-10.605468 10.605469 47.089844 47.089844 10.605468-10.605469c9.75-9.769531 9.75-25.585938 0-35.355469zm0 0" />
                        </svg>
                      </p>
                    )}
                    {ping_header_key_edit1 == false && (
                      <FaCheck
                        className="FaCheck_icon"
                        onClick={() => {
                          if (headeritem.default === 0) {
                            const newHeader = pingHeaderData.map(
                              (item, key) => {
                                if (key === headerindex) {
                                  return {
                                    default: 0,
                                    key: headerkey,
                                    datatype: "String",
                                    map_field: headerdesc,
                                    required: "Yes",
                                    stat: "false"
                                  };
                                } else {
                                  return item;
                                }
                              }
                            );
                            setHeaderStatus(true);
                            setping_header_key_edit1(false);
                            setEditHeaderStatus(false);
                            setPingHeaderData(newHeader);
                            setHeaderKey("");
                            setHeaderDesc("");
                          } else {
                            const newHeader = pingHeaderData.map(
                              (item, key) => {
                                if (key === headerindex) {
                                  return {
                                    default: 1,
                                    key: headerkey,
                                    datatype: "String",
                                    value: headerdesc,
                                    required: "Yes",
                                    stat: "false"
                                  };
                                } else {
                                  return item;
                                }
                              }
                            );
                            setHeaderStatus(true);
                            setEditDefaultHeaderStatus(false);
                            setPingHeaderData(newHeader);
                            setHeaderKey("");
                            setHeaderDesc("");
                          }
                        }}
                      />
                    )}

                    <div>
                      <span
                        className="key_span"
                        onClick={() => {
                          const newBodyData = pingHeaderData.filter(
                            (item, idx) => idx !== index
                          );
                          setPingHeaderData(newBodyData);
                        }}
                      >
                        <Close />
                      </span>
                    </div>
                    <div className="svg_grid"></div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  const authitems =
    authData.length &&
    authData.map((authitem, index) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "#FFFFFF",
            width: "100%",
            // padding: "1rem",
            marginTop: "0rem"
          }}
        >
          <table
            id="dtBasicExample"
            class="table table-striped table-sm table_buy_con12"
            cellspacing="0"
          >
            <thead></thead>

            <tbody>
              <tr
                style={{
                  color: "#38383B",
                  fontWeight: "400",
                  fontSize: 17
                }}
              >
                <td class="th-sm extra_class12 thead_width">
                  <div className="">
                    {authData[index].stat == "true" ? (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Key</h1>
                          <input
                            className="input_borderless input_borderlessExtra"
                            type="text"
                            name="key"
                            value={authkey}
                            placeholder="Key"
                            onChange={event =>
                              route_auth_key(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="keyValue">{authitem.key}</p>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {authData[index].stat == "true" ? (
                    authData[index].default === 0 ? (
                      <div class="md-form md-outline md-form-extraClass01">
                        <select
                          className="priceType_select"
                          value={authdesc}
                          onChange={event =>
                            route_auth_desc(event.target.value)
                          }
                        >
                          <option>Select</option>
                          {verticalsfields.length > 0 &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Value</h1>
                          <input
                            className="input_borderless editbuyerRKeyInputs"
                            type="text"
                            name="key"
                            placeholder="Value edit"
                            value={authdesc}
                            onChange={event =>
                              route_auth_desc(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="first_div">
                      <p className="keyValue">
                        {authitem.value ? authitem.value : authitem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {auth_key_edit1 == true && (
                      <p
                        className="key_edit"
                        onClick={() => {
                          if (authitem.default === 1) {
                            setDefaultAuthKeyStatus(false);
                            authData[index].stat = "true";
                            setEditAuthStatus(false);
                            setAuthStatus(false);
                            setAuthIndex(index);

                            setAuthKey(authData[index].key);

                            setAuthDesc(authData[index].value);
                          } else {
                            console.log("vdtf");
                            setDefaultAuthKeyStatus(false);
                            authData[index].stat = "true";
                            setEditDefaultAuthStatus(false);
                            setAuthStatus(false);

                            setAuthIndex(index);
                            setAuthKey(authData[index].key);
                            setauth_key_edit1(false);
                            setAuthDesc(authData[index].map_field);
                          }
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="#9B9B9B"
                          viewBox="0 -1 381.53417 381"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m370.589844 230.964844c-5.523438 0-10 4.476562-10 10v88.792968c-.019532 16.558594-13.4375 29.980469-30 30h-280.589844c-16.5625-.019531-29.980469-13.441406-30-30v-260.589843c.019531-16.5625 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.589843c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.789062c0-5.523438-4.476563-10.003906-10-10.003906zm0 0" />
                          <path d="m156.367188 178.34375 146.011718-146.015625 47.089844 47.089844-146.011719 146.015625zm0 0" />
                          <path d="m132.542969 249.257812 52.039062-14.414062-37.625-37.625zm0 0" />
                          <path d="m362.488281 7.578125c-9.769531-9.746094-25.585937-9.746094-35.355469 0l-10.605468 10.605469 47.089844 47.089844 10.605468-10.605469c9.75-9.769531 9.75-25.585938 0-35.355469zm0 0" />
                        </svg>
                      </p>
                    )}

                    {auth_key_edit1 == false && (
                      <FaCheck
                        className="FaCheck_icon"
                        onClick={() => {
                          if (authitem.default === 0) {
                            const newAuth = authData.map((item, key) => {
                              if (key === authindex) {
                                return {
                                  default: 0,
                                  key: authkey,
                                  datatype: "String",
                                  map_field: authdesc,
                                  required: "Yes",
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });
                            setauth_key_edit1(true);
                            setAuthStatus(true);
                            setEditAuthStatus(false);
                            setAuthData(newAuth);
                            setAuthKey("");
                            setAuthDesc("");
                          } else {
                            const newAuth = headerData.map((item, key) => {
                              if (key === headerindex) {
                                return {
                                  default: 1,
                                  key: authkey,
                                  datatype: "String",
                                  value: authdesc,
                                  required: "Yes",
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });
                            setAuthStatus(true);
                            setEditDefaultAuthStatus(false);
                            setAuthData(newAuth);
                            setAuthKey("");
                            setAuthDesc("");
                          }
                        }}
                      />
                    )}

                    <div>
                      <span
                        className="key_span"
                        onClick={() => {
                          const newBodyData = pingAuthData.filter(
                            (item, idx) => idx !== index
                          );
                          setPingAuthData(newBodyData);
                        }}
                      >
                        <Close />
                      </span>
                    </div>
                    <div className="svg_grid"></div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });

  const pingauthitems =
    pingAuthData.length &&
    pingAuthData.map((authitem, index) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "#FFFFFF",
            width: "100%",
            // padding: "1rem",
            marginTop: "0rem"
          }}
        >
          <table
            id="dtBasicExample"
            class="table table-striped table-sm table_buy_con12"
            cellspacing="0"
          >
            <thead></thead>

            <tbody>
              <tr
                style={{
                  color: "#38383B",
                  fontWeight: "400",
                  fontSize: 17
                }}
              >
                <td class="th-sm extra_class12 thead_width">
                  <div className="">
                    {pingAuthData[index].stat == "true" ? (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Key</h1>
                          <input
                            className="input_borderless input_borderlessExtra"
                            type="text"
                            name="key"
                            value={authkey}
                            placeholder="Key"
                            onChange={event =>
                              route_auth_key(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="keyValue">{authitem.key}</p>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {pingAuthData[index].stat == "true" ? (
                    pingAuthData[index].default === 0 ? (
                      <div class="md-form md-outline md-form-extraClass01">
                        <select
                          className="priceType_select"
                          value={authdesc}
                          onChange={event =>
                            route_auth_desc(event.target.value)
                          }
                        >
                          <option>Select</option>
                          {verticalsfields.length > 0 &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <div className="half_div">
                        <div className="border789 border789_dup">
                          <h1>Value</h1>
                          <input
                            className="input_borderless editbuyerRKeyInputs"
                            type="text"
                            name="key"
                            placeholder="Value edit"
                            value={authdesc}
                            onChange={event =>
                              route_auth_desc(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="first_div">
                      <p className="keyValue">
                        {authitem.value ? authitem.value : authitem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {ping_auth_key_edit1 == true && (
                      <p
                        className="key_edit"
                        onClick={() => {
                          if (authitem.default === 1) {
                            setDefaultAuthKeyStatus(false);
                            pingAuthData[index].stat = "true";
                            setEditAuthStatus(false);
                            setAuthStatus(false);
                            setAuthIndex(index);
                            setAuthKey(pingAuthData[index].key);

                            setAuthDesc(pingAuthData[index].value);
                          } else {
                            setDefaultAuthKeyStatus(false);
                            pingAuthData[index].stat = "true";
                            setEditDefaultAuthStatus(false);
                            setAuthStatus(false);
                            setAuthIndex(index);
                            setAuthKey(pingAuthData[index].key);
                            setping_auth_key_edit1(false);

                            setAuthDesc(pingAuthData[index].map_field);
                          }
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="#9B9B9B"
                          viewBox="0 -1 381.53417 381"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m370.589844 230.964844c-5.523438 0-10 4.476562-10 10v88.792968c-.019532 16.558594-13.4375 29.980469-30 30h-280.589844c-16.5625-.019531-29.980469-13.441406-30-30v-260.589843c.019531-16.5625 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.589843c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.789062c0-5.523438-4.476563-10.003906-10-10.003906zm0 0" />
                          <path d="m156.367188 178.34375 146.011718-146.015625 47.089844 47.089844-146.011719 146.015625zm0 0" />
                          <path d="m132.542969 249.257812 52.039062-14.414062-37.625-37.625zm0 0" />
                          <path d="m362.488281 7.578125c-9.769531-9.746094-25.585937-9.746094-35.355469 0l-10.605468 10.605469 47.089844 47.089844 10.605468-10.605469c9.75-9.769531 9.75-25.585938 0-35.355469zm0 0" />
                        </svg>
                      </p>
                    )}
                    {ping_auth_key_edit1 == false && (
                      <FaCheck
                        className="FaCheck_icon"
                        onClick={() => {
                          if (authitem.default === 0) {
                            const newAuth = pingAuthData.map((item, key) => {
                              if (key === authindex) {
                                return {
                                  default: 0,
                                  key: authkey,
                                  datatype: "String",
                                  map_field: authdesc,
                                  required: "Yes",
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });
                            setAuthStatus(false);
                            setEditAuthStatus(false);
                            setPingAuthData(newAuth);
                            setAuthKey("");
                            setAuthDesc("");
                            setping_auth_key_edit1(true);
                          } else {
                            const newAuth = pingAuthData.map((item, key) => {
                              if (key === headerindex) {
                                return {
                                  default: 1,
                                  key: authkey,
                                  datatype: "String",
                                  value: authdesc,
                                  required: "Yes",
                                  stat: "false"
                                };
                              } else {
                                return item;
                              }
                            });
                            setAuthStatus(false);
                            setEditDefaultAuthStatus(false);
                            setPingAuthData(newAuth);
                            setAuthKey("");
                            setAuthDesc("");
                          }
                        }}
                      />
                    )}
                    <div>
                      <span
                        className="key_span"
                        onClick={() => {
                          const newBodyData = pingAuthData.filter(
                            (item, idx) => idx !== index
                          );
                          setPingAuthData(newBodyData);
                        }}
                      >
                        <Close />
                      </span>
                    </div>
                    <div className="svg_grid"></div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });

  const save_details = () => {
    console.log("GGGGGGGGGGG", convData);
    var postpay = "";
    if (filedata) {
      postpay = filedata
        .toString()
        .split("\n")
        .join("")
        .split(" ")
        .join("");
    }
    if (postfiledata) {
      postpay = postfiledata
        .toString()
        .split("\n")
        .join("")
        .split(" ")
        .join("");
    }
    //mkeys contains either of mappedKeys or pingpostmappedKeys
    var mkeys = {};
    if (mappedKeys) {
      mkeys = mappedKeys;
    }
    if (pingpostmappedKeys) {
      mkeys = pingpostmappedKeys;
    }
    if (name && desc && price && pricetype && noofleads && url && method) {
      //Data to be posted
      const data = {
        route: {
          name: name,
          desc: desc,
          buyer_id: buyerid,
          price: price,
          price_type: pricetype,
          no_of_leads: noofleads,
          post_url: url,
          ping_url: pingurl,
          method: method,
          delivery_type: deliverytype,
          vertical_id: pickervalue,
          vertical_buyer_active: toggle ? 1 : 0,
          post_payload_data: postpay,
          ping_payload_data: pingfiledata,
          failure_key: failure,
          success_key: success,
          active: 1,
          mapped_keys_post: mkeys,
          mapped_keys_ping: pingmappedKeys ? pingmappedKeys : null,
          payload_format: radiostatus ? radiostatus : null,
          ping_id_key: ""
        },
        route_settings: {
          params: paramData,
          body: bodyData,
          header: headerData,
          auth: authData,
          pingparams: pingData,
          pingbody: pingBodyData,
          pingheader: pingHeaderData,
          pingauth: pingAuthData,
          payload: xmlpost ? xmlpost : pingpostxmlpost ? pingpostxmlpost : null,
          pingpayload: pingxmlpost
        },
        route_filters: filterData,
        route_formats: formats.filter(item => {
          return item.value != "";
        })
      };
      console.log("getConvData=====================", getConvData);
      console.log("Data=====================", data);
      const config = {
        url: API_URL + `/broutes/update/${id}`, //URL
        data: data, //Data to be posted
        method: "put", //Method=put
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      ////console.log("hello");
      axios(config)
        .then(response => {
          if (response.status == 200) {
            ////console.log("Createroute", response);
            localStorage.setItem("success1", 1);
            props.history.goBack(); //To return to previous screen on SuccessfulCreation
          }
        })
        .catch(error => {
          ////console.log("ErrorBuyerRouteseedit", error);
          alert(error.message);
          ////console.log(error);
        });
    } else {
      if (!name) setValidName(true);
      if (!desc) setValidDesc(true);
      if (!url) setVUrl(true);
      if (!price) setVPrice(true);
      if (!pricetype) setVPriceType(true);
      if (!method) setVMethod(true);
      if (!success) setVSuccess(true);
      if (!failure) setVFailure(true);
      if (!noofleads) setVNoOfLeads(true);
    }
  };
  function dataformats(a, b) {
    let temp = [];
    temp = [...formats];
    temp[a] = b;
    formats[a] = b;
    setFormats(temp);
  }
  // function to handle name
  const buyer_route_name = value => {
    if (value != "") setValidName(false);
    setName(value);
  };
  // function to handle Description
  const buyer_route_desc = value => {
    if (value != "") setValidDesc(false);
    setDesc(value);
  };
  // function to handle URL
  const buyer_route_url = value => {
    if (value != "") setVUrl(false);
    setUrl(value);
  };
  // function to handle Method
  const buyer_route_method = value => {
    if (value != "") setVMethod(false);
    setMethod(value);
  };
  // function to handle Price
  const buyer_route_price = value => {
    if (value != "") setVPrice(false);
    setPrice(value);
  };
  // function to handle Pricetype
  const buyer_route_pricetype = value => {
    setPriceType(value);
  };
  // function to handle noofleads
  const buyer_route_noofleads = value => {
    if (value != "") setVNoOfLeads(false);
    setNoOfLeads(value);
  };
  // function to handle success response
  const buyer_route_success = value => {
    if (value != "") setVSuccess(false);
    setSuccess(value);
  };
  // function to handle failure response
  const buyer_route_failure = value => {
    if (value != "") setVFailure(false);
    setFailure(value);
  };
  // function to handle paramKey
  const route_param_key = value => {
    setParamKey(value);
  };
  // function to handle Paramdatatype
  const route_param_value = value => {
    setParamValue(value);
  };
  // function to handle Mapfield
  const route_param_desc = value => {
    setParamDesc(value);
  };
  // function to handle Required
  const route_param_required = value => {
    setParamRequired(value);
  };
  // function to handle bodyKey
  const route_body_key = value => {
    setBodyKey(value);
  };
  // function to handle Bodydatatype
  const route_body_type = value => {
    setBodyType(value);
  };
  // function to handle bodyMapfield
  const route_body_desc = value => {
    setBodyDesc(value);
  };
  const route_body_desc1 = value => {
    setBodyDesc(value);
  };
  // function to handle bodyRequired
  const route_body_required = value => {
    setBodyRequired(value);
  };
  // function to handle Headerkey
  const route_header_key = value => {
    setHeaderKey(value);
  };
  // function to handle Headerdatatype
  const route_header_type = value => {
    setHeaderType(value);
  };
  // function to handle HeaderMpfield
  const route_header_desc = value => {
    setHeaderDesc(value);
  };
  // function to handle HeaderRequired
  const route_header_required = value => {
    setHeaderRequired(value);
  };
  // function to handle AuthKey
  const route_auth_key = value => {
    setAuthKey(value);
  };
  // function to handle AuthDatatype
  const route_auth_type = value => {
    setAuthType(value);
  };
  // function to handle Authmapfield
  const route_auth_desc = value => {
    setAuthDesc(value);
  };
  // function to handle AuthRequired
  const route_auth_required = value => {
    setAuthRequired(value);
  };
  function payloadFile(a, b) {
    // setPayloadPick([])
    let temp = [];
    ////console.log("index",a)
    ////console.log("pickervalue",b)
    temp = [...global.payloadpick];
    temp[a] = b;
    global.payloadpick[a] = b;

    ////console.log("pickkkkk",temp)
    setPayloadPick(temp);
  }
  function verticalToggle(a, b) {
    let temp = [];
    temp = [...global.verttoggle];
    temp[a] = b;
    global.verttoggle[a] = b;
    setVertToggle(temp);
  }
  function verticalToggle1(a, b) {
    let temp = [];
    temp = [...global.selectedstatus];
    temp[a] = b;
    global.selectedstatus[a] = b;
    setVertToggle1(temp);
  }
  //Function to get All VErticals List
  useEffect(() => {
    document.title = "Edit Buyer Route - LeadsWatch";
    if (localStorage.getItem("role") == 4)
      var currentModule = JSON.parse(
        localStorage.getItem("permissions")
      ).filter(item => {
        return item.module_id == 4;
      });

    setPermissions(currentModule ? currentModule[0] : {});
    const data1 = {
      page: 1,
      limit: 100,
      search: "",
      sortby: {
        created: -1
      }
    };
    const config1 = {
      url: API_URL + "/vertical/list", //URL
      method: "post", //Method
      data: data1,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config1)
      .then(response => {
        console.log("Verticals", response);
        setVerticals(response.data.data.list);
      })
      .catch(error => {
        ////console.log("BuyerVerticalsserror", error);
        if (error.message == "Request failed with status code 401") {
          logoutidle();
        }
        alert("BuyerVerticals", error.response.data.error.sqlMessage);
      });
    //to get details of buyerroute based on routeid
    const config = {
      url: API_URL + `/broutes/detail/${id}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        setBuyerRoute(response.data.data);
        console.log("BuyerRoute=======================", response.data.data[0]);
        global.selectedfilters1 = [];
        global.selectedstatus = [];
        ////console.log(
        // "BuyerRouteSettings=******88888888888",
        // response.data.data[0]["route_settings"][0]
        //);
        ////console.log("VerticalidEdit", response.data.data[0].vertical_id);
        setName(response.data.data[0].name);
        setDesc(response.data.data[0].desc);
        setUrl(response.data.data[0].post_url);
        setPingUrl(response.data.data[0].ping_url);
        setPingId(response.data.data[0].ping_id_key);
        setMethod(response.data.data[0].method);
        setPrice(response.data.data[0].price);
        setNoOfLeads(response.data.data[0].no_of_leads);
        setPickerValue(response.data.data[0].vertical_id);
        setPickerName(response.data.data[0].vertical_name);
        showVerticals(response.data.data[0].vertical_id);
        setPriceType(response.data.data[0].price_type);
        setFileData(response.data.data[0].post_payload_data);
        localStorage.setItem("postfd", response.data.data[0].post_payload_data);
        setSuccess(response.data.data[0].success_key);
        setFailure(response.data.data[0].failure_key);
        setBuyerId(response.data.data[0].buyer_id);
        setToggle(response.data.data[0].vertical_buyer_active);
        setRadioStatus(response.data.data[0].payload_format);
        if(response.data.data[0].ping_payload_data==""){
          setPingFileData(null)
        }
        else{
        setPingFileData(response.data.data[0].ping_payload_data);
        }
        if(response.data.data[0].post_payload_data==""){
          setPostFileData(null)
        }
        else{
        setPostFileData(response.data.data[0].post_payload_data);
        }
        if (response.data.data[0].method === "post") {
          setMappedKeys(response.data.data[0].mapped_keys_post);
        } else {
          setPingPostMappedKeys(response.data.data[0].mapped_keys_post);
        }
        setPingMappedKeys(response.data.data[0].mapped_keys_ping);

        pfile = response.data.data[0].post_payload_data;
        var i = 0;
        var j = 0;
        for (i = 0; i < response.data.data[0]["route_settings"].length; i++) {
          ////console.log("inside for loop");
          // to push into paramData array
          if (
            response.data.data[0]["route_settings"][i].category === "params"
          ) {
            ////console.log("inside if loop params");
            paramData.push(response.data.data[0]["route_settings"][i]);
          }
          // condition to push into bodyData array
          if (response.data.data[0]["route_settings"][i].category === "body") {
            bodyData.push(response.data.data[0]["route_settings"][i]);
          }
          //  to push into headerData array
          if (
            response.data.data[0]["route_settings"][i].category === "header"
          ) {
            headerData.push(response.data.data[0]["route_settings"][i]);
          }
          //to push into authData array
          if (response.data.data[0]["route_settings"][i].category === "auth") {
            authData.push(response.data.data[0]["route_settings"][i]);
          }
          if (
            response.data.data[0]["route_settings"][i].category === "pingparams"
          ) {
            ////console.log("inside if loop params");
            pingData.push(response.data.data[0]["route_settings"][i]);
          }
          if (
            response.data.data[0]["route_settings"][i].category === "pingheader"
          ) {
            ////console.log("inside if loop params");
            pingHeaderData.push(response.data.data[0]["route_settings"][i]);
          }
          if (
            response.data.data[0]["route_settings"][i].category === "pingbody"
          ) {
            ////console.log("inside if loop params");
            pingBodyData.push(response.data.data[0]["route_settings"][i]);
          }
          if (
            response.data.data[0]["route_settings"][i].category === "pingauth"
          ) {
            ////console.log("inside if loop params");
            pingAuthData.push(response.data.data[0]["route_settings"][i]);
          }
        }
        for (j = 0; j < response.data.data[0]["route_filters"].length; j++) {
          if (
            response.data.data[0]["route_filters"][j].category === "filters"
          ) {
            filterverticalsfields.push(
              response.data.data[0]["route_filters"][j]
            );
            filterkeys.push(response.data.data[0]["route_filters"][j].key);
          }
          if (
            response.data.data[0]["route_filters"][j].category === "formats"
          ) {
            if (
              response.data.data[0]["route_filters"][j].key === "dateofbirth"
            ) {
              formats[0].value =
                response.data.data[0]["route_filters"][j].value;
              formats[0].map_field =
                response.data.data[0]["route_filters"][j].map_field;
              setFormats(formats);
            }
            if (response.data.data[0]["route_filters"][j].key === "time") {
              formats[1].value =
                response.data.data[0]["route_filters"][j].value;
              formats[1].map_field =
                response.data.data[0]["route_filters"][j].map_field;
              setFormats(formats);
            }
            if (response.data.data[0]["route_filters"][j].key === "date") {
              formats[2].value =
                response.data.data[0]["route_filters"][j].value;
              formats[2].map_field =
                response.data.data[0]["route_filters"][j].map_field;
              setFormats(formats);
            }
            if (response.data.data[0]["route_filters"][j].key === "phone") {
              formats[3].value =
                response.data.data[0]["route_filters"][j].value;
              formats[3].map_field =
                response.data.data[0]["route_filters"][j].map_field;
              setFormats(formats);
            }
            if (
              response.data.data[0]["route_settings"][i].category === "payload"
            ) {
              ////console.log("inside if loop params");
              if (response.data.data[0].method == "post") {
                xmlpost.push(response.data.data[0]["route_settings"][i]);
              } else {
                pingpostxmlpost.push(
                  response.data.data[0]["route_settings"][i]
                );
              }
            }
            if (
              response.data.data[0]["route_settings"][i].category ===
              "pingpayload"
            ) {
              ////console.log("inside if loop params");

              pingxmlpost.push(response.data.data[0]["route_settings"][i]);
            }
          }
        }

        if (response.data.data[0].payload_format === "json") {
          if (response.data.data[0].payload_format === "json") {
            if (response.data.data[0].method === "ping-post") {
              if (response.data.data[0].ping_payload_data) {
                setPingFileData(response.data.data[0].ping_payload_data);
              }
              if (response.data.data[0].p_payload_data) {
                setPostFileData(response.data.data[0].post_payload_data);
              }
              var jsonxml = require("jsontoxml");

              var xmlconv = jsonxml(response.data.data[0].post_payload_data);
              var XMLParser = require("react-xml-parser");
              var xml = new XMLParser().parseFromString(xmlconv);
              var xmlget = xml.getElementsByTagName("*");
              global.payloadpick = [];
              for (var i = 0; i < xmlget.length; i++) {
                xmlarray.push(xmlget[i].name);
                if (xmlget[i].children.length > 0) {
                  xmlindexarray.push(i);
                }
                global.payloadpick.push("");
              }
              setXmlState1(true);
              var jsonxml = require("jsontoxml");

              var xmlconv = jsonxml(response.data.data[0].ping_payload_data);
              var XMLParser = require("react-xml-parser");
              var xml1 = new XMLParser().parseFromString(xmlconv);
              var xmlget1 = xml.getElementsByTagName("*");
              global.payloadpick1 = [];
              for (var i = 0; i < xmlget1.length; i++) {
                xmlarray1.push(xmlget1[i].name);
                if (xmlget1[i].children.length > 0) {
                  xmlindexarray1.push(i);
                }
                global.payloadpick1.push("");
              }
              setXmlState2(true);
            } else {
              var jsonxml = require("jsontoxml");

              var xmlconv = jsonxml(response.data.data[0].post_payload_data);
              var XMLParser = require("react-xml-parser");
              var xml = new XMLParser().parseFromString(xmlconv);
              var xmlget = xml.getElementsByTagName("*");
              global.payloadpick = [];
              for (var i = 0; i < xmlget.length; i++) {
                xmlarray.push(xmlget[i].name);
                if (xmlget[i].children.length > 0) {
                  xmlindexarray.push(i);
                }
                global.payloadpick.push("");
              }
              setXmlState(true);
            }
          }
        }
        if (response.data.data[0].payload_format === "xml") {
          if (response.data.data[0].method === "ping-post") {
            if (response.data.data[0].ping_payload_data) {
              setPingFileData(response.data.data[0].ping_payload_data);
            }
            if (response.data.data[0].p_payload_data) {
              setPostFileData(response.data.data[0].post_payload_data);
            }

            var XMLParser = require("react-xml-parser");
            var xml = new XMLParser().parseFromString(
              response.data.data[0].ping_payload_data
            );
            var xmlget = xml.getElementsByTagName("*");
            global.payloadpick = [];
            for (var i = 0; i < xmlget.length; i++) {
              xmlarray.push(xmlget[i].name);
              if (xmlget[i].children.length > 0) {
                xmlindexarray.push(i);
              }
              ////console.log("XML IndexArray",xmlindexarray);

              global.payloadpick.push("");
            }
            var XMLParser1 = require("react-xml-parser");
            var xml1 = new XMLParser().parseFromString(
              response.data.data[0].post_payload_data
            );
            setXmlState1(true);
            ////console.log("XML+++++++", xml);
            ////console.log("XMLGET", xml.getElementsByTagName("*"));
            var xmlget1 = xml1.getElementsByTagName("*");
            global.payloadpick1 = [];
            for (var i = 0; i < xmlget1.length; i++) {
              xmlarray1.push(xmlget1[i].name);
              if (xmlget1[i].children.length > 0) {
                xmlindexarray1.push(i);
              }
              ////console.log("XML IndexArray",xmlindexarray);

              global.payloadpick1.push("");
            }
            setXmlState2(true);
          } else {
            var XMLParser = require("react-xml-parser");
            var xml = new XMLParser().parseFromString(
              response.data.data[0].post_payload_data
            );
            var xmlget = xml.getElementsByTagName("*");
            global.payloadpick = [];
            for (var i = 0; i < xmlget.length; i++) {
              xmlarray.push(xmlget[i].name);
              if (xmlget[i].children.length > 0) {
                xmlindexarray.push(i);
              }
              ////console.log("XML IndexArray",xmlindexarray);

              global.payloadpick.push("");
            }
            setXmlState(true);
          }

          ////console.log("xmlarray", xmlarray);
        }
      })
      .catch(error => {
        ////console.log("BuyerRoutegeterror", error);
        // alert("Error in getting Buyer route", error.response.data.error.sqlMessage)
      });
  }, []);
  //To open model
  const openModal = () => {
    setOpen(true);
  };
  // To close Create Model
  const closeModal = () => {
    setOpen(false);
  };
  const openResModal = () => {
    setResOpen(true);
  };
  // To close Create Model
  const closeResModal = () => {
    setResOpen(false);
  };
  const selectedinput = (a, b) => {
    let temp = [];
    temp = [...verticalsfieldsfilters];
    temp[a] = b;
    verticalsfieldsfilters[a] = b;
    console.log("Global.selected", global.selectedfilters1);
    setVerticalsFieldsFilters(temp);
  };
  const selectedinput1 = (a, b) => {
    let temp = [];
    temp = [...filterverticalsfields];
    temp[a] = b;
    filterverticalsfields[a] = b;
    console.log("Global.selected", global.selectedfilters1);
    setFilterVerticalsFields(temp);
  };
  //Function to handle FIle Picker
  const handleChangeFile = file => {
    var reader = new FileReader();
    reader.onload = function(event) {
      // The file's text will be printed here
      ////console.log("Hello", event.target.result);
      // setXmlIndexArray(event.target.result)
      if (method === "post") setFileData(event.target.result);
      if (xmlpingstatus === "ping") {
        setPingFileData(event.target.result);
      }
      if (xmlpingstatus === "post") {
        setPostFileData(event.target.result);
      }
      if (radiostatus === "xml") {
        if (method === "ping-post") {
          if (xmlpingstatus === "ping") {
            var XMLParser = require("react-xml-parser");
            var xml = new XMLParser().parseFromString(event.target.result);
            var xmlget = xml.getElementsByTagName("*");
            global.payloadpick = [];
            for (var i = 0; i < xmlget.length; i++) {
              xmlarray.push(xmlget[i].name);
              if (xmlget[i].children.length > 0) {
                xmlindexarray.push(i);
              }
              global.payloadpick.push("");
            }
            setXmlState1(true);
          }
          if (xmlpingstatus === "post") {
            var XMLParser = require("react-xml-parser");
            var xml1 = new XMLParser().parseFromString(event.target.result);

            ////console.log("XML+++++++", xml);
            ////console.log("XMLGET", xml.getElementsByTagName("*"));
            var xmlget1 = xml1.getElementsByTagName("*");
            global.payloadpick1 = [];
            for (var i = 0; i < xmlget1.length; i++) {
              xmlarray1.push(xmlget1[i].name);
              if (xmlget1[i].children.length > 0) {
                xmlindexarray1.push(i);
              }
              ////console.log("XML IndexArray",xmlindexarray);

              global.payloadpick1.push("");
            }
            setXmlState2(true);
          }
        }

        if (method === "post") {
          var XMLParser = require("react-xml-parser");
          var xml = new XMLParser().parseFromString(event.target.result);

          ////console.log("XML+++++++", xml);
          ////console.log("XMLGET", xml.getElementsByTagName("*"));
          var xmlget = xml.getElementsByTagName("*");
          global.payloadpick = [];
          for (var i = 0; i < xmlget.length; i++) {
            xmlarray.push(xmlget[i].name);
            if (xmlget[i].children.length > 0) {
              xmlindexarray.push(i);
            }
            ////console.log("XML IndexArray",xmlindexarray);

            global.payloadpick.push("");
          }
          setXmlState(true);
        }

        ////console.log("xmlarray", xmlarray);
      }
      if (radiostatus === "json") {
        if (method === "ping-post") {
          if (xmlpingstatus === "ping") {
            var jsonxml = require("jsonxml");
            var xmlconv = jsonxml(event.target.result);
            setPingFileData(xmlconv);
            var XMLParser = require("react-xml-parser");
            var xml = new XMLParser().parseFromString(xmlconv);
            var xmlget = xml.getElementsByTagName("*");
            global.payloadpick = [];
            for (var i = 0; i < xmlget.length; i++) {
              xmlarray.push(xmlget[i].name);
              if (xmlget[i].children.length > 0) {
                xmlindexarray.push(i);
              }
              global.payloadpick.push("");
            }
            setXmlState1(true);
          }
          if (xmlpingstatus === "post") {
            var jsonxml = require("jsonxml");
            var xmlconv = jsonxml(event.target.result);
            var XMLParser = require("react-xml-parser");
            setPostFileData(xmlconv);
            var xml1 = new XMLParser().parseFromString(xmlconv);
            var xmlget1 = xml1.getElementsByTagName("*");
            global.payloadpick1 = [];
            for (var i = 0; i < xmlget1.length; i++) {
              xmlarray1.push(xmlget1[i].name);
              if (xmlget1[i].children.length > 0) {
                xmlindexarray1.push(i);
              }
              global.payloadpick1.push("");
            }
            setXmlState2(true);
          }
        } else {
          var jsonxml = require("jsonxml");
          var xmlconv = jsonxml(event.target.result);
          setFileData(xmlconv);
          var XMLParser = require("react-xml-parser");
          var xml = new XMLParser().parseFromString(xmlconv);
          var xmlget = xml.getElementsByTagName("*");
          global.payloadpick = [];
          for (var i = 0; i < xmlget.length; i++) {
            xmlarray.push(xmlget[i].name);
            if (xmlget[i].children.length > 0) {
              xmlindexarray.push(i);
            }
            global.payloadpick.push("");
          }
          setXmlState(true);
        }
      }
    };
    reader.readAsText(file);
  };
  //Function to handle Edit of textarea
  const handleChangeEdit = value => {
    let data1;
    data1 = value;

    setFileData(data1);
    ////console.log(filedata);
  };

  //Function to get Vertical fields
  const showVerticals = value => {
    ////console.log("id", value);
    const data = {
      page: 1,
      limit: 100,
      search: "",
      sortby: {
        created: -1
      }
    };
    const config2 = {
      url: API_URL + `/vertical/fieldlist/${value}`,
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config2)
      .then(response => {
        global.verttoggle = [];
        for (var i = 0; i < response.data.data.list.length; i++) {
          global.verttoggle.push(1);
          verticalsfieldsfilters.push({
            key: response.data.data.list[i].name,
            value: "",
            match: "exact",
            allow: 1
          });
        }
        let temp1 = [];
        temp1 = verticalsfieldsfilters.filter(item => {
          if (!filterkeys.includes(item.key)) {
            return item;
          }
        });
        setVerticalsFieldsFilters(temp1);
        console.log(
          "Verticalsfields===================>",
          response.data.data.list
        );
        setVerticalsFields(response.data.data.list);
      })
      // Error handling
      .catch(error => {
        //console.log("VerticalFieldslisterror", error);
        // window.alert(error.response.data.error.message);
      });
  };

  return (
    <Router>
      <div
        className="createBuyerRoute editbuyerroute_extraclass"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#F3F4F7",
          marginTop: "1rem",
          marginBottom: "40px"
        }}
      >
        <div className="createBuyerRoute_inner">
          <div className="page_heading route_buyerRoute_page_heading">
            <div
              className="back_buy_contact"
              onClick={() => {
                history.goBack();
              }}
            >
              <IoIosArrowBack />
            </div>
            <div className="page_heading_name">Edit Buyer Route</div>
          </div>

          <div className="body_inner_section01">
            <div className="edit_row1_main">
              <div className="box_head_route">
                <p>Route Details</p>
              </div>
              <Row>
                <Col xl={6} lg={6}>
                  <div className="select_top_div">
                    <div class="border009">
                      <h1>Name</h1>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        id="createBuyerName"
                        class="form-control"
                        onChange={event => buyer_route_name(event.target.value)}
                      />
                      {validname == true ? (
                        <div>
                          <p>Enter Name</p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>

                  <div class="border009">
                    <h1>Select Vertical</h1>
                    <select
                      className="select_top"
                      value={pickervalue}
                      onChange={event => {
                        setPickerValue(event.target.value);
                        showVerticals(event.target.value);
                      }}
                    >
                      <option>Select Vertical</option>
                      {verticals &&
                        verticals.map((item, a) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                    </select>
                  </div>

                  <div class="border009">
                    <h1>URL</h1>
                    <input
                      type="text"
                      name="url"
                      value={url}
                      id="createBuyerUrl"
                      class="form-control"
                      onChange={event => buyer_route_url(event.target.value)}
                    />
                    {vurl == true ? (
                      <div className="email_err">
                        <p>Enter Url</p>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </Col>

                <Col xl={6} lg={6}>
                  <div className="createBuyerRoute_toggle">
                    <div className="campaignStatusDiv">
                      <label>Buyer Status:</label>

                      <div className="on_create">
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
                          value={toggle}
                          onToggle={e => {
                            setToggle(!toggle);
                          }}
                        />
                      </div>

                      <div>
                        {toggle == true ? (
                          <div className="active_green">
                            <p>Active</p>
                          </div>
                        ) : (
                          <div className="active_red">
                            <p>Inactive</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="border009 border009EditBuyerDesc">
                    <h1>Description</h1>
                    <textarea
                      name="desc"
                      value={desc}
                      id="createBuyerDesc"
                      class="form-control"
                      onChange={event => buyer_route_desc(event.target.value)}
                    />
                    {validdesc == true ? (
                      <div className="email_err">
                        <p>Enter Description</p>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </Col>
              </Row>
            </div>

            <div className="edit_row1_main1">
              <div className="box_head_route">
                <p>Route Configuration</p>
              </div>
              <Row>
                <Col xl={6} lg={6}>
                  <div class="border009">
                    <h1>Method</h1>
                    <select
                      className="select_top"
                      value={method}
                      onChange={event => {
                        setMethod(event.target.value);
                        console.log("Hello");
                      }}
                    >
                      <option value="post">Post</option>
                      <option value="ping-post">Ping-Post</option>
                    </select>
                  </div>
                  {method === "ping-post" && (
                    <div>
                      <div class="border009">
                        <h1>Ping URL</h1>
                        <input
                          type="text"
                          name="noofleads"
                          value={pingurl}
                          id="createBuyerLeads"
                          class="form-control"
                          onChange={event => setPingUrl(event.target.value)}
                        />

                        {vurl == true ? (
                          <div className="email_err">
                            <p>Enter Ping Url</p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                  )}

                  <div class="border009">
                    <h1>Limit Leads (per day)</h1>
                    <input
                      type="text"
                      name="noofleads"
                      value={noofleads}
                      id="createBuyerLeads"
                      class="form-control"
                      onChange={event =>
                        buyer_route_noofleads(event.target.value)
                      }
                    />
                    {vnoofleads == true ? (
                      <div className="email_err">
                        <p>Enter No Of Leads</p>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                  <div class="border009">
                    <h1>Lead Limit Type</h1>
                    <select
                      className="select_top"
                      value={deliverytype}
                      onChange={event => setDeliveryType(event.target.value)}
                    >
                      <option>hourly</option>
                      <option>daily</option>
                      <option>weekly</option>
                      <option>monthly</option>
                      <option>yearly</option>
                    </select>
                  </div>
                  <div class="border009">
                    <h1>Payment Type</h1>
                    <select
                      value={pricetype}
                      className="select_top"
                      onChange={event =>
                        buyer_route_pricetype(event.target.value)
                      }
                    >
                      <option>Percentage</option>
                      <option>Amount</option>
                    </select>
                    {vpricetype == true ? (
                      <div className="email_err">
                        <p>Enter PriceType</p>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </Col>
                <Col xl={6} lg={6}>
                  <div className="right_block_divs">
                    <div class="border009 border009EditBuyerResponse border009CreateBuyerResponse123_edit">
                      <h1>Response:</h1>
                      <div className="right_block_div_inner next-int">
                        <input
                          type="text"
                          name="url"
                          value={success}
                          placeholder="Success"
                          onChange={event =>
                            buyer_route_success(event.target.value)
                          }
                        />
                        <span className="info_success">
                          <IoMdInformationCircle
                            onClick={() => {
                              openResModal();
                            }}
                          />
                        </span>

                        <Modal isOpen={resopen} className="route_edit_mod1">
                          <div
                            className="buyers_createBuyers_closetest12"
                            onClick={() => {
                              closeResModal(false);
                            }}
                          >
                            <IoIosClose />
                          </div>

                          <p className="modalp">
                            Response:
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              "result":
                            </span>
                            "failed","price":"0.00","msg":"Invalid
                            Request","errors":["error":"Invalid Request"]
                          </p>
                        </Modal>
                        {vsuccess == true ? (
                          <div className="email_err">
                            <p>Enter success response</p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                        <input
                          type="text"
                          name="url"
                          value={failure}
                          placeholder="Failure"
                          onChange={event =>
                            buyer_route_failure(event.target.value)
                          }
                        />
                        <span className="info_success1">
                          <IoMdInformationCircle
                            onClick={() => {
                              openResModal();
                            }}
                          />
                        </span>
                        {vfailure == true ? (
                          <div className="email_err">
                            <p>Enter Failure Response</p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>

                      {method == "ping-post" && (
                        <input
                          className="right_block_divs_input"
                          type="text"
                          //  id="createBuyerUrl"
                          name="Ping id"
                          placeholder="Ping ID"
                          value={pingid}
                          onChange={event => setPingId(event.target.value)}
                        />
                      )}
                      {vnoofleads == true ? (
                        <div className="email_err">
                          <p>Enter PingID</p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                  <div className="price_type_div">
                    <div class="border009">
                      <h1>{pricetype}</h1>
                      <input
                        type="text"
                        name="price"
                        value={price}
                        id="createBuyerPrice"
                        class="form-control"
                        onChange={event =>
                          buyer_route_price(event.target.value)
                        }
                      />
                      {vprice == true ? (
                        <div className="email_err">
                          <p>Enter Price</p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <Modal isOpen={filterstatus} style={customStyles}>
              <div
                className="buyers_createBuyers_closetest1234"
                onClick={() => {
                  setFilterStatus(false);
                }}
              >
                <IoIosClose />
              </div>
              <div className="scroll_test">
                <div>
                  {filterverticalsfields &&
                    filterverticalsfields.map((item, index) => (
                      <div className="test_route">
                        <div className="test_key">{item.key}</div>
                        <div key={index} className="test_input">
                          <input
                            type="text"
                            placeholder="Test"
                            value={item.value}
                            onChange={e => {
                              selectedinput1(index, {
                                key: item.key,
                                value: e.target.value,
                                allow: item.allow ? 1 : 0,
                                match: item.match
                              });
                            }}
                          />
                        </div>
                        <ToggleButton
                          key={index}
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
                          value={item.allow}
                          onToggle={e => {
                            selectedinput1(index, {
                              key: item.key,
                              value: item.value,
                              allow: item.allow ? 0 : 1,
                              match: item.match
                            });
                          }}
                        />

                        <select
                          className="select_top"
                          value={item.match}
                          onChange={event => {
                            verticalToggle(index, {
                              key: item.key,
                              value: item.value,
                              allow: item.allow,
                              match: event.target.value
                            });
                          }}
                        >
                          <option value="exact">Exact</option>
                          <option value="contains">Contains</option>
                        </select>
                      </div>
                    ))}
                </div>

                {verticalsfieldsfilters &&
                  verticalsfieldsfilters.map((item, index) => (
                    <div className="test_route">
                      <div className="test_key">
                        <p>{item.key}:</p>
                      </div>
                      <div className="test_input">
                        <input
                          type="text"
                          placeholder="Test"
                          value={item.value}
                          onChange={e => {
                            selectedinput(index, {
                              key: item.key,
                              value: e.target.value,
                              allow: item.allow ? 1 : 0,
                              match: item.match
                            });
                          }}
                        />
                      </div>
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
                        value={item.allow}
                        onToggle={e => {
                          selectedinput(index, {
                            key: item.key,
                            value: item.value,
                            allow: item.allow ? 0 : 1,
                            match: item.match
                          });
                        }}
                      />

                      <select
                        className="select_top"
                        value={item.match}
                        onChange={event => {
                          verticalToggle(index, {
                            key: item.key,
                            value: item.value,
                            allow: item.allow,
                            match: event.target.value
                          });
                        }}
                      >
                        <option value="exact">Exact</option>
                        <option value="contains">Contains</option>
                      </select>
                    </div>
                  ))}
              </div>
              <div className="buyers_create_btn_divtest">
                <div>
                  <button
                    className="buyers_create_btn"
                    onClick={() => {
                      let a = [];
                      a = verticalsfieldsfilters.filter(item => {
                        if (item.value != "") {
                          return item;
                        }
                      });

                      setFilterData([...filterverticalsfields, ...a]);

                      console.log("Filterdata", filterData, [
                        ...filterverticalsfields,
                        ...a
                      ]);
                      setFilterStatus(false);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Modal>

            <div className="edit_row1_main1">
              <div className="box_head_route">
                <p>Data Formats</p>
              </div>

              <div className="border009122_ayi">
                <table
                  id="dtBasicExample"
                  class="table table-striped12 table-sm table_buy_con12_edit"
                  cellspacing="0"
                >
                  <thead>
                    <tr
                      style={{
                        color: "#484393",
                        fontWeight: "bolder",
                        fontSize: 20
                      }}
                    >
                      {/* lead id*/}
                      <th class="th-sm extra_class">
                        <div className="first_div">
                          Format Name
                          <div className="svg_grid"></div>
                        </div>
                      </th>
                      {/* lead date*/}
                      <th class="th-sm extra_class">
                        <div className="first_div">
                          Select Value
                          <div className="svg_grid"></div>
                        </div>
                      </th>
                      <th class="th-sm extra_class">
                        <div className="first_div">
                          Custom Value
                          <div className="svg_grid"></div>
                        </div>
                      </th>
                      {/* lead details */}
                      <th class="th-sm extra_class">
                        <div className="first_div12">
                          Select Field
                          <div className="svg_grid"></div>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="text_center_buyroute">
                        <div className="buy_dob">
                          <p> Date of Birth</p>
                        </div>
                      </td>
                      <td className="td_buy_con1">
                        <select
                          className="priceType_select0059formatss"
                          value={formats[0].value}
                          onChange={event => {
                            dataformats(0, {
                              key: "dateofbirth",
                              value: event.target.value,
                              map_field: formats[0].map_field
                            });
                          }}
                        >
                          <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                          <option value="Y">YEARS</option>
                        </select>
                      </td>
                      <td className="td_buy_con1x">
                        <div class="md-form md-outline create_buy_no_data11_edit">
                          <div class="border009 border009_ex1">
                            <h1> Date of Birth</h1>
                            <input
                              type="text"
                              // id="email_id002a_12ab"
                              className="form-control buyer_popup_field"
                              value={formats[0].value}
                              onChange={e => {
                                dataformats(0, {
                                  key: "dateofbirth",
                                  value: e.target.value,
                                  map_field: formats[0].map_field
                                });
                              }}
                            />
                          </div>
                        </div>{" "}
                      </td>
                      <td className="td_buy_con1x">
                        {/* <div className="buy_dob1_select"> */}
                        <select
                          id="selectBox"
                          className="priceType_select priceType_select0059formatsx12"
                          value={formats[0].map_field}
                          onChange={event => {
                            dataformats(0, {
                              key: "dateofbirth",
                              value: formats[0].value,
                              map_field: event.target.value
                            });
                            console.log(
                              Object.assign(convData, {
                                ["DateofBirth"]: [
                                  dateformat,
                                  event.target.value
                                    ? event.target.value
                                    : dateofbirthvertfield
                                ]
                              })
                            );
                          }}
                        >
                          <option>Select</option>
                          {verticalsfields &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                        {/* </div> */}
                      </td>
                    </tr>
                    <tr>
                      <td className="text_center_buyroute">
                        <div className="buy_dob">
                          <p>Time</p>
                        </div>
                      </td>
                      <td className="td_buy_con1">
                        <select
                          className="priceType_select0059formatss"
                          value={formats[1].value}
                          onChange={e => {
                            dataformats(1, {
                              key: "time",
                              value: e.target.value,
                              map_field: formats[1].map_field
                            });
                          }}
                        >
                          <option>HH-MM-SS</option>
                          <option>SS-MM-HH</option>
                        </select>
                      </td>
                      <td>
                        <div class="md-form md-outline create_buy_no_data11_edit">
                          <div class="border009 border009_ex1">
                            <h1> Time Format</h1>
                            <input
                              type="text"
                              // id="email_id002a_12ab"
                              className="form-control buyer_popup_field"
                              value={formats[1].value}
                              onChange={e => {
                                dataformats(1, {
                                  key: "time",
                                  value: e.target.value,
                                  map_field: formats[1].map_field
                                });
                              }}
                            />
                          </div>
                        </div>{" "}
                      </td>
                      <td>
                        {/* <div className="buy_dob1_select"> */}

                        <select
                          id="selectBox"
                          value={formats[1].map_field}
                          className="priceType_select priceType_select0059formatsx12"
                          onChange={event => {
                            dataformats(1, {
                              key: "time",
                              value: formats[1].value,
                              map_field: event.target.value
                            });
                          }}
                        >
                          <option>Select</option>
                          {verticalsfields &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <td className="text_center_buyroute">
                        <div className="buy_dob">
                          <p> Date</p>
                        </div>
                      </td>
                      <td className="td_buy_con1">
                        <select
                          className="priceType_select0059formatss"
                          value={formats[2].value}
                          onChange={e => {
                            dataformats(2, {
                              key: "date",
                              value: e.target.value,
                              map_field: formats[2].map_field
                            });
                          }}
                        >
                          <option>MM-DD-YYYY</option>
                          <option>DD-MM-YYYY</option>
                        </select>
                      </td>
                      <td>
                        <div class="md-form md-outline create_buy_no_data11_edit">
                          <div class="border009 border009_ex1">
                            <h1>Date</h1>
                            <input
                              type="text"
                              // id="email_id002a_12ab"
                              className="form-control buyer_popup_field"
                              value={formats[2].value}
                              onChange={e => {
                                dataformats(2, {
                                  key: "date",
                                  value: e.target.value,
                                  map_field: formats[2].map_field
                                });
                              }}
                            />
                          </div>
                        </div>{" "}
                        {/* </div> */}
                      </td>
                      <td>
                        <select
                          id="selectBox"
                          className="priceType_select priceType_select0059formatsx12"
                          value={formats[2].map_field}
                          onChange={event => {
                            dataformats(2, {
                              key: "date",
                              value: formats[2].value,
                              map_field: event.target.value
                            });
                          }}
                        >
                          <option>Select</option>
                          {verticalsfields &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="text_center_buyroute">
                        <div className="buy_dob">
                          <p>Phone</p>
                        </div>
                      </td>
                      <td className="td_buy_con1">
                        <select
                          className="priceType_select0059formatss"
                          value={formats[3].value}
                          onChange={e => {
                            dataformats(3, {
                              key: "phone",
                              value: e.target.value,
                              map_field: formats[3].map_field
                            });
                          }}
                        >
                          <option>9090909090</option>
                          <option>(999)-(999)-(00000)</option>
                        </select>
                      </td>
                      <td>
                        <div class="md-form md-outline create_buy_no_data11_edit">
                          <div class="border009 border009_ex1">
                            <h1>Phone</h1>
                            <input
                              type="text"
                              // id="email_id002a_12ab"
                              className="form-control buyer_popup_field"
                              value={formats[3].value}
                              onChange={e => {
                                dataformats(3, {
                                  key: "phone",
                                  value: e.target.value,
                                  map_field: formats[3].map_field
                                });
                              }}
                            />
                          </div>
                        </div>{" "}
                      </td>
                      <td>
                        <select
                          id="selectBox"
                          className="priceType_select priceType_select0059formatsx12"
                          value={formats[3].map_field}
                          onChange={event => {
                            dataformats(3, {
                              key: "phone",
                              value: formats[3].value,
                              map_field: event.target.value
                            });
                          }}
                        >
                          <option>Select</option>
                          {verticalsfields &&
                            verticalsfields.map((item, a) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="edit_row1_main1_filters">
              <div className="box_head_route">
                <p>Data Filters</p>
              </div>

              <div className="table_scroll_buy12">
                <table
                  id="dtBasicExample"
                  class="table table-striped table-sm table_buy_con12 table_scroll_buy"
                  cellspacing="0"
                >
                  <thead>
                    <tr
                      style={{
                        color: "#484393",
                        fontWeight: "bolder",
                        fontSize: 20
                      }}
                    >
                      {/* lead id*/}
                      <th class="th-sm extra_class">
                        <div className="first_div">
                          Vertical Field
                          <div className="svg_grid"></div>
                        </div>
                      </th>
                      {/* lead date*/}
                      <th class="th-sm extra_class">
                        <div className="first_div">
                          Filter Value
                          <div className="svg_grid"></div>
                        </div>
                      </th>
                      <th class="th-sm extra_class">
                        <div className="first_div">
                          Filter Type
                          <div className="svg_grid"></div>
                        </div>
                      </th>
                      {/* lead details */}
                      <th class="th-sm extra_class">
                        <div className="first_div12">
                          Match Type
                          <div className="svg_grid"></div>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  {filterverticalsfields &&
                    filterverticalsfields.map((item, index) => (
                      <tbody class="buy_r_body12">
                        <tr>
                          <td>
                            <div className="text_center_buyroute">
                              {item.key}
                            </div>
                          </td>

                          <td className="td_buy_con1">
                            <div class="md-form md-outline create_buy_no_data11_edit12">
                              <div class="border009 border009_ex1">
                                <h1></h1>
                                <input
                                  type="text"
                                  // id="email_id002a_12ab"
                                  className="form-control buyer_popup_field"
                                  value={item.value}
                                  onChange={e => {
                                    selectedinput1(index, {
                                      key: item.key,
                                      value: e.target.value,
                                      allow: item.allow ? 1 : 0,
                                      match: item.match
                                    });
                                  }}
                                />
                              </div>
                            </div>{" "}
                          </td>
                          <td>
                            <div className="tog_butt1 tog_butt1_flex">
                              <p style={{ color: "red", marginRight: "2rem" }}>
                                Block
                              </p>
                              <ToggleButton
                                inactiveLabel={""}
                                activeLabel={""}
                                colors={{
                                  active: {
                                    base: "#9B9B9B"
                                  },
                                  inactive: {
                                    base: "#9B9B9B"
                                  }
                                }}
                                value={item.allow}
                                onToggle={e => {
                                  selectedinput1(index, {
                                    key: item.key,
                                    value: item.value,
                                    allow: item.allow ? 0 : 1,
                                    match: item.match
                                  });
                                }}
                              />
                              <p style={{ color: "green", marginLeft: "2rem" }}>
                                Allow
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="tog_butt12">
                              <select
                                className="select_top_create"
                                value={item.match}
                                onChange={event => {
                                  verticalToggle(index, {
                                    key: item.key,
                                    value: item.value,
                                    allow: item.allow,
                                    match: event.target.value
                                  });
                                }}
                              >
                                <option value="exact">Exact</option>
                                <option value="contains">Contains</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}

                  {verticalsfieldsfilters &&
                    verticalsfieldsfilters.map((item, index) => (
                      <tbody class="buy_r_body12">
                        <tr>
                          <td className="text_center_buyroute">{item.key}</td>
                          <td className="td_buy_con1">
                            <div class="md-form md-outline create_buy_no_data11_edit12">
                              <div class="border009 border009_ex1">
                                <h1></h1>
                                <input
                                  type="text"
                                  // id="email_id002a_12ab"
                                  className="form-control buyer_popup_field"
                                  value={item.value}
                                  onChange={e => {
                                    selectedinput(index, {
                                      key: item.key,
                                      value: e.target.value,
                                      allow: item.allow ? 1 : 0,
                                      match: item.match
                                    });
                                  }}
                                />
                              </div>
                            </div>{" "}
                          </td>
                          <td>
                            <div className="tog_butt1 tog_butt1_flex">
                              <p style={{ color: "red", marginRight: "2rem" }}>
                                Block
                              </p>
                              <ToggleButton
                                inactiveLabel={""}
                                activeLabel={""}
                                colors={{
                                  active: {
                                    base: "#9B9B9B"
                                  },
                                  inactive: {
                                    base: "#9B9B9B"
                                  }
                                }}
                                value={item.allow}
                                onToggle={e => {
                                  selectedinput(index, {
                                    key: item.key,
                                    value: item.value,
                                    allow: item.allow ? 0 : 1,
                                    match: item.match
                                  });
                                }}
                              />
                              <p style={{ color: "green", marginLeft: "2rem" }}>
                                Allow
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="tog_butt12">
                              <select
                                className="select_top_create"
                                value={item.match}
                                onChange={event => {
                                  verticalToggle(index, {
                                    key: item.key,
                                    value: item.value,
                                    allow: item.allow,
                                    match: event.target.value
                                  });
                                }}
                              >
                                <option value="exact">Exact</option>
                                <option value="contains">Contains</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
                {verticalsfields.length == 0 && (
                  <div
                    style={{
                      marginTop: "4.5rem",
                      color: "#484393",
                      textAlign: "center",
                      fontWeight: "400",
                      // marginBottom: "0px",
                      fontSize: "18px"
                    }}
                  >
                    <p>Select Vertical to Configure Filters</p>
                  </div>
                )}
              </div>

              <div className="buyers_create_btn_divtest">
                <div>
                  <button
                    className="buyers_create_btn_rout"
                    onClick={() => {
                      let a = [];
                      a = verticalsfieldsfilters.filter(item => {
                        if (item.value != "") {
                          return item;
                        }
                      });

                      setFilterData([...filterverticalsfields, ...a]);

                      console.log("Filterdata", filterData, [
                        ...filterverticalsfields,
                        ...a
                      ]);
                      setFilterStatus(false);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {(method == "post" && (postfiledata == null)) && (
              <div className="buyer_edit_box_f">
                <div className="box_head_route">
                  <p>Data Mapping</p>
                </div>
                <div>
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
                          setlead_butt4(false);
                        }}
                        className={
                          lead_butt1 == true ? "butt_true" : "butt_false"
                        }
                      >
                        Params
                      </button>
                      {localStorage.getItem("role") == 2 && (
                        <button
                          onClick={() => {
                            setteamMemb(true);
                            setpersonalDetails(false);
                            setlead_butt1(false);
                            setPayDetails(false);
                            setlead_butt2(true);
                            setlead_butt3(false);
                            setlead_butt4(false);
                          }}
                          className={
                            lead_butt2 == true ? "butt_true" : "butt_false"
                          }
                        >
                          Body
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setPayDetails(true);
                          setteamMemb(false);
                          setpersonalDetails(false);
                          setlead_butt1(false);
                          setlead_butt2(false);
                          setlead_butt3(true);
                          setlead_butt4(false);
                        }}
                        className={
                          lead_butt3 == true ? "butt_true" : "butt_false"
                        }
                      >
                        Header
                      </button>

                      <button
                        onClick={() => {
                          setPayDetails(true);
                          setteamMemb(false);
                          setpersonalDetails(false);
                          setlead_butt1(false);
                          setlead_butt2(false);
                          setlead_butt3(false);
                          setlead_butt4(true);
                        }}
                        className={
                          lead_butt4 == true ? "butt_true" : "butt_false"
                        }
                      >
                        Authorization
                      </button>
                    </div>
                  </div>
                  {lead_butt1 == true && (
                    <div>
                      {(method == "post" || method == "Post") && (
                        <div className="second_right_bottom_inner_F">
                          <div className="plus_buy_route">
                            <label className="label_head_br">Params</label>
                          </div>
                          <table
                            id="dtBasicExample"
                            class="table table-striped table-sm table_buy_con12_edit1"
                            cellspacing="0"
                          >
                            <thead>
                              <tr
                                style={{
                                  color: "#484393",
                                  fontWeight: "bolder",
                                  fontSize: 20
                                }}
                              >
                                {/* lead id*/}
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Buyer Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Map Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Actions
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                          </table>
                          {paramData.length > 0 && <div>{paramitems}</div>}
                          {paramstatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          value={paramkey}
                                          id="ekey1"
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_param_key(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel_edit">
                                        <select
                                          id="selectBox"
                                          className="priceType_select priceType_select0059 priceType_select0059_sel"
                                          value={paramdesc}
                                          // value={bodydesc}

                                          onChange={event => {
                                            // route_body_desc(event.target.value)
                                            //console.log(event.target.value);
                                            route_param_desc(
                                              event.target.value
                                            );
                                          }}
                                        >
                                          <option>Select</option>
                                          {verticalsfields &&
                                            verticalsfields.map((item, a) => (
                                              <option value={item.name}>
                                                {item.name}
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle1}
                                          onToggle={e => {
                                            setToggle1(!toggle1);
                                            setParamStatus(false);
                                            setDefaultParamKeyStatus(true);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setParamStatus(true);
                                    getParam();
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                          {defaultparamkeystatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          id="key11"
                                          value={paramkey}
                                          onChange={event =>
                                            route_param_key(event.target.value)
                                          }
                                          class="form-control input_borderless"
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                        <input
                                          type="text"
                                          name="value"
                                          class="form-control input_borderless"
                                          id="Mapfield111"
                                          value={paramdesc}
                                          onChange={event =>
                                            route_param_desc(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="form289"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle1}
                                          onToggle={e => {
                                            setToggle1(!toggle1);
                                            setParamStatus(true);
                                            setDefaultParamKeyStatus(false);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <p style={{ height: "1%" }} />
                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setDefaultParamKeyStatus(false);
                                    getDefaultParam();
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {lead_butt2 == true && (
                    <div>
                      {(method == "post" || method == "Post") && (
                        <div className="second_right_bottom_inner_F">
                          <div className="plus_buy_route">
                            <label className="label_head_br">Body</label>
                          </div>

                          <table
                            id="dtBasicExample"
                            class="table table-striped table-sm table_buy_con12_edit1"
                            cellspacing="0"
                          >
                            <thead>
                              <tr
                                style={{
                                  color: "#484393",
                                  fontWeight: "bolder",
                                  fontSize: 20
                                }}
                              >
                                {/* lead id*/}
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Buyer Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Map Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Actions
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                          </table>
                          {bodyData.length > 0 && <div>{bodyitems}</div>}
                          {bodystatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          class="form-control input_borderless"
                                          id="ekey2"
                                          value={bodykey}
                                          onChange={event =>
                                            route_body_key(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel_edit">
                                        <select
                                          id="selectBox"
                                          className="priceType_select priceType_select0059 priceType_select0059_sel"
                                          value={bodydesc}
                                          onChange={event => {
                                            route_body_desc(event.target.value);
                                          }}
                                        >
                                          <option>Select</option>
                                          {verticalsfields &&
                                            verticalsfields.map((item, a) => (
                                              <option value={item.name}>
                                                {item.name}
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle2}
                                          onToggle={e => {
                                            setToggle2(!toggle2);
                                            setBodyStatus(false);
                                            setDefaultKeyStatus(true);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setBodyStatus(true);

                                    getBody();
                                  }}
                                >
                                  Add
                                </button>
                              </div>

                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                          {defaultkeystatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          id="form212"
                                          value={bodykey}
                                          onChange={event =>
                                            route_body_key(event.target.value)
                                          }
                                          class="form-control input_borderless"
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                        <input
                                          type="text"
                                          name="value"
                                          class="form-control input_borderless"
                                          id="form289"
                                          value={bodydesc}
                                          onChange={event =>
                                            setBodyDesc(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="form289"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle2}
                                          onToggle={e => {
                                            setToggle2(!toggle2);
                                            setBodyStatus(true);
                                            setDefaultKeyStatus(false);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setBodyStatus(true);
                                    getDefaultBody();
                                    // setDefaultKeyStatus(false);
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {lead_butt3 == true && (
                    <div>
                      {(method == "post" || method == "Post") && (
                        <div className="second_right_bottom_inner_F ">
                          <div className="plus_buy_route">
                            <label className="label_head_br">Header</label>
                          </div>

                          <table
                            id="dtBasicExample"
                            class="table table-striped table-sm table_buy_con12_edit1"
                            cellspacing="0"
                          >
                            <thead>
                              <tr
                                style={{
                                  color: "#484393",
                                  fontWeight: "bolder",
                                  fontSize: 20
                                }}
                              >
                                {/* lead id*/}
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Buyer Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Map Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Actions
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                          </table>

                          {headerData.length > 0 && <div>{headeritems}</div>}
                          {headerstatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          id="ekey3"
                                          value={headerkey}
                                          onChange={event =>
                                            route_header_key(event.target.value)
                                          }
                                          class="form-control input_borderless"
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel_edit">
                                        <select
                                          id="selectBox"
                                          className="priceType_select priceType_select0059 priceType_select0059_sel"
                                          value={headerdesc}
                                          // value={bodydesc}

                                          onChange={event => {
                                            // route_body_desc(event.target.value)
                                            //console.log(event.target.value);
                                            route_header_desc(
                                              event.target.value
                                            );
                                          }}
                                        >
                                          <option>Select</option>
                                          {verticalsfields &&
                                            verticalsfields.map((item, a) => (
                                              <option value={item.name}>
                                                {item.name}
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle3}
                                          onToggle={e => {
                                            setToggle3(!toggle3);
                                            setHeaderStatus(false);
                                            setDefaultHeaderKeyStatus(true);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn_add"
                                  onClick={() => {
                                    getHeader();
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          )}
                          {defaultheaderkeystatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          id="form552"
                                          value={headerkey}
                                          onChange={event =>
                                            route_header_key(event.target.value)
                                          }
                                          class="form-control input_borderless"
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                        <input
                                          type="text"
                                          name="value"
                                          class="form-control input_borderless"
                                          id="form772"
                                          value={headerdesc}
                                          onChange={event =>
                                            route_header_desc(
                                              event.target.value
                                            )
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="form289"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle3}
                                          onToggle={e => {
                                            setToggle3(!toggle3);
                                            setHeaderStatus(true);
                                            setDefaultHeaderKeyStatus(false);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <p style={{ height: "1%" }} />

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setHeaderStatus(true);
                                    // setDefaultHeaderKeyStatus(false);
                                    getDefaultHeader();
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {lead_butt4 == true && (
                    <div>
                      {(method == "post" || method == "Post") && (
                        <div className="second_right_bottom_inner_F">
                          <div className="plus_buy_route">
                            <label className="label_head_br">
                              Authorization
                            </label>
                          </div>
                          <table
                            id="dtBasicExample"
                            class="table table-striped table-sm table_buy_con12_edit1"
                            cellspacing="0"
                          >
                            <thead>
                              <tr
                                style={{
                                  color: "#484393",
                                  fontWeight: "bolder",
                                  fontSize: 20
                                }}
                              >
                                {/* lead id*/}
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Buyer Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Map Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Actions
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                          </table>
                          {authData.length > 0 && <div>{authitems}</div>}
                          {authstatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          id="ekey4"
                                          value={authkey}
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_auth_key(event.target.value)
                                          }
                                          // id="ekey2"
                                          // value={bodykey}
                                          // onChange={event =>
                                          //   route_body_key(event.target.value)
                                          // }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel_edit">
                                        <select
                                          id="selectBox"
                                          className="priceType_select priceType_select0059 priceType_select0059_sel"
                                          value={headerdesc}
                                          onChange={event => {
                                            route_auth_desc(event.target.value);
                                          }}
                                        >
                                          <option>Select</option>
                                          {verticalsfields &&
                                            verticalsfields.map((item, a) => (
                                              <option value={item.name}>
                                                {item.name}
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle4}
                                          onToggle={e => {
                                            setToggle4(!toggle4);
                                            setAuthStatus(false);
                                            setDefaultAuthKeyStatus(true);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    getAuth();
                                  }}
                                >
                                  Add
                                </button>
                              </div>

                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                          {defaultauthkeystatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          id="form532"
                                          value={authkey}
                                          onChange={event =>
                                            route_auth_key(event.target.value)
                                          }
                                          class="form-control input_borderless"
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                        <input
                                          type="text"
                                          name="value"
                                          class="form-control input_borderless"
                                          id="form662"
                                          value={authdesc}
                                          onChange={event =>
                                            route_auth_desc(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="form289"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle4}
                                          onToggle={e => {
                                            setToggle4(!toggle4);
                                            setAuthStatus(true);
                                            setDefaultAuthKeyStatus(false);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <p style={{ height: "1%" }} />

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    getDefaultAuth();
                                  }}
                                >
                                  Add
                                </button>
                              </div>

                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {(  method == "post" && ( postfiledata!=null)) && (
              <Col lg={12} xl={12}>
                <div className="buyer_edit_box_f buyer_edit_box_fxe">
                  <div className="box_head_route">
                    <p>Data Mapping</p>
                  </div>
                  <div className="second_right_bottom second_right_bottom009"></div>

                  <p style={{ height: "2%" }} />
                  <div className="upload_sec_extraclass">
                    <div className="upload_sec_extra upload_sec0001 upload_sec_extra_f">
                      <Col lg={12} xl={12}>
                        <div className="upload_div">
                          <div className="upload_div_inner">
                            <p>
                              Select a file type to upload your sample post data
                            </p>
                            <select
                              value={radiostatus}
                              onChange={event => {
                                setRadioStatus(event.target.value);
                              }}
                            >
                              <option value="xml">XML</option>
                              <option value="json">JSON</option>
                            </select>
                            <input
                              type="file"
                              onClick={() => {
                                setXmlArray([]);
                                setXmlIndexArray([]);
                                setPayloadPick([]);
                                setXmlState(false);
                              }}
                              onChange={e =>
                                handleChangeFile(e.target.files[0])
                              }
                            />
                            <p style={{ height: "3%" }} />
                            <div
                              style={{
                                height: "30px",
                                background: "#000",
                                color: "#fff",
                                marginBottom: "0px",
                                padding: "6px",
                                display: "flex",
                                justifyContent: "space-between",
                                borderRadius: "5px 5px 0 0 "
                              }}
                            >
                              <div>
                                Paste sample post data and map the fields
                              </div>
                              <div>
                                {" "}
                                <Help
                                  onClick={() => {
                                    openModal();
                                  }}
                                />{" "}
                              </div>
                              <Modal
                                isOpen={open}
                                style={customStyles}
                                contentLabel="Example Modal"
                              >
                                <div
                                  className="close_img_div"
                                  onClick={() => closeModal()}
                                >
                                  <IoIosClose />
                                </div>
                                {verticalsfields.map((item, a) => (
                                  <p>#{item.name}#</p>
                                ))}
                              </Modal>
                            </div>
                            <textarea
                              rows="10"
                              cols="20"
                              style={{
                                backgroundColor: "#333",
                                color: "white",
                                border: "none",
                                borderRadius: "0 0 5px 5px"
                              }}
                              value={filedata}
                              onChange={e => handleChangeEdit(e.target.value)}
                            />
                          </div>
                        </div>
                      </Col>
                    </div>
                  </div>
                  <div className="xml_class01">
                    <table
                      id="dtBasicExample"
                      class="table table-striped table-sm"
                      cellspacing="0"
                    >
                      <thead>
                        <tr
                          style={{
                            color: "#484393",
                            fontWeight: "bolder",
                            fontSize: 20
                          }}
                        >
                          <th>Group</th>
                          <th>Buyer Field</th>
                          <th>Map Field</th>
                        </tr>
                      </thead>
                      <tbody>
                        {xmlstate &&
                          xmlarray.map((item, index) =>
                            !xmlindexarray.includes(index) &&
                            item.toUpperCase().replace(/-|_/g, "") !==
                              "campaignid".toUpperCase() &&
                            item.toUpperCase().replace(/-|_/g, "") !==
                              "accesstoken".toUpperCase() &&
                            item.toUpperCase().replace(/-|_/g, "") !==
                              "accesskey".toUpperCase() ? (
                              <tr>
                                <td>
                                  <p></p>
                                </td>
                                <td>
                                  <p>{item}</p>
                                </td>
                                <td>
                                  <select
                                    className="xml_select_buyer_route"
                                    value={payloadpick[index]}
                                    onChange={event => {
                                      payloadFile(index, event.target.value);
                                      console.log(
                                        Object.assign(mappedKeys, {
                                          [item]:
                                            "#" +
                                            verticalsfields[event.target.value]
                                              .name +
                                            "#"
                                        })
                                      );

                                      xmlpost.push({
                                        default: 0,
                                        key: item,
                                        datatype:
                                          verticalsfields[event.target.value]
                                            .datatype,
                                        required: "Yes",
                                        map_field:
                                          verticalsfields[event.target.value]
                                            .name
                                      });
                                    }}
                                  >
                                    <option label="select" />
                                    {verticalsfields.map((item, key) => (
                                      <option label={item.name} value={key} />
                                    ))}
                                  </select>
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <td>
                                  <p>{item}</p>
                                </td>
                                <td>
                                  <p></p>
                                </td>
                                <td>
                                  <p></p>
                                </td>
                              </tr>
                            )
                          )}
                      </tbody>
                    </table>

                    <table
                      id="dtBasicExample"
                      class="table table-striped table-sm"
                      cellspacing="0"
                    >
                      <thead>
                        <tr
                          style={{
                            color: "#484393",
                            fontWeight: "bolder",
                            fontSize: 20
                          }}
                        ></tr>
                      </thead>
                      <tbody>
                        {xmlstate2 &&
                          xmlarray1.map((item, index) =>
                            !xmlindexarray1.includes(index) &&
                            item.toUpperCase().replace(/-|_/g, "") !==
                              "campaignid".toUpperCase() &&
                            item.toUpperCase().replace(/-|_/g, "") !==
                              "accesstoken".toUpperCase() &&
                            item.toUpperCase().replace(/-|_/g, "") !==
                              "accesskey".toUpperCase() ? (
                              <tr>
                                <td>
                                  <p></p>
                                </td>
                                <td>
                                  <p>{item}</p>
                                </td>
                                <td>
                                  <select
                                    className="xml_select_buyer_route"
                                    value={payloadpick[index]}
                                    onChange={event => {
                                      payloadFile(index, event.target.value);
                                      console.log(
                                        Object.assign(mappedKeys, {
                                          [item]:
                                            "#" +
                                            verticalsfields[event.target.value]
                                              .name +
                                            "#"
                                        })
                                      );

                                      xmlpost.push({
                                        default: 0,
                                        key: item,
                                        datatype:
                                          verticalsfields[event.target.value]
                                            .datatype,
                                        required: "Yes",
                                        map_field:
                                          verticalsfields[event.target.value]
                                            .name
                                      });
                                    }}
                                  >
                                    <option label="select" />
                                    {verticalsfields.map((item, key) => (
                                      <option label={item.name} value={key} />
                                    ))}
                                  </select>
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <td>
                                  <p>{item}</p>
                                </td>
                                <td>
                                  <p></p>
                                </td>
                                <td>
                                  <p></p>
                                </td>
                              </tr>
                            )
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            )}
            {(method == "ping-post" && (pingfiledata == null)) && (
              <div>
                <p style={{ height: "1rem" }}></p>
                <div className="modal_tab_btns">
                  <button
                    onClick={() => {
                      setDialogDetails("ping");
                      //setPostCards(true);
                      setlead_butt5(true);
                      setlead_butt6(false);
                      console.log("Ping");
                      setParamStatus(true);
                      setBodyStatus(true);
                      setHeaderStatus(true);
                      setAuthStatus(true);
                    }}
                    className={lead_butt5 == true ? "butt_true" : "butt_false"}
                  >
                    Ping
                  </button>
                  <button
                    onClick={() => {
                      console.log("Post");
                      setDialogDetails("post");
                      //setPostCards(true);
                      setlead_butt6(true);
                      setlead_butt5(false);
                      setParamStatus(true);
                      setBodyStatus(true);
                      setHeaderStatus(true);
                      setAuthStatus(true);
                    }}
                    className={lead_butt6 == true ? "butt_true" : "butt_false"}
                  >
                    Post
                  </button>
                </div>

                <div className="second_right_bottom">
                  <div className="">
                    {dialogdetails == "post" && (
                      <p
                        className="clone_create_route"
                        onClick={() => {
                          var temp = [];
                          pingData.filter(item => {
                            if (!paramData.includes(item)) {
                              temp = [...paramData, item];
                              setParamData(temp);
                            }
                          });

                          var temp1 = [];
                          pingBodyData.filter(item => {
                            if (!bodyData.includes(item)) {
                              temp1 = [...bodyData, item];
                              setBodyData(temp1);
                            }
                          });

                          var temp2 = [];
                          pingHeaderData.filter(item => {
                            if (!headerData.includes(item)) {
                              temp2 = [...headerData, item];
                              setHeaderData(temp2);
                            }
                          });
                          var temp3 = [];
                          pingAuthData.filter(item => {
                            if (!authData.includes(item)) {
                              temp3 = [...authData, item];
                              setAuthData(temp3);
                            }
                          });
                        }}
                      >
                        Clone from Ping
                        <span>
                          <FaClone />
                        </span>
                      </p>
                    )}
                    <p style={{ height: "1rem" }}></p>

                    <div className="modal_inner_block">
                      <div className="modal_tab_btns">
                        <button
                          onClick={() => {
                            setpersonalDetails(true);
                            setteamMemb(false);
                            setlead_butt1_ping(true);
                            setPayDetails(false);
                            setlead_butt2_ping(false);
                            setlead_butt3_ping(false);
                            setlead_butt4_ping(false);
                          }}
                          className={
                            lead_butt1_ping == true ? "butt_true" : "butt_false"
                          }
                        >
                          Params
                        </button>
                        {localStorage.getItem("role") == 2 && (
                          <button
                            onClick={() => {
                              setteamMemb(true);
                              setpersonalDetails(false);
                              setlead_butt1_ping(false);
                              setPayDetails(false);
                              setlead_butt2_ping(true);
                              setlead_butt3_ping(false);
                              setlead_butt4_ping(false);
                            }}
                            className={
                              lead_butt2_ping == true
                                ? "butt_true"
                                : "butt_false"
                            }
                          >
                            Body
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setPayDetails(true);
                            setteamMemb(false);
                            setpersonalDetails(false);
                            setlead_butt1_ping(false);
                            setlead_butt2_ping(false);
                            setlead_butt3_ping(true);
                            setlead_butt4_ping(false);
                          }}
                          className={
                            lead_butt3_ping == true ? "butt_true" : "butt_false"
                          }
                        >
                          Header
                        </button>

                        <button
                          onClick={() => {
                            setPayDetails(true);
                            setteamMemb(false);
                            setpersonalDetails(false);
                            setlead_butt1_ping(false);
                            setlead_butt2_ping(false);
                            setlead_butt3_ping(false);
                            setlead_butt4_ping(true);
                          }}
                          className={
                            lead_butt4_ping == true ? "butt_true" : "butt_false"
                          }
                        >
                          Authorization
                        </button>
                      </div>
                    </div>

                    {lead_butt1_ping == true && (
                      <div>
                        <div className=" second_right_bottom_inner_F">
                          <div className="plus_buy_route">
                            <label className="label_head_br">Params</label>
                          </div>
                          <table
                            id="dtBasicExample"
                            class="table table-striped table-sm table_buy_con12_edit1"
                            cellspacing="0"
                          >
                            <thead>
                              <tr
                                style={{
                                  color: "#484393",
                                  fontWeight: "bolder",
                                  fontSize: 20
                                }}
                              >
                                {/* lead id*/}
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Buyer Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Map Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Actions
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                          </table>

                          {dialogdetails == "post" && <div>{paramitems}</div>}
                          {dialogdetails == "ping" && (
                            <div>{pingparamitems ? pingparamitems : ""}</div>
                          )}

                          {paramstatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          id="key1"
                                          value={paramkey}
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_param_key(event.target.value)
                                          }
                                          // id="ekey2"
                                          // value={bodykey}
                                          // onChange={event =>
                                          //   route_body_key(event.target.value)
                                          // }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel_edit">
                                        <select
                                          id="selectBox"
                                          className="priceType_select priceType_select0059 priceType_select0059_sel"
                                          value={paramdesc}
                                          onChange={event => {
                                            // route_body_desc(event.target.value)
                                            //console.log(event.target.value);
                                            route_param_desc(
                                              event.target.value
                                            );
                                          }}
                                        >
                                          <option>Select</option>
                                          {verticalsfields &&
                                            verticalsfields.map((item, a) => (
                                              <option value={item.name}>
                                                {item.name}
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle1}
                                          onToggle={e => {
                                            setToggle1(!toggle1);
                                            setParamStatus(false);
                                            setDefaultParamKeyStatus(true);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <p style={{ height: "1%" }} />

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setParamStatus(true);
                                    getParam();
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                              <p style={{ height: "1%" }} />
                            </div>
                          )}

                          {defaultparamkeystatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          id="key123"
                                          name="key"
                                          value={paramkey}
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_param_key(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                        <input
                                          type="text"
                                          id="field123"
                                          name="key"
                                          value={paramdesc}
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_param_desc(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="form289"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle1}
                                          onToggle={e => {
                                            setToggle1(!toggle1);
                                            setDefaultParamKeyStatus(false);
                                            setParamStatus(true);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setDefaultParamKeyStatus(false);
                                    getDefaultParam();
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                          {editstatus && (
                            <div className="second_right_bottom_inner">
                              <div className="second_right_bottom_inner1">
                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Key</h1>
                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      placeholder="Key"
                                      value={paramkey}
                                      onChange={event =>
                                        route_param_key(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>

                                {/* <p style={{ height: "1%" }} /> */}
                                <div className="half_div">
                                  <div class="md-form md-outline md-form-extraClass01">
                                    <select
                                      id="selectBox"
                                      className="priceType_select priceType_select0059"
                                      value={paramdesc}
                                      onChange={event => {
                                        // route_body_desc(event.target.value)
                                        //console.log(event.target.value);
                                        route_param_desc(event.target.value);
                                      }}
                                    >
                                      <option>Select</option>
                                      {verticalsfields &&
                                        verticalsfields.map((item, a) => (
                                          <option value={item.name}>
                                            {item.name}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <p style={{ height: "1%" }} />

                              <p style={{ height: "1%" }} />

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    if (dialogdetails == "post") {
                                      const newParam = paramData.map(
                                        (item, key) => {
                                          if (key === index) {
                                            return {
                                              default: 0,
                                              key: paramkey,
                                              datatype: "String",
                                              map_field: paramdesc,
                                              required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setParamStatus(false);
                                      setDefaultParamKeyStatus(false);
                                      setEditStatus(false);
                                      setParamData(newParam);
                                    }
                                    if (dialogdetails == "ping") {
                                      const newParam = pingData.map(
                                        (item, key) => {
                                          if (key === index) {
                                            return {
                                              default: 0,
                                              key: paramkey,
                                              // datatype: "String",
                                              map_field: paramdesc
                                              // required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setParamStatus(false);
                                      setDefaultParamKeyStatus(false);
                                      setEditStatus(false);
                                      setPingData(newParam);
                                    }
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                              <p style={{ height: "1%" }} />
                            </div>
                          )}

                          {editdefaultparamStatus && (
                            <div className="second_right_bottom_inner">
                              <div className="second_right_bottom_inner1">
                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Key</h1>

                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      placeholder="Key"
                                      value={paramkey}
                                      onChange={event =>
                                        route_param_key(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Mapfiled</h1>
                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      placeholder="Mapfiled"
                                      value={paramdesc}
                                      onChange={event =>
                                        route_param_desc(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    if (dialogdetails == "post") {
                                      const newParam = paramData.map(
                                        (item, key) => {
                                          if (key === index) {
                                            return {
                                              default: 1,
                                              key: paramkey,
                                              // datatype: "String",
                                              value: paramdesc
                                              // required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setParamStatus(false);
                                      setEditDefaultParamStatus(false);
                                      setParamData(newParam);
                                    }
                                    if (dialogdetails == "ping") {
                                      const newParam = pingData.map(
                                        (item, key) => {
                                          if (key === index) {
                                            return {
                                              default: 1,
                                              key: paramkey,
                                              datatype: "String",
                                              map_field: paramdesc,
                                              required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setParamStatus(false);
                                      setEditDefaultParamStatus(false);
                                      setParamData(newParam);
                                    }
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {lead_butt2_ping == true && (
                      <div>
                        <div className="second_right_bottom_inner_F">
                          <div className="plus_buy_route">
                            <label className="label_head_br">Body</label>
                          </div>

                          <table
                            id="dtBasicExample"
                            class="table table-striped table-sm table_buy_con12_edit1"
                            cellspacing="0"
                          >
                            <thead>
                              <tr
                                style={{
                                  color: "#484393",
                                  fontWeight: "bolder",
                                  fontSize: 20
                                }}
                              >
                                {/* lead id*/}
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Buyer Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Map Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Actions
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                          </table>

                          {dialogdetails == "post" && (
                            <div>{bodyitems ? bodyitems : ""}</div>
                          )}
                          {dialogdetails == "ping" && (
                            <div>{pingbodyitems ? pingbodyitems : ""}</div>
                          )}
                          {bodystatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          id="key2"
                                          value={bodykey}
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_body_key(event.target.value)
                                          }
                                          // id="ekey2"
                                          // value={bodykey}
                                          // onChange={event =>
                                          //   route_body_key(event.target.value)
                                          // }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel_edit">
                                        <select
                                          id="selectBox"
                                          className="priceType_select priceType_select0059 priceType_select0059_sel"
                                          value={bodydesc}
                                          onChange={event => {
                                            // route_body_desc(event.target.value)
                                            //console.log(event.target.value);
                                            route_body_desc(event.target.value);
                                          }}
                                        >
                                          <option>Select</option>
                                          {verticalsfields &&
                                            verticalsfields.map((item, a) => (
                                              <option value={item.name}>
                                                {item.name}
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle2}
                                          onToggle={e => {
                                            setToggle2(!toggle2);
                                            setDefaultKeyStatus(true);
                                            setBodyStatus(false);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <p style={{ height: "1rem" }}></p>
                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setBodyStatus(true);
                                    getBody();
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                          {defaultkeystatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          id="form27"
                                          value={bodykey}
                                          onChange={event =>
                                            route_body_key(event.target.value)
                                          }
                                          class="form-control input_borderless"
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                        <input
                                          type="text"
                                          name="value"
                                          class="form-control input_borderless"
                                          id="form72"
                                          value={bodydesc}
                                          onChange={event =>
                                            setBodyDesc(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="form289"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>

                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle2}
                                          onToggle={e => {
                                            setToggle2(!toggle2);
                                            setDefaultKeyStatus(false);
                                            setBodyStatus(true);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <p style={{ height: "1%" }} />

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setBodyStatus(true);
                                    getDefaultBody();
                                    // setDefaultKeyStatus(false);
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                          {editbodyStatus && (
                            <div className="second_right_bottom_inner">
                              <div className="second_right_bottom_inner1">
                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Key</h1>
                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      value={bodykey}
                                      placeholder="Key"
                                      onChange={event =>
                                        route_body_key(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>

                                <select
                                  className="priceType_select"
                                  value={bodydesc}
                                  onChange={event =>
                                    route_body_desc(event.target.value)
                                  }
                                >
                                  <option>Select</option>
                                  {verticalsfields.length > 0 &&
                                    verticalsfields.map((item, a) => (
                                      <option value={a}>{item.name}</option>
                                    ))}
                                </select>
                              </div>
                              <p style={{ height: "1%" }} />

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn "
                                  onClick={() => {
                                    if (dialogdetails === "post") {
                                      const newBody = bodyData.map(
                                        (item, key) => {
                                          if (key === bodyindex) {
                                            return {
                                              default: 0,
                                              key: bodykey,
                                              // datatype: bodytype,
                                              map_field: bodydesc
                                              // required: bodyrequired
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setBodyStatus(false);
                                      setEditBodyStatus(false);
                                      setBodyData(newBody);
                                    }
                                    if (dialogdetails === "ping") {
                                      const newBody = pingBodyData.map(
                                        (item, key) => {
                                          if (key === bodyindex) {
                                            return {
                                              default: 0,
                                              key: bodykey,
                                              // datatype: bodytype,
                                              map_field: bodydesc
                                              // required: bodyrequired
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setBodyStatus(false);
                                      setEditBodyStatus(false);
                                      setPingBodyData(newBody);
                                    }
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          )}
                          {editdefaultbodyStatus && (
                            <div className="second_right_bottom_inner">
                              <div className="second_right_bottom_inner1">
                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Key</h1>
                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      value={bodykey}
                                      placeholder="Key"
                                      onChange={event =>
                                        route_body_key(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Mapfield</h1>

                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      value={bodydesc}
                                      placeholder="Mapfield"
                                      onChange={event =>
                                        route_body_desc(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <p style={{ height: "1%" }} />

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    if (dialogdetails === "post") {
                                      const newBody = bodyData.map(
                                        (item, key) => {
                                          if (key === bodyindex) {
                                            return {
                                              default: 1,
                                              key: bodykey,
                                              // datatype: "String",
                                              value: bodydesc
                                              // required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setEditBodyStatus(false);
                                      setEditDefaultBodyStatus(false);
                                      setBodyData(newBody);
                                    }
                                    if (dialogdetails === "post") {
                                      const newBody = pingBodyData.map(
                                        (item, key) => {
                                          if (key === bodyindex) {
                                            return {
                                              default: 1,
                                              key: bodykey,
                                              // datatype: "String",
                                              value: bodydesc
                                              // required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setEditBodyStatus(false);
                                      setEditDefaultBodyStatus(false);
                                      setPingBodyData(newBody);
                                    }
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {lead_butt3_ping == true && (
                      <div>
                        <div className="second_right_bottom_inner_F">
                          <div className="plus_buy_route">
                            <label className="label_head_br">Header</label>
                          </div>

                          <table
                            id="dtBasicExample"
                            class="table table-striped table-sm table_buy_con12_edit1"
                            cellspacing="0"
                          >
                            <thead>
                              <tr
                                style={{
                                  color: "#484393",
                                  fontWeight: "bolder",
                                  fontSize: 20
                                }}
                              >
                                {/* lead id*/}
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Buyer Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Map Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Actions
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                          </table>

                          {dialogdetails == "post" && (
                            <div>{headeritems ? headeritems : ""}</div>
                          )}
                          {dialogdetails == "ping" && (
                            <div>{pingheaderitems ? pingheaderitems : ""}</div>
                          )}
                          {headerstatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          id="key3"
                                          value={headerkey}
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_header_key(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel_edit">
                                        <select
                                          id="selectBox"
                                          className="priceType_select priceType_select0059 priceType_select0059_sel"
                                          value={headerdesc}
                                          onChange={event => {
                                            route_header_desc(
                                              event.target.value
                                            );
                                          }}
                                        >
                                          <option>Select</option>
                                          {verticalsfields &&
                                            verticalsfields.map((item, a) => (
                                              <option value={item.name}>
                                                {item.name}
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle3}
                                          onToggle={e => {
                                            setToggle3(!toggle3);
                                            setDefaultHeaderKeyStatus(true);
                                            setHeaderStatus(false);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <p style={{ height: "1%" }} />

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setHeaderStatus(true);
                                    getHeader();
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          )}
                          {defaultheaderkeystatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          value={headerkey}
                                          id="form52"
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_header_key(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                        <input
                                          type="text"
                                          name="value"
                                          value={headerdesc}
                                          id="form52"
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_header_desc(
                                              event.target.value
                                            )
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="form289"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>

                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle3}
                                          onToggle={e => {
                                            setToggle3(!toggle3);
                                            setDefaultHeaderKeyStatus(false);
                                            setHeaderStatus(true);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setHeaderStatus(true);
                                    // setDefaultHeaderKeyStatus(false);
                                    getDefaultHeader();
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          )}

                          {editheaderStatus && (
                            <div className="second_right_bottom_inner">
                              <div className="second_right_bottom_inner1">
                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Key</h1>
                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      placeholder="Key"
                                      value={headerkey}
                                      onChange={event =>
                                        route_header_key(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="half_div">
                                  <div class="md-form md-outline md-form-extraClass01">
                                    <select
                                      id="selectBox"
                                      className="priceType_select priceType_select0059"
                                      value={headerdesc}
                                      onChange={event => {
                                        // route_body_desc(event.target.value)
                                        //console.log(event.target.value);
                                        route_header_desc(event.target.value);
                                      }}
                                    >
                                      <option>Select</option>
                                      {verticalsfields &&
                                        verticalsfields.map((item, a) => (
                                          <option value={item.name}>
                                            {item.name}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <p style={{ height: "1%" }} />

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    if (dialogdetails === "post") {
                                      const newHeader = headerData.map(
                                        (item, key) => {
                                          if (key === headerindex) {
                                            return {
                                              default: 0,
                                              key: headerkey,
                                              // datatype: "String",
                                              map_field: headerdesc
                                              // required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setHeaderStatus(false);
                                      setEditHeaderStatus(false);
                                      setHeaderData(newHeader);
                                    }
                                    if (dialogdetails === "ping") {
                                      const newHeader = pingHeaderData.map(
                                        (item, key) => {
                                          if (key === headerindex) {
                                            return {
                                              default: 0,
                                              key: headerkey,
                                              // datatype: "String",
                                              map_field: headerdesc
                                              // required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setHeaderStatus(false);
                                      setEditHeaderStatus(false);
                                      setPingHeaderData(newHeader);
                                    }
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                          {editdefaultheaderStatus && (
                            <div className="second_right_bottom_inner">
                              <div className="second_right_bottom_inner1">
                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Key</h1>
                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      placeholder="Key"
                                      value={headerkey}
                                      onChange={event =>
                                        route_header_key(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Mapfield</h1>
                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      placeholder="Mapfield"
                                      value={headerdesc}
                                      onChange={event =>
                                        route_header_desc(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <p style={{ height: "1%" }} />

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    if (dialogdetails === "post") {
                                      const newHeader = headerData.map(
                                        (item, key) => {
                                          if (key === headerindex) {
                                            return {
                                              default: 1,
                                              key: headerkey,
                                              // datatype: "String",
                                              value: headerdesc
                                              // required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setHeaderStatus(false);
                                      setEditDefaultHeaderStatus(false);
                                      setHeaderData(newHeader);
                                    }
                                    if (dialogdetails === "post") {
                                      const newHeader = pingHeaderData.map(
                                        (item, key) => {
                                          if (key === headerindex) {
                                            return {
                                              default: 1,
                                              key: headerkey,
                                              // datatype: "String",
                                              value: headerdesc
                                              // required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setHeaderStatus(false);
                                      setEditDefaultHeaderStatus(false);
                                      setPingHeaderData(newHeader);
                                    }
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {lead_butt4_ping == true && (
                      <div>
                        <div className="second_right_bottom_inner_F">
                          <div className="plus_buy_route">
                            <label className="label_head_br">
                              Authorization
                            </label>
                          </div>

                          <table
                            id="dtBasicExample"
                            class="table table-striped table-sm table_buy_con12_edit1"
                            cellspacing="0"
                          >
                            <thead>
                              <tr
                                style={{
                                  color: "#484393",
                                  fontWeight: "bolder",
                                  fontSize: 20
                                }}
                              >
                                {/* lead id*/}
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Buyer Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Map Field
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                                <th class="th-sm extra_class">
                                  <div className="first_div">
                                    Actions
                                    <div className="svg_grid"></div>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                          </table>

                          {dialogdetails == "post" && (
                            <div>{authitems ? authitems : ""}</div>
                          )}
                          {dialogdetails == "ping" && (
                            <div>{pingauthitems ? pingauthitems : ""}</div>
                          )}
                          {authstatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          id="key4"
                                          value={authkey}
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_auth_key(event.target.value)
                                          }
                                          // id="ekey2"
                                          // value={bodykey}
                                          // onChange={event =>
                                          //   route_body_key(event.target.value)
                                          // }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel_edit">
                                        <select
                                          id="selectBox"
                                          className="priceType_select priceType_select0059 priceType_select0059_sel"
                                          value={authdesc}
                                          onChange={event => {
                                            route_auth_desc(event.target.value);
                                          }}
                                        >
                                          <option>Select</option>
                                          {verticalsfields &&
                                            verticalsfields.map((item, a) => (
                                              <option value={item.name}>
                                                {item.name}
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>
                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle4}
                                          onToggle={e => {
                                            setToggle4(!toggle4);
                                            setDefaultAuthKeyStatus(true);
                                            setAuthStatus(false);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <p style={{ height: "1%" }} />

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setBuy_Route_Params3(false)
                                    // setAuthStatus(true);
                                    getAuth();
                                  }}
                                >
                                  Add
                                </button>
                              </div>

                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                          {defaultauthkeystatus && (
                            <div className="second_right_bottom_inner">
                              <table
                                id="dtBasicExample"
                                class="table table-striped table-sm table_buy_con12_edit1"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr
                                    style={{
                                      color: "#484393",
                                      fontWeight: "bolder",
                                      fontSize: 20
                                    }}
                                  >
                                    {/* lead id*/}
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Buyer Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                    <th class="th-sm extra_class">
                                      <div className="first_div">
                                        Map Field Type
                                        <div className="svg_grid"></div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align">
                                        <input
                                          type="text"
                                          name="key"
                                          id="form82"
                                          value={authkey}
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_auth_key(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="ekey1"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                        <input
                                          type="text"
                                          id="form92"
                                          value={authdesc}
                                          name="key"
                                          class="form-control input_borderless"
                                          onChange={event =>
                                            route_auth_desc(event.target.value)
                                          }
                                        />
                                        <label
                                          className="input_text_buyer"
                                          for="form289"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="tog_create tog_create_align tog_butt1_flex_create">
                                        <p
                                          style={{
                                            color: "red",
                                            marginLeft: "3px"
                                          }}
                                        >
                                          Select
                                        </p>

                                        <ToggleButton
                                          inactiveLabel={""}
                                          activeLabel={""}
                                          colors={{
                                            active: {
                                              base: "#9B9B9B"
                                            },
                                            inactive: {
                                              base: "#9B9B9B"
                                            }
                                          }}
                                          value={toggle4}
                                          onToggle={e => {
                                            setToggle4(!toggle4);
                                            setDefaultAuthKeyStatus(false);
                                            setAuthStatus(true);
                                          }}
                                        />
                                        <p style={{ color: "green" }}>Input</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    // setEditDefaultAuthStatus(false);
                                    getDefaultAuth();
                                  }}
                                >
                                  Add
                                </button>
                              </div>

                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                          {editauthStatus && (
                            <div className="second_right_bottom_inner">
                              <div className="second_right_bottom_inner1">
                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Key</h1>
                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      placeholder="Key"
                                      value={authkey}
                                      onChange={event =>
                                        route_auth_key(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="half_div">
                                  <div class="md-form md-outline md-form-extraClass01">
                                    <select
                                      id="selectBox"
                                      className="priceType_select priceType_select0059"
                                      value={authdesc}
                                      onChange={event => {
                                        // route_body_desc(event.target.value)
                                        //console.log(event.target.value);
                                        route_auth_desc(event.target.value);
                                      }}
                                    >
                                      <option>Select</option>
                                      {verticalsfields &&
                                        verticalsfields.map((item, a) => (
                                          <option value={item.name}>
                                            {item.name}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <p style={{ height: "1%" }} />
                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    if (dialogdetails === "post") {
                                      const newAuth = authData.map(
                                        (item, key) => {
                                          if (key === authindex) {
                                            return {
                                              default: 0,
                                              key: authkey,
                                              // datatype: "String",
                                              map_field: authdesc
                                              // required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setAuthStatus(false);
                                      setEditAuthStatus(false);
                                      setAuthData(newAuth);
                                    }
                                    if (dialogdetails === "ping") {
                                      const newAuth = pingAuthData.map(
                                        (item, key) => {
                                          if (key === authindex) {
                                            return {
                                              default: 0,
                                              key: authkey,
                                              // datatype: "String",
                                              map_field: authdesc
                                              // required: "Yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setAuthStatus(false);
                                      setEditAuthStatus(false);
                                      setPingAuthData(newAuth);
                                    }
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                          {editdefaultauthstatus && (
                            <div className="second_right_bottom_inner">
                              <div className="second_right_bottom_inner1">
                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Key</h1>
                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      placeholder="Key"
                                      value={authkey}
                                      onChange={event =>
                                        route_auth_key(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="half_div">
                                  <div className="border789">
                                    <h1>Mapfield</h1>
                                    <input
                                      className="input_borderless input_borderlessExtra"
                                      type="text"
                                      name="key"
                                      placeholder="Mapfield"
                                      value={authdesc}
                                      onChange={event =>
                                        route_auth_desc(event.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <p style={{ height: "1%" }} />
                              <div className="buyers_create_btn_div">
                                <button
                                  className="buyers_create_btn"
                                  onClick={() => {
                                    if (dialogdetails === "post") {
                                      const newAuth = authData.map(
                                        (item, key) => {
                                          if (key === authindex) {
                                            return {
                                              default: 1,
                                              key: authkey,
                                              // datatype: "String",
                                              value: authdesc
                                              // required: "yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setAuthStatus(false);
                                      setEditDefaultAuthStatus(false);
                                      setAuthData(newAuth);
                                    }
                                    if (dialogdetails === "ping") {
                                      const newAuth = pingAuthData.map(
                                        (item, key) => {
                                          if (key === authindex) {
                                            return {
                                              default: 1,
                                              key: authkey,
                                              // datatype: "String",
                                              value: authdesc
                                              // required: "yes"
                                            };
                                          } else {
                                            return item;
                                          }
                                        }
                                      );
                                      setAuthStatus(false);
                                      setEditDefaultAuthStatus(false);
                                      setPingAuthData(newAuth);
                                    }
                                  }}
                                >
                                  Save
                                </button>
                              </div>

                              <p style={{ height: "1%" }} />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {(method == "ping-post" && (pingfiledata != null)) && (
              <div>
                <div className="buyer_edit_box_f">
                  <div className="box_head_route">
                    <p>Data Mapping</p>
                  </div>
                  <div className="modal_tab_btns">
                    <button
                      onClick={() => {
                        //setPingUpload(true);
                        setXmlPingStatus("ping");
                        setlead_butt1_data(true);
                        setlead_butt2_data(false);
                        //setPingFileData("");
                        setXmlState1(true);
                        setXmlState2(false);
                      }}
                      className={
                        lead_butt1_data == true ? "butt_true" : "butt_false"
                      }
                    >
                      Ping
                    </button>
                    <button
                      onClick={() => {
                        setXmlPingStatus("post");
                        setXmlState1(false);
                        setXmlState2(true);
                        // setPingUpload(true);
                        setlead_butt2_data(true);
                        setlead_butt1_data(false);
                      }}
                      className={
                        lead_butt2_data == true ? "butt_true" : "butt_false"
                      }
                    >
                      Post
                    </button>
                  </div>

                  <div className="upload_div_inner">
                    <p>Select file type and upload your sample post file</p>
                    <select
                      value={radiostatus}
                      onChange={event => {
                        setRadioStatus(event.target.value);
                        localStorage.setItem("picker", event.target.value);
                      }}
                    >
                      <option value="xml">XML</option>
                      <option value="json">JSON</option>
                    </select>
                    {radiostatus && (
                      <input
                        type="file"
                        onClick={() => {
                          if (xmlpingstatus === "ping") {
                            setXmlArray([]);
                            setXmlIndexArray([]);
                            setPayloadPick([]);
                            setXmlState1(false);
                          }
                          if (xmlpingstatus === "post") {
                            setXmlArray1([]);
                            setXmlIndexArray1([]);
                            setPayloadPick([]);
                            setXmlState2(false);
                          }
                        }}
                        onChange={e => {
                          handleChangeFile(e.target.files[0]);
                        }}
                      />
                    )}
                    <p style={{ height: "1%" }} />

                    <div
                      style={{
                        height: "30px",
                        background: "#000",
                        color: "#fff",
                        marginBottom: "0px",
                        padding: "6px",
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: "5px 5px 0 0 "
                      }}
                    >
                      <div>Paste sample post data and map the fields</div>
                      <div>
                        <Help
                          onClick={() => {
                            openModal();
                          }}
                        />
                      </div>
                      <Modal
                        isOpen={open}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                        <div
                          className="close_img_div"
                          onClick={() => closeModal()}
                        >
                          <IoIosClose />
                        </div>
                        {verticalsfields.map((item, a) => (
                          <p>#{item.name}#</p>
                        ))}
                      </Modal>
                    </div>
                    {xmlpingstatus == "ping" ? (
                      <textarea
                        rows="10"
                        cols="20"
                        style={{
                          backgroundColor: "#888888",
                          color: "white",
                          border: "none",
                          borderRadius: "0 0 5px 5px"
                        }}
                        value={pingfiledata}
                        onChange={e => handleChangeEdit(e.target.value)}
                      />
                    ) : (
                      <textarea
                        rows="10"
                        cols="20"
                        style={{
                          backgroundColor: "#888888",
                          color: "white",
                          border: "none",
                          borderRadius: "0 0 5px 5px"
                        }}
                        value={postfiledata}
                        onChange={e => handleChangeEdit(e.target.value)}
                      />
                    )}

                    <div className="xml_class">
                      <table
                        id="dtBasicExample"
                        class="table table-striped table-sm"
                        cellspacing="0"
                      >
                        <thead>
                          <tr
                            style={{
                              color: "#484393",
                              fontWeight: "bolder",
                              fontSize: 20
                            }}
                          >
                            <th>Group</th>
                            <th style={{ textAlign: "center" }}>Buyer Field</th>
                            <th style={{ textAlign: "center" }}>Map Field</th>
                          </tr>
                        </thead>
                        <tbody>
                          {xmlstate1 &&
                            xmlpingstatus === "ping" &&
                            xmlarray.map((item, index) =>
                              !xmlindexarray.includes(index) &&
                              item.toUpperCase().replace(/-|_/g, "") !==
                                "campaignid".toUpperCase() &&
                              item.toUpperCase().replace(/-|_/g, "") !==
                                "accesstoken".toUpperCase() &&
                              item.toUpperCase().replace(/-|_/g, "") !==
                                "accesskey".toUpperCase() ? (
                                <tr>
                                  <td>
                                    <p></p>
                                  </td>
                                  <td>
                                    <p>{item}</p>
                                  </td>
                                  <td>
                                    <select
                                      className="xml_select_buyer_route"
                                      value={payloadpick[index]}
                                      onChange={event => {
                                        payloadFile(index, event.target.value);

                                        console.log("pingmappedxmlstate1");
                                        console.log(
                                          Object.assign(pingmappedKeys, {
                                            [item]:
                                              "#" +
                                              verticalsfields[
                                                event.target.value
                                              ].name +
                                              "#"
                                          })
                                        );

                                        pingxmlpost.push({
                                          default: 0,
                                          key: item,
                                          datatype:
                                            verticalsfields[event.target.value]
                                              .datatype,
                                          required: "Yes",
                                          map_field:
                                            verticalsfields[event.target.value]
                                              .name
                                        });
                                      }}
                                    >
                                      <option label="select" />
                                      {verticalsfields.map((item, key) => (
                                        <option label={item.name} value={key} />
                                      ))}
                                    </select>
                                  </td>
                                </tr>
                              ) : (
                                <tr>
                                  <td>
                                    <p>{item}</p>
                                  </td>
                                  <td>
                                    <p></p>
                                  </td>
                                  <td>
                                    <p></p>
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                      <table
                        id="dtBasicExample"
                        class="table table-striped table-sm"
                        cellspacing="0"
                      >
                        <thead>
                          <tr
                            style={{
                              color: "#484393",
                              fontWeight: "bolder",
                              fontSize: 20
                            }}
                          ></tr>
                        </thead>
                        <tbody>
                          {xmlstate2 &&
                            xmlpingstatus === "post" &&
                            xmlarray1.map((item, index) =>
                              !xmlindexarray1.includes(index) &&
                              item.toUpperCase().replace(/-|_/g, "") !==
                                "campaignid".toUpperCase() &&
                              item.toUpperCase().replace(/-|_/g, "") !==
                                "accesstoken".toUpperCase() &&
                              item.toUpperCase().replace(/-|_/g, "") !==
                                "accesskey".toUpperCase() ? (
                                <tr>
                                  <td>
                                    <p></p>
                                  </td>
                                  <td>
                                    <p>{item}</p>
                                  </td>
                                  <td>
                                    <select
                                      className="xml_select_buyer_route"
                                      value={payloadpick[index]}
                                      onChange={event => {
                                        payloadFile(index, event.target.value);
                                        console.log("PINGPOSTXMLSTATE@");
                                        console.log(
                                          Object.assign(pingpostmappedKeys, {
                                            [item]:
                                              "#" +
                                              verticalsfields[
                                                event.target.value
                                              ].name +
                                              "#"
                                          })
                                        );

                                        pingpostxmlpost.push({
                                          default: 0,
                                          key: item,
                                          datatype:
                                            verticalsfields[event.target.value]
                                              .datatype,
                                          required: "Yes",
                                          map_field:
                                            verticalsfields[event.target.value]
                                              .name
                                        });
                                      }}
                                    >
                                      <option label="select" />
                                      {verticalsfields.map((item, key) => (
                                        <option label={item.name} value={key} />
                                      ))}
                                    </select>
                                  </td>
                                </tr>
                              ) : (
                                <tr>
                                  <td>
                                    <p>{item}</p>
                                  </td>
                                  <td>
                                    <p></p>
                                  </td>
                                  <td>
                                    <p></p>
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <p style={{ height: "1rem" }} />

            <p style={{ height: "1rem" }} />

            <div className="buyers_create_btn_div">
              {localStorage.getItem("role") == 2 ? (
                <button
                  className="buyers_create_btn"
                  onClick={() => save_details()}
                >
                  Update Buyer Route
                </button>
              ) : !permissions && permissions.actions.includes(3) ? (
                <button
                  className="buyers_create_btn"
                  onClick={() => save_details()}
                >
                  Update Buyer Route
                </button>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default EditBuyerRoute;
