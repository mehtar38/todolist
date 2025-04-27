import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./Header.css"

const Header = () => {
  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ToDo List</Navbar.Brand>
          <Nav className="ml-auto"> 
            <Nav.Link as={Link} to="/api/register" className='nav-link'>Sign In</Nav.Link>
            {/* <Nav.Link href="#pricing">Register</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
