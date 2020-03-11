// Created By Uday
// On 29/10/2019
// last modified on 31/12/2019
// Page=Create Buyer Route
import React, { useState, useEffect } from "react";
import { API_URL ,logoutidle} from '../../AppConfig'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory
} from "react-router-dom";
import axios from "axios";
import Buyers from "./Buyers";
import "../Buyer/BuyerRoute.css";
import { Col, Row } from "react-bootstrap";
import Help from "../../Help";
import Close from "../../Close";
import Modal from "react-modal";
import ToggleButton from "react-toggle-button";
import { IoIosClose, IoIosArrowBack,IoMdInformationCircle } from "react-icons/io";
import { FaPlusCircle, FaWeight, FaClone, FaCheck } from "react-icons/fa"; //Add or plus icon
import { TiFilter } from "react-icons/ti";
import { NavLink, withRouter } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import {
  IoIosHome,
  IoIosStats,
  IoIosVolumeHigh,
  IoIosWalk,
  IoIosPeople,
  IoIosList
} from "react-icons/io";
const CreateBuyerRoute = props => {
  let history = useHistory();
  let { id } = useParams(); //Getting id from previous page
  const [name, setName] = useState(); //State to store name
  const [desc, setDesc] = useState(); //State to store description
  const [url, setUrl] = useState(); //State to store url
  const [method, setMethod] = useState("post"); //State to store Method
  const [price, setPrice] = useState(); //State to store Price
  const [pricetype, setPriceType] = useState("Amount"); //State to store Pricetype
  const [noofleads, setNoOfLeads] = useState(); //State to store noofleads
  const [success, setSuccess] = useState(); //State to store Success Response
  const [failure, setFailure] = useState(); //State to store Failure Response
  const [verticals, setVerticals] = useState([]); // State to store All Verticals
  const [verticalsfields, setVerticalsFields] = useState([]); // State to store All Verticalsfields
  const [selectedVerticalId, setSelectedVerticalId] = useState();
  const [toggle, setToggle] = useState(false); //State to store switch value
  const [deliverytype, setDeliveryType] = useState();
  //States to store the status of default fields toggles
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);

  //States to store the status of TEst Buyer Route Modal
  const [testopen, setTestOpen] = useState(false);
  const [testres, setTestRes] = useState([]);
  const [testresmodal, setTestResModal] = useState(false);
  //State to store testData
  const [testData, setTestData] = useState([]);
  //State to hold filtered options
  const [filterData, setFilterData] = useState([]);
  //State to maintain the tab clicked between ping and post
  const [xmlpingstatus, setXmlPingStatus] = useState("ping");
  //State to store the data format options given
  const [convData, setConvData] = useState({});
  //State to maintain filter status
  const [filterstatus, setFilterStatus] = useState(false);
  //States to get color for the selected tab between ping and post
  const [lead_butt1, setlead_butt1] = useState(true);
  const [lead_butt2, setlead_butt2] = useState(false);
 
  //States to hold PingID key and Ping url
  const [pingurl, setPingUrl] = useState();
  const [pingkey, setPingKey] = useState();
  const [resopen, setResOpen] = useState(false);
  // ==========================================States to store Params fields
  const [paramstatus, setParamStatus] = useState(true); //state to display Params section or close it
  const [paramData, setParamData] = useState([]); //State to hold the data given in Params section with pingid as default
  const [paramkey, setParamKey] = useState(); //State to hold buyer field
  const [paramdesc, setParamDesc] = useState(); //state to hold vertical field in params section
  const [editstatus, setEditStatus] = useState(false); //state to show params configuration on clicking edit icon opposite to a field true=shows false=closes
  const [index, setIndex] = useState();
  const [defaultparamkeystatus, setDefaultParamKeyStatus] = useState(false); //state to display default Params section or close it
  const [editdefaultparamStatus, setEditDefaultParamStatus] = useState(false); //state to show defaultparams configuration on clicking edit icon opposite to a field true=shows false=closes
  //   ========================================States to store body fields
  const [bodyData, setBodyData] = useState([]); //State to hold the data given in Body section
  const [bodystatus, setBodyStatus] = useState(true); //state to display Body section or close it
  const [bodykey, setBodyKey] = useState(); //State to hold buyer field
  const [bodydesc, setBodyDesc] = useState(); //state to hold vertical field in params section
  const [editbodyStatus, setEditBodyStatus] = useState(false); //state to show Body configuration on clicking edit icon opposite to a field true=shows false=closes
  const [bodyindex, setBodyIndex] = useState();
  const [defaultkeystatus, setDefaultKeyStatus] = useState(false); //state to display default Body section or close it
  const [editdefaultbodyStatus, setEditDefaultBodyStatus] = useState(false); //state to show DefaultBody configuration on clicking edit icon opposite to a field true=shows false=closes
  //   ===============================================States to store Header fields
  const [headerindex, setHeaderIndex] = useState();
  const [headerData, setHeaderData] = useState([]); //State to hold the data given in Header section
  const [editheaderStatus, setEditHeaderStatus] = useState(false); //state to show Body configuration on clicking edit icon opposite to a field true=shows false=closes
  const [headerstatus, setHeaderStatus] = useState(true); //state to display Body section or close it
  const [headerkey, setHeaderKey] = useState(); //State to hold Header field
  const [headerdesc, setHeaderDesc] = useState(); //state to hold vertical field
  const [defaultheaderkeystatus, setDefaultHeaderKeyStatus] = useState(false); //state to display default Body section or close it
  const [editdefaultheaderStatus, setEditDefaultHeaderStatus] = useState(false); //state to show Default Header configuration on clicking edit icon opposite to a field true=shows false=closes
  //   ==================================================States to store Auth fields
  const [authData, setAuthData] = useState([]);
  const [authstatus, setAuthStatus] = useState(true);
  const [authkey, setAuthKey] = useState(); //State to hold buyer field
  const [authdesc, setAuthDesc] = useState(); //state to hold vertical field
  const [editauthStatus, setEditAuthStatus] = useState(false); //state to show Body configuration on clicking edit icon opposite to a field true=shows false=closes
  const [authindex, setAuthIndex] = useState();
  const [defaultauthkeystatus, setDefaultAuthKeyStatus] = useState(false); //state to display default Body section or close it
  const [editdefaultauthstatus, setEditDefaultAuthStatus] = useState(false); //state to show Default Auth configuration on clicking edit icon opposite to a field true=shows false=closes
  //State to display fileupload section and textarea on clicking yes when method is Post
  const [showUpload, setShowUpload] = useState(false);
  //State to display Params,Header,Body and Auth sections  on clicking NO when method is Post
  const [cards, setCards] = useState(false);
  //State to display Params,Header,Body and Auth sections  on clicking NO when method is pingpost
  const [postcards, setPostCards] = useState(false);
  //State to store an display uploaded content in text area when method is Post
  const [filedata, setFileData] = useState();
  //State to store an display uploaded content in text area when method is PingPost and tab is ping
  const [pingfiledata, setPingFileData] = useState();
  const [pingtestData, setPingTestData] = useState([]);
  //State to store an display uploaded content in text area when method is PingPost and tab is post
  const [postfiledata, setPostFileData] = useState();
  const [open, setOpen] = useState(false); //State to open modal on clicking help icon on textarea
  const [xmlarray, setXmlArray] = useState([]); //State to store xml tags
  const [xmlarray1, setXmlArray1] = useState([]);
  const [xmlstate, setXmlState] = useState(false); //States to display the uploaded content in tabular structure
  const [xmlstate1, setXmlState1] = useState(false);
  const [xmlstate2, setXmlState2] = useState(false);
  const [xmlpost, setXmlPost] = useState([]); //State to store the buyer field and vertical field got from xml file when method is post
  const [pingxmlpost, setPingXmlPost] = useState([]); //State to store the buyer field and vertical field got from xml file when method is ppingost
  const [pingpostxmlpost, setPingPostXmlPost] = useState([]); //State to store the buyer field and vertical field got from xml file when method is pingpost
  const [radiostatus, setRadioStatus] = useState(false); //State to hold the type of file information
  const [payloadpick, setPayloadPick] = useState([]);
  const [payloadpick1, setPayloadPick1] = useState([]);

  const [xmlindexarray, setXmlIndexArray] = useState([]);
  const [xmlindexarray1, setXmlIndexArray1] = useState([]);

  const [mappedKeys, setMappedKeys] = useState({}); //State to hold the selected or mapped fields in xml file
  const [pingmappedKeys, setPingMappedKeys] = useState({}); //State to hold the selected or mapped fields in xml file when pingpost
  const [pingpostmappedKeys, setPingPostMappedKeys] = useState({}); //State to hold the selected or mapped fields in xml file when pingpost
  const [mappedKeys1, setMappedKeys1] = useState({});
  //States to display BuyerField,Mapfield and Actions for all params,headers,body and auth
  const [buy_route_params, setBuy_Route_Params] = useState(false);
  const [buy_route_params1, setBuy_Route_Params1] = useState(false);
  const [buy_route_params2, setBuy_Route_Params2] = useState(false);
  const [buy_route_params3, setBuy_Route_Params3] = useState(false);
  //State to display when cards post is selected
  const [postshow, setPostShow] = useState(true);
  //State to display cards when ping is selected
  const [pingshow, setPingShow] = useState(false);
  //State to display file uploading when ping is selected
  const [pingxmlshow, setPingXmlShow] = useState(false);
  const [pingupload, setPingUpload] = useState(false);
  //States to hold ping Data for params,Body,Header and Auth sections
  const [pingData, setPingData] = useState([
    { default: 1, key: "pingid", mapfield: "", value: "", stat: "false" }
  ]);
  const [pingBodyData, setPingBodyData] = useState([]);
  const [pingHeaderData, setPingHeaderData] = useState([]);
  const [pingAuthData, setPingAuthData] = useState([]);
  const [dialogdetails, setDialogDetails] = useState("ping");
  const [testfiledata, setTestFileData] = useState();
  const [pingtestfiledata, setPingTestFileData] = useState();
  const [jsonfiledata, setJsonFileData] = useState();
  const [pingjsonfiledata, setPingJSONFileData] = useState();
  const [postjsonfiledata, setPostJSONFileData] = useState();
  const [mappedKeys2, setMappedKeys2] = useState({});
  const [filterVerticalsFields, setFilterVerticalsFields] = useState([]);
  const [formats, setFormats] = useState([
    { key: "dateofbirth", value: "", map_field: "" },
    { key: "time", value: "", map_field: "" },
    { key: "date", value: "", map_field: "" },
    { key: "phone", value: "", map_field: "" }
  ]);

  const [leadsstate, setLeadsState] = useState();
  const [campaignstate, setCampaignState] = useState();
  const [publisherstate, setPublisherState] = useState();
  const [buyerstate, setBuyerState] = useState();
  const [personalDetails, setpersonalDetails] = useState(true);
  const [teamMemb, setteamMemb] = useState(false);
  const [PayDetails, setPayDetails] = useState(false);
  const [lead_butt3, setlead_butt3] = useState(false);
  const [lead_butt4, setlead_butt4] = useState(false);
  const [lead_butt1_ping, setlead_butt1_ping] = useState(true);
  const [lead_butt2_ping, setlead_butt2_ping] = useState(false);
  const [lead_butt3_ping, setlead_butt3_ping] = useState(false);
  const [lead_butt4_ping, setlead_butt4_ping] = useState(false);


  const[param_key_edit1,setparam_key_edit1]=useState(true);
  const[body_key_edit1,setbody_key_edit1]=useState(true);
  const[header_key_edit1,setheader_key_edit1]=useState(true);
  const[auth_key_edit1,setauth_key_edit1]=useState(true);




  const[ping_param_key_edit1,setping_param_key_edit1]=useState(true);
  const[ping_body_key_edit1,setping_body_key_edit1]=useState(true);
  const[ping_header_key_edit1,setping_header_key_edit1]=useState(true);
  const[ping_auth_key_edit1,setping_auth_key_edit1]=useState(true);


  var err_res = "";
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
        // testData.push(paramdata);
      }
      setParamKey("");
      setParamDesc("");
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
        //testData.push(bodydata);
      }
      setBodyKey("");
      setBodyDesc("");
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
        // testData.push(headerdata);
      }
      setHeaderKey("");
      setHeaderDesc("");
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
        //testData.push(headerdata);
      }
      setHeaderKey("");
      setHeaderDesc("");
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
      //console.log("headerdata", headerdata);
      headerData.push(headerdata);
      // testData.push(headerdata);
      setHeaderKey("");
      setHeaderDesc("");
      //console.log("headerData", headerData);
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
  /*
  When the method is ping-post and details are ping then those are stored in pingData,pingBodyData,pingAuthData 
  and details are of post or when the method is post the details are stored in paramData,bodyData,headerData and authData
  */
  //Map function to display Params added when method is post using map fucntion
  //Added param fields in Params are edited and deleted based on the index in here
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
                    {paramData[index].stat == "true" && (
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
                    )}
                    {paramData[index].stat == "false" && (
                      <p className="keyValue">{paramitem.key}</p>
                    )}
                    {/* <div className="svg_grid"></div> */}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {paramData[index].stat == "false" && (
                    <div className="first_div">
                      <p className="keyValue">
                        {paramitem.value
                          ? paramitem.value
                          : paramitem.map_field}
                      </p>
                    </div>
                  )}

                  {paramData[index].stat == "true" &&(
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
                          placeholder="Key edit"
                          value={paramdesc}
                          onChange={event =>
                            route_param_desc(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">


{param_key_edit1==true&&

                    <p
                      className="key_edit"
                      onClick={() => {
                        if (paramitem.default === 1) {
                          setDefaultParamKeyStatus(false)
                          paramData[index].stat = "true";
                          setEditStatus(false);
                          setParamStatus(false);
                          setIndex(index);
                          setParamKey(paramData[index].key);

                          setParamDesc(paramData[index].value);
                        } else {
                          setDefaultParamKeyStatus(false)
                          paramData[index].stat = "true";
                          setParamStatus(false);
                          setIndex(index);
                          setParamKey(paramData[index].key);
setparam_key_edit1(false);
                          setParamDesc(paramData[index].map_field);

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

                    }



{param_key_edit1==false&&
                    <FaCheck
                      className="FaCheck_icon"
                      onClick={() => {
                        if (paramitem.default === 0) {
                          const newParam = paramData.map((item, key) => {
                            if (key === index) {
                              return {
                                default: 0,
                                key: paramkey,

                                value: paramdesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });
                          setParamStatus(true);

                          setEditDefaultParamStatus(false);
                          console.log("Paramstatustick0", paramstatus);
                          setParamData(newParam);
                          setParamKey("");
                          setparam_key_edit1(true);
                          setParamDesc("");
                        } else {
                          const newParam = paramData.map((item, key) => {
                            if (key === index) {
                              return {
                                default: 1,
                                key: paramkey,

                                value: paramdesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });

                          setParamStatus(true);
                          setlead_butt1(true);
                          setEditDefaultParamStatus(false);
                          setParamData(newParam);
                          setParamKey("");
                          setParamDesc("");
                          console.log("Paramstatustick1", paramstatus);
                        }
                      }}
                    />
    }
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
                    {pingData[index].stat == "true" && (
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
                    )}
                    {(paramitem.key == "pingid" ||
                      pingData[index].stat == "false") && (
                      <p className="keyValue">{paramitem.key}</p>
                    )}
                    {/* <div className="svg_grid"></div> */}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {pingData[index].stat == "false" && (
                    <div className="first_div">
                      <p className="keyValue">
                        {paramitem.value
                          ? paramitem.value
                          : paramitem.map_field}
                      </p>
                    </div>
                  )}

                  {pingData[index].stat == "true" &&(
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
                          placeholder="Key edit"
                          value={paramdesc}
                          onChange={event =>
                            route_param_desc(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {ping_param_key_edit1==true&&
                    <p
                      className="key_edit"
                      onClick={() => {
                        if (paramitem.default === 1) {
                          setDefaultParamKeyStatus(false)
                          pingData[index].stat = "true";
                          setEditStatus(false);
                          setParamStatus(false);
                          setIndex(index);
                          setParamKey(pingData[index].key);

                          setParamDesc(pingData[index].value);
                        } else {
                          setDefaultParamKeyStatus(false)
                          pingData[index].stat = "true";
                          setParamStatus(false);
                          setIndex(index);
                          setping_param_key_edit1(false);
                          setParamKey(pingData[index].key);

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
    }
    {ping_param_key_edit1==false&&
                    <FaCheck
                      className="FaCheck_icon"
                      onClick={() => {
                        if (paramitem.default === 0) {
                          const newParam = pingData.map((item, key) => {
                            if (key === index) {
                              return {
                                default: 0,
                                key: paramkey,

                                value: paramdesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });
                          setParamStatus(true);

                          setEditDefaultParamStatus(false);
                          console.log("Paramstatustick0", paramstatus);
                          setPingData(newParam);
                          setParamKey("");
                          setping_param_key_edit1(true);
                          setParamDesc("");
                        } else {
                          const newParam = pingData.map((item, key) => {
                            if (key === index) {
                              return {
                                default: 1,
                                key: paramkey,

                                value: paramdesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });

                          setParamStatus(true);
                          setlead_butt1(true);
                          setEditDefaultParamStatus(false);
                          setPingData(newParam);
                          console.log("Paramstatustick1", paramstatus);
                          setParamKey("");
                          setParamDesc("");
                        }
                      }}
                    />
    }
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
                    {bodyData[index].stat == "true" && (
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
                    )}

                    {bodyData[index].stat == "false" && (
                      <p className="keyValue">{bodyitem.key}</p>
                      // <div className="svg_grid"></div>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {bodyData[index].stat == "false" && (
                    <div className="first_div">
                      <p className="keyValue">
                        {bodyitem.value ? bodyitem.value : bodyitem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}

                  {bodyData[index].stat == "true" &&(
                  bodyData[index].default === 0 ? (
                    <div class="md-form md-outline md-form-extraClass01">
                      <select
                        className="priceType_select"
                        value={bodydesc}
                        onChange={event => route_body_desc(event.target.value)}
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
                          placeholder="Key edit"
                          value={bodydesc}
                          onChange={event =>
                            route_body_desc(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {body_key_edit1==true&&
                    <p
                      className="key_edit"
                      onClick={() => {
                        if (bodyitem.default === 1) {
                          setDefaultKeyStatus(false)
                          setEditBodyStatus(false);
                          setBodyIndex(index);
                          bodyData[index].stat = "true";
                          setBodyKey(bodyData[index].key);

                          setBodyDesc(bodyData[index].value);
                        } else {
                          // setpost_body_edit(true)
                          setDefaultKeyStatus(false)
                          bodyData[index].stat = "true";
                          setEditBodyStatus(true);
                          setEditDefaultBodyStatus(false);
                          setBodyStatus(false);
                          setBodyIndex(index);
                          setBodyKey(bodyData[index].key);
setbody_key_edit1(false)
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
    }
{body_key_edit1==false&&
                    <FaCheck
                      className="FaCheck_icon"
                      onClick={() => {
                        if (bodyitem.default === 0) {
                          const newBody = bodyData.map((item, key) => {
                            if (key === bodyindex) {
                              return {
                                default: 0,
                                key: bodykey,

                                map_field: bodydesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });
                          setBodyStatus(true);
                          setEditBodyStatus(false);
                          setBodyData(newBody);
                          setBodyKey("");
                          setBodyDesc("");
                          setbody_key_edit1(true);
                        } else {
                          const newBody = bodyData.map((item, key) => {
                            if (key === bodyindex) {
                              return {
                                default: 1,
                                key: bodykey,

                                value: bodydesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });
                          setBodyStatus(true);
                          setEditBodyStatus(false);
                          setEditDefaultBodyStatus(false);
                          setBodyData(newBody);
                          setBodyKey("");
                          setBodyDesc("");
                        }
                      }}
                    />
                    }
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
                    {pingBodyData[index].stat == "true" && (
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
                    )}

                    {pingBodyData[index].stat == "false" && (
                      <p className="keyValue">{bodyitem.key}</p>
                      // <div className="svg_grid"></div>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {pingBodyData[index].stat == "false" && (
                    <div className="first_div">
                      <p className="keyValue">
                        {bodyitem.value ? bodyitem.value : bodyitem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}

                  {pingBodyData[index].stat == "true" &&(
                  pingBodyData[index].default === 0 ? (
                    <div class="md-form md-outline md-form-extraClass01">
                      <select
                        className="priceType_select"
                        value={bodydesc}
                        onChange={event => route_body_desc(event.target.value)}
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
                          placeholder="Key edit"
                          value={bodydesc}
                          onChange={event =>
                            route_body_desc(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {ping_body_key_edit1==true&&
                    <p
                      className="key_edit"
                      onClick={() => {
                        if (bodyitem.default === 1) {
                          setDefaultKeyStatus(false)
                          setEditBodyStatus(false);
                          setBodyIndex(index);
                          pingBodyData[index].stat = "true";
                          setBodyKey(pingBodyData[index].key);

                          setBodyDesc(pingBodyData[index].value);
                        } else {
                          // setpost_body_edit(true)

                          pingBodyData[index].stat = "true";
                          setEditBodyStatus(true);
                          setDefaultKeyStatus(false)
                          setBodyStatus(false);
                          setBodyIndex(index);
                          setping_body_key_edit1(false)
                          setBodyKey(pingBodyData[index].key);

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
    }
    {ping_body_key_edit1==false&&
                    <FaCheck
                      className="FaCheck_icon"
                      onClick={() => {
                        if (bodyitem.default === 0) {
                          const newBody = pingBodyData.map((item, key) => {
                            if (key === bodyindex) {
                              return {
                                default: 0,
                                key: bodykey,

                                map_field: bodydesc,

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
                          setping_body_key_edit1(true)
                        } else {
                          const newBody = pingBodyData.map((item, key) => {
                            if (key === bodyindex) {
                              return {
                                default: 1,
                                key: bodykey,

                                value: bodydesc,

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
    }

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
                    {headerData[index].stat == "true" && (
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
                    )}

                    {headerData[index].stat == "false" && (
                      <p className="keyValue">{headeritem.key}</p>
                      // <div className="svg_grid"></div>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {headerData[index].stat == "false" && (
                    <div className="first_div">
                      <p className="keyValue">
                        {headeritem.value
                          ? headeritem.value
                          : headeritem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}

                  {headerData[index].stat == "true" && ((headerData[index].default===0)?
                    (<div class="md-form md-outline md-form-extraClass01">
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
                  ):(<div className="half_div">
                  <div className="border789 border789_dup">
                    <h1>Value</h1>
                    <input
                      className="input_borderless editbuyerRKeyInputs"
                      type="text"
                      name="key"
                      placeholder="Key edit"
                      value={headerdesc}
                      onChange={event =>
                        route_header_desc(event.target.value)
                      }
                    />
                  </div>
    </div>))}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {header_key_edit1==true&&
                    <p
                      className="key_edit"
                      onClick={() => {
                        if (headeritem.default === 1) {
                          setDefaultHeaderKeyStatus(false)
                          headerData[index].stat = "true";
                          setEditHeaderStatus(false);
                          setHeaderStatus(false);
                          setHeaderIndex(index);
                          setHeaderKey(headerData[index].key);

                          setHeaderDesc(headerData[index].value);
                        } else {
                          setEditHeaderStatus(true);
                          setDefaultHeaderKeyStatus(false)
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
    }
    {header_key_edit1==false&&
                    <FaCheck
                      className="FaCheck_icon"
                      onClick={() => {
                        if (headeritem.default === 0) {
                          const newHeader = headerData.map((item, key) => {
                            if (key === headerindex) {
                              return {
                                default: 0,
                                key: headerkey,

                                map_field: headerdesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });
                          setHeaderStatus(true);
                          setEditHeaderStatus(false);
                          setHeaderData(newHeader);
                          setHeaderKey("");
                          setHeaderDesc("");
                          setheader_key_edit1(true)
                        } else {
                          const newHeader = headerData.map((item, key) => {
                            if (key === headerindex) {
                              return {
                                default: 1,
                                key: headerkey,

                                value: headerdesc,

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
    }

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
                    {pingHeaderData[index].stat == "true" && (
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
                    )}

                    {pingHeaderData[index].stat == "false" && (
                      <p className="keyValue">{headeritem.key}</p>
                      // <div className="svg_grid"></div>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {pingHeaderData[index].stat == "false" && (
                    <div className="first_div">
                      <p className="keyValue">
                        {headeritem.value
                          ? headeritem.value
                          : headeritem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}

                  {(pingHeaderData[index].stat == "true" && ((pingHeaderData[index].default===0)?
                    (<div class="md-form md-outline md-form-extraClass01">
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
                  ):(<div className="half_div">
                  <div className="border789 border789_dup">
                    <h1>Value</h1>
                    <input
                      className="input_borderless editbuyerRKeyInputs"
                      type="text"
                      name="key"
                      placeholder="Key edit"
                      value={headerdesc}
                      onChange={event =>
                        route_header_desc(event.target.value)
                      }
                    />
                  </div>
                  </div>)))}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {ping_header_key_edit1==true&&
                    <p
                      className="key_edit"
                      onClick={() => {
                        if (headeritem.default === 1) {
                          setDefaultHeaderKeyStatus(false)
                          pingHeaderData[index].stat = "true";
                          setEditHeaderStatus(false);
                          setHeaderStatus(false);
                          setHeaderIndex(index);
                          setHeaderKey(pingHeaderData[index].key);

                          setHeaderDesc(pingHeaderData[index].value);
                        } else {
                          setEditHeaderStatus(true);
                          setDefaultHeaderKeyStatus(false)
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
    }
    {ping_header_key_edit1==false&&
                    <FaCheck
                      className="FaCheck_icon"
                      onClick={() => {
                        if (headeritem.default === 0) {
                          const newHeader = pingHeaderData.map((item, key) => {
                            if (key === headerindex) {
                              return {
                                default: 0,
                                key: headerkey,

                                map_field: headerdesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });
                          setHeaderStatus(true);
                          setEditHeaderStatus(false);
                          setPingHeaderData(newHeader);
                          setHeaderKey("");
                          setping_header_key_edit1(true);
                          setHeaderDesc("");
                        } else {
                          const newHeader = pingHeaderData.map((item, key) => {
                            if (key === headerindex) {
                              return {
                                default: 1,
                                key: headerkey,

                                value: headerdesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });
                          setHeaderStatus(true);
                          setEditDefaultHeaderStatus(false);
                          setPingHeaderData(newHeader);
                          setHeaderKey("");
                          setHeaderDesc("");
                        }
                      }}
                    />
    }

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
                    {authData[index].stat == "true" && (
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
                    )}

                    {authData[index].stat == "false" && (
                      <p className="keyValue">{authitem.key}</p>
                      // <div className="svg_grid"></div>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {authData[index].stat == "false" && (
                    <div className="first_div">
                      <p className="keyValue">
                        {authitem.value ? authitem.value : authitem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}

                  {(authData[index].stat == "true" && (authData[index].default===0)?
                   ( <div class="md-form md-outline md-form-extraClass01">
                      <select
                        className="priceType_select"
                        value={authdesc}
                        onChange={event => route_auth_desc(event.target.value)}
                      >
                        <option>Select</option>
                        {verticalsfields.length > 0 &&
                          verticalsfields.map((item, a) => (
                            <option value={item.name}>{item.name}</option>
                          ))}
                      </select>
                    </div>):(<div className="half_div">
                      {/* <div className="border789 border789_dup">
                        <h1>Value</h1>
                        <input
                          className="input_borderless editbuyerRKeyInputs"
                          type="text"
                          name="key"
                          placeholder="Key edit"
                          value={authdesc}
                          onChange={event =>
                            route_auth_desc(event.target.value)
                          }
                        />
                      </div> */}
                    </div>)
                  )}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {auth_key_edit1==true&&
                    
                    
                    <p
                      className="key_edit"
                      onClick={() => {
                        if (authitem.default === 1) {
                          setDefaultAuthKeyStatus(false)
                          authData[index].stat = "true";
                          setEditAuthStatus(false);
                          setAuthStatus(false);
                          setAuthIndex(index);
                          setAuthKey(authData[index].key);
         
                          setAuthDesc(authData[index].value);
                        } else {
                          setDefaultAuthKeyStatus(false)
                          authData[index].stat = "true";
                          setEditDefaultAuthStatus(false);
                          setAuthStatus(false);
                          setAuthIndex(index);
                          setAuthKey(authData[index].key);
                          setauth_key_edit1(false)
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
    }
{auth_key_edit1==false&&
                    <FaCheck
                      className="FaCheck_icon"
                      onClick={() => {
                        if (authitem.default === 0) {
                          const newAuth = authData.map((item, key) => {
                            if (key === authindex) {
                              return {
                                default: 0,
                                key: authkey,

                                map_field: authdesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });
                          setAuthStatus(true);
                          setEditAuthStatus(false);
                          setAuthData(newAuth);
                          setAuthKey("");
                          setAuthDesc("");
                          setauth_key_edit1(true)
                        } else {
                          const newAuth = headerData.map((item, key) => {
                            if (key === headerindex) {
                              return {
                                default: 1,
                                key: authkey,

                                value: authdesc,

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
                    }
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
                    {pingAuthData[index].stat == "true" && (
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
                    )}

                    {pingAuthData[index].stat == "false" && (
                      <p className="keyValue">{authitem.key}</p>
                      // <div className="svg_grid"></div>
                    )}
                  </div>
                </td>
                <td class="th-sm extra_class12 extra_class12_DUP">
                  {pingAuthData[index].stat == "false" && (
                    <div className="first_div">
                      <p className="keyValue">
                        {authitem.value ? authitem.value : authitem.map_field}
                      </p>
                      <div className="svg_grid"></div>
                    </div>
                  )}

                  {(pingAuthData[index].stat == "true" &&( (pingAuthData[index].default===0)?
                   ( <div class="md-form md-outline md-form-extraClass01">
                      <select
                        className="priceType_select"
                        value={authdesc}
                        onChange={event => route_auth_desc(event.target.value)}
                      >
                        <option>Select</option>
                        {verticalsfields.length > 0 &&
                          verticalsfields.map((item, a) => (
                            <option value={item.name}>{item.name}</option>
                          ))}
                      </select>
                    </div>):(<div className="half_div">
                      <div className="border789 border789_dup">
                        <h1>Value</h1>
                        <input
                          className="input_borderless editbuyerRKeyInputs"
                          type="text"
                          name="key"
                          placeholder="Key edit"
                          value={authdesc}
                          onChange={event =>
                            route_auth_desc(event.target.value)
                          }
                        />
                      </div>
                    </div>)
                  ))}
                </td>
                <th class="th-sm extra_class12">
                  <div className="first_div">
                    {ping_auth_key_edit1==true&&
                    <p
                      className="key_edit"
                      onClick={() => {
                        if (authitem.default === 1) {
                          setDefaultAuthKeyStatus(false)
                          pingAuthData[index].stat = "true";
                          setEditAuthStatus(false);
                          setAuthStatus(false);
                          setAuthIndex(index);
                          setAuthKey(pingAuthData[index].key);

                          setAuthDesc(pingAuthData[index].value);
                        } else {
                          setEditAuthStatus(true);
                          pingAuthData[index].stat = "true";
                          setDefaultAuthKeyStatus(false)
                          setAuthStatus(false);
                          setAuthIndex(index);
                          setAuthKey(pingAuthData[index].key);
                          setping_auth_key_edit1(false)
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
    }
    {ping_auth_key_edit1==false&&
                    <FaCheck
                      className="FaCheck_icon"
                      onClick={() => {
                        if (authitem.default === 0) {
                          const newAuth = pingAuthData.map((item, key) => {
                            if (key === authindex) {
                              return {
                                default: 0,
                                key: authkey,

                                map_field: authdesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });
                          setAuthStatus(true);
                          setEditAuthStatus(false);
                          setPingAuthData(newAuth);
                          setAuthKey("");
                          setAuthDesc("");
                          setping_auth_key_edit1(true)
                        } else {
                          const newAuth = pingAuthData.map((item, key) => {
                            if (key === headerindex) {
                              return {
                                default: 1,
                                key: authkey,

                                value: authdesc,

                                stat: "false"
                              };
                            } else {
                              return item;
                            }
                          });
                          setAuthStatus(true);
                          setEditDefaultAuthStatus(false);
                          setPingAuthData(newAuth);
                          setAuthKey("");
                          setAuthDesc("");
                        }
                      }}
                    />
                    }
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

  //Function to add Data to database
  const save_details = () => {
    setFormats(
      formats.filter(item => {
        if (item.value != "") {
          return item;
        }
      })
    );
    if (
      name &&
      desc &&
      price &&
      pricetype &&
      noofleads &&
      url &&
      method &&
      failure &&
      success
    ) {
      //postpay is used to take one of the filedata or postfiledata which is coonatining data
      if (radiostatus == "xml") {
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
      }
      if (radiostatus == "json") {
        if (jsonfiledata) {
          postpay = jsonfiledata
            .toString()
            .split("\n")
            .join("")
            .split(" ")
            .join("");
        }
        if (postjsonfiledata) {
          postpay = postjsonfiledata
            .toString()
            .split("\n")
            .join("")
            .split(" ")
            .join("");
        }
      }
      //mkeys contains either of mappedKeys or pingpostmappedKeys
      // var mkeys = {};
      // if (!Object.entries(mappedKeys).length === 0 && mappedKeys.constructor === Object) {
      //   mkeys = mappedKeys;
      // }
      // if (Object.entries(pingpostmappedKeys).length === 0 && pingpostmappedKeys.constructor === Object) {
      //   mkeys = pingpostmappedKeys;
      // }
      var postkeys = [];
      if (xmlpost.length > 0) {
        postkeys = xmlpost;
      }
      if (pingpostxmlpost.length > 0) {
        postkeys = pingpostxmlpost;
      }
      const data = {
        route: {
          name: name,
          desc: desc,
          buyer_id: id,
          price: price,
          price_type: pricetype,
          no_of_leads: noofleads,
          post_url: url,
          ping_url: pingurl ? pingurl : "",
          method: method,
          delivery_type: deliverytype,
          vertical_id: selectedVerticalId,
          vertical_buyer_active: toggle ? 1 : 0,
          post_payload_data: postpay,
          ping_payload_data:
            radiostatus == "xml" && pingfiledata
              ? pingfiledata
                  .toString()
                  .split("\n")
                  .join("")
                  .split(" ")
                  .join("")
              : radiostatus == "json" && pingjsonfiledata
              ? pingjsonfiledata
                  .toString()
                  .split("\n")
                  .join("")
                  .split(" ")
                  .join("")
              : null,
          failure_key: failure,
          success_key: success,
          mapped_keys_post: method == "post" ? mappedKeys : pingpostmappedKeys,
          mapped_keys_ping: pingmappedKeys ? pingmappedKeys : "",
          payload_format: radiostatus ? radiostatus : null,
          ping_id_key: pingkey ? pingkey : ""
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
          payload: postkeys ? postkeys : null,
          pingpayload: pingxmlpost
        },
        route_filters: filterVerticalsFields.filter(item => {
          return item.value != "";
        }),
        route_formats: formats.filter(item => {
          return item.value != "";
        })
      };
      console.log("CreateRouteData==================================", data);
      const config = {
        url: API_URL+"/broutes/create", //URL
        data: data,
        method: "post", //method=post
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          if (response.status == 200) {
            localStorage.setItem("fd", " ");
            localStorage.setItem("success", 1); //To display modal after successful operation
            props.history.goBack(); //To return to previous screen on SuccessfulCreation
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      alert("Please fill all the details");
    }
  };
  // This function is called on hitting Test Buyer Route Button with all the parameters configured by admin and
  // the buyer api is hit to test weather he is providing correct data in correct format or not
  const save_test = () => {
    if (method == "post") {
      console.log(
        "Method is Post and data is",
        testfiledata ? testfiledata : mappedKeys1
      );
      const config = {
        url: url, //URL
        data: radiostatus == false ? mappedKeys1 : testfiledata,
        method: "post", //method=post
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          console.log("Test Response", response);
          setTestResModal(true);
          let a = "" + response + "";
          console.log("Test Error ", a);
          let j = Object.assign({}, { error: a });
          setTestRes(j);
        })
        .catch(error => {
          setTestResModal(true);
          let a = "" + error + "";
          console.log("Test Error ", a);
          let j = Object.assign({}, { error: a });
          setTestRes(j);
        });
    }
    if (method === "ping-post") {
      if (xmlpingstatus == "ping") {
        const config = {
          url: pingurl, //URL
          data: radiostatus == false ? mappedKeys2 : pingtestfiledata,
          method: "post", //method=post
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
          }
        };
        axios(config)
          .then(response => {
            console.log("Test Response", response);
            setTestResModal(true);
            let a = "" + response + "";
            console.log("Test Error ", a);
            let j = Object.assign({}, { error: a });
            setTestRes(j);
          })
          .catch(error => {
            setTestResModal(true);
            let a = "" + error + "";
            console.log("Test Error ", a);
            let j = Object.assign({}, { error: a });
            setTestRes(j);
          });
      }
      if (xmlpingstatus == "post") {
        const config = {
          url: url, //URL
          data: radiostatus == false ? pingpostmappedKeys : testfiledata,
          method: "post", //method=post
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
          }
        };
        axios(config)
          .then(response => {
            console.log("Test Response", response);
            setTestResModal(true);
            let a = "" + response + "";
            console.log("Test Error ", a);
            let j = Object.assign({}, { error: a });
            setTestRes(j);
          })
          .catch(error => {
            setTestResModal(true);
            let a = "" + error + "";
            console.log("Test Error ", a);
            let j = Object.assign({}, { error: a });
            setTestRes(j);
          });
      }
    }
  };
  const openResModal = () => {
    setResOpen(true);
  };
  // To close Create Model
  const closeResModal = () => {
    setResOpen(false);
  };
  // function to handle name
  const buyer_route_name = value => {
    setName(value);
  };
  // function to handle Description
  const buyer_route_desc = value => {
    setDesc(value);
  };
  // function to handle URL
  const buyer_route_url = value => {
    setUrl(value);
  };
  // function to handle Method
  const buyer_route_method = value => {
    setMethod(value);
  };
  // function to handle Price
  const buyer_route_price = value => {
    setPrice(value);
  };
  // function to handle Pricetype
  const buyer_route_pricetype = value => {
    setPriceType(value);
  };
  // function to handle noofleads
  const buyer_route_noofleads = value => {
    setNoOfLeads(value);
  };
  // function to handle success response
  const buyer_route_success = value => {
    setSuccess(value);
  };
  // function to handle failure response
  const buyer_route_failure = value => {
    setFailure(value);
  };
  // function to handle paramKey
  const route_param_key = value => {
    setParamKey(value);
  };
  // function to handle paramMapfield
  const route_param_desc = value => {
    setParamDesc(value);
  };
  // function to handle bodykey
  const route_body_key = value => {
    setBodyKey(value);
  };
  // function to handle Bodymapfield
  const route_body_desc = value => {
    // setBodyDesc(value);
    setBodyDesc(value);
  };
  const route_body_desc1 = value => {
    //setBodyDesc(value);
    setBodyDesc(value);
  };
  // function to handle Headerkey
  const route_header_key = value => {
    setHeaderKey(value);
  };
  // function to handle HeaderMapfield
  const route_header_desc = value => {
    setHeaderDesc(value);
  };
  // function to handle authkey
  const route_auth_key = value => {
    setAuthKey(value);
  };
  // function to handle authmapfield
  const route_auth_desc = value => {
    setAuthDesc(value);
  };
  function payload(a, b) {
    let temp = [];
    temp = [...global.payloadpick];
    temp[a] = b;
    global.payloadpick[a] = b;
    setPayloadPick(temp);
  }
  function payload1(a, b) {
    let temp = [];
    temp = [...global.payloadpick1];
    temp[a] = b;
    global.payloadpick1[a] = b;
    setPayloadPick1(temp);
  }
  function verticalToggle(a, b) {
    let temp = [];
    temp = [...filterVerticalsFields];
    temp[a] = b;
    filterVerticalsFields[a] = b;
    setFilterVerticalsFields(temp);
  }
  function dataformats(a, b) {
    let temp = [];
    temp = [...formats];
    temp[a] = b;
    formats[a] = b;
    setFormats(temp);
  }
  //Styles for a modal
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
  const customStyles1 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "35%",
      height: "50%"
    }
  };
  //Here verticals list api is hit to get all the verticals
  useEffect(() => {
    document.title = "Create Buyer Route - LeadsWatch";
    if (localStorage.getItem != " ") {
      setFileData(localStorage.getItem("fd"));
    }
    const data = {
      page: 1,
      limit: 100,
      search: "",
      sortby: {
        created: -1
      }
    };
    const config1 = {
      url: API_URL+"/vertical/list",
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config1)
      .then(response => {
        setVerticals(response.data.data.list); //The vertical list is set to this state and used to render in dropdown using map function
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        alert(error.response.data.error.message);
      });
  }, []);
  //Function to handle FIle Picker
  const handleChangeFile = file => {
    var reader = new FileReader(); //File content is read using FileReader and given as input to xml parser (if JSON its converted into xml and parsed)
    reader.onload = function(event) {
      localStorage.setItem("undo", event.target.result);
      if (method === "post") {
        localStorage.setItem("createxmlfile", event.target.value);
        setFileData(event.target.result);
        setTestFileData(event.target.result);
      }
      if (method === "ping-post") {
        if (xmlpingstatus === "ping") {
          console.log("Inside PingPost Ping");
          setPingFileData(event.target.result);
          setPingTestFileData(event.target.result);
        }
        if (xmlpingstatus === "post") {
          console.log("Inside PingPost Post");
          setPostFileData(event.target.result);
          setTestFileData(event.target.result);
        }
      }
      if (radiostatus === "json") {
        if (method === "ping-post") {
          if (xmlpingstatus === "ping") {
            var jsonxml = require("jsontoxml");
            var xmlconv = jsonxml(event.target.result);
            setPingJSONFileData(xmlconv);
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
            var jsonxml = require("jsontoxml");
            var xmlconv = jsonxml(event.target.result);
            setPostJSONFileData(xmlconv);
            var XMLParser = require("react-xml-parser");
            var xml1 = new XMLParser().parseFromString(xmlconv);
            var xmlget1 = xml1.getElementsByTagName("*");
            global.payloadpick = [];
            for (var i = 0; i < xmlget1.length; i++) {
              xmlarray1.push(xmlget1[i].name);
              if (xmlget1[i].children.length > 0) {
                xmlindexarray1.push(i);
              }
              global.payloadpick.push("");
            }
            setXmlState2(true);
          }
        }
        if (method === "post") {
          var jsonxml = require("jsontoxml");
          var xmlconv = jsonxml(event.target.result);
          setJsonFileData(xmlconv);
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
      if (radiostatus === "xml") {
        if (method === "ping-post") {
          if (xmlpingstatus === "ping") {
            console.log("Hello i am inside xml file");
            var XMLParser = require("react-xml-parser");
            var xml = new XMLParser().parseFromString(event.target.result);
            var xmlget = xml.getElementsByTagName("*");
            global.payloadpick1 = [];
            for (var i = 0; i < xmlget.length; i++) {
              xmlarray.push(xmlget[i].name);
              if (xmlget[i].children.length > 0) {
                xmlindexarray.push(i);
              }
              global.payloadpick1.push("");
            }
            setXmlState1(true);
          }
          if (xmlpingstatus === "post") {
            console.log("Hello i am inside xml file");
            var XMLParser = require("react-xml-parser");
            var xml1 = new XMLParser().parseFromString(event.target.result);

            var xmlget1 = xml1.getElementsByTagName("*");
            global.payloadpick = [];
            for (var i = 0; i < xmlget1.length; i++) {
              xmlarray1.push(xmlget1[i].name);
              if (xmlget1[i].children.length > 0) {
                xmlindexarray1.push(i);
              }
              global.payloadpick.push("");
            }
            setXmlState2(true);
          }
        }
        if (method === "post") {
          var XMLParser = require("react-xml-parser");
          var xml = new XMLParser().parseFromString(event.target.result);
          // console.log(xml.getElementsByTagName("spec").text("Uday"))
          // console.log("XMMXLXMXKMKNSJBDJHD BHSJD",xml.text())
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
  //Function to get Vertical fields of a particular vertical
  //This function is called on selecting a particular vertical in select vertical dropdown
  //Verticals fields api is hit based on verrtical id
  const showVerticals = value => {
    console.log("Vertical ID", value);
    const data = {
      page: 1,
      limit: 100,
      search: "",
      sortby: {
        created: -1
      }
    };
    const config2 = {
      url: API_URL+`/vertical/fieldlist/${value}`,
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config2)
      .then(response => {
        console.log("Vertfields", response);
        global.verttoggle = [];
        let a = [];

        for (var i = 0; i < response.data.data.list.length; i++) {
          global.verttoggle.push(1);
          a.push({
            key: response.data.data.list[i].name,
            value: "",
            allow: 1,
            match: "exact"
          });
        }
        setFilterVerticalsFields(a);
        
        // console.log("Length", global.verttoggle);
        setVerticalsFields(response.data.data.list);
      })
      // Error handling
      .catch(error => {
        console.log("VerticalFieldslisterror", error);
        // window.alert(error.response.data.error.message);
      });
  };
  //This function is to store the edited content in textarea
  const handleChangeEdit = value => {
    if (method === "post") {
      let data1;
      data1 = value;

      setFileData(data1);
    }
    if (method === "ping-post") {
      let data1;
      data1 = value;
      if (xmlpingstatus === "ping") setPingFileData(data1);
      if (xmlpingstatus === "post") setPostFileData(data1);
    }
  };
  //To open model
  const openModal = () => {
    setOpen(true);
  };
  // To close Create Model
  const closeModal = () => {
    setOpen(false);
  };
  var copykeys = {};
  if (xmlpingstatus == "ping" && method === "ping-post") {
    copykeys = pingmappedKeys;
  }
  if (xmlpingstatus == "post" && method === "ping-post") {
    copykeys = pingpostmappedKeys;
  }
  if (method === "post") {
    copykeys = mappedKeys;
  }
  return (
    <Router>
      <div
        className="createBuyerRoute"
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
          <div style={{ position: "absolute" }}>
            {/* This modal is opened on clicking Test Buyer Route */}
            {/* Here testData contains all the parameters configured by the admin in route and text box is provided to 
            take test value  */}
            <Modal isOpen={testopen} className="route_edit_mod1">
              <div
                className="buyers_createBuyers_closetest12"
                onClick={() => {
                  setTestOpen(false);
                }}
              >
                <IoIosClose />
              </div>
              <div className="scroll_test">
                {testData.length == 0 &&
                  pingtestData.length == 0 &&
                  Object.entries(mappedKeys).length === 0 &&
                  Object.entries(pingpostmappedKeys).length === 0 &&
                  Object.entries(pingmappedKeys).length === 0 && (
                    <div>
                      {" "}
                      <p
                        style={{
                          color: "#484393",
                          fontSize: "18px",
                          fontWeight: "400",
                          textAlign: "center",
                          paddingTop: "10%"
                        }}
                      >
                        Configure Buyer Parameters To Test!!
                      </p>
                    </div>
                  )}
                {testData &&
                  testData.map(item => (
                    <div className="test_route">
                      <div className="test_key">
                        <p>{item.key}:</p>
                      </div>
                      <div className="test_input">
                        <input
                          type="text"
                          placeholder="Test"
                          onChange={e => {
                            Object.assign(mappedKeys1, {
                              [item.key]: e.target.value
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                {pingtestData &&
                  pingtestData.map(item => (
                    <div className="test_route">
                      <div className="test_key">
                        <p>{item.key}:</p>
                      </div>
                      <div className="test_input">
                        <input
                          type="text"
                          placeholder="Test"
                          onChange={e => {
                            Object.assign(mappedKeys2, {
                              [item.key]: e.target.value
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                {copykeys &&
                  Object.keys(copykeys).map(item => (
                    <div className="test_route">
                      <div className="test_key">
                        <p>{item}:</p>
                      </div>
                      <div className="test_input">
                        <input
                          type="text"
                          placeholder="Test"
                          onChange={e => {
                            var replacee =
                              "<" +
                              item +
                              ">" +
                              "[\\s\\S]*?" +
                              "<\\/" +
                              item +
                              ">";
                            var replacer =
                              "<" +
                              item +
                              ">" +
                              e.target.value +
                              "</" +
                              item +
                              ">";
                            var re = new RegExp(replacee);
                            if (method === "post" && radiostatus == "xml") {
                              var temp = testfiledata;
                              temp = temp.replace(re, replacer);
                              console.log("Temp", temp);
                              setTestFileData(temp);
                            }
                            if (method === "post" && radiostatus == "json") {
                              var temp = jsonfiledata;
                              temp = temp.replace(re, replacer);
                              console.log("Temp", temp);
                              setTestFileData(temp);
                            }
                            if (method === "ping-post") {
                              if (
                                xmlpingstatus == "post" &&
                                radiostatus == "xml"
                              ) {
                                var temp = testfiledata;
                                temp = temp.replace(re, replacer);
                                console.log("Temp", temp);
                                setTestFileData(temp);
                              }
                              if (
                                xmlpingstatus == "post" &&
                                radiostatus == "json"
                              ) {
                                var temp = postjsonfiledata;
                                temp = temp.replace(re, replacer);
                                console.log("Temp", temp);
                                setTestFileData(temp);
                              }
                              if (
                                xmlpingstatus == "ping" &&
                                radiostatus == "xml"
                              ) {
                                var temp = pingtestfiledata;
                                temp = temp.replace(re, replacer);
                                console.log("Temp", temp);
                                setPingTestFileData(temp);
                              }
                              if (
                                xmlpingstatus == "ping" &&
                                radiostatus == "json"
                              ) {
                                var temp = pingjsonfiledata;
                                temp = temp.replace(re, replacer);
                                console.log("Temp", temp);
                                setPingTestFileData(temp);
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="buyers_create_btn_divtest">
                <div>
                  <button
                    className="buyers_create_btn"
                    onClick={() => {
                      console.log("post method ", mappedKeys1);
                      console.log("post method ", testfiledata);
                      console.log("ping method-ping ", mappedKeys2);
                      console.log("ping method -post", mappedKeys1);
                      console.log("ping-post method -ping", pingtestfiledata);
                      console.log("post method -post", testfiledata);
                      save_test();
                    }}
                  >
                    Test Buyer Route
                  </button>
                </div>
              </div>
            </Modal>
            {/* End of Test Buyer Route Modal */}
            {/* Modal to show the response of the buyer api on hitting Test Buyer Route */}
            <Modal isOpen={testresmodal} style={customStyles}>
              <div
                className="buyers_createBuyers_closetest"
                onClick={() => {
                  setTestResModal(false);
                }}
              >
                <IoIosClose />
              </div>
              <div className="scroll_test">
                <p
                  style={{
                    color: "#484393",
                    textAlign: "center",
                    marginTop: "10%",
                    fontWeight: "400"
                  }}
                >
                  {testres ? testres.error : err_res}
                </p>
              </div>
            </Modal>
            {/* Modal to show filters with all the vertical fields and toggle with defaukt value true which allows and blocks on turning it off */}
            <Modal isOpen={filterstatus} style={customStyles}>
              <div
                className="buyers_createBuyers_closetest123"
                onClick={() => {
                  setFilterStatus(false);
                }}
              >
                <IoIosClose />
              </div>
              <div className="scroll_test">
                {filterVerticalsFields &&
                  filterVerticalsFields.map((item, index) => (
                    <div className="test_route">
                      <div className="test_key">
                        <p>{item.key}:</p>
                      </div>
                      <div className="test_input">
                        <input
                          value={item.value}
                          className="route_in"
                          type="text"
                          placeholder="Test"
                          onChange={e => {
                            verticalToggle(index, {
                              key: item.key,
                              value: e.target.value,
                              allow: item.allow,
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
                        // value={global.verttoggle[index]}
                        value={item.allow}
                        onToggle={e => {
                          verticalToggle(index, {
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
                            allow: item.allow ? 0 : 1,
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
              {/* <p>hello</p> */}
              {verticalsfields.length == 0 && (
                <div
                  style={{
                    margin: "10%",
                    color: "#484393",
                    textAlign: "center",
                    fontWeight: "400",
                    marginBottom: "0px",
                    fontSize: "18px"
                  }}
                >
                  <p>Select Vertical to Configure Filters</p>
                </div>
              )}
              <div className="buyers_create_btn_divtest">
                <div>
                  <button
                    className="buyers_create_btn_rout_buy"
                    onClick={() => {
                      let a = [];
                      a = filterVerticalsFields.filter(item => {
                        if (item.value != "") {
                          return item;
                        }
                      });
                      setFilterVerticalsFields(a);
                      console.log("I am Test Data", a);
                      setFilterStatus(false);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Modal>
            {/* End of filters Modal */}
          </div>
          <div className="page_heading route_buyerRoute_page_heading">
            <div
              className="back_buy_contact"
              onClick={() => {
                history.goBack();
              }}
            >
              <IoIosArrowBack />
            </div>
            <div className="page_heading_name">Create Buyer Route</div>
          </div>
          <div className="body_inner_section01">
            <div className="edit_row1_main">
              <div className="box_head_route">
                <p>Route Details</p>
              </div>
              <Row>
                <Col xl={6} lg={6}>
                  <div className="select_top_div">
                    <div class="md-form md-outline creatBuyerInputBox">
                      <input
                        type="text"
                        name="name"
                        id="createBuyerName"
                        class="form-control"
                        onChange={event => buyer_route_name(event.target.value)}
                      />
                      <label for="createBuyerName">Name</label>
                    </div>
                  </div>

                  <div class="border009">
                    <h1>Select Vertical</h1>
                    <select
                      className="select_top"
                      textFieldProps={{
                        label: "Label",
                        InputLabelProps: {
                          shrink: true
                        }
                      }}
                      onChange={event => {
                        setSelectedVerticalId(event.target.value);
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
                    <h1>Payment Type</h1>
                    <select
                      className="select_top"
                      value={pricetype}
                      onChange={event =>
                        buyer_route_pricetype(event.target.value)
                      }
                    >
                      <option>Percentage</option>
                      <option>Amount</option>
                    </select>
                  </div>

                  <div className="">
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
                    </div>
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
                  <div class="md-form md-outline creatBuyerInputBox CreateBuyerDesc">
                    <textarea
                      name="desc"
                      id="createBuyerDesc"
                      class="form-control"
                      onChange={event => buyer_route_desc(event.target.value)}
                    />
                    <label for="createBuyerDesc">Description</label>
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
                        buyer_route_method(event.target.value);
                        if (event.target.value == "ping-post") {
                        } else {
                          setPingShow(false);
                          setPostShow(true);
                        }
                      }}
                    >
                      <option value="post">Post</option>
                      <option value="ping-post">Ping-Post</option>
                    </select>
                  </div>
                  {method == "ping-post" && (
                    <div>
                      <div class="md-form md-outline creatBuyerInputBox">
                        <input
                          type="text"
                          name=" Ping url"
                          id="createBuyerLeads"
                          class="form-control"
                          onChange={event => setPingUrl(event.target.value)}
                        />
                        <label for="createBuyerLeads">Ping URL</label>
                      </div>
                    </div>
                  )}

                  <div class="md-form md-outline creatBuyerInputBox">
                    <input
                      type="text"
                      name="url"
                      id="createBuyerUrl"
                      class="form-control"
                      onChange={event => buyer_route_url(event.target.value)}
                    />
                    <label for="createBuyerUrl">URL</label>
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
                  <div class="md-form md-outline creatBuyerInputBox">
                    <input
                      type="text"
                      name="noofleads"
                      id="createBuyerLeads"
                      class="form-control"
                      onChange={event =>
                        buyer_route_noofleads(event.target.value)
                      }
                    />
                    <label for="createBuyerLeads">Limit Leads (per day)</label>
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
                          placeholder="Success"
                          onChange={event =>
                            buyer_route_success(event.target.value)
                          }
                        />
                          <span className="info_success"><IoMdInformationCircle onClick={()=>{openResModal()}} /></span>
                        <input
                          type="text"
                          name="url"
                          placeholder="Failure"
                          onChange={event =>
                            buyer_route_failure(event.target.value)
                          }
                        />
                          <span className="info_success1"><IoMdInformationCircle onClick={()=>{openResModal()}} /></span>
                      </div>

                      <Modal isOpen={resopen} className="route_edit_mod1">
              <div
                className="buyers_createBuyers_closetest12"
                onClick={() => {
                  closeResModal(false);
                }}
              >
                <IoIosClose />
              </div>


                             <p className="modalp">Response:<span style={{color:"red",fontWeight:"bold"}}>"result":</span>"failed","price":"0.00","msg":"Invalid Request","errors":["error":"Invalid Request"]</p>
                            </Modal>
                      {method == "ping-post" && (
                        <input
                          className="right_block_divs_input"
                          type="text"
                          //  id="createBuyerUrl"
                          name="Ping id"
                          placeholder="Ping ID"
                          onChange={event => setPingKey(event.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="edit_row1_main1">
              <div className="box_head_route">
                <p>Data Formats</p>
              </div>

              <table
                id="dtBasicExample"
                class="table table-striped_buy table-sm table_buy_con12_formats"
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
                        onChange={event => {
                          dataformats(0, {
                            key: "dateofbirth",
                            value: event.target.value,
                            map_field: formats[0].map_field
                          });
                        }}
                      >
                        <option>MM-DD-YYYY</option>
                        <option value="Y">YEARS</option>
                      </select>
                    </td>
                    <td className="td_buy_con1x">
                      <div class="md-form md-outline create_buy_no_data11">
                        <input
                          type="text"
                          id="email_id002a_12ab"
                          className="form-control buyer_popup_field"
                          onChange={e => {
                            dataformats(0, {
                              key: "dateofbirth",
                              value: e.target.value,
                              map_field: formats[0].map_field
                            });
                          }}
                        />
                        <label
                          className="input_text_buyer"
                          for="email_id002a_12ab"
                        >
                          Date of Birth
                        </label>
                      </div>{" "}
                    </td>
                    <td>
                      
                      <select
                        id="selectBox"
                        className="priceType_select priceType_select0059formatsx12"
                        onChange={e => {
                          dataformats(0, {
                            key: "dateofbirth",
                            value: formats[0].value,
                            map_field: e.target.value
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
                        <p>Time</p>
                      </div>
                    </td>
                    <td className="td_buy_con1">
                      <select
                        className="priceType_select0059formatss"
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
                      <div class="md-form md-outline create_buy_no_data11">
                        <input
                          type="text"
                          id="email_id002a_12ab"
                          className="form-control buyer_popup_field"
                          onChange={e => {
                            dataformats(1, {
                              key: "time",
                              value: e.target.value,
                              map_field: formats[1].map_field
                            });
                          }}
                        />
                        <label
                          className="input_text_buyer"
                          for="email_id002a_12ab"
                        >
                          Time Format
                        </label>
                      </div>{" "}
                    </td>
                    <td>
                     

                      <select
                        id="selectBox"
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
                        onChange={e => {
                          dataformats(2, {
                            key: "date",
                            value: e.target.value,
                            map_field: formats[2].map_field
                          });
                        }}
                      >
                        <option>MM-DD-YYYY</option>
                        <option>YEARS</option>
                      </select>
                    </td>
                    <td>
                      <div class="md-form md-outline create_buy_no_data11">
                        <input
                          type="text"
                          id="email_id002a_12ab"
                          className="form-control buyer_popup_field"
                          onChange={e => {
                            dataformats(2, {
                              key: "date",
                              value: e.target.value,
                              map_field: formats[2].map_field
                            });
                          }}
                        />
                        <label
                          className="input_text_buyer"
                          for="email_id002a_12ab"
                        >
                          Date
                        </label>
                      </div>{" "}
                    </td>
                    <td>
                      
                      <select
                        id="selectBox"
                        className="priceType_select priceType_select0059formatsx12"
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
                      {/* </div> */}
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
                        onChange={e => {
                          dataformats(3, {
                            key: "phone",
                            value: e.target.value,
                            map_field: formats[3].map_field
                          });
                        }}
                      >
                        <option value="^(1\s?)?((([0-9]{3}))|[0-9]{3})[\s-]?[\0-9]{3}[\s-]?[0-9]{4}$">
                          1 (555)-555-5555
                        </option>
                        <option value="^([0-9]{3})[0-9]{3}-[0-9]{4}$">
                          123-123-1234
                        </option>
                        <option value="^[6-9]\d{9}$">9090909090</option>
                      </select>
                    </td>
                    <td>
                      <div class="md-form md-outline create_buy_no_data11">
                        <input
                          type="text"
                          id="email_id002a_12ab"
                          className="form-control buyer_popup_field"
                          onChange={e => {
                            dataformats(3, {
                              key: "phone",
                              value: e.target.value,
                              map_field: formats[3].map_field
                            });
                          }}
                        />
                        <label
                          className="input_text_buyer"
                          for="email_id002a_12ab"
                        >
                          Phone
                        </label>
                      </div>{" "}
                    </td>
                    <td>
                      

                      <select
                        id="selectBox"
                        className="priceType_select priceType_select0059formatsx12"
                        onChange={event => {
                          dataformats(3, {
                            key: "phone",
                            value: formats[3].map_field,
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

                  {filterVerticalsFields &&
                    filterVerticalsFields.map((item, index) => (
                      <tbody class="buy_r_body12">
                        <tr>
                          <td className="text_center_buyroute">{item.key}</td>
                          <td className="td_buy_con1">
                            <div class="md-form md-outline create_buy_no_data11_test12">
                              <input
                                type="text"
                                id="email_id002a_12ab"
                                className="form-control buyer_popup_field"
                                value={item.value}
                                onChange={e => {
                                  verticalToggle(index, {
                                    key: item.key,
                                    value: e.target.value,
                                    allow: item.allow,
                                    match: item.match
                                  });
                                }}
                              />
                              <label
                                className="input_text_buyer"
                                for="email_id002a_12ab"
                              >
                                Test
                              </label>
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
                                  verticalToggle(index, {
                                    key: item.key,
                                    value: item.value,
                                    allow: item.allow ? 0 : 1,
                                    match: item.match
                                  });
                                }}
                              />
                              <p style={{ color: "green",marginLeft:"2rem" }}>Allow</p>
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
                    className="buyers_create_btn_rout_buy"
                    onClick={() => {
                      let a = [];
                      a = filterVerticalsFields.filter(item => {
                        if (item.value != "") {
                          return item;
                        }
                      });
                      setFilterVerticalsFields(a);
                      console.log("I am Test Data", a);
                      setFilterStatus(false);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {postshow && (
              <div className="upload_sec_extraclass">
                <div className="upload_sec_create">
                  <div className="box_head_route_create">
                    <p>Data Mapping</p>
                  </div>
                  <Col lg={12} xl={12}>
                    <div className="second_block_right">
                      <label>
                        Do you have a sample post Information file? Click "Yes"
                        to upload the file or paste the sample data, and "No" to
                        manually configure the API
                      </label>
                      <div className="radiobtns">
                        <div className="switch-field">
                          <input
                            type="radio"
                            id="radio-one"
                            name="switch-one"
                            value="yes"
                          />
                          <label
                            for="radio-one"
                            onClick={() => {
                              if (method == "post") {
                                setCards(false);
                                setShowUpload(true);
                                setPingShow(false);
                                setPostCards(false);
                              }
                              if (method == "ping-post") {
                                setPingXmlShow(true);
                                setPingUpload(true);
                                setPostCards(false);
                                setPingShow(false);
                              }
                            }}
                          >
                            Yes
                          </label>

                          <input
                            type="radio"
                            id="radio-two"
                            name="switch-one"
                            value="no"
                          />
                          <label
                            for="radio-two"
                            onClick={() => {
                              if (method === "post") {
                                setCards(true);
                                setShowUpload(false);
                              }
                              if (method === "ping-post") {
                                setPingXmlShow(false);
                                setPingUpload(false);
                                setCards(false);
                                setShowUpload(false);
                                setPingShow(true);
                                setPostCards(true);
                              }
                            }}
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* <p style={{ height: "1rem" }} /> */}

                    <div className="upload_div">
                      {showUpload && (
                        <div className="upload_div_inner">
                          <p>
                            Select a file type to upload your sample post data
                          </p>
                          <select
                            onChange={event => {
                              setRadioStatus(event.target.value);
                              localStorage.setItem(
                                "picker",
                                event.target.value
                              );
                            }}
                          >
                            <option>Select File Type</option>
                            <option value="xml">XML</option>
                            <option value="json">JSON</option>
                          </select>
                          {radiostatus && (
                            <input
                              type="file"
                              onClick={() => {
                                setPayloadPick([]);
                                setXmlArray([]);
                                setXmlIndexArray([]);
                                setXmlPost([]);
                                setXmlState(false);
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

                          <textarea
                            rows="10"
                            cols="20"
                            style={{
                              backgroundColor: "#888888",
                              color: "white",
                              border: "none",
                              borderRadius: "0 0 5px 5px"
                            }}
                            value={filedata}
                            onChange={e => handleChangeEdit(e.target.value)}
                          />

                          <div className="buyers_create_btn_div01">
                            <button
                              className="buyers_create_btn01"
                              onClick={() => {
                                localStorage.setItem("fd", filedata);
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="buyers_create_btn01"
                              onClick={() => {
                                setFileData(localStorage.getItem("undo"));
                              }}
                            >
                              Revert
                            </button>
                          </div>

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
                                  <th style={{ textAlign: "center" }}>
                                    Buyer Field
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Map Field
                                  </th>
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
                                              payload(
                                                index,
                                                event.target.value
                                              );

                                              if (radiostatus == "xml") {
                                                var replacee =
                                                  "<" +
                                                  item +
                                                  ">" +
                                                  "(?!#)[\\s\\S]*?|[\\s\\S]*?" +
                                                  "<\\/" +
                                                  item +
                                                  ">";
                                                var replacer =
                                                  "<" +
                                                  item +
                                                  ">" +
                                                  "#" +
                                                  verticalsfields[
                                                    event.target.value
                                                  ].name +
                                                  "#" +
                                                  "</" +
                                                  item +
                                                  ">";
                                                var re = new RegExp(replacee);
                                                console.log(
                                                  "Type",
                                                  /<item>[\s\S]*?<\/item>/,
                                                  "<`${item}`>" +
                                                    "#" +
                                                    verticalsfields[
                                                      event.target.value
                                                    ].name +
                                                    "#" +
                                                    "</`${item}`>"
                                                );
                                                var a = filedata;
                                                a = a
                                                  .toString()
                                                  .replace(re, replacer);
                                                // console.log(
                                                //   "XML CREATED FILE",
                                                //   a
                                                // );
                                                setFileData(a);
                                              } else {
                                                var replacee =
                                                  "<" +
                                                  item +
                                                  ">" +
                                                  "(?!#)[\\s\\S]*?|[\\s\\S]*?" +
                                                  "<\\/" +
                                                  item +
                                                  ">";
                                                var replacer =
                                                  "<" +
                                                  item +
                                                  ">" +
                                                  "#" +
                                                  verticalsfields[
                                                    event.target.value
                                                  ].name +
                                                  "#" +
                                                  "</" +
                                                  item +
                                                  ">";
                                                var re = new RegExp(replacee);
                                                console.log(
                                                  "Type",
                                                  /<item>[\s\S]*?<\/item>/,
                                                  "<`${item}`>" +
                                                    "#" +
                                                    verticalsfields[
                                                      event.target.value
                                                    ].name +
                                                    "#" +
                                                    "</`${item}`>"
                                                );
                                                var a = jsonfiledata;
                                                var a = a
                                                  .toString()
                                                  .replace(re, replacer);
                                                console.log(
                                                  "XML CREATED FILE",
                                                  a
                                                );
                                                setJsonFileData(a);
                                              }
                                              console.log(
                                                "mappedkeys",
                                                Object.assign(mappedKeys, {
                                                  [item]:
                                                    "#" +
                                                    verticalsfields[
                                                      event.target.value
                                                    ].name +
                                                    "#"
                                                })
                                              );

                                              xmlpost.push({
                                                default: 0,
                                                key: item,
                                                datatype:
                                                  verticalsfields[
                                                    event.target.value
                                                  ].datatype,
                                                required: "Yes",
                                                map_field:
                                                  verticalsfields[
                                                    event.target.value
                                                  ].name
                                              });
                                            }}
                                          >
                                            <option label="select" />
                                            {verticalsfields.map(
                                              (item, key) => (
                                                <option
                                                  label={item.name}
                                                  value={key}
                                                />
                                              )
                                            )}
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
                      )}
                    </div>
                    {cards && (
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
                    )}

                    {lead_butt1 == true && (
                      <div>
                        {cards && (
                          <div className="second_right_bottom_inner_F">
                            <div className="plus_buy_route">
                              <label>Params</label>
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
                                            id="key1"
                                            class="form-control input_borderless"
                                            onChange={event =>
                                              route_param_key(
                                                event.target.value
                                              )
                                            }
                                          />
                                          <label
                                            className="input_text_buyer"
                                            for="ekey1"
                                          >
                                            
                                          </label>
                                        </div>
                                      </td>
                                      <td>
                                        <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel">
                                          <select
                                            id="selectBox"
                                            className="priceType_select priceType_select0059 priceType_select0059_sel"
                                            value={paramdesc}
                                            onChange={event => {
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
                                                base: "#63E57D"
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
                                          <p style={{ color: "green" }}>
                                            Input
                                          </p>
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
                                      setParamStatus(true);
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
                                            class="form-control input_borderless"
                                            value={paramkey}
                                            onChange={event =>
                                              route_param_key(
                                                event.target.value
                                              )
                                            }
                                          />
                                          <label
                                            className="input_text_buyer"
                                            for="ekey1"
                                          >
                                            
                                          </label>
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
                                              route_param_desc(
                                                event.target.value
                                              )
                                            }
                                          />
                                          <label
                                            className="input_text_buyer"
                                            for="form289"
                                          >
                                            
                                          </label>
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
                                          <p style={{ color: "green" }}>
                                            Input
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <div className="buyers_create_btn_div">
                                  <button
                                    className="buyers_create_btn"
                                    onClick={() => {
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
                        {cards && (
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
                                            id="key2"
                                            value={bodykey}
                                            class="form-control input_borderless"
                                            onChange={event =>
                                              route_body_key(event.target.value)
                                            }
                                          />
                                          <label
                                            className="input_text_buyer"
                                            for="ekey1"
                                          >
                                            
                                          </label>
                                        </div>
                                      </td>
                                      <td>
                                        <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel">
                                          <select
                                            id="selectBox"
                                            className="priceType_select priceType_select0059 priceType_select0059_sel"
                                            value={bodydesc}
                                            onChange={event => {
                                              // route_body_desc(event.target.value)
                                              //console.log(event.target.value);
                                              route_body_desc(
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
                                                base: "#63E57D"
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
                                          <p style={{ color: "green" }}>
                                            Input
                                          </p>
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
                                            id="form27"
                                            name="key"
                                            value={bodykey}
                                            class="form-control input_borderless"
                                            onChange={event =>
                                              route_body_key(event.target.value)
                                            }
                                          />
                                          <label
                                            className="input_text_buyer"
                                            for="ekey1"
                                          >
                                            
                                          </label>
                                        </div>
                                      </td>
                                      <td>
                                        <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                          <input
                                            type="text"
                                            id="form72"
                                            name="value"
                                            value={bodydesc}
                                            class="form-control input_borderless"
                                            onChange={event =>
                                              setBodyDesc(event.target.value)
                                            }
                                          />
                                          <label
                                            className="input_text_buyer"
                                            for="form289"
                                          >
                                            
                                          </label>
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
                                          <p style={{ color: "green" }}>
                                            Input
                                          </p>
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
                                      getDefaultBody();
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
                        {cards && (
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
                                            value={headerkey}
                                            name="key"
                                            id="key3"
                                            class="form-control input_borderless"
                                            onChange={event =>
                                              route_header_key(
                                                event.target.value
                                              )
                                            }
                                           
                                          />
                                          <label
                                            className="input_text_buyer"
                                            for="ekey1"
                                          >
                                            
                                          </label>
                                        </div>
                                      </td>
                                      <td>
                                        <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel">
                                          <select
                                            id="selectBox"
                                            className="priceType_select priceType_select0059 priceType_select0059_sel"
                                            value={headerdesc}
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
                                              setDefaultHeaderKeyStatus(true);
                                              setHeaderStatus(false);
                                            }}
                                          />
                                          <p style={{ color: "green" }}>
                                            Input
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <p style={{ height: "1%" }} />

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
                                            id="form52"
                                            value={headerkey}
                                            class="form-control input_borderless"
                                            onChange={event =>
                                              route_header_key(
                                                event.target.value
                                              )
                                            }
                                          />
                                          <label
                                            className="input_text_buyer"
                                            for="ekey1"
                                          >
                                            
                                          </label>
                                        </div>
                                      </td>
                                      <td>
                                        <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                          <input
                                            type="text"
                                            id="form2"
                                            name="key"
                                            value={headerdesc}
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
                                          >
                                            
                                          </label>
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
                                          <p style={{ color: "green" }}>
                                            Input
                                          </p>
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
                        {cards && (
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
                                            value={authkey}
                                            id="key4"
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
                                          >
                                            
                                          </label>
                                        </div>
                                      </td>
                                      <td>
                                        <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel">
                                          <select
                                            id="selectBox"
                                            className="priceType_select priceType_select0059 priceType_select0059_sel"
                                            value={authdesc}
                                            onChange={event => {
                                              // route_body_desc(event.target.value)
                                              //console.log(event.target.value);
                                              route_auth_desc(
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
                                            value={toggle4}
                                            onToggle={e => {
                                              setToggle4(!toggle4);
                                              setDefaultAuthKeyStatus(true);
                                              setAuthStatus(false);
                                            }}
                                          />
                                          <p style={{ color: "green" }}>
                                            Input
                                          </p>
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
                                            id="form82"
                                            name="key"
                                            value={authkey}
                                            class="form-control input_borderless"
                                            onChange={event =>
                                              route_auth_key(event.target.value)
                                            }
                                          />
                                          <label
                                            className="input_text_buyer"
                                            for="ekey1"
                                          >
                                            
                                          </label>
                                        </div>
                                      </td>
                                      <td>
                                        <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                          <input
                                            type="text"
                                            id="form92"
                                            name="key"
                                            value={authdesc}
                                            class="form-control input_borderless"
                                            onChange={event =>
                                              route_auth_desc(
                                                event.target.value
                                              )
                                            }
                                          />
                                          <label
                                            className="input_text_buyer"
                                            for="form289"
                                          >
                                            
                                          </label>
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
                                          <p style={{ color: "green" }}>
                                            Input
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

       
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

                    {cards && (
                      <div className="second_right_bottom">
                        {/* End of Params */}

                        <p style={{ height: "1%" }} />

                        <p style={{ height: "1%" }} />

                        <p style={{ height: "1%" }} />
                      </div>
                    )}
                  </Col>
                </div>
              </div>
            )}
            {pingshow && (
              <div className="modal_tab_btns">
                <button
                  onClick={() => {
                    setDialogDetails("ping");
                    setPostCards(true);
                    setlead_butt1(true);
                    setlead_butt2(false);
                    console.log("Ping");
                  }}
                  className={lead_butt1 == true ? "butt_true" : "butt_false"}
                >
                  Ping
                </button>
                <button
                  onClick={() => {
                    console.log("Post");
                    setDialogDetails("post");
                    setPostCards(true);
                    setlead_butt2(true);
                    setlead_butt1(false);
                  }}
                  className={lead_butt2 == true ? "butt_true" : "butt_false"}
                >
                  Post
                </button>
              </div>
            )}
            {pingxmlshow && (
              <div className="modal_tab_btns">
                <button
                  onClick={() => {
                    setPingUpload(true);
                    setXmlPingStatus("ping");
                    setlead_butt1(true);
                    setlead_butt2(false);
                    // setPingFileData("");
                    // setXmlState1(false);
                    // setXmlIndexArray([]);
                    // setXmlArray([]);
                    // setPayloadPick([]);
                  }}
                  className={lead_butt1 == true ? "butt_true" : "butt_false"}
                >
                  Ping
                </button>
                <button
                  onClick={() => {
                    setXmlPingStatus("post");
                    // setXmlState1(false);

                    // setXmlArray([]);
                    // setPayloadPick([]);
                    // setPostFileData("");
                    setPingUpload(true);
                    setlead_butt2(true);
                    setlead_butt1(false);
                  }}
                  className={lead_butt2 == true ? "butt_true" : "butt_false"}
                >
                  Post
                </button>
              </div>
            )}
            {pingupload && (
              <div className="upload_div_inner">
                <p>Select file type and upload your sample post file</p>
                <select
                  onChange={event => {
                    setRadioStatus(event.target.value);
                    localStorage.setItem("picker", event.target.value);
                  }}
                >
                  <option>Select File Type</option>
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
                      // count = count + 1;

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
                  <div>Map buyers field here</div>
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
                    <div className="close_img_div" onClick={() => closeModal()}>
                      <IoIosClose />
                    </div>
                    {verticalsfields.map((item, a) => (
                      <p>#{item.name}#</p>
                    ))}
                  </Modal>
                </div>
                {xmlpingstatus === "ping" && (
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
                )}
                {xmlpingstatus === "post" && (
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
                                  value={payloadpick1[index]}
                                  onChange={event => {
                                    payload1(index, event.target.value);
                                    if (xmlpingstatus === "ping") {
                                      console.log("pingmapped");
                                      if (radiostatus == "xml") {
                                        var replacee =
                                          "<" +
                                          item +
                                          ">" +
                                          "(?!#)[\\s\\S]*?" +
                                          "<\\/" +
                                          item +
                                          ">";
                                        var replacer =
                                          "<" +
                                          item +
                                          ">" +
                                          "#" +
                                          verticalsfields[event.target.value]
                                            .name +
                                          "#" +
                                          "</" +
                                          item +
                                          ">";
                                        var re = new RegExp(replacee);
                                        console.log(
                                          "Type",
                                          /<item>[\s\S]*?<\/item>/,
                                          "<`${item}`>" +
                                            "#" +
                                            verticalsfields[event.target.value]
                                              .name +
                                            "#" +
                                            "</`${item}`>"
                                        );
                                        var a = pingfiledata;
                                        a = a.toString().replace(re, replacer);
                                        console.log("XML CREATED FILE", a);
                                        setPingFileData(a);
                                      } else {
                                        var replacee =
                                          "<" +
                                          item +
                                          ">" +
                                          "[\\s\\S]*?" +
                                          "<\\/" +
                                          item +
                                          ">";
                                        var replacer =
                                          "<" +
                                          item +
                                          ">" +
                                          "#" +
                                          verticalsfields[event.target.value]
                                            .name +
                                          "#" +
                                          "</" +
                                          item +
                                          ">";
                                        var re = new RegExp(replacee);
                                        console.log(
                                          "Type",
                                          /<item>[\s\S]*?<\/item>/,
                                          "<`${item}`>" +
                                            "#" +
                                            verticalsfields[event.target.value]
                                              .name +
                                            "#" +
                                            "</`${item}`>"
                                        );
                                        var a = pingjsonfiledata;
                                        a = a.toString().replace(re, replacer);
                                        console.log("XML CREATED FILE", a);
                                        setPingJSONFileData(a);
                                      }
                                      console.log(
                                        Object.assign(pingmappedKeys, {
                                          [item]:
                                            "#" +
                                            verticalsfields[event.target.value]
                                              .name +
                                            "#"
                                        })
                                      );
                                    }
                                  

                                    pingxmlpost.push({
                                      default: 0,
                                      key: item,
                                      datatype:
                                        verticalsfields[event.target.value]
                                          .datatype,
                                      required: "Yes",
                                      map_field:
                                        verticalsfields[event.target.value].name
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
                                    payload(index, event.target.value);

                                    console.log("pingpostmapped");
                                    if (radiostatus == "xml") {
                                      var replacee =
                                        "<" +
                                        item +
                                        ">" +
                                        "(?!#)[\\s\\S]*?" +
                                        "<\\/" +
                                        item +
                                        ">";
                                      var replacer =
                                        "<" +
                                        item +
                                        ">" +
                                        "#" +
                                        verticalsfields[event.target.value]
                                          .name +
                                        "#" +
                                        "</" +
                                        item +
                                        ">";
                                      var re = new RegExp(replacee);
                                      console.log(
                                        "Type",
                                        /<item>[\s\S]*?<\/item>/,
                                        "<`${item}`>" +
                                          "#" +
                                          verticalsfields[event.target.value]
                                            .name +
                                          "#" +
                                          "</`${item}`>"
                                      );
                                      var a = postfiledata;
                                      a = a.toString().replace(re, replacer);
                                      console.log("XML CREATED FILE", a);
                                      setPostFileData(a);
                                    } else {
                                      var replacee =
                                        "<" +
                                        item +
                                        ">" +
                                        "[\\s\\S]*?" +
                                        "<\\/" +
                                        item +
                                        ">";
                                      var replacer =
                                        "<" +
                                        item +
                                        ">" +
                                        "#" +
                                        verticalsfields[event.target.value]
                                          .name +
                                        "#" +
                                        "</" +
                                        item +
                                        ">";
                                      var re = new RegExp(replacee);
                                      console.log(
                                        "Type",
                                        /<item>[\s\S]*?<\/item>/,
                                        "<`${item}`>" +
                                          "#" +
                                          verticalsfields[event.target.value]
                                            .name +
                                          "#" +
                                          "</`${item}`>"
                                      );
                                      var a = postjsonfiledata;
                                      a = a.toString().replace(re, replacer);
                                      console.log("XML CREATED FILE", a);
                                      setPostJSONFileData(a);
                                    }
                                    console.log(
                                      Object.assign(pingpostmappedKeys, {
                                        [item]:
                                          "#" +
                                          verticalsfields[event.target.value]
                                            .name +
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
                                        verticalsfields[event.target.value].name
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
            )}
            {postcards && (
              <div className="second_right_bottom">
                <div className="second_right_bottom_inner">
                  {dialogdetails == "post" && (
                    <p
                      className="clone_create_route_create"
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
                            lead_butt2_ping == true ? "butt_true" : "butt_false"
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
                      <div className="second_right_bottom_inner_F">
                        <div className="plus_buy_route">
                          <label className="label_head_br">Params</label>
                        </div>
                        <table
                          id="dtBasicExample"
                          class="table table-striped table-sm table_buy_con12"
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
                        {dialogdetails == "post" && method === "ping-post" && (
                          <div>{paramitems}</div>
                        )}
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
                                      >
                                        
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel">
                                      <select
                                        id="selectBox"
                                        className="priceType_select priceType_select0059 priceType_select0059_sel"
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
                                        // value={toggle4}
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
                                      >
                                        
                                      </label>
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
                                      >
                                        
                                      </label>
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
                          class="table table-striped table-sm table_buy_con12"
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

                        {dialogdetails == "post" && method === "ping-post" && (
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
                                        class="form-control input_borderless"
                                        onChange={event =>
                                          route_body_key(event.target.value)
                                        }
                                       
                                      />
                                      <label
                                        className="input_text_buyer"
                                        for="ekey1"
                                      >
                                        
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel">
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

                            <p style={{ height: "1%" }} />
                            <div className="buyers_create_btn_div">
                              <button
                                className="buyers_create_btn"
                                onClick={() => {
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
                                        id="form27"
                                        name="key"
                                        value={bodykey}
                                        class="form-control input_borderless"
                                        onChange={event =>
                                          route_body_key(event.target.value)
                                        }
                                      />
                                      <label
                                        className="input_text_buyer"
                                        for="ekey1"
                                      >
                                        
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                      <input
                                        type="text"
                                        id="form72"
                                        name="value"
                                        value={bodydesc}
                                        class="form-control input_borderless"
                                        onChange={event =>
                                          setBodyDesc(event.target.value)
                                        }
                                      />
                                      <label
                                        className="input_text_buyer"
                                        for="form289"
                                      >
                                        
                                      </label>
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
                                  getDefaultBody();
                                }}
                              >
                                Add
                              </button>
                            </div>
                            <p style={{ height: "1%" }} />
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
                          class="table table-striped table-sm table_buy_con12"
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
                        {dialogdetails == "post" && method === "ping-post" && (
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
                                        class="form-control input_borderless"
                                        onChange={event =>
                                          route_header_key(event.target.value)
                                        }
                                     
                                      />
                                      <label
                                        className="input_text_buyer"
                                        for="ekey1"
                                      >
                                        
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel">
                                      <select
                                        id="selectBox"
                                        className="priceType_select priceType_select0059 priceType_select0059_sel"
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
                                  getHeader();
                                }}
                              >
                                Add
                              </button>
                            </div>
                            <p style={{ height: "1%" }} />
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
                                        id="form52"
                                        value={headerkey}
                                        class="form-control input_borderless"
                                        onChange={event =>
                                          route_header_key(event.target.value)
                                        }
                                      />
                                      <label
                                        className="input_text_buyer"
                                        for="ekey1"
                                      >
                                        
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                      <input
                                        type="text"
                                        id="form2"
                                        name="key"
                                        value={headerdesc}
                                        class="form-control input_borderless"
                                        onChange={event =>
                                          route_header_desc(event.target.value)
                                        }
                                      />
                                      <label
                                        className="input_text_buyer"
                                        for="form289"
                                      >
                                        
                                      </label>
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
                      </div>
                    </div>
                  )}

                  {lead_butt4_ping == true && (
                    <div>
                      <div className="second_right_bottom_inner_F">
                        <div className="plus_buy_route">
                          <label className="label_head_br">Authorization</label>
                        </div>
                        <table
                          id="dtBasicExample"
                          class="table table-striped table-sm table_buy_con12"
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

                        {dialogdetails == "post" && method === "ping-post" && (
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
                                      >
                                        
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel">
                                      <select
                                        id="selectBox"
                                        className="priceType_select priceType_select0059 priceType_select0059_sel"
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
                                        id="form82"
                                        name="key"
                                        value={authkey}
                                        class="form-control input_borderless"
                                        onChange={event =>
                                          route_auth_key(event.target.value)
                                        }
                                      />
                                      <label
                                        className="input_text_buyer"
                                        for="ekey1"
                                      >
                                        
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="md-form md-outline md-form-extraClass01 md-form-extraClass01_align_sel12">
                                      <input
                                        type="text"
                                        id="form92"
                                        name="key"
                                        value={authdesc}
                                        class="form-control input_borderless"
                                        onChange={event =>
                                          route_auth_desc(event.target.value)
                                        }
                                      />
                                      <label
                                        className="input_text_buyer"
                                        for="form289"
                                      >
                                        
                                      </label>
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
                      </div>
                    </div>
                  )}
                </div>

               
              </div>
            )}
            <p style={{ height: "1rem" }} />
            <div className="buyers_create_btn_div">
              <button
                className="buyers_create_btn_route1"
                onClick={() => setTestOpen(true)}
              >
                Test Buyer Route
              </button>
            </div>
            <p style={{ height: "1rem" }} />

            <div className="buyers_create_btn_div">
              <button
                className="buyers_create_btn_route1"
                onClick={() => save_details()}
              >
                Create Buyer Route
              </button>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default CreateBuyerRoute;
