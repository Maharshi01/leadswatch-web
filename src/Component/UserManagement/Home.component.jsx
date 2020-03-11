import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL ,logoutidle} from '../../AppConfig'

import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

const Home = () => {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(true);
  function Already() {
    setSignup(false);
    setLogin(true);
  }
  function SignUp() {
    setSignup(true);
    setLogin(false);
  }
  return <div className="main_div">Check singuppage</div>;
};
export default Home;
