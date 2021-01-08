import React,{ useState } from "react";

import FormInput from "components/Athentication/FormInput";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import "components/Athentication/SignUp.scss";

export default function SignUp(props){
    const [state, setState] = useState({
        email: "",
        displayName: "",
        password: "",
        confirmPassword: ""
    }) 

    const handleSubmit = async evt => {
        evt.preventDefault();

        let { email, displayName, password, confirmPassword } = state;

        if (password !== confirmPassword){
            alert("passwords do not match")
            return;
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password).then(() => {
                let usr = auth.currentUser;
                if(usr){
                    usr.updateProfile({displayName: displayName})
                }            
            })       
            await createUserProfileDocument(user, {displayName})

            setState({
                email: "",
                displayName: "",
                password: "",
                confirmPassword: ""
            })
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
        }catch(err){
            console.log(err)
        }
    }

    const handleChange = evt => {
        const { name, value } = evt.target;

        setState(prevState => {
            return{
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        <div className="sign-up">
            <h2>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    type="text"
                    name="displayName"
                    value={state.displayName}
                    onChange={handleChange}
                    label="Display Name"
                    required
                />
                <FormInput 
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput 
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    label="Password"
                    required
                />
                <FormInput 
                    type="password"
                    name="confirmPassword"
                    value={state.confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    required
                />
                <button className="btn btn-dark" type='submit'>SIGN UP</button>
            </form>
        </div>
    )
}