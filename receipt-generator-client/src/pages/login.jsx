import NavBar from "./components/navBar";
import LoginForm from "./forms/loginForm";
import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from "react-router-dom";



function Login () {
    const isAuthenticated = useIsAuthenticated();
    if (isAuthenticated) {
        return (
            <Navigate to="/" replace={true} />
        )
    }
    else {
        return (
            <>
                <NavBar />
                <LoginForm />
            </>
        )
    }
}

export default Login;