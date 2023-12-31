import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./styles/navbar.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router";

const Navbarr = () => {
  const [isLogin,setLogin]=useState(false);
  const navigate=useNavigate();
  const handleUser=()=>{
    if(isLogin){
      navigate('/profile');
    }else{
      alert("login first!")
    }
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    })
  })
  return (
    <Navbar collapseOnSelect expand="lg" className="navbarr" variant="dark">
      <Container>
        <Navbar.Brand href="/#upper-land-page">
          <img src="https://i.postimg.cc/YSrf7DV9/therapeak-Logo.png" alt="" />{" "}
          <h2 style={{ float: "right", marginTop: "1.5rem" }}>| CuRehab</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link
              className="navs"
              style={{ fontSize: "25px" }}
              href="/#about"
            >
              About Us
            </Nav.Link>
            <Nav.Link
              className="navs"
              style={{ fontSize: "25px" }}
              href="#memes"
            >
              Donate
            </Nav.Link>
            <Nav.Link href="#">
              <button onClick={handleUser} id="bttn-profile">
                <img
                  src="https://i.postimg.cc/nzDhsp9h/gg-profile.png"
                  alt=""
                />
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
