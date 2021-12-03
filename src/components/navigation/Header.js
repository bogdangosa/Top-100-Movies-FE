import React,{useState} from 'react';
import './Header.css';
import {Link} from 'react-router-dom'
import {AnimatePresence,motion } from 'framer-motion';
import Login from '../shared/Login/Login';
import SignUp from '../shared/SignUp/SignUp';


function Header(props) {
  const [LoginPopUp,SetLoginPopUp] = useState(false);
  const [SignUpPopUp,SetSignUpPopUp] = useState(false);
  const [HamburgerState,setHamburgerState] = useState(true);
  const user = props.user;
  const setuser = props.setuser;


  const OpenLogin =()=>{
    if(SignUpPopUp)
      SetSignUpPopUp(false);
    SetLoginPopUp(!LoginPopUp);
  }


  const UpdateUser = (user)=>{
    setuser(user);
  }

  return (
    <div className="Header">
        <h2 className="Logo">Top <span className="red">100</span> Movies</h2>
        <ul className="nav">
            <Link to='/' className="nav-links"><li>Home</li></Link>
            <Link to='/MyList' className="nav-links"><li>My List</li></Link>
            {user==undefined?<li className="nav-links login-btn" onClick={()=>OpenLogin()}>Login</li>:<></>}
            {user!=undefined?  <Link to='/MyAccount' className="nav-links login-btn"><li>My Account</li></Link>:<></>}
        </ul>
        <div className={HamburgerState ? "hamburger" : "hamburger close-hamburger"} onClick={()=>setHamburgerState(!HamburgerState)}>
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
            </div>
        <AnimatePresence exitBeforeEnter>
        {LoginPopUp?<Login key="login-popup" openSignUp={()=>{SetSignUpPopUp(true); SetLoginPopUp(false);}} close={()=>SetLoginPopUp(false)} updateuser={(user)=>UpdateUser(user)}/>:""}
        {SignUpPopUp?<SignUp key="signup-popup" openLogin={()=>{SetSignUpPopUp(false); SetLoginPopUp(true);}} close={()=>SetSignUpPopUp(false)} updateuser={(user)=>UpdateUser(user)}/>:""}
        </AnimatePresence>
    </div>
  );
}

export default Header;
