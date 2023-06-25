import React, { useState } from "react";
import { useLoadGsiScript, UseLoadGsiScriptOptions, useGoogleAccessToken, useGoogleProfile} from "../../hooks";

export interface UseGoogleAccessTokenOptions {
    clientId: string,
    clientToken: google.accounts.id.CredentialResponse,
    errorCallback: (message: string) => void
}

export interface GoogleUserProfile {
    "sub": number;
    "name": string;
    "given_name": string;
    "picture": string,
    "email": string,
    "email_verified": boolean;
    "locale": string;
}

export interface UseGoogleProfileOptions {
    errorCallback: (message: string) => void;
}

export interface GoogleLoginProperties {
    clientId: string;
    buttonConfig: google.accounts.id.GsiButtonConfiguration;
    errorCallback: (message: string) => void;
}


export default function GoogleLoginButton(props: GoogleLoginProperties) {
    const [ credential, setCredential] = useState<google.accounts.id.CredentialResponse>(null!);

    const { clientId, buttonConfig, errorCallback } = props;

    const onScriptLoadSuccess = () => {
        console.log('GSI client script load SUCCESS!');

        try {                        
            google.accounts.id.initialize({
                client_id: clientId,
                context: 'signin',
                callback: setCredential,
                itp_support: true
            });

            const buttonDiv = document.getElementById('buttonDiv');
            if (buttonDiv === null) {
                const err = 'Cannot render Google button since buttonDiv not found !';
                console.error(err);
                if (errorCallback) errorCallback(err);
                return;
            }

            google.accounts.id.renderButton(                                
                buttonDiv,
                buttonConfig  
            );

            google.accounts.id.prompt(); // also display the One Tap dialog
        } catch (error) {
            console.error(error);
            if (errorCallback) errorCallback(JSON.stringify(error));
        }
    }

    const opts: UseLoadGsiScriptOptions = {
        scriptUrl: 'https://accounts.google.com/gsi/client',
        onScriptLoadSuccess: onScriptLoadSuccess,
        onScriptLoadError: errorCallback
    }    
    useLoadGsiScript(opts);

    const options: UseGoogleAccessTokenOptions = {
        clientId: clientId,
        clientToken: credential,
        errorCallback: errorCallback
    }
    useGoogleAccessToken(options);

    const profileOptions: UseGoogleProfileOptions = { errorCallback }
    useGoogleProfile(profileOptions);  

    return (
        <React.Fragment>
            <div id="buttonDiv"></div>
        </React.Fragment>
    )

}