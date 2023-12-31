import { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';


const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const login = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:5000/login', loginData);
    console.log(data);
    if (data.message === 'User aunthenticated succsessfully') {
      console.log('getting here');
      Cookies.set('token', data.token);
      //navigate to home page
      window.open('/', '_self');
    }
  };
  return (
    <div className="login-body">
      <div className="cardAuth">
        <h2 className="h2"> Login</h2>
        <hr />
        <Form onSubmit={login}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </Form.Group>

          <button className="submitBtn" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
