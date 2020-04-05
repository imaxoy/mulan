/**
 * 过滤特殊字符
 */

export function stripscript(str) {
  var pattern = new RegExp("");
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

/**
 * 验证邮箱
 */

export function validateEmail(value) {
  // ESLine规范要求禁用不必要的转义字符
  // let reg = /^([a-zA-Z]|[0-9]|)(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  // let reg = /^[A-Za-z0-9\.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  let reg = /^(){1-5}/
  return !reg.test(value) ? true : false;
}

/**
 * 验证密码
 */

export function validatePass(value) {
  // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  let reg = /^[0-9a-zA-Z]{6,20}/;
  return !reg.test(value) ? true : false;
}
