import api from './http';

// const companyMap = JSON.parse(sessionStorage.getItem('_COMPANY_KEY'));
// const companyId = companyMap.companyInfo.companyId;
const companyId = '1231231'; // 测试代码，用上面两行

export default {
  getStockGroupByCompanyId(totalMoney, id = companyId) {
    return api.get(`/equity/findAllWithGroup/${id}`).then(resp => resp.data);
  },
  getStockListByCompanyId(totalMoney, id = companyId) {
    return api.get(`/equity/findAll/${id}`).then(resp => resp.data);
  },
  addStock(params) {
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
  deleteStock(id) {
    return api.del(`/equity/deleteById/${id}`);
  },
  addStockList(params) {
    return api.put('/equity/addList', { equityList: params });
  },
};
