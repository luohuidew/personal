import api from './http';

export default {
  getAll(id) {
    const totalMoney = 140000;  // 从缓存读取
    return api.get(`/equity/findAllWithGroup/${id}`).then((resp) => {
      resp.data.forEach((value) => {
        if (value.equities.length !== 0) {
          value.equities.forEach((key) => {
            const keytest = key;
            const rate = this.getPercent(key.registeredCapital, totalMoney);
            keytest.rate = rate;
          });
        }
        const r = this.getPercent(value.registeredCapital, totalMoney);
        const valuetest = value;
        valuetest.rate = r;
      });
      return resp.data;
    });
  },
  get(id) {
    const totalMoney = 140000;  // 从缓存读取
    return api.get(`/equity/findAll/${id}`).then((resp) => {
      resp.data.forEach((value) => {
        const r = this.getPercent(value.registeredCapital, totalMoney);
        const valuetest = value;
        valuetest.rate = r;
      });
      return resp.data;
    }, (resp) => {
      this.$message.error(resp.errMsg);
    });
  },
  add(params) {
    return api.put('/equity/add', params);
  },
  getPercent(num, total) {
    const number = parseFloat(num);
    const totals = parseFloat(total);
    if (isNaN(number) || isNaN(totals)) {
      return '-';
    }
    if (totals < 0) {
      return '0%';
    }
    const rate = Math.round((number / totals) * 100000) / 1000.00;
    return `${rate}%`;
  },
};
