import React, {useContext, useRef,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css"
import AuthContext from "../store/auth-context";

const Signup = ()=>{
    const [errorMsg,setError] = useState("");

    const {login} = useContext(AuthContext);

    const email = useRef();
    const password = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const navigate = useNavigate();


    const onClickHandler = ()=>{
        if(email.current.value.length && password.current.value.length && firstName.current.value.length && lastName.current.value.length){
        console.log(email.current.value)
        console.log(password.current.value)
        console.log(firstName.current.value)
        console.log(lastName.current.value)
        }

        let body = {
            firstName:firstName.current.value,
            lastName:lastName.current.value,
            email:email.current.value,
            password:password.current.value
        }

        axios({
            method:'post',
            url:'http://localhost:8080/signup',
            data: body,
            headers:{Accept: 'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        }).then(res=>{
            console.log(res.data)
            login(res.data)
            localStorage.setItem("user",JSON.stringify(res.data));

            navigate(`/dashboard/${res.data.id}`)

            
        }).catch(error=>{
            console.log(error.response.data.message)
            setError(error.response.data.message);
        })


    }
      
    return(
        <div className="signup-form">
            <h4>
                Enter First Name
            </h4>
            <input className="input-container" ref ={firstName} type="text" placeholder="enter first name">
                </input>

                <h4>
                Enter Last Name
            </h4>
            <input className="input-container" ref={lastName} type="text" placeholder="enter last name">
                </input>

            <h4>Email</h4>
            <input className="input-container" ref={email} type="email" placeholder="Enter your email"></input>
            <h4>Password</h4>
            <input className="input-container" ref={password} type="password" placeholder="Enter your password"></input>
            <br></br>
            <div className="button-container">
            <button className="button" onClick={onClickHandler}>Submit</button>
            </div>
            {errorMsg.length>0 && <div>{errorMsg}</div>}
        </div>
    )

}

export default Signup;