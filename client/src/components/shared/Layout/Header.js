import React from 'react'
import { BiSolidDonateBlood, BiUserCircle } from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
    const {user}  = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        alert('Logout Successfully');
        navigate('/login');
    }
    return (
        <div>
            <nav className='navbar'>
                <div className='container-fluid'>
                    <div className="navbar-brand h1"><BiSolidDonateBlood color='red' />
                        Blood Bank App
                    </div>
                    <ul className='navbar-nav flex-row'>
                        <li className='nav-item mx-3'>
                            <p className='nav-link'><BiUserCircle />Welcome {user?.name || user?.hospitalName || user?.organisationName} &nbsp;
                            <span className="badge bg-secondary">{user?.role}</span>
                            </p>
                        </li>
                        <li className='nav-item mx-3'>
                            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header