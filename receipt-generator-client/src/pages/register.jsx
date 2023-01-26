import NavBar from "./components/navBar";
import { useIsAuthenticated } from 'react-auth-kit';
import { redirect } from "react-router-dom";
import RegisterForm from "./forms/registerForm";


function Register () {
    const isAuthenticated = useIsAuthenticated();
    if (!isAuthenticated) {
        return redirect ("/");
    }
    else {
        return (
            <>
                <NavBar />
                <RegisterForm />
            </>
        )
    }
}

export default Register;