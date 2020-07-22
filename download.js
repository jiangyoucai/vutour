import 'whatwg-fetch'
import init from './init.js'
import tool from './tool.js'
/* global fetch:true */

class Download {
    // handle
    async handle(data) {
        try {
            const response = await this.request(data);
            const result = await response.json();
            tool.loader(false);
            return result;
        } catch (e) {
            tool.loader(false);
            tool.prompt(e);
        }
    }

    // request
    request(data) {
        data = this.getURL(data);
        data = this.getBody(data);
        tool.loader(true);
        return fetch(data.url, data);
    }

    // getURL
    getURL(data) {
        let host = data.host ? data.host : init.getOrigin();
        if (process.env.NODE_ENV !== 'production') {
            host = 'your host name'
        }
        return host + data.url;
    }

    // getBody
    getBody(data) {
        return JSON.stringify(data.body);
    }
}

const download = new Download();
export default download