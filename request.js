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
      const result = await response.json();
      tool.loader(false);
      if (data.show === undefined && result.code !== undefined) {
        tool.prompt(result.error);
      }
      return result.result;
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
    // host = "http://lab.heone.cn"
    data.url = host + data.url;
    return data;
  }

  // requestAuth
  requestAuth(data) {
    data.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
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
    data.body = JSON.stringify(data.body);
    return data;
  }
}

const request = new Request();
export default request