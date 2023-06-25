import { useEffect } from "react";
import useLoginContext from "./useLoginContext";
import { GoogleUserProfile, UseGoogleProfileOptions } from "../components/GoogleLoginButton/GoogleLoginButton";

export default function useGoogleProfile(options: UseGoogleProfileOptions): void {

  const { errorCallback } = options;
  const { googleAccessToken, saveGoogle } = useLoginContext();

  useEffect(() => {
    if (googleAccessToken === null) {
      return;
    }

    console.log('UseEffect with non null userToken.');

    fetch('https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${googleAccessToken.access_token}` } }
    ).then(response => response.json())
      .then(profile => {
        saveGoogle(profile as GoogleUserProfile);
      }) 
      .catch(error => errorCallback(JSON.stringify(error)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleAccessToken]);
}