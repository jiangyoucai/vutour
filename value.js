import LocalStorage from 'store'

class Value {
  // get
  get(key) {
    return LocalStorage.get(key);
  }

  // set
  set(key, value) {
    LocalStorage.set(key, value, 24 * 60 * 60 * 1000);
  }

  // del
  del(key) {
    LocalStorage.remove(key);
  }
}

const value = new Value();
export default value