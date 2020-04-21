import 'whatwg-fetch'
import init from './init.js'
import tool from './tool.js'
/* global fetch:true */
/* global FormData:true */

class Upload {
  // handle
  async handle(data) {
    try {
      const response = await this.requests(data);
      const result = await response.json();
      tool.loader(false);
      if (data.show === undefined && result.MsgCode !== 'OK') {
        tool.prompt(result.MsgCode);
      }
      return result.Content;
    } catch (e) {
      tool.loader(false);
      tool.prompt(e);
    }
  }

  // request
  requests(data) {
    data = this.requestHost(data);
    data = this.requestData(data);
    tool.loader(true);
    return fetch(data.url, data);
  }

  // requestHost
  requestHost(data) {
    let host = init.getOrigin();
    if (process.env.NODE_ENV !== 'production') {
      host = init.getOrigin();
    }
    data.url = host + data.url;
    return data;
  }

  // requestData
  requestData(data) {
    const formData = new FormData();
    formData.append('file', data.body);
    data.body = formData;
    return data;
  }
}

const upload = new Upload();
export default upload