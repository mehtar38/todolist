import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import { AuthContext } from './AuthContext';


const Register = () => {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData.email, formData.password);
      navigate('/api/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
    // console.log("Email: ", formData.email);
    // console.log("Password: ", formData.password);
  ;}

  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'100vh', backgroundColor: '#f8f9a'}}>
    <Card className="p-4 shadow" style={{ width: '36rem' }}>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={formData.email} name="email" onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={formData.password} name="password" onChange={handleInputChange}/>
      </Form.Group>
      <div className="d-grid gap-2">
      <Button variant="primary"  size='lg' type='submit'>Sign Up</Button> </div>
      <div className="text-center mt-3">
      <Form.Text id="passwordHelpBlock" muted>
        Already Registered? 
      </Form.Text>
      <Button variant="link"onClick={() => navigate('/api/login')}>Login</Button> </div>
    </Form>
    </Card>
    </div>
  );
}

export default Register
