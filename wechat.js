import init from './init.js'
import account from './account.js'
import request from './request.js'

class Wechat {
  // signin
  signin() {
    const device = init.checkDevice()
    const mobile = init.checkMobile()
    const code = init.getQuery('code')

    if (code === undefined) {
      return device ? this.wap() : this.web()
    }

    const data = {
      url: '/v4/account/signin/wechat',
      login: false,
      method: 'post',
      body: {
        code: code,
        channel: mobile ? 'your appid' : 'your appid',
        number: account.get() ? account.get().number : 0
      }
    }
    request.handle(data).then(function (result) {
      if (result !== undefined) {
        account.set(result)
        const path = mobile ? '/user' : '/'
        window.location.href = path
      }
    })
    return;
  }

  // wap
  wap() {
    const appid = 'your appid'
    const path = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
      'appid=' + appid +
      '&redirect_uri=' + init.getURL() +
      '&response_type=code' +
      '&scope=snsapi_userinfo' +
      '&state=STATE#wechat_redirect'
    return window.location.href = path;
  }

  // web
  web() {
    const appid = 'your appid'
    const path = 'https://open.weixin.qq.com/connect/qrconnect?' +
      'appid=' + appid +
      '&redirect_uri=' + init.getURL() +
      '&response_type=code' +
      '&scope=snsapi_login' +
      '&style=white' +
      '&href=https://www.tiantour.com/wechat.css' +
      '&state=STATE#wechat_redirect'
    return window.location.href = path;
  }
}

const wechat = new Wechat();
export default wechat