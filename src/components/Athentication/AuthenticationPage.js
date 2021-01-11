import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import SignIn from "components/Athentication/SignIn";
import SignUp from "components/Athentication/SignUp";


export default function Authentication(props){
    // if signed in, then automatically redirect to shop page.
    let history = useHistory();
    useEffect(() => {
        if(props.currentUser){            
            history.push("/");
        }
    })

    return (
        <div className="authentication d-flex flex-wrap">
            <SignIn />
            <SignUp />
        </div>
    )
}