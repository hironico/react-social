import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { FacebookPublicProfile, FacebookUserToken, GoogleUserProfile, LoginInfo, LoginProvider } from '@hironico/react-social';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const defaultLoginInfo: LoginInfo = {
  google: null,
  googleAccessToken: null,    
  saveGoogle: (_g: GoogleUserProfile) => {},
  saveGoogleAccessToken: (_t: google.accounts.oauth2.TokenResponse) => {},

  facebook: null,
  facebookAcessToken: null,
  saveFacebook: (_fb: FacebookPublicProfile) => {},
  saveFacebookAccessToken: (_t: FacebookUserToken) => {}
}

root.render(
  <React.StrictMode>
      <LoginProvider {...defaultLoginInfo}>
        <App />
      </LoginProvider>      
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
