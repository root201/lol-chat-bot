const fs = require('fs');
const path = require('path');
const axios = require('axios');
const _ = require('lodash');
const utils = require('../utils');
const secretConfig = require('../../secret/config.json');
const {
    LINE_TOKEN,
    LINE_TOKEN_EXPIRES_IN,
    LINE_CLIENT_ID,
    LINE_CLIENT_SECRET
} = secretConfig;

const channelAccessToken = {
    token: LINE_TOKEN,
    expires_in: LINE_TOKEN_EXPIRES_IN,
    get: async function() {
        const isExpired = Math.floor(Date.now() / 1000) >= this.expires_in;

        if (!this.token && isExpired) {
            await this.request();
        }

        return this.token;
    },
    request: async function() {
        console.log('request channel access token');
        try {
            let response = await axios({
                method: 'post',
                url: utils.createUrlQuery('https://api.line.me/v2/oauth/accessToken', {
                    grant_type: 'client_credentials',
                    client_id: LINE_CLIENT_ID,
                    client_secret: LINE_CLIENT_SECRET
                }),
                headers: {
                    'Content-type' : 'application/x-www-form-urlencoded'
                }
            });

            let { data, status } = response;

            if (status === 200) {
                console.log('have been invoked channel access token');
                this.token = data.access_token;
                this.expires_in = data.expires_in;

                const json = _.assign({}, secretConfig, {
                    LINE_TOKEN: this.token,
                    LINE_TOKEN_EXPIRES_IN: Math.floor(Date.now() / 1000) + this.expires_in
                });
                fs.writeFileSync(path.resolve(__dirname, '../../secret/config.json'), JSON.stringify(json), 'utf8');
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.data.error_description);
            } else {
                console.log(err.message);
            }
        }

        return this.token;
    }
}

module.exports = channelAccessToken;
