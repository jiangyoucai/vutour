import 'whatwg-fetch'
import account from './account.js'
import init from './init.js'
import tool from './tool.js'
/* global fetch:true */

class Request {
  // handle
  async handle(data) {
    try {
      const response = await this.requests(data);
      let result = await response.json()
      tool.loader(false);
      if (data.show === undefined && result.qry !== "ok") {
        tool.prompt(result.error);
      }
      return result.recs;
    } catch (e) {
      tool.loader(false);
      tool.prompt(e);
    }
  }

  // requests
  requests(data) {
    data = this.requestHost(data);
    data = this.requestAuth(data);
    data = this.requestData(data);
    tool.loader(true);
    return fetch(data.url, data);
  }

  // requestHost
  requestHost(data) {
    let host = init.getOrigin();
    // host = "http://zz.heone.cn" 
    data.url = host + data.url;
    return data;
  }

  // requestAuth
  requestAuth(data) {
    data.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    if (data.login === true) {
      const user = account.check();
      // if (data.bind === undefined && user.permission === undefined) {
      //   window.location.href = '/account/bind';
      // }
      data.headers.Authorization = 'Bearer ' + user.token;
    }
    return data;
  }

  // requestData
  requestData(data) {
    let body = [];
    for (const key in data.body) {
      let value = data.body[key];
      body.push(key + "=" + value);
    }
    data.body = body.join('&');
    return data;
  }
}

const seek = new Request();
export default seek