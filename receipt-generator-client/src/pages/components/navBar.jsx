import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useIsAuthenticated, useSignOut  } from 'react-auth-kit';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";



function NavBar() {

  const isAuthenticated = useIsAuthenticated();
  const [ authenticated , setAuthenticated ] = useState();
  const signOut = useSignOut();
  const nav = useNavigate();

  useEffect(()=>{
		setAuthenticated(isAuthenticated)
	}, [isAuthenticated])

  const signOutBtn = () => {
    signOut();
    nav('/login')
  }

  return (
    <Navbar bg="light" expand="md" className='mb-3'>
      <Container>
        <Navbar.Brand href="/">Al-Burhan</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              authenticated ? (
                <> 
                  <Nav.Link href="/receipt/new">New Receipt</Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="" onClick={()=>signOutBtn()}>Logout</Nav.Link>
                </>
              ) : (
                ''
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;