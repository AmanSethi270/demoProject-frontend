import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../store/auth-context";
import axios from "axios";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';  
import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import Navbar from "./Navigationbar";
import Form from 'react-bootstrap/Form';
import "../Styles/Dashboard.css"
import { useNavigate, useParams } from "react-router-dom";
// import Login from "./Login";

const Dashboard= ()=>{

    let {id} = useParams();
    // console.log(id);
   
    const [posts,setPosts] = useState([]);
    const {userDetails,logout,login} = useContext(AuthContext);
    const [user,setUser] = useState({});
    const [following,setFollowing] = useState(false);
    const navigate = useNavigate();
    const userEmail = useRef();

    const deleteHandler =(postId)=>{
        axios.delete(`http://localhost:8080/users/id/${id}/posts/${postId}`)
        .then(res=>{console.log(res)});
        
        setPosts(prev => prev.filter((el)=>el.postId !==postId));

        // console.log(postId);
    }

    // console.log(userDetails);
    useEffect(()=>{

        const loggedUser = localStorage.getItem("user");
        if(loggedUser){
            const foundUser = JSON.parse(loggedUser);
            // console.log(foundUser);

            login(foundUser);
            console.log(userDetails.id);

        }

        axios.get(`http://localhost:8080/users/id/${id}`)
        .then(res =>{
            console.log(res.data);
            setUser(res.data);
        })

        axios.get(`http://localhost:8080/users/id/${id}/posts`)
        .then(res=>{
            // console.log(res.data);
            setPosts(res.data);
        })

            // console.log(userDetails.id);
            if(userDetails.id!=id){
                axios.get(`http://localhost:8080/users/id/${userDetails.id}/following/followingId/${id}`)
            .then(res=>{
                console.log(res);
                setFollowing(true);
            })
            .catch(err=>{
                console.log(err.response.data.message)
            })
            }
        

    },[id,following])

  
    return(
        <div className="class">
         <Navbar />
       <div  className="Dashboard">
        <Container>
            <Row>
                <Col sm = {4}>

                <div>
                    <h1>Details</h1>
                    <h3>First Name : {user.firstName}</h3>
                    <h3>Last Name : {user.lastName}</h3>

                    {userDetails.id===user.id &&(
                        <Button className="button" onClick={()=>{
                            navigate(`/create-post/${userDetails.id}`)
                        }}>Create New Post</Button>
                    )}

                    {userDetails.id!=user.id && following && (
                        <Button className="button" onClick={()=>{
                            // setFollowing(false);
                            axios.delete(`http://localhost:8080/users/id/${userDetails.id}/following/followingId/${id}`)
                            .then(res=>{
                                console.log(res);
                                setFollowing(false);
                            })
                            
                        }}>Following</Button>

                    )}

                      {userDetails.id!=user.id && !following && (
                        <Button variant="success" size="lg" onClick={()=>{
                            
                            axios({
                                method:'post',
                                url:`http://localhost:8080/users/id/${userDetails.id}/following/followingId/${id}`,
                                headers:{Accept: 'application/json',
                                'Content-Type':'application/json',
                                'Access-Control-Allow-Origin': '*'
                            }
                            }).then(res=>{
                                console.log(res.data);
                                setFollowing(true);
                            })
                            
                        }} >Follow</Button>

                    )}

                </div>

                </Col>
                <Col sm = {8}>
                <div>  
       
       <Container className='p-4'>  
       <h1>POSTS</h1>
       <Row>  
       { posts.length>0 ?( posts.map((post,idx)=>(
          <Card  
         key = {post.postId}
          text={'dark'}  
          style={{width:"30%"}}  
          className="m-2"  
        >  
          <Card.Header>{post.title}</Card.Header>  
          <Card.Body>  
            <Card.Text>  
            {post.description}
            </Card.Text>
            {userDetails.id==user.id&& (
             <div><Button variant="primary" style={{marginRight: "10px",padding:"auto"}} onClick = {()=>{
                navigate(`/user/${userDetails.id}/update-post/${post.postId}`)
             }} >Edit</Button>  

             <Button variant="danger" onClick={()=>deleteHandler(post.postId)}>Delete</Button>  </div>
            )}
          </Card.Body>  
        </Card>  
       ))):(<h1>No Post Created</h1>)}
  </Row>  
  </Container>
      </div>  
                </Col>
            </Row>
        </Container>
       </div>
        </div>
    )
}

export default Dashboard;