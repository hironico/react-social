import React from 'react';
import './App.css';
import { FacebookLoginButton, FacebookLogoutButton, GoogleLoginButton, GoogleLogoutButton, useLoginContext } from '@hironico/react-social';
import logo from './logo.svg';


function App() {

  const { google, facebook } = useLoginContext();

  // client and app id come form .env file and are statically set into the app at build time.
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? 'CHANGE_ME_IN_ENV_FILE';
  const fbAppId = process.env.REACT_APP_FACEBOOK_APP_ID ?? 'CHANGE_ME_IN_ENV_FILE';

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
    const userInfoPanel = <div>
      <img src={google?.picture} alt="google-profile" />
      <h3>{google?.name}</h3>
      <p>{google?.email}</p>
      <p><GoogleLogoutButton /></p>
    </div>

    const loginButton = <GoogleLoginButton clientId={clientId} errorCallback={errorCallback} buttonConfig={btnConfig} />

    const panel = google ? userInfoPanel : loginButton;

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
