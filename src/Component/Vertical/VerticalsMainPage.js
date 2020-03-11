/*
Created By Maharshi
on 28/10/2019
last modified on 31/10/2019
Page=Verticals MainPage
*/
import React, { Component, useState, useEffect } from "react";
import { API_URL ,logoutidle} from '../../AppConfig'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { hashHistory } from "react-router";
import Modal from "react-modal";
import axios from "axios";
import { Row, Col, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import PaginationName from "../Pagination/Pagination";
import "../Vertical/Vertical.css";
import { IoIosClose, IoIosArrowForward } from "react-icons/io";
import { Spinner } from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { Helmet } from "react-helmet";
const VerticalsMainPage = () => {
  // vertical state stores the list of verticals
  const [verticals, setVerticals] = useState([]);
  // This state is used for loading screen
  const [fetching, setFetching] = useState(true);
  // state to store single vertical details
  const [verticaldetails, setverticalDetails] = useState();
  // state to track Create Model
  const [open, setOpen] = useState(false);
  // state to create Edit model
  const [editopen, setEditOpen] = useState(false);
  // States to store vertical details
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [vertical_id, setverticalId] = useState();

  const [searchbarValue, setSearch] = useState("");
  const [prev, setPrev] = useState(null);
  const [num, setNum] = useState([0]);
  const [next, setNext] = useState(2);
  const [total, setTotal] = useState([0]);
  const [limit, setLimit] = useState([0]);
  const [totalpages, setTotalpages] = useState([0]);
  const [currentPage, setCurrentPage] = useState(1);

  const [toShowName, setToShowName] = useState(false);
  const [toShowDesc, setToShowDesc] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [toShowDuplicate, setToShowDuplicate] = useState(false);

  const [deleteId, setDeleteId] = useState();

  const [toShowName1, setToShowName1] = useState(false);
  const [toShowDesc1, setToShowDesc1] = useState(false);
  const [toShowDuplicate1, setToShowDuplicate1] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [success_alert, setsuccess_alert] = useState(false);
  const [message, setmessage] = useState("");
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const [delete_alert, setdelete_alert] = useState(false);

  // const [fetching, setFetching] = useState(true);
  function enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      //  ////console.log("Enter Pressed");
      getPublishersList(limit, 1);
    }
  }
  const getPublishersList = (limit, page, a, b) => {
    const data = {
      page: page,
      limit: limit,
      search: searchbarValue ? searchbarValue : "",
      sortby: {
        [a]: parseInt(b)
      }
    };

    const config = {
      url: API_URL+"/vertical/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        // setVerticals(response.data.data.list);
        if(response.data.data.list == undefined)
        {
          setVerticals([]);
        }
        else{
          setVerticals(response.data.data.list);
        }
        setTotal(response.data.data.total_count);
        setLimit(response.data.data.per_page);
        setTotalpages(response.data.data.total_pages);
        setPrev(response.data.data.prev_page);
        setNext(response.data.data.next_page);
        setCurrentPage(response.data.data.page);
        let a = [];
        for (
          let i = 1;
          i <=
          Math.ceil(
            response.data.data.total_count / response.data.data.per_page
          );
          i++
        ) {
          a.push(i);
        }
        setNum(a);
        //setLimit(filterLimit);
      })
      .catch(error => {
        ////console.log("error failed");
        if (error.message == "Network Error") {
          alert("Network Error \n Please Try Again later");
        } else if (
          error.response.data.error.message ===
          "Your account had been deactivated"
        ) {
          ////console.log(error.response);
          alert("error :" + error.response.data.error.message);
        } else {
          ////console.log(error.response);
          alert("error :" + error.response.data.error.message);
        }

        ////console.log(error);
        ////console.log(error.message, "msg");
      });
    //////console.log("proceed to home screen");
  };

  // function to handle vertical name
  const vert_name = value => {
    setName(value);
  };
  // function to handle vertical description
  const vert_desc = value => {
    setDesc(value);
  };

  const modalclose = () => {
    setsuccess_alert(false);
    setmessage("");
  };
  const deletemodal = id => {
    setdelete_alert(true);
    setDeleteId(id);
    // DeleteVertical(id);
  };

  // function to post vertical details to database on Creating new vertical
  function CreateVerticalFields() {
    setToShowDuplicate(false);
    if (name !== "" && desc !== "") {
      const data = {
        name: name,
        desc: desc,
        url: ""
      };
      const config = {
        url: API_URL+"/vertical/create",
        data: data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      // ////console.log("hello");
      axios(config)
        .then(response => {
          ////console.log("Created Vertical Response", response);
          if (response.status == 200) {
            closeModal();
            setName("");
            setDesc("");
            AddField(response.data.data.insertId);
            setmessage("Vertical created successfully");
            setsuccess_alert(true);
            //prompt("Vertical Created Successfully!!");
          }
        })
        .catch(error => {
          // //console.log("in catch");
          setToShowDesc(false);
          setToShowName(false);
          setToShowDuplicate(true);
          //alert(error.response.data.error.message);
        });
    } else {
      if (name == "") {
        setToShowName(true);
        setToShowDesc(false);
      } else {
        setToShowDesc(true);
        setToShowName(false);
      }
    }
  }

  function AddField(vert_id) {
    // if (fielddatatype == "default") {
    //     alert("You Must Select one value");
    // }
    // else {
    //     //console.log();
    const data = {
      vertical_fields: [
        {
          vertical_id: vert_id,
          name: "email",
          description: "email",
          datatype: "string",
          list_data: [],
          dataformat: "",
          mandatory: 1,
          default: 0
        },
        {
          vertical_id: vert_id,
          name: "phone",
          description: "phone",
          datatype: "number",
          list_data: [],
          dataformat: "",
          mandatory: 1,
          default: 0
        }
      ]
    };
    // //console.log("fielddata", data)
    const config = {
      url: API_URL+"/vertical/createfield",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log("Created VerticalField Response", response);
        if (response.status == 200) {
          ////console.log("In email and phone");
          closeModal(); // to close Modal on Clicking

          myfunc();
          // alert("Vertical Created Successfully!!")
        }
      })
      .catch(error => {
        ////console.log("inside vert_id", vert_id);
        ////console.log("Erro", error.response);
      });
  }

  useEffect(() => {
    document.title = "Verticals - LeadsWatch";
    if (localStorage.getItem("role") == 4)
      var currentModule = JSON.parse(
        localStorage.getItem("permissions")
      ).filter(item => {
        return item.module_id == 6;
      });
    setPermissions(currentModule ? currentModule[0] : {});

    const data = {
      page: 1,
      limit: 10,
      search: "",
      sortby: {
        created: -1
      }
    };
    const config = {
      url: API_URL+"/vertical/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log("GotVerticalsList", response);
        // setVerticals(response.data.data.list);
        if(response.data.data.list == undefined)
        {
          setVerticals([]);
        }
        else{
          setVerticals(response.data.data.list);
        }
        setTotal(response.data.data.total_count);
        setPrev(response.data.data.prev_page);
        setTotalpages(response.data.data.total_pages);
        setNext(response.data.data.next_page);
        setCurrentPage(response.data.data.page);
        setFetching(false);
        setToShowName(false);
        setToShowDesc(false);
        setToShowDuplicate(false);
        setToShowName1(false);
        setToShowDesc1(false);
        setToShowDuplicate1(false);
        setName("");
        setDesc("");
        let a = [];
        for (
          let i = 1;
          i <=
          Math.ceil(
            response.data.data.total_count / response.data.data.per_page
          );
          i++
        ) {
          a.push(i);
        }
        setNum(a);

        setLimit(response.data.data.per_page);
      })
      // Error handling
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        ////console.log("Verticalslisterror", error);
        // window.alert(error.response.data.error.message);
      });
  }, []);
  //localStorage.setItem('verticals', JSON.stringify(verticals));
  // To Open Create Model
  const openModal = () => {
    setOpen(true);
  };
  // To close Create Model
  const closeModal = () => {
    setOpen(false);
    setToShowName(false);
    setToShowDesc(false);
    setToShowDuplicate(false);
  };
  // Styles for model
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
  const entries = value => {
    //setLimit(value);
    getPublishersList(value, 1);

    let a = [];
    for (let i = 1; i <= Math.ceil(total / value); i++) {
      a.push(i);
    }
    setNum(a);
    setLimit(value);
  };

  //Function to post updated details to Database
  const edit_vertical = id => {
    setToShowDuplicate1(false);
    if (name !== "" && desc !== "") {
      const data = {
        name: name,
        desc: desc,
        url: "",
        active: 1
      };
      const config = {
        url: API_URL+`/vertical/update/${id}`,
        data: data,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      ////console.log("Inside Update of ID", id);
      axios(config)
        .then(response => {
          ////console.log("EditVerticalResponse", response);
          if (response.status == 200) {
            // alert("Edited Successfully!!!");
            closeEditModal(); //To close modal
            setName("");
            setDesc("");
            setmessage("Vertical updated successfully");
            setsuccess_alert(true);
            myfunc();
          }
        })
        .catch(error => {
          setToShowDesc1(false);
          setToShowName1(false);
          setToShowDuplicate1(true);
          // alert(error.response.data.error.message);
          // Error Message
          ////console.log("ErrorInEditingvertical", error);
          ////console.log("Error", error);
        });
    } else {
      if (name == "") {
        setToShowName1(true);
        setToShowDesc1(false);
      } else {
        setToShowDesc1(true);
        setToShowName1(false);
      }
    }
  };
  // To open and display details to be updated
  const edit_modal = id => {
    ////console.log("Vertical Id", id);
    const config = {
      url: API_URL+`/vertical/detail/${id}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + global.access_token
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log("Vertical Detail", response);
        //Sending all details to states to edit
        setverticalDetails(response.data.data);
        setName(response.data.data.name);
        setDesc(response.data.data.desc);
        setverticalId(response.data.data.id);
        ////console.log("Vertical IDDD", response.data.data.id);
        openEditModal();
      })
      // Error handling
      .catch(error => {
        ////console.log("VerticalDetailError", error);
        // window.alert(error.response.data.error.message);
      });
  };
  //To open edit modal
  const openEditModal = () => {
    setEditOpen(true);
  };
  //To close edit modal
  const closeEditModal = () => {
    setEditOpen(false);
    setToShowName1(false);
    setToShowDesc1(false);
    setToShowDuplicate1(false);
  };
  //Function to delete vertical
  const DeleteVertical = id => {
    ////console.log("Deleted  Vertical Id", id);

    const config = {
      url: API_URL+`/vertical/delete/${id}`,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        // alert("Are You Sure You Want To Delete??");
        setdelete_alert(false);
        ////console.log("Inside Delete Vertical---", response);
        myfunc();
      })
      .catch(error => {
        alert(error.response.data.error.message);
        // Error Message
        ////console.log(
        // "ErrorinDeletingVertical",
        // error.response.data.error.sqlMessage
        //);
        ////console.log("Erro", error);
      });
  };

  const myfunc = () => {
    // const config = {
    //   url: API_URL+"/vertical/list",
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + localStorage.getItem("access_token")
    //   }
    // };
    // axios(config)
    //   .then(response => {
    //     ////console.log("VerticalsList", response);
    //     setVerticals(response.data.data);
    //     // ////console.log("InsideGet");
    //   })
    //   // Error handling
    //   .catch(error => {
    //     ////console.log("Verticalslisterror1", error);
    //     // window.alert(error.response.data.error.message);
    //   });

    const data = {
      page: 1,
      limit: 10,
      search: "",
      sortby: {
        created: -1
      }
    };
    const config = {
      url: API_URL+"/vertical/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log("GotVerticalsList", response);
        // setVerticals(response.data.data.list);
        if(response.data.data.list == undefined)
        {
          setVerticals([]);
        }
        else{
          setVerticals(response.data.data.list);
        }
        setTotal(response.data.data.total_count);
        setPrev(response.data.data.prev_page);
        setNext(response.data.data.next_page);
        setCurrentPage(response.data.data.page);
        let a = [];
        for (
          let i = 1;
          i <=
          Math.ceil(
            response.data.data.total_count / response.data.data.per_page
          );
          i++
        ) {
          a.push(i);
        }
        setNum(a);

        setLimit(response.data.data.per_page);
      })
      // Error handling
      .catch(error => {
        ////console.log("Verticalslisterror", error);
        // window.alert(error.response.data.error.message);
      });
  };
  if (localStorage.getItem("role") == 4) {
    if (
      !JSON.parse(localStorage.getItem("permissions"))
        .filter(item => {
          return item.module_id == 6;
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
  return (
    <div className="body_bg">
      <Helmet>
        <title>Verticals - LeadsWatch</title>
      </Helmet>
      <div className="body_inner">
        <div className="vert_table_heading">
          <p>Verticals</p>

          <div className="add_icon_vert">
            {localStorage.getItem("role") == 2 ? (
              <Link
                style={{ color: "#fff" }}
                onClick={() => {
                  openModal();
                }}
              >
                <FiPlusCircle />
              </Link>
            ) : !permissions && permissions.actions.includes(2) ? (
              <Link
                style={{ color: "#fff" }}
                onClick={() => {
                  openModal();
                }}
              >
                <FiPlusCircle />
              </Link>
            ) : (
              <OverlayTrigger
                overlay={
                  <Tooltip>Read only mode, changes not allowed!</Tooltip>
                }
              >
                <Link style={{ color: "#fff" }}>
                  <FiPlusCircle />
                </Link>
              </OverlayTrigger>
            )}
          </div>
          {/* 

            <div className="add_icon">

            {localStorage.getItem("role")==2?
                <Link style={{  color: "#fff", marginLeft:"12%", width:"50%" }}>
                
                  <FiPlusCircle  onClick={() => {
                      openModal();
                    }} />
                </Link>
               :
               (!permissions && permissions.actions.includes(2))?
               <Link style={{  color: "#fff", marginLeft:"12%", width:"50%" }}>
                 
                  <FiPlusCircle onClick={() => {
                      openModal();
                    }} />
                </Link>
                :
                <OverlayTrigger
                overlay={
                  <Tooltip>
                    Read only mode, changes not allowed!
                  </Tooltip>
                }>
                <Link style={{  color: "#fff", marginLeft:"12%", width:"50%" }}>
                <FiPlusCircle />
                </Link>
                </OverlayTrigger>
                  }
        
          </div> */}
        </div>
        <div className="body_inner_section">
          <div className="date_row_pub">
            <div className="showEntriesDiv">
              <label className="showEntriesLabel">
                <div className="showEntriesLabelDiv">
                  {" "}
                  <p>Show Entries</p>
                </div>
                <div className="showEntriesSelDiv">
                  <select
                    className="show_entries_input"
                    onChange={event => entries(event.target.value)}
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
                {/* <div>
                  <Link
                  
                  >
                 
                  <MdRefresh  className="refreshbtn"/>
                  </Link>
                </div> */}
                <div className="active_status_leads_buy"></div>

                {/* <div className="pub_id_create">
                <p className="show_entries_div_para">Buyer Id</p>
               


                <input
                  className="buy_id_input camp_id_input"
                  type="text"
               
                  
                ></input>
                </div> */}

                {/* <div className="apply_btn_div">
                  
                  <button
                className="apply_btn_buy"
               
                  >
                    Apply
                  </button>
                </div> */}
                <div className="apply_btn_div_buy"></div>
              </div>
            </div>
            <div className="butt_create_verticals007">
              {/* {localStorage.getItem("role")==2?
                <Link style={{  color: "#fff", marginLeft:"12%", width:"50%" }}>
                  <button
                    onClick={() => {
                      openModal();
                    }}
                    className="createBuyer_btn2_create"
                  >
                    Create Vertical
                  </button>
                </Link>
               :
               (!permissions && permissions.actions.includes(2))?
               <Link style={{  color: "#fff", marginLeft:"12%", width:"50%" }}>
                  <button
                    onClick={() => {
                      openModal();
                    }}
                    className="createBuyer_btn2_create"
                  >
                    Create Vertical
                  </button>
                </Link>
                :
                <OverlayTrigger
                overlay={
                  <Tooltip>
                    Read only mode, changes not allowed!
                  </Tooltip>
                }>
                <Link style={{  color: "#fff", marginLeft:"12%", width:"50%" }}>
                  <button
                    
                    className="createBuyer_btn2_create"
                  >
                    Create Vertical
                  </button>
                </Link>
                </OverlayTrigger>
                  } */}
              <div className="searchbarValue_Div_leads">
                <input
                  className="searchbarValue_fieldleads"
                  placeholder="Search"
                  value={searchbarValue}
                  onChange={e => {
                    setSearch(e.target.value);
                  }}
                  onKeyPress={enterPressed.bind(this)}
                  type="text"
                />
                <Link
                  onClick={event => {
                    getPublishersList(limit, 1);
                  }}
                >
                  <IoIosArrowForward className="circularArrowleads" />
                </Link>
              </div>
            </div>
          </div>
          {fetching === true ? (
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
                  <th
                    class="th-sm text-left"
                    style={{ paddingLeft: "2.5%" }}
                    class="th-sm text-left campleft"
                    onClick={() => {
                      // alternate("name");
                      setB(0);

                      if (a == 1) {
                        getPublishersList(limit, 1, "name", -1);
                        setA(2);
                      } else {
                        setA(1);
                        getPublishersList(limit, 1, "name", 1);
                      }
                    }}
                  >
                    Name
                    <a className="a_class">
                      <svg
                        className="svg_up"
                        onClick={event => {
                          getPublishersList(limit, 1, "name", "1");
                          //getSortedSearched("id","-1",limit,1);
                        }}
                        id="Group_2411_vert"
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
                        onClick={event => {
                          getPublishersList(limit, 1, "name", "-1");
                          //getSortedSearched("id","1",limit,1);
                        }}
                        id="Group_2411_vert"
                        data-name="Group 2411"
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                      >
                        <path
                          id="Polygon_4"
                          data-name="Polygon 4"
                          d="M4,0,8,5H0Z"
                          transform="translate(8 12) rotate(180)"
                          fill={a == 2 ? "#484393" : "#d3d3d3"}
                        />
                      </svg>
                    </a>
                  </th>
                  <th
                    class="th-sm"
                    onClick={() => {
                      setA(0);
                      if (b == 1) {
                        getPublishersList(limit, 1, "desc", -1);
                        setB(2);
                      } else {
                        setB(1);
                        getPublishersList(limit, 1, "desc", 1);
                      }
                    }}
                  >
                    {" "}
                    Description{" "}
                    <a className="a_class">
                      <svg
                        className="svg_up"
                        onClick={event => {
                          getPublishersList(limit, 1, "desc", "1");
                          //getSortedSearched("id","-1",limit,1);
                        }}
                        id="Group_2411_vert"
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
                        onClick={event => {
                          getPublishersList(limit, 1, "desc", "-1");
                          //getSortedSearched("id","1",limit,1);
                        }}
                        id="Group_2411_vert"
                        data-name="Group 2411"
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                      >
                        <path
                          id="Polygon_4"
                          data-name="Polygon 4"
                          d="M4,0,8,5H0Z"
                          transform="translate(8 12) rotate(180)"
                          fill={b == 2 ? "#484393" : "#d3d3d3"}
                        />
                      </svg>
                    </a>
                  </th>
                  <th class="th-sm details_lead"> Details</th>
                  <th class="th-sm details_lead">Actions </th>
                  {/* <th class="th-sm">Delete </th> */}
                </tr>
              </thead>
              <tbody>
                {verticals &&
                  verticals.map(item => (
                    <tr>
                      <td className="vertical_name text-left vertical_name_left">
                        {" "}
                        {item.name}
                      </td>
                      <td>{item.desc}</td>
                      <td>
                        <Link
                          onClick={() => {
                            localStorage.setItem("name", item.name);
                            localStorage.setItem("desc", item.desc);
                            localStorage.setItem("id", item.id);
                          }}
                          to={`/vertical/${item.id}`}
                        >
                          <div className="View_Vertical_Details">
                            View Details
                          </div>
                        </Link>
                      </td>
                      <td>
                        {/* edit icon */}
                        {localStorage.getItem("role") == 2 ? (
                          <Link
                            onClick={() => {
                              edit_modal(item.id);
                            }}
                          >
                            <svg
                              className="vert_edit_icon"
                              width="15"
                              height="15"
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
                        ) : !permissions && permissions.actions.includes(3) ? (
                          <Link
                            onClick={() => {
                              edit_modal(item.id);
                            }}
                          >
                            <svg
                              className="vert_edit_icon"
                              width="15"
                              height="15"
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
                        ) : (
                          <OverlayTrigger
                            overlay={
                              <Tooltip>
                                Read only mode, changes not allowed!
                              </Tooltip>
                            }
                          >
                            <Link>
                              <svg
                                className="vert_edit_icon"
                                width="15"
                                height="15"
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
                          </OverlayTrigger>
                        )}
                        {localStorage.getItem("role") == 2 ? (
                          <Link
                            className="vert_del_icon"
                            onClick={() => {
                              deletemodal(item.id);
                            }}
                          >
                            <svg
                              height="15"
                              viewBox="-40 0 427 427.00131"
                              width="15"
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
                            className="vert_del_icon"
                            onClick={() => {
                              deletemodal(item.id);
                            }}
                          >
                            <svg
                              height="15"
                              viewBox="-40 0 427 427.00131"
                              width="15"
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
                            <Link className="vert_del_icon">
                              <svg
                                height="15"
                                viewBox="-40 0 427 427.00131"
                                width="15"
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
                      {/* <td>
                      
                    
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          {!fetching && verticals.length == 0 && (
            <div className="no_record">
              {" "}
              <p>NO RECORDS FOUND</p>
            </div>
          )}

          {/* Pagination */}
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
          <div>
            {/* Modal to Create Vertical */}
            <Modal
              isOpen={open}
              className="vertcreate_edit_modal vertcreate_edit_pd"
              contentLabel="Example Modal"
              onRequestClose={closeModal}
            >
              <div
                className="buyer_close_div3 buyer_close_align buyer_close_crtcls"
                onClick={() => closeModal()}
              >
                <IoIosClose />
              </div>
              <div className="popup_heading_vert1 popup_heading_headtop">
                <p>Create Vertical</p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "2rem"
                }}
              >
                <div className="popup_modal_box01">
                  <div class="md-form md-outline vert_div_12 ">
                    <input
                      id="vertname"
                      class="form-control"
                      type="text"
                      name="name"
                      onChange={event => vert_name(event.target.value)}
                    />
                    <label for="vertname"> Vertical Name</label>
                  </div>

                  {toShowName && (
                    <div className="var_name_err_des111">
                      <p>
                        <span>
                          {" "}
                          <i
                            class="fa fa-exclamation-circle circle_err"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Name Must be filled
                      </p>
                    </div>
                  )}

                  <div className="verticalDescription ">
                    <div class="md-form md-outline vert_div_12">
                      <textarea
                        name="description"
                        type="text"
                        id="description_vert"
                        class="md-textarea form-control verticalDes_bdr"
                        rows="3"
                        onChange={event => vert_desc(event.target.value)}
                      ></textarea>
                      {/* <input id="description_vert" class="form-control"   type="text"
                       
                      name="description"
                      onChange={event => vert_desc(event.target.value)}/> */}
                      <label for="description_vert">Description</label>
                    </div>
                    {toShowDesc && (
                      <div className="var_name_err">
                        <p>
                          <span>
                            {" "}
                            <i
                              class="fa fa-exclamation-circle circle_err"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Description Must be filled
                        </p>
                      </div>
                    )}
                    {toShowDuplicate && (
                      <div className="var_name_err122">
                        <p>
                          <span>
                            {" "}
                            <i
                              class="fa fa-exclamation-circle circle_err"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Vertical Already Exists!!
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    className="create_vertical_btn"
                    onClick={() => {
                      CreateVerticalFields();
                    }}
                  >
                    Create Vertical
                  </button>
                </div>
              </div>
            </Modal>

            {/* Modal to Edit Details */}

            <Modal
              isOpen={editopen}
              className="vertcreate_edit_modal"
              contentLabel="Example Modal"
              onRequestClose={closeEditModal}
            >
              <div
                className="buyer_close_div3 buyer_close_rt buyer_close_crtcls"
                onClick={() => closeEditModal()}
              >
                <IoIosClose />
              </div>
              <div className="popup_heading_vert1 popup_heading_vert_pd">
                <p>Edit Vertical</p>
              </div>
              {/* <button className="closeBtn" onClick={() => closeEditModal()}>
            X
          </button> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 20
                }}
              >
                <div className="popup_modal_box01">
                  {/* Vertical Name: */}
                  {/* <div class="md-form md-outline">
  <input id="edit_vert1" class="form-control"  name="name"
                        value={name}
  onChange={event => vert_name(event.target.value)}/>
  
</div> */}

                  <div class="border211 edit_vrtical_name_alignsds">
                    <h1>First Name</h1>
                    <input
                      type="text"
                      name="name"
                      id="edit_vert1"
                      placeholder="Name"
                      value={name}
                      class="form-control"
                      onChange={event => vert_name(event.target.value)}
                    />
                  </div>
                  {toShowName1 && (
                    <div className="var_name_err">
                      <p>
                        <span>
                          {" "}
                          <i
                            class="fa fa-exclamation-circle circle_err"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Name Must be filled
                      </p>
                    </div>
                  )}

                  {/* <div class="md-form md-outline">
  <input id="edit_vert2" class="form-control"  name="description"
                      value={desc}
                      onChange={event => vert_desc(event.target.value)}/>
  
</div> */}

                  <div class="border211 edit_vertical_descp">
                    <h1>Description</h1>
                    {/* <input
                        type="text"
                        name="description"
                        id="edit_vert2"
                        placeholder="Description"
                        value={desc}
                        class="form-control crt_vertical_bdr"
                        onChange={event => vert_desc(event.target.value)}
                      /> */}
                    <textarea
                      name="description"
                      type="text"
                      id="edit_vert2"
                      value={desc}
                      class="md-textarea form-control verticalDes_bdr"
                      rows="3"
                      onChange={event => vert_desc(event.target.value)}
                    ></textarea>
                  </div>
                  {toShowDesc1 && (
                    <div className="var_name_err_des">
                      <p>
                        <span>
                          {" "}
                          <i
                            class="fa fa-exclamation-circle circle_err"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Description Must be filled
                      </p>
                    </div>
                  )}
                  {toShowDuplicate1 && (
                    <div className="var_name_err">
                      <p>
                        <span>
                          {" "}
                          <i
                            class="fa fa-exclamation-circle circle_err"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Vertical Already Exists!!
                      </p>
                    </div>
                  )}

                  <button
                    className="verticaldetails_update_btn"
                    onClick={() => {
                      edit_vertical(vertical_id);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </Modal>

            {/* Custom Modal */}

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
            {/* <Modal
                isOpen={success_alert}
                className="success_modal"
                contentLabel=" Invite Modal" 
              >
                <div className="alert_msg_vert" onClick={() => modalclose()}>
                  < IoIosClose className="vert_create_close"/> 
                  {message}
                  </div>
              </Modal> */}
            {/* Delete Modal */}
            <Modal
              isOpen={delete_alert}
              className="success_modal12"
              // style={customStyles}
              contentLabel=" Invite Modal"
            >
              <div className="alert_text delet_text_vert delet_text_vertcl_text12">
                <p>Are You Sure You Want to Delete This?</p>
              </div>
              <div
                className="alert_msg"
                onClick={() => DeleteVertical(deleteId)}
              >
                <button class="createBuyer_btn2_create createvetcl_btn2_ok">
                  OK
                </button>
                {/* <button>OK</button> */}
                {/* <IoIosClose /> */}
              </div>
              <div className="alert_msg" onClick={() => setdelete_alert(false)}>
                <button class="createBuyer_btn2_create createvertcl_btn2_create">
                  Cancel
                </button>
                {/* <button>Cancel</button> */}
                {/* <IoIosClose /> */}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalsMainPage;
