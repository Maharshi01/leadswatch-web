import React, { useState, useEffect } from "react";
import { API_URL ,logoutidle} from '../../AppConfig'

import { BrowserRouter, Route } from "react-router-dom";
// import { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import ChangePass from "./ChangePass.component";

import Modal from "react-modal";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
import InvitePublisher from "../Publisher/InvitePublisher.component";
const ProfileDetails = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };
  const [editopen, setEditOpen] = useState(false);
  // States to store Buyer details
  const [firstname, setFirstName] = useState();
  const [middlename, setMiddleName] = useState();
  const [formValues, setFormValues] = useState(["", "", "", "", "", ""]);
  const [lastname, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [company, setCompany] = useState();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [addPublisher, setAddPublisher] = useState(false);
  const handleForm = evt => {
    if (evt.target.id === "FirstName2") {
      let array1 = [...formValues];
      array1[0] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1)
    }
    if (evt.target.id === "MiddleName2") {
      let array1 = [...formValues];
      array1[1] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1)
    }
    if (evt.target.id === "LastName2") {
      let array1 = [...formValues];
      array1[2] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1)
    }
    if (evt.target.id === "Email2") {
      let array1 = [...formValues];
      array1[3] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1)
    }
    if (evt.target.id === "Company2") {
      let array1 = [...formValues];
      array1[4] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1)
    }
    if (evt.target.id === "PhoneNumber2") {
      let array1 = [...formValues];
      array1[5] = evt.target.value;
      setFormValues(array1);
      ////console.log(array1)
    }
  };

  const Signup = evt => {
    const data = {
      firstname: formValues[0],
      middlename: formValues[1],
      lastname: formValues[2],
      email: formValues[3],
      phone: formValues[5],
      company: formValues[4]
    };
    ////console.log("data", data);
    const config = {
      url: API_URL+"/publisher/create",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log(response);

        ////console.log("success");
        let fakeFormValues = [...formValues];
        for (let i = 0; i < fakeFormValues.length; i++) {
          fakeFormValues[i] = "";
        }
        setFormValues(fakeFormValues);
      })
      .catch(error => {
        ////console.log(error);
        ////console.log(error.response,"response");
        ////console.log(error.response.data.error.message);
        ////console.log("Error adding publisher");
      });
  };
  useEffect(() => {
    const config = {
      url: API_URL+`/user/9`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };

    axios(config)
      .then(response => {
        ////console.log("response", response);
        if (response && response.data.data) {
          if (response.data.status_code == 200) {
            // setSuccess(true);
            ////console.log(response.data);
          }
          setFirstName(response.data.data.firstname);
          setMiddleName(response.data.data.middlename);
          setLastName(response.data.data.lastname);
          setCompany(response.data.data.company);
          setPhone(response.data.data.phone);
          setEmail(response.data.data.email);
        }

        ////console.log("response of publisher", response);
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        ////console.log(error);
      });
  }, []);
  const buyer_firstname = value => {
    setFirstName(value);
  };

  const buyer_middlename = value => {
    setMiddleName(value);
  };
  // function to handle lastname
  const buyer_lastname = value => {
    setLastName(value);
  };
  // function to handle Email
  const buyer_email = value => {
    setEmail(value);
  };
  // function to handle Company
  const buyer_company = value => {
    setCompany(value);
  };
  // function to handle buyer Phone
  const buyer_contact = value => {
    setPhone(value);
  };
  //Function to post updated details to Database
  function update() {
    if (firstname && lastname && phone && email && company) {
      const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        company: company,
        middlename: middlename,
        active: 1
      };
      const config = {
        url: API_URL+`/user/update/9`,

        data: data,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          closeEditModal();

          // showToast()
        })
        .catch(error => {
          // if (error.message == "Network Error") {
          //   Alert.alert(
          //     "Network Error",
          //     "Please try again after some time",
          //     [
          //       {
          //         text: "Ok",
          //         onPress: () => ////console.log("Network problem")
          //       }
          //     ],
          //     { cancelable: false }
          //   );
          // }
          // ////console.log(error.response);
          // Alert.alert(
          //   "error",
          //   error.response.data.error.message,
          //   [
          //     {
          //       text: "Ok",
          //       onPress: () => ////console.log("enter valid details")
          //     }
          //   ],
          //   { cancelable: false }
          // );
          // ////console.log(error.response);
        });
    } else {
      // Alert.alert(
      //   "one or more fields are empty",
      //   "fill all details",
      //   [
      //     {
      //       text: "Ok",
      //       onPress: () => ////console.log("enter valid details")
      //     }
      //   ],
      //   { cancelable: false }
      // );
    }
  }
  //To close edit modal
  const closeEditModal = () => {
    setEditOpen(false);
  };
  return (
    <div>
      <Button
        variant="outline-success"
        onClick={() => {
          setEditOpen(true);
        }}
      >
        Profile
      </Button>
      <Button
        variant="outline-success"
        onClick={() => {
          setChangePasswordOpen(true);
        }}
      >
        Change Password
      </Button>
      <Button
        variant="outline-success"
        onClick={() => {
          setInviteOpen(true);
        }}
      >
        INVITE
      </Button>
      <Button variant="outline-success">LOGOUT</Button>
      <Button
        variant="outline-success"
        onClick={() => {
          setAddPublisher(true);
        }}
      >
        Add Publisher
      </Button>

      {/* update profile */}
      <Modal
        isOpen={editopen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="close_img_div" onClick={() => closeEditModal()}>
          <IoIosClose />
        </div>
        {/* <button onClick={() => closeEditModal()}>close</button> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 50
          }}
        >
          <label>
            FirstName:
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={event => buyer_firstname(event.target.value)}
            />
          </label>
          <label>
            Middle Name:
            <input
              type="text"
              name="middleName"
              value={middlename}
              onChange={event => buyer_middlename(event.target.value)}
            />
          </label>
          <label>
            LastName:
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={event => buyer_lastname(event.target.value)}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={event => buyer_email(event.target.value)}
            />
          </label>
          <label>
            Contact:
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={event => buyer_contact(event.target.value)}
            />
          </label>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={company}
              onChange={event => buyer_company(event.target.value)}
            />
          </label>
          <button
            onClick={() => {
              update();
            }}
          >
            Update
          </button>
        </div>
      </Modal>

      {/* change password */}
      <Modal
        isOpen={changePasswordOpen}
        style={customStyles}
        contentLabel="Change Password  Modal"
      >
        <button onClick={() => setChangePasswordOpen(false)}>close</button>
        <ChangePass />
      </Modal>

      {/*  invite  */}
      <Modal
        isOpen={inviteOpen}
        style={customStyles}
        contentLabel=" Invite  Modal"
      >
        <button onClick={() => setInviteOpen(false)}>close</button>
        <InvitePublisher />
      </Modal>

      {/*  Add publisher  */}
      <Modal
        isOpen={addPublisher}
        style={customStyles}
        contentLabel=" Invite  Modal"
      >
        <button onClick={() => setAddPublisher(false)}>close</button>
        <div>
          <form>
            <input
              id="FirstName2"
              value={formValues[0]}
              onChange={e => handleForm(e)}
              type="text"
              placeholder="First Name"
              name="FirstName"
              required
            />
            <input
              id="MiddleName2"
              value={formValues[1]}
              onChange={e => handleForm(e)}
              type="text"
              placeholder="Middle Name"
              name="MiddleName"
            />
            <input
              id="LastName2"
              value={formValues[2]}
              onChange={e => handleForm(e)}
              type="text"
              placeholder="Last Name"
              name="LastName"
              required
            />
            <input
              id="Email2"
              value={formValues[3]}
              onChange={e => handleForm(e)}
              type="email"
              placeholder="Email address"
              name="Email"
              required
            />
            <input
              id="Company2"
              value={formValues[4]}
              onChange={e => handleForm(e)}
              type="text"
              placeholder="Company"
              name="Company"
            />
            <input
              id="PhoneNumber2"
              value={formValues[5]}
              onChange={e => handleForm(e)}
              type="text"
              placeholder="Phone"
              name="PhoneNumber"
              required
            />
            <input
              method="post"
              onClick={event => {
                event.preventDefault();
                let flag = 1;
                if (flag == 1)
                  formValues.forEach((element, idx) => {
                    if (idx != 1 && idx != 6 && idx != 8) {
                      if (element == "") {
                        flag = 0;
                      }
                    }
                  });
                if (flag == 0) {
                  alert("All the fileds are required to be filled");
                }

                if (flag == 1) {
                  Signup(event);
                }
              }}
              type="submit"
              value="Signup"
            />
            {/* <a><p>Signup</p></a> */}
          </form>
        </div>
      </Modal>
    </div>
  );
};
export default ProfileDetails;
