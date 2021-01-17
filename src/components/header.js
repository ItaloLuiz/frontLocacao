import React, { Component } from "react";
import { Navbar,Nav, Container } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";



class Header extends Component {
    render() {
      return (
        <Router>        
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="/">Veiculos</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto"> 
                    <Nav.Link href="/">Home</Nav.Link>   
                    <Nav.Link href="/locados">Locados</Nav.Link>   
                    <Nav.Link href="/disponiveis">Disponiveis</Nav.Link>             
                    </Nav>                
                </Navbar.Collapse>
               </Container>
              </Navbar>         
        </Router>
      );
    }
  }
  
  export default Header;