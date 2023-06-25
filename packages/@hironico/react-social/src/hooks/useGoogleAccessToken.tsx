import { useEffect } from "react";
import useLoginContext from "./useLoginContext";
import { UseGoogleAccessTokenOptions } from "../components/GoogleLoginButton/GoogleLoginButton";

export default function useGoogleAccessToken(options: UseGoogleAccessTokenOptions): void {
  const { clientId, clientToken, errorCallback } = options;

  const { saveGoogleAccessToken } = useLoginContext();

  useEffect(() => {
    if (clientToken === null || clientId === null) {
      return;
    }

    console.log('Use effect with non null client id and non null client token.');

    //let flow = 'implicit';
    //const clientMethod = flow === 'implicit' ? 'initTokenClient' : 'initCodeClient';
    let scope = '';

    const client = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: `openid profile email ${scope}`,
      prompt: 'none',
      callback: (response: google.accounts.oauth2.TokenResponse | google.accounts.oauth2.CodeResponse) => {
        response.error ? errorCallback(response.error) : saveGoogleAccessToken(response as google.accounts.oauth2.TokenResponse);
      },
      error_callback: (nonOAuthError: google.accounts.oauth2.ClientConfigError) => {
        errorCallback(nonOAuthError.message);
      }
    });

    client.requestAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientToken, clientId]);
}