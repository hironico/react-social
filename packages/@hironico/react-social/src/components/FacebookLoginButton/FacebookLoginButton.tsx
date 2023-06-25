/// <reference path="../../@types/global.d.ts" />

import React, { useEffect, useState } from 'react';
import { useFacebookProfile, useLoadGsiScript, useLoginContext, UseLoadGsiScriptOptions } from '../../hooks';

export interface FacebookProfilePictureData {
    widht: number;
    height: number;
    is_silhouette: boolean;
    url: string;
}

export interface FBProfilePicture {
    data: FacebookProfilePictureData;
}

export interface FacebookPublicProfile {
    id: number;
    first_name: string | null | undefined;
    last_name: string | null | undefined;
    middle_name: string | null | undefined;
    name: string;
    name_format: string | null | undefined;
    picture: FBProfilePicture | null | undefined;
    short_name: string | null | undefined;
    email: string | null | undefined;
}

export interface FacebookLoginProperties {
    appId: string;
    apiVersion: string;
    errorCallback: (message: string) => void;
}

export interface FacebookLoginStatusResponse {
    status: FacebookLoginStatus;
    authResponse: FacebookUserToken;
}

export interface FacebookUserToken {
    accessToken: string;
    expiresIn: number;
    reauthorize_required_in: number;
    signedRequest: string;
    userID: number;
    graphDomain: string;
    data_access_expiration_time: number;
}

export type FacebookLoginStatus = 'connected' | 'not_authorized' | 'unknown';

export default function FacebookLoginButton(props: FacebookLoginProperties) {
      
    const { appId, apiVersion, errorCallback } = props;

    const [ connected, setConnected ] = useState<boolean>(false);
    
    const { facebook, facebookAcessToken, saveFacebook, saveFacebookAccessToken } = useLoginContext();

    const loginStatusChangeCallback = (status: FacebookLoginStatusResponse) => {
        console.log('FB Login status change callback says : ' + JSON.stringify(status));        
        if (status.authResponse) {
            if (status.authResponse.accessToken !== facebookAcessToken?.accessToken) {
                saveFacebookAccessToken(status.authResponse);
            }
        } else {
            saveFacebookAccessToken(undefined!);
            saveFacebook(undefined!);
        }
        setConnected(status.status === 'connected');
    }

    const onScriptLoadSuccess = () => {
        console.log('Facebook SDK script load SUCCESS!');

        try {
            console.log('after facebook sdk load, now checking login status...');
            FB.getLoginStatus(response => loginStatusChangeCallback(response));

        } catch (error) {
            console.error(error);
            if (errorCallback) errorCallback(JSON.stringify(error));
        }
    }

    const initFB = () => {
        if (typeof FB !== 'undefined') {
            FB.init({
                appId      : appId,
                status     : false,
                cookie     : false,  // enable cookies to allow the server to access the session
                xfbml      : true,  // parse social plugins on this page
                version    : apiVersion // Specify the Graph API version to use
            });
        }
    }

    useEffect(() => {
        if (!facebook) {
            console.log('Now rendering the fb button');
            const fbBtnDiv = document.getElementById('fbButtonDiv');
            if (fbBtnDiv) {
                console.log('inserting fb login button into div...');
                fbBtnDiv.innerHTML = '<fb:login-button size="large" autologoutlink£="true" usecontinueas="true" scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>';

                initFB();
            } else {
                console.log('Could not find facebook button div to render button');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ facebook ]);

    useEffect(() => {
        if (!appId || !apiVersion) {
            return;
        }

        if ((window as any).fbAsyncInit) {
            return;
        }        

        console.log('Setting Facebook async init...');                   
        (window as any).fbAsyncInit = () => {
            initFB();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ appId, apiVersion ]);    

    const opts: UseLoadGsiScriptOptions = {
        scriptUrl: 'https://connect.facebook.net/en_US/sdk.js',
        onScriptLoadSuccess: onScriptLoadSuccess,
        onScriptLoadError: errorCallback
    }    
    useLoadGsiScript(opts);

    (window as any).checkLoginState = () => {
        console.log('Checking login status from FB login button');
        FB.getLoginStatus(response => loginStatusChangeCallback(response));
    }

    useFacebookProfile({ connected, errorCallback });

    return (
        <div id="fbButtonDiv">
        </div>
    );
};
