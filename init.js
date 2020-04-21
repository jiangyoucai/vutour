import LocalStorage from 'store'

import account from './account.js'
import value from './value.js'

class Init {
  // checkStore
  checkStore() {
    if (!LocalStorage.enabled) {
      return false;
    }
    return true;
  }

  // checkBroswer
  checkBroswer() {
    const ua = navigator.userAgent;
    const platform = ua.indexOf('Android');
    const browser = ua.indexOf('UCBrowser');
    if (platform > -1 && browser > -1) {
      return false;
    }
    return true;
  }

  // checkDevice
  checkDevice() {
    const ua = navigator.userAgent;
    return /MicroMessenger/.test(ua);
  }

  // checkMobile
  checkMobile() {
    const ua = navigator.userAgent;
    if (ua.match(/(iPhone|iPad|Android|ios)/i)) {
      return true;
    }
    return false;
  }

  // checkVersion
  checkVersion() {
    const version = 3;
    if (value.get('version') !== version) {
      value.set('version', version);
      account.del();
    }
  }


  // getHref
  getURL() {
    return window.location.href;
  }

  // getOrigin
  getOrigin() {
    return window.location.origin;
  }

  // getHost
  getHost() {
    return window.location.host;
  }

  // getURL
  getPath() {
    return window.location.pathname;
  }

  // getURL
  getSearch() {
    return window.location.search;
  }

  // getQuery
  getQuery(key) {
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
    const result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : undefined;
  }

  // 初始化
  env() {
    let message;
    if (!this.checkStore()) {
      message = '请关闭隐私模式或更换浏览器';
    }
    if (!this.checkBroswer()) {
      message = '请更换浏览器或使用微信查看';
    }
    this.checkVersion();
    return message;
  }
}

const init = new Init();
export default init