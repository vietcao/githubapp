import config from 'config';
import 'babel-polyfill';

import {
    APPLICATION_JSON,
} from '../constants/common.constant';

const defaultHeaders = {
    Accept: APPLICATION_JSON,
    Authorization: 'token ff796112ad610ffa85bd9d458f49f362f6600a9a'
};

const request = async (endpoint, method, body, headers = defaultHeaders, absolutedEndpoint = false) => { // eslint-disable-line max-len
    let url = endpoint;
    if (!absolutedEndpoint) {
        url = config.API_HOST + endpoint;
    }

    const response = await fetch(url, {
        method,
        headers,
        body,
    });

    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
    }

    const json = await response.json();
    const linkHeader = response.headers.get('Link');
    return {
        'data': json,
        'linkHeader': linkHeader
    };
};

export const get = (endpoint, body, headers = defaultHeaders, absolutedEndpoint = false, fixedHeader = false) => {
    let url = endpoint;
    if (body) {
        const paramsStr = Object.entries(body)
        .map(
            pair => pair.map(encodeURI).join('=')
        )
        .join('&');
        url = `${endpoint}?${paramsStr}`;
    }
    return request(url, 'GET', null, headers, absolutedEndpoint, fixedHeader);
};

export default {
    get
};
