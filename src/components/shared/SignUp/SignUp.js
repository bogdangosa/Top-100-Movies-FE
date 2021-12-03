import React,{useState} from "react";
import './SignUp.css';
import {motion} from 'framer-motion';
import axios from 'axios';
import Close from '../../../assets/close.png'

const SignUp = (props) =>{

    const Variants = {
        in: {
            opacity:1,
            y:"0"
        },
        enter: {
            opacity:0,
            y: "-100vh"
        },
        exit: {
            opacity:0,
            y: "100vh"
        }
    }
    const Transition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    }

    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");

    const CloseSignUp = (res)=>{
        console.log(res.data);
        const updateuser = props.updateuser;
        const close = props.close;
        updateuser(res.data);
        close();
    }

    const HandleSignUp = ()=>{
        axios.post('http://localhost:4000/SignUp', {
            email: email,
            password: password
          })
            .then(res=>CloseSignUp(res))
            .catch(err=>console.log(err));

    }

    return(
        <motion.div className="SignUp-PopUp"
        initial="enter"
        animate="in"
        exit="exit"
        variants={Variants}
        transition={Transition}>


            <h2 className="signup-title">Sign Up</h2>
            <input className="email-input login-input" placeholder="email" type="text"value={email} onChange={(e)=>setemail(e.target.value)} />
            <input className="password-input login-input" placeholder="password" type="text"value={password} onChange={(e)=>setpassword(e.target.value)}/>
            <div className="login-question">
                <p>you already have an account?</p>
                <p className="red" onClick={props.openLogin}>login</p>
            </div>
            <p className="login-btn" onClick={()=>HandleSignUp()}>Sign Up</p>
            
            <img src={Close} className="close_btn"  onClick={props.close}/>
        </motion.div>
    )
}

export default SignUp;