import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../store/auth-context";
import axios from "axios";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';  
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import "../Styles/Dashboard.css"
import { useNavigate, useParams } from "react-router-dom";

const Navigationbar = ()=>{

  const {userDetails,logout} = useContext(AuthContext);
  // const [user,setUser] = useState({});
  const navigate = useNavigate();
  const userEmail = useRef();

    return(
        <div>
               <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{cursor:"pointer"}} onClick={
            ()=>{
                navigate(`/dashboard/${userDetails.id}`)
            }
          }>Home</Navbar.Brand>
          <Nav className="me-auto">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search user"
              className="me-2"
              aria-label="Search"
              ref={userEmail}
            />
            <Button variant="outline-success" onClick={()=>{
                // console.log(`searching for user with email `)

                axios.get(`http://localhost:8080/users/email/${userEmail.current.value}`)
                .then(res =>{
                    console.log(res.data);
                    navigate(`/search/${res.data.id}`)
                })
                .catch(error=>{
                  console.log(error.response.data.message)
                  alert(error.response.data.message);
                })

            }}>Search</Button>
          </Form>
           
          </Nav>
          <Nav>
            <Nav.Link onClick={()=>{
                navigate(`/profile/${userDetails.id}`)
            }}>Profile</Nav.Link>
            <Nav.Link onClick={()=>{
                logout();
                navigate('/');
            }}>Log Out</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
        </div>
    )


}

export default Navigationbar;