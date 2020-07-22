import 'whatwg-fetch'
import account from './account.js'
import init from './init.js'
import tool from './tool.js'
/* global fetch:true */

class Request {
  // handle
  async handle(data) {
    try {
      const response = await this.request(data)
      const result = await response.json()
      tool.loader(false)
      if (data.show === undefined && result.code !== undefined) {
        tool.prompt(result.error)
      }
      return result.result
    } catch (e) {
      tool.loader(false)
      tool.prompt(e)
    }
  }

  // request
  request(data) {
    data.url = this.getURL(data)
    data.headers = this.getHeaders(data)
    data.body = this.getBody(data)
    tool.loader(true)
    return fetch(data.url, data)
  }

  // getURL
  getURL(data) {
    let host = data.host ? data.host : init.getOrigin();
    if (process.env.NODE_ENV !== 'production') {
      host = 'your host name'
    }
    return host + data.url
  }

  // getHeaders
  getHeaders(data) {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (data.login === true) {
      const user = account.check()
      headers.Authorization = 'Bearer ' + user.token
    }
    return headers
  }

  // getBody
  getBody(data) {
    return JSON.stringify(data.body)
  }
}

const request = new Request();
export default request;