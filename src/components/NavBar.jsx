import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="navbar-custom mb-4">
      <Container>
            <NavLink className="nav-link-custom" to="/">Home</NavLink>
            <NavLink className="nav-link-custom" to="/ProductsMenu">Products</NavLink>
            <NavLink className="nav-link-custom" to="/OrderProcessing">Order Processing</NavLink>
            <NavLink className="nav-link-custom" to="/CustomersAndAccountsMenu">Customers and Accounts</NavLink>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
