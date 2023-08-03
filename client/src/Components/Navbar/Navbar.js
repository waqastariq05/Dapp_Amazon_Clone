import React, { useContext, useEffect, useState } from 'react'
import '../Navbar/Navbar.css'
import DappazonContext from '../../Context/DappazonContext';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    const navigate = useNavigate();
    const contex = useContext(DappazonContext);
    const { contract, category, getCategory, handleConnect, account } = contex;

    useEffect(() => {
        contract && getCategory();
    }, [contract])

    const [data, setData] = useState(null)
    const handleClick = () => {
        let item = data.replace(/\s+/g, '-');
        setData(null)
        navigate('/search/' + item);
    }

    const change = (e) => {
        setData(e.target.value)
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <Link class="navbar-brand" to="/">Dappazon</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div class="search mx-auto">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search product by name" aria-describedby="btn" value={data} onChange={change} />
                                <button class="btn" type="submit" id="btn" onClick={handleClick}><i class="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                        <div>
                            {account ? (
                                <button class="btn" type="submit">{account.slice(0, 6) + '...' + account.slice(38, 42)}</button>
                            ) : (
                                <button class="btn" type="submit" onClick={handleConnect}>Connect</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav >
            <ul class="nav">
                {category && category.map((cate, index) => {
                    return (
                        <li class="nav-item" key={index}>
                            <button class="nav-link">{cate.name}</button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Navbar;
