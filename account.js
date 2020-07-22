import LocalStorage from 'store'
import store from '../store.js'
import init from './init.js'
import wechat from './wechat.js'

class Account {
  // check account
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
    return wechat.signin();
  }

  // get account
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

  // set account
  set(data) {
    store.commit('signin', data);
    this.LocalStorageX.set('account', data, 7 * 24 * 3600 * 1000);
  }

  // delete account
  del() {
    store.commit('signout');
    LocalStorage.remove('account');
  }

  LocalStorageX = {
    set: function (key, val, exp) {
      LocalStorage.set(key, {
        val: val,
        exp: exp,
        time: new Date().getTime(),
      });
    },
    get: function (key) {
      const info = LocalStorage.get(key);
      const now = new Date().getTime();
      if (info.time + info.exp > now) {
        return info.val;
      }
      return;
    }
  }
}

const account = new Account();
export default account