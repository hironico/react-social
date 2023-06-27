# @hironico/react-social

@hironico/react-social is a React component library that simplifies the integration of social login buttons for major login providers on the Internet such as Google, Facebook, ...

The goals of this project are : 
- speed up the time to implement social login for react apps
- provide a template application as a boilerplate for starting a new project.

## Supported login providers

The two major login providers are supported. Howwever, @hironico/react-social is designed to welcome as many provider as needed.

Currently supported providers:

- Google
- Facebook

More will be added in the future to cover the majority of desktop and mobile users.

## Supported Platforms

### Browser

@hironico/react-social supports the latest, stable releases of all major browsers and platforms. IE<=10 is not supported. @hironico/react-social is designed and implemented for use on modern browsers either on desktop or mobile platforms.

| Edge | Firefox | Chrome | Safari |
| ---- | ------- | ------ | ------ |
| >=14 | >= 45   | >= 49  | >= 10  |

## Supported development environment

- Supports React 18 +
- Supports [TypeScript](http://www.typescriptlang.org/)

## Installation

@hironico/react-social is available as an [npm package][npm-home].

```bash
npm install --save @hironico/react-social
```

or if you prefer Yarn

```bash
yarn add @hironico/react-social
```

## Usage

Note: you can support multiple social login providers at the same time ! This allows to link user accounts and their corresponding social profiles in your application.

### Sandbox

Checkout the app folder for a sandbox application that demonstrates how to integrate social logins for an app.

You must create a .env file (see .env-sample) that will contain your app IDs for the login providers (Google, Facebook). 

### Add a context and place login buttons

Create a social login context for your react application in index.tsx file:

```jsx
... 

import { FacebookPublicProfile, FacebookUserToken, GoogleUserProfile, LoginInfo, LoginProvider } from '@hironico/react-social';

...

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
```
Then place login buttons somewhere on your welcome or login page that resides within the context tree:

```jsx
...

<GoogleLoginButton clientId={clientId} errorCallback={errorCallback} buttonConfig={btnConfig} />
<FacebookLoginButton appId={fbAppId} errorCallback={errorCallback} apiVersion="v17.0" />

...
```

## License

@hironico/react-social is [MIT licensed][LICENSE]. Copyright (c) 2023-present, hironico.net.

[npm-home]: https://www.npmjs.com/package/@hironico/react-social
[LICENSE]: https://github.com/hironico/react-social/blob/main/packages/%40hironico/react-social/LICENSE