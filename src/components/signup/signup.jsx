import React, { useState } from 'react';
import "./signup.scss";
import FormInput from "../formInput/formInput.jsx"
import CustomButton from "../customButton/customButton.jsx"
import { auth, createUserProfileDocument} from "../../firebase/firebase.utils";
 

const Signup = () => {

    const[displayName, setDisplayName] = useState();
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const[confirmPassword, setConfirmPassword] = useState();

    const handleSubmit = async event => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Password don't match")
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            setDisplayName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");    
        } catch (err) {

        }
    }

    const handleChange = event => {
        const { value, name } = event.target;
        if(name === "displayName") {
            setDisplayName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    }


    return (
        <div className="sign-up">
            <h2 className="title">I do not hava a account</h2>
            <span>Sign up with your email and password</span>
            <form className="sigp-up-form" onSubmit={handleSubmit}>
                <FormInput type="text" name="displayName" value={displayName} handleChange={handleChange} label="Display Name" required />
                <FormInput type="email" name="email" value={email} handleChange={handleChange} label="Email" required />
                <FormInput type="password" name="password" value={password} handleChange={handleChange} label="Password" required />
                <FormInput type="password" name="confirmPassword" value={confirmPassword} handleChange={handleChange} label="Confirm Password" required />
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>
        </div>
    );
};

export default Signup;