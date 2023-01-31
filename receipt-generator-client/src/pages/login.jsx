import NavBar from "./components/navBar";
import LoginForm from "./forms/loginForm";
import { useIsAuthenticated } from 'react-auth-kit';
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



function Login () {
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated() === true) {
            navigate('/')
        }
    }, [])

    if (isAuthenticated() ===true) {
        return (
            ''
        )
    }
    else if(isAuthenticated() === false) {
        return (
            <>
                <NavBar />
                <LoginForm />
            </>
        )
    }
}

export default Login;