import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import Login from './Component/Login'; 
import Signup from './Component/Signup';


function App() {

  const [login,setLogin] = useState(true);

  return (
    <div className='App'>
      <Container>
      <Row>
        <Col><div className='home'><h1>Spring Boot and React Project</h1></div></Col>
        <Col><div>
          {login && (<div><h1>Login</h1>
          <Login/>
          </div>)}

          {!login && (<div><h1>Sign up</h1>
          <Signup/>
          </div>)}
        
        
          <div className='button-container'>
          <button className='button-class' onClick={()=>setLogin(prev=>!prev)}>{login?"Create a New Account ":"Already have an account ? Login"}</button>
          </div>
          </div></Col>
      </Row>
      
    </Container>
    </div>
  );
}

export default App;
