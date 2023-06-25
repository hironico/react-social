import React, { PropsWithChildren, useState } from "react";
import { FacebookPublicProfile, FacebookUserToken } from "../components/FacebookLoginButton/FacebookLoginButton";
import { GoogleUserProfile } from "../components/GoogleLoginButton/GoogleLoginButton";

export interface LoginInfo {
    google: GoogleUserProfile| null;
    googleAccessToken: google.accounts.oauth2.TokenResponse | null;    
    saveGoogle: (g: GoogleUserProfile) => void;
    saveGoogleAccessToken: (t: google.accounts.oauth2.TokenResponse) => void;

    facebook: FacebookPublicProfile | null;
    facebookAcessToken: FacebookUserToken | null,
    saveFacebook: (fb: FacebookPublicProfile) => void,
    saveFacebookAccessToken: (t: FacebookUserToken) => void
}

export const defaultLoginInfo: LoginInfo = {
    google: null,
    googleAccessToken: null,    
    saveGoogle: (_g: GoogleUserProfile) => {},
    saveGoogleAccessToken: (_t: google.accounts.oauth2.TokenResponse) => {},

    facebook: null,
    facebookAcessToken: null,
    saveFacebook: (_fb: FacebookPublicProfile) => {},
    saveFacebookAccessToken: (_t: FacebookUserToken) => {}
}

export const LoginContext = React.createContext<LoginInfo>(defaultLoginInfo);

export const LoginProvider = ({children, google, googleAccessToken, facebook, facebookAcessToken} : PropsWithChildren<LoginInfo>) => {
    const [ g, saveGoogle ] = useState<GoogleUserProfile | null>(google || defaultLoginInfo.google);
    const [ gat, saveGoogleAccessToken ] = useState<google.accounts.oauth2.TokenResponse | null>(googleAccessToken || defaultLoginInfo.googleAccessToken);
    const [ fb, saveFacebook ] = useState<FacebookPublicProfile | null>(facebook || defaultLoginInfo.facebook);
    const [ fbat, saveFacebookAccessToken ] = useState<FacebookUserToken | null>(facebookAcessToken || defaultLoginInfo.facebookAcessToken);

    return (
        <LoginContext.Provider value={{ 
                google: g, googleAccessToken: gat, 
                facebook: fb, facebookAcessToken: fbat, 

                saveGoogle, saveGoogleAccessToken, 
                saveFacebook, saveFacebookAccessToken}}>
            {children}
        </LoginContext.Provider>
    );
};

export const LoginConsummer = LoginContext.Consumer;

export default LoginContext;

