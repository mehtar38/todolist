import { React, useContext} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import { AuthContext } from './AuthContext';

const Login = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
    try {
      const response= await login(formData.email, formData.password);
      console.log("Token: ", response.token);
      navigate('/api/tasks'); // Redirect to tasks page after login
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'100vh', backgroundColor: '#f8f9a'}}>
    <Card className="p-4 shadow" style={{ width: '36rem' }}>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={formData.email}  onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password"
              value={formData.password}
              onChange={handleInputChange}
              required/>
      </Form.Group>
      {error && <div className='text-danger mb-3'> {error} </div>}
      <div className="d-grid gap-2">
      <Button variant="primary" size="lg" type='submit'>Login</Button> </div>
    </Form>
    </Card>
    </div>
  );
}

export default Login
