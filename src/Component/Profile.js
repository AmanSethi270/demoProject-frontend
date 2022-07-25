import React,{useContext} from 'react';
import Navigationbar from './Navigationbar';
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';  
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../store/auth-context";

import '../Styles/Profile.css'

const Profile = ()=>{

    const {userDetails,logout} = useContext(AuthContext);
  // const [user,setUser] = useState({});
  const navigate = useNavigate();

    return (
        <div className='profile'>
            <Navigationbar></Navigationbar>
            <h1 style={{alignText:"center"}}>PROFILE</h1>
            <div>
           <div className='card'>
           <Card  
        
        text={'dark'}  
        style={{width:"20%"}}  
        className="m-2"  
      >  
        <Card.Header>USER INFORMATION</Card.Header>  
        <Card.Body styles={{padding:"0"}}>  
          <Card.Text>  
          First Name : {userDetails.firstName}
          <br></br>
          Last Name : {userDetails.lastName}
          <br></br>
          Email : {userDetails.email}
          </Card.Text>

          {/* <Button onClick={()=>{
              navigate(`/dashboard/${user.id}`)
          }}>View Profile</Button> */}

        </Card.Body>  
      </Card> 
           </div>
            </div>
        </div>
    )
}

export default Profile;