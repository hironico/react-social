import React, { useEffect, useState } from "react";
import { useLoadGsiScript, UseLoadGsiScriptOptions, useGoogleAccessToken, useGoogleProfile, useLoginContext} from "../../hooks";

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

export type GoogleUxMode = 'popup' | 'redirect';

export interface GoogleLoginProperties {
    clientId: string;
    buttonConfig: google.accounts.id.GsiButtonConfiguration;    
    errorCallback: (message: string) => void;

    uxMode?: GoogleUxMode;
    redirectUrl?: string; 
    userProfileUrl?: string; 
}

export default function GoogleLoginButton(props: GoogleLoginProperties) {
    const [ credential, setCredential] = useState<google.accounts.id.CredentialResponse>(null!);
    const { saveGoogle } = useLoginContext();

    const { clientId, buttonConfig, errorCallback } = props;

    const onScriptLoadSuccess = () => {
        if (props.uxMode === 'redirect' && props.userProfileUrl) {
            fetch(props.userProfileUrl)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => {
                console.log('Google user profile found if any: ' + JSON.stringify(data, null, 4));
                data === null ? renderGoogleLoginButton() : saveGoogle(data);
            });
        } else {
            renderGoogleLoginButton();
        }
    }

    const renderGoogleLoginButton = () => {
        console.log('Render Google Login button...');
        setCredential(null!);
        try {                        
            google.accounts.id.initialize({
                client_id: clientId,
                context: 'signin',
                callback: props.uxMode === 'redirect' ? null! : setCredential,
                itp_support: true,
                ux_mode: props.uxMode ? props.uxMode : 'popup',
                login_uri: props.redirectUrl
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

    // hook to rerender in case of change in the props
    useEffect(() => {
        console.log('Rerender google login button because props changed...');
        renderGoogleLoginButton();
    }, [props.uxMode, props.redirectUrl, props.userProfileUrl, props.clientId]);

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