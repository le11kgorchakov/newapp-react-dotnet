import React, { Component, FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'


const Navigaion: FunctionComponent = () =>
{

    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                        Home
              </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/tasks">
                        Tasks
              </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/users">
                        Users
              </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Navigaion