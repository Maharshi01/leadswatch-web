/*
Created By Uday
on 28/10/2019
last modified on 31/10/2019
Page=Buyers
*/
import React, { Component, useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { API_URL ,logoutidle} from '../../AppConfig'

import { hashHistory } from "react-router";
import PaginationName from "../Pagination/Pagination";
import EditImage from "../../EditImage";
import Modal from "react-modal";
import axios from "axios";
import { MdDateRange, MdRefresh } from "react-icons/md";
import {
  IoIosClose,
  IoIosArrowForward,
  IoIosCheckmarkCircleOutline
} from "react-icons/io";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { getDefaultWatermarks } from "istanbul-lib-report";
import { Row, Col, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { render } from "react-dom";
import { Spinner } from "react-bootstrap";
import "react-activity/dist/react-activity.css";
import { FiPlusCircle } from "react-icons/fi";
const Buyers = () => {
  // buyer state stores the list of buyers
  const [buyer, setBuyer] = useState([]);
  // This state is used for loading screen
  const [fetching, setFetching] = useState(true);
  // state to store single buyer details
  const [buyerdetails, setBuyerDetails] = useState();
  // state to track Create Model
  const [open, setOpen] = useState(false);
  // state to create Edit model
  const [editopen, setEditOpen] = useState(false);
  // state to Show status after Creation
  const [statusopen, setStatusOpen] = useState(false);
  //state to store total number of pages which is related to pagination
  const [totalpages, setTotalPages] = useState();
  // state to show status after edit
  const [editstatusopen, setEditStatusOpen] = useState(false);
  //State to show default image
  const [photo, setPhoto] = useState(false);
  //State to show Uploaded image
  const [photo1, setPhoto1] = useState(false);
  //State to hold total number of records from api
  const [count, setCount] = useState();
  //state to handle permissions
  const [permissions, setPermissions] = useState({});
  //state to store search key
  const [searchValue, setSearchValue] = useState();
  //state to store buyer status input
  const [statusvalue, setStatusValue] = useState([]);
  //state to store buyer filter id
  const [buyerfilterid, setBuyerFilterId] = useState([]);
  //States to handle filtering,pagination and sorting
  const [list, setList] = useState([]);
  const [total, setTotal] = useState([0]);
  const [limit, setLimit] = useState(10);
  const [filterLimit, setFilterLimit] = useState([10]);
  const [num, setNum] = useState([0]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const [e, setE] = useState(0);
  //buyeritems stores all the buyer details to be rendered using map function
  const buyeritems =
    buyer &&
    buyer.map(item => (
      <tr>
        {/* displaying buyer id,buyer image,firstname ,company,phone and email */}
        <td>{item.id}</td>
        <td className="text-left buyer_name_txt" id="buyName">
          {/* <img
            src={API_URL+`/file/buyer/${
              item.id
            }/26/26?t=${new Date().toTimeString()}`}
          />{" "} */}
          {item.firstname}
        </td>
        <td>{item.company}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        {/* if role is 2 he can have all the permissions and able to do every operation */}
        <td>
          {localStorage.getItem("role") == 2 ? (
            <Link
              // onClicking add icon in buyers page it navigates with dummy id
              to={`/buyercontacts/${item.id}`}
              onClick={() => {
                // createprofile is maintained to get rid of showing contacts tab while creating buyer in buyer page
                localStorage.setItem("createprofile", 0);
                // operation is maintained to differentiate between creating and editing as both are performwed in single page
                localStorage.setItem("operation", 0);
              }}
            >
              {/* Buyer edit icon */}
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
            </Link>
          ) : !permissions && permissions.actions.includes(3) ? (
            // Here icon is again displayed with edit permissions only
            <Link
              onClick={() => {
                localStorage.setItem("createprofile", 0);
                localStorage.setItem("operation", 0);
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
            </Link>
          ) : (
            // Overlay trigger is used to show tooltip when there are no certain permissions for a particular user it has no onClick
            <OverlayTrigger
              overlay={<Tooltip>Read only mode, changes not allowed!</Tooltip>}
            >
              <Link>
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
              </Link>
            </OverlayTrigger>
          )}
        </td>
        {/* <td>
          <Link to={`/buyercontacts/${item.id}`} className="buyerContacts">
            View
          </Link>
        </td> */}
        <td>
          <Link to={`/buyerroutes/${item.id}`} className="routes">
            View
          </Link>
        </td>
      </tr>
    ));
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
  // Function to be called after applying filters
  const getSearched = (limit, page, a, b) => {
    const data = {
      limit: limit, //Number of entries to be displayed for page
      page: page, //PAge NUmber
      search: searchValue ? searchValue : "", //Value to be searched with
      filters: {
        status: statusvalue, //Status filter(active or inactive)
        buyer_id: buyerfilterid //Filter with Buyer ID
      },
      sortby: { [a]: Number(b) } //Sorting filter
    };
    const config = {
      url: API_URL+"/buyer/list", //URL
      data: data, //DAta to be sent
      method: "post", //method
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        //console.log("BuyerList", response);
        setBuyer(response.data.data.list); //Stores all the buyers details
        setTotal(response.data.data.total_count); //stores the number of total entries from backend
        setLimit(response.data.data.per_page); //stores the limit value given at Show entries
        setTotalPages(response.data.data.total_pages); //stores total number of pages
        setCount(response.data.data);
        setList(response.data.data.list);
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
      })
      // Error handling
      .catch(error => {
        //  //console.log("Buyerlisterror1", error);
        alert(error.response.data.error.message);
      });
  };
  //function to be called after hitting refresh it gets data without any filters
  function getDataWithoutFilter() {
    const data = {
      limit: 10, //default limit of 10
      page: 1, //default page number 1
      // With all the filters are given as empty
      search: "",
      filters: {
        status: [],
        buyer_id: []
      },
      sortby: { email: -1 }
    };
    const config = {
      url: API_URL+"/buyer/list", //the buyers api is hit again to get data without filters
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
        setTotal(response.data.data.total_count);
        setLimit(response.data.data.per_page);
        setTotalPages(response.data.data.total_pages);
        setCount(response.data.data);
        setList(response.data.data.list);
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
      })
      // Error handling
      .catch(error => {
        //  //console.log("Buyerlisterror1", error);
        alert(error.response.data.error.message);
      });
  }
  // To stimulate or open the modal when the buyer details are posted successfully in the profile page
  if (localStorage.getItem("createbuyersuccess") == 1) {
    setStatusOpen(true);
    localStorage.setItem("createbuyersuccess", 0);
  }
  // To stimulate or open the modal when the buyer details are updated successfully in the profile page
  if (localStorage.getItem("editbuyersuccess") == 1) {
    setEditStatusOpen(true);
    localStorage.setItem("editbuyersuccess", 0);
  }
  //Function to fetch Buyers list
  useEffect(() => {
    document.title = "Buyers - LeadsWatch";
    if (localStorage.getItem("role_id") == 4) {
      setPermissions(
        JSON.parse(localStorage.getItem("permissions")).filter(item => {
          return item.module_id == 4;
        })
      );
    }
    const data = {
      limit: 10,
      page: 1,
      search: "",
      filters: {
        status: [],
        buyer_id: buyerfilterid
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
        setTotal(response.data.data.total_count);
        setLimit(response.data.data.per_page);
        setTotalPages(response.data.data.total_pages);
        setCount(response.data.data);
        setList(response.data.data.list);
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
        setList(response.data.data.list);
        setFetching(false);
      })
      // Error handling
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        alert(error.message);
      });
  }, []);
  // This function is called on hitting enter
  function enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      getSearched();
    }
  }

  //Seggregating based on the roles to give access or not
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
  return (
    <div className="body_bg">
      <div className="body_inner">
        {/* Modal to show status */}
        <Modal isOpen={statusopen} style={customStyles}>
          <div
            className="buyers_createBuyers_close"
            onClick={() => {
              setStatusOpen(false);
            }}
          >
            <IoIosClose />
          </div>
          <div>
            <p className="create_buyer_success">Buyer created successfully</p>
          </div>
        </Modal>
        {/* Modal to edit status */}
        <Modal isOpen={editstatusopen} style={customStyles}>
          <div
            className="buyers_createBuyers_close"
            onClick={() => {
              setEditStatusOpen(false);
            }}
          >
            <IoIosClose />
          </div>
          <div>
            <p className="create_buyer_success">Buyer updated successfully</p>
          </div>
        </Modal>

        <div className="buyer_table">
          <div className="buyer_table_heading12">
            <p>Buyers</p>

           
            <div className="add_icon_buy">
              {localStorage.getItem("role") == 2 ? (
                <Link
                  to={`/createbuyer`}
                  style={{ color: "#fff" }}
                  onClick={() => {
                    localStorage.setItem("createprofile", 1);
                    localStorage.setItem("operation", 1);
                  }}
                >
                  <FiPlusCircle />
                </Link>
              ) : !permissions && permissions.actions.includes(2) ? (
                <Link
                  style={{ color: "#fff" }}
                  onClick={() => {
                    localStorage.setItem("createprofile", 1);
                    localStorage.setItem("operation", 1);
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
                  <Link
                    style={{
                      color: "#fff"
                      // marginLeft: "12%",
                      // width: "50%"
                    }}
                  >
                    <FiPlusCircle />
                  </Link>
                </OverlayTrigger>
              )}
            </div>
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
                      onChange={event => {
                        setFilterLimit(event.target.value);
                        getSearched(event.target.value, 1);
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
                <div className="date_block_buyyer_inner002">
                  
                  <div className="pub_id_create">
                    <p className="show_entries_div_para">Buyer ID</p>

                    <input
                      className="buy_id_input camp_id_input"
                      type="text"
                      value={buyerfilterid}
                      placeholder="ID1,ID2"
                      onChange={event => {
                        if (event.target.value == "") {
                          getDataWithoutFilter();
                        }
                        setBuyerFilterId(event.target.value);
                      }}
                    ></input>
                  </div>
                  

                  <div className="apply_btn_div">
                    <IoIosCheckmarkCircleOutline
                      className="lead_apply_svg"
                      onClick={() => {
                        getSearched();
                      }}
                    />
                  </div>
                  <div className="refresh_btn_div">
                    <Link
                      onClick={() => {
                        setSearchValue("");
                        setBuyerFilterId([]);
                        getDataWithoutFilter();
                      }}
                    >
                      <MdRefresh className="refreshbtn1" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="butt_create_buyers003">
                <div className="searchbarValue_Div_leads">
                  <input
                    className="searchbarValue_fieldleads"
                    placeholder="Search"
                    value={searchValue}
                    onChange={event => {
                      if (event.target.value == "") {
                        getDataWithoutFilter();
                      }
                      setSearchValue(event.target.value);
                    }}
                    onKeyPress={enterPressed.bind(this)}
                    type="text"
                  />
                  <Link
                    onClick={event => {
                      getSearched();
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
                      class="th-sm"
                      onClick={() => {
                        // alternate("name");
                        setB(0);
                        setC(0);
                        setD(0);
                        setE(0);
                        if (a == 1) {
                          getSearched(limit, 1, "id", "1");
                          setA(2);
                        } else {
                          setA(1);
                          getSearched(limit, 1, "id", "-1");
                        }
                      }}
                    >
                      Buyer ID{" "}
                      <a className="a_class">
                        <svg
                          className="svg_up"
                          onClick={event => {
                            getSearched(limit, 1, "id", "1");
                            //getSortedSearched("id","-1",limit,1);
                          }}
                          id="Group_2411_buy"
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
                            getSearched(limit, 1, "id", "-1");
                            //getSortedSearched("id","1",limit,1);
                          }}
                          id="Group_2411_buy"
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
                      class="th-sm text-left "
                      onClick={() => {
                        // alternate("name");
                        setA(0);
                        setC(0);
                        setD(0);
                        setE(0);
                        if (b == 1) {
                          getSearched(limit, 1, "firstname", "-1");
                          setB(2);
                        } else {
                          setB(1);
                          getSearched(limit, 1, "firstname", "1");
                        }
                      }}
                    >
                      Buyer Name{" "}
                      <a className="a_class">
                        <svg
                          className="svg_up"
                          onClick={event => {
                            getSearched(limit, 1, "firstname", "1");
                            //getSortedSearched("firstname","1",limit,1);
                          }}
                          id="Group_2411_buy"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_3"
                            data-name="Polygon 3"
                            d="M4,0,8,5H0Z"
                            fill={b == 1 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                      </a>
                      <svg
                        onClick={event => {
                          getSearched(limit, 1, "firstname", "-1");
                          // getSortedSearched("firstname","-1",limit,1);
                        }}
                        id="Group_2411_buy"
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
                    </th>

                    <th
                      class="th-sm"
                      onClick={() => {
                        // alternate("name");
                        setA(0);
                        setB(0);
                        setD(0);
                        setE(0);
                        if (c == 1) {
                          getSearched(limit, 1, "company", "-1");
                          setC(2);
                        } else {
                          setC(1);
                          getSearched(limit, 1, "company", "1");
                        }
                      }}
                    >
                      Company{" "}
                      <a className="a_class">
                        <svg
                          className="svg_up"
                          onClick={event => {
                            getSearched(limit, 1, "company", "1");
                            //  getSortedSearched("company","-1",limit,1);
                          }}
                          id="Group_2411_buy"
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
                        <svg
                          onClick={event => {
                            getSearched(limit, 1, "company", "-1");
                            // getSortedSearched("company","1",limit,1);
                          }}
                          id="Group_2411_buy"
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
                            fill={c == 2 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                      </a>
                    </th>
                    <th
                      class="th-sm"
                      onClick={() => {
                        // alternate("name");
                        setA(0);
                        setB(0);
                        setC(0);
                        setE(0);
                        if (d == 1) {
                          getSearched(limit, 1, "phone", "-1");
                          setD(2);
                        } else {
                          setD(1);
                          getSearched(limit, 1, "phone", "1");
                        }
                      }}
                    >
                      Contact{" "}
                      <a className="a_class">
                        <svg
                          className="svg_up"
                          onClick={event => {
                            getSearched(limit, 1, "phone", "-1");
                            //getSortedSearched("phone","-1",limit,1);
                          }}
                          id="Group_2411_buy"
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
                          onClick={event => {
                            getSearched(limit, 1, "phone", "1");
                            // getSortedSearched("phone","-1",limit,1);
                          }}
                          id="Group_2411_buy"
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
                            fill={d == 2 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                      </a>
                    </th>
                    <th
                      class="th-sm"
                      onClick={() => {
                        // alternate("name");
                        setA(0);
                        setB(0);
                        setC(0);
                        setD(0);
                        if (e == 1) {
                          getSearched(limit, 1, "email", "-1");
                          setE(2);
                        } else {
                          setE(1);
                          getSearched(limit, 1, "email", "1");
                        }
                      }}
                    >
                      Email{" "}
                      <a className="a_class">
                        <svg
                          className="svg_up"
                          onClick={event => {
                            getSearched(limit, 1, "email", "-1");
                            //getSortedSearched("email","-1",limit,1);
                          }}
                          id="Group_2411_buy"
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
                            fill={e == 1 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                        <svg
                          onClick={event => {
                            getSearched(limit, 1, "email", "1");
                            //  getSortedSearched("email","1",limit,1);
                          }}
                          id="Group_2411_buy"
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
                            fill={e == 2 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                      </a>
                    </th>
                    <th class="th-sm details_lead">Actions</th>
                    <th class="th-sm details_lead">Routes</th>
                  </tr>
                </thead>
                <tbody></tbody>
                {!fetching && buyeritems && buyeritems}
               
              </table>
            )}
             {!fetching &&
                  !buyeritems &&
                  localStorage.getItem("createprofile") !== 1 && (
                    <p style={{ color:"#484393",fontSize:"17px",fontWeight:"400",textAlign: "center" ,marginTop:"1rem"}}>No Data Found!!</p>
                  )}
            {localStorage.getItem("createprofile") == 0 && !fetching && (
              <div className="no_record">
                {" "}
                <p>Create Buyer To add Contacts</p>
              </div>
             
            )}
          </div>

          <div>
            <PaginationName
              prev={prev}
              next={next}
              getPublishersList={getSearched}
              num={num}
              total={total}
              limit={limit}
              totalPages={totalpages}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyers;
