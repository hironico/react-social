import React from "react";
import { useLoginContext } from "../../hooks";

export default function GoogleLogoutButton() {

    const { saveGoogle, saveGoogleAccessToken } = useLoginContext();

    const handleGoogleLogout = () => {
        saveGoogle(null!);
        saveGoogleAccessToken(null!);
    }

    return (
        <button onClick={(_evt) => handleGoogleLogout()}>Logout</button>
    );
}