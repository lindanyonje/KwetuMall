import { useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const register = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:5000/register', registerData);
    console.log(data);
    if (data.message === 'User created') {
      navigate('/login');
    }
  };

  return (
    <div className="login-body">
      <div className="cardAuth">
        <h2 className="h2"> Register</h2>
        <hr />
        <Form onSubmit={register}>
          <Row className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={registerData.firstName}
                onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={registerData.lastName}
                onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
              />
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                value={registerData.phoneNumber}
                onChange={(e) => setRegisterData({ ...registerData, phoneNumber: e.target.value })}
              />
            </Col>
          </Row>

          <button className="submitBtn " type="submit">
            {' '}
            Submit{' '}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
