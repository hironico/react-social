import React, { useState } from 'react';
import './App.css';
import { FacebookLoginButton, FacebookLogoutButton, GoogleLoginButton, GoogleLogoutButton, useLoginContext, GoogleUxMode } from '@hironico/react-social';
import logo from './logo.svg';


function App() {

  const { google, facebook } = useLoginContext();

  // client and app id come form .env file and are statically set into the app at build time.
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? 'CHANGE_ME_IN_ENV_FILE';
  const googleRedirectUrlParam = process.env.REACT_APP_GOOGLE_REDIRECT_URL ?? 'CHANGE_ME_IN_ENV_FILE';
  const googleUserProfileUrlParam = process.env.REACT_APP_GOOGLE_USER_PROFILE_URL ?? 'CHANGE_ME_IN_ENV_FILE';
  const fbAppId = process.env.REACT_APP_FACEBOOK_APP_ID ?? 'CHANGE_ME_IN_ENV_FILE';

  const [ googleUxMode, setGoogleUxMode ] = useState<GoogleUxMode>('popup' as GoogleUxMode);
  const [ googleRedirectUrl, setGoogleRedirectUrl ] = useState<string>(googleRedirectUrlParam);
  const [ googleUserProfileUrl, setGoogleUserProfileUrl ] = useState<string>(googleUserProfileUrlParam);

  // customization attributes for displaying the Google Sign In button
  const btnConfig: google.accounts.id.GsiButtonConfiguration = {
    theme: "outline",
    size: "large",
    type: 'standard'
  };

  const errorCallback = (errMessage: string) => {
    alert(errMessage);
  }

  const renderGooglePanel = () => {

    console.log('Googgle ux mode is: ' + googleUxMode);
    console.log('Google redirect url: ' + googleRedirectUrl);
    console.log('Google user profile url: ' + googleUserProfileUrl);

    const googleOptionForm = <form className='optionform'>
      <label htmlFor="googleClientId">Google client ID:</label>
      <input id="googleClientId" value={clientId} readOnly placeholder='Google client ID' />

      <label htmlFor='googleUxMode'>Ux Mode (default 'popup' or 'redirect'):</label>
      <select id="googleUxMode" name="GoogleUxMode" onChange={(evt) => setGoogleUxMode(evt.target.value as GoogleUxMode)} defaultValue={'popup'}>
        <option id='popop' value={'popup'}>popup</option>
        <option id='redirect' value={'redirect'}>redirect</option>
      </select>

      { googleUxMode === 'redirect' && 
        <>
          <label htmlFor='googleRedirectUrl' style={{marginTop: '10px'}}>Redirect URL to receive ID token:</label>
          <input id="googleRedirectUrl" value={googleRedirectUrl} onChange={(evt) => setGoogleRedirectUrl(evt.target.value)} placeholder='Google redirect url to receive ID token'/>
          <label htmlFor='googleUserProfileUrl'>URL to retreive user profile given to server:</label>
          <input id="googleUserProfileUrl" value={googleUserProfileUrl} onChange={(evt) => setGoogleUserProfileUrl(evt.target.value)} placeholder='Google user profile retreival url'/>
        </>
      }      
    </form>

    const loginPanel = <div className='loginPanel'>
      {googleOptionForm}
      <GoogleLoginButton clientId={clientId} uxMode={googleUxMode} redirectUrl={googleRedirectUrl} userProfileUrl={googleUserProfileUrl} errorCallback={errorCallback} buttonConfig={btnConfig} />
    </div>

    const userInfoPanel = <div>
      <img src={google?.picture} alt="google-profile" />
      <h3>{google?.name}</h3>
      <p>{google?.email}</p>
      <p><GoogleLogoutButton /></p>
    </div>

    const panel = google ? userInfoPanel : loginPanel;

    return panel;
  }

  const renderFacebookPanel = () => {
    const userInfoPanel = <div>
      <img src={facebook?.picture?.data.url} alt="facebook-profile" />
      <h3>{facebook?.name}</h3>
      <p>{facebook?.email}</p>
      <p><FacebookLogoutButton /></p>
    </div>

    const loginButton = <FacebookLoginButton appId={fbAppId} errorCallback={errorCallback} apiVersion="v17.0" />

    const panel = facebook ? <> {loginButton} {userInfoPanel} </> : loginButton;

    return panel;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>hironico</code>'s template for typescript React App with social login.<br/>
          <small>(You may have to allow popup windows in order to display social login dialogs)</small>
        </p>

        <div className="all-provider-container">
          
          <div className='provider-container'>
            {renderGooglePanel()}
          </div>

          <div className="provider-container">
            {renderFacebookPanel()}
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
