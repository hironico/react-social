import { useLoginContext } from "../../hooks";
import React from "react";

export default function FacebookLogoutButton() {

    const {saveFacebook, saveFacebookAccessToken } = useLoginContext();

    const handleFacebookLogout = () => {
        FB.logout(response => console.log(JSON.stringify(response)));
        saveFacebook(null!);
        saveFacebookAccessToken(null!); 
    }

    return (
        <button onClick={(_evt) => handleFacebookLogout()}>Logout</button>
    );
}