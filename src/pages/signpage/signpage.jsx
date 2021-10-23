import React from "react";
import "./signpage.scss";
import Signin from "../../components/signin/signin.jsx"
import Signup from "../../components/signup/signup.jsx"

const SignPage = () => {
    return (
        <div className="sign">
            <Signin />
            <Signup />
        </div>
    );
};

export default SignPage;