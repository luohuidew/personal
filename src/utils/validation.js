function isPhoneAvailable(str) { // 手机号码正则
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  let status = '';
  if (!myreg.test(str)) {
    status = false;
  } else {
    status = true;
  }
  return status;
}
function isEmailAvailable(str) { // 邮箱电子邮箱正则
  const emailreg = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
  let status = '';
  if (!emailreg.test(str)) {
    status = false;
  } else {
    status = true;
  }
  return status;
}
export default {
  isPhoneAvailable,
  isEmailAvailable,
};
