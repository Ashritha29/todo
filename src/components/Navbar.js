import React from 'react';
import {NavLink, Routes,  Route } from 'react-router-dom';
import Home from './Home';
import "bootstrap";
import Contactus from './Contactus';
import Signup from './Signup';
import AddTodo from './AddTodo';
import Cards from './Cards';
//import Navbar from 'react-bootstrap/Navbar';

function Navbar() {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fw-bold fs-4 text-white" to="#">TODOLIST</NavLink>
                    <NavLink className="navbar-brand text-white fs-3" to="/">
                        <img src="" width="150px" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link  text-white fs-5 me-4" to="/">Home </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link  text-white fs-5 me-4" to="/AddTodo">Addtodo</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link  text-white fs-5 me-4" to="/Cards">Cards</NavLink>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle text-white fs-3 me-3" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                </NavLink>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink className="dropdown-item" to="/AddTodo">Addtodo</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/">something</NavLink></li>
                                </ul>
                            </li> */}
                        </ul>
                        {/* <form className="d-flex">
                            <div className=" col-lg-6 col-sm-6 me-1 ms-5">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search"></input>
                            </div>
                            <div className=" col-lg-3 col-sm-6 ">
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </div>
                        </form> */}
                        <li className="nav-item mb-3 me-5">
                            <NavLink className="nav-link" to="/Signup">
                                <button className="btn btn-primary">Signup</button>
                            </NavLink>
                        </li>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Contactus" element={<Contactus />} />
                <Route path="/AddTodo" element={<AddTodo/>}/>
                <Route path="/Cards" element={<Cards/>}/>
            </Routes>
        </div>
    )
}

export default Navbar;
