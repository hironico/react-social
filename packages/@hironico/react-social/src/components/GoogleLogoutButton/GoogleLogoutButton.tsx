import React from "react";
import { useLoginContext } from "../../hooks";
import { GoogleUxMode } from "../GoogleLoginButton/GoogleLoginButton";

export interface GoogleLogoutButtonProperties {
    uxMode?: GoogleUxMode
}

export default function GoogleLogoutButton(props: GoogleLogoutButtonProperties) {

    const { saveGoogle, saveGoogleAccessToken } = useLoginContext();

    const clearGoogleContext = () => {
        saveGoogle(null!);
        saveGoogleAccessToken(null!);
    }

    const handleGoogleLogout = () => {
        if (props.uxMode === 'redirect') {
            fetch('https://home.hironico.net:3000/logout/', {
                method: 'POST'
            })
                .then(response => {
                    if (response.status === 200) {
                        clearGoogleContext();
                    } else {
                        console.log('Problem while logout!');
                    }
                });
        } else {
            clearGoogleContext();
        }
    }

    return (
        <button onClick={(_evt) => handleGoogleLogout()}>Logout</button>
    );
}