import NavBar from "./components/navBar";
import LoginForm from "./forms/loginForm";
import { useIsAuthenticated } from 'react-auth-kit';
import { redirect } from "react-router-dom";



function Login () {
    const isAuthenticated = useIsAuthenticated();
    if (!isAuthenticated) {
        return redirect ("/");
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