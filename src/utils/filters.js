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

export default {
  constantsFilter,
};
