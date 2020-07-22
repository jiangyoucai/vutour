import tool from './tool.js'

class Verify {
  // email
  email(data) {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(data)) {
      tool.prompt('邮箱有误');
      return false;
    }
    return true;
  }

  // phone
  phone(data) {
    const reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (!reg.test(data)) {
      tool.prompt('号码有误');
      return false;
    }
    return true;
  }

  // password
  password(data) {
    if (data.length < 6) {
      tool.prompt('密码过短');
      return false;
    }
    return true;
  }

  // sms
  sms(data) {
    const reg = /^\d{6}$/;
    if (!reg.test(data)) {
      tool.prompt('验证码有误');
      return false;
    }
    return true;
  }

  // host
  host(data) {
    const reg = /[a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9]/i;
    if (!reg.test(data)) {
      tool.prompt('域名有误');
      return false;
    }
    return true;
  }

  // url
  url(data) {
    const reg =
      /https?:\/\/[a-z0-9_.:]+\/[-a-z0-9_:@&?=+,.!/~*%$]*(\.(html|htm|shtml))?/;
    if (!reg.test(data)) {
      tool.prompt('链接有误');
      return false;
    }
    return true;
  }

  // required
  required(data) {
    if (data !== '') {
      return true;
    }
    tool.prompt('输入空数据');
    return false;
  }

  // card
  card(data) {
    const reg =
      /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|x|X)$/;
    if (!reg.test(data)) {
      tool.prompt('身份证有误');
      return false;
    }
    return true;
  }

  // passport
  passport(data) {
    const reg = /^[a-zA-Z0-9]{3,21}$/;
    if (!reg.test(data)) {
      tool.prompt('护照有误');
      return false;
    }
    return true;
  }
}

const verify = new Verify();
export default verify