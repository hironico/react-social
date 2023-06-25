/// <reference path="../@types/global.d.ts" />

import { useEffect } from "react";
import useLoginContext from "./useLoginContext";
import { FacebookPublicProfile } from "../components/FacebookLoginButton/FacebookLoginButton";

export interface UseFacebookProfileOptions {
  connected: boolean;
  errorCallback: (message: string) => void;
}

export default function useFacebookProfile(options: UseFacebookProfileOptions) {
    const { connected, errorCallback } = options;
    const { facebookAcessToken, saveFacebook } = useLoginContext();

    useEffect(() => {
      if (!connected || typeof connected === 'undefined') {
          return;
      }

      if (typeof FB === 'undefined') {
        return;
      }

      try {
      FB.api('/me?fields=name,id,picture,email', response => {
          console.log('Successful login for: ' + JSON.stringify(response));
          const fbProfile: FacebookPublicProfile = response as FacebookPublicProfile;
          saveFacebook(fbProfile);
      });
    } catch (_error) {
      errorCallback('Problem while querying FB api to get profile info.');
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, facebookAcessToken]);
}