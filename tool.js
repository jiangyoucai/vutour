import store from '../store.js';

import init from './init.js'
import value from './value.js'

class Tool {
  // prompt
  prompt(message) {
    store.commit('prompt', {message: message, status: true});
    setTimeout(function() {
      store.commit('prompt', {status: false});
    }, 2000);
  }

  // loader
  loader(status) {
    store.commit('loader', status);
  }

  // pay
  pay(id, price, path) {
    value.set('pay', {id: id, price: price, path: path});
    let uri = '/pay/alipay';
    if (init.checkDevice()) {
      uri = '/pay/wxpay';
    }
    return uri;
  }
}

const tool = new Tool();
export default tool