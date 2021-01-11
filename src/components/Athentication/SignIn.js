import React, { useState } from "react";

import "components/Athentication/SignIn.scss";

import FormInput from "components/Athentication/FormInput";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

// props passes state of email and password
export default function SignIn(props){
    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = state;

        try{
            auth.signInWithEmailAndPassword(email, password).then((user) => {
 
            })
            setState({ email: "", password: "" });
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
        }catch(err){
            console.log(err);
        }
    }

    const handleChange = e => {
        const { value, name } = e.target
    
        setState(prevState => {
            return{
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        <div className='sign-in p-2'>
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
                        <button className="btn btn-custom" onClick={signInWithGoogle}>
                            <span>SIGN IN WITH </span>
                            <img
                                src="images/Google.png"
                                alt="Google"
                                className="img-fluid"
                                width="25" height="25"
                            />
                        </button>
                    </div>
                    
                </form>
            </div>
    )
}