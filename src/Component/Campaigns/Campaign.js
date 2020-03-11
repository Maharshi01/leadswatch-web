import { Helmet } from "react-helmet";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL ,POSTING_INST_URL,logoutidle} from '../../AppConfig'

import axios from "axios";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "../Pagination/Pagination.css";
import Modal from "react-modal";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosCheckmarkCircleOutline,
  IoIosClose
} from "react-icons/io";

import { GoCalendar } from "react-icons/go";
import Dropdown from "react-dropdown";
import { MdDateRange, MdRefresh } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import {
  IoIosHome,
  IoIosStats,
  IoIosVolumeHigh,
  IoIosWalk,
  IoIosPeople,
  IoIosList
} from "react-icons/io";

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { fromUnixTime } from "date-fns";
import { Spinner } from "react-bootstrap";
// import PaginationName from "../Pagination/Pagination";
import PaginationName from "../Pagination/PaginationLeads";

const Campaigns = props => {
  const [tableKey, setTableKey] = useState(0);
  const [Campignslist, setCampignslist] = useState([]);
  const [entry, setEntry] = useState(10);
  const [enddate, setenddate] = useState("");
  const [startdate, setstartdate] = useState("");
  const [statusfil, setstatusfil] = useState([]);
  const [searchbar, setsearchbar] = useState("");
  const [pagenum, setpagenum] = useState(1);
  const [pagenum1, setpagenum1] = useState(1);
  const [success_alert, setsuccess_alert] = useState(false);
  const [message, setmessage] = useState("");
  const [defaultOption, setDefaultOption] = useState("");
  const [filterLimit, setFilterLimit] = useState([10]);

  const [campcount, setcampcount] = useState();
  const [campagena, setcampagena] = useState([]);
  const [previous, setprevious] = useState();
  // const[next,setNext]=useState();
  const [permissions, setPermissions] = useState({});
  const [fetching, setFetching] = useState(true);
  const options = [
    
    { label: "Active", value: "1", className: "option1_lead" },
    { label: "Inactive", value: "0", className: "option2_lead" }
  ];

  const [searchbarValue, setSearch] = useState("");
  const [prev, setPrev] = useState(null);
  const [num, setNum] = useState([0]);
  const [next, setNext] = useState(2);
  const [total, setTotal] = useState([0]);
  const [limit, setLimit] = useState([0]);
  const [totalpages, setTotalpages] = useState([0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alterater, setAlternater] = useState(false);
  const [date_alterater, setDateAlternater] = useState();
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);

  const getPublishersList = (limit, page, a, b) => {
    console.log("incam===========");

    let date;
    if (startdate == "" && enddate == "") {
      date = "";
    } else if (startdate == "" && enddate != "") {
      var sdate = new Date(enddate);
      let stadate = sdate.setDate(sdate.getDate() - 1);
      date = convert(stadate) + "to" + convert(enddate);
    } else if (enddate == "" && startdate != "") {
      var edate = new Date(startdate);
      let endate = edate.setDate(edate.getDate() + 1);
      date = convert(startdate) + "to" + convert(endate);
    } else {
      date = convert(startdate) + "to" + convert(enddate);
    }
    const data = {
      page: page,
      limit: limit,
      search: searchbar,
      filters: {
        status: statusfil,
        daterange: date
      },
      sortby: {
        [a]: parseInt(b)
      }
    };
    //////console.log("cad",data)
    const config = {
      url: API_URL+"/campaign/list",
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
          //////console.log("campresponse", response.data.data.list);
          // setCampignslist(response.data.data.list);
          if(response.data.data.list == undefined)
        {
          setCampignslist([]);
        }
        else{
          setCampignslist(response.data.data.list);
        }
          //setLeads(response.data.data.list);
          setTotal(response.data.data.total_count);
          setTotalpages(response.data.data.total_pages);
          setLimit(response.data.data.per_page);
          setPrev(response.data.data.page - 1);
          setNext(response.data.data.page + 1);
          setCurrentPage(response.data.data.page);
        }
      })
      .catch(error => {
     console.log("Get Campaigns Error", error.status);
      });
  };

  function updatekey(a, b) {
    setTableKey(a);
    //////console.log("avdjd", b);
  }

  // useEffect(() => {
  //   setA(false);
  // }, []);

  useEffect(() => {
    document.title = "Campaigns - LeadsWatch";
    if (localStorage.getItem("role") == 4)
      var currentModule = JSON.parse(
        localStorage.getItem("permissions")
      ).filter(item => {
        return item.module_id == 3;
      });
    setPermissions(currentModule ? currentModule[0] : {});

    const data = {
      page: 1,
      limit: 10,
      search: "",
      filters: {
        status: [],
        daterange: ""
      },
      sortby: {
        created: -1
      }
    };
    //////console.log("cbd",data);
    const config = {
      url: API_URL+"/campaign/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImVtYWlsIjoic2tpbmdAZ21haWwuY29tIiwicm9sZV9pZCI6MiwiaWF0IjoxNTcyODQ5NDY2LCJleHAiOjE1NzMxMDg2NjZ9.QRLzf5DERW8Zbe_pTFntY75X78j3Oaekbh6mI9AI0sc"
      }
    };
    axios(config)
      .then(response => {
        if (response.status == 200) {
          //////console.log("dcxv x", response.data.data);
          // setCampignslist(response.data.data.list);
          if(response.data.data.list == undefined)
        {
          setCampignslist([]);
        }
        else{
          setCampignslist(response.data.data.list);
        }
          setTotal(response.data.data.total_count);
          setTotalpages(response.data.data.total_pages);
          // setcampcount(response.data.data.total_count);
          setPrev(response.data.data.page - 1);
          setNext(response.data.data.page + 1);
          setCurrentPage(response.data.data.page);
          setFetching(false);
          setstatusfil([]);
          let a = [];

          for (
            let i = 0;
            i < Math.ceil(response.data.data.total_count / entry);
            i++
          ) {
            a.push(i);
          }
          setLimit(response.data.data.per_page);
          //////console.log("array",a)
          setcampagena(a);
        }
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
      });
  }, [tableKey]);

  function deletecamp(id) {
    const data = {
      id: id
    };
    const config = {
      url:
        API_URL+"/campaign/delete/" + id.toString(),
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImVtYWlsIjoic2tpbmdAZ21haWwuY29tIiwicm9sZV9pZCI6MiwiaWF0IjoxNTcyODQ5NDY2LCJleHAiOjE1NzMxMDg2NjZ9.QRLzf5DERW8Zbe_pTFntY75X78j3Oaekbh6mI9AI0sc"
      }
    };
    axios(config)
      .then(response => {
        setmessage("Campaign sucessfully deleted");
        setsuccess_alert(true);
        //alert("sucessfull deleted")

        window.location.reload();
      })
      .catch(error => {
        //////console.log(error);
      });
  }
  function enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      //  ////console.log("Enter Pressed");
      getPublishersList(limit, 1);
    }
  }

  const clone = ccamp => {
    ////////console.log("random",Math.random() * 101)
    let p = [],
      q = [];

    for (let k = 0; k < ccamp.publishers.length; k++) {
      p.push({
        id: ccamp.publishers[k].publisher_id,
        price: ccamp.publishers[k].price,
        price_type: ccamp.publishers[k].price_type
      });
    }
    for (let j = 0; j < ccamp.buyers.length; j++) {
      q.push({
        id: ccamp.buyers[j].buyer_id,
        route_id: ccamp.buyers[j].routeid,
        priority: ccamp.buyers[j].priority
      });
    }
    const data = {
      vertical_id: ccamp.vertical_id,
      name:
        ccamp.name +
        " " +
        (Math.floor(Math.random() * 101) + ccamp.id) +
        "copy",
      desc: ccamp.desc,
      startdate: ccamp.startdate.split("T")[0],
      enddate: ccamp.enddate.split("T")[0],
      buyers: q,
      publishers: p,
      allowduplicate: ccamp.allowduplicate,
      lead_distribution: ccamp.lead_distribution,
      campaign_filters: ccamp.campaign_filters
    };
    //////console.log("clone data", data);
    const CloneCampaign = {
      url: API_URL+"/campaign/create",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(CloneCampaign)
      .then(response => {
        if (response.status == 200) {
          setmessage("Campaign sucessfully cloned");
          setsuccess_alert(true);

          window.location.reload();
        }
      })
      .catch(error => {
        //////console.log(error.response);
        //////console.log("errornumber", error.response.data.error.sqlMessage);
      });
    updatekey(Math.random(), 0);
  };

  const editcamp = a => {
    let w = [],
      s = [],
      x = [],
      z = [],
      rou = [],
      y = [],
      campfil = [];

    for (let i = 0; i < a.publishers.length; i++) {
      w.push({
        id: a.publishers[i].publisher_id,
        price: a.publishers[i].price,
        price_type: a.publishers[i].price_type,
        postback:a.post_back_url
      });
      s.push(a.publishers[i].publisher_id);
      z.push({
        id: a.publishers[i].publisher_id,
        name: a.publishers[i].firstname + a.publishers[i].lastname
      });
    }
    // setPubflist(w);
    // setPubflistid(g);
    for (let i = 0; i < a.buyers.length; i++) {
      x.push(a.buyers[i].routeid);
      y.push({
        id: a.buyers[i].buyer_id,
        name: a.buyers[i].buyer_routename,
        routeid: a.buyers[i].routeid
      });
      rou.push({
        id: a.buyers[i].buyer_id,
        routeid: a.buyers[i].routeid
      });
    }
    for (let i = 0; i < a.campaign_filters.length; i++) {
      campfil.push({
        key: a.campaign_filters[i].key,
        value: a.campaign_filters[i].value,
        allow: a.campaign_filters[i].allow,
        match: a.campaign_filters[i].match
      });
    }
    let camp = {
      id: a.id,
      name: a.name,
      description: a.desc,
      startdate: a.startdate.split("T")[0],
      enddate: a.enddate.split("T")[0],
      active: a.active,
      verticalid: a.vertical_id,
      buyer1: x,
      buyer2: y,
      buyer3: rou,
      publisher1: w,
      publisher2: s,
      publisher3: z,
      allowduplicate: a.allowduplicate,
      leaddistribution: a.lead_distribution,
      url: POSTING_INST_URL+"" + a.posting_url,
      campfilter: campfil,
    };

    localStorage.setItem("camp", JSON.stringify(camp));
  };
  ///create campaigns
  function CreateCamp() {
    let camp = {
      id: "",
      name: "",
      description: "",
      startdate: new Date(),
      enddate: new Date(),
      active: 1,
      verticalid: "",
      buyer1: [],
      buyer2: [],
      buyer3: [],
      publisher1: [],
      publisher2: [],
      publisher3: [],
      allowduplicate: 0,
      leaddistribution: 1,
      campfilter: [],
      postbackurl:"",
    };

    localStorage.setItem("camp", JSON.stringify(camp));
  }

  const handleentries = value => {
    getPublishersList(value, 1);

    let a = [];
    for (let i = 1; i <= Math.ceil(total / value); i++) {
      a.push(i);
    }
    setNum(a);
    setLimit(value);
  };

  const handlestart = sdate => {
    setstartdate(sdate);
  };

  const modalclose = () => {
    setsuccess_alert(false);
    setmessage("");
  };

  const handleend = edate => {
    setenddate(edate);
  };
  const handlesatus = ss => {
    setDefaultOption(ss.label);
    // //console.log("asadadad",ss);
    setstatusfil([JSON.parse(ss.value)]);
    ////console.log("Campaign status",ss.value)

    // setstatusfil(ss);
  };
  const handleSearch = searchname => {
    setsearchbar(searchname);
  };
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const refreshfilter = () => {
    let date;
    if (startdate == "" && enddate == "") {
      date = "";
    } else if (startdate == "" && enddate != "") {
      var sdate = new Date(enddate);
      let stadate = sdate.setDate(sdate.getDate() - 1);
      date = convert(stadate) + "to" + convert(enddate);
    } else if (enddate == "" && startdate != "") {
      var edate = new Date(startdate);
      let endate = edate.setDate(edate.getDate() + 1);
      date = convert(startdate) + "to" + convert(endate);
    } else {
      date = convert(startdate) + "to" + convert(enddate);
    }
    setFilterLimit(10);
    const data = {
      page: pagenum,
      limit: parseInt(entry),
      search: "",
      filters: {
        status: [],
        daterange: ""
      },
      sortby: {
        created: -1
      }
    };
    //////console.log("cad",data)
    const config = {
      url: API_URL+"/campaign/list",
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
       
          setCampignslist(response.data.data.list);
          setTotal(response.data.data.total_count);
          setTotalpages(response.data.data.total_pages);
          setLimit(response.data.data.per_page);
          setPrev(response.data.data.page - 1);
          setNext(response.data.data.page + 1);
          setCurrentPage(response.data.data.page);
          setstartdate("");
          setenddate("");
          setstatusfil("");
          setsearchbar("");
          setDefaultOption("Status");

          let a = [];

          for (
            let i = 0;
            i < Math.ceil(response.data.data.total_count / entry);
            i++
          ) {
            a.push(i + 1);
          }
          //////console.log("array",a)
          setcampagena(a);
        }
      })
      .catch(error => {
        //////console.log("Get Campaigns Error", error.response);
      });
  };

  if (localStorage.getItem("role") == 4) {
    if (
      !JSON.parse(localStorage.getItem("permissions"))
        .filter(item => {
          return item.module_id == 4;
        })[0]
        .actions.includes(1)
    ) {
      return (
        <div style={{ textAlign: "center", marginTop: "15%" }}>
          You Don't Have Access to this Module
        </div>
      );
    }
  }

  const alternate = value => {
    if (value == "name") {
      setA(true);
      setAlternater(!alterater);
      console.log("alterater", alterater);
      let hope = alterater == false ? "1" : "0";
      getPublishersList(limit, 1, value, hope);
    } else if (value == "startdate") {
      setA(true);
      setDateAlternater(!date_alterater);
      console.log("alterater", date_alterater);
      let hope = date_alterater == false ? "1" : "0";
      getPublishersList(limit, 1, value, hope);
    }
  };

  return (
    <div className="body_bg">
      <Helmet>
        <title>Campaigns - LeadsWatch</title>
      </Helmet>

      <div className="body_inner">
        <div className="camp-header">
          <h2>Campaigns</h2>
          <div className="add_icon">
            {localStorage.getItem("role") == 2 ? (
              <Link
                style={{ color: "#fff" }}
                to={{ pathname: `/createcampaigns/${"new"}` }}
              >
                <FiPlusCircle onClick={() => CreateCamp()} />
              </Link>
            ) : !permissions && permissions.actions.includes(2) ? (
              <Link
                style={{ color: "#fff" }}
                to={{ pathname: `/createcampaigns/${"newcamp"}` }}
              >
                <FiPlusCircle onClick={() => CreateCamp()} />
              </Link>
            ) : (
              <OverlayTrigger
                overlay={
                  <Tooltip>Read only mode, changes not allowed!</Tooltip>
                }
              >
                <Link style={{ color: "#fff" }}>
                  <FiPlusCircle onClick={() => CreateCamp()} />
                </Link>
              </OverlayTrigger>
            )}
          </div>
        </div>

        <div className="body_inner_section">
          <div className="date_row_leads date_row_leads_camp">
            <div className="showEntriesDiv">
              <label className="showEntriesLabel">
                <div className="showEntriesLabelDiv showEntriesLabelDivleadsp">
                  {" "}
                  <p>Show Entries</p>
                </div>
                <div className="showEntriesSelDiv">
                  <select
                    className="show_entries_input"
                    value={filterLimit}
                    onChange={event => {
                      setFilterLimit(event.target.value);
                      getPublishersList(event.target.value, 1);

                      let a = [];
                      for (
                        let i = 1;
                        i <= Math.ceil(total / event.target.value);
                        i++
                      ) {
                        a.push(i);
                      }
                      setNum(a);
                      setLimit(event.target.value);
                    }}
                  >
                    <option selected value="10">
                      10
                    </option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>



              </label>
            </div>

            <div className="date_block_campaign">
              <div className="date_block_campaign_inner">
                

                <div className="date_box">
                  <DatePicker
                    className="input_fields_dleads1"
                    placeholderText="Start Date"
                    dateFormat="MM-dd-yyyy"
                    selected={startdate}
                    onChange={date => {
                      handlestart(date);
                    }}
                  />
                  <div className="dateIconleads2">
                    <MdDateRange />
                  </div>
                </div>
                <div className="date_box">
                  <DatePicker
                    className="input_fields_dleads2"
                    placeholderText="End Date"
                    dateFormat="MM-dd-yyyy"
                    selected={enddate}
                    onChange={date => {
                      handleend(date);
                    }}
                  />
                  <div className="dateIconleads1">
                    <MdDateRange />
                  </div>
                </div>
                <div className="select_main123">
                  <Dropdown
                    options={options}
                    className="dropdown_leads1"
                    onChange={value => handlesatus(value)}
                    value={defaultOption}
                    placeholder="Status"
                  ></Dropdown>
                </div>

              

                <div className="apply_btn_div">
                  <IoIosCheckmarkCircleOutline  className="lead_apply_svg" onClick={() => {
                      getPublishersList(filterLimit, 1);
                    }}/>
                  
                </div>

                <div className="refresh_btn_div">
                  <Link
                    onClick={() => {
                      refreshfilter();
                    }}
                  >
                    <MdRefresh className="refreshbtn" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="butt_create_publ">
              <div className="searchbarValue_Div_leads">
                <input
                  className="searchbarValue_fieldleads"
                  placeholder="Search"
                  value={searchbar}
                  onChange={event => handleSearch(event.target.value)}
                  onKeyPress={enterPressed.bind(this)}
                  type="text"
                />
                <Link
                  onClick={() => {
                    getPublishersList(limit, 1);
                  }}
                >
                  <IoIosArrowForward className="circularArrowleads"/>
                </Link>
              </div>
            </div>
           
          </div>

        

          {fetching ? (
            <div className="spinner_div">
              <Spinner className="buy_spinner" animation="border" />
            </div>
          ) : (
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
                  <th className="details_lead">Campaign ID</th>

                  <th
                    class="th-sm text-left campleft"
                    onClick={() => {
                      // alternate("name");
                      setB(0);
                      setC(0);
                      setD(0);
                      if (a == 1) {
                        getPublishersList(limit, 1, "name", -1);
                        setA(2);
                      } else {
                        setA(1);
                        getPublishersList(limit, 1, "name", 1);
                      }
                    }}
                  >
                    Campaign Name
                    <svg
                      className="svg_up"
                      id="Group_2411_set"
                      data-name="Group 2411"
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                    >
                      <path
                        id="Polygon_3"
                        data-name="Polygon 3"
                        d="M4,0,8,5H0Z"
                        fill={a == 1 ? "#484393" : "#d3d3d3"}
                      />
                    </svg>
                    <svg
                      className="down_svg"
                      id="Group_2411_set"
                      data-name="Group 2411"
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                    >
                      {" "}
                      <path
                        id="Polygon_4"
                        data-name="Polygon 4"
                        d="M4,0,8,5H0Z"
                        transform="translate(8 12) rotate(180)"
                        fill={a == 2 ? "#484393" : "#d3d3d3"}
                      />
                    </svg>
                   
                  </th>

                  <th
                    class="th-sm"
                    onClick={() => {
                      setA(0);
                      setC(0);
                      setD(0);
                      if (b == 1) {
                        getPublishersList(limit, 1, "startdate", -1);
                        setB(2);
                      } else {
                        setB(1);
                        getPublishersList(limit, 1, "startdate", 1);
                      }
                    }}
                  >
                    <span className="campname_cs">Start Date </span>
                 
                    <svg
                      className="svg_up"
                      id="Group_2411_set"
                      data-name="Group 2411"
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                    >
                      <path
                        id="Polygon_3"
                        data-name="Polygon 3"
                        d="M4,0,8,5H0Z"
                        fill={b == 1 ? "#484393" : "#d3d3d3"}
                      />
                    </svg>
                    <svg
                      className="down_svg"
                      id="Group_2411_set"
                      data-name="Group 2411"
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                    >
                      {" "}
                      <path
                        id="Polygon_4"
                        data-name="Polygon 4"
                        d="M4,0,8,5H0Z"
                        transform="translate(8 12) rotate(180)"
                        fill={b == 2 ? "#484393" : "#d3d3d3"}
                      />
                    </svg>

                    {/* </Link>
                 </a> */}
                  </th>
                  <th
                    class="th-sm"
                    onClick={() => {
                      setA(0);
                      setB(0);
                      setD(0);
                      if (c == 1) {
                        getPublishersList(limit, 1, "enddate", -1);
                        setC(2);
                      } else {
                        setC(1);
                        getPublishersList(limit, 1, "enddate", 1);
                      }
                    }}
                  >
                    <span className="campname_cs">End Date </span>
                    
                    <svg
                      onClick={() => {
                        getPublishersList(limit, 1, "enddate", "-1");
                      }}
                      className="svg_up"
                      id="Group_2411_set"
                      data-name="Group 2411"
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                    >
                      <path
                        id="Polygon_3"
                        data-name="Polygon 3"
                        d="M4,0,8,5H0Z"
                        fill={c == 1 ? "#484393" : "#d3d3d3"}
                      />
                    </svg>
                    {/* </Link>
                <Link  onClick={() => {
            getPublishersList("enddate","1");
          }}> */}
                    <svg
                      onClick={() => {
                        getPublishersList(limit, 1, "enddate", "1");
                      }}
                      id="Group_2411_set"
                      data-name="Group 2411"
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                    >
                      {" "}
                      <path
                        id="Polygon_4"
                        data-name="Polygon 4"
                        d="M4,0,8,5H0Z"
                        transform="translate(8 12) rotate(180)"
                        fill={c == 2 ? "#484393" : "#d3d3d3"}
                      />
                    </svg>

                    {/* </Link>
                  </a> */}
                  </th>
                  <th
                    class="th-sm"
                    onClick={() => {
                      setA(0);
                      setB(0);
                      setC(0);
                      if (d == 1) {
                        getPublishersList(limit, 1, "active", 1);
                        setD(2);
                      } else {
                        setD(1);
                        getPublishersList(limit, 1, "active", -1);
                      }
                    }}
                  >
                    Status{" "}
                    <a className="a_class">
                      <svg
                        onClick={() => {
                          getPublishersList(limit, 1, "active", "1");
                        }}
                        className="svg_up"
                        id="Group_2411_set"
                        data-name="Group 2411"
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                      >
                        <path
                          id="Polygon_3"
                          data-name="Polygon 3"
                          d="M4,0,8,5H0Z"
                          fill={d == 1 ? "#484393" : "#d3d3d3"}
                        />
                      </svg>
                    

                      <svg
                        onClick={() => {
                          getPublishersList(limit, 1, "active", "0");
                        }}
                        id="Group_2411_set"
                        data-name="Group 2411"
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                      >
                        {" "}
                        <path
                          id="Polygon_4"
                          data-name="Polygon 4"
                          d="M4,0,8,5H0Z"
                          transform="translate(8 12) rotate(180)"
                          fill={d == 2 ? "#484393" : "#d3d3d3"}
                        />
                      </svg>

                      {/* </Link> */}
                    </a>
                  </th>
                  <th class="th-sm details_lead">Actions</th>
                  
                </tr>
              </thead>
              <tbody>
                {Campignslist &&
                  Campignslist.map(item => (
                    <tr>
                      <td>{item.code}</td>
                      <td className="Campaign_name  campleft">
                        <div className="name_geht">{item.name}</div>
                      </td>
                      <td>{item.startdate.split("T")[0]}</td>
                      <td>{item.enddate.split("T")[0]}</td>
                      <td
                        style={{
                          color: item.active == 1 ? "#1BAC38" : "#F53669"
                        }}
                      >
                        {item.active == 1 ? (
                          <div className="active_green">Active</div>
                        ) : (
                          <div className="active_red">Inactive</div>
                        )}
                      </td>
                      <td>
                        <Link
                          to={{ pathname: `/createcampaigns/${item.id}` }}
                          onClick={() => {
                            editcamp(item);
                          }}
                        >
                          <svg
                            className="campaign_edit_svg"
                            width="12.489"
                            height="13.624"
                            fill="#9B9B9B"
                            viewBox="0 -1 381.53417 381"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m370.589844 230.964844c-5.523438 0-10 4.476562-10 10v88.792968c-.019532 16.558594-13.4375 29.980469-30 30h-280.589844c-16.5625-.019531-29.980469-13.441406-30-30v-260.589843c.019531-16.5625 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.589843c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.789062c0-5.523438-4.476563-10.003906-10-10.003906zm0 0" />
                            <path d="m156.367188 178.34375 146.011718-146.015625 47.089844 47.089844-146.011719 146.015625zm0 0" />
                            <path d="m132.542969 249.257812 52.039062-14.414062-37.625-37.625zm0 0" />
                            <path d="m362.488281 7.578125c-9.769531-9.746094-25.585937-9.746094-35.355469 0l-10.605468 10.605469 47.089844 47.089844 10.605468-10.605469c9.75-9.769531 9.75-25.585938 0-35.355469zm0 0" />
                          </svg>
                        </Link>

                        {localStorage.getItem("role") == 2 ? (
                          <Link
                            style={{
                              backgroundColor: "transparent",
                              borderColor: "transparent"
                            }}
                            onClick={() => clone(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12.489"
                              height="13.624"
                              fill="#9B9B9B"
                              viewBox="0 0 12.489 13.624"
                            >
                              <defs></defs>
                              <path
                                class="a"
                                d="M4.967,114.9a2.416,2.416,0,0,1-2.413-2.413v-5.819H1.561A1.562,1.562,0,0,0,0,108.229v7.664a1.562,1.562,0,0,0,1.561,1.561h7.1a1.562,1.562,0,0,0,1.561-1.561V114.9Zm0,0"
                                transform="translate(0 -103.83)"
                              />
                              <path
                                class="a"
                                d="M137.083,1.561A1.561,1.561,0,0,0,135.522,0h-5.961A1.561,1.561,0,0,0,128,1.561v7.1a1.561,1.561,0,0,0,1.561,1.561h5.961a1.561,1.561,0,0,0,1.561-1.561Zm0,0"
                                transform="translate(-124.594)"
                              />
                            </svg>
                          </Link>
                        ) : !permissions && permissions.actions.includes(3) ? (
                          <Link
                            style={{
                              backgroundColor: "transparent",
                              borderColor: "transparent"
                            }}
                            onClick={() => clone(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12.489"
                              height="13.624"
                              fill="#9B9B9B"
                              viewBox="0 0 12.489 13.624"
                            >
                              <defs></defs>
                              <path
                                class="a"
                                d="M4.967,114.9a2.416,2.416,0,0,1-2.413-2.413v-5.819H1.561A1.562,1.562,0,0,0,0,108.229v7.664a1.562,1.562,0,0,0,1.561,1.561h7.1a1.562,1.562,0,0,0,1.561-1.561V114.9Zm0,0"
                                transform="translate(0 -103.83)"
                              />
                              <path
                                class="a"
                                d="M137.083,1.561A1.561,1.561,0,0,0,135.522,0h-5.961A1.561,1.561,0,0,0,128,1.561v7.1a1.561,1.561,0,0,0,1.561,1.561h5.961a1.561,1.561,0,0,0,1.561-1.561Zm0,0"
                                transform="translate(-124.594)"
                              />
                            </svg>
                          </Link>
                        ) : (
                          <OverlayTrigger
                            overlay={
                              <Tooltip>
                                Read only mode, changes not allowed!
                              </Tooltip>
                            }
                          >
                            <Link
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent"
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12.489"
                                height="13.624"
                                fill="#9B9B9B"
                                viewBox="0 0 12.489 13.624"
                              >
                                <defs></defs>
                                <path
                                  class="a"
                                  d="M4.967,114.9a2.416,2.416,0,0,1-2.413-2.413v-5.819H1.561A1.562,1.562,0,0,0,0,108.229v7.664a1.562,1.562,0,0,0,1.561,1.561h7.1a1.562,1.562,0,0,0,1.561-1.561V114.9Zm0,0"
                                  transform="translate(0 -103.83)"
                                />
                                <path
                                  class="a"
                                  d="M137.083,1.561A1.561,1.561,0,0,0,135.522,0h-5.961A1.561,1.561,0,0,0,128,1.561v7.1a1.561,1.561,0,0,0,1.561,1.561h5.961a1.561,1.561,0,0,0,1.561-1.561Zm0,0"
                                  transform="translate(-124.594)"
                                />
                              </svg>
                            </Link>
                          </OverlayTrigger>
                        )}
                        {localStorage.getItem("role") == 2 ? (
                          <Link
                            className="camp_actions"
                            style={{
                              backgroundColor: "transparent",
                              borderColor: "transparent"
                            }}
                            onClick={() => deletecamp(item.id)}
                          >
                            <svg
                              width="12.489"
                              height="13.624"
                              fill="#9B9B9B"
                              viewBox="-40 0 427 427.00131"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                              <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                              <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                              <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                            </svg>
                          </Link>
                        ) : !permissions && permissions.actions.includes(4) ? (
                          <Link
                            className="camp_actions"
                            style={{
                              backgroundColor: "transparent",
                              borderColor: "transparent"
                            }}
                            onClick={() => deletecamp(item.id)}
                          >
                            <svg
                              width="12.489"
                              height="13.624"
                              fill="#9B9B9B"
                              viewBox="-40 0 427 427.00131"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                              <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                              <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                              <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                            </svg>
                          </Link>
                        ) : (
                          <OverlayTrigger
                            overlay={
                              <Tooltip>
                                Read only mode, changes not allowed!
                              </Tooltip>
                            }
                          >
                            <Link
                              className="camp_actions"
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent"
                              }}
                            >
                              <svg
                                width="12.489"
                                height="13.624"
                                fill="#9B9B9B"
                                viewBox="-40 0 427 427.00131"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                                <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                              </svg>
                            </Link>
                          </OverlayTrigger>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          {!fetching && Campignslist.length == 0 && (
            <div className="no_record">
              {" "}
              <p>NO RECORDS FOUND</p>
            </div>
          )}

        
        

          <div>
            <PaginationName
              prev={prev}
              next={next}
              getPublishersList={getPublishersList}
              num={num}
              total={total}
              totalPages={totalpages}
              limit={limit}
              currentPage={currentPage}
            />
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
      </div>
    </div>
  );
};

export default Campaigns;
