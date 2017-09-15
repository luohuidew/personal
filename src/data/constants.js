export const ROUND_TYPE = [ // 轮次类型
  { id: '0', text: '创始' },
  { id: '1', text: '天使' },
  { id: '2', text: 'A轮' },
  { id: '3', text: 'A+轮' },
  { id: '4', text: 'B轮' },
  { id: '5', text: 'B+轮' },
  { id: '6', text: 'C轮' },
  { id: '7', text: 'C+轮' },
  { id: '7', text: 'D轮' },
  { id: '7', text: 'D+轮' },
  { id: '7', text: 'E轮' },
  { id: '7', text: 'F轮' },
  { id: '7', text: 'G轮' },
];
export const SHAREHOLDER_TYPE = [  // 股东类型
  { id: '0', text: '个人' },
  { id: '1', text: '团体' },
];
export const ID_TYPES = [
  { id: '0', text: '身份证' },
  { id: '1', text: '护照' },
];
export const COMPENY_TYPE = [
  { id: '0', text: '境内有限责任公司' },
  { id: '1', text: '境外有限责任公司' },
];
export const MONEY_TYPE = [
  { id: 'RMB', text: '人民币' },
  { id: 'USD', text: '欧元' },
  { id: 'EUR', text: '美元' },
];
export const ID_TYPE = [ // 证件类型
  { id: '0', text: '身份证' },
  { id: '1', text: '护照' },
];

export const QINIU_BUCKET_DOMAIN = 'http://ow9hvlmOa.bkt.clouddn.com';

export const QINIU_SERVER = 'http://up-z1.qiniu.com/';

// 需要用于filter的必须加到default里
export default {
  ROUND_TYPE,
  SHAREHOLDER_TYPE,
  COMPENY_TYPE,
  MONEY_TYPE,
  ID_TYPE,
};
