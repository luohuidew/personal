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
function isIDNO(str) { // 验证身份证号
  const no15Reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; //  15位
  const no18Reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; // 18位
  let status = '';
  if (!no15Reg.test(str) && !no18Reg.test(str)) {
    status = false;
  } else {
    status = true;
  }
  return status;
}
function isPassport(str) { // 护照验证
  const passportReg = /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/;
  let status = '';
  if (!passportReg.test(str)) {
    status = false;
  } else {
    status = true;
  }
  return status;
}
export default {
  isPhoneAvailable,
  isEmailAvailable,
  isIDNO,
  isPassport,
};
