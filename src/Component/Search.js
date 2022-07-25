import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../store/auth-context";
import axios from "axios";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';  
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import "../Styles/Search.css"
import { useNavigate, useParams } from "react-router-dom";
import Navigationbar from "./Navigationbar";

const Search = ()=>{

    const {userDetails,logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const [user,setUser] = useState({});
    const userEmail = useRef();

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8080/users/id/${id}`)
        .then(res =>{
            console.log(res.data);
            setUser(res.data);
        }).catch(err=>{
            console.log(err.response)
        })
    },[])

    return(
        <div className="Search">
            <div>
            <Navigationbar></Navigationbar>
            </div>

            <div className="result">
                <h1>Search Result</h1>
                {Object.keys(user).length>0 && (
            <div className="result card">
        
        <Card  
        
          text={'dark'}  
          style={{width:"20%"}}  
          className="m-2"  
        >  
          <Card.Header>{user.email}</Card.Header>  
          <Card.Body styles={{padding:"0"}}>  
            <Card.Text>  
            First Name : {user.firstName}
            <br></br>
            Last Name : {user.lastName}
            </Card.Text>

            <Button onClick={()=>{
                navigate(`/dashboard/${user.id}`)
            }}>View Profile</Button>

          </Card.Body>  
        </Card> 
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search;