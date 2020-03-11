/*
Created By Uday
on 28/10/2019
last modified on 31/12/2019
Page=BuyersContacts
*/
import React, { Component, useState, useEffect } from "react";
import { Row, Col, Image, InputGroup } from "react-bootstrap";
import { API_URL, logoutidle } from "../../AppConfig";
import {
  BrowserRouter as Router,
  Link,
  useParams,
  useHistory
} from "react-router-dom";
import Modal from "react-modal";
import { cca } from ".././UserManagement/cc";
import Copy from "../../Copy";
import axios from "axios";
import { IoIosClose, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import PaginationName from "../Pagination/Pagination";
import { render } from "react-dom";
import { FiPlusCircle } from "react-icons/fi";
import EditImage from "../../EditImage";
import { Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import "react-activity/dist/react-activity.css";
const BuyerContacts = props => {
  let history = useHistory();
  let { id } = useParams();
  // buyer state stores the list of buyerContacts
  const [buyer, setBuyer] = useState([]);
  //State to store buyer id that is automatically generated on uploading an image
  const [cimgid, setCImgId] = useState();
  // State is used to store buyer id
  const [buyerid, setBuyerId] = useState();
  const [fetching, setFetching] = useState(true);
  //States to store buyer contacts details
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [jobrole, setJobrole] = useState();
  //states to store profile details
  const [profile_firstname, setProfileFirstName] = useState();
  const [profile_lastname, setProfileLastName] = useState();
  const [profile_phone, setProfilePhone] = useState();
  const [profile_email, setProfileEmail] = useState();
  const [profile_company, setProfileCompany] = useState();
  const [profile_cardnumber, setProfileCardNumber] = useState();
  const [profile_cardcvv, setProfileCvv] = useState();
  const [profile_cardexpiry, setProfileCardExpiry] = useState();
  //state to hold the status of tab
  const [curr_tab, setCurrentTab] = useState("profile");
  //states to show images
  const [photo, setPhoto] = useState(false);
  const [photo1, setPhoto1] = useState(false);
  //state to show buyer contact id
  const [buyercontactid, setBuyerContactId] = useState();
  const [buyercontactdetails, setBuyerContactDetails] = useState();
  //state to store all the page numbers
  const [totalpages, setTotalPages] = useState();
  //state to hold the buyer name
  const [head, setHead] = useState();
  //state to hold search value
  const [searchValue, setSearchValue] = useState();
  //state to maintain status of modal
  const [statusopen, setStatusOpen] = useState(false);
  const [editstatusopen, setEditStatusOpen] = useState(false);
  //states for error validation
  const [buy_ph, setbuy_ph] = useState(false);
  const [buy_email, setbuy_email] = useState(false);
  const [buy_fname, setbuy_fname] = useState(false);
  const [buy_lname, setbuy_lname] = useState(false);
  const [buy_job, setbuy_job] = useState(false);
  const [buy_all, setbuy_all] = useState(false);
  const [edit_buy_ph, setedit_buy_ph] = useState(false);
  const [edit_buy_email, setedit_buy_email] = useState(false);
  const [edit_buy_fname, setedit_buy_fname] = useState(false);
  const [edit_buy_lname, setedit_buy_lname] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [edit_buy_jb, setedit_buy_jb] = useState(false);
  const [createmsg, setCreateMsg] = useState(false);
  const [editmsg, setEditMsg] = useState(false);
  const [edit_buy_all, setedit_buy_all] = useState(false);
  const [count, setCount] = useState();
  //States to handle filtering sorting and searching
  const [list, setList] = useState([]);
  const [total, setTotal] = useState([0]);
  const [limit, setLimit] = useState([0]);
  const [filterLimit, setFilterLimit] = useState([0]);
  const [num, setNum] = useState([0]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(2);
  // state to track Create Model
  const [open, setOpen] = useState(false);
  // state to create Edit model
  const [editopen, setEditOpen] = useState(false);
  const [editbuyer, setEditBuyer] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lead_butt1, setlead_butt1] = useState(true);
  const [lead_butt2, setlead_butt2] = useState(false);
  const [showcontacts, setShowContacts] = useState(false);
  const [showprofile, setShowProfile] = useState(true);
  const [EditDetails, setEditDetails] = useState(true);
  const [contact_buy, setContact_buy] = useState(false);

  const [lead_butt3, setlead_butt3] = useState(false);
  const [code, setcode] = useState("+1");
  //Buyercontacts holds all the details to be displayed in a table
  const buyercontacts =
    buyer &&
    buyer.map(item => (
      <tr>
        {/* Displaying all the details */}
        <td>
          {item.firstname} {item.lastname}
        </td>
        <td>{item.jobrole}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>
          {/* Based on the role and given permissions the users are given access to create or edit or view and its handled here */}
          {localStorage.getItem("role") == 2 ? (
            <Link
              onClick={() => {
                edit_modal(item.id);
              }}
            >
              <svg
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
          ) : !permissions && permissions.actions.includes(3) ? (
            <Link
              onClick={() => {
                edit_modal(item.id);
              }}
            >
              <svg
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
          ) : (
            // Overlay trigger is used to display tooltip
            <OverlayTrigger
              overlay={<Tooltip>Read only mode, changes not allowed!</Tooltip>}
            >
              <Link>
                <svg
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
            </OverlayTrigger>
          )}
        </td>
      </tr>
    ));

  //function to apply filters
  const getSearched = (limit, page, a, b) => {
    const data = {
      limit: limit, //Number of entries to be displayed
      page: page, //Page Number
      search: searchValue ? searchValue : "", //Search value to be filtered
      sortby: { [a]: parseInt(b) } //Sort value
    };
    const config = {
      url: API_URL + `/buyer/contacts/list/${id}`, //URL
      data: data,
      method: "post", //Method
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        setBuyer(response.data.data.list);
        setTotal(response.data.data.total_count);
        setTotalPages(response.data.data.total_pages);
        setLimit(response.data.data.per_page);
        setList(response.data.data.list);
        setCount(response.data.data);
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
        // To make activity Indicator off
        setFetching(false);
      })
      // Error handling
      .catch(error => {
        // ////console.log("Buyerlisterror1", error);
      });
  };
  //function to upload image
  const handleChangeFile = file => {
    // Data is appended as formdata and sent to api if we are editing we are passing id by checking operation value in local storage
    let picdata = new FormData();
    picdata.append("picture", file);
    {
      localStorage.getItem("operation") == 0 && picdata.append("id", id);
    }
    console.log("PICDATA", picdata);
    const config = {
      url: API_URL + "/file/buyer/upload",
      method: "post",
      data: picdata,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json"
      }
    };
    axios(config)
      .then(response => {
        console.log("Imageupload", response);
        if (response.status == 200) {
          setPhoto(true);
          if (response.data.data.id) {
            setCImgId(response.data.data.id);
            setPhoto1(true);
          }
          setPhoto(false);
          alert("Image uploaded sucessfully");
        }
      })
      // Error handling
      .catch(error => {
        console.log("ImageUploaderror1", error);
        alert(error.message);
      });
  };
  // Function to be called on Refresh
  function getDataWithoutFilter() {
    const data = {
      limit: 10,
      page: 1,
      search: "",
      sortby: { email: -1 }
    };
    const config = {
      url: API_URL + `/buyer/contacts/list/${id}`, //URL
      data: data,
      method: "post", //Method
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        setBuyer(response.data.data.list);
        setTotal(response.data.data.total_count);
        setTotalPages(response.data.data.total_pages);
        setLimit(response.data.data.per_page);
        setList(response.data.data.list);
        setCount(response.data.data);
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
        // To make activity Indicator off
        setFetching(false);
      })
      // Error handling
      .catch(error => {
        //alert(error.response.data.error.message);
      });
  }

  //Function to fetch Buyer Contacts List
  useEffect(() => {
    document.title = "Buyer Contacts - LeadsWatch";
    //Permissions handler
    if (localStorage.getItem("role") == 4)
      var currentModule = JSON.parse(
        localStorage.getItem("permissions")
      ).filter(item => {
        return item.module_id == 4;
      });
    setPermissions(currentModule ? currentModule[0] : {});
    const data = {
      limit: 10,
      page: 1,
      search: "",
      sortby: { email: -1 }
    };
    if (localStorage.getItem("createprofile") != 1) {
      const config = {
        url: API_URL + `/buyer/contacts/list/${id}`, //URL
        data: data,
        method: "post", //Method
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          ////console.log("BuyerContactsList", response);
          try {
            if (response.data.data.list.length > 0) {
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
            }
          } catch {
            setBuyer([]);
          }
          // To make activity Indicator off
          setFetching(false);
        })
        // Error handling
        .catch(error => {
          if (error.message == "Request failed with status code 401") {
            logoutidle();
          }
          alert(error);
        });

      const config1 = {
        url: API_URL + `/buyer/detail/${id}`, //URL

        method: "get", //Method
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config1)
        .then(response => {
          setBuyerId(response.data.data.id);
          setHead(response.data.data.firstname);
          setProfileFirstName(response.data.data.firstname);
          setProfileLastName(response.data.data.lastname);
          setProfileEmail(response.data.data.email);
          setProfileCompany(response.data.data.company);
          setcode(""+response.data.data.phone.split("-")[0]+"")
          console.log(response.data.data.phone.split("-")[0],"code")
          setProfilePhone(response.data.data.phone.split("-")[1]);
          setProfileCardNumber(response.data.data.card_number);
          setProfileCardExpiry(response.data.data.card_expirydate);
          setProfileCvv(response.data.data.card_cvv);
          // To make activity Indicator off
          setFetching(false);
        })
        // Error handling
        .catch(error => {
          alert(error.response.data.error.message);
        });
    }
  }, []);

  //Function to post buyer contact data into database
  function save_details() {
    console.log("Inside save_details");
    if (firstname && lastname && phone && email && jobrole) {
      console.log("Inside save_details after if loop");
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) === true) {
        var reg1 = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
        if (phone.length == 10 && reg1.test(phone) === true) {
          // Data to be posted to Database
          const data = {
            buyer_id: id,
            firstname: firstname,
            middlename: "",
            lastname: lastname,
            phone: phone,
            email: email,
            jobrole: jobrole,
            type: "m"
          };
          const config = {
            url: API_URL + "/buyer/contacts/create", //post Url
            data: data, //data to be posted
            method: "post",
            headers: {
              //headers
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access_token")
            }
          };
          axios(config)
            .then(response => {
              if (response.status == 200) {
                setFirstName("");
                setLastName("");
                setEmail("");
                setJobrole("");
                setPhone("");
                closeModal(); // To close modal
                myfunc(); // Function to re-render
                setStatusOpen(true);
              }
            })
            .catch(error => {
              setCreateMsg(error.response.data.error.message);
            });
        } //end of if validating mobile
        else {
          //phone validation
          //alert("Phone number should be only 10 digits")
          setbuy_ph(true);
        }
      } //end of if validating email
      else {
        //alert("Enter valid email.Ex:abc@example.com")
        setbuy_email(true);
      }
    } //end of if validating all fields
    else {
      if (!phone) setbuy_ph(true);
      if (!email) setbuy_email(true);
      if (!firstname) setbuy_fname(true);
      if (!lastname) setbuy_lname(true);
      if (!jobrole) setbuy_job(true);
    }
  }
  //function to post buyer profile details to database
  function save_profile_details() {
    if (
      profile_firstname &&
      profile_lastname &&
      profile_phone &&
      profile_email &&
      profile_company
    ) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(profile_email) === true) {
        var reg1 = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
        if (profile_phone.length == 10 && reg1.test(profile_phone)) {
          // Data to be posted to Database
          const data = {
            firstname: profile_firstname,
            middlename: "",
            lastname: profile_lastname,
            phone: code+"-"+profile_phone,
            email: profile_email,
            company: profile_company,
            card_number: "",
            card_cvv: "",
            card_expirydate: "",
            card_name: ""
          };
          const config = {
            url: API_URL + "/buyer/create", //post Url
            data: data, //data to be posted
            method: "post",
            headers: {
              //headers
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access_token")
            }
          };
          axios(config)
            .then(response => {
              if (response.status == 200) {
                setProfileFirstName("");
                setProfileLastName("");
                setProfileEmail("");
                setProfilePhone("");
                setProfileCompany("");
                setProfileCardNumber("");
                setProfileCardExpiry("");
                setProfileCvv("");
                setPhoto1(false);
                closeModal(); // to close Modal on Clicking
                myfunc(); // to re-render after modification
                localStorage.setItem("createbuyersuccess", 1);
                props.history.goBack();
              }
            })
            .catch(error => {
              // Error Message
              if (error.response.data.error.message.startsWith("Duplicate"))
                setCreateMsg("Email Already Exists");
              else setCreateMsg(error.response.data.error.message);
            });
        } //end of if validating Phone
        else {
          // alert("Phone number must be 10 digits")
          setbuy_ph(true);
        }
      } //end of if validating email
      else {
        // alert("Enter Valid Email. Ex:abc@example.com")
        setbuy_email(true);
      }
    } //end of if validating all fields
    else {
      // alert("Please Enter all the feilds to Proceed")
      if (!profile_phone) setbuy_ph(true);
      if (!profile_email) setbuy_email(true);
      if (!profile_firstname) setbuy_fname(true);
      if (!profile_lastname) setbuy_lname(true);
      if (!profile_company) setbuy_job(true);
    }
  }
  // To Open Create Model
  const openModal = () => {
    setOpen(true);
  };
  // To close Create Model
  const closeModal = () => {
    setOpen(false);
  };
  //function to be called on hitting enter in search input
  function enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      getSearched();
    }
  }
  // Styles for model
  const customStyles = {
    content: {
      width: "35%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };
  //function to post updated buyer or profile details to database
  const edit_profile_buyer = id => {
    if (
      profile_firstname &&
      profile_lastname &&
      profile_phone &&
      profile_email &&
      profile_company
    ) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(profile_email) === true) {
        var reg1 = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
        if (profile_phone.length == 10 && reg1.test(profile_phone)) {
          const data = {
            firstname: profile_firstname,
            middlename: "",
            lastname: profile_lastname,
            phone: code+"-"+profile_phone,
            email: profile_email,
            company: profile_company,
            card_name: "",
            card_number: profile_cardnumber,
            card_cvv: profile_cardcvv,
            card_expirydate: profile_cardexpiry,
            active: 1
          };
          console.log("ADTATA", data);
          const config = {
            url: API_URL + `/buyer/update/${id}`, //post Url
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
              if (response.status == 200) {
                localStorage.setItem("editbuyersuccess", 1);
                props.history.goBack();
              }
            })
            .catch(error => {
              if (error.response.data.error.message.startsWith("Duplicate"))
                setCreateMsg("Email Already Exists");
              else setCreateMsg(error.response.data.error.message);
            });
        } //end of if validating mobile
        else {
          setbuy_ph(true);
        }
      } //end of if validating email
      else {
        // alert("Enter valid email.Ex:abc@example.com");
        setbuy_email(true);
      }
    } //end of if validating ALL fields
    else {
      // alert("Please enter all fields to proceed!!")
      if (!profile_phone) setbuy_ph(true);
      if (!profile_email) setbuy_email(true);
      if (!profile_firstname) setbuy_fname(true);
      if (!profile_lastname) setbuy_lname(true);
      if (!profile_company) setbuy_job(true);
    }
  };
  //Function to post  Edited Buyer contacts
  const edit_buyer = id => {
    if (firstname && lastname && phone && email && jobrole) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) === true) {
        var reg1 = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
        if (phone.length == 10 && reg1.test(phone)) {
          //Data to be posted
          const data = {
            firstname: firstname,
            middlename: "",
            lastname: lastname,
            phone: phone,
            email: email,
            type: "m",
            jobrole: jobrole,
            active: 1
          };
          ////console.log("Data", data);

          const config = {
            url: API_URL + `/buyer/contacts/update/${id}`, //post Url
            data: data, //data to be posted
            method: "put",
            headers: {
              //headers
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access_token")
            }
          };
          ////console.log("hello");
          axios(config)
            .then(response => {
              if (response.status == 200) {
                setFirstName("");
                setLastName("");
                setEmail("");
                setJobrole("");
                setPhone("");
                closeEditModal(); //To close modal on successful updation
                myfunc(); //To re-render
                setEditStatusOpen(true);
              }
            })
            .catch(error => {
              setEditMsg(error.response.data.error.message);
            });
        } //end of if validating phone
        else {
          setedit_buy_ph(true);
          // alert("Phone number should be only 10 digits")
        }
      } //end of if validating email
      else {
        //  alert("Enter valid Email!Ex:abc@example.com")
        setedit_buy_email(true);
      }
    } // end of if validating all fields
    else {
      // alert("Please fill all details to proceed")
      if (!phone) setedit_buy_ph(true);
      if (!email) setedit_buy_email(true);
      if (!firstname) setedit_buy_fname(true);
      if (!lastname) setedit_buy_lname(true);
      if (!jobrole) setedit_buy_jb(true);
    }
  };
  //function to open edit modal and display details based on ID
  const edit_modal = id => {
    ////console.log("ID", id);
    const config = {
      url: API_URL + `/buyer/contacts/detail/${id}`, //Url with buyer contact id
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        //Sending all details to states to edit
        setBuyerContactDetails(response.data.data);
        setFirstName(response.data.data.firstname);
        setLastName(response.data.data.lastname);
        setEmail(response.data.data.email);
        setPhone(response.data.data.phone);
        setJobrole(response.data.data.jobrole);
        setBuyerContactId(response.data.data.id);
        openEditModal(); //To open modal
      })
      // Error handling
      .catch(error => {});
  };
  //function to handle firstname
  const buyer_firstname = value => {
    if (value != "") {
      setbuy_fname(false);
      setedit_buy_fname(false);
    }
    if (curr_tab === "profile") setProfileFirstName(value);
    if (curr_tab === "contacts") setFirstName(value);
    setbuy_all(false);
    setedit_buy_all(false);
  };
  // function to handle lastname
  const buyer_lastname = value => {
    if (value != "") {
      setbuy_lname(false);
      setedit_buy_lname(false);
    }
    if (curr_tab === "profile") setProfileLastName(value);
    if (curr_tab === "contacts") setLastName(value);
    setbuy_all(false);
    setedit_buy_all(false);
  };
  // function to handle Email
  const buyer_email = value => {
    if (value != "") {
      setbuy_email(true);
      setedit_buy_email(true);
    }
    if (curr_tab === "profile") setProfileEmail(value);
    if (curr_tab === "contacts") setEmail(value);
    setbuy_all(false);
    setbuy_email(false);
    setedit_buy_email(false);

    setedit_buy_all(false);
  };
  // function to handle Jobrole
  const buyer_jobrole = value => {
    if (value != "") {
      setedit_buy_jb(false);
      setbuy_job(false);
    }
    if (curr_tab === "profile") setProfileCompany(value);
    if (curr_tab === "contacts") setJobrole(value);
    setbuy_all(false);

    setedit_buy_all(false);
  };
  //function to handle contacts
  const check_phone = value => {
    if (value != "") {
      setbuy_ph(true);
      setedit_buy_ph(true);
    }
    setedit_buy_all(false);
    if (value.length > 10) {
      setbuy_ph(true);
      setedit_buy_ph(true);
    } else if (value.length == 10) {
      if (curr_tab === "profile") setProfilePhone(value);
      if (curr_tab === "contacts") setPhone(value);
      setbuy_ph(false);
      setedit_buy_ph(false);
    } else {
      if (curr_tab === "profile") setProfilePhone(value);
      if (curr_tab === "contacts") setPhone(value);
    }
  };
  //function to re-render after successful creation and updation by hitting buyercontacts list api again
  const myfunc = () => {
    const data = {
      limit: 10,
      page: 1,
      search: "",
      sortby: { email: -1 }
    };
    const config = {
      url: API_URL + `/buyer/contacts/list/${id}`,
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        setBuyer(response.data.data.list);
        // To make activity Indicator off
        setFetching(false);
      })
      // Error handling
      .catch(error => {
        ////console.log("Buyerlisterror1", error);
      });
  };
  //To open edit modal
  const openEditModal = () => {
    setEditOpen(true);
  };
  //To close edit modal
  const closeEditModal = () => {
    setEditOpen(false);
  };
  // When profile tab is clicked showprofile is made true and profile page is displayed and showcontacts is made false and viceversa
  return (
    <div className="body_inner_set">
      <div
        onClick={() => {
          history.goBack();
        }}
        className="back_buy_contact_buy14"
      >
        <IoIosArrowBack />
      </div>

      <div className="camp-header_buy">
        <h2>Actions</h2>
      </div>

      <div className="settings_main_div_buy1">
        <div className="modal_inner_block">
          {localStorage.getItem("createprofile") != 1 && (
            <div className="modal_tab_btns">
              <button
                onClick={() => {
                  console.log("hello", EditDetails);
                  setEditDetails(true);
                  setContact_buy(false);
                  setlead_butt1(true);

                  setlead_butt2(false);
                  setCurrentTab("profile");
                  ////console.log("hello", lead_butt1);
                }}
                className={lead_butt1 == true ? "butt_true" : "butt_false"}
              >
                Edit Buyer Details
              </button>

              <button
                onClick={() => {
                  console.log("fdxgch", contact_buy);

                  setContact_buy(true);
                  setlead_butt1(false);
                  setEditDetails(false);
                  setlead_butt2(true);
                  setCurrentTab("contacts");
                  ////console.log("hello", lead_butt1);
                }}
                className={lead_butt2 == true ? "butt_true" : "butt_false"}
              >
                Buyer Contacts
              </button>
            </div>
          )}

          {contact_buy == true ? (
            <div>
              <Modal
                isOpen={open}
                className="contact_edit_modal12"
                contentLabel="Example Modal"
                onRequestClose={closeModal}
              >
                <div
                  className="contact_close_div5 buyer_conpop_close"
                  onClick={() => closeModal()}
                >
                  <IoIosClose />
                </div>
                <p className="popup_heading_contact1">Create Buyer Contact</p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div className="popup_modal_box">
                    <div className="form_flex_fields1">
                      <div class="md-form md-outline md-outline-extraclass md-form-extraClass02">
                        <input
                          type="text"
                          id="createFirst_Name"
                          className="form-control buyer_popup_field"
                          onChange={event =>
                            buyer_firstname(event.target.value)
                          }
                        />
                        <label
                          className="input_text_buyer"
                          for="createFirst_Name"
                        >
                          First Name
                        </label>
                        {buy_fname == true && (
                          <div className="create_byer_form_err_buy">
                            <p>Enter Firstname</p>
                          </div>
                        )}
                      </div>

                      <div class="md-form md-outline  md-form-extraClass02">
                        <input
                          type="text"
                          id="createlast_Name"
                          className="form-control buyer_popup_field"
                          onChange={event => buyer_lastname(event.target.value)}
                        />
                        <label
                          className="input_text_buyer"
                          for="createlast_Name"
                        >
                          Last Name
                        </label>
                        {buy_lname == true && (
                          <div className="create_byer_form_err_buy">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter Lastname
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="rowdiv_extra">
                      <div class="md-form md-outline md-form-extraClass01">
                        <input
                          type="text"
                          id="createemail"
                          className="form-control buyer1_popup_field"
                          onChange={event => buyer_email(event.target.value)}
                        />
                        <label className="input_text_buyer" for="createemail">
                          Email
                        </label>
                        {buy_email == true ? (
                          <div className="create_byer_form_err_buy">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter valid email.Ex:abc@example.com
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>

                    <div className="rowdiv_extra">
                      <div class="md-form md-outline md-form-extraClass01">
                        <input
                          type="text"
                          id="createcontact"
                          className="form-control buyer1_popup_field"
                          onChange={event => check_phone(event.target.value)}
                        />
                        <label className="input_text_buyer" for="createcontact">
                          Contact
                        </label>
                        {buy_ph == true ? (
                          <div className="create_byer_form_err_buy">
                            <p>Phone number should be only 10 digits</p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>

                    <div class="md-form md-outline">
                      <input
                        type="text"
                        id="createcompany"
                        className="form-control buyer1_popup_field"
                        onChange={event => buyer_jobrole(event.target.value)}
                      />
                      <label className="input_text_buyer" for="createcompany">
                        company
                      </label>
                      {buy_job == true ? (
                        <div className="create_byer_form_err_buy">
                          <p>Enter Company</p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>

                    <button
                      className="modal_create_btn"
                      onClick={() => {
                        save_details();
                      }}
                      to={"/buyers"}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </Modal>
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
                  <p className="text-center">
                    Buyer contact created successfully
                  </p>
                </div>
              </Modal>
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
                  <p className="text-center">
                    Buyer contact updated successfully
                  </p>
                </div>
              </Modal>

              <Modal
                isOpen={editopen}
                className="contact_edit_modal"
                contentLabel="Example Modal"
                onRequestClose={closeEditModal}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div className="popup_modal_box popup_modal_box_update_bc">
                    <div
                      className="contact_close_div"
                      onClick={() => closeEditModal()}
                    >
                      <IoIosClose />
                    </div>
                    <div className="popup_modal_box_update_bc_inner">
                      <p className="popup_heading_contact1">
                        Update Buyer Contact
                      </p>

                      <div className="form_flex_fields">
                        <div>
                          <div class="border118">
                            <h1>First Name</h1>
                            <input
                              type="text"
                              name="firstname"
                              placeholder="First Name"
                              value={firstname}
                              class="form-control buyer_popup_field"
                              onChange={event =>
                                buyer_firstname(event.target.value)
                              }
                            />
                          </div>
                          {edit_buy_fname == true ? (
                            <div className="create_byer_form_err_buy">
                              <p> Enter Firstname</p>
                            </div>
                          ) : (
                            <p></p>
                          )}
                        </div>

                        <div>
                          <div class="border118">
                            <h1>Last Name</h1>
                            <input
                              type="text"
                              name="lastname"
                              placeholder="Last Name"
                              value={lastname}
                              class="form-control buyer_popup_field"
                              onChange={event =>
                                buyer_lastname(event.target.value)
                              }
                            />
                          </div>
                          {edit_buy_lname == true ? (
                            <div className="create_byer_form_err_buy">
                              <p> Enter Lastname</p>
                            </div>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>

                      <div>
                        <div class="border119">
                          <h1>Email</h1>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            class="form-control buyer1_popup_field"
                            onChange={event => buyer_email(event.target.value)}
                          />
                        </div>
                        {createmsg ? (
                          <div className="email_err">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              {createmsg}
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}

                        {edit_buy_email == true ? (
                          <div className="create_byer_form_err_buy">
                            <p>Enter valid Email!Ex:abc@example.com</p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>

                      <div className="row_extra_div_class">
                        <div class="border119">
                          <h1>Contact</h1>
                          <input
                            type="text"
                            name="phone"
                            placeholder="Contact"
                            value={phone}
                            class="form-control buyer1_popup_field"
                            onChange={event => check_phone(event.target.value)}
                          />
                        </div>

                        {edit_buy_ph == true ? (
                          <div className="create_byer_form_err_buy">
                            <p> Phone Number Should be 10 digits</p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>

                      <div class="border119">
                        <h1>Job Role</h1>
                        <input
                          type="text"
                          name="company"
                          placeholder="Jobrole"
                          value={jobrole}
                          class="form-control buyer1_popup_field2"
                          onChange={event => buyer_jobrole(event.target.value)}
                        />
                      </div>

                      {edit_buy_ph == true ? (
                        <div className="create_byer_form_err_buy">
                          <p> Enter JobRole</p>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {editmsg ? (
                        <div className="email_err">
                          <p>{editmsg}</p>
                        </div>
                      ) : (
                        <p></p>
                      )}

                      <button
                        className="modal_create_btn"
                        onClick={() => {
                          edit_buyer(buyercontactid);
                        }}
                        to={"/buyers"}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>

              <div className="buyer_table">
                <div
                  onClick={() => {
                    history.goBack();
                  }}
                  className="back_buy_contact_buy"
                >
                  <IoIosArrowBack />
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
                      <div className="date_block_campaign_inner">
                        <div className="active_status_leads_buy"></div>

                        <div className="apply_btn_div_buy"></div>
                      </div>
                    </div>

                    <div className="butt_create_buyers003">
                      <div className="searchbarValue_Div_leads">
                        <input
                          className="searchbarValue_fieldleads"
                          placeholder="Search"
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
                          <th class="th-sm">
                            Contact Name
                            <a className="a_class">
                              <svg
                                className="svg_up"
                                onClick={event => {
                                  getSearched(limit, 1, "firstname", "1");
                                  //getSortedSearched("firstname","1",limit,1);
                                }}
                                id="Group_2411"
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
                                  fill="#484393"
                                />
                              </svg>
                              <svg
                                onClick={event => {
                                  getSearched(limit, 1, "firstname", "-1");
                                  // getSortedSearched("firstname","-1",limit,1);
                                }}
                                id="Group_2411"
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
                                  fill="#484393"
                                />
                              </svg>
                            </a>
                          </th>
                          <th class="th-sm">
                            Jobrole
                            <a className="a_class">
                              <svg
                                className="svg_up"
                                onClick={event => {
                                  getSearched(limit, 1, "jobrole", "1");
                                  //getSortedSearched("firstname","1",limit,1);
                                }}
                                id="Group_2411"
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
                                  fill="#484393"
                                />
                              </svg>
                              <svg
                                onClick={event => {
                                  getSearched(limit, 1, "jobrole", "-1");
                                  // getSortedSearched("firstname","-1",limit,1);
                                }}
                                id="Group_2411"
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
                                  fill="#484393"
                                />
                              </svg>
                            </a>
                          </th>
                          <th class="th-sm">
                            Contact
                            <a className="a_class">
                              <svg
                                className="svg_up"
                                onClick={event => {
                                  getSearched(limit, 1, "phone", "1");
                                  //getSortedSearched("firstname","1",limit,1);
                                }}
                                id="Group_2411"
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
                                  fill="#484393"
                                />
                              </svg>
                              <svg
                                onClick={event => {
                                  getSearched(limit, 1, "phone", "-1");
                                  // getSortedSearched("firstname","-1",limit,1);
                                }}
                                id="Group_2411"
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
                                  fill="#484393"
                                />
                              </svg>
                            </a>
                          </th>
                          <th class="th-sm">
                            Contact Email
                            <a className="a_class">
                              <svg
                                className="svg_up"
                                onClick={event => {
                                  getSearched(limit, 1, "email", "1");
                                  //getSortedSearched("firstname","1",limit,1);
                                }}
                                id="Group_2411"
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
                                  fill="#484393"
                                />
                              </svg>
                              <svg
                                onClick={event => {
                                  getSearched(limit, 1, "email", "-1");
                                  // getSortedSearched("firstname","-1",limit,1);
                                }}
                                id="Group_2411"
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
                                  fill="#484393"
                                />
                              </svg>
                            </a>
                          </th>
                          <th class="th-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!fetching && buyer.length > 0 && buyercontacts}
                      </tbody>
                    </table>
                  )}

                  <div className="no_contacts_buyer">
                    {!fetching && buyer.length == 0 && (
                      <p>No Contacts Found For This Buyer!!</p>
                    )}
                  </div>
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
          ) : (
            <div></div>
          )}

          {EditDetails == true ? (
            <div className="personal_width">
              <div className="set_content_div">
                <div className="buy_contact_box">
                  <div className="personal_heading">
                    <p>Buyer Details</p>
                  </div>
                  {localStorage.getItem("createprofile") == 1 && (
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={2}>
                        <div className="">
                          <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={e => handleChangeFile(e.target.files[0])}
                          />{" "}
                          {photo1 && localStorage.getItem("operation") == 1 && (
                            <Image
                              style={{
                                width: "109%",
                                height: "8.5rem",
                                outline: "none",
                                border: "1px Solid #666",
                                marginLeft: "15%"
                              }}
                              src={
                                API_URL +
                                `/file/buyer/${cimgid}/200/200?t=${new Date().toTimeString()}`
                              }
                              roundedCircle
                            />
                          )}
                          {!photo1 && localStorage.getItem("operation") == 1 && (
                            <Image
                              style={{
                                width: "109%",
                                height: "8.5rem",
                                outline: "none",
                                border: "1px Solid #666",
                                marginLeft: "15%"
                              }}
                              src={
                                API_URL +
                                `/file/buyer/default/200/200?t=${new Date().toTimeString()}`
                              }
                              roundedCircle
                            />
                          )}
                          {localStorage.getItem("operation") == 0 && (
                            <Image
                              style={{
                                width: "109%",
                                height: "8.5rem",
                                outline: "none",
                                border: "1px Solid #666",
                                marginLeft: "15%"
                              }}
                              src={
                                API_URL +
                                `/file/buyer/${buyerid}/200/200?t=${new Date().toTimeString()}`
                              }
                              roundedCircle
                            />
                          )}
                          <label
                            className="edit_pic_upload_head123_set"
                            for="file"
                          >
                            <EditImage />
                          </label>
                        </div>
                        <p
                          style={{
                            backgroungColor: "#a0a0a0",
                            width: "13rem",
                            marginLeft: "1rem",
                            color: "#666",
                            marginBottom: "14px",
                            fontSize: "14px"
                          }}
                        >
                          <span style={{ color: "red" }}>Note: </span>Image
                          upload must be 400x400 dimensions
                        </p>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={1}></Col>

                      <Col xs={12} sm={12} md={6} lg={3}>
                        <div class="md-form md-outline outline_b_c">
                          <input
                            value={profile_firstname}
                            type="text"
                            onChange={event =>
                              buyer_firstname(event.target.value)
                            }
                            id="email_id002a"
                            className="form-control buyer_popup_field"
                          />
                          <label
                            className="input_text_buyer"
                            for="email_id002a"
                          >
                            First Name
                          </label>
                        </div>

                        {buy_fname == true ? (
                          <div className="create_byer_form_err_buy">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter Firstname
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}

                        <div class="md-form md-outline outline_b_c">
                          <input
                            value={profile_lastname}
                            type="text"
                            onChange={event =>
                              buyer_lastname(event.target.value)
                            }
                            id="email_id002a"
                            className="form-control buyer_popup_field"
                          />
                          <label
                            className="input_text_buyer"
                            for="email_id002a"
                          >
                            Last Name
                          </label>
                        </div>

                        {buy_lname == true ? (
                          <div className="create_byer_form_err_buy">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter Lastname
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}

                        <div class="md-form md-outline outline_b_c">
                          <input
                            type="text"
                            id="email_id002a"
                            className="form-control buyer_popup_field"
                            value={profile_email}
                            onChange={event => buyer_email(event.target.value)}
                          />
                          <label
                            className="input_text_buyer"
                            for="email_id002a"
                          >
                            Email
                          </label>
                        </div>

                        {buy_email == true ? (
                          <div className="create_byer_form_err_buy123">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter valid Email!Ex:abc@example.com
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </Col>

                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={1}
                        className="head_set_col1"
                      ></Col>
                      <Col xs={12} sm={12} md={6} lg={3}>
                        <div class="md-form md-outline outline_b_c">
                          <input
                            type="text"
                            id="email_id002a"
                            className="form-control buyer_popup_field"
                            value={profile_company}
                            onChange={event =>
                              buyer_jobrole(event.target.value)
                            }
                          />
                          <label
                            className="input_text_buyer"
                            for="email_id002a"
                          >
                            Company
                          </label>
                        </div>

                        {buy_job == true ? (
                          <div className="create_byer_form_err_buy">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter Company
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}

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

                            <div class="md-form md-outline signin_phone signin_phone_buy signin_fname_border1">
                              <input
                                type="text"
                                id="email_id002a"
                                className="form-control buyer_popup_field"
                                value={profile_phone}
                                onChange={event =>
                                  check_phone(event.target.value)
                                }
                              />
                              <label className="signup_fname_label" for="ph_id">
                                Phone
                              </label>
                            </div>
                          </InputGroup>
                        </div>

                        {buy_ph == true ? (
                          <div className="create_byer_form_err_buy">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter Phone
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </Col>
                    </Row>
                  )}

                  {localStorage.getItem("createprofile") != 1 && (
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={2}>
                        <div className="">
                          <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={e => handleChangeFile(e.target.files[0])}
                          />{" "}
                          {photo1 && localStorage.getItem("operation") == 1 && (
                            <Image
                              style={{
                                width: "108%",
                                height: "8.5rem",
                                outline: "none",
                                border: "1px Solid #666",
                                marginLeft: "15%"
                              }}
                              src={
                                API_URL +
                                `/file/buyer/${cimgid}/200/200?t=${new Date().toTimeString()}`
                              }
                              roundedCircle
                            />
                          )}
                          {!photo1 && localStorage.getItem("operation") == 1 && (
                            <Image
                              style={{
                                width: "108%",
                                height: "8.5rem",
                                outline: "none",
                                border: "1px Solid #666",
                                marginLeft: "15%"
                              }}
                              src={
                                API_URL +
                                `/file/buyer/default/200/200?t=${new Date().toTimeString()}`
                              }
                              roundedCircle
                            />
                          )}
                          {localStorage.getItem("operation") == 0 && (
                            <Image
                              style={{
                                width: "109%",
                                height: "8.5rem",
                                outline: "none",
                                border: "1px Solid #666",
                                marginLeft: "15%"
                              }}
                              src={
                                API_URL +
                                `/file/buyer/${buyerid}/200/200?t=${new Date().toTimeString()}`
                              }
                              roundedCircle
                            />
                          )}
                          <label
                            className="edit_pic_upload_head123_set"
                            for="file"
                          >
                            <EditImage />
                          </label>
                        </div>

                        <p
                          style={{
                            backgroungColor: "#a0a0a0",
                            width: "13rem",
                            marginLeft: "1rem",
                            color: "#666",
                            marginBottom: "14px",
                            fontSize: "14px"
                          }}
                        >
                          <span style={{ color: "red" }}>Note: </span>Image
                          upload must be 400x400 dimensions
                        </p>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={1}></Col>

                      <Col xs={12} sm={12} md={6} lg={3}>
                        <div class="border112">
                          <h1>First Name</h1>
                          <input
                            type="text"
                            className="form-control buyer_popup_field"
                            // placeholder="Card Number"
                            value={profile_firstname}
                            id="email_id002a_12"
                            class="form-control"
                            onChange={event =>
                              buyer_firstname(event.target.value)
                            }
                          />
                        </div>
                        {buy_fname == true ? (
                          <div className="create_byer_form_err_buy">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter Firstname
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                        <div class="border112">
                          <h1>Last Name</h1>
                          <input
                            type="text"
                            className="form-control buyer_popup_field"
                            // placeholder="Card Number"

                            id="email_id002a_12"
                            class="form-control"
                            value={profile_lastname}
                            onChange={event =>
                              buyer_lastname(event.target.value)
                            }
                          />
                        </div>
                        {buy_lname == true ? (
                          <div className="create_byer_form_err_buy">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter Lastname
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                        <div class="border112">
                          <h1>Email</h1>
                          <input
                            type="text"
                            className="form-control buyer_popup_field"
                            // placeholder="Card Number"

                            id="email_id002a_12"
                            class="form-control"
                            value={profile_email}
                            onChange={event => buyer_email(event.target.value)}
                          />
                        </div>
                        {buy_email == true ? (
                          <div className="create_byer_form_err_buy123">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter valid Email!Ex:abc@example.com
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </Col>

                      <Col xs={12} sm={12} md={6} lg={1}></Col>

                      <Col xs={12} sm={12} md={6} lg={3}>
                        <div class="border112">
                          <h1>Company</h1>
                          <input
                            type="text"
                            className="form-control buyer_popup_field"
                            value={profile_company}
                            id="email_id002a_12"
                            class="form-control"
                            onChange={event =>
                              buyer_jobrole(event.target.value)
                            }
                          />
                        </div>

                        {buy_job == true ? (
                          <div className="create_byer_form_err_buy">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter Company
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}

                        <div className="forgot_cls_signup forgot_cls_signup_buy forgot_cls_signup_buy12">
                          <select
                            className="select_top_signup select_top_signup_buy12"
                            value={code}
                            onChange={event => {
                              setcode(event.target.value);
                            }}
                          >
                            {cca.length > 0 &&
                              cca.map((item, idx) => (
                                <option value={item.value}>{item.label}</option>
                              ))}
                          </select>
                          <div class="border112 border_contact_buy border_contact_buy_ex33">
                            <h1>Phone</h1>
                            <input
                              type="text"
                              className="form-control buyer_popup_field"
                              // placeholder="Card Number"
                              value={profile_phone}
                              id="email_id002a_12"
                              class="form-control"
                              onChange={event =>
                                check_phone(event.target.value)
                              }
                            />
                          </div>
                        </div>

                        {buy_ph == true ? (
                          <div className="create_byer_form_err_buy_x">
                            <p>
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Enter Phone
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </Col>
                    </Row>
                  )}
                </div>

                <div></div>
              </div>
              <div className="change_buttonclass">
                <button
                  onClick={() => {
                    if (localStorage.getItem("operation") == 1)
                      save_profile_details();
                    if (localStorage.getItem("operation") == 0)
                      edit_profile_buyer(id);
                  }}
                  to={"/buyers"}
                  id="change_button_id12_buy_edit"
                >
                  {" "}
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerContacts;
