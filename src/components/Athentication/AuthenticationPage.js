import React from "react";

import SignIn from "components/Athentication/SignIn";
import SignUp from "components/Athentication/SignUp";


export default function Authentication(props){
    return (
        <div className="authentication d-flex flex-wrap">
            <SignIn />
            <SignUp />
        </div>
    )
}