import LocalStorage from 'store'

class Init {
  env() {
    if (!this.checkStore()) {
      return '请关闭隐私模式或更换浏览器';
    }

    if (!this.checkBroswer()) {
      return '请更换浏览器或使用微信查看';
    }
    return;
  }

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

  // getURL
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

  // getPath
  getPath() {
    return window.location.pathname;
  }

  // getSearch
  getSearch() {
    return window.location.search;
  }

  // getQuery
  getQuery(key) {
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
    const result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : undefined;
  }
}

const init = new Init();
export default init