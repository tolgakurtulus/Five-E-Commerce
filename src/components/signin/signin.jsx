import React, { useState } from 'react';
import "./signin.scss";
import FormInput from "../formInput/formInput.jsx"
import CustomButton from "../customButton/customButton.jsx"
import { auth, signInWithGoogle } from "../../firebase/firebase.utils.js"

const Signin = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setEmail("");
            setPassword("");    
        } catch (err) {
            console.log("~ err", err)
        }
    }

    const handleChange = event => {
        const { value, name } = event.target;
        if(name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    return (
        <div className="sign-in" onSubmit={handleSubmit}>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form action="">
                <FormInput type="email" name="email" value={email} handleChange={handleChange} label="Email" required />
                <FormInput name="password" type="password"  value={password} handleChange={handleChange} label="Password" required />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    );
};

export default Signin;