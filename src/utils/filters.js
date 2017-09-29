import constants from '../data/constants';

const constantsFilter = (value, constName) => {
  let result = '';
  try {
    constants[constName].forEach((v, i) => {
      if (constants[constName][i].id === value.toString()) {
        result = constants[constName][i].text;
        throw new Error('StopIteration');
      }
    });
  } catch (e) {
    if (e.message !== 'StopIteration') throw e;
  }
  return result;
};

const moneyFilter = (arg1 = 0, isWan = true, justWan = false) => {
  let num = Number(arg1);
  if (isWan && justWan) { // 单位万元，不带逗号
    return Number(arg1) / 10000;
  }
  if (Number(arg1) > 9999 && isWan) {  // 单位万元
    num = Number(arg1) / 10000;
  }
  let t = '';
  if (Number.isInteger(num)) {
    const l = `${num}`.split('').reverse();
    // const r = num.split('.')[1];
    l.forEach((v, i) => {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    });
    return t.split('').reverse().join('');
  }
  num = Number(num).toFixed(2);
  const l = `${num}`.split('.')[0].split('').reverse();
  const r = num.split('.')[1];
  l.forEach((v, i) => {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
  });
  return `${t.split('').reverse().join('')}.${r}`;
};

export default {
  constantsFilter,
  moneyFilter,
};
