import 'whatwg-fetch'
import init from './init.js'
import tool from './tool.js'
/* global fetch:true */
/* global FormData:true */

class Upload {
  // handle
  async handle(data) {
    try {
      const response = await this.request(data);
      const result = await response.json();
      tool.loader(false);
      if (data.show === undefined && result.code !== undefined) {
        tool.prompt(result.error)
      }
      return result.result
    } catch (e) {
      tool.loader(false);
      tool.prompt(e);
    }
  }

  // request
  request(data) {
    data.url = this.getURL(data)
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

  // getBody
  getBody(data) {
    const form = new FormData();
    form.append("file", data.body.file);
    form.append("path", data.body.path);
    form.append("prefix", data.body.prefix);
    return form;
  }
}

const upload = new Upload();
export default upload