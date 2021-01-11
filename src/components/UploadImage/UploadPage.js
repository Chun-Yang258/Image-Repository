import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import UploadForm from "./UploadForm";
import "./UploadPage.scss"

export default function UploadPage(props) {

    // if signed in, then automatically redirect to shop page.
    let history = useHistory();
    useEffect(() => {
        if(!props.currentUser){            
            history.push("/");
        }
    })

    return(
        <UploadForm />
    )
}