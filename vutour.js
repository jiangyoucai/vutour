import account from './account.js'
import download from './download.js'
import init from './init.js'
import request from './request.js'
import time from './time.js'
import tool from './tool.js'
import upload from './upload.js'
import value from './value.js'
import verify from './verify.js'
import wechat from './wechat.js'

const vutour = {
  account: account,
  download: download,
  init: init,
  request: request,
  time: time,
  tool: tool,
  upload: upload,
  value: value,
  verify: verify,
  wechat: wechat
}
vutour.install = function (Vue) {
  Vue.prototype.$vutour = vutour
}
export default vutour