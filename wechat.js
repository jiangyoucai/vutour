import account from './account.js'
import init from './init.js'
import request from './request.js'

class Wechat {
  // signin
  signin() {
    const device = init.checkDevice();
    const mobile = init.checkMobile();
    const code = init.getQuery('code');
    // 微信登录
    if (code !== undefined) {
      const data = {
        url: 'api url path',
        login: false,
        method: 'post',
        body: {code: code, platform: device ? '0' : '1'}
      };
      request.handle(data).then(function(result) {
        if (result !== undefined) {
          account.set(result);
          window.location.href = mobile ? '/user' : '/manage/news';
        }
      });
      return;
    }
    // 微信授权
    return device ? this.h5() : this.pc();
  }

  // pc
  pc() {
    let appid = 'set your web appid';
    window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?' +
        'appid=' + appid + '&redirect_uri=' + init.getURL() +
        '&response_type=code' +
        '&scope=snsapi_login' +
        '&state=STATE#wechat_redirect';
  }

  // h5
  h5() {
    let appid = 'set your wap appid';
    window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?' +
        'appid=' + appid + '&redirect_uri=' + init.getURL() +
        '&response_type=code' +
        '&scope=snsapi_userinfo' +
        '&state=STATE#wechat_redirect';
  }
}

const wechat = new Wechat();
export default wechat