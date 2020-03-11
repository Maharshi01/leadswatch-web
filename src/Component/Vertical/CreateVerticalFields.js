import React, { Component, useState, useEffect } from "react";
import { API_URL ,logoutidle} from '../../AppConfig'

import Modal from "react-modal";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Row, Col, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
// import Picker from 'react-picker'

import ToggleButton from "react-toggle-button";
import { Spinner } from "react-bootstrap";
import { optionalCallExpression, isReferenced } from "@babel/types";
import { IoIosClose, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import PaginationName from "../Pagination/Pagination";
import { FiPlusCircle } from "react-icons/fi";

const CreateVerticalFields = () => {
  let history = useHistory();
  var name = localStorage.getItem("name");
  var desc = localStorage.getItem("desc");
  var id = localStorage.getItem("id");
  ////console.log("vertical id", id);

  //states to store different modal values
  const [open, setOpen] = useState(false);
  const [editfieldopen, seteditfieldOpen] = useState(false);
  const [defaultfieldopen, setdefaultfieldOpen] = useState(false);

  //states to store details of vertical fields to be posted and edited
  const [fieldname, setfieldName] = useState("");
  const [fielddesc, setfieldDesc] = useState("");
  const [fielddatatype, setfieldType] = useState("default");
  const [fielddate, setfieldDate] = useState();
  const [fieldmandatory, setfieldMandatory] = useState(false);
  // vertical state stores the list of verticalfields
  const [verticalfields, setverticalFields] = useState([]);

  const[email_mandatory,setEmailMandatory]=useState();
  const[phone_mandatory,setPhoneMandatory]=useState();


  //state to store verticalfield_id
  const [verticalfield_id, setverticalfieldId] = useState();
  // state to store single verticalfield details
  const [verticalfielddetails, setverticalfieldDetails] = useState();

  // state stores the list of defaultfields
  const [defaultfieldslist, setdefaultfieldsList] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [listOpen, setListOpen] = useState(false);

  const [label_data, setLabel] = useState([]);
  const [dummy, setDummy] = useState();
  const [dummy_data, setDummyData] = useState();

  const [listData, setListData] = useState();
  const [parsedlistData, setParsedListData] = useState([]);
  const [afterparsedlistData, setAfterParsedListData] = useState([]);

  const [addfield, setAddField] = useState(false);
  const [createClick, setCreateClick] = useState([]);

  const [searchbarValue, setSearch] = useState("");
  const [prev, setPrev] = useState(null);
  const [num, setNum] = useState([0]);
  const [next, setNext] = useState(2);
  const [total, setTotal] = useState([0]);
  const [limit, setLimit] = useState([0]);

  const [deleteId, setDeleteId] = useState();
  const [delete_alert, setdelete_alert] = useState(false);

  const [success_alert, setsuccess_alert] = useState(false);
  const [message, setmessage] = useState("");

  const [toShowName, setToShowName] = useState(false);
  const [toShowDesc, setToShowDesc] = useState(false);
  const [toShowType, setToShowType] = useState(false);
  const [toShowDuplicate, setToShowDuplicate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [increatedefault, setInCreateDefault] = useState(false);
  const [verticalfieldid, setVerticalFieldId] = useState();

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);

  const deletemodal = id => {
    setdelete_alert(true);
    setDeleteId(id);
    // DeleteVertical(id);
  };

  const modalclose = () => {
    setsuccess_alert(false);
    setmessage("");
  };

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
      url: API_URL+`/vertical/fieldlist/${id}`,
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        if (response.data.data.list == undefined) {
          setverticalFields([]);
        } else {
          setverticalFields(response.data.data.list);
        }
        setTotal(response.data.data.total_count);
        setLimit(response.data.data.per_page);
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

  function pushable() {
    if (dummy === "") {
      alert("enter all values");
    } else {
      ////console.log("dummy_data", dummy_data);
      setParsedListData(parsedlistData.concat(dummy_data));
    }
    setDummyData([]);
    setDummy("");
  }

  // function to handle vertical name
  const label_fun = value => {
    setDummy(value);
    setDummyData([{ label: value }]);
  };

  ////console.log("label_data", label_data);
  function enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      //  ////console.log("Enter Pressed");
      getPublishersList(limit, 1);
    }
  }
  //styles for model
  const customStyles = {
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

  // function to handle verticaldfield_name
  const vertfield_name = value => {
    setfieldName(value);
  };
  // function to handle verticalfield_description
  const vertfield_desc = value => {
    setfieldDesc(value);
  };
  // function to handle verticalfield_dateformat
  const vertfield_date = value => {
    setfieldDate(value);
  };

  const openModal = () => {
    setOpen(true);
    setToShowDuplicate(false);
  };
  const closeModal = () => {
    setOpen(false);
    setToShowName(false);
    setToShowDesc(false);
    setToShowDuplicate(false);
  };

  // This function is called when edit button is cliked,to open model and get field details
  const geteditField = id => {
    ////console.log("VerticalFieldId", id);
    const config = {
      url: API_URL+`/vertical/fielddetail/${id}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + global.access_token
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log("VerticalFieldDetail", response);
        //Sending all details to states to edit
        setverticalfieldDetails(response.data.data);
        setfieldName(response.data.data.name);
        setfieldDesc(response.data.data.description);
        setfieldType(response.data.data.datatype);
        setfieldDate(response.data.data.dataformat);
        setfieldMandatory(response.data.data.mandatory);
        setInCreateDefault(response.data.data.default);
        setverticalfieldId(response.data.data.id);
        ////console.log("VerticalFieldID", response.data.data.id);
        openeditField();
      })
      // Error handling
      .catch(error => {
        ////console.log("VerticalFiledDetailError", error);
        // window.alert(error.response.data.error.message);
      });
  };

  //This Function is Called when update button is clicked to edit details and edited details will be saved to database
  const edit_verticalfield = field_id => {
    //console.log("sadacd",fieldname,fielddesc,fielddatatype)
    setToShowDuplicate(false);
    if (fieldname !== "" && fielddesc !== "" && fielddatatype !== "default") {
      const data = {
        vertical_id: id,
        name: fieldname,
        description: fielddesc,
        datatype: fielddatatype,
        list_data: [],
        dataformat: fielddate,
        mandatory: fieldmandatory,
        default: increatedefault == true ? 1 : 0,
        active: 1
      };

      const config = {
        url: API_URL+`/vertical/updatefield/${field_id}`,
        data: data,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      console.log("Inside Update of FieldID", data);
      axios(config)
        .then(response => {
          ////console.log("EditVerticalFieldResponse", response);
          if (response.status == 200) {
            setfieldName("");
            setfieldType("");
            setfieldDesc("");
            setfieldDate("");
            setfieldMandatory(false);
            setInCreateDefault(false);
            closeEditField(); //To close modal
            setmessage("Vertical field updated successfully!!");
            setsuccess_alert(true);
            myfunc();
            // alert("Vertical Field Edited Successfully!!!")
          }
        })
        .catch(error => {
          // alert(error.response.data.error.message)

          setToShowDesc(false);
          setToShowName(false);
          setToShowType(false);
          setToShowDuplicate(true);

          // Error Message
          ////console.log("ErrorInEditingvertical", error.response);
          ////console.log("Error", error);
        });
    } else {
      ////console.log();

      if (fieldname == "" && fielddesc == "" && fielddatatype == "default") {
        setToShowDesc(true);
        setToShowName(true);
        setToShowType(true);
      } else if (fieldname == "" && fielddesc == "") {
        setToShowName(true);
        setToShowDesc(true);
        setToShowType(false);
      } else if (fielddesc == "" && fielddatatype == "default") {
        setToShowDesc(true);
        setToShowName(false);
        setToShowType(true);
      } else if (fielddatatype == "default" && fieldname == "") {
        setToShowDesc(false);
        setToShowName(true);
        setToShowType(true);
      } else if (fieldname == "") {
        setToShowDesc(false);
        setToShowName(true);
        setToShowType(false);
      } else if (fielddesc == "") {
        setToShowDesc(true);
        setToShowName(false);
        setToShowType(false);
      } else if (fielddatatype == "default") {
        setToShowDesc(false);
        setToShowName(false);
        setToShowType(true);
      }
    }
  };

  //To open editfield_modal
  const openeditField = () => {
    seteditfieldOpen(true);
    setToShowDuplicate(false);
  };
  //To close editfield_modal
  const closeEditField = () => {
    seteditfieldOpen(false);
  };

  //To open defaultfield_modal
  const opendefaultfieldModal = () => {
    setdefaultfieldOpen(true);
  };

  const listItemClicked = item => {
    setListOpen(true);
    setListData(item);
    ////console.log("list_data before parsing", item.list_data);
    setParsedListData(JSON.parse(item.list_data));
    ////console.log("parsed ListData", parsedlistData);
    // setAfterParsedListData(parsedlistData);
    // ////console.log("after parsed ListData", afterparsedlistData);
  };

  const postlabeldata = listData => {
    ////console.log("listData in postlebleData", listData);
    ////console.log("listData id in postlebleData", listData.id);
    // if()
    const data = {
      vertical_id: id,
      name: listData.name,
      description: listData.description,
      datatype: listData.datatype,
      list_data: parsedlistData,
      dataformat: listData.dataformat,
      default: listData.default,
      mandatory: listData.mandatory,
      active: 1
    };
    ////console.log("fielddata when clicked update", data);
    const config = {
      url: API_URL+`/vertical/updatefield/${listData.id}`,
      data: data,
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log("Created VerticalField Response With Label", response);
        if (response.status == 200) {
          myfunc();
          setListOpen(false);
          // alert("Labels Added Successfully!!!")
          setmessage("Label created successfully");
          setsuccess_alert(true);
        }
      })
      .catch(error => {
        alert(error.response.data.error.message);
        // Error Message
        ////console.log("Errorinlabel_data", error.response.data.error.sqlMessage);
        ////console.log("Erro", error);
      });
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

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return i;
      }
    }

    return -1;
  }

  var cmai = [];
  const handleInputChange = item => {
    ////console.log("iside hajcnd", item);

    const a = containsObject(item, cmai);
    if (a != -1) {
      cmai.splice(a, 1);
    } else {
      cmai.push(item);
      ////console.log(cmai);
    }
  };
  //To close defaultfield_modal
  const closedefaultfieldModal = () => {
    setdefaultfieldOpen(false);
  };

  //function to get defaultfields details
  const choosedefaultfields = () => {
    const config = {
      url: API_URL+"/vertical/defaultfields",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        console.log("DefaultFieldsList", response.data.data);
        setdefaultfieldsList(response.data.data);
        opendefaultfieldModal();
      })
      // Error handling
      .catch(error => {
        ////console.log("DefaultFieldError", error);
        // window.alert(error.response.data.error.message);
      });
  };

  //function to delete vertical field
  const DeleteVerticalField = id => {
    ////console.log("Deleted  VerticaField Id", id);
    const config = {
      url: API_URL+`/vertical/deletefield/${id}`,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        // alert("Are You Sure You Want To Delete??")
        ////console.log("Inside Delete VerticalField---", response);
        setdelete_alert(false);
        myfunc();
      })
      .catch(error => {
        alert(error.response.data.error.message);
        // Error Message
        ////console.log(
        //   "ErrorinDeletingVertical",
        //   error.response.data.error.sqlMessage
        // );
        ////console.log("Erro", error);
      });
  };

  //this is function is used for re-rendering purpose,this gets the details of verticalfields
  const myfunc = () => {
    // const config = {
    //     url: API_URL+`/vertical/fieldlist/${id}`,
    //     method: 'get',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: "Bearer "+ localStorage.getItem("access_token")            }
    // };
    // axios(config)
    //     .then(response => {
    //         ////console.log("VerticalFieldsList in myfunc", response);
    //         setverticalFields(response.data.data);
    //         // ////console.log("InsideGet");
    //     })
    //     // Error handling
    //     .catch(error => {
    //         ////console.log("VerticalFieldslisterror1", error);
    //         // window.alert(error.response.data.error.message);
    //     });

    const data = {
      page: 1,
      limit: 10,
      search: "",
      sortby: { created: -1 }
    };
    const config = {
      url: API_URL+`/vertical/fieldlist/${id}`,
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
        if (response.data.data.list == undefined) {
          setverticalFields([]);
        } else {
          setverticalFields(response.data.data.list);
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
        ////console.log("VerticalFieldslisterror", error);
        // window.alert(error.response.data.error.message);
      });
  };
  //This function is called when default fields are aplied
  const apply = () => {
    let posted = [];
    for (let i = 0; i < cmai.length; i++) {
      let a = {};
      a.vertical_id = id;
      a.name = cmai[i].name;
      a.description = cmai[i].description;
      a.datatype = cmai[i].datatype;
      a.list_data = JSON.parse(cmai[i].list_data);
      a.dataformat = cmai[i].dataformat;
      a.mandatory = cmai[i].mandatory;
      a.default = 0;
      console.log("a", a);
      posted.push(a);
    }
    ////console.log("posted", posted);

    const data = {
      vertical_fields: posted
    };
    ////console.log("Posting Data", data);
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
        console.log("Posted Default List ", response);
        closedefaultfieldModal();
        setmessage("Default fields added successfully");
        setsuccess_alert(true);
        myfunc();
        // alert("Default Fields Added Successfully!!!")
      })
      // Error handling
      .catch(error => {
        console.log("red", error.response);
        alert(error.response.data.error[0]);
        ////console.log("PostingDefaultFieldslisterror1", error);
        // window.alert(error.response.data.error.message);
      });
  };
  //useeffect to get verticalfield details
  useEffect(() => {
    // const config = {
    //     url: API_URL+`/vertical/fieldlist/${id}`,
    //     method: 'get',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: "Bearer "+ localStorage.getItem("access_token")             }
    // };
    // axios(config)
    //     .then(response => {
    //         ////console.log("VerticalFieldsList", response);
    //         setverticalFields(response.data.data);
    //         // ////console.log("InsideGet");
    //     })
    //     // Error handling
    //     .catch(error => {
    //         ////console.log("VerticalFieldslisterror1", error);
    //         // window.alert(error.response.data.error.message);
    //     });
    if (localStorage.getItem("role") == 4)
      var currentModule = JSON.parse(
        localStorage.getItem("permissions")
      ).filter(item => {
        return item.module_id == 6;
      });
    setPermissions(currentModule ? currentModule[0] : {});
    const data = {
      page: 1,
      limit: 1000,
      search: "",
      sortby: {
        created: -1
      }
    };
    const config = {
      url: API_URL+`/vertical/fieldlist/${id}`,
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
        if(response.data.data.list== undefined)
        {
          setverticalFields([]);
        }
        else{

          for(let i=0;i<response.data.data.list.length;i++){
            if(response.data.data.list[i].name=='email'){
          console.log("In email");
              setEmailMandatory(response.data.data.list[i].mandatory==1?true:false);
            }
            if(response.data.data.list[i].name=='phone'){
              console.log("In Phone");

              setPhoneMandatory(response.data.data.list[i].mandatory?true:false);
            }

          }
          setverticalFields(response.data.data.list);
        }
        setTotal(response.data.data.total_count);
        setPrev(response.data.data.prev_page);
        setNext(response.data.data.next_page);
        setToShowName(false);
        setToShowDesc(false);
        setToShowType(false);
        setToShowDuplicate(false);
        setCurrentPage(response.data.data.page);
        setFetching(false);
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
        ////console.log("VerticalFieldslisterror", error);
        // window.alert(error.response.data.error.message);
      });
  }, []);

  // function to post vertical details to database on Creating new vertical
  function AddField() {
    // //console.log("sadacd",fieldname,fielddesc,fielddatatype)
    setToShowDuplicate(false);
    if (fieldname !== "" && fielddesc !== "" && fielddatatype !== "default") {
      const data = {
        vertical_fields: [
          {
            vertical_id: id,
            name: fieldname,
            description: fielddesc,
            datatype: fielddatatype,
            list_data: [],
            dataformat: fielddate,
            mandatory: fieldmandatory == true ? 1 : 0,
            default: increatedefault == true ? 1 : 0
          }
        ]
      };
      console.log("fielddata", data);
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
          console.log("Created VerticalField Response", response);
          if (response.status == 200) {
            closeModal(); // to close Modal on Clicking
            setVerticalFieldId(response.data.data.insertId);
            setfieldName("");
            setfieldType("");
            setfieldDesc("");
            setfieldDate("");
            setfieldMandatory(false);
            setInCreateDefault(false);
            setmessage("Vertical field created successfully");
            setsuccess_alert(true);
            myfunc();
            // alert("Vertical Field Created Successfully!!")
          }
        })
        .catch(error => {
          // //console.log("kjbsdviysfv")
          ////console.log(error.response);
          // alert("error :" + error.response.data.error.message);

          setToShowDesc(false);
          setToShowName(false);
          setToShowType(false);
          setToShowDuplicate(true);

          // alert(error.response.data.error.message)
          // Error Message
          // ////console.log("ErrorinCreatingVerticalField", error.response.data.error.sqlMessage);
          ////console.log("Erro", error.response);
        });
    } else {
      ////console.log();

      if (fieldname == "" && fielddesc == "" && fielddatatype == "default") {
        setToShowDesc(true);
        setToShowName(true);
        setToShowType(true);
      } else if (fieldname == "" && fielddesc == "") {
        setToShowName(true);
        setToShowDesc(true);
        setToShowType(false);
      } else if (fielddesc == "" && fielddatatype == "default") {
        setToShowDesc(true);
        setToShowName(false);
        setToShowType(true);
      } else if (fielddatatype == "default" && fieldname == "") {
        setToShowDesc(false);
        setToShowName(true);
        setToShowType(true);
      } else if (fieldname == "") {
        setToShowDesc(false);
        setToShowName(true);
        setToShowType(false);
      } else if (fielddesc == "") {
        setToShowDesc(true);
        setToShowName(false);
        setToShowType(false);
      } else if (fielddatatype == "default") {
        setToShowDesc(false);
        setToShowName(false);
        setToShowType(true);
      }
    }
  }
  function UpdateEPField(field_id,name,description,datatype,mandatory) {
    // console.log("Update",field_id,name,description,datatype,mandatory);
    const data = {
          vertical_id: id,
          name:name,
          description: description,
          datatype: datatype,
          list_data:[],
          dataformat: "",
          mandatory:mandatory== true ? 1 : 0 ,
          default: 0  ,
          active:1
    };
    // //console.log("fielddata", data)
    const config = {
      url: API_URL+`/vertical/updatefield/${field_id}`,
     
      data: data,
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        if (response.status == 200) {
          // console.log("In email and phone");
          myfunc();
          // alert("Vertical Created Successfully!!")
        }
      })
      .catch(error => {
      });
  }

  return (
    <div className="body_bg">
      <div className="body_inner">
        <div>
          {/* Table display starts here */}
          <div
            onClick={() => {
              history.goBack();
            }}
            className="back_buy_contact"
          >
            <IoIosArrowBack />
          </div>
          <div className="buyer_table_heading">
            <p>{name}</p>
            <div className="add_icon_vert">
              {localStorage.getItem("role") == 2 ? (
                <FiPlusCircle
                  onClick={() => {
                    openModal();
                  }}
                />
              ) : !permissions && permissions.actions.includes(2) ? (
                <FiPlusCircle
                  onClick={() => {
                    openModal();
                  }}
                />
              ) : (
                <OverlayTrigger
                  overlay={
                    <Tooltip>Read only mode, changes not allowed!</Tooltip>
                  }
                >
                  <FiPlusCircle />
                </OverlayTrigger>
              )}
            </div>
          </div>
          <div className="body_inner_section">
            <div>
              <Row>
                <div className="vertical_header_top_div">
                  <div className="showEntriesDiv showEntries_txtmrgn">
                    <label className="showEntriesLabel ">
                      <div className="showEntriesLabelDiv_cre_ver">
                        {" "}
                        <p>Show Entries</p>
                      </div>
                      <div className="showEntriesSelDiv">
                        <select onChange={event => entries(event.target.value)}>
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

                  {/* <div className="vertical_header_top_div01 vertical_header_top_names">
                  <div className="vert_name_feild1">
                    
                      <div className="vertical_fildcs">
                        <label className="vertical_name_wdth">
                          <span className="vertical_namecs">
                            {" "}
                            Name:
                          </span>
                          <span className="vertical_inputcs">
                            <input
                              type="text"
                              value={name}
                              className="vert_input12 vert_input12385"
                            />
                          </span>
                        </label>
                      </div>
                  </div>

                  <div className="vertical_header_top_div02">
                  <div className="vert_name_feild2 vert_name_felddess">
                      <label className="vertical_name_wdth">
                        <span className="vertical_namecs"> Description:</span>
                        <span className="vertical_inputcs">
                          {" "}
                          <input
                            type="text"
                            value={desc}
                            className="vert_input12"
                          />
                        </span>
                      </label>
                  </div>
                </div>
                </div> */}

                  {/* </div> */}

                  <div className="vertical_header_top_div03">
                    <div className="vertical_header_btn_div">
                      {/* <div className="createVert_btn_div createVert_btn_div_margin">
                    {localStorage.getItem("role")==2?
                    <button
                      className="add_New_feild1 add_New_feild_align"
                      onClick={() => {
                        openModal();
                      }}
                    >
                      Add New Field
                    </button>
                    :
                    (!permissions && permissions.actions.includes(2))?
                    <button
                    className="add_New_feild1 add_New_feild_align"
                    onClick={() => {
                      openModal();
                    }}
                  >
                    Add New Field
                  </button>
                  :
                  <OverlayTrigger
                overlay={
                  <Tooltip>
                    Read only mode, changes not allowed!
                  </Tooltip>
                }>
                  <button
                  className="add_New_feild1 add_New_feild_align"
                  
                >
                  Add New Field
                </button>
                </OverlayTrigger>
                    }
                  </div> */}

                      <div className="createVert_btn_div1">
                        {localStorage.getItem("role") == 2 ? (
                          <button
                            className="add_New_feild add_New_feild_align"
                            onClick={() => {
                              choosedefaultfields();
                            }}
                          >
                            Choose From
                          </button>
                        ) : !permissions && permissions.actions.includes(3) ? (
                          <button
                            className="add_New_feild add_New_feild_align"
                            onClick={() => {
                              choosedefaultfields();
                            }}
                          >
                            Choose From
                          </button>
                        ) : (
                          <OverlayTrigger
                            overlay={
                              <Tooltip>
                                Read only mode, changes not allowed!
                              </Tooltip>
                            }
                          >
                            <button className="add_New_feild add_New_feild_align">
                              Choose From
                            </button>
                          </OverlayTrigger>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="vertical_header_top_div04">
                    <div className="buyer_search_div124">
                      <input
                        className="search_buyer_input_create"
                        placeholder="Search"
                        value={searchbarValue}
                        type="text"
                        onChange={e => {
                          setSearch(e.target.value);
                        }}
                        onKeyPress={enterPressed.bind(this)}
                        value={searchbarValue}
                      />
                      <div
                        onClick={event => {
                          getPublishersList(limit, 1);

                         
                        }}
                        className="search_vert_icon12"
                      >
                        <IoIosArrowForward />
                      </div>
                    </div>
                  </div> */}

                  <div className="butt_create_buyers003">
                    <div className="searchbarValue_Div_leads">
                      <input
                        className="searchbarValue_fieldleads"
                        placeholder="Search"
                        onChange={e => {
                          setSearch(e.target.value);
                        }}
                        onKeyPress={enterPressed.bind(this)}
                        value={searchbarValue}
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
              </Row>
            </div>
            {/* Table display starts here */}
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
                        setB(0);
                        setC(0);
                        if (a == 1) {
                          getPublishersList(limit, 1, "name", -1);
                          setA(2);
                        } else {
                          setA(1);
                          getPublishersList(limit, 1, "name", 1);
                        }
                      }}
                    >
                      Field Name
                      <a className="a_class">
                        <svg
                          className="svg_up"
                          onClick={event => {
                            getPublishersList(limit, 1, "name", "1");
                            //getSortedSearched("id","-1",limit,1);
                          }}
                          id="Group_2411_vert_view"
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
                          id="Group_2411_vert_view"
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
                        setC(0);
                        if (b == 1) {
                          getPublishersList(limit, 1, "datatype", -1);
                          setB(2);
                        } else {
                          setB(1);
                          getPublishersList(limit, 1, "datatype", 1);
                        }
                      }}
                    >
                      Data Type
                      <a className="a_class">
                        <svg
                          className="svg_up"
                          onClick={event => {
                            getPublishersList(limit, 1, "datatype", "1");
                            //getSortedSearched("id","-1",limit,1);
                          }}
                          id="Group_2411_vert_view"
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
                            getPublishersList(limit, 1, "datatype", "-1");
                            //getSortedSearched("id","1",limit,1);
                          }}
                          id="Group_2411_vert_view"
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
                    <th
                      class="th-sm"
                      onClick={() => {
                        setA(0);
                        setB(0);
                        if (c == 1) {
                          getPublishersList(limit, 1, "mandatory", -1);
                          setC(2);
                        } else {
                          setC(1);
                          getPublishersList(limit, 1, "mandatory", 1);
                        }
                      }}
                    >
                      Required
                      <a className="a_class">
                        <svg
                          className="svg_up"
                          onClick={event => {
                            getPublishersList(limit, 1, "mandatory", "1");
                            //getSortedSearched("id","-1",limit,1);
                          }}
                          id="Group_2411_vert_view"
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
                            getPublishersList(limit, 1, "mandatory", "-1");
                            //getSortedSearched("id","1",limit,1);
                          }}
                          id="Group_2411_vert_view"
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
                    <th class="th-sm details_lead">Action</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {!fetching &&
                    verticalfields.length > 0 &&
                    verticalfields.map(item => (
                      <tr>
                        <td className="vert_txtalign text-center">
                          {item.name}
                        </td>
                        {item.datatype == "list" ? (
                          <td>
                            <h6
                              className="View_Vertical_Details1"
                              onClick={() => {
                                listItemClicked(item);
                              }}
                            >
                              {item.datatype}
                            </h6>
                          </td>
                        ) : (
                          <td>{item.datatype}</td>
                        )}

                        <td>{item.mandatory ? "Yes" : "No"}</td>
                        {item.name == "email" || item.name == "phone" ? (
                          <td>
 <div   className="tog_f_v">
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
                 value={item.name=="email"?email_mandatory:phone_mandatory}
                    onToggle={() => {
                      if(email_mandatory==true){
                   
                      if(item.name=="phone"){
                    setPhoneMandatory(!phone_mandatory);
                    var mandate=!phone_mandatory;
                    // console.log("phone",mandate)  
                        UpdateEPField(item.id,item.name,item.description,item.datatype,mandate);          
 
                      }
                      if(phone_mandatory==false){
 
                        if(item.name=="email"){
                          alert("Both can't be optional!!");            
                        }
                                              }
                                           
                     
                      }
                      if(phone_mandatory==true){
                     
                   
                        if(item.name=="email"){
                       setEmailMandatory(!email_mandatory);  
                       var mandate=!email_mandatory;
                      //  console.log("email",mandate)
                          UpdateEPField(item.id,item.name,item.description,item.datatype,mandate);          
                      }      
                      if(email_mandatory==false){
 
                        if(item.name=="phone"){
                          alert("Both can't be optional!!");                        
 
                        }
                       
 
                      }
                     
                             
                      }        
                             
                    }}
                  />
                  </div>
                          </td>
                        ) : (
                          <td>
                            {localStorage.getItem("role") == 2 ? (
                              <Link
                                onClick={() => {
                                  geteditField(item.id);
                                }}
                              >
                                <svg
                                  className="vertical_action_svg"
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
                            ) : !permissions &&
                              permissions.actions.includes(3) ? (
                              <Link
                                onClick={() => {
                                  geteditField(item.id);
                                }}
                              >
                                <svg
                                  className="vertical_action_svg"
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
                                    className="vertical_action_svg"
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
                                onClick={() => {
                                  deletemodal(item.id);
                                }}
                              >
                                <svg
                                  className="vertical_action_svg1"
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
                            ) : !permissions &&
                              permissions.actions.includes(4) ? (
                              <Link
                                onClick={() => {
                                  deletemodal(item.id);
                                }}
                              >
                                <svg
                                  className="vertical_action_svg1"
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
                              <Link>
                                <svg
                                  className="vertical_action_svg1"
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
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
          {/* Table display ends here */}
          {/* Pagination */}
          <div>
            <PaginationName
              prev={prev}
              next={next}
              getPublishersList={getPublishersList}
              num={num}
              total={total}
              limit={limit}
              currentPage={currentPage}
            />
          </div>

          <Modal
            isOpen={listOpen}
            style={customStyles}
            contentLabel="List Modal"
          >
            <div
              className="close_img_div"
              onClick={() => {
                setListOpen(false);
              }}
            >
              <IoIosClose />
            </div>
            {/* <button className="closeBtn" onClick={() => {
                            setListOpen(false)
                        }}>X</button> */}

            <div></div>
            <div>
              <table
                id="dtBasicExample"
                class="table table-striped table-sm table_div_vert"
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
                    <th class="th-sm">Label</th>
                    <th class="th-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedlistData == "" ? (
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  ) : (
                    parsedlistData.map((item, index) => (
                      <tr>
                        <td>{item.label}</td>
                        <td>
                          <Link
                            onClick={() => {
                              const newlistData = parsedlistData.filter(
                                (item, idx) => idx !== index
                              );
                              setParsedListData(newlistData);
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
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {addfield && (
                <div className="vert_r_dis">
                  <div class="md-form md-outline add_vetical_feld_btm">
                    <input
                      id="add_vert_name12_edit"
                      class="form-control"
                      type="text"
                      name="name"
                      onChange={event => label_fun(event.target.value)}
                    />
                    <label for="add_vert_name">Label Name</label>
                  </div>
                  <button
                    className="verticalAddlabel_create_btn"
                    onClick={() => {
                      // postlabeldata(listData)
                      pushable();
                      setAddField(false);
                    }}
                  >
                    Create
                  </button>
                </div>
              )}
              <div className="verticalListUpdateBtn_div">
                <button
                  className="verticalListUpdateBtn"
                  onClick={() => {
                    postlabeldata(listData);
                  }}
                >
                  Update
                </button>
                <button
                  className="verticalAddField"
                  onClick={() => {
                    setAddField(true);
                  }}
                >
                  + AddField
                </button>
              </div>
            </div>
          </Modal>
          {/* Modal to Create Vertical */}
          <Modal
            isOpen={open}
            className="vertcreate_feild_modal"
            contentLabel="Example Modal"
            onRequestClose={closeModal}
          >
            <div
              className="buyer_close_div4 buyer_close_addvertcl buyer_close_aadvertcl34"
              onClick={() => {
                setfieldMandatory(false);
                setInCreateDefault(false);
                closeModal();
              }}
            >
              <IoIosClose />
            </div>
            <div className="popup_heading_vert123">
              <p>Add Vertical Field</p>
            </div>
            {/* <button className="closeBtn" onClick={() => {
                            setfieldMandatory(false)
                            closeModal()
                        }}>X</button> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10
              }}
            >
              <div className="popup_modal_box01">
                <div class="md-form md-outline add_vetical_feld_btm">
                  <input
                    id="add_vert_name12"
                    class="form-control"
                    type="text"
                    name="name"
                    onChange={event => vertfield_name(event.target.value)}
                  />
                  <label for="add_vert_name">Name</label>
                </div>
                {toShowName && (
                  <div className="var_name_err_name">
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
                {/* {toShowName && <label className="vertical_alert_addvc">Name Must be filled</label>} */}
                <div class="md-form md-outline add_vetical_feld_btm">
                  <textarea
                    id="add_vert_description12"
                    class="form-control"
                    name="description"
                    onChange={event => vertfield_desc(event.target.value)}
                  />
                  {/* <input
                    id="add_vert_description" 
                    class="form-control"
                    type="text"
                    name="description"
                    onChange={event => vertfield_desc(event.target.value)}
                  /> */}
                  <label for="add_vert_description">Description</label>
                </div>
                {toShowDesc && (
                  <div className="var_name_err_des12">
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

                <div class="">
                  <select
                    className="verticalSelect_field verticalSelect_field123"
                    onChange={event => setfieldType(event.target.value)}
                  >
                    <option selected value="default">
                      Data Type
                    </option>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="list">List</option>
                  </select>
                </div>
                {toShowDesc && (
                  <div className="var_name_err_data">
                    <p>
                      <span>
                        {" "}
                        <i
                          class="fa fa-exclamation-circle circle_err"
                          aria-hidden="true"
                        ></i>
                      </span>
                      DataType Must Be Selected
                    </p>
                  </div>
                )}

                {/* <div class="md-form md-outline">
                  <input
                    id="add_vert_dateformat"
                    class="form-control"
                    type="text"
                    name="dateformat"
                    onChange={event => vertfield_date(event.target.value)}
                  />
                  <label for="add_vert_dateformat">Data Format</label>
                </div> */}

                <div className="verticalMandatory">
                  <label>Required:</label>
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
                    value={fieldmandatory}
                    onToggle={() => {
                      setfieldMandatory(!fieldmandatory);
                    }}
                  />
                </div>
                <div className="verticalMandatory12">
                  {/* in create */}
                  <label>Default:</label>
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
                    value={increatedefault}
                    onToggle={() => {
                      setInCreateDefault(!increatedefault);
                    }}
                  />
                </div>
                {toShowDuplicate && (
                  <label>
                    Default VerticalField With That Name Already Exists!!
                  </label>
                )}

                <button
                  className="verticaldetails_add_vert_btn"
                  onClick={() => {
                    AddField();
                  }}
                  to={"/CreateVerticalFields"}
                >
                  Create Vertical Field
                </button>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={editfieldopen}
            className="createvertical_edit_modal"
            contentLabel="Example Modal"
            onRequestClose={closeEditField}
          >
            <div
              className="buyer_close_div_route"
              onClick={() => {
                setfieldMandatory(false);
                setInCreateDefault(false);
                closeEditField();
              }}
            >
              <IoIosClose />
            </div>
            <div className="popup_heading_contact123">
              <p>Edit Vertical Field</p>
            </div>
            {/* <button className="closeBtn" onClick={() => closeEditField()}>X</button> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingTop: 10
              }}
            >
              <div className="popup_modal_box01">
                {/* <div class="md-form md-outline ">
  <input type="text" id="vert_feild_name" class="form-control"   value={fieldname}
                        onChange={event => vertfield_name(event.target.value)}/>
  <label className="input_text_buyer" for="form1">FieldName</label>
</div> */}

                <div class="border215 border215_vert border215 border215_vert_vert   ">
                  <h1>Field Name</h1>
                  <input
                    type="text"
                    id="vert_feild_name"
                    name="firstname"
                    placeholder="Field Name"
                    value={fieldname}
                    class="form-control"
                    onChange={event => vertfield_name(event.target.value)}
                  />
                </div>
                {toShowName && (
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

                {/* <div className="verticalName">
                  {/* <label>
                    VerticalFieldName: <br /> */}
                {/* <div className="vert_input_border">
                      <input
                        placeholder="Enter the vertical field name"
                        type="text"
                        name="name"
                        className="vert_input"
                        value={fieldname}
                        onChange={event => vertfield_name(event.target.value)}
                      />
                    </div> */}
                {/* </label>
                </div> */}

                {/* <div className="verticalDescription">
                  <label>
                    VerticalField Description: <br />
                   
                    <textarea
                      placeholder="Description"
                      name="description"
                      className="vert_input"
                      value={fielddesc}
                      onChange={event => vertfield_desc(event.target.value)}
                    ></textarea>
                  </label>
                </div> */}

                <div class="border215 border215_vert   ">
                  <h1>Description</h1>
                  <textarea
                    placeholder="Description"
                    name="description"
                    className="vert_input"
                    value={fielddesc}
                    onChange={event => vertfield_desc(event.target.value)}
                  ></textarea>
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

              

                <div class="border215 border215_vert   ">
                  <h1>Vertical Data Type</h1>
                  <select
                    className="verticalSelect_field"
                    value={fielddatatype}
                    onChange={event => setfieldType(event.target.value)}
                  >
                    <option value="default">Select Any Value....</option>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="list">List</option>
                  </select>
                </div>
                {toShowType && (
                  <div className="var_name_err">
                    <p>
                      <span>
                        {" "}
                        <i
                          class="fa fa-exclamation-circle circle_err"
                          aria-hidden="true"
                        ></i>
                      </span>
                      DataType Must be filled
                    </p>
                  </div>
                )}

                {/* <div className="VerticalDate">
                  <label>
                    Vertical Date: <br />
                    <input
                      className="vert_input"
                      type="text"
                      name="description"
                      placeholder="YYYY/MM/DD"
                      value={fielddate}
                      onChange={event => vertfield_date(event.target.value)}
                    />
                  </label>
                </div> */}

                {/* <div class="border215 border215_vert   ">
                  <h1>Field Name</h1>
                  <input
                    className="vert_input"
                    type="text"
                    name="description"
                    placeholder="YYYY/MM/DD"
                    value={fielddate}
                    onChange={event => vertfield_date(event.target.value)}
                  />
                </div> */}

                <div className="verticalMandatory">
                  <label>Required:</label>

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
                    value={fieldmandatory}
                    onToggle={() => {
                      setfieldMandatory(!fieldmandatory);
                    }}
                  />
                </div>
                {/* inedit */}
                <div className="verticalMandatory">
                  <label>Default:</label>
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
                    value={increatedefault}
                    onToggle={() => {
                      setInCreateDefault(!increatedefault);
                    }}
                  />
                </div>
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

                <button
                  className="verticaldetails_update_btn"
                  onClick={() => {
                    edit_verticalfield(verticalfield_id);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={defaultfieldopen}
            className="vert_div_modal1"
            contentLabel="Example Modal"
          >
            <div
              className="buyer_close_div_vert"
              onClick={() => closedefaultfieldModal()}
            >
              <IoIosClose />
            </div>
            <div className="popup_heading_vert3">
              <p>Default Vertical Fields</p>
            </div>
            <div className="scroll_vert">
              {/* <button className="vertical_chooseFormBtn" onClick={() => closedefaultfieldModal()}>X</button> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "2rem",
                  paddingRight: "2rem"
                }}
              >
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
                      <th class="th-sm Crt_vertical_align"></th>
                      <th
                        class="th-sm Crt_vertical_name_align"
                        id="vert_feild"
                        onClick={() => {
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
                        Name
                        <a className="a_class">
                          <svg
                            className="svg_up"
                            onClick={event => {
                              getPublishersList(limit, 1, "name", "1");
                              //getSortedSearched("id","-1",limit,1);
                            }}
                            id="Group_2411_vert_view"
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
                            id="Group_2411_vert_view"
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
                        id="vert_align"
                        onClick={() => {
                          setA(0);
                          setC(0);
                          setD(0);
                          if (b == 1) {
                            getPublishersList(limit, 1, "description", -1);
                            setB(2);
                          } else {
                            setB(1);
                            getPublishersList(limit, 1, "description", 1);
                          }
                        }}
                      >
                        Description
                        <a className="a_class">
                          <svg
                            className="svg_up"
                            onClick={event => {
                              getPublishersList(limit, 1, "description", "1");
                              //getSortedSearched("id","-1",limit,1);
                            }}
                            id="Group_2411_vert_view"
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
                              getPublishersList(limit, 1, "description", "-1");
                              //getSortedSearched("id","1",limit,1);
                            }}
                            id="Group_2411_vert_view"
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
                      <th
                        class="th-sm"
                        id="vert_align1"
                        onClick={() => {
                          setA(0);
                          setB(0);
                          setD(0);
                          if (c == 1) {
                            getPublishersList(limit, 1, "datatype", -1);
                            setC(2);
                          } else {
                            setC(1);
                            getPublishersList(limit, 1, "datatype", 1);
                          }
                        }}
                      >
                        DataType
                        <a className="a_class">
                          <svg
                            className="svg_up"
                            onClick={event => {
                              getPublishersList(limit, 1, "datatype", "1");
                              //getSortedSearched("id","-1",limit,1);
                            }}
                            id="Group_2411_vert_view"
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
                              getPublishersList(limit, 1, "datatype", "-1");
                              //getSortedSearched("id","1",limit,1);
                            }}
                            id="Group_2411_vert_view"
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
                        id="vert_align2"
                        onClick={() => {
                          setA(0);
                          setB(0);
                          setC(0);
                          if (d == 1) {
                            getPublishersList(limit, 1, "mandatory", -1);
                            setD(2);
                          } else {
                            setD(1);
                            getPublishersList(limit, 1, "mandatory", 1);
                          }
                        }}
                      >
                        Required
                        <a className="a_class">
                          <svg
                            className="svg_up"
                            onClick={event => {
                              getPublishersList(limit, 1, "mandatory", "1");
                              //getSortedSearched("id","-1",limit,1);
                            }}
                            id="Group_2411_vert_view"
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
                              getPublishersList(limit, 1, "mandatory", "-1");
                              //getSortedSearched("id","1",limit,1);
                            }}
                            id="Group_2411_vert_view"
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
                    </tr>
                  </thead>
                  <tbody>
                    {defaultfieldslist.map(item => (
                      <tr>
                        <td>
                          <input
                            type="checkbox"
                            style={{ fonSize: "2px" }}
                            onChange={() => handleInputChange(item)}
                          />
                        </td>
                        <td className="Crt_vertical_name_align">{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.datatype}</td>
                        <td>{item.mandatory ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  class="verticaldetails_apply_btn"
                  onClick={() => {
                    // edit_vertical(vertical_id);
                    apply();
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </Modal>

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
              onClick={() => DeleteVerticalField(deleteId)}
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

          {/* //Delete Modal */}
          {/* <Modal
                isOpen={delete_alert}
                className="success_modal"
                contentLabel=" Invite Modal"
                
              >
                <div className="alert_text">
                  Are You Sure You Want to Delete This??
                  </div>
                <div className="alert_msg" onClick={() => DeleteVerticalField(deleteId)}>
                  <button>OK</button>
                  
                </div>
                <div className="alert_msg" onClick={() =>  setdelete_alert(false)}>
                  <button>Cancel</button>
                  
                </div>
                
              </Modal> */}
        </div>
      </div>
    </div>
  );
};
export default CreateVerticalFields;
