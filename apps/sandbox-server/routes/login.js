const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* POST google login callback */
router.post('/google/cb', async (req, res, next) => {

    console.log('Received PöOST from Google: ' + JSON.stringify(req.body, null, 4));

    // validate the inter site ID token: must have a cooky and a field in body with same value.
    // cookie and field name is g_csrf_token

    const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    // okay ... now we have a ticket !
    console.log(`Ticket received after verification: ${JSON.stringify(ticket, null, 4)}`);

    // let's examine the payload to get the user information
    const payload = ticket.getPayload();
    
    // this correspond to GoogleUserProfile type in the @hironico/react-social components
    // but can be personalized to adapt to your need.
    const userInfo = {
        sub: payload['sub'],
        email: payload['email'],
        email_verified: payload['email_verified'],
        name: payload['name'],
        given_name: payload['given_name'],
        picture_url: payload['picture_url'],
        locale: ''
    }

    console.log(`After verify token we have paylod: ${JSON.stringify(payload, null, 4)}`);

    // let's put this user info into the session and voila !
    if (!req.session.auth) {
        req.session.auth = {
            google: userInfo
        }
    } else {
        req.session.auth['google'] = userInfo
    }
    
    // redirect to our homne page so that the app will query the server to get user info that is in the session.
    res.redirect('/');
});

router.get('/google', function(req, res,next) {
    // no session or no auth in the session ? then nmust auth first
    if (!req?.session?.auth) {
        res.status(401).end();
        return;
    }

    res.status(200).send(req.session.auth.google).end();
});

router.post('facebook/cb', (req, res, next) => {
    console.log('Facebook callback with body: ' + JSON.stringify(req.body, null, 4));
});

module.exports = router;