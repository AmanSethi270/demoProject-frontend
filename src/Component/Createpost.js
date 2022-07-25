import React, { useContext, useEffect, useRef, useState } from "react";
import '../Styles/Postform.css'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../store/auth-context";


const CreatePost = ()=>{

    const {id} = useParams();

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const navigate = useNavigate();

    const {login,userDetails} = useContext(AuthContext);
   
    
  
    

    const onClickHandler = (e)=>{
        e.preventDefault();
       if(title.length>0 && description.length>0){
        console.log(title)
        console.log(description)
        
        let body = {
            title:title,
            description:description
        }

        axios({
            method:'post',
            url:`http://localhost:8080/users/id/${id}/posts`,
            data: body,
            headers:{Accept: 'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        }).then(res=>{
            console.log(res.data)
            login(res.data);
            navigate(`/dashboard/${id}`)


        })

       
       }
    }


    return(
        <div className="post-form">
            <div className="form">
            <h4>Title</h4>
            <input className="input-container" type="email" placeholder="Enter title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            <h4>Description</h4>
            <textarea className="input-container"  placeholder="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            <br></br>
            </div>
            <div className="button-container"><button className="button" onClick={(e)=>onClickHandler(e)}>Submit</button></div>

            {/* {errorMsg.length>0 && <div>{errorMsg}</div>} */}
        </div>
    )
}

export default CreatePost;