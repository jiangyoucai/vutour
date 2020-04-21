import LocalStorage from 'store'
import store from '../store.js'
import init from './init.js'
import wechat from './wechat.js'

class Account {
  // 检查
  check() {
    const account = this.get();
    if (account !== undefined) {
      return account;
    }
    const device = init.checkDevice();
    if (!device) {
      window.location.href = '/login?path=' + init.getPath();
      return;
    }
    // 微信登录
    return wechat.signin();
  }

  // 读出
  get() {
    let account = store.state.account;
    if (account.token !== undefined) {
      return account;
    }
    account = this.LocalStorageX.get('account');
    if (account !== undefined) {
      store.commit('signin', account);
      return account;
    }
    return;
  }

  // 写入
  set(data) {
    store.commit('signin', data);
    this.LocalStorageX.set('account', data, 7 * 24 * 3600 * 1000);
  }

  // 删除
  del() {
    store.commit('signout');
    LocalStorage.remove('account');
  }

  // 超时
  LocalStorageX = {
    set: function(key, val, exp) {
      LocalStorage.set(key, {val: val, exp: exp, time: new Date().getTime()});
    },
    get: function(key) {
      const info = LocalStorage.get(key);
      if (!info) {
        return;
      }
      if (new Date().getTime() - info.time > info.exp) {
        return;
      }
      return info.val;
    }
  }
}

const account = new Account();
export default account