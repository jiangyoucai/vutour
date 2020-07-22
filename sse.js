import init from './init.js'
import tool from './tool.js'

class Sse {
  // handle
  async handle(data) {
    try {
      const response = await this.sse(data);
      const result = JSON.parse(response);
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

  // sse
  sse(data) {
    tool.loader(true);
    data.url = this.getURL(data);
    const source = new EventSource(data.url);
    return new Promise(function (resolve, reject) {
      source.addEventListener('error', function (e) {
        reject(e.data)
      }, false);
      source.addEventListener(data.channel, function (e) {
        resolve(e.data)
        source.close()
      }, false);
    })
  }

  // getURL
  getURL(data) {
    let host = init.getOrigin();
    if (process.env.NODE_ENV !== 'production') {
      host = init.getOrigin();
    }
    const unix = new Date().getTime()
    data.url = host + '/ssestream/' + data.channel + '?subscriber=' + unix;
    return data;
  }
}

const sse = new Sse();
export default sse