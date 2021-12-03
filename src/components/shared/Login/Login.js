import React,{useState} from "react";
import './Login.css';
import {motion} from 'framer-motion';
import axios from "axios";
import Close from '../../../assets/close.png'

const Login = (props) =>{

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
    const [WrongAcc,setWrongAcc] = useState(false);

    const HandleResponse = (res)=>{
        console.log(res.data);
        if(res.data=="wrong email or password")
            setWrongAcc(true);
        else{
            const updateuser = props.updateuser;
            const close = props.close;
            updateuser(res.data);
            close();
        }

    }

    const HandleLogin = () =>{
        setWrongAcc(false);
        axios.post('http://localhost:4000/login', {
            email: email,
            password: password
          })
            .then(res=>HandleResponse(res))
            .catch(err=>console.log(err));
    }


    return(
        <motion.div className="Login-PopUp"
        initial="enter"
        animate="in"
        exit="exit"
        variants={Variants}
        transition={Transition}>
            <h2 className="login-title">Login</h2>
            {WrongAcc?<p>wrong email or password</p>:<></>}
            <input className="email-input login-input" placeholder="email" type="text"value={email} onChange={(e)=>setemail(e.target.value)} />
            <input className="password-input login-input" placeholder="password" type="text"value={password} onChange={(e)=>setpassword(e.target.value)}/>
            <div className="sign-up-question">
                <p>you dont have an account?</p>
                <p className="red" onClick={props.openSignUp}>sign up</p>
            </div>
            <p className="login-btn" onClick={()=>HandleLogin()}>Login</p>

            <img src={Close} className="close_btn" onClick={props.close}/>

            
        </motion.div>
    )
}

export default Login;