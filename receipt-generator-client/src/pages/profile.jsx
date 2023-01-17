import React from "react";
import NavBar from "./components/navBar";
import { useAuthUser } from 'react-auth-kit'

function Profile() {
    const auth = useAuthUser()
    console.log(auth());
    return (
        <>
            <NavBar />
        </>
    )
}
export default Profile;