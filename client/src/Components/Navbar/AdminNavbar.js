import React, { useContext } from 'react'
import '../Navbar/Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import DappazonContext from '../../Context/DappazonContext'

const SideNavbar = () => {
    const contex = useContext(DappazonContext);
    const { handleConnect, account } = contex;

    return (
        <>
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <Link class="navbar-brand" to="/">Dappazon</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item">
                                <NavLink to="/">Dashboard</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/category">Category</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/product">Product</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/order">Order</NavLink>
                            </li>
                        </ul>
                        {account ? (
                            <button class="btn" type="submit">{account.slice(0, 6) + '...' + account.slice(38, 42)}</button>
                        ) : (
                            <button class="btn" type="submit" onClick={handleConnect}>Connect</button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default SideNavbar
