declare namespace FB {
    interface FBInitConfig {
        appId: string;
        cookie: boolean;
        status: boolean;
        xfbml: boolean;
        version: string;
        oauth?: boolean;
    }
    
    interface FBLoginStatusResponse {
        status: FBLoginStatus;
        authResponse: FBUserToken;
    }

    interface FBUserToken {
        accessToken: string;
        expiresIn: number;
        reauthorize_required_in: number;
        signedRequest: string;
        userID: number;
        graphDomain: string;
        data_access_expiration_time: number;
    }
    
    type FBLoginStatus = 'connected' | 'not_authorized' | 'unknown';

    function init(config: FBInitConfig): void;

    function getLoginStatus(callback: (response: FBLoginStatusResponse) => void): void;

    function api(path: string, callback: (response: any) => void): void;

    function login(callback: (response: any) => void): void;

    function logout(callback: (response: any) => void): void;
}
