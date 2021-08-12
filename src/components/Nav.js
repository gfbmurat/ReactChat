import React from 'react'
import { NavLink } from 'react-router-dom'
const Nav = () => {


    return (
        <div className="ui secondary pointing menu">
            <NavLink exact to="/" activeClassName="active" className="item" >Home</NavLink>
            <NavLink exact to="/login" activeClassName="active" className="item" >Login</NavLink>
            <NavLink exact to="/signup" activeClassName="active" className="item" >Sign Up</NavLink>
            <NavLink exact to="/userlist" activeClassName="active" className="item" >User List</NavLink>

            <div className="right menu">
                <NavLink to="/logout" activeClassName="active" className="item">Logout</NavLink>
            </div>
        </div>
    )
}

export default Nav
