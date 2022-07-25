import React, { useContext, useRef, useState } from "react";
import '../Styles/Login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Login = ()=>{
    const [errorMsg,setError] = useState("");
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const {login,userDetails} = useContext(AuthContext);

    const onClickHandler = ()=>{
       if(email.current.value.length && password.current.value.length){
        // console.log(email.current.value)
        // console.log(password.current.value)
        
        let body = {
            email:email.current.value,
            password:password.current.value
        }

        axios({
            method:'post',
            url:'http://localhost:8080/login',
            data: body,
            headers:{Accept: 'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        }).then(res=>{
            console.log(res.data)
            login(res.data);
            localStorage.setItem("user",JSON.stringify(res.data));
            navigate(`/dashboard/${res.data.id}`)


        }).catch(error=>{
            console.log(error.response.data.message)
            setError(error.response.data.message);
        })

       }
    }

    return(
        <div className="login-form">
            <h4>Email</h4>
            <input className="input-container" ref={email} type="email" placeholder="Enter your email"></input>
            <h4>Password</h4>
            <input className="input-container" ref={password} type="password" placeholder="Enter your password"></input>
            <br></br>
            <div className="button-container"><button className="button" onClick={onClickHandler}>Submit</button></div>

            {errorMsg.length>0 && <div>{errorMsg}</div>}
        </div>
    )

}

export default Login;