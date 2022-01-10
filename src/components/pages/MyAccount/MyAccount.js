import React from 'react';
import './MyAccount.css';


function MyAccount(props) {
  return (
    <div className="MyAccount">
        <div className="upper-section-myaccount">
          <h1 className="myaccount-email">{props.user.email}</h1>
        </div>
         
        <div className="">
          <p>Sign out</p>
          <p>Delete account</p>
        </div>
    </div>
  );
}

export default MyAccount;
