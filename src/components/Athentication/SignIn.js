import React, { useState } from "react";

import "components/Athentication/SignIn.scss";

import FormInput from "components/Athentication/FormInput";
import { signInWithGoogle } from "../../firebase/firebase.utils";

// props passes state of email and password
export default function SignIn(props){
    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = e => {
        e.preventDefault();
        console.log(state)
        setState({ email: "", password: "" })
    }

    const handleChange = e => {
        const { value, name } = e.target
        console.log(value)
        console.log(state)
        setState(prevSate => {
            return{
                ...prevSate,
                [name]: value
            }
        })
    }

    return (
        <div className='sign-in'>
                <h2>Already have an account?</h2>
                <span className='title'>Sign in with your email and password</span>

                <form onSubmit={handleSubmit} >
                    <FormInput
                        name='email' 
                        type='email' 
                        value={state.email}
                        handleChange={handleChange}
                        label='Email'       
                    />
                    <FormInput 
                        name='password' 
                        type='password' 
                        value={state.password}
                        handleChange={handleChange} 
                        label='Password'
                    />
                    <div className='buttons'>
                        <button className="btn btn-dark" type='submit'>SIGN IN</button>
                        <button className="btn btn-primary" onClick={signInWithGoogle}>
                            SIGN IN with google
                        </button>
                    </div>
                    
                </form>
            </div>
    )
}